'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Navigation } from '@/components/navigation';
import { useFirestore, useDoc, useCollection, useMemoFirebase } from '@/firebase';
import { doc, collection, query, where } from 'firebase/firestore';
import { PodcastCard } from '@/components/podcast-card';
import { Loader2, Sparkles, Hash, ArrowLeft, BookOpen, Target, Cpu } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function ThemeDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const db = useFirestore();

  const themeRef = useMemoFirebase(() => db ? doc(db, 'themes', id as string) : null, [db, id]);
  const { data: theme, isLoading: isThemeLoading } = useDoc(themeRef);

  const episodesQuery = useMemoFirebase(() => {
    if (!db || !id) return null;
    return query(collection(db, 'episodes'), where('themeIds', 'array-contains', id));
  }, [db, id]);

  const { data: episodes, isLoading: isEpisodesLoading } = useCollection(episodesQuery);

  if (isThemeLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-paper">
        <Loader2 className="animate-spin text-accent" size={48} />
      </div>
    );
  }

  // Fallback estético
  const themeData = theme || {
    name: id?.toString().replace('-', ' ').toUpperCase() || 'NODO DE SABER',
    description: 'Este eje estructural analiza las intersecciones entre sistemas humanos y ciclos naturales, buscando la regeneración profunda.'
  };

  return (
    <div className="min-h-screen bg-paper text-ink selection:bg-accent selection:text-white">
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-8 py-16">
        <button 
          onClick={() => router.back()}
          className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.4em] text-accent mb-20 hover:gap-5 transition-all"
        >
          <ArrowLeft size={14} /> Volver a Ecosistema
        </button>

        <section className="text-center max-w-4xl mx-auto space-y-12 mb-32">
          <div className="inline-flex items-center gap-3 px-6 py-2 rounded-sm border border-gold/20 bg-gold/5">
             <Hash size={16} className="text-gold" />
             <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gold">NODO DE CONOCIMIENTO</span>
          </div>
          
          <h1 className="text-8xl font-serif font-black italic text-ink leading-[0.8] tracking-tighter uppercase">
            {themeData.name}
          </h1>
          
          <div className="w-24 h-px bg-ink/10 mx-auto" />
          
          <p className="text-3xl font-serif italic text-ink/60 leading-tight">
            "{themeData.description}"
          </p>

          <div className="flex justify-center gap-12 pt-8">
             <div className="flex flex-col items-center gap-2">
                <span className="text-4xl font-serif font-black italic">{episodes?.length || 0}</span>
                <span className="text-[9px] font-black uppercase tracking-widest text-ink/20">Diálogos</span>
             </div>
             <div className="w-px h-12 bg-ink/10" />
             <div className="flex flex-col items-center gap-2">
                <span className="text-4xl font-serif font-black italic">14h</span>
                <span className="text-[9px] font-black uppercase tracking-widest text-ink/20">Saberes</span>
             </div>
          </div>
        </section>

        <section className="grid md:grid-cols-3 gap-8 mb-32">
           {[
             { icon: <Target />, title: 'Propósito Ético', desc: 'Desarrollo de nuevas narrativas basadas en la regeneración biótica.' },
             { icon: <Cpu />, title: 'Análisis IA', desc: 'Procesamiento de diálogos para extraer tensiones y soluciones reales.' },
             { icon: <Sparkles />, title: 'Expansión Viva', desc: 'Cada diálogo es el origen de un ecosistema transmedia pedagógico.' }
           ].map((item, i) => (
             <div key={i} className="p-10 bg-white/30 border border-ink/5 rounded-lg space-y-6 hover:bg-white/60 transition-colors">
                <div className="w-12 h-12 rounded-sm bg-ink text-paper flex items-center justify-center">
                  {item.icon}
                </div>
                <h4 className="text-2xl font-serif font-bold italic text-ink">{item.title}</h4>
                <p className="text-sm text-ink/50 italic leading-relaxed">{item.desc}</p>
             </div>
           ))}
        </section>

        <section className="space-y-16">
          <div className="flex items-center justify-between border-b border-ink/10 pb-12">
            <h2 className="text-5xl font-serif font-black italic text-ink">Ecosistema de Diálogos</h2>
            <div className="text-[10px] font-black uppercase tracking-widest text-ink/30 bg-ink/5 px-6 py-2 rounded-sm">
               CENTRO VIVO · PMV
            </div>
          </div>

          {isEpisodesLoading ? (
            <div className="flex justify-center py-40">
              <Loader2 className="animate-spin text-accent" size={48} />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {episodes && episodes.length > 0 ? (
                episodes.map((episode) => (
                  <PodcastCard key={episode.id} episode={episode} />
                ))
              ) : (
                <div className="col-span-full py-40 text-center border border-dashed border-ink/10 rounded-lg bg-white/20">
                   <BookOpen size={48} className="mx-auto text-ink/10 mb-6" />
                   <p className="text-xl font-serif italic text-ink/30">Este nodo aún está germinando en nuestras conversaciones.</p>
                </div>
              )}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
