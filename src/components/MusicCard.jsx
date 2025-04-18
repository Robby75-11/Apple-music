import React from "react";

const MusicCard = ({ track, onClick }) => {
  return (
    <div
      className="card bg-dark text-white border-0"
      style={{ cursor: "pointer" }}
      onClick={onClick}
    >
      <img
        src={track.album.cover_medium}
        className="card-img-top rounded"
        alt={track.title}
      />
      <div className="card-body px-1 py-2">
        <h6 className="card-title text-truncate mb-0">{track.title}</h6>
        <small className="text-muted">{track.artist.name}</small>
      </div>
      {/* Pulsante play sopra immagine */}
      <button
        className="btn btn-light position-absolute top-50 start-50 translate-middle"
        style={{ opacity: 0.8 }}
        onClick={(e) => {
          e.stopPropagation(); // evita propagazione alla card
          onClick(); // avvia la riproduzione
        }}
      >
        <i className="bi bi-play-fill"></i>
      </button>
    </div>
  );
};

export default MusicCard;
