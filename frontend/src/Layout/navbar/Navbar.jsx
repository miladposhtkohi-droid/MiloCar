import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <header className="navbar">
      <Link to="/" className="logo">
        MiloCar
      </Link>

      <nav className="nav-links">
        <NavLink to="/">Alla bilar</NavLink>
        <NavLink to="/map">Karta</NavLink>

        {user && <NavLink to="/my-cars">Mina bilar</NavLink>}
        {user && <NavLink to="/cars/new">Lägg upp bil</NavLink>}
      </nav>

      <div className="auth-section">
        {user ? (
          <>
            <span className="username">{user.name}</span>
            <button onClick={logout}>Logga ut</button>
          </>
        ) : (
          <>
            <NavLink to="/login">Logga in</NavLink>
            <NavLink to="/register">Registrera</NavLink>
          </>
        )}
      </div>
    </header>
  );
};

export default Navbar;
