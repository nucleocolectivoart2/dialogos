'use client';

import React, { useEffect, useState } from 'react';
import { Navigation } from '@/components/navigation';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Play, 
  Share2, 
  Heart, 
  Calendar, 
  Clock, 
  Zap,
  Target,
  Sparkles,
  Users,
  Loader2,
  MapPin,
  ArrowLeft
} from 'lucide-react';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { useFirestore, useDoc, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import { summarizeEpisode } from '@/ai/flows/ai-episode-summary';
import { extractEpisodeKeyTakeaways } from '@/ai/flows/ai-episode-key-takeaways';
import { getEpisodeRelatedEntities } from '@/ai/flows/ai-episode-related-entities';

export default function EpisodeDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const db = useFirestore();
  
  const episodeRef = useMemoFirebase(() => {
    if (!db || !id) return null;
    return doc(db, 'episodes', id as string);
  }, [db, id]);

  const { data: episode, isLoading: isEpisodeLoading } = useDoc(episodeRef);
  
  const [aiInsights, setAiInsights] = useState<{
    summary?: string;
    takeaways?: any;
    entities?: any;
  }>({});
  const [isAiLoading, setIsAiLoading] = useState(false);

  useEffect(() => {
    async function fetchAiInsights() {
      if (!episode) return;
      
      if (episode.summary && episode.keyTensions && episode.sustainableIdeas) {
        setAiInsights({
          summary: episode.summary,
          takeaways: {
            keyTensions: episode.keyTensions,
            sustainableIdeas: episode.sustainableIdeas
          }
        });
        return;
      }

      setIsAiLoading(true);
      try {
        const [summaryRes, takeawaysRes, entitiesRes] = await Promise.all([
          summarizeEpisode({ episodeDescription: episode.description }),
          extractEpisodeKeyTakeaways({ episodeContent: episode.description }),
          getEpisodeRelatedEntities({ transcript: episode.description })
        ]);

        setAiInsights({
          summary: summaryRes.summary,
          takeaways: takeawaysRes,
          entities: entitiesRes
        });
      } catch (error) {
        console.error("Error fetching AI insights:", error);
      } finally {
        setIsAiLoading(false);
      }
    }

    fetchAiInsights();
  }, [episode]);

  if (isEpisodeLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-paper">
        <Loader2 className="animate-spin text-accent" size={48} />
      </div>
    );
  }

  if (!episode) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-paper text-ink">
        <div className="text-center space-y-6">
          <h1 className="text-4xl font-serif font-black italic">Diálogo no encontrado</h1>
          <Button onClick={() => router.push('/archive')} variant="outline" className="rounded-sm border-ink/10 uppercase tracking-widest text-[10px]">
            Volver al archivo
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-paper text-ink">
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-8 py-16">
        <button 
          onClick={() => router.back()}
          className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.4em] text-accent mb-12 hover:gap-5 transition-all"
        >
          <ArrowLeft size={14} /> Volver
        </button>

        <div className="grid lg:grid-cols-12 gap-16">
          
          <div className="lg:col-span-8 space-y-16">
            <div className="space-y-8">
              <div className="flex flex-wrap gap-2">
                {episode.themeIds?.map(t => (
                  <Badge key={t} variant="outline" className="bg-white/50 border-ink/5 text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-sm">
                    {t}
                  </Badge>
                ))}
              </div>
              
              <h1 className="text-6xl font-serif font-black italic text-ink leading-[0.9] tracking-tighter max-w-4xl">
                {episode.title}
              </h1>

              <div className="flex flex-wrap items-center gap-8 text-[10px] font-black uppercase tracking-[0.2em] text-ink/40">
                <span className="flex items-center gap-2"><Calendar size={14} className="text-accent" /> {episode.publishedAt}</span>
                <span className="flex items-center gap-2"><Clock size={14} className="text-accent" /> {Math.round(episode.durationSeconds / 60)} min</span>
                <span className="flex items-center gap-2"><Users size={14} className="text-accent" /> {episode.guestIds?.join(', ')}</span>
              </div>

              <div className="flex flex-wrap gap-4 pt-4">
                <Button size="lg" className="bg-ink text-paper hover:bg-gold transition-all rounded-sm px-12 py-7 text-[10px] font-black uppercase tracking-[0.4em] shadow-xl">
                  <Play size={18} fill="currentColor" className="mr-3" /> Escuchar Ahora
                </Button>
                <Button variant="outline" size="lg" className="border-ink/10 rounded-sm px-8 py-7 hover:bg-white transition-all">
                  <Heart size={18} />
                </Button>
                <Button variant="outline" size="lg" className="border-ink/10 rounded-sm px-8 py-7 hover:bg-white transition-all">
                  <Share2 size={18} />
                </Button>
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-[11px] font-black uppercase tracking-[0.5em] text-accent border-b border-ink/5 pb-4">Sobre este diálogo</h2>
              <div className="prose prose-lg prose-serif max-w-none text-ink/70 leading-relaxed italic">
                {episode.description}
              </div>
            </div>

            {/* AI Insights Section */}
            <section className="bg-white/40 rounded-lg p-12 border border-ink/5 space-y-12 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-5">
                 <Zap size={120} />
              </div>
              
              <div className="flex items-center gap-4 relative z-10">
                <div className="p-3 bg-gold/10 text-gold rounded-sm">
                  <Sparkles size={24} />
                </div>
                <div>
                  <h3 className="text-2xl font-serif font-black italic text-ink">Análisis de Infraestructura IA</h3>
                  <p className="text-[10px] font-black uppercase tracking-widest text-ink/30">Procesado por Núcleo Colectivo</p>
                </div>
              </div>

              {isAiLoading ? (
                <div className="flex flex-col items-center justify-center py-24 gap-6">
                  <Loader2 className="animate-spin text-accent" size={32} />
                  <p className="text-[10px] font-black uppercase tracking-[0.4em] text-ink/30 animate-pulse">Escuchando y analizando...</p>
                </div>
              ) : (
                <div className="space-y-12 relative z-10">
                  {aiInsights.summary && (
                    <div className="space-y-4">
                      <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-accent flex items-center gap-3">
                        <Zap size={14} /> Resumen Ejecutivo
                      </h4>
                      <div className="p-8 bg-white/60 rounded-sm border border-ink/5 text-lg font-serif italic text-ink/80 leading-relaxed shadow-inner">
                        "{aiInsights.summary}"
                      </div>
                    </div>
                  )}

                  <div className="grid md:grid-cols-2 gap-12">
                    {aiInsights.takeaways?.keyTensions && (
                      <div className="space-y-6">
                        <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-accent flex items-center gap-3">
                          <Target size={14} /> Tensiones Críticas
                        </h4>
                        <ul className="space-y-4">
                          {aiInsights.takeaways.keyTensions.map((tension: string, i: number) => (
                            <li key={i} className="flex gap-4 text-xs italic text-ink/60 bg-white/30 p-4 rounded-sm border-l-2 border-accent">
                              <span className="font-black text-accent opacity-40">0{i+1}</span>
                              {tension}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {aiInsights.takeaways?.sustainableIdeas && (
                      <div className="space-y-6">
                        <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-accent flex items-center gap-3">
                          <Sparkles size={14} /> Ideas Regenerativas
                        </h4>
                        <ul className="space-y-4">
                          {aiInsights.takeaways.sustainableIdeas.map((idea: string, i: number) => (
                            <li key={i} className="flex gap-4 text-xs italic text-ink/60 bg-node/5 p-4 rounded-sm border-l-2 border-node">
                              {idea}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </section>
          </div>

          <aside className="lg:col-span-4 space-y-12">
            <div className="aspect-square relative rounded-lg overflow-hidden shadow-2xl border border-ink/10">
              <Image 
                src={episode.imageUrl || 'https://picsum.photos/seed/epi-default/800/800'} 
                alt={episode.title} 
                fill 
                className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
            </div>

            <div className="bg-ink text-paper p-10 rounded-lg space-y-8 shadow-xl">
              <h3 className="text-xl font-serif font-black italic border-b border-white/5 pb-4">Nodos del Territorio</h3>
              <nav className="space-y-4">
                {episode.territoryIds?.map(t => (
                  <div key={t} className="flex items-center gap-4 p-4 bg-white/5 rounded-sm hover:bg-white/10 transition-all cursor-pointer group border border-transparent hover:border-node/20">
                    <div className="w-10 h-10 rounded-sm bg-node flex items-center justify-center text-ink font-black text-xs">
                      <MapPin size={16} />
                    </div>
                    <div>
                      <div className="text-[10px] font-black uppercase tracking-widest group-hover:text-node transition-colors">{t}</div>
                      <div className="text-[8px] opacity-30 uppercase tracking-[0.2em] mt-0.5">Territorio Mapeado</div>
                    </div>
                  </div>
                ))}
              </nav>
            </div>

            <div className="p-8 border border-ink/5 bg-white/30 rounded-lg space-y-4">
               <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-ink/20">Infraestructura Transmedia</h4>
               <p className="text-[11px] text-ink/40 italic font-serif leading-relaxed">
                 Este contenido ha sido transformado en cápsulas para YouTube e Instagram, manteniendo la coherencia de los Diálogos de Regeneración.
               </p>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
