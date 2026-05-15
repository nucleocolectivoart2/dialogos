import React from 'react';
import { cn } from '@/lib/utils';
import { Quote } from 'lucide-react';

interface NarrativeBlockProps {
  children: React.ReactNode;
  quote?: boolean;
  className?: string;
}

export function NarrativeBlock({ children, quote, className }: NarrativeBlockProps) {
  return (
    <div className={cn("relative py-16 px-8 md:px-16 border-l-2 border-primary/20 bg-primary/5 rounded-sm overflow-hidden", className)}>
      {quote && (
        <div className="absolute top-8 left-8 opacity-10 text-primary">
          <Quote size={80} />
        </div>
      )}
      <div className={cn(
        "relative z-10 font-serif italic text-2xl md:text-3xl lg:text-4xl text-ink/80 leading-relaxed max-w-5xl",
        quote && "pl-4"
      )}>
        {children}
      </div>
    </div>
  );
}
