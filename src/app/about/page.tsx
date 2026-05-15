'use client';

import { Navigation } from '@/components/navigation';
import { Button } from '@/components/ui/button';
import { Leaf, Users, BookOpen, Network, Cpu, Sparkles, Zap, ShieldCheck } from 'lucide-react';
import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white text-zinc-900 selection:bg-[#00e1ff]/30">
      <Navigation />
      <main className="flex-1 bg-white mt-20">
        <section className="py-32 px-12 relative overflow-hidden bg-zinc-950 text-white">
          <div className="max-w-5xl mx-auto relative z-10 space-y-12">
            <div className="inline-block border border-[#00e1ff]/40 px-6 py-2 rounded-none">
               <span className="text-[10px] font-black tracking-[0.6em] text-[#00e1ff] uppercase">RESUMEN EJECUTIVO</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-serif font-black italic leading-[0.85] tracking-tighter text-[#00e1ff]">
              Diálogos de <br/> <span className="text-white">Regeneración</span>
            </h1>
            <p className="text-xl md:text-2xl text-zinc-400 max-w-4xl font-serif italic leading-relaxed">
              Una infraestructura narrativa, pedagógica y colaborativa desarrollada por <strong>Núcleo Colectivo (Núcleo Sostenible)</strong> en articulación con <strong>Integricult</strong>.
            </p>
          </div>
          <div className="absolute inset-0 opacity-20 pointer-events-none grayscale">
            <Image 
              src="https://images.unsplash.com/photo-1511497584788-876760111969?q=80&w=2000" 
              alt="Background" 
              fill
              className="object-cover"
            />
          </div>
        </section>

        <section className="py-32 px-12 max-w-7xl mx-auto space-y-32">
          <div className="grid lg:grid-cols-12 gap-20">
            <div className="lg:col-span-7 space-y-12">
              <h2 className="text-5xl font-serif font-black italic text-zinc-900 tracking-tighter">Nuestro Propósito</h2>
              <div className="prose prose-xl font-serif italic text-zinc-600 leading-relaxed space-y-10">
                <p>
                  "Diálogos de Regeneración" es concebida como un <strong>sistema vivo</strong> que utiliza el podcast como punto de origen y expansión de un ecosistema más amplio.
                </p>
                <div className="bg-zinc-50 p-10 border-l-4 border-[#00e1ff] rounded-none italic text-zinc-900">
                  "No podemos hablar de sostenibilidad sin integrar la dimensión humana, creativa y cultural que nos define. La regeneración no es solo restaurar ecosistemas, sino reparar tejidos sociales."
                </div>
              </div>
            </div>
            <div className="lg:col-span-5 space-y-12 bg-zinc-50 border border-zinc-100 rounded-none p-12 shadow-sm h-fit">
              <h3 className="text-[11px] font-black uppercase tracking-[0.5em] text-[#00e1ff] mb-8">Visión 2026</h3>
              <p className="text-lg font-serif italic text-zinc-500 leading-relaxed">
                Consolidar un ecosistema de pensamiento y acción colectiva que permita reconfigurar la manera en que la sostenibilidad es comprendida en América Latina.
              </p>
              <div className="pt-8 border-t border-zinc-200 space-y-4">
                 <div className="flex items-center gap-3 text-[#ffe106]">
                    <Zap size={18} /> <span className="text-[10px] font-black uppercase tracking-widest">Futuro Regenerativo</span>
                 </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
