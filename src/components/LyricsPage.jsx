import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const LyricsPage = () => {
  const { id } = useParams(); // songId
  const [lyrics, setLyrics] = useState("");
  const [song, setSong] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchLyrics = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`http://localhost:8080/api/lyrics/song/${id}`);
      if (res.ok) {
        const data = await res.json();
        setLyrics(data.lyrics);
        setSong(data.song);
      } else {
        setError("❌ Errore nella richiesta al server");
      }
    } catch (err) {
      console.error("Errore durante il fetch delle lyrics", err);
      setError("Errore di rete");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLyrics();
  }, [id]);

  return (
    <div className="container text-white mt-5">
      {loading ? (
        <p>⏳ Caricamento testo...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <>
          {song && (
            <div className="mb-4">
              <h2 className="fw-bold">{song.titolo}</h2>
              <h5 className="text-muted">di {song.artista.nome}</h5>
            </div>
          )}
          <pre>{lyrics || "🎵 Testo non disponibile"}</pre>
        </>
      )}
    </div>
  );
};

export default LyricsPage;
