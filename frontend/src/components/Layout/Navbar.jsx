import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import logo from "../../assets/logo/MiloCar.png";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-emerald-600 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img
              src={logo}
              alt="MiloCar"
              className="h-12 w-auto object-contain hover:opacity-80 transition-opacity"
            />
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/cars"
              className="text-white hover:text-blue-100 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Bilar
            </Link>

            {user ? (
              <>
                <Link
                  to="/my-cars"
                  className="text-white hover:text-blue-100 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Mina Bilar
                </Link>
                <Link
                  to="/cars/new"
                  className="text-white hover:text-blue-100 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Lägg till Bil
                </Link>
                <button
                  onClick={logout}
                  className="text-white hover:text-red-200 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Logga ut
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-white hover:text-blue-100 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Logga in
                </Link>
                <Link
                  to="/register"
                  className="bg-white text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Registrera
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button className="text-white hover:text-blue-100 p-2">
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
