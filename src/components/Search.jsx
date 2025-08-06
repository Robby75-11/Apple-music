// src/pages/Search.jsx
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCurrentTrack } from "../redux/playerSlice";
import { fetchDeezer } from "../api/api";
import MusicCard from "../components/MusicCard";

const Search = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);

  const query = new URLSearchParams(location.search).get("q");

  useEffect(() => {
    const load = async () => {
      if (!query) return;
      setLoading(true);
      const results = await fetchDeezer(query);

      const parsed = results.map((song) => ({
        id: song.id,
        titolo: song.title,
        artista: { nome: song.artist?.name },
        coverImageUrl: song.album?.cover_medium,
        audioUrl: song.preview,
      }));

      setTracks(parsed);
      setLoading(false);
    };

    load();
  }, [query]);

  return (
    <div className="container text-white mt-4">
      <h2>Risultati per: "{query}"</h2>

      {loading ? (
        <p>Caricamento...</p>
      ) : tracks.length === 0 ? (
        <p>Nessun brano trovato.</p>
      ) : (
        <div className="row g-3">
          {tracks.map((song) => (
            <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={song.id}>
              <MusicCard
                song={song}
                onPlay={() => dispatch(setCurrentTrack(song))}
                onLyrics={() => navigate(`/lyrics/${song.id}`)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
