'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';

interface DiscordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DiscordModal({ isOpen, onClose }: DiscordModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && contentRef.current) {
      // Animação de entrada
      gsap.fromTo(
        contentRef.current,
        { scale: 0, rotation: -10, opacity: 0 },
        { scale: 1, rotation: 0, opacity: 1, duration: 0.5, ease: 'back.out(1.7)' }
      );
    }
  }, [isOpen]);

  const handleClose = () => {
    if (contentRef.current) {
      gsap.to(contentRef.current, {
        scale: 0,
        rotation: 10,
        opacity: 0,
        duration: 0.3,
        ease: 'back.in(1.7)',
        onComplete: onClose,
      });
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText('https://discord.gg/6NPT4AfSAW');
    // Feedback visual
    const btn = document.getElementById('copy-btn');
    if (btn) {
      btn.textContent = '✓ Copiado!';
      setTimeout(() => {
        btn.textContent = '📋 Copiar Link';
      }, 2000);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      ref={modalRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-xl"
      onClick={handleClose}
    >
      <div
        ref={contentRef}
        className="relative max-w-2xl w-full mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Neon Border */}
        <div
          className="relative rounded-3xl p-1"
          style={{
            background: 'linear-gradient(45deg, #8b5cf6, #5865f2, #8b5cf6)',
            backgroundSize: '200% 200%',
            animation: 'gradient-shift 3s ease infinite',
            boxShadow:
              '0 0 60px rgba(88, 101, 242, 0.8), 0 0 100px rgba(139, 92, 246, 0.6)',
          }}
        >
          {/* Content */}
          <div className="relative bg-gray-900 rounded-3xl p-8 md:p-12 overflow-hidden">
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors text-2xl w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10"
            >
              ×
            </button>

            {/* Kuruma Image */}
            <div className="relative w-64 h-64 md:w-80 md:h-80 mx-auto mb-6 animate-float">
              <Image
                src="/kuramadiscord.png"
                alt="Kuruma Discord"
                fill
                sizes="(max-width: 768px) 256px, 320px"
                className="object-contain"
                style={{
                  filter:
                    'drop-shadow(0 0 30px rgba(88, 101, 242, 0.8)) drop-shadow(0 0 50px rgba(139, 92, 246, 0.6))',
                }}
              />
            </div>

            {/* Title */}
            <h2 className="text-3xl md:text-4xl font-black text-center mb-4 glow-purple">
              Junte-se ao Discord!
            </h2>

            <p className="text-center text-muted-foreground mb-8">
              Entre para a nossa comunidade e fique por dentro de todas as novidades, eventos
              e atualizações do servidor!
            </p>

            {/* Link Box */}
            <div className="bg-black/40 rounded-xl p-4 mb-6 border-2 border-primary/30">
              <p className="text-center text-primary font-mono text-lg break-all">
                https://discord.gg/6NPT4AfSAW
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                id="copy-btn"
                onClick={handleCopyLink}
                className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl font-bold transition-all border-2 border-white/20 hover:border-white/40"
              >
                📋 Copiar Link
              </button>
              <a
                href="https://discord.gg/6NPT4AfSAW"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-[#5865f2] hover:bg-[#4752c4] rounded-xl font-bold transition-all text-center"
                style={{
                  boxShadow: '0 0 20px rgba(88, 101, 242, 0.6)',
                }}
              >
                🚀 Abrir Discord
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
