// src/pages/HomePage.jsx
import { useEffect, useState } from "react";
import { fetchDeezer } from "../api/api";
import SongList from "../components/SongList";
import TopGrid from "../components/TopGrid";

const HomePage = () => {
  const [playlist, setPlaylist] = useState([]);

  useEffect(() => {
    const fetchPlaylist = async () => {
      try {
        const queenTracks = await fetchDeezer("Queen");
        const vendittiTracks = await fetchDeezer("Antonello Venditti");

        const combined = [
          ...queenTracks.slice(0, 3),
          ...vendittiTracks.slice(0, 3),
        ].map((song) => ({
          titolo: song.title,
          artista: song.artist?.name || "Artista sconosciuto",
          coverImageUrl: song.album?.cover_medium,
          audioUrl: song.preview,
          id: song.id,
        }));

        setPlaylist(combined);
      } catch (err) {
        console.error("❌ Errore nel caricamento della playlist:", err);
      }
    };

    fetchPlaylist();
  }, []);

  return (
    <div className="container mt-4 text-white">
      <h2 className="mb-4">🎧 Benvenuto nella Home musicale!</h2>
      <TopGrid />
      <h4 className="mt-4">✨ Brani consigliati</h4>
      <SongList songs={playlist} />
    </div>
  );
};

export default HomePage;
