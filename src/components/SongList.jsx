import { useDispatch } from "react-redux";
import { setCurrentTrack } from "../redux/playerSlice";
import MusicCard from "./MusicCard";

const SongList = ({ songs }) => {
  const dispatch = useDispatch();

  return (
    <div className="container mt-4">
      <h5 className="text-white">Risultati</h5>
      <div className="row g-3">
        {songs.map((song) => (
          <div className="col-6 col-md-3 col-lg-2" key={song.id}>
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

export default SongList;
