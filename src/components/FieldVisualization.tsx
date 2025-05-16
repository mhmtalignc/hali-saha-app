import React from "react";
import type { Team } from "../types";
import sahaImage from "../assets/saha.jpg"; // Resim yolunu kontrol edin

interface FieldVisualizationProps {
  team1: Team;
  team2: Team;
}

const FieldVisualization: React.FC<FieldVisualizationProps> = ({
  team1,
  team2,
}) => {
  // 1-3-2-1 dizilişi için pozisyonlar (% cinsinden, 1280x812 oranına göre)
  const team1Positions = [
    { x: 7.81, y: 50 }, // Kaleci (100/1280)
    { x: 23.44, y: 24.63 },
    { x: 23.44, y: 50 },
    { x: 23.44, y: 75.37 }, // Defans
    { x: 35.16, y: 37.68 },
    { x: 35.16, y: 62.32 }, // Orta saha
    { x: 42.97, y: 50 }, // Forvet
  ];

  const team2Positions = [
    { x: 92.19, y: 50 }, // Kaleci (1180/1280)
    { x: 76.56, y: 24.63 },
    { x: 76.56, y: 50 },
    { x: 76.56, y: 75.37 }, // Defans
    { x: 64.84, y: 37.68 },
    { x: 64.84, y: 62.32 }, // Orta saha
    { x: 57.03, y: 50 }, // Forvet
  ];

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        maxWidth: "1280px",
        aspectRatio: "1280 / 812", // Orjinal oran korunur
        margin: "20px auto",
      }}
    >
      <img
        src={sahaImage}
        alt="Saha"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
        }}
      />
      {/* Takım 1 oyuncuları (sol yarı saha) */}
      {team1.players.slice(0, 7).map((player, index) => (
        <div
          key={player.id}
          style={{
            position: "absolute",
            left: `${team1Positions[index].x}%`,
            top: `${team1Positions[index].y}%`,
            transform: "translate(-50%, -50%)", // Merkezleme
            color: "white",
            fontSize: "clamp(12px, 2vw, 14px)", // Responsive font
            fontWeight: "bold",
            textAlign: "center",
            textShadow: "0 0 3px rgba(0, 0, 0, 0.8)",
            backgroundColor: "rgba(0, 0, 255, 0.3)", // Mavi daire
            borderRadius: "50%",
            width: "clamp(20px, 3vw, 25px)", // Responsive boyut
            height: "clamp(20px, 3vw, 25px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "2px",
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
            left: `${team2Positions[index].x}%`,
            top: `${team2Positions[index].y}%`,
            transform: "translate(-50%, -50%)",
            color: "white",
            fontSize: "clamp(12px, 2vw, 14px)",
            fontWeight: "bold",
            textAlign: "center",
            textShadow: "0 0 3px rgba(0, 0, 0, 0.8)",
            backgroundColor: "rgba(255, 0, 0, 0.3)", // Kırmızı daire
            borderRadius: "50%",
            width: "clamp(20px, 3vw, 25px)",
            height: "clamp(20px, 3vw, 25px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "2px",
          }}
        >
          {player.name}
        </div>
      ))}
    </div>
  );
};

export default FieldVisualization;
