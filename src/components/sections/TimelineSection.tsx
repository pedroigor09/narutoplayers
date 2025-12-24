'use client';

import { useEffect, useRef, useMemo, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TimelineEvent } from '@/types/timeline';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface TimelineSectionProps {
  events: TimelineEvent[];
}

export function TimelineSection({ events }: TimelineSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const dotsRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const svgPath = useMemo(() => {
    if (!mounted) return '';
    return `M 0,60 ${events
      .map((_, i) => {
        const x = (i / (events.length - 1)) * (100 * events.length);
        const y = 60 + Math.sin((i / (events.length - 1)) * Math.PI * 4) * 35;
        return `L ${x},${y}`;
      })
      .join(' ')} L ${100 * events.length + 20},60`;
  }, [events, mounted]);

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

      // Animate SVG path - revela a linha da esquerda para direita
      const mask = svgRef.current?.querySelector('mask rect');
      if (mask) {
        // Inicializa a máscara invisible (width = 0)
        gsap.set(mask, { attr: { width: 0 } });
        
        // Anima a máscara para revelar a linha completamente
        const maskWidth = 100 * events.length + 20;
        const tween = gsap.to(mask, {
          attr: { width: maskWidth },
          duration: 2.5,
          ease: 'power2.inOut',
          paused: true,
        });

        ScrollTrigger.create({
          trigger: dotsRef.current,
          start: 'top 70%',
          end: 'bottom 50%',
          onEnter: () => tween.play(),
          onEnterBack: () => tween.play(),
        });
      }

      // Animate dots
      const dots = dotsRef.current?.querySelectorAll('.timeline-dot');
      if (dots) {
        gsap.from(dots, {
          scrollTrigger: {
            trigger: dotsRef.current,
            start: 'top 60%',
          },
          scale: 0,
          opacity: 0,
          stagger: 0.1,
          duration: 0.5,
          ease: 'back.out(1.7)',
        });
      }

      // Animate content
      const contents = dotsRef.current?.querySelectorAll('.timeline-content');
      if (contents) {
        gsap.from(contents, {
          scrollTrigger: {
            trigger: dotsRef.current,
            start: 'top 60%',
          },
          y: 50,
          opacity: 0,
          stagger: 0.15,
          duration: 0.6,
          ease: 'power2.out',
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);



  return (
    <section ref={sectionRef} className="py-32 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <h2 
          ref={titleRef}
          className="text-5xl md:text-7xl font-black text-center mb-24 glow-orange"
        >
          📜 NOSSA HISTÓRIA
        </h2>

        <div ref={dotsRef} className="relative">
          {/* SVG Wavy Line */}
          <svg 
            ref={svgRef}
            className="absolute top-0 left-0 w-full"
            style={{ height: '120px', pointerEvents: 'none' }}
            preserveAspectRatio="none"
            viewBox={`0 0 ${100 * events.length + 20} 120`}
          >
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="var(--naruto-purple)" />
                <stop offset="50%" stopColor="var(--naruto-orange)" />
                <stop offset="100%" stopColor="var(--naruto-orange)" />
              </linearGradient>
              <mask id="revealMask">
                <rect x="0" y="0" width="0" height="120" fill="white" />
              </mask>
            </defs>
            {/* Linha com máscara que revela progressivamente */}
            {mounted && (
              <>
                <path
                  d={svgPath}
                  stroke="url(#gradient)"
                  strokeWidth="4"
                  fill="none"
                  vectorEffect="non-scaling-stroke"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  mask="url(#revealMask)"
                />
                {/* Linha de fundo mais fina (trilha já percorrida) */}
                <path
                  d={svgPath}
                  stroke="url(#gradient)"
                  strokeWidth="4"
                  fill="none"
                  vectorEffect="non-scaling-stroke"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  opacity="0.3"
                />
              </>
            )}
          </svg>

          {/* Timeline Items */}
          <div className="flex justify-between items-start pt-12 gap-2">
            {events.map((event, index) => (
              <div key={event.year} className="flex flex-col items-center flex-1 px-1">
                {/* Dot */}
                <div className="timeline-dot relative z-10 animate-float" style={{ animationDelay: `${index * 0.15}s` }}>
                  <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-full border-4 border-background shadow-lg shadow-primary/50 animate-pulse-glow" style={{ animationDelay: `${index * 0.1}s` }} />
                  <div className="absolute inset-0 w-10 h-10 rounded-full border-4 border-primary/50 animate-pulse-glow" style={{ animationDelay: `${index * 0.2}s` }} />
                </div>

                {/* Content */}
                <div className="timeline-content text-center mt-8">
                  <div className="text-xl font-black text-secondary mb-2">
                    {event.year}
                  </div>
                  <h3 className="text-base font-bold mb-2 glow-purple min-h-14 leading-tight">
                    {event.title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed max-w-[150px] mx-auto">
                    {event.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom decoration */}
        <div className="mt-20 text-center">
          <div className="inline-block">
            <p className="text-muted-foreground text-lg">
              ✨ A jornada continua...
            </p>
            <div className="h-1 bg-gradient-to-r from-transparent via-primary to-transparent mt-4 rounded-full" />
          </div>
        </div>
      </div>
    </section>
  );
}
