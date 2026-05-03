import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-gradient-to-r from-slate-900/90 via-blue-900/80 to-indigo-900/90 border-b border-white/10 shadow-lg transition-all duration-300">
      <div className="container mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center group">
          <img
            src="/src/assets/logo/MiloCar.png"
            alt="MiloCar Logo"
            className="w-48 h-48 object-contain group-hover:opacity-80 transition-opacity cursor-pointer"
          />
        </Link>

        <nav className="hidden md:flex items-center gap-8 font-medium text-slate-600">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-blue-600 transition-colors"
                : "hover:text-blue-600 transition-colors"
            }
          >
            Alla bilar
          </NavLink>
          <NavLink
            to="/map"
            className={({ isActive }) =>
              isActive
                ? "text-blue-600 transition-colors"
                : "hover:text-blue-600 transition-colors"
            }
          >
            Karta
          </NavLink>
          {user && (
            <NavLink
              to="/my-cars"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-600 transition-colors"
                  : "hover:text-blue-600 transition-colors"
              }
            >
              Mina bilar
            </NavLink>
          )}
          {user && (
            <NavLink
              to="/cars/new"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-600 transition-colors"
                  : "hover:text-blue-600 transition-colors"
              }
            >
              Lägg upp bil
            </NavLink>
          )}
        </nav>

        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-4">
              <div className="flex flex-col items-end hidden md:flex">
                <span className="text-sm font-semibold text-slate-800">
                  {user.name}
                </span>
                <span className="text-xs text-slate-500">Inloggad</span>
              </div>
              <button
                onClick={logout}
                className="px-4 py-2 text-sm font-medium text-white bg-slate-800 rounded-full hover:bg-slate-700 transition-colors shadow-sm"
              >
                Logga ut
              </button>
            </div>
          ) : (
            <>
              <NavLink
                to="/login"
                className="px-4 py-2 text-sm font-medium text-slate-700 hover:text-blue-600 transition-colors hidden sm:block"
              >
                Logga in
              </NavLink>
              <NavLink
                to="/register"
                className="px-5 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-full hover:bg-blue-700 hover:shadow-md transition-all"
              >
                Skapa konto
              </NavLink>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
