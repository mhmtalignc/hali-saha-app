import React, { useState, useEffect } from "react";
import PlayerForm from "./components/PlayerForm";
import TeamDisplay from "./components/TeamDisplay";
import FieldVisualization from "./components/FieldVisualization";
import { balanceTeams } from "./utils/teamBalancer";
import type { Player, Team } from "./types";
import "./styles/App.css";

const App: React.FC = () => {
  const [teams, setTeams] = useState<{ team1: Team; team2: Team } | null>(
    () => {
      const saved = localStorage.getItem("teams");
      return saved ? JSON.parse(saved) : null;
    }
  );

  useEffect(() => {
    if (teams) {
      localStorage.setItem("teams", JSON.stringify(teams));
    } else {
      localStorage.removeItem("teams"); // Takımlar sıfırlanırsa LocalStorage’dan sil
    }
  }, [teams]);

  const handleGenerateTeams = (players: Player[]) => {
    const balancedTeams = balanceTeams(players);
    setTeams(balancedTeams);
  };

  return (
    <div className="App">
      <h1>Halı Saha Takım Oluşturucu</h1>
      <PlayerForm onGenerateTeams={handleGenerateTeams} />
      {teams && (
        <>
          <TeamDisplay team1={teams.team1} team2={teams.team2} />
          <FieldVisualization team1={teams.team1} team2={teams.team2} />
        </>
      )}
    </div>
  );
};

export default App;
