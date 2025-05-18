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
  // 1-3-2-1 dizilişi için pozisyonlar (% cinsinden)
  const team1Positions = [
    { x: 7.81, y: 50 }, // Kaleci
    { x: 23.44, y: 24.63 },
    { x: 23.44, y: 50 },
    { x: 23.44, y: 75.37 }, // Defans
    { x: 35.16, y: 37.68 },
    { x: 35.16, y: 62.32 }, // Orta saha
    { x: 42.97, y: 50 }, // Forvet
  ];

  const team2Positions = [
    { x: 92.19, y: 50 }, // Kaleci
    { x: 76.56, y: 24.63 },
    { x: 76.56, y: 50 },
    { x: 76.56, y: 75.37 }, // Defans
    { x: 64.84, y: 37.68 },
    { x: 64.84, y: 62.32 }, // Orta saha
    { x: 57.03, y: 50 }, // Forvet
  ];

  return (
    <div
      className="field-visualization"
      style={{
        position: "relative",
        width: "100%",
        maxWidth: "1280px",
        aspectRatio: "1280 / 812",
        margin: "20px auto",
        borderRadius: "12px",
        boxShadow: "0 8px 24px rgba(0, 0, 0, 0.15)",
        overflow: "hidden",
        animation: "fadeIn 0.5s ease-out",
      }}
    >
      {/* Saha resmi */}
      <img
        src={sahaImage}
        alt="Saha"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
          borderRadius: "12px",
          display: "none", // İlk yüklemede gizle
        }}
        onLoad={(e) => (e.currentTarget.style.display = "block")} // Yüklendiğinde göster
      />
      {/* Yükleme göstergesi */}
      <div className="loader">Yükleniyor...</div>
      {/* Takım 1 oyuncuları */}
      {team1.players.slice(0, 7).map((player, index) => (
        <div
          key={player.id}
          className="player-marker team1"
          style={{
            position: "absolute",
            left: `${team1Positions[index].x}%`,
            top: `${team1Positions[index].y}%`,
            transform: "translate(-50%, -50%)",
            fontSize: "clamp(12px, 2vw, 14px)",
            width: "clamp(24px, 3.5vw, 28px)",
            height: "clamp(24px, 3.5vw, 28px)",
          }}
        >
          {player.name}
        </div>
      ))}
      {/* Takım 2 oyuncuları */}
      {team2.players.slice(0, 7).map((player, index) => (
        <div
          key={player.id}
          className="player-marker team2"
          style={{
            position: "absolute",
            left: `${team2Positions[index].x}%`,
            top: `${team2Positions[index].y}%`,
            transform: "translate(-50%, -50%)",
            fontSize: "clamp(12px, 2vw, 14px)",
            width: "clamp(24px, 3.5vw, 28px)",
            height: "clamp(24px, 3.5vw, 28px)",
          }}
        >
          {player.name}
        </div>
      ))}
    </div>
  );
};

export default FieldVisualization;
