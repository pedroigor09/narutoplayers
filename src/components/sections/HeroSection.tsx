'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { PlayModal } from '@/components/modals/PlayModal';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const [isPlayModalOpen, setIsPlayModalOpen] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        defaults: { ease: 'power3.out' }
      });

      timeline
        .from(titleRef.current, {
          y: 100,
          opacity: 0,
          duration: 1,
          scale: 0.8,
        })
        .from(subtitleRef.current, {
          y: 50,
          opacity: 0,
          duration: 0.8,
        }, '-=0.5')
        .from(ctaRef.current, {
          y: 30,
          opacity: 0,
          duration: 0.6,
        }, '-=0.4');

      // Parallax effect
      gsap.to(heroRef.current, {
        yPercent: 30,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Glowing orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/30 rounded-full blur-[120px] animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/30 rounded-full blur-[120px] animate-pulse-glow" style={{ animationDelay: '1s' }} />

      <div className="container mx-auto px-4 z-10 text-center">
        {/* Logo Flutuante */}
        <div className="mb-8 flex justify-center animate-float">
          <div 
            className="relative w-32 h-32 md:w-40 md:h-40 rounded-lg"
            style={{
              filter: 'drop-shadow(0 0 20px var(--naruto-purple)) drop-shadow(0 0 40px var(--naruto-purple))',
            }}
          >
            <Image
              src="/logo2.png"
              alt="Naruto Dark Logo"
              fill
              sizes="(max-width: 768px) 128px, 160px"
              className="object-contain"
              priority
            />
          </div>
        </div>

        <h1 
          ref={titleRef}
          className="text-7xl md:text-9xl font-black mb-6 glow-purple"
          style={{
            background: 'linear-gradient(135deg, var(--naruto-purple) 0%, var(--naruto-orange) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          NARUTO DARK
        </h1>
        
        <p ref={subtitleRef} className="text-xl md:text-3xl mb-12 text-foreground/80 max-w-3xl mx-auto">
          Entre para a <span className="glow-purple font-bold">STAFF</span> do servidor mais épico de Naruto!
        </p>

        <div ref={ctaRef} className="flex gap-4 justify-center flex-wrap">
          <Button 
            size="lg" 
            className="text-lg px-8 py-6 bg-primary hover:bg-primary/80 box-glow-purple transition-all duration-300 hover:scale-105"
            onClick={() => setIsPlayModalOpen(true)}
          >
            🎮 JOGAR AGORA
          </Button>
          <Button 
            size="lg" 
            variant="outline"
            className="text-lg px-8 py-6 border-2 border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground box-glow-orange transition-all duration-300 hover:scale-105"
          >
            📋 VER EVENTOS
          </Button>
        </div>

        <PlayModal isOpen={isPlayModalOpen} onClose={() => setIsPlayModalOpen(false)} />

        {/* Floating icons */}
        <div className="absolute top-20 left-10 animate-float">
          <div className="text-6xl opacity-20">🍥</div>
        </div>
        <div className="absolute bottom-20 right-10 animate-float" style={{ animationDelay: '2s' }}>
          <div className="text-6xl opacity-20">⚡</div>
        </div>
      </div>
    </section>
  );
}
