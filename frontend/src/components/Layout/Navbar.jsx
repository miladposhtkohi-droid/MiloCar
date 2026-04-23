import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import logo from "../../assets/logo/MiloCar.png";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-brand">
          <img src={logo} alt="MiloCar" className="nav-logo" />
        </Link>

        <div className="nav-links">
          <Link to="/cars" className="nav-link">
            Bilar
          </Link>

          {user ? (
            <>
              <Link to="/my-cars" className="nav-link">
                Mina Bilar
              </Link>
              <Link to="/cars/new" className="nav-link">
                Lägg till Bil
              </Link>
              <button onClick={logout} className="nav-link logout-btn">
                Logga ut
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">
                Logga in
              </Link>
              <Link to="/register" className="nav-link">
                Registrera
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
