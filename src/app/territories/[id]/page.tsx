'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Navigation } from '@/components/navigation';
import { useFirestore, useDoc, useCollection, useMemoFirebase } from '@/firebase';
import { doc, collection, query, where } from 'firebase/firestore';
import { PodcastCard } from '@/components/podcast-card';
import { Loader2, MapPin, Globe, BookOpen, ArrowLeft, Zap, Target } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';

export default function TerritoryDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const db = useFirestore();

  const territoryRef = useMemoFirebase(() => db ? doc(db, 'territories', id as string) : null, [db, id]);
  const { data: territory, isLoading: isTerritoryLoading } = useDoc(territoryRef);

  const episodesQuery = useMemoFirebase(() => {
    if (!db || !id) return null;
    return query(collection(db, 'episodes'), where('territoryIds', 'array-contains', id));
  }, [db, id]);

  const { data: episodes, isLoading: isEpisodesLoading } = useCollection(episodesQuery);

  if (isTerritoryLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-paper">
        <Loader2 className="animate-spin text-accent" size={48} />
      </div>
    );
  }

  // Si no hay datos en Firestore, usamos fallback para demostración estética
  const territoryData = territory || {
    name: id?.toString().toUpperCase() || 'TERRITORIO VITAL',
    description: 'Este territorio representa un nodo crítico en nuestra infraestructura biótica, donde la regeneración del suelo y la cultura se encuentran.',
    countryCode: 'Colombia',
    latitude: 4.5709,
    longitude: -74.2973
  };

  return (
    <div className="min-h-screen bg-paper text-ink selection:bg-accent selection:text-white">
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-8 py-16">
        <button 
          onClick={() => router.back()}
          className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.4em] text-accent mb-12 hover:gap-5 transition-all"
        >
          <ArrowLeft size={14} /> Volver al Ecosistema
        </button>

        <section className="grid lg:grid-cols-12 gap-16 mb-24">
          <div className="lg:col-span-7 space-y-10">
            <div className="space-y-4">
              <Badge variant="outline" className="border-accent text-accent bg-accent/5 px-4 py-1.5 rounded-sm text-[10px] font-black uppercase tracking-[0.3em]">
                CAPA TERRITORIAL · 01
              </Badge>
              <h1 className="text-7xl font-serif font-black italic text-ink leading-[0.85] tracking-tighter uppercase">
                {territoryData.name}
              </h1>
            </div>

            <div className="flex flex-wrap items-center gap-8 text-[10px] font-black uppercase tracking-[0.2em] text-ink/40">
              <span className="flex items-center gap-2"><MapPin size={16} className="text-accent" /> {territoryData.countryCode}</span>
              <span className="flex items-center gap-2"><Globe size={16} className="text-accent" /> {territoryData.latitude?.toFixed(4)}, {territoryData.longitude?.toFixed(4)}</span>
            </div>

            <div className="prose prose-xl prose-serif text-ink/70 leading-relaxed italic border-l-2 border-ink/5 pl-8 py-4">
              "{territoryData.description}"
            </div>

            <div className="grid sm:grid-cols-2 gap-8 pt-8">
              <div className="p-8 bg-ink text-paper rounded-lg space-y-4 shadow-xl">
                 <h5 className="text-[10px] font-black uppercase tracking-[0.4em] text-node flex items-center gap-2">
                   <Target size={16} /> FOCO BIÓTICO
                 </h5>
                 <p className="text-xs opacity-60 italic font-serif leading-relaxed">
                   Zonas de restauración activa bajo el marco de Diálogos de Regeneración.
                 </p>
              </div>
              <div className="p-8 bg-white/40 border border-ink/5 rounded-lg space-y-4 shadow-sm">
                 <h5 className="text-[10px] font-black uppercase tracking-[0.4em] text-gold flex items-center gap-2">
                   <Zap size={16} /> IMPACTO IA
                 </h5>
                 <p className="text-xs text-ink/60 italic font-serif leading-relaxed">
                   Datos territoriales procesados para la generación de saberes colectivos.
                 </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative aspect-[4/5] rounded-lg overflow-hidden shadow-2xl border border-ink/10">
            <Image 
              src={`https://picsum.photos/seed/${id}/800/1000`} 
              alt={territoryData.name} 
              fill
              className="object-cover grayscale hover:grayscale-0 transition-all duration-1000"
              data-ai-hint="nature aerial"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent" />
          </div>
        </section>

        <section className="space-y-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-ink/10 pb-12">
            <div className="space-y-4">
              <h3 className="text-[11px] font-black uppercase tracking-[0.5em] text-accent">Memorias del Suelo</h3>
              <h2 className="text-5xl font-serif font-black italic text-ink">Diálogos Vinculados</h2>
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
                   <p className="text-xl font-serif italic text-ink/30">Aún no hay diálogos registrados en este territorio.</p>
                </div>
              )}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
