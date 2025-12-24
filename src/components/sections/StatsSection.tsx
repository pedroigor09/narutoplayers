'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Card } from '@/components/ui/card';
import { ServerStats } from '@/types';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface StatsSectionProps {
  stats: ServerStats;
}

export function StatsSection({ stats }: StatsSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = sectionRef.current?.querySelectorAll('.stat-card');
      
      if (cards) {
        gsap.from(cards, {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
          scale: 0.8,
          opacity: 0,
          y: 50,
          stagger: 0.15,
          duration: 0.8,
          ease: 'back.out(1.7)',
        });

        // Animate numbers
        cards.forEach((card) => {
          const number = card.querySelector('.stat-number');
          if (number && number.textContent) {
            const finalValue = parseInt(number.textContent.replace(/\D/g, ''));
            gsap.from(number, {
              scrollTrigger: {
                trigger: card,
                start: 'top 80%',
              },
              textContent: 0,
              duration: 2,
              snap: { textContent: 1 },
              ease: 'power1.inOut',
            });
          }
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="stat-card p-8 text-center bg-card/30 backdrop-blur-sm border-2 border-primary/30 box-glow-purple">
            <div className="text-6xl mb-4">👥</div>
            <div className="stat-number text-5xl font-black glow-purple mb-2">
              {stats.playersOnline}
            </div>
            <div className="text-muted-foreground uppercase tracking-wider">
              Jogadores Online
            </div>
          </Card>

          <Card className="stat-card p-8 text-center bg-card/30 backdrop-blur-sm border-2 border-secondary/30 box-glow-orange">
            <div className="text-6xl mb-4">🎮</div>
            <div className="stat-number text-5xl font-black glow-orange mb-2">
              {stats.totalPlayers}
            </div>
            <div className="text-muted-foreground uppercase tracking-wider">
              Total de Jogadores
            </div>
          </Card>

          <Card className="stat-card p-8 text-center bg-card/30 backdrop-blur-sm border-2 border-primary/30 box-glow-purple">
            <div className="text-6xl mb-4">⚡</div>
            <div className="stat-number text-5xl font-black glow-purple mb-2">
              {stats.uptime}
            </div>
            <div className="text-muted-foreground uppercase tracking-wider">
              Disponibilidade
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
