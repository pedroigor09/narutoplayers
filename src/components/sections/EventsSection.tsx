'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Event } from '@/types';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface EventsSectionProps {
  events: Event[];
}

const eventTypeColors = {
  akatsuki: 'bg-red-500/20 text-red-400 border-red-500/50',
  kage: 'bg-blue-500/20 text-blue-400 border-blue-500/50',
  chunin: 'bg-green-500/20 text-green-400 border-green-500/50',
  outros: 'bg-purple-500/20 text-purple-400 border-purple-500/50',
};

const eventTypeIcons = {
  akatsuki: '☁️',
  kage: '👑',
  chunin: '🥋',
  outros: '⚔️',
};

export function EventsSection({ events }: EventsSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate title
      gsap.from(titleRef.current, {
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 80%',
        },
        y: 50,
        opacity: 0,
        duration: 1,
      });

      // Animate cards
      const cards = cardsRef.current?.children;
      if (cards) {
        gsap.from(cards, {
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 80%',
          },
          y: 100,
          opacity: 0,
          stagger: 0.2,
          duration: 0.8,
          ease: 'back.out(1.7)',
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [events]);

  return (
    <section ref={sectionRef} className="py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      
      <div className="container mx-auto px-4 relative z-10">
        <h2 
          ref={titleRef}
          className="text-5xl md:text-7xl font-black text-center mb-16 glow-orange"
        >
          🎯 EVENTOS ATIVOS
        </h2>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <Card 
              key={event.id}
              className="relative overflow-hidden bg-card/50 backdrop-blur-sm border-2 border-primary/20 hover:border-primary/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="p-6 relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <span className="text-4xl">{eventTypeIcons[event.type]}</span>
                  <Badge className={`${eventTypeColors[event.type]} border`}>
                    {event.type.toUpperCase()}
                  </Badge>
                </div>

                <h3 className="text-2xl font-bold mb-3 glow-purple">
                  {event.title}
                </h3>

                <p className="text-muted-foreground mb-4">
                  {event.description}
                </p>

                {event.date && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    📅 {new Date(event.date).toLocaleDateString('pt-BR')}
                  </div>
                )}

                <Badge 
                  variant="outline" 
                  className={`mt-4 ${
                    event.status === 'active' 
                      ? 'border-green-500 text-green-400' 
                      : event.status === 'upcoming'
                      ? 'border-yellow-500 text-yellow-400'
                      : 'border-gray-500 text-gray-400'
                  }`}
                >
                  {event.status === 'active' ? '🟢 Ativo' : event.status === 'upcoming' ? '🟡 Em breve' : '⚫ Finalizado'}
                </Badge>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
