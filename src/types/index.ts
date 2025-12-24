export interface Event {
  id: string;
  title: string;
  description: string;
  type: 'akatsuki' | 'kage' | 'chunin' | 'outros';
  date?: string;
  image?: string;
  status: 'active' | 'upcoming' | 'finished';
}

export interface ServerStats {
  playersOnline: number;
  totalPlayers: number;
  uptime: string;
}
