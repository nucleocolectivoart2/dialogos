'use client';

import React, { useState } from 'react';
import { Navigation } from '@/components/navigation';
import { ConversationMap } from '@/components/conversation-map';
import { Button } from '@/components/ui/button';
import { 
  Network, 
  Info, 
  Layers, 
  Play, 
  Clock, 
  MapPin, 
  Sparkles, 
  X, 
  ChevronRight, 
  Hash, 
  Zap, 
  Target,
  BookOpen,
  Users,
  Quote
} from 'lucide-react';
import { 
  Dialog, 
  DialogContent 
} from '@/components/ui/dialog';
import { useAudio } from '@/context/audio-context';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export default function MapPage() {
  const [selectedNode, setSelectedNode] = useState<any>(null);
  const { playEpisode } = useAudio();

  const handleNodeClick = (node: any) => {
    setSelectedNode(node);
  };

  return (
    <>
      <Navigation />
      <main className="flex-1 flex flex-col h-[calc(100vh-80px)] overflow-hidden bg-paper">
        {/* Header Técnico */}
        <div className="px-8 py-6 flex flex-col md:flex-row md:items-center justify-between gap-6 bg-paper/80 backdrop-blur-xl border-b border-ink/5 z-20">
          <div>
            <h1 className="text-3xl font-serif font-black italic text-ink uppercase tracking-tighter">Ecosistema de Diálogos</h1>
            <p className="text-[10px] text-ink/30 font-black uppercase tracking-widest mt-1">Infraestructura de Saberes Interconectados</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" size="sm" className="rounded-sm gap-3 font-black text-[9px] uppercase tracking-widest border-ink/5 bg-white/40 px-5">
              <Layers size={14} className="text-accent" /> CAPAS
            </Button>
            <Button variant="outline" size="sm" className="rounded-sm gap-3 font-black text-[9px] uppercase tracking-widest border-ink/5 bg-white/40 px-5">
              <Info size={14} className="text-accent" /> LEYENDA
            </Button>
          </div>
        </div>
        
        <div className="flex-1 relative">
          <div className="absolute inset-0 p-6">
            <ConversationMap onNodeClick={handleNodeClick} />
          </div>
          
          {/* Instrucciones Técnicas */}
          <div className="absolute top-10 left-10 p-8 bg-white/60 backdrop-blur-2xl rounded-sm border border-ink/5 max-w-xs shadow-2xl hidden lg:block pointer-events-none z-10">
            <h3 className="text-xs font-black uppercase tracking-[0.4em] text-ink mb-4 flex items-center gap-3">
              <Network size={18} className="text-accent" /> NAVEGACIÓN VITAL
            </h3>
            <p className="text-[11px] text-ink/60 leading-relaxed mb-6 italic font-serif">
              Cada nodo representa un diálogo, un tema o un territorio. Las líneas grafican la interdependencia de los saberes.
            </p>
            <div className="space-y-4">
              <div className="text-[8px] font-black uppercase tracking-widest text-ink/20">
                PROTOCOLO
              </div>
              <ul className="text-[10px] space-y-3 text-ink/40 font-black uppercase tracking-widest">
                <li className="flex gap-3">
                  <span className="text-accent">01.</span> EXPLORAR CONEXIONES
                </li>
                <li className="flex gap-3">
                  <span className="text-accent">02.</span> PROFUNDIZAR EN NODO
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Modal de Detalle Proporcionado */}
        <Dialog open={!!selectedNode} onOpenChange={() => setSelectedNode(null)}>
          <DialogContent className="max-w-5xl bg-white/40 backdrop-blur-3xl border-white/20 shadow-2xl p-0 overflow-hidden rounded-lg">
            {selectedNode && (
              <div className="flex flex-col md:flex-row h-full max-h-[85vh] overflow-y-auto no-scrollbar">
                
                {/* Visual Side */}
                <div className="md:w-[40%] relative min-h-[300px] md:min-h-full bg-ink">
                  <Image 
                    src={selectedNode.type === 'episode' ? selectedNode.data.imageUrl : `https://picsum.photos/seed/${selectedNode.id}/800/1200`}
                    alt={selectedNode.name}
                    fill
                    className="object-cover opacity-60 grayscale"
                    data-ai-hint="nature aerial"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent" />
                  <div className="absolute bottom-10 left-10 right-10 space-y-4">
                     <Badge className="bg-node text-ink border-none text-[9px] font-black uppercase tracking-widest px-4 py-1.5 rounded-sm">
                      {selectedNode.type === 'episode' ? 'Diálogo Vital' : selectedNode.type === 'theme' ? 'Nodo de Saber' : 'Territorio'}
                    </Badge>
                    <h2 className="text-4xl font-serif font-black italic text-paper leading-[0.9] tracking-tighter">
                      {selectedNode.name}
                    </h2>
                  </div>
                </div>

                {/* Content Side */}
                <div className="md:w-[60%] p-10 md:p-14 space-y-10 bg-paper/60 backdrop-blur-md">
                  {selectedNode.type === 'episode' ? (
                    <div className="space-y-10">
                      <div className="flex items-center gap-6 text-[9px] font-black uppercase tracking-widest text-ink/30">
                         <span className="flex items-center gap-2 bg-ink/5 px-4 py-2 rounded-sm"><Clock size={14} /> {selectedNode.data.duration}</span>
                         <span className="flex items-center gap-2 bg-ink/5 px-4 py-2 rounded-sm text-accent"><MapPin size={14} /> {selectedNode.data.territories?.join(', ')}</span>
                      </div>
                      
                      <div className="space-y-6">
                        <h4 className="text-[10px] font-black uppercase tracking-[0.5em] text-accent flex items-center gap-3">
                           <Quote size={16} /> LA CONVERSACIÓN
                        </h4>
                        <p className="text-xl font-serif italic text-ink/70 leading-relaxed">
                          {selectedNode.data.description}
                        </p>
                      </div>

                      {/* Hallazgos IA */}
                      <div className="grid sm:grid-cols-2 gap-8">
                        <div className="p-8 bg-ink text-paper rounded-sm space-y-4 shadow-xl relative overflow-hidden">
                           <div className="absolute -right-2 -top-2 opacity-5"><Target size={40} /></div>
                           <h5 className="text-[9px] font-black uppercase tracking-[0.4em] text-node flex items-center gap-2 relative z-10">
                             <Target size={14} /> TENSIONES
                           </h5>
                           <p className="text-[11px] opacity-60 italic font-serif leading-relaxed relative z-10">
                             Identificamos la fricción entre modelos lineales y la regeneración biótica.
                           </p>
                        </div>
                        <div className="p-8 bg-white/80 rounded-sm border border-ink/5 space-y-4 shadow-sm relative overflow-hidden">
                           <div className="absolute -right-2 -top-2 opacity-5"><Sparkles size={40} /></div>
                           <h5 className="text-[9px] font-black uppercase tracking-[0.4em] text-gold flex items-center gap-2 relative z-10">
                             <Sparkles size={14} /> PROPUESTA
                           </h5>
                           <p className="text-[11px] text-ink/60 italic font-serif leading-relaxed relative z-10">
                             Gobernanza basada en la escucha activa de los ciclos naturales.
                           </p>
                        </div>
                      </div>

                      <div className="pt-10 border-t border-ink/10 flex flex-col sm:flex-row gap-8 items-center">
                        <Button 
                          onClick={() => {
                            playEpisode(selectedNode.data);
                            setSelectedNode(null);
                          }}
                          className="w-full sm:w-auto px-12 py-8 bg-ink text-paper hover:bg-gold transition-all rounded-sm flex items-center gap-6 text-[10px] font-black uppercase tracking-[0.5em] shadow-2xl"
                        >
                          <Play size={24} fill="currentColor" /> ESCUCHAR
                        </Button>
                        <Link 
                          href={`/episodes/${selectedNode.id}`} 
                          className="text-[10px] font-black uppercase tracking-[0.4em] text-accent hover:text-ink transition-all flex items-center gap-2"
                          onClick={() => setSelectedNode(null)}
                        >
                          ANÁLISIS COMPLETO <ChevronRight size={14} />
                        </Link>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-12">
                      <div className="space-y-6">
                         <h4 className="text-[10px] font-black uppercase tracking-[0.5em] text-accent flex items-center gap-3">
                            <BookOpen size={16} /> PROFUNDIDAD DEL NODO
                         </h4>
                         <p className="text-3xl font-serif font-black italic text-ink/80 leading-tight">
                          "{selectedNode.name}" es un punto de convergencia en nuestra infraestructura de saberes.
                        </p>
                      </div>
                      
                      <div className="space-y-8">
                        <h4 className="text-[9px] font-black uppercase tracking-widest text-ink/20 border-b border-ink/5 pb-4">DIÁLOGOS RELACIONADOS</h4>
                        <div className="grid gap-4">
                           <Link 
                            href={selectedNode.type === 'theme' ? `/themes/${selectedNode.id.replace('theme-', '')}` : `/territories/${selectedNode.id.replace('terr-', '')}`}
                            className="p-8 bg-white/40 backdrop-blur-md rounded-sm group border border-ink/5 hover:bg-ink hover:text-paper transition-all flex items-center justify-between shadow-sm"
                            onClick={() => setSelectedNode(null)}
                           >
                             <div className="flex items-center gap-6">
                               <div className="w-14 h-14 rounded-sm bg-accent/10 flex items-center justify-center text-accent group-hover:text-paper transition-colors">
                                 {selectedNode.type === 'theme' ? <Hash size={28} /> : <MapPin size={28} />}
                               </div>
                               <div>
                                 <span className="text-[9px] font-black uppercase tracking-widest block mb-1 opacity-30">Explorar Nodo</span>
                                 <span className="text-xl font-serif italic font-bold">Investigación del Ecosistema</span>
                               </div>
                             </div>
                             <ChevronRight size={24} className="group-hover:translate-x-2 transition-transform opacity-20" />
                           </Link>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </main>
    </>
  );
}
