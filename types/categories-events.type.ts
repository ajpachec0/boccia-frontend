export interface Court {
  name: string;
  status: string;
}

export interface PlayerStats {
  wins: number;
  pointsDiff: number;
  pointsFor: number;
  endsWon: number;
  pdiffMatch: number;
  pdiffEnd: number;
}

export interface VsRecord {
  [opponentId: string]: number;
}

export interface Player {
  id: string;
  name: string;
  country: string;
  flag?: string;
  stats?: PlayerStats;
  vsRecord?: VsRecord;
  score?: number;
}

export interface Pool {
  id: string;
  name: string;
  players: Player[];
}

export interface Match {
  id: string;
  players: Player[];
}

export interface Round {
  id: string;
  number: number;
  matches: Match[];
}

export interface CategoryEvent {
  id: string;
  name: string;
  date: string;
  location: string;
  entrants: number;
  format: string;
  courts: Court[];
  pools: Pool[];
  rounds: Round[];
  standings: {
    id: string;
    name: string;
    country: string;
    flag?: string;
    color: string;
    textColor?: string;
  }[];
}
