"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { NotificationModal } from "@/components/modals/NotificationModal";

gsap.registerPlugin(ScrollTrigger);

interface EventDetails {
  name: string;
  rewards: string;
}

interface DayEvent {
  day: string;
  host: string;
  events: EventDetails[];
}

const weekEvents: DayEvent[] = [
  {
    day: "Terça-Feira",
    host: "@[NC-DARK] Perassolo",
    events: [
      {
        name: "Evento Orbe 3x",
        rewards: "",
      },
      {
        name: "Evento Top 1/2/3 do PvP",
        rewards: "Tag Exclusiva",
      },
    ],
  },
  {
    day: "Quinta-Feira",
    host: "@[NC-DARK] Perassolo",
    events: [
      {
        name: "Evento Orbe 3x",
        rewards: "",
      },
      {
        name: "Evento Sumô",
        rewards: "10KK de TP, 16 Cenouras dos Deuses e Tag Exclusiva",
      },
    ],
  },
  {
    day: "Sexta-Feira",
    host: "@[NC-DARK] Lucas",
    events: [
      {
        name: "Evento Rank Lendário",
        rewards: "Modo de 500 de stats, Espada de 20k de dano e Tag Exclusiva",
      },
      {
        name: "Evento Death Run",
        rewards: "20KK de TP, 16 Cenouras dos Deuses, 1 Essência do Madara e 1 Essência de Jinchuuriki",
      },
    ],
  },
  {
    day: "Sábado",
    host: "@[NC-DARK] Lucas",
    events: [
      {
        name: "Evento Orbe 3x",
        rewards: "",
      },
      {
        name: "Evento Hyuuga, Uchiha Dominante & Uzumaki Dominante",
        rewards: "32 Cenoura dos Deuses, 3 Essências do Jiraya e Tag Exclusiva",
      },
    ],
  },
  {
    day: "Domingo",
    host: "@[NC-DARK] Cerrbu",
    events: [
      {
        name: "Evento Mito do PvP",
        rewards: "Tag Exclusiva",
      },
      {
        name: "Evento Parkour",
        rewards: "20KK de TP, 16 Cenouras dos Deuses, 1 Essência do Madara e 1 Essência de Jinchuuriki",
      },
    ],
  },
];

export function EventsCalendar() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, index) => {
        if (!card) return;
        
        gsap.fromTo(
          card,
          {
            opacity: 0,
            y: 100,
            scale: 0.9,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: "back.out(1.2)",
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
              end: "top 50%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <NotificationModal
        isOpen={isNotificationModalOpen}
        onClose={() => setIsNotificationModalOpen(false)}
      />
      
      <section ref={sectionRef} className="min-h-screen py-32 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">

          <div className="text-center mb-20">
            <h1 className="text-6xl md:text-8xl font-black mb-6 glow-purple">
              Calendário de Eventos
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Participe dos eventos semanais épicos e conquiste recompensas lendárias.
              Cada dia traz novos desafios e oportunidades de se tornar uma lenda.
            </p>
            
            <button
              onClick={() => setIsNotificationModalOpen(true)}
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white font-black rounded-xl hover:scale-105 transition-all duration-300 shadow-lg shadow-primary/50 group"
            >
              <span className="text-2xl group-hover:animate-bounce">🔔</span>
              <span>Receber Notificações</span>
            </button>
          </div>

        <div className="relative">
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-secondary to-primary opacity-30 transform -translate-x-1/2"></div>

          <div className="space-y-12">
            {weekEvents.map((dayEvent, index) => (
              <div
                key={dayEvent.day}
                ref={(el) => {
                  if (el) cardsRef.current[index] = el;
                }}
                className={`relative flex items-start gap-8 ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                <div className="hidden md:flex absolute left-1/2 top-8 transform -translate-x-1/2 z-10">
                  <div className="relative">
                    <div className="w-6 h-6 bg-gradient-to-br from-primary to-secondary rounded-full border-4 border-background shadow-lg shadow-primary/50 animate-pulse"></div>
                    <div className="absolute inset-0 w-6 h-6 rounded-full border-4 border-primary/50 animate-ping"></div>
                  </div>
                </div>

                <div className={`flex-1 ${index % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                  <div className="inline-block w-full md:w-auto md:max-w-xl">
                    <div className="relative group">
                      <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-3xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
                      
                      <div className="relative bg-black/40 backdrop-blur-xl border border-primary/20 rounded-3xl p-8 hover:border-primary/50 transition-all duration-500 hover:scale-105">
                        <div className="flex items-center justify-between mb-6 pb-4 border-b border-primary/20">
                          <h2 className="text-3xl font-black glow-orange">
                            {dayEvent.day}
                          </h2>
                          <div className="text-sm text-muted-foreground font-mono bg-primary/10 px-3 py-1 rounded-full">
                            {dayEvent.host}
                          </div>
                        </div>

                        <div className="space-y-6">
                          {dayEvent.events.map((event, eventIndex) => (
                            <div key={eventIndex} className="space-y-2">
                              <div className="flex items-start gap-3">
                                <span className="text-secondary text-xl flex-shrink-0 mt-1">
                                  ⚡
                                </span>
                                <div className="flex-1">
                                  <h3 className="text-lg font-bold text-primary mb-2">
                                    {event.name}
                                  </h3>
                                  {event.rewards && (
                                    <div className="flex items-start gap-2 text-sm text-muted-foreground">
                                      <span className="text-secondary flex-shrink-0 mt-0.5">
                                        ⤷
                                      </span>
                                      <p>
                                        <span className="text-primary/80 font-semibold">
                                          Recompensas:
                                        </span>{" "}
                                        {event.rewards}
                                      </p>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="absolute top-4 right-4 w-2 h-2 bg-secondary rounded-full animate-pulse"></div>
                        <div className="absolute bottom-4 left-4 w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: "0.5s" }}></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="hidden md:block flex-1"></div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-20">
          <div className="inline-block bg-gradient-to-r from-primary/10 to-secondary/10 backdrop-blur-xl border border-primary/20 rounded-full px-8 py-4">
            <p className="text-lg font-semibold">
              ⭐ Participe e construa seu legado no Naruto Dark
            </p>
          </div>
        </div>
      </div>
    </section>
    </>
  );
}
