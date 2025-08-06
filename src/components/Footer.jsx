import React from "react";

const Footer = () => {
  return (
    <footer className="bg-dark text-white fixed-bottom py-1 px-3 d-flex justify-content-between align-items-center">
      <div className="d-flex align-items-center">
        <img
          src="/path-to-cover.jpg"
          alt="cover"
          style={{ height: "40px", marginRight: "10px" }}
        />
        <div>
          <small className="d-block">Titolo brano</small>
          <small className="d-block">Italia</small>
          <small className="d-block">English (UK)</small>
          <small className="d-block">Copyright 2024 Apple Inc. </small>
        </div>
      </div>
      <div>
        <button className="btn btn-outline-light btn-sm mx-1">⏮</button>
        <button className="btn btn-outline-light btn-sm mx-1">▶️</button>
        <button className="btn btn-outline-light btn-sm mx-1">⏭</button>
      </div>
    </footer>
  );
};

export default Footer;
