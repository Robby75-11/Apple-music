import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        alert("✅ Registrazione completata");
        navigate("/login");
      } else {
        alert("❌ Errore durante la registrazione");
      }
    } catch (err) {
      console.error("Errore di rete:", err);
    }
  };

  return (
    <div className="container mt-5 text-white">
      <h2>Registrati</h2>
      <form onSubmit={handleSubmit} className="w-50">
        <input
          type="text"
          name="username"
          placeholder="Username"
          className="form-control mb-3"
          value={form.username}
          onChange={handleChange}
          required
        />
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
        <button type="submit" className="btn btn-success">
          Registrati
        </button>
      </form>
    </div>
  );
};

export default Register;
