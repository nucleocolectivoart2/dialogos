'use client';

import Image from 'next/image';
import { Play, Clock, Calendar, ArrowRight, User } from 'lucide-react';
import { Episode } from '@/lib/podcast-data';
import { Badge } from '@/components/ui/badge';
import { useAudio } from '@/context/audio-context';

interface PodcastCardProps {
  episode: Episode;
  onClick?: () => void;
}

export function PodcastCard({ episode, onClick }: PodcastCardProps) {
  const { playEpisode } = useAudio();

  const guestName = Array.isArray(episode.guests) && episode.guests.length > 0 
    ? episode.guests[0] 
    : (episode as any).guest || 'Invitado';

  return (
    <div 
      onClick={onClick}
      className="group relative bg-white/40 rounded-lg overflow-hidden border border-ink/5 shadow-sm transition-all hover:shadow-xl hover:border-accent/20 flex flex-col h-full cursor-pointer"
    >
      <div className="relative h-48 overflow-hidden bg-ink/5">
        <Image
          src={episode.imageUrl}
          alt={episode.title}
          fill
          className="object-cover transition-transform duration-1000 group-hover:scale-110 grayscale group-hover:grayscale-0"
          data-ai-hint="nature aerial"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        
        <div className="absolute top-4 left-4 flex gap-2 z-20">
          {episode.themes && episode.themes.slice(0, 1).map(theme => (
            <Badge key={theme} className="bg-ink text-paper border-none text-[8px] py-1 px-3 rounded-sm font-black uppercase tracking-[0.2em]">
              {theme}
            </Badge>
          ))}
        </div>

        <button 
          onClick={(e) => {
            e.stopPropagation();
            playEpisode(episode);
          }}
          className="absolute inset-0 m-auto w-14 h-14 rounded-sm bg-accent text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all transform scale-90 group-hover:scale-100 shadow-2xl z-30"
          aria-label={`Reproducir: ${episode.title}`}
        >
          <Play fill="white" size={24} />
        </button>
      </div>

      <div className="p-8 flex flex-col flex-1 space-y-5">
        <div className="flex items-center gap-5 text-[8px] text-ink/30 font-black uppercase tracking-[0.3em]">
          <span className="flex items-center gap-2"><Calendar size={14} className="text-accent" /> {episode.date}</span>
          <span className="flex items-center gap-2"><Clock size={14} className="text-accent" /> {episode.duration}</span>
        </div>

        <h3 className="text-2xl font-serif font-black italic text-ink leading-tight group-hover:text-accent transition-colors line-clamp-2">
          {episode.title}
        </h3>
        
        <p className="text-ink/40 text-xs line-clamp-2 leading-relaxed italic font-serif">
          {episode.snippet}
        </p>

        <div className="mt-auto pt-6 border-t border-ink/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 rounded-sm bg-accent/10 flex items-center justify-center text-accent">
                <User size={14} />
             </div>
             <div className="flex flex-col">
                <span className="text-[7px] font-black uppercase tracking-widest text-ink/20">PARTICIPANTE</span>
                <span className="text-[10px] font-black text-ink uppercase tracking-widest group-hover:text-accent transition-colors">
                  {guestName}
                </span>
             </div>
          </div>
          <div className="w-10 h-10 rounded-sm bg-ink/5 flex items-center justify-center text-ink/20 group-hover:bg-accent group-hover:text-white transition-all">
            <ArrowRight size={18} />
          </div>
        </div>
      </div>
    </div>
  );
}
