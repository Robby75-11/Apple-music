import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../redux/userSlice";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        const data = await res.json();
        localStorage.setItem("token", data.token);

        const meRes = await fetch("http://localhost:8080/auth/me", {
          headers: { Authorization: `Bearer ${data.token}` },
        });

        if (meRes.ok) {
          const userData = await meRes.json();
          dispatch(setUser(userData));
          alert("✅ Login avvenuto con successo");
          navigate("/");
        } else {
          alert("⚠️ Login effettuato, ma impossibile recuperare l'utente.");
        }
      } else {
        alert("❌ Credenziali errate");
      }
    } catch (err) {
      console.error("Errore di rete:", err);
    }
  };

  return (
    <div className="container mt-5 text-white">
      <h2>Accedi</h2>
      <form onSubmit={handleSubmit} className="w-50">
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="form-control mb-3"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="form-control mb-3"
          value={form.password}
          onChange={handleChange}
          required
        />
        <button type="submit" className="btn btn-danger">
          Accedi
        </button>
      </form>
    </div>
  );
};

export default Login;
