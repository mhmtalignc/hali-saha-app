export interface Player {
  id: number;
  name: string;
  rating: number;
}

export interface Team {
  players: Player[];
  totalRating: number;
}
