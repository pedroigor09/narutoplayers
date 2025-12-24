'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface StaffMember {
  id: number;
  name: string;
  role: string;
  image: string;
  description: string;
}

const STAFF: StaffMember[] = [
  {
    id: 0,
    name: 'Eisenbahnn',
    role: 'FUNDADOR & GERENTE',
    image: '/eisen.png',
    description: 'Fundador e gerente da Rede-Dark, idealizador da visão que transformou o servidor.',
  },
  {
    id: 1,
    name: 'Pedrito',
    role: 'HEAD ADMIN',
    image: '/pedrito.png',
    description: 'Head-Admin do Naruto Dark e Head Discord da Rede-Dark. Atua na gestão estratégica de ambas as plataformas.',
  },
  {
    id: 2,
    name: 'iLobbo',
    role: 'ADMIN & DEVELOPER',
    image: '/iLobbo.jpg',
    description: 'Administrador e desenvolvedor do Naruto Dark. Confiança absoluta do Head-Admin, atuando diretamente na gestão técnica.',
  },
  {
    id: 3,
    name: 'Luvas',
    role: 'ADMIN',
    image: '/luvas.png',
    description: 'Administrador focado em marketing e liderança. Apoio estratégico ao Lobbo e mentor de estagiários e staff.',
  },
  {
    id: 4,
    name: 'Cerrbu',
    role: 'ADMIN NOVATO',
    image: '/cerrbu.jpeg',
    description: 'Administrador em ascensão, focado em organização e liderança geral da equipe.',
  },
];

const SPACING = 0.20; 

function StaffCard({ member }: { member: StaffMember }) {
  return (
    <li className="gallery__card card absolute w-56 h-80">
      <div className="card__card h-full w-full">
        <div className="card__content relative h-full w-full overflow-hidden rounded-xl bg-gray-900">
          <Image
            src={member.image}
            alt={member.name}
            fill
            sizes="224px"
            className="card__image absolute inset-0 h-full w-full object-cover scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

          <div className="card__details absolute inset-0 flex flex-col items-center justify-end pb-6 px-4">
            <div className="card__role text-secondary uppercase text-xs font-bold tracking-widest mb-1">
              {member.role}
            </div>
            <h2 className="card__title text-white font-black text-lg text-center mb-2 glow-purple">
              {member.name}
            </h2>
            <p className="text-gray-300 text-xs text-center leading-snug">
              {member.description}
            </p>
          </div>
        </div>

        <div
          className="card__reflection absolute top-8 left-0 h-full w-full overflow-hidden rounded-xl"
          aria-hidden="true"
          style={{
            filter: 'blur(5px)',
            opacity: 0.2,
          }}
        >
          <Image
            src={member.image}
            alt=""
            fill
            sizes="224px"
            className="absolute inset-0 h-full w-full object-cover scale-110"
          />
        </div>
      </div>
    </li>
  );
}

