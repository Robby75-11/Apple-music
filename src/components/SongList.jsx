import React from "react";
import MusicCard from "./MusicCard";

const SongList = ({ songs, selectTrack }) => {
  return (
    <div className="container mt-4">
      <h5 className="text-white mb-3">Playlist Personalizzata</h5>
      <div className="row g-3">
        {songs.map((song) => (
          <div className="col-6 col-md-2" key={song.id}>
            <MusicCard track={song} onClick={selectTrack} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SongList;
