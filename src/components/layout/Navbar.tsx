'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { DiscordModal } from '@/components/modals/DiscordModal';
import { PlayModal } from '@/components/modals/PlayModal';

export function Navbar() {
  const [isDiscordModalOpen, setIsDiscordModalOpen] = useState(false);
  const [isPlayModalOpen, setIsPlayModalOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-black/40 border-b border-primary/20 shadow-2xl">
        {/* Glow effect superior */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none" />
        
        {/* Animated border */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary to-transparent animate-shimmer" 
               style={{ backgroundSize: '200% 100%' }} />
        </div>

        <div className="container mx-auto px-4 relative">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="relative group">
              <div className="relative w-32 h-12 transition-all duration-300 group-hover:scale-110">
                <Image
                  src="/narutologo.png"
                  alt="Naruto Dark"
                  fill
                  sizes="128px"
                  className="object-contain drop-shadow-2xl"
                  style={{
                    filter: 'drop-shadow(0 0 20px rgba(139, 92, 246, 0.6)) drop-shadow(0 0 40px rgba(249, 115, 22, 0.4))',
                  }}
                  priority
                />
              </div>
              {/* Hover glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/20 to-primary/0 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300 -z-10" />
            </Link>

            {/* Nav Links */}
            <div className="hidden md:flex items-center gap-8">
              {[
                { href: '/eventos', label: 'Eventos' },
                { href: '#eventos', label: 'Cargos Oficiais' },
                { href: '#staff', label: 'Staff' },
                { href: '/regras', label: 'Regras' },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative group text-foreground/70 hover:text-foreground font-semibold transition-all duration-300"
                >
                  <span className="relative z-10">{link.label}</span>
                  {/* Underline effect */}
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-primary to-secondary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                  {/* Glow effect */}
                  <span className="absolute inset-0 bg-primary/10 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
                </Link>
              ))}
              
              <button
                onClick={() => setIsDiscordModalOpen(true)}
                className="relative group text-foreground/70 hover:text-foreground font-semibold transition-all duration-300"
              >
                <span className="relative z-10">Discord</span>
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-primary to-secondary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                <span className="absolute inset-0 bg-primary/10 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
              </button>
            </div>

            {/* CTA Button */}
            <Button
              onClick={() => setIsPlayModalOpen(true)}
              className="relative overflow-hidden bg-gradient-to-r from-secondary to-secondary/80 hover:from-secondary/90 hover:to-secondary text-secondary-foreground font-bold px-6 py-2 rounded-full transition-all duration-300 hover:scale-105 shadow-2xl"
            >
              {/* Animated shine */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <span className="relative z-10 flex items-center gap-2">
                🎮 JOGAR
              </span>
            </Button>
          </div>
        </div>
      </nav>

      <DiscordModal
        isOpen={isDiscordModalOpen}
        onClose={() => setIsDiscordModalOpen(false)}
      />
      <PlayModal
        isOpen={isPlayModalOpen}
        onClose={() => setIsPlayModalOpen(false)}
      />
    </>
  );
}
