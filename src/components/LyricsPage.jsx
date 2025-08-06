// src/pages/LyricsPage.jsx
import { useParams } from "react-router-dom";

const LyricsPage = () => {
  const { id } = useParams();

  // In futuro potresti fare una fetch da un endpoint dei testi
  return (
    <div className="container text-white mt-5">
      <h2>Testo del brano ID: {id}</h2>
      <p>🎵 I testi saranno mostrati qui... (mock o fetch reale)</p>
    </div>
  );
};

export default LyricsPage;
