
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
  Target,
  ChevronRight,
  MessageSquare
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
  const [placeholder, setPlaceholder] = useState("Consulta sobre regeneración...");
  const [idleTime, setIdleTime] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Autenticación anónima
  useEffect(() => {
    if (!user && auth) {
      initiateAnonymousSignIn(auth);
    }
  }, [user, auth]);

  // Suscripción real a Firestore
  const messagesQuery = useMemoFirebase(() => {
    if (!db) return null;
    return query(collection(db, 'nodo_messages'), orderBy('timestamp', 'asc'), limit(50));
  }, [db]);
  const { data: messagesData } = useCollection(messagesQuery);
  const messages = messagesData || [];

  // Saludo Inicial si no hay mensajes
  useEffect(() => {
    if (messages.length === 0 && !isLoading && db && user) {
      const messagesRef = collection(db, 'nodo_messages');
      addDocumentNonBlocking(messagesRef, {
        role: 'assistant',
        userId: 'nodo-ia',
        text: 'Bienvenido a Núcleo IA. Soy NODO, tu facilitador para explorar la regeneración y la acción colectiva. ¿Por dónde te gustaría comenzar nuestra sintonía hoy?',
        timestamp: serverTimestamp()
      });
    }
  }, [messages.length, isLoading, db, user]);

  // Micro UX: Placeholders Dinámicos
  useEffect(() => {
    const placeholders = [
      "¿Qué quieres regenerar hoy?",
      "Explora un nodo de conocimiento...",
      "Haz una pregunta incómoda al sistema...",
      "Sintoniza con el territorio..."
    ];
    let i = 0;
    const interval = setInterval(() => {
      setPlaceholder(placeholders[i % placeholders.length]);
      i++;
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Proactividad por Silencio
  useEffect(() => {
    const timer = setInterval(() => {
      setIdleTime(prev => prev + 1);
    }, 1000);

    if (idleTime > 40 && messages.length > 0 && messages[messages.length - 1].role !== 'assistant' && db) {
      const messagesRef = collection(db, 'nodo_messages');
      addDocumentNonBlocking(messagesRef, {
        role: 'assistant',
        userId: 'system',
        text: "A veces el silencio también conecta nodos… ¿quieres que exploremos una nueva idea juntos?",
        timestamp: serverTimestamp()
      });
      setIdleTime(0);
    }

    return () => clearInterval(timer);
  }, [idleTime, messages, db]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Motores Reales: Conceptos, Fragmentos, Exportación
  function extraerConceptos(texto: string) {
    const palabrasClave = ["agua", "comunidad", "territorio", "memoria", "huerta", "economía", "tecnología", "cultura", "regeneración"];
    return palabrasClave.filter(p => texto.toLowerCase().includes(p));
  }

  function dividirEnFragmentos(texto: string) {
    return texto.split('. ').filter(s => s.trim().length > 10).slice(0, 3);
  }

  const exportarTexto = (texto: string) => {
    const blob = new Blob([texto], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `transcripcion-nodo-${Date.now()}.txt`;
    a.click();
    toast({ title: "Documento Generado", description: "La transcripción ha sido exportada." });
  };

  const handleSendMessage = async (e?: any) => {
    if (e) e.preventDefault();
    const userText = input.trim();
    if (!userText || isLoading || !db || !user) return;

    setInput('');
    setIdleTime(0);
    setIsLoading(true);

    const messagesRef = collection(db, 'nodo_messages');
    
    addDocumentNonBlocking(messagesRef, {
      role: 'user',
      userId: user.uid,
      text: userText,
      timestamp: serverTimestamp()
    });

    try {
      // Memoria de sistema (Contexto de los últimos 3 mensajes)
      const contextoReciente = messages.slice(-3).map((m: any) => `${m.role}: ${m.text}`).join("\n");
      const contextoFull = `Conversación sobre regeneración. Memoria reciente:\n${contextoReciente}`;
      
      const response = await nodoChat({ query: userText, context: contextoFull });
      
      addDocumentNonBlocking(messagesRef, {
        role: 'assistant',
        userId: 'nodo-ia',
        text: response,
        timestamp: serverTimestamp()
      });

      // Crear Nodo Emergente
      const nodesRef = collection(db, 'chat_nodes');
      addDocumentNonBlocking(nodesRef, {
        label: response.slice(0, 40),
        description: response,
        cluster: 'emergente',
        createdAt: serverTimestamp(),
        source: 'chat'
      });

    } catch (err) {
      addDocumentNonBlocking(messagesRef, {
        role: 'assistant',
        userId: 'nodo-ia',
        text: 'Interferencia semántica detectada. ¿Podemos reconectar?',
        timestamp: serverTimestamp()
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleListenFragment = async (text: string, fragmentId: string) => {
    if (isPlayingAudio === fragmentId) return;
    setIsPlayingAudio(fragmentId);
    try {
      const { media } = await nodoVoice(text);
      const audio = new Audio(media);
      audio.onended = () => setIsPlayingAudio(null);
      audio.play();
    } catch (err) {
      setIsPlayingAudio(null);
      toast({ variant: "destructive", title: "Falla de Voz", description: "No se pudo sintonizar el audio." });
    }
  };

  return (
    <div className="h-screen bg-[#F5F2EB] flex flex-col overflow-hidden selection:bg-accent/30 selection:text-ink">
      <Navigation />
      
      <div className="h-10 flex items-center px-8 border-b border-ink/5 bg-paper/30 backdrop-blur-sm shrink-0 z-20">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-node animate-pulse" />
          <span className="text-[8px] font-black uppercase tracking-[0.4em] text-ink/30">NÚCLEO IA · CONSOLA DE PENSAMIENTO</span>
        </div>
      </div>

      <main className="flex-1 flex overflow-hidden relative">
        <aside className="w-14 border-r border-ink/5 flex flex-col items-center py-6 gap-6 bg-paper/50">
           <Button variant="ghost" size="icon" className="text-ink/20 hover:text-accent"><Target size={18} /></Button>
           <Button variant="ghost" size="icon" className="text-ink/20 hover:text-accent"><Zap size={18} /></Button>
           <Button variant="ghost" size="icon" className="text-ink/20 hover:text-accent" onClick={() => router.push('/map')}><Network size={18} /></Button>
        </aside>

        <section className="flex-1 flex flex-col relative overflow-hidden">
          <ScrollArea className="flex-1">
            <div className="max-w-3xl mx-auto px-6 py-10 space-y-8 pb-32">
              <AnimatePresence mode="popLayout">
                {messages.map((msg: any, idx: number) => (
                  <motion.div 
                    key={msg.id || idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
                  >
                    <div className={`max-w-[90%] flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'} gap-3`}>
                      <div className={`p-5 rounded-lg shadow-sm ${
                        msg.role === 'user' 
                        ? 'bg-ink text-paper rounded-tr-none text-sm' 
                        : 'bg-white text-ink border border-ink/5 italic font-serif text-lg leading-relaxed rounded-tl-none'
                      }`}>
                        {msg.text}
                      </div>

                      {msg.role === 'assistant' && msg.userId !== 'system' && (
                        <div className="flex flex-col items-start gap-3 w-full">
                          <div className="flex flex-wrap gap-2">
                            {dividirEnFragmentos(msg.text).map((frag, fIdx) => (
                              <Button 
                                key={fIdx}
                                variant="outline" 
                                size="sm"
                                onClick={() => handleListenFragment(frag, `frag-${idx}-${fIdx}`)}
                                disabled={isPlayingAudio === `frag-${idx}-${fIdx}`}
                                className="h-7 px-3 text-[7px] font-black uppercase tracking-widest gap-2 bg-white hover:bg-ink hover:text-paper rounded-full border-ink/10 transition-all shadow-sm"
                              >
                                {isPlayingAudio === `frag-${idx}-${fIdx}` ? <Loader2 size={10} className="animate-spin" /> : <Volume2 size={10} className="text-accent" />}
                                IDEA 0{fIdx + 1}
                              </Button>
                            ))}
                          </div>

                          <div className="flex flex-wrap gap-2">
                            <Button 
                              variant="ghost" 
                              onClick={() => exportarTexto(msg.text)}
                              className="h-6 px-3 text-[6px] font-black uppercase tracking-[0.3em] gap-2 text-ink/30 hover:text-accent"
                            >
                              <Download size={10} /> TRANSCRIPCIÓN
                            </Button>
                            <Button 
                              variant="ghost" 
                              onClick={() => {
                                const conceptos = extraerConceptos(msg.text);
                                toast({
                                  title: "Mapa Semántico",
                                  description: conceptos.length > 0 
                                    ? `Nodos detectados: ${conceptos.join(", ")}`
                                    : "No se detectaron nodos específicos."
                                });
                              }}
                              className="h-6 px-3 text-[6px] font-black uppercase tracking-[0.3em] gap-2 text-ink/30 hover:text-accent"
                            >
                              <Brain size={10} /> MAPA SEMÁNTICO
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              
              {isLoading && (
                <div className="flex justify-start items-center gap-3 text-ink/20 pl-4">
                  <Loader2 size={12} className="animate-spin" />
                  <span className="text-[7px] font-black uppercase tracking-[0.5em]">SINTONIZANDO...</span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-paper via-paper/95 to-transparent">
            <form 
              onSubmit={handleSendMessage}
              className="max-w-2xl mx-auto relative flex items-center bg-white rounded-full border border-ink/10 p-1 shadow-xl focus-within:ring-1 focus-within:ring-accent/20 transition-all"
            >
              <div className="px-4 text-accent/20"><Sparkles size={16} /></div>
              <input 
                type="text" 
                value={input}
                onChange={(e) => { setInput(e.target.value); setIdleTime(0); }}
                placeholder={placeholder}
                className="flex-1 bg-transparent border-none focus:ring-0 py-2 font-serif italic text-base placeholder:text-ink/20"
              />
              <button 
                type="submit" 
                disabled={!input.trim() || isLoading}
                className="w-9 h-9 rounded-full text-ink/20 hover:text-accent transition-all flex items-center justify-center bg-paper/50"
              >
                <Send size={16} />
              </button>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}
