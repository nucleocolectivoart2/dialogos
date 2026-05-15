'use client';

import React from 'react';
import { 
  Dialog, 
  DialogContent, 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Play, 
  Clock, 
  MapPin, 
  Target, 
  Sparkles, 
  Quote, 
  ChevronRight,
  Calendar,
  Users,
  Zap
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useAudio } from '@/context/audio-context';
import { Episode } from '@/lib/podcast-data';

interface EpisodeModalProps {
  episode: Episode | null;
  isOpen: boolean;
  onClose: () => void;
}

export function EpisodeModal({ episode, isOpen, onClose }: EpisodeModalProps) {
  const { playEpisode } = useAudio();

  if (!episode) return null;

  const guestName = Array.isArray(episode.guests) && episode.guests.length > 0 
    ? episode.guests[0] 
    : (episode as any).guest || 'Invitado';

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl bg-white/40 backdrop-blur-3xl border-white/20 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.2)] p-0 overflow-hidden rounded-lg">
        <div className="flex flex-col md:flex-row h-full max-h-[85vh] overflow-y-auto no-scrollbar">
          
          {/* Visual Side */}
          <div className="md:w-[45%] relative min-h-[350px] md:min-h-full bg-ink">
            <Image 
              src={episode.imageUrl || 'https://picsum.photos/seed/modal-epi/800/1200'}
              alt={episode.title}
              fill
              className="object-cover opacity-60 grayscale"
              data-ai-hint="nature aerial"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent" />
            <div className="absolute bottom-12 left-12 right-12 space-y-6">
               <Badge className="bg-node text-ink border-none text-[10px] font-black uppercase tracking-[0.4em] px-5 py-1.5 rounded-sm">
                DIÁLOGO VITAL
              </Badge>
              <h2 className="text-5xl font-serif font-black italic text-paper leading-[0.85] tracking-tighter">
                {episode.title}
              </h2>
            </div>
          </div>

          {/* Content Side */}
          <div className="md:w-[55%] p-10 md:p-16 space-y-12 bg-paper/60">
            <div className="space-y-12">
              <div className="flex flex-wrap items-center gap-6 text-[9px] font-black uppercase tracking-[0.3em] text-ink/40">
                 <span className="flex items-center gap-2 bg-ink/5 px-4 py-2 rounded-sm"><Calendar size={14} /> {episode.date}</span>
                 <span className="flex items-center gap-2 bg-ink/5 px-4 py-2 rounded-sm"><Clock size={14} /> {episode.duration}</span>
                 <span className="flex items-center gap-2 bg-gold/10 px-4 py-2 rounded-sm text-gold"><MapPin size={14} /> {episode.territories?.join(', ')}</span>
              </div>
              
              <div className="space-y-6">
                <h4 className="text-[11px] font-black uppercase tracking-[0.5em] text-accent flex items-center gap-3">
                   <Quote size={16} /> EL NÚCLEO NARRATIVO
                </h4>
                <p className="text-2xl font-serif italic text-ink/80 leading-tight">
                  {episode.description}
                </p>
                <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-ink/40 bg-ink/5 w-fit px-4 py-2 rounded-sm">
                   <Users size={16} className="text-gold" /> CON {guestName}
                </div>
              </div>

              {/* Hallazgos IA - Diseño Técnico */}
              <div className="grid sm:grid-cols-2 gap-8">
                <div className="p-8 bg-ink text-paper rounded-sm space-y-4 shadow-xl relative overflow-hidden">
                   <div className="absolute -right-2 -top-2 opacity-5"><Zap size={48} /></div>
                   <h5 className="text-[10px] font-black uppercase tracking-[0.4em] text-node flex items-center gap-2 relative z-10">
                     <Target size={16} /> TENSIONES
                   </h5>
                   <p className="text-xs opacity-60 italic font-serif leading-relaxed relative z-10">
                     Fricciones entre modelos económicos lineales y la regeneración biótica.
                   </p>
                </div>
                <div className="p-8 bg-white/80 rounded-sm border border-ink/10 space-y-4 shadow-sm relative overflow-hidden">
                   <div className="absolute -right-2 -top-2 opacity-5"><Sparkles size={48} /></div>
                   <h5 className="text-[10px] font-black uppercase tracking-[0.4em] text-gold flex items-center gap-2 relative z-10">
                     <Sparkles size={16} /> PROPUESTA
                   </h5>
                   <p className="text-xs text-ink/60 italic font-serif leading-relaxed relative z-10">
                     Gobernanza basada en la escucha activa de los ciclos naturales.
                   </p>
                </div>
              </div>

              <div className="pt-10 border-t border-ink/10 flex flex-col sm:flex-row gap-8 items-center">
                <Button 
                  onClick={() => {
                    playEpisode(episode);
                    onClose();
                  }}
                  className="w-full sm:w-auto px-12 py-8 bg-ink text-paper hover:bg-gold transition-all rounded-sm flex items-center gap-6 text-[11px] font-black uppercase tracking-[0.5em] shadow-2xl"
                >
                  <Play size={24} fill="currentColor" /> ESCUCHAR DIÁLOGO
                </Button>
                <Link 
                  href={`/episodes/${episode.id}`} 
                  className="text-[10px] font-black uppercase tracking-[0.4em] text-accent hover:text-ink transition-colors flex items-center gap-2"
                  onClick={onClose}
                >
                  ANÁLISIS TRANSMEDIA <ChevronRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
