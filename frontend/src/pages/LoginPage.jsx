import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";
import engineSound from "../assets/sounds/engin.mp3";
import carBackground from "../assets/login/carBackground.png";

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [starting, setStarting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const playEngineSound = () => {
    const audio = new Audio(engineSound);
    audio.play();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrorMessage("");
    setSuccessMessage("");

    try {
      // FÖRSÖK LOGGA IN
      await login(form);

      // OM DET FUNKAR
      setSuccessMessage("Välkommen till MiloCar");
      setStarting(true);
      playEngineSound();

      // LITEN DELAY INNAN NAVIGERING
      setTimeout(() => {
        setStarting(false);
        navigate("/");
      }, 1500);
    } catch (err) {
      // OM FEL UPPGIFTER / INTE REGISTRERAD
      setErrorMessage("Du måste först skapa konto");
    }
  };

  return (
    <div
      className="login-wrapper"
      style={{ backgroundImage: `url(${carBackground})` }}
    >
      {starting && <div className="headlight-flash"></div>}

      <div className="login-card">
        <h2 className="login-title">MiloCar Login</h2>

        <form onSubmit={handleSubmit} className="form-area">
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

          <button type="submit" className="start-button">
            START
          </button>
        </form>

        {successMessage && (
          <p className="success-message">{successMessage}</p>
        )}

        {errorMessage && (
          <p className="error-message">{errorMessage}</p>
        )}

        <p className="register-text">
          Inte medlem? <Link to="/register">Skapa ett konto</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
