import React from "react";
import apple from "../assets/apple.svg";
import music from "../assets/music.svg";

const NavBar = () => {
  return (
    <nav className="navbar bg-dark py-3 position-relative ">
      <div className="container-fluid justify-content-between align-items-start text-white">
        {/* Logo a sinistra */}
        <div
          className="d-flex flex-column align-items-start"
          style={{ width: "200px" }}
        >
          <img
            src={music}
            alt="Music "
            style={{
              height: "20px",
              marginBottom: "15px",

              filter: "invert(1)",
            }}
          />
        </div>
        {/* Lista sotto il logo */}
        <ul className="nav flex-column w-100 ">
          {/* Campo di ricerca */}
          <li className="nav-item  mb-2 ">
            <div className="input-group">
              <span
                className="input-group-text bg-dark border-0 text-danger"
                style={{ backgroundColor: "#333" }}
              >
                <i className="bi bi-search"></i>
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Search"
                style={{
                  backgroundColor: "#333",
                  color: "white",
                  border: "none",
                  width: "20px",
                }}
              />
            </div>
          </li>

          {/* Voci: Home, Novità, Radio con icone */}
          <li className="nav-item d-flex align-items-center mb-2">
            <i
              className="bi bi-house-door text-danger"
              style={{ fontSize: "20px", marginRight: "10px" }}
            ></i>
            <span>Home</span>
          </li>

          <li className="nav-item d-flex align-items-center mb-2">
            <i
              className="bi bi-broadcast  text-danger"
              style={{ fontSize: "20px", marginRight: "10px" }}
            ></i>
            <span>Novità</span>
          </li>
          <li className="nav-item d-flex align-items-center ">
            <i
              className="bi bi-radioactive  text-danger"
              style={{ fontSize: "20px", marginRight: "10px" }}
            ></i>
            <span>Radio</span>
          </li>
        </ul>
      </div>

      {/* Logo Apple centrale */}
      <div className=" position-absolute start-50 translate-middle-x pt-3">
        <img
          src={apple}
          alt="Apple Logo"
          style={{ height: "26px", filter: "invert(1)" }}
        />
      </div>
      {/* 🔊 Lato destro: Volume + Accedi */}
      <div className="d-flex align-items-center gap-3 position-absolute end-0">
        <input
          type="range"
          min="0"
          max="100"
          defaultValue="50"
          className="form-range"
          style={{ width: "100px" }}
        />
        <button className="btn btn-danger text-light btn-sm">Accedi</button>
      </div>
    </nav>
  );
};

export default NavBar;
