import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./Register.css";

const RegisterPage = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
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
      await register(form);
      navigate("/");
    } catch (error) {
      alert("Registrering misslyckades");
    }
  };

  return (
    <div className="register-wrapper">
      <div className="register-box">
        <h1 className="register-title">Create Account</h1>

        <form onSubmit={handleSubmit} className="register-form">
          <input
            type="text"
            name="name"
            placeholder="Namn"
            value={form.name}
            onChange={handleChange}
            required
            className="register-input"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            className="register-input"
          />

          <input
            type="password"
            name="password"
            placeholder="Lösenord"
            value={form.password}
            onChange={handleChange}
            required
            className="register-input"
          />

          <button type="submit" className="register-button">
            Skapa konto
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
