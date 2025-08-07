import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import apple from "../assets/apple.svg";
import music from "../assets/music.svg";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/userSlice";

const NavBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const [query, setQuery] = useState("");
  const [volume, setVolume] = useState(50);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const handleLogout = () => {
    dispatch(logout()); // ← azzera lo user nel Redux
    localStorage.removeItem("token"); // ← rimuove il token
    navigate("/login"); // ← torna alla pagina di login
  };

  return (
    <nav className="navbar bg-dark py-1 position-relative ">
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
          <li className="nav-item mb-2 w-100">
            <form onSubmit={handleSearch} className="input-group">
              <span className="input-group-text bg-dark border-0 text-danger">
                <i className="bi bi-search text-info"></i>
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Cerca artist or song"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                style={{
                  backgroundColor: "#333",
                  color: "white",
                  border: "none",
                }}
              />
              <button type="submit" className="btn btn-info">
                Cerca
              </button>
            </form>
          </li>
        </ul>
        {/* Voci: Home, Novità, Radio con icone */}
        <ul className="nav flex-column w-100 ">
          <li
            className="nav-item d-flex align-items-center mb-2"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            <i
              className="bi bi-house-door text-success"
              style={{ fontSize: "20px", marginRight: "10px" }}
            ></i>
            <span>Homepage</span>
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
              className="bi bi-radioactive  text-warning"
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
      {/* 🔊 Lato destro: Volume + Utente o Accedi */}
      <div className="d-flex align-items-center gap-3 position-absolute end-0 pe-3">
        <input
          type="range"
          min="0"
          max="100"
          value={volume}
          onChange={(e) => setVolume(Number(e.target.value))}
          style={{ width: "80px", height: "3px" }}
        />
        {user ? (
          <div className="d-flex align-items-center gap-2">
            <img
              src={user.avatarUrl}
              alt="Avatar"
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
            <span className="text-white fw-semibold">{user.username}</span>
            <button
              className="btn btn-outline-light btn-sm"
              onClick={() => {
                dispatch(logout());
                navigate("/login");
              }}
            >
              Logout
            </button>
          </div>
        ) : (
          <>
            <button
              className="btn btn-outline-light btn-sm"
              onClick={() => navigate("/register")}
            >
              Registrati
            </button>
            <button
              className="btn btn-danger text-light btn-sm"
              onClick={() => navigate("/login")}
            >
              Accedi
            </button>
          </>
        )}
      </div>
    </nav>
  );
};
export default NavBar;
