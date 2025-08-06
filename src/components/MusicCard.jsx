// src/components/MusicCard.jsx
import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const MusicCard = ({ song, onPlay }) => {
  const navigate = useNavigate();

  if (!song) return null;

  return (
    <Card className="bg-dark text-white h-100">
      <Card.Img variant="top" src={song.coverImageUrl || "fallback.jpg"} />
      <Card.Body>
        <Card.Title>{song.titolo}</Card.Title>
        <Card.Text>{song.artista?.nome || "Artista sconosciuto"}</Card.Text>
        <Button
          variant="light"
          size="sm"
          className="me-2"
          onClick={() => onPlay(song)}
        >
          ▶ Play
        </Button>
        <Button
          variant="info"
          size="sm"
          onClick={() => navigate(`/lyrics/${song.id}`)}
        >
          🎵 Testi
        </Button>
        <Button
          variant="warning"
          size="sm"
          onClick={() => navigate(`/quiz/${song.id}`)}
        >
          ❓ Quiz
        </Button>
      </Card.Body>
    </Card>
  );
};

export default MusicCard;
