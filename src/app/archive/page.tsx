'use client';

import React, { useState } from 'react';
import { Navigation } from '@/components/navigation';
import { PodcastCard } from '@/components/podcast-card';
import { MOCK_EPISODES, Episode } from '@/lib/podcast-data';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Filter, ArrowLeft } from 'lucide-react';
import { EpisodeModal } from '@/components/episode-modal';
import Link from 'next/link';

export default function ArchivePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEpisode, setSelectedEpisode] = useState<Episode | null>(null);

  const filteredEpisodes = MOCK_EPISODES.filter(ep => 
    ep.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ep.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ep.guests.some(g => g.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-white text-zinc-900 selection:bg-[#00e1ff]/30">
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-8 py-32">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-16 mb-24">
          <div className="max-w-3xl space-y-8">
            <Link href="/" className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.4em] text-[#00e1ff] hover:gap-5 transition-all">
              <ArrowLeft size={14} /> Volver a Portada
            </Link>
            <h1 className="text-7xl font-serif font-black italic text-zinc-900 tracking-tighter leading-[0.85] uppercase">
              Archivo <br/> <span className="text-zinc-100">Integricult</span>
            </h1>
            <p className="text-zinc-500 text-xl font-serif italic max-w-xl leading-relaxed">
              La memoria viva de nuestros diálogos sobre territorio, ética regenerativa y sostenibilidad transmedia.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto items-center">
            <div className="relative group w-full sm:w-80">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-200 group-focus-within:text-[#00e1ff] transition-colors" size={18} />
              <Input 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar en el archivo..." 
                className="pl-14 pr-6 py-8 bg-zinc-50 border-zinc-100 rounded-none w-full focus:ring-[#00e1ff] font-serif italic text-lg shadow-sm"
              />
            </div>
            <Button variant="outline" className="border-zinc-100 rounded-none py-8 px-10 gap-4 font-black text-[10px] uppercase tracking-[0.4em] hover:bg-zinc-900 hover:text-white transition-all w-full sm:w-auto">
              <Filter size={18} /> FILTRAR
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredEpisodes.map((episode) => (
            <PodcastCard 
              key={episode.id} 
              episode={episode} 
              onClick={() => setSelectedEpisode(episode)}
            />
          ))}
        </div>

        {filteredEpisodes.length === 0 && (
          <div className="py-40 text-center border-t border-zinc-100 mt-20">
             <p className="text-2xl font-serif italic text-zinc-200">No se encontraron resultados para su búsqueda.</p>
             <Button variant="link" onClick={() => setSearchTerm('')} className="mt-6 text-[#00e1ff] font-black text-[10px] uppercase tracking-widest">Mostrar todo el archivo</Button>
          </div>
        )}
      </main>

      <EpisodeModal 
        episode={selectedEpisode} 
        isOpen={!!selectedEpisode} 
        onClose={() => setSelectedEpisode(null)} 
      />
    </div>
  );
}
