import React, { useState, useEffect } from "react";
import type { Player } from "../types";

interface PlayerFormProps {
  onGenerateTeams: (players: Player[]) => void;
}

const PlayerForm: React.FC<PlayerFormProps> = ({ onGenerateTeams }) => {
  const [players, setPlayers] = useState<Player[]>(() => {
    const saved = localStorage.getItem("players");
    return saved ? JSON.parse(saved) : [];
  });
  const [name, setName] = useState("");
  const [rating, setRating] = useState<number | "">("");
  const [editingId, setEditingId] = useState<number | null>(null);

  // LocalStorage’a sadece players değiştiğinde kaydet
  useEffect(() => {
    localStorage.setItem("players", JSON.stringify(players));
  }, [players]);

  const addOrUpdatePlayer = () => {
    if (name && rating && rating >= 1 && rating <= 10) {
      if (editingId) {
        // Güncelleme: Mevcut oyuncuyu güncelle
        setPlayers(
          players.map((p) =>
            p.id === editingId ? { ...p, name, rating: Number(rating) } : p
          )
        );
        setEditingId(null);
      } else if (players.length < 14) {
        // Yeni oyuncu: Benzersiz ID oluştur
        const newId =
          players.length > 0 ? Math.max(...players.map((p) => p.id)) + 1 : 1;
        setPlayers([...players, { id: newId, name, rating: Number(rating) }]);
      }
      if (players.some((p) => p.name === name && p.id !== editingId)) {
        alert("Bu isim zaten mevcut!");
        return;
      }
      setName("");
      setRating("");
    } else {
      alert("Puan 1 ile 10 arasında olmalıdır!");
    }
  };

  const deletePlayer = (id: number) => {
    setPlayers(players.filter((p) => p.id !== id));
  };

  const editPlayer = (player: Player) => {
    setName(player.name);
    setRating(player.rating);
    setEditingId(player.id);
  };

  const handleSubmit = () => {
    if (players.length === 14) {
      onGenerateTeams(players);
    } else {
      alert("Lütfen 14 oyuncu ekleyin!");
    }
  };

  return (
    <div>
      <h2>Oyuncu Ekle/Güncelle</h2>
      <div>
        <input
          type="text"
          placeholder="İsim"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Puan (1-10)"
          value={rating}
          onChange={(e) => {
            const value = e.target.value;
            if (value === "") {
              setRating("");
            } else {
              const num = Number(value);
              if (num >= 1 && num <= 10) {
                setRating(num);
              }
            }
          }}
          min="1"
          max="10"
        />
        <button
          onClick={addOrUpdatePlayer}
          disabled={players.length >= 14 && !editingId}
        >
          {editingId ? "Güncelle" : "Ekle"}
        </button>
      </div>
      <ul>
        {players.map((player) => (
          <li key={player.id}>
            <span>
              {player.name} - Puan: {player.rating}
            </span>
            <div>
              <button onClick={() => editPlayer(player)}>✏️</button>
              <button onClick={() => deletePlayer(player.id)}>🗑️</button>
            </div>
          </li>
        ))}
      </ul>
      <button onClick={handleSubmit} disabled={players.length !== 14}>
        Takımları Oluştur
      </button>
    </div>
  );
};

export default PlayerForm;
