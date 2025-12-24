"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";

interface PlayModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SERVER_IP = "naruto.rededarkmc.com";

export function PlayModal({ isOpen, onClose }: PlayModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [copyLabel, setCopyLabel] = useState("📋 Copiar IP");

  useEffect(() => {
    if (isOpen && contentRef.current) {
      gsap.fromTo(
        contentRef.current,
        { scale: 0, rotation: -10, opacity: 0 },
        { scale: 1, rotation: 0, opacity: 1, duration: 0.5, ease: "back.out(1.7)" }
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
        ease: "back.in(1.7)",
        onComplete: onClose,
      });
    }
  };

  const handleCopyIp = () => {
    navigator.clipboard.writeText(SERVER_IP);
    setCopyLabel("✓ Copiado!");
    setTimeout(() => setCopyLabel("📋 Copiar IP"), 2000);
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
        className="relative max-w-md w-full mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="relative rounded-2xl p-1"
          style={{
            background: "linear-gradient(45deg, #f97316, #8b5cf6, #f97316)",
            backgroundSize: "200% 200%",
            animation: "gradient-shift 3s ease infinite",
            boxShadow: "0 0 40px rgba(249, 115, 22, 0.7), 0 0 60px rgba(139, 92, 246, 0.6)",
          }}
        >
          <div className="relative bg-gray-900 rounded-2xl p-6 md:p-8 overflow-hidden">
            <button
              onClick={handleClose}
              className="absolute top-3 right-3 text-white/60 hover:text-white transition-colors text-2xl w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10"
              aria-label="Fechar modal"
            >
              ×
            </button>

            <div className="relative w-40 h-40 md:w-48 md:h-48 mx-auto mb-4 animate-float">
              <Image
                src="/kuramadiscord.png"
                alt="Kurama Naruto Dark"
                fill
                sizes="(max-width: 768px) 160px, 192px"
                className="object-contain"
                style={{
                  filter:
                    "drop-shadow(0 0 20px rgba(249, 115, 22, 0.8)) drop-shadow(0 0 30px rgba(139, 92, 246, 0.6))",
                }}
              />
            </div>

            <h2 className="text-2xl md:text-3xl font-black text-center mb-3 glow-purple">
              🔸 IP do Naruto Dark
            </h2>

            <p className="text-center text-muted-foreground text-sm mb-6">
              Copie o IP e entre agora mesmo no servidor. Nos vemos em Konoha!
            </p>

            <div className="bg-black/40 rounded-xl p-4 mb-6 border-2 border-primary/30">
              <p className="text-center text-primary font-mono text-lg break-all">
                {SERVER_IP}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleCopyIp}
                className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl font-bold transition-all border-2 border-white/20 hover:border-white/40"
              >
                {copyLabel}
              </button>
              <button
                onClick={handleClose}
                className="px-6 py-3 bg-secondary hover:bg-secondary/80 rounded-xl font-bold transition-all text-secondary-foreground"
              >
                ✨ Fechar e jogar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
