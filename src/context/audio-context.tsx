'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Episode } from '@/lib/podcast-data';

interface AudioContextType {
  currentEpisode: Episode | null;
  playEpisode: (episode: Episode) => void;
  closePlayer: () => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export function AudioProvider({ children }: { children: ReactNode }) {
  const [currentEpisode, setCurrentEpisode] = useState<Episode | null>(null);

  const playEpisode = (episode: Episode) => {
    setCurrentEpisode(episode);
  };

  const closePlayer = () => {
    setCurrentEpisode(null);
  };

  return (
    <AudioContext.Provider value={{ 
      currentEpisode, 
      playEpisode, 
      closePlayer 
    }}>
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (context === undefined) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
}
