import React, { useEffect, useState } from "react";
import MusicCard from "./MusicCard";
import { fetchDeezer } from "../api/api";

const Section = ({ title, query, selectTrack }) => {
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    fetchDeezer(query).then(setTracks);
  }, [query]);

  return (
    <div className="container mt-4">
      <h5 className="text-white mb-3">{title}</h5>
      <div className="row g-3">
        {tracks.slice(0, 6).map((track) => (
          <div className="col-6 col-md-2" key={track.id}>
            <MusicCard track={track} onClick={() => selectTrack(track)} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Section;
