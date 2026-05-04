import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

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
      await login(form);
      navigate("/");
    } catch (error) {
      alert("Fel email eller lösenord");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-linear-to-br from-blue-50 to-indigo-100"
    
    style={{
      backgroundImage: "url('/src/assets/login/loginBild.png')",
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}
    
    
    
    >
      <h1 className="text-3xl font-extrabold text-blue-500 mb-6" >Logga in</h1>

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email:</label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Lösenord:</label>
          <input
            type="password"
            name="password"
            placeholder="Lösenord"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
          />
        </div>

        <button type="submit" className="mt-4 px-4 py-2 w-full bg-blue-600 text-white rounded-md hover:bg-blue-700">
          Logga in
        </button>
      </form>

      <p className="mt-4">
        Inte medlem? <Link to="/register" className="text-blue-600 hover:underline">Skapa ett konto</Link>
      </p>
    </div>
  );
};

export default LoginPage;
