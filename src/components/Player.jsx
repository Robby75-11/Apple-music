// src/components/Player.jsx
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useEffect, useRef } from "react";

export const audioRef = { current: null };

const Player = () => {
  const currentTrack = useSelector((state) => state.player.currentTrack);
  const localRef = useRef();
  // Se non c'è una traccia selezionata, non renderizza nulla

  useEffect(() => {
    if (localRef.current) {
      audioRef.current = localRef.current; // aggiorna il riferimento globale
    }
  }, [currentTrack]);

  if (!currentTrack) return null;

  return (
    <Container className="my-4 fixed-bottom bg-dark text-white p-3 shadow">
      <h5>
        🎧 Stai ascoltando: {currentTrack.titolo} -{" "}
        {currentTrack.artista.artista}
      </h5>
      <audio
        ref={localRef}
        src={currentTrack.audioUrl}
        key={currentTrack.audioUrl}
        controls
        autoPlay
        className="w-100 mt-2"
      >
        Il tuo browser non supporta l'elemento audio.
      </audio>
    </Container>
  );
};

export default Player;
