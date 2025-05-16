import React from "react";
import type { Team } from "../types";
import sahaImage from "../assets/saha.png"; // Resim yolunu kendi dosyanıza göre ayarlayın

interface FieldVisualizationProps {
  team1: Team;
  team2: Team;
}

const FieldVisualization: React.FC<FieldVisualizationProps> = ({
  team1,
  team2,
}) => {
  // 1-3-2-1 dizilişi için pozisyonlar (1280x812 piksel üzerinden)
  // Takım 1 (sol yarı saha)
  const team1Positions = [
    { x: 100, y: 406 }, // Kaleci (1)
    { x: 300, y: 200 },
    { x: 300, y: 406 },
    { x: 300, y: 612 }, // Defans (3)
    { x: 450, y: 306 },
    { x: 450, y: 506 }, // Orta saha (2)
    { x: 550, y: 406 }, // Forvet (1)
  ];

  // Takım 2 (sağ yarı saha)
  const team2Positions = [
    { x: 1180, y: 406 }, // Kaleci (1)
    { x: 980, y: 200 },
    { x: 980, y: 406 },
    { x: 980, y: 612 }, // Defans (3)
    { x: 830, y: 306 },
    { x: 830, y: 506 }, // Orta saha (2)
    { x: 730, y: 406 }, // Forvet (1)
  ];

  return (
    <div
      style={{
        position: "relative",
        width: "1280px",
        height: "812px",
        margin: "20px auto",
      }}
    >
      <img
        src={sahaImage}
        alt="Saha"
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
      {/* Takım 1 oyuncuları (sol yarı saha) */}
      {team1.players.slice(0, 7).map((player, index) => (
        <div
          key={player.id}
          style={{
            position: "absolute",
            left: `${team1Positions[index].x}px`,
            top: `${team1Positions[index].y - 20}px`,
            color: "white",
            fontSize: "16px",
            fontWeight: "bold",
            textAlign: "center",
            textShadow: "0 0 3px rgba(0, 0, 0, 0.8)", // Okunabilirlik için gölge
            backgroundColor: "rgba(0, 0, 255, 0.3)", // Mavi yarı saydam daire
            borderRadius: "50%",
            width: "30px",
            height: "30px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {player.name}
        </div>
      ))}
      {/* Takım 2 oyuncuları (sağ yarı saha) */}
      {team2.players.slice(0, 7).map((player, index) => (
        <div
          key={player.id}
          style={{
            position: "absolute",
            left: `${team2Positions[index].x}px`,
            top: `${team2Positions[index].y - 20}px`,
            color: "white",
            fontSize: "16px",
            fontWeight: "bold",
            textAlign: "center",
            textShadow: "0 0 3px rgba(0, 0, 0, 0.8)", // Okunabilirlik için gölge
            backgroundColor: "rgba(255, 0, 0, 0.3)", // Kırmızı yarı saydam daire
            borderRadius: "50%",
            width: "30px",
            height: "30px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {player.name}
        </div>
      ))}
    </div>
  );
};

export default FieldVisualization;
