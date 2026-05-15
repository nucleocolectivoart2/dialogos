
"use client";

import React, { useState, useMemo, useEffect, useRef } from 'react';
import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection } from 'firebase/firestore';
import { Loader2, Maximize2 } from 'lucide-react';
import { MOCK_EPISODES } from '@/lib/podcast-data';
import dynamic from 'next/dynamic';

const ForceGraph2D = dynamic(() => import('react-force-graph-2d'), { 
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-white/30">
      <Loader2 className="animate-spin text-accent" size={40} />
    </div>
  )
});

interface ConversationMapProps {
  onNodeClick?: (node: any) => void;
}

export function ConversationMap({ onNodeClick }: ConversationMapProps) {
  const db = useFirestore();
  const fgRef = useRef<any>();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });

  useEffect(() => {
    setIsMounted(true);
    
    const updateDimensions = () => {
      if (containerRef.current) {
        const { clientWidth, clientHeight } = containerRef.current;
        if (clientWidth > 0 && clientHeight > 0) {
          setDimensions({ width: clientWidth, height: clientHeight });
        }
      }
    };

    updateDimensions();
    const timer = setTimeout(updateDimensions, 100);

    window.addEventListener('resize', updateDimensions);
    return () => {
      window.removeEventListener('resize', updateDimensions);
      clearTimeout(timer);
    };
  }, []);

  const epQuery = useMemoFirebase(() => db ? collection(db, 'episodes') : null, [db]);
  const { data: fsEpisodes } = useCollection(epQuery);

  const graphData = useMemo(() => {
    if (!isMounted) return { nodes: [], links: [] };

    const nodes: any[] = [];
    const links: any[] = [];
    const nodeSet = new Set();

    const episodes = (fsEpisodes && fsEpisodes.length > 0) ? fsEpisodes : MOCK_EPISODES;
    
    episodes.forEach((ep: any) => {
      if (!nodeSet.has(ep.id)) {
        nodes.push({
          id: ep.id,
          name: ep.title,
          type: 'episode',
          val: 12,
          color: '#C18D52', // Gold
          data: ep
        });
        nodeSet.add(ep.id);
      }

      const epThemes = ep.themes || ep.themeIds || [];
      epThemes.forEach((theme: string) => {
        const themeId = `theme-${theme}`;
        if (!nodeSet.has(themeId)) {
          nodes.push({
            id: themeId,
            name: theme,
            type: 'theme',
            val: 18,
            color: '#5A8F76' // Accent
          });
          nodeSet.add(themeId);
        }
        links.push({ source: ep.id, target: themeId });
      });

      const epTerritories = ep.territories || ep.territoryIds || [];
      epTerritories.forEach((terr: string) => {
        const terrId = `terr-${terr}`;
        if (!nodeSet.has(terrId)) {
          nodes.push({
            id: terrId,
            name: terr,
            type: 'territory',
            val: 10,
            color: '#96CDB0' // Node
          });
          nodeSet.add(terrId);
        }
        links.push({ source: ep.id, target: terrId });
      });
    });

    return { nodes, links };
  }, [fsEpisodes, isMounted]);

  if (!isMounted) return null;

  return (
    <div ref={containerRef} className="relative w-full h-full bg-paper/30 rounded-[2rem] overflow-hidden border border-ink/5 shadow-inner">
      <div className="absolute inset-0">
        <ForceGraph2D
          ref={fgRef}
          width={dimensions.width}
          height={dimensions.height}
          graphData={graphData}
          nodeLabel="name"
          nodeRelSize={6}
          nodeVal={d => (d as any).val}
          nodeColor={d => (d as any).color}
          linkColor={() => 'rgba(30, 42, 37, 0.15)'}
          linkDirectionalParticles={3}
          linkDirectionalParticleSpeed={0.005}
          linkDirectionalParticleWidth={2}
          backgroundColor="rgba(0,0,0,0)"
          d3AlphaDecay={0.02}
          d3VelocityDecay={0.3}
          onNodeClick={(node: any) => {
            if (onNodeClick) {
              onNodeClick(node);
            }
          }}
          nodeCanvasObject={(node: any, ctx, globalScale) => {
            const label = node.name;
            const fontSize = 14/globalScale;
            
            ctx.beginPath();
            ctx.arc(node.x, node.y, node.val / 2, 0, 2 * Math.PI, false);
            ctx.fillStyle = node.color;
            ctx.fill();

            ctx.shadowColor = node.color;
            ctx.shadowBlur = 15 / globalScale;

            if (globalScale > 1.5) {
              ctx.font = `${fontSize}px Inter`;
              ctx.textAlign = 'center';
              ctx.textBaseline = 'middle';
              ctx.fillStyle = 'rgba(30, 42, 37, 0.8)';
              ctx.fillText(label, node.x, node.y + (node.val/2) + 8/globalScale);
            }
          }}
        />
      </div>

      <div className="absolute top-6 left-6 p-5 bg-white/90 backdrop-blur-xl rounded-2xl border border-ink/5 shadow-2xl pointer-events-none z-10">
        <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-gold mb-4">Ecosistema Vivo</h4>
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-ink/60">
            <span className="w-3 h-3 rounded-full bg-gold shadow-[0_0_10px_rgba(193,141,82,0.4)]"></span> Diálogo
          </div>
          <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-ink/60">
            <span className="w-3 h-3 rounded-full bg-primary shadow-[0_0_10px_rgba(90,143,118,0.4)]"></span> Tema
          </div>
          <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-ink/60">
            <span className="w-3 h-3 rounded-full bg-node shadow-[0_0_10px_rgba(150,205,176,0.4)]"></span> Territorio
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 right-6 flex flex-col gap-2 z-10">
        <button 
          onClick={() => fgRef.current?.zoomToFit(400)}
          className="p-3 bg-white/90 backdrop-blur-md rounded-xl border border-ink/5 text-ink hover:bg-gold hover:text-white transition-all shadow-xl"
          title="Centrar Ecosistema"
        >
          <Maximize2 size={18} />
        </button>
      </div>
    </div>
  );
}
