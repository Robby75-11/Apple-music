import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./components/NavBar";
import TopGrid from "./components/TopGrid";
import Section from "./components/Section";
import Footer from "./components/Footer";
import SongList from "./components/SongList";
import React, { useState } from "react";
import Player from "./components/Player";
const songs = [
  {
    id: 1,
    title: "Song 1",
    album: { cover_medium: "/assets/1c.png" },
    artist: { name: "Artist 1" },
  },

  // Aggiungi altre canzoni se necessario
];
const App = () => {
  const [currentTrack, setCurrentTrack] = useState(songs[0]);

  const selectTrack = (track) => {
    setCurrentTrack(track);
  };

  return (
    <div className="bg-black min-vh-100 pb-5 text-white">
      <NavBar />
      <TopGrid />
      {/* Song list with MusicCard components */}
      <SongList songs={songs} selectTrack={selectTrack} />

      {/* Player - passed the currentTrack as a prop */}
      <Player currentTrack={currentTrack} />
      <Section title="Nuove uscite" query="new" selectTrack={setCurrentTrack} />
      <Section title="Queen" query="queen" selectTrack={setCurrentTrack} />
      <Footer />
    </div>
  );
};

export default App;
