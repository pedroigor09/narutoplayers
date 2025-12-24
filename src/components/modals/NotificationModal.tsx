"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NotificationModal({ isOpen, onClose }: NotificationModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState("");
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const days = [
    "Terça-Feira",
    "Quinta-Feira",
    "Sexta-Feira",
    "Sábado",
    "Domingo",
  ];

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
        onComplete: () => {
          onClose();
          setTimeout(() => {
            setEmail("");
            setSelectedDays([]);
            setStatus("idle");
            setMessage("");
          }, 100);
        },
      });
    }
  };

  const toggleDay = (day: string) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || selectedDays.length === 0) {
      setStatus("error");
      setMessage("Por favor, preencha seu email e selecione pelo menos um dia.");
      return;
    }

    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          days: selectedDays,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("success");
        setMessage("🎉 Inscrição realizada com sucesso! Você receberá notificações dos eventos.");
        setTimeout(() => {
          handleClose();
        }, 2000);
      } else {
        setStatus("error");
        setMessage(data.error || "Erro ao processar inscrição. Tente novamente.");
      }
    } catch (error) {
      setStatus("error");
      setMessage("Erro ao conectar com o servidor. Tente novamente.");
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
        className="relative max-w-lg w-full mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="relative rounded-2xl p-1"
          style={{
            background: "linear-gradient(45deg, #8b5cf6, #f97316, #8b5cf6)",
            backgroundSize: "200% 200%",
            animation: "gradient-shift 3s ease infinite",
            boxShadow: "0 0 40px rgba(139, 92, 246, 0.7), 0 0 60px rgba(249, 115, 22, 0.6)",
          }}
        >
          <div className="relative bg-gray-900 rounded-2xl p-8 overflow-hidden">
            <button
              onClick={handleClose}
              className="absolute top-3 right-3 text-white/60 hover:text-white transition-colors text-2xl w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10"
              aria-label="Fechar modal"
            >
              ×
            </button>

            <h2 className="text-3xl font-black text-center mb-3 glow-purple">
              🔔 Notificações de Eventos
            </h2>

            <p className="text-center text-muted-foreground text-sm mb-6">
              Receba lembretes por email dos eventos que você não quer perder!
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-primary mb-2">
                  Seu Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ninja@exemplo.com"
                  className="w-full px-4 py-3 bg-black/40 border border-primary/30 rounded-xl text-white placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                  disabled={status === "loading"}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-primary mb-3">
                  Dias de Interesse
                </label>
                <div className="space-y-2">
                  {days.map((day) => (
                    <button
                      key={day}
                      type="button"
                      onClick={() => toggleDay(day)}
                      disabled={status === "loading"}
                      className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 text-left font-semibold ${
                        selectedDays.includes(day)
                          ? "bg-primary/20 border-primary text-primary shadow-lg shadow-primary/20"
                          : "bg-black/20 border-primary/20 text-muted-foreground hover:border-primary/50 hover:bg-black/40"
                      }`}
                    >
                      <span className="mr-2">{selectedDays.includes(day) ? "✓" : "○"}</span>
                      {day}
                    </button>
                  ))}
                </div>
              </div>

              {message && (
                <div
                  className={`p-4 rounded-xl text-sm font-semibold ${
                    status === "success"
                      ? "bg-green-500/20 border border-green-500/50 text-green-400"
                      : "bg-red-500/20 border border-red-500/50 text-red-400"
                  }`}
                >
                  {message}
                </div>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full px-6 py-4 bg-gradient-to-r from-primary to-secondary text-white font-black rounded-xl hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-primary/50"
              >
                {status === "loading" ? "Processando..." : "🎯 Ativar Notificações"}
              </button>
            </form>

            <p className="text-xs text-muted-foreground text-center mt-4">
              💡 Você receberá um email de confirmação e lembretes 1 hora antes dos eventos.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
