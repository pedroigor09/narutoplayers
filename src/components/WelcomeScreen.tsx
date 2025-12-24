'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';

// Generate random snowflakes data
const generateSnowflakes = () => {
  const snowflakes = [];
  
  // 250 small snowflakes
  for (let i = 1; i <= 250; i++) {
    snowflakes.push({
      id: `sm-${i}`,
      size: 'sm',
      left: `${Math.random() * 120 - 20}vw`,
      blur: `${Math.random() * 2 - 1}px`,
      flickrDuration: `${(Math.random() * 20 + 20) / 10}s`,
      flickrDelay: `${(Math.random() * 20) / -10}s`,
      fallDuration: `${(Math.random() * 100 + 50) / 5}s`,
      fallDelay: `${(Math.random() * 100) / -5}s`,
    });
  }
  
  // 50 medium snowflakes
  for (let i = 1; i <= 50; i++) {
    snowflakes.push({
      id: `md-${i}`,
      size: 'md',
      left: `${Math.random() * 120 - 20}vw`,
      blur: `${Math.random() * 2 - 1}px`,
      flickrDuration: `${(Math.random() * 20 + 20) / 10}s`,
      flickrDelay: `${(Math.random() * 20) / -10}s`,
      fallDuration: `${(Math.random() * 100 + 50) / 5}s`,
      fallDelay: `${(Math.random() * 100) / -5}s`,
    });
  }
  
  // 50 large snowflakes
  for (let i = 1; i <= 50; i++) {
    snowflakes.push({
      id: `lg-${i}`,
      size: 'lg',
      left: `${Math.random() * 120 - 20}vw`,
      blur: `0px`,
      flickrDuration: `${(Math.random() * 20 + 20) / 10}s`,
      flickrDelay: `${(Math.random() * 20) / -10}s`,
      fallDuration: `${(Math.random() * 100 + 50) / 5}s`,
      fallDelay: `${(Math.random() * 100) / -5}s`,
    });
  }
  
  return snowflakes;
};

export function WelcomeScreen() {
  const [show, setShow] = useState(true);
  const [text, setText] = useState('');
  const [snowflakes, setSnowflakes] = useState<ReturnType<typeof generateSnowflakes>>([]);
  const [mounted, setMounted] = useState(false);
  const fullText = 'Bem-vindo ao site oficial do Naruto Dark';
  const welcomeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Generate snowflakes only on client
    setSnowflakes(generateSnowflakes());
    setMounted(true);

    // Typewriter effect
    let index = 0;
    const typeInterval = setInterval(() => {
      if (index < fullText.length) {
        setText(fullText.slice(0, index + 1));
        index++;
      } else {
        clearInterval(typeInterval);
        // Depois de 3 segundos, fade out
        setTimeout(() => {
          gsap.to(welcomeRef.current, {
            opacity: 0,
            duration: 1,
            onComplete: () => setShow(false),
          });
        }, 3000);
      }
    }, 80);

    return () => clearInterval(typeInterval);
  }, []);

  const handleSkip = () => {
    gsap.to(welcomeRef.current, {
      opacity: 0,
      duration: 0.5,
      onComplete: () => setShow(false),
    });
  };

  if (!show) return null;

  return (
    <div
      ref={welcomeRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 backdrop-blur-xl overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0 opacity-30">
        <Image
          src="/novidade1.png"
          alt="Próxima Atualização"
          fill
          sizes="100vw"
          className="object-cover blur-md"
          priority
        />
      </div>

      {/* Snowflakes */}
      {mounted && (
        <div className="snowflake-area absolute inset-0 pointer-events-none">
          {snowflakes.map((flake) => (
            <div
              key={flake.id}
              className={`snowflake ${flake.size === 'md' ? '_md' : flake.size === 'lg' ? '_lg' : ''}`}
              style={{
                left: flake.left,
                filter: `blur(${flake.blur})`,
                animation: `flickr ${flake.flickrDuration} ${flake.flickrDelay} infinite, fall ${flake.fallDuration} ${flake.fallDelay} infinite`,
              }}
            >
              ❅
            </div>
          ))}
        </div>
      )}

      {/* Mystery Background Info */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 z-10 text-center px-4">
        <p className="text-sm text-muted-foreground/80 italic">
          A imagem de fundo sempre será um mistério sobre a próxima novidade do servidor
        </p>
      </div>

      {/* Skip Button */}
      <button
        onClick={handleSkip}
        className="absolute top-8 right-8 z-10 group px-4 py-2 rounded-full bg-white/5 backdrop-blur-md border border-white/10 hover:border-primary/50 transition-all duration-300 hover:scale-105"
      >
        <span className="text-sm font-semibold text-white/70 group-hover:text-white transition-colors">
          Pular Intro ⏭️
        </span>
      </button>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center gap-12 px-4">
        {/* Typewriter text */}
        <h1 className="text-4xl md:text-6xl font-black text-center glow-purple">
          {text}
          <span className="animate-pulse">|</span>
        </h1>

        {/* Cupom */}
        <div className="relative animate-float w-80 md:w-96 h-48 md:h-56">
          <Image
            src="/cupomNatal.png"
            alt="Cupom de Natal"
            fill
            sizes="(max-width: 768px) 320px, 384px"
            className="object-contain"
            style={{
              filter: 'drop-shadow(0 0 30px rgba(139, 92, 246, 0.8)) drop-shadow(0 0 50px rgba(236, 72, 153, 0.6)) drop-shadow(0 0 70px rgba(245, 158, 11, 0.4))'
            }}
            priority
          />
        </div>

        {/* Mystery teaser */}
        <p className="text-lg md:text-xl text-muted-foreground text-center max-w-xl animate-pulse">
A imagem de fundo sempre será um mistério sobre a próxima novidade do servidor
        </p>
      </div>
    </div>
  );
}
