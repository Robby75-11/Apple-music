import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./components/NavBar";
import Section from "./components/Section";
import Footer from "./components/Footer";
import Player from "./components/Player";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Search from "./components/Search";
import HomePage from "./components/HomePage";
import LyricsPage from "./components/LyricsPage";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentTrack } from "./redux/playerSlice";
import QuizPage from "./components/QuizPage";
import Register from "./components/Register";
import Login from "./components/Login";

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
  const dispatch = useDispatch();
  const currentTrack = useSelector((state) => state.player.currentTrack);

  // Funzione per selezionare la traccia da passare ai componenti
  const selectTrack = (track) => {
    dispatch(setCurrentTrack(track));
  };
  return (
    <BrowserRouter>
      <div className="bg-black min-vh-100 pb-5 text-white">
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/search" element={<Search onPlay={selectTrack} />} />
          <Route path="/lyrics/:id" element={<LyricsPage />} />
          <Route path="/quiz/:id" element={<QuizPage />} />
        </Routes>
        <Section title="Nuove uscite" query="new" selectTrack={selectTrack} />
        <Section
          title="Queen"
          query="queen"
          onPlay
          selectTrack={setCurrentTrack}
        />
        <Footer />
        <Player />
      </div>
    </BrowserRouter>
  );
};

export default App;