export function StaffSection() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!galleryRef.current) return;

    const { snap, toArray } = gsap.utils;

    const NEXT = galleryRef.current.querySelector('.gallery__next');
    const PREV = galleryRef.current.querySelector('.gallery__prev');

    const CARD_SNAP = snap(SPACING);
    const CARDS = toArray<HTMLElement>('.gallery__card');

    let iteration = 0;
    const LOOP = gsap.timeline({
      paused: true,
      repeat: -1,
      onRepeat() {
        this._time === this._dur && (this._tTime += this._dur - 0.01);
      },
    });

    const OVERLAP = Math.ceil(1 / SPACING);
    const START = STAFF.length * SPACING + 0.5;
    const LOOP_TIME = (STAFF.length + OVERLAP) * SPACING + 1;

    const RAW = gsap.timeline({ paused: true });

    gsap.set(CARDS, { xPercent: 5000, opacity: 0, scale: 0 });

    const L = STAFF.length + OVERLAP * 2;
    for (let i = 0; i < L; i++) {
      const index = i % STAFF.length;
      const item = CARDS[index];
      const time = i * SPACING;

      RAW.fromTo(
        item,
        { opacity: 0 },
        {
          opacity: 1,
          delay: 0.25,
          duration: 0.25,
          yoyo: true,
          ease: 'none',
          repeat: 1,
          immediateRender: false,
        },
        time
      )
        .fromTo(
          item,
          { scale: 0 },
          {
            scale: 1,
            zIndex: 100,
            duration: 0.5,
            yoyo: true,
            repeat: 1,
            ease: 'none',
            immediateRender: false,
          },
          time
        )
        .fromTo(
          item,
          { xPercent: 350 },
          { xPercent: -350, duration: 1, ease: 'none', immediateRender: false },
          time
        );

      i <= STAFF.length && LOOP.add(`label${i}`, time);
    }

    RAW.time(START);
    LOOP.to(RAW, {
      time: LOOP_TIME,
      duration: LOOP_TIME - START,
      ease: 'none',
    }).fromTo(
      RAW,
      { time: OVERLAP * SPACING + 1 },
      {
        time: START,
        duration: START - (OVERLAP * SPACING + 1),
        immediateRender: false,
        ease: 'none',
      }
    );

    const SCRUB = gsap.to(LOOP, {
      totalTime: 0,
      duration: 0.5,
      ease: 'power3',
      paused: true,
    });

    const wrapForward = () => {
      iteration++;
      TRIGGER.wrapping = true;
      TRIGGER.scroll(TRIGGER.start + 1);
    };

    const wrapBackward = () => {
      iteration--;
      if (iteration < 0) {
        iteration = 9;
        LOOP.totalTime(LOOP.totalTime() + LOOP.duration() * 10);
      }
      TRIGGER.wrapping = true;
      TRIGGER.scroll(TRIGGER.end - 1);
    };

    const SCRUB_TO = (totalTime: number) => {
      SCRUB.vars.totalTime = CARD_SNAP(totalTime);
      SCRUB.invalidate().restart();
    };

    NEXT?.addEventListener('click', () => {
      SCRUB_TO(SCRUB.vars.totalTime + SPACING);
    });

    PREV?.addEventListener('click', () => {
      SCRUB_TO(SCRUB.vars.totalTime - SPACING);
    });

    return () => {
      SCRUB.kill();
      LOOP.kill();
      RAW.kill();
    };
  }, []);

  return (
    <>
      {/* Título ANTES da galeria pinada */}
      <section id="staff" className="relative py-20 overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <h2
            ref={titleRef}
            className="text-5xl md:text-7xl font-black text-center mb-4 glow-purple"
          >
            👑 NOSSA STAFF
          </h2>

          <p className="text-center text-muted-foreground text-lg max-w-2xl mx-auto">
            A gerência do Naruto Dark que vem se expandindo desde 2019, liderando a comunidade
            com dedicação e paixão pelo servidor.
          </p>
        </div>
      </section>

      {/* Galeria PINADA */}
      <section
        ref={galleryRef}
        className="gallery relative w-full h-screen flex items-center justify-center overflow-hidden"
      >
        <ul
          className="gallery__content absolute list-none m-0 p-0 w-56 h-80"
          style={{
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          {STAFF.map((member) => (
            <StaffCard key={member.id} member={member} />
          ))}
        </ul>

        {/* Navigation Buttons */}
        <button
          className="gallery__prev absolute z-20 rounded-full transition-opacity opacity-50 hover:opacity-100 left-8 top-1/2 -translate-y-1/2 focus:outline-none"
          aria-label="Anterior"
        >
          <svg
            className="h-16 w-16 fill-current text-primary hover:text-secondary transition-colors"
            viewBox="0 0 256 512"
          >
            <path d="M31.7 239l136-136c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9L127.9 256l96.4 96.4c9.4 9.4 9.4 24.6 0 33.9L201.7 409c-9.4 9.4-24.6 9.4-33.9 0l-136-136c-9.5-9.4-9.5-24.6-.1-34z" />
          </svg>
        </button>

        <button
          className="gallery__next absolute z-20 rounded-full transition-opacity opacity-50 hover:opacity-100 right-8 top-1/2 -translate-y-1/2 focus:outline-none"
          aria-label="Próximo"
        >
          <svg
            className="h-16 w-16 fill-current text-primary hover:text-secondary transition-colors"
            viewBox="0 0 256 512"
          >
            <path d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34z" />
          </svg>
        </button>
      </section>

      {/* Info DEPOIS da galeria */}
      <section className="relative py-12 overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <p className="text-center text-muted-foreground text-lg max-w-3xl mx-auto leading-relaxed">
            Desde 2019, construímos mais do que um servidor. Criamos uma experiência.
            Nossa equipe dedicada transforma cada momento em algo extraordinário,
            garantindo que sua jornada ninja seja inesquecível. Do Head Admin Pedrito aos
            nossos talentos emergentes, cada membro da staff é escolhido pela paixão e
            compromisso com a excelência. Porque no Naruto Dark, não criamos apenas eventos.
            <span className="text-primary font-semibold"> Criamos lendas</span>.
          </p>
        </div>
      </section>
    </>
  );
}
