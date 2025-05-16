import type { Player, Team } from "../types";

export const balanceTeams = (
  players: Player[]
): { team1: Team; team2: Team } => {
  // Oyuncuları rastgele karıştır
  const shuffleArray = (arr: Player[]) => {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  // Bir takımın toplam puanını hesapla
  const getTeamRating = (team: Player[]) =>
    team.reduce((sum, p) => sum + p.rating, 0);

  let bestTeam1: Player[] = [];
  let bestTeam2: Player[] = [];
  let minDiff = Infinity;
  const maxAttempts = 1000; // Deneme sayısı
  const totalRating = players.reduce((sum, p) => sum + p.rating, 0);
  const maxAllowedDiff = totalRating * 0.05; // %5 fark sınırı

  // Birden fazla kombinasyon dene
  for (let i = 0; i < maxAttempts; i++) {
    const shuffled = shuffleArray([...players]);
    const team1 = shuffled.slice(0, 7);
    const team2 = shuffled.slice(7);
    const team1Rating = getTeamRating(team1);
    const team2Rating = getTeamRating(team2);
    const diff = Math.abs(team1Rating - team2Rating);

    if (diff < minDiff && diff <= maxAllowedDiff) {
      minDiff = diff;
      bestTeam1 = team1;
      bestTeam2 = team2;
    }
  }

  return {
    team1: { players: bestTeam1, totalRating: getTeamRating(bestTeam1) },
    team2: { players: bestTeam2, totalRating: getTeamRating(bestTeam2) },
  };
};
