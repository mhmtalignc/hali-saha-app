import React, { useState, useEffect } from "react";
import type { Player } from "../types";

interface PlayerFormProps {
  onGenerateTeams: (players: Player[]) => void;
}

const PlayerForm: React.FC<PlayerFormProps> = ({ onGenerateTeams }) => {
  const [players, setPlayers] = useState<Player[]>(() => {
    const saved = localStorage.getItem("players");
    try {
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error("LocalStorage parse hatası:", e);
      return [];
    }
  });
  const [name, setName] = useState("");
  const [rating, setRating] = useState<number | "">("");
  const [editingId, setEditingId] = useState<number | null>(null);

  // Players değiştiğinde LocalStorage’a kaydet
  useEffect(() => {
    localStorage.setItem("players", JSON.stringify(players));
    console.log("Players güncellendi:", players); // Hata ayıklamak için
  }, [players]);

  const addOrUpdatePlayer = () => {
    if (name && rating && rating >= 1 && rating <= 10) {
      if (editingId) {
        // Güncelleme
        setPlayers(
          players.map((p) =>
            p.id === editingId ? { ...p, name, rating: Number(rating) } : p
          )
        );
        setEditingId(null);
      } else if (players.length < 14) {
        // Yeni oyuncu: Benzersiz ID
        const newId =
          players.length > 0 ? Math.max(...players.map((p) => p.id)) + 1 : 1;
        const newPlayer = { id: newId, name, rating: Number(rating) };
        setPlayers([...players, newPlayer]);
        console.log("Yeni oyuncu eklendi:", newPlayer); // Hata ayıklamak için
      }
      setName("");
      setRating("");
    } else {
      alert("Puan 1 ile 10 arasında olmalıdır!");
    }
  };

  const deletePlayer = (id: number) => {
    const newPlayers = players.filter((p) => p.id !== id);
    setPlayers(newPlayers);
    console.log("Oyuncu silindi, ID:", id, "Yeni liste:", newPlayers); // Hata ayıklamak için
    if (editingId === id) {
      setEditingId(null);
      setName("");
      setRating("");
    }
  };

  const editPlayer = (player: Player) => {
    setName(player.name);
    setRating(player.rating);
    setEditingId(player.id);
    console.log("Düzenleme başlatıldı:", player); // Hata ayıklamak için
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
          placeholder="Puan"
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
      {/* Hata ayıklamak için sıfırlama butonu */}
      <button
        onClick={() => {
          localStorage.clear();
          setPlayers([]);
          setName("");
          setRating("");
          setEditingId(null);
        }}
      >
        Tüm Verileri Sıfırla
      </button>
    </div>
  );
};

export default PlayerForm;
