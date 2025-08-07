import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const LyricsPage = () => {
  const { id } = useParams(); // questo è il songId
  const [lyrics, setLyrics] = useState("");
  const [song, setSong] = useState(null);
  const token = localStorage.getItem("token");

  const fetchLyrics = async () => {
    try {
      const res = await fetch(`http://localhost:8080/api/lyrics/song/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.ok) {
        const data = await res.json();
        setLyrics(data.lyrics);
      } else if (res.status === 404) {
        console.log("Lyrics non trovate, provo a fetchare da lyrics.ovh");

        // 1. Recupero info della song per inviare il fetch corretto
        const songRes = await fetch(`http://localhost:8080/api/songs/${id}`);
        const songData = await songRes.json();
        setSong(songData);

        // 2. Prova a fetchare da API esterna
        const fetchRes = await fetch(`http://localhost:8080/api/lyrics/fetch`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // oppure rimuovi se pubblico
          },
          body: JSON.stringify({
            deezerId: songData.id, // o songData.deezerId se presente
            titolo: songData.titolo,
            artista: songData.artista,
          }),
        });

        if (fetchRes.ok) {
          const lyricsText = await fetchRes.text();
          setLyrics(lyricsText);
        } else {
          console.error("Lyrics esterne non trovate");
        }
      } else {
        console.error("Errore fetch lyrics:", res.status);
      }
    } catch (err) {
      console.error("Errore durante il fetch delle lyrics", err);
    }
  };

  useEffect(() => {
    fetchLyrics();
  }, [id]);

  return (
    <div className="container text-white mt-5">
      <h2>Testo del brano</h2>
      <pre>{lyrics || "🎵 Testo non disponibile"}</pre>
    </div>
  );
};

export default LyricsPage;
