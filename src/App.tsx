import React, { useState } from "react";
import PlayerForm from "./components/PlayerForm";
import TeamDisplay from "./components/TeamDisplay";
import FieldVisualization from "./components/FieldVisualization";
import { balanceTeams } from "./utils/teamBalancer";
import type { Player, Team } from "./types";
import "./styles/App.css";

const App: React.FC = () => {
  const [teams, setTeams] = useState<{ team1: Team; team2: Team } | null>(null);

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
