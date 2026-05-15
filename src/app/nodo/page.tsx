'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Navigation } from '@/components/navigation';
import { 
  Send, 
  Volume2, 
  Sparkles, 
  Loader2,
  Download,
  Brain,
  Network,
  Zap,
  Target
} from 'lucide-react';
import { nodoChat, nodoVoice } from '@/ai/flows/ai-nodo-flow';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { 
  useFirestore, 
  useCollection, 
  useUser, 
  useMemoFirebase, 
  useAuth,
  addDocumentNonBlocking
} from '@/firebase';
import { 
  collection, 
  query, 
  orderBy, 
  limit, 
  serverTimestamp 
} from 'firebase/firestore';
import { initiateAnonymousSignIn } from '@/firebase/non-blocking-login';

export default function NodoPage() {
  const { toast } = useToast();
  const router = useRouter();
  const db = useFirestore();
  const auth = useAuth();
  const { user } = useUser();
  
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!user && auth) {
      initiateAnonymousSignIn(auth);
    }
  }, [user, auth]);

  const messagesQuery = useMemoFirebase(() => {
    if (!db) return null;
    return query(collection(db, 'nodo_messages'), orderBy('timestamp', 'asc'), limit(50));
  }, [db]);
  const { data: messagesData } = useCollection(messagesQuery);
  const messages = messagesData || [];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSendMessage = async (e?: any) => {
    if (e) e.preventDefault();
    const userText = input.trim();
    if (!userText || isLoading || !db || !user) return;

    setInput('');
    setIsLoading(true);

    const messagesRef = collection(db, 'nodo_messages');
    addDocumentNonBlocking(messagesRef, {
      role: 'user',
      userId: user.uid,
      text: userText,
      timestamp: serverTimestamp()
    });

    try {
      const contexto = messages.slice(-3).map((m: any) => `${m.role}: ${m.text}`).join("\n");
      const response = await nodoChat({ query: userText, context: contexto });
      
      addDocumentNonBlocking(messagesRef, {
        role: 'assistant',
        userId: 'nodo-ia',
        text: response,
        timestamp: serverTimestamp()
      });
    } catch (err) {
      toast({ variant: "destructive", title: "Error de red", description: "No se pudo conectar con el sistema NODO." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen bg-zinc-50 flex flex-col overflow-hidden selection:bg-[#00e1ff]/20">
      <Navigation />
      <div className="h-10 flex items-center px-8 border-b border-zinc-100 bg-white/50 backdrop-blur-sm shrink-0 z-20 mt-20">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-[#00e1ff] animate-pulse" />
          <span className="text-[8px] font-black uppercase tracking-[0.4em] text-zinc-400">NODO IA · SINTONÍA COLECTIVA</span>
        </div>
      </div>

      <main className="flex-1 flex overflow-hidden relative">
        <ScrollArea className="flex-1">
          <div className="max-w-3xl mx-auto px-6 py-12 space-y-8 pb-32">
            <AnimatePresence mode="popLayout">
              {messages.map((msg: any, idx: number) => (
                <motion.div 
                  key={msg.id || idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div className={`p-6 rounded-none shadow-sm ${
                    msg.role === 'user' 
                    ? 'bg-zinc-900 text-white' 
                    : 'bg-white text-zinc-900 border border-zinc-100 font-serif italic text-lg'
                  }`}>
                    {msg.text}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-zinc-50 to-transparent">
          <form onSubmit={handleSendMessage} className="max-w-2xl mx-auto flex items-center bg-white rounded-none border border-zinc-200 p-2 shadow-xl focus-within:border-zinc-900 transition-all">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Dialogar con NODO sobre la regeneración..."
              className="flex-1 bg-transparent border-none focus:ring-0 py-3 font-serif italic text-base px-4"
            />
            <button type="submit" disabled={!input.trim() || isLoading} className="p-3 bg-zinc-900 text-white hover:bg-[#00e1ff] hover:text-black transition-all rounded-none">
              <Send size={18} />
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
