'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface EventIconProps {
  title: string;
  image: string;
  color: 'red' | 'yellow' | 'gray' | 'white';
  description: string;
  delay: number;
}

const colorConfig = {
  red: {
    glowClass: 'glow-red',
    boxGlowClass: 'box-glow-red',
    borderClass: 'border-red-500/50',
    hoverBorderClass: 'hover:border-red-500',
    particleColor: '#ef4444',
    particleGlow: '#dc2626',
  },
  yellow: {
    glowClass: 'glow-yellow',
    boxGlowClass: 'box-glow-yellow',
    borderClass: 'border-yellow-500/50',
    hoverBorderClass: 'hover:border-yellow-500',
    particleColor: '#eab308',
    particleGlow: '#ca8a04',
  },
  gray: {
    glowClass: 'glow-gray',
    boxGlowClass: 'box-glow-gray',
    borderClass: 'border-gray-500/50',
    hoverBorderClass: 'hover:border-gray-500',
    particleColor: '#a1a1a1',
    particleGlow: '#6b7280',
  },
  white: {
    glowClass: 'glow-white',
    boxGlowClass: 'box-glow-white',
    borderClass: 'border-white/50',
    hoverBorderClass: 'hover:border-white',
    particleColor: '#ffffff',
    particleGlow: '#e5e7eb',
  },
};

function MinecraftParticles({ color }: { color: 'red' | 'yellow' | 'gray' | 'white' }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const config = colorConfig[color];
  const particlesRef = useRef<Array<{
    x: number;
    y: number;
    vx: number;
    vy: number;
    life: number;
    size: number;
    angle: number;
  }>>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = 300;
    canvas.height = 300;

    // Create particles
    const createParticles = () => {
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      
      for (let i = 0; i < 2; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 2 + 1;
        
        particlesRef.current.push({
          x: centerX,
          y: centerY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 1,
          life: 1,
          size: Math.random() * 6 + 8,
          angle: Math.random() * Math.PI * 2,
        });
      }
    };

    // Animation loop
    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0)';
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const p = particlesRef.current[i];

        // Update position
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.08; // Gravity lenta
        p.life -= 0.008; // Decay mais lento
        p.angle += 0.1;

        if (p.life <= 0) {
          particlesRef.current.splice(i, 1);
          continue;
        }

        // Draw spark/faísca
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);
        
        // Corpo da faísca (brilhante)
        ctx.fillStyle = config.particleColor;
        ctx.globalAlpha = p.life * 0.8;
        ctx.shadowColor = config.particleGlow;
        ctx.shadowBlur = 15;
        
        // Forma de faísca (estrela alongada)
        ctx.beginPath();
        ctx.moveTo(0, -p.size / 2);
        ctx.lineTo(p.size / 3, 0);
        ctx.lineTo(0, p.size / 2);
        ctx.lineTo(-p.size / 3, 0);
        ctx.closePath();
        ctx.fill();
        
        // Núcleo brilhante
        ctx.fillStyle = '#ffffff';
        ctx.globalAlpha = p.life;
        ctx.shadowBlur = 20;
        ctx.beginPath();
        ctx.arc(0, 0, p.size / 6, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.restore();
      }

      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;

      requestAnimationFrame(animate);
    };

    // Start animation
    animate();

    // Create particles periodically (mais lento)
    const interval = setInterval(() => {
      createParticles();
    }, 800);

    return () => clearInterval(interval);
  }, [config]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ filter: 'blur(0.3px)' }}
    />
  );
}

function EventIcon({ title, image, color, description, delay }: EventIconProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const config = colorConfig[color];

  useEffect(() => {
    if (!cardRef.current) return;

    gsap.from(cardRef.current, {
      scrollTrigger: {
        trigger: cardRef.current,
        start: 'top 80%',
      },
      y: 100,
      opacity: 0,
      duration: 0.8,
      delay,
      ease: 'back.out(1.7)',
    });
  }, [delay]);

  return (
    <div ref={cardRef} className="flex flex-col items-center">
      {/* Pedestal */}
      <div
        className={`relative w-40 h-40 md:w-56 md:h-56 mb-6 animate-float ${config.boxGlowClass} transition-all duration-300 hover:scale-110 cursor-pointer overflow-hidden`}
        style={{
          perspective: '1000px',
          animationDelay: `${delay * 0.2}s`,
          background: `radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, transparent 70%)`,
          borderRadius: '12px',
          border: `2px solid var(--naruto-purple)`,
        }}
      >
        {/* Efeito de iluminação 3D */}
        <div className="absolute inset-0 rounded-lg overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-transparent to-black/20" />
        </div>

        {/* Minecraft Particles */}
        <MinecraftParticles color={color} />

        {/* Imagem com efeito parallax */}
        <div className="relative w-full h-full flex items-center justify-center p-6 z-10">
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 768px) 160px, 224px"
            className="object-contain drop-shadow-2xl"
            priority
          />
        </div>

        {/* Sombra inferior do pedestal */}
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3/4 h-2 bg-black/40 rounded-full blur-lg z-10" />
      </div>

      {/* Informação */}
      <h3 className={`text-2xl md:text-3xl font-black mb-3 ${config.glowClass}`}>
        {title}
      </h3>
      <p className="text-center text-muted-foreground max-w-xs md:max-w-sm leading-relaxed">
        {description}
      </p>
    </div>
  );
}

export function CinematicEventsSection() {
  const sectionRef = useRef<HTMLSection>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

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

      // Parallax effect para o container
      gsap.to(containerRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 60%',
          end: 'bottom 40%',
          scrub: 1,
        },
        y: -30,
        ease: 'none',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const events: EventIconProps[] = [
    {
      title: 'AKATSUKI',
      image: '/akatsuki.png',
      color: 'red',
      description: 'A organização criminosa mais temida do Naruto Dark. Junte-se aos maiores ninjas!',
      delay: 0,
    },
    {
      title: 'KAGES',
      image: '/kages.png',
      color: 'yellow',
      description: 'Líderes das vilas ninja. Compita para ser o próximo Kage de sua vila!',
      delay: 0.15,
    },
    {
      title: 'KARA',
      image: '/kara.png',
      color: 'gray',
      description: 'Uma ameaça misteriosa. Descubra os segredos desta organização antiga.',
      delay: 0.3,
    },
    {
      title: 'OTSUTSUKI',
      image: '/otsutsuki.png',
      color: 'white',
      description: 'Seres celestiais do Naruto Dark. Poder cósmico aguarda os escolhidos.',
      delay: 0.45,
    },
  ];

  return (
    <section id="eventos" ref={sectionRef} className="py-32 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-10 w-96 h-96 bg-red-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 right-10 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <h2
          ref={titleRef}
          className="text-5xl md:text-7xl font-black text-center mb-32 glow-orange"
        >
          ⚔️ ORGANIZAÇÕES SUPREMAS
        </h2>

        <div
          ref={containerRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12"
        >
          {events.map((event) => (
            <EventIcon
              key={event.title}
              {...event}
            />
          ))}
        </div>

        {/* Bottom divider */}
        <div className="mt-32 flex items-center justify-center gap-8">
          <div className="h-1 flex-1 bg-gradient-to-r from-transparent via-primary to-transparent rounded-full" />
          <div className="text-2xl">⚡</div>
          <div className="h-1 flex-1 bg-gradient-to-r from-transparent via-secondary to-transparent rounded-full" />
        </div>
      </div>
    </section>
  );
}
