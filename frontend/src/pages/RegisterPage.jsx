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
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setIsSubmitting(true);
    try {
      await register(form);
      navigate("/");
    } catch (error) {
      // Fel från backend (t.ex. "User already exists"):
      //   error.response.data.message
      // Nätverksfel / server nere (ECONNREFUSED):
      //   error.request finns, men ingen response
      const serverMessage =
        error.response?.data?.message ||
        error.message ||
        "Registrering misslyckades";
      setErrorMessage(serverMessage);
      // Logga hela felet för felsökning i konsolen
      console.error("Registreringsfel:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="register-wrapper">
      <div className="register-box">
        <h1 className="register-title">Create Account</h1>

        <form onSubmit={handleSubmit} className="register-form">
          {errorMessage && (
            <p
              role="alert"
              style={{
                color: "#b91c1c",
                background: "#fee2e2",
                padding: "0.5rem 0.75rem",
                borderRadius: "6px",
                fontSize: "0.9rem",
                margin: "0 0 0.75rem 0",
              }}
            >
              {errorMessage}
            </p>
          )}
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

          <button
            type="submit"
            className="register-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Skapar konto..." : "Skapa konto"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
