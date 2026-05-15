'use client';

import Link from 'next/link';
import { Leaf, Search, Globe, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const NAV_LINKS = [
  { href: "/archive", label: "ARCHIVO" },
  { href: "/ecosistema", label: "ECOSISTEMA" },
  { href: "/nodo", label: "NODO IA" },
  { href: "/about", label: "COLECTIVO" },
];

export function Navigation() {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 z-[100] w-full bg-zinc-950/85 backdrop-blur-2xl border-b border-white/5 px-6 md:px-8 py-4" role="banner">
      <div className="max-w-[1800px] mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-4 group" aria-label="MEDULAR Home">
          <div className="w-10 h-10 rounded-none bg-white flex items-center justify-center text-zinc-900 transition-all group-hover:bg-[#00e1ff] group-hover:text-zinc-900 shadow-lg">
             <Leaf size={20} />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-serif font-black italic tracking-tighter text-[#00e1ff] leading-none">
              MEDULAR
            </span>
            <span className="text-[8px] font-black uppercase tracking-[0.4em] text-[#00e1ff] leading-none mt-1">
              DIÁLOGOS DE REGENERACIÓN
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1 bg-black/40 border border-white/5 p-1 rounded-none" aria-label="Principal">
          {NAV_LINKS.map((link) => (
            <Link 
              key={link.href} 
              href={link.href} 
              className={cn(
                "px-6 py-2 text-[9px] font-black uppercase tracking-[0.3em] transition-all border-b-2 border-transparent",
                pathname === link.href 
                  ? "bg-white text-black border-white" 
                  : "text-zinc-500 hover:text-white"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-6">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-white transition-colors">
                  <Globe size={18} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-zinc-900 border-white/5 rounded-none p-3 shadow-2xl min-w-[150px]">
                <DropdownMenuItem className="font-black text-[10px] uppercase tracking-widest rounded-none px-4 py-2 hover:bg-white hover:text-black cursor-pointer text-white">Español (CO)</DropdownMenuItem>
                <DropdownMenuItem className="text-[10px] uppercase tracking-widest rounded-none px-4 py-2 opacity-40 text-white">English (US)</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-white transition-colors">
              <Search size={18} />
            </Button>
          </div>
          
          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden text-white hover:bg-white/5 rounded-none">
                <Menu size={20} />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-zinc-950 border-l border-white/10 p-0 w-[300px] rounded-none text-white">
              <SheetHeader className="p-8 border-b border-white/10 text-left">
                <SheetTitle className="text-xl font-serif font-black italic tracking-tighter uppercase text-white">Menú Medular</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col p-8 gap-6">
                {NAV_LINKS.map((link) => (
                  <Link 
                    key={link.href} 
                    href={link.href} 
                    className={cn(
                      "text-xs font-black uppercase tracking-[0.4em] transition-colors py-4 border-b border-white/5",
                      pathname === link.href ? "text-[#00e1ff]" : "text-zinc-500 hover:text-white"
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
