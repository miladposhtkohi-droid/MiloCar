import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import logo from "../../assets/logo/MiloCar.png";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav>
      <div>
        <Link to="/">
          <img src={logo} alt="MiloCar" />
        </Link>
      </div>

      <div>
        <Link to="/cars">Bilar</Link>

        {user ? (
          <>
            <Link to="/my-cars">Mina Bilar</Link>
            <Link to="/cars/new">Lägg till Bil</Link>
            <button onClick={logout}>Logga ut</button>
          </>
        ) : (
          <>
            <Link to="/login">Logga in</Link>
            <Link to="/register">Registrera</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
