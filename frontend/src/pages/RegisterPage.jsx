import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

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
    <div>
      <h1>Skapa konto</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Namn:</label>
          <input
            type="text"
            name="name"
            placeholder="Namn"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Lösenord:</label>
          <input
            type="password"
            name="password"
            placeholder="Lösenord"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">Skapa konto</button>
      </form>
    </div>
  );
};

export default RegisterPage;
