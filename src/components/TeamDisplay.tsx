import React from "react";
import type { Team } from "../types";

interface TeamDisplayProps {
  team1: Team;
  team2: Team;
}

const TeamDisplay: React.FC<TeamDisplayProps> = ({ team1, team2 }) => {
  return (
    <div>
      <h2>Takımlar</h2>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <h3>Takım 1 (Toplam Puan: {team1.totalRating})</h3>
          <ul>
            {team1.players.map((player) => (
              <li key={player.id}>
                {player.name} - Puan: {player.rating}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3>Takım 2 (Toplam Puan: {team2.totalRating})</h3>
          <ul>
            {team2.players.map((player) => (
              <li key={player.id}>
                {player.name} - Puan: {player.rating}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TeamDisplay;
