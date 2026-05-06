import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";
import engineSound from "../assets/sounds/engin.mp3";

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      playEngineSound();
      await login(form);
      navigate("/");
    } catch (error) {
      alert("Fel email eller lösenord");
    }
  };
  const playEngineSound = () => {
    const audio = new Audio(engineSound);
    audio.play();
  };

  return (
    <div className="login-wrapper">
      <div className="login-image">
        {/* INPUT-FORM I DISPLAYEN */}
        <form onSubmit={handleSubmit} className="display-form">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            className="display-input"
          />

          <input
            type="password"
            name="password"
            placeholder="Lösenord"
            value={form.password}
            onChange={handleChange}
            required
            className="display-input"
          />

          {/* START ENGINE KNAPP */}
          <button type="submit" className="start-button"></button>
        </form>

        <p className="register-text">
          Inte medlem? <Link to="/register">Skapa ett konto</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
