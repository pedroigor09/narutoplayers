'use server';

import { Event, ServerStats } from '@/types';
import { TimelineEvent } from '@/types/timeline';

export async function getServerStats(): Promise<ServerStats> {
  // Simula busca de stats do servidor
  // Em produção, conectar com API do Minecraft
  return {
    playersOnline: 47,
    totalPlayers: 1250,
    uptime: '24/7',
  };
}

export async function getEvents(): Promise<Event[]> {
  // Simula busca de eventos
  // Em produção, conectar com banco de dados
  return [
    {
      id: '1',
      title: 'Seleção Akatsuki Oficial',
      description: 'Participe da seleção para se tornar um membro oficial da Akatsuki!',
      type: 'akatsuki',
      date: '2025-12-25',
      status: 'active',
    },
    {
      id: '2',
      title: 'Eleição de Kages',
      description: 'Vote nos candidatos para liderar as vilas ninja!',
      type: 'kage',
      date: '2025-12-30',
      status: 'upcoming',
    },
    {
      id: '3',
      title: 'Exame Chunin',
      description: 'Teste suas habilidades e conquiste o título de Chunin!',
      type: 'chunin',
      date: '2026-01-05',
      status: 'upcoming',
    },
  ];
}

export async function getTimeline(): Promise<TimelineEvent[]> {
  return [
    {
      year: 2019,
      title: 'Era da Fundição',
      description: 'O lendário Naruto Dark nasce das cinzas. Uma decisão histórica transforma o servidor: de premium exclusivo para acessível a todos. Original e pirata unidos pela primeira vez. Os portões se abrem, e centenas de novos ninjas invadem as vilas.',
    },
    {
      year: 2020,
      title: 'Era da Estruturação',
      description: 'O sistema de ranking oficial se expande como nunca antes. Hierarquias ninja se solidificam, criando uma base sólida para o futuro. A comunidade começa a tomar forma, estabelecendo as fundações do império que viria a se tornar.',
    },
    {
      year: 2021,
      title: 'Era da Inovação',
      description: 'Ambição transborda. Novos plugins, sistemas revolucionários e mecânicas avançadas são anunciados. Alguns triunfam, outros permanecem como promessas não cumpridas. Mas a visão estava clara: transformar o servidor no melhor do Brasil.',
    },
    {
      year: 2022,
      title: 'Era das Provações',
      description: 'Trevas cobrem o servidor. Dificuldades com jogadores, crises internas e desafios ameaçam tudo. Mas das cinzas surge esperança: Inemafoo, o dono da rede, pega o controle e começa a gravar. A resistência começa. A tempestade será superada.',
    },
    {
      year: 2023,
      title: 'Era do Renascimento',
      description: 'O fênix renasce das chamas. Após a grande crise, o servidor explode em crescimento. Mais de 40 ninjas simultâneos, algo impensável meses antes. Black e Flavinha surgem como lendas vivas, renovando completamente o Naruto Dark. Uma nova era dourada começa.',
    },
    {
      year: 2024,
      title: 'Era da Revolução Tecnológica',
      description: 'O avanço tecnológico atinge níveis inimagináveis. Aberturas épicas com mais de 70 ninjas simultâneos quebram todos os recordes. O sucesso é tão avassalador que um segundo servidor se torna necessário. A infraestrutura cresce. O império se expande.',
    },
    {
      year: 2025,
      title: 'Era da Transcendência',
      description: 'O servidor transcende suas limitações. Lobbo e Luvas ascendem ao posto de admin, trazendo uma revolução administrativa. Sistemas surreais, plugins inovadores e scripts nunca vistos transformam a experiência. O Naruto Dark não é mais apenas um servidor. É um legado vivo.',
    },
  ];
}
