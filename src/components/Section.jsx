import { useEffect, useState } from "react";
import MusicCard from "./MusicCard";
import { fetchDeezer } from "../api/api";
import { useDispatch } from "react-redux";
import { setCurrentTrack } from "../redux/playerSlice";

const Section = ({ title, query }) => {
  const [songs, setSongs] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const getSongs = async () => {
      const result = await fetchDeezer(query);
      // Adatta i dati per il nostro formato interno
      const mapped = result.map((song) => ({
        id: song.id,
        titolo: song.title,
        artista: { nome: song.artist?.name },
        coverImageUrl: song.album?.cover_medium,
        audioUrl: song.preview,
      }));
      setSongs(mapped);
    };

    getSongs();
  }, [query]);
  return (
    <div className="container mt-4">
      <h5 className="text-white">{title}</h5>
      <div className="row g-3">
        {songs.slice(0, 6).map((song) => (
          <div className="col-6 col-md-2" key={song.id}>
            <MusicCard
              song={song}
              onPlay={() => dispatch(setCurrentTrack(song))}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Section;
