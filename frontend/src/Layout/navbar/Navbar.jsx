import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-white border-b border-gray-200 shadow-sm transition-all duration-300">
      <div className="container mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center group">
          <span className="text-2xl font-extrabold text-blue-600 tracking-tight hover:text-blue-700 transition-colors">
            MiloCar
          </span>
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
          {user && user.role === "admin" && (
            <NavLink
              to="/admin"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-600 transition-colors"
                  : "hover:text-blue-600 transition-colors"
              }
            >
              Admin
            </NavLink>
          )}
        </nav>

        <div className="flex items-center space-x-4">
          {user ? (
            <div className="flex items-center gap-4">
              <div className="flex flex-col items-end hidden sm:flex">
                <span className="text-sm font-semibold text-slate-800">
                  {user.name}
                </span>
                <span className="text-xs text-slate-500">Inloggad</span>
              </div>
              <button
                onClick={logout}
                className="px-4 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors shadow-sm"
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
                className="px-5 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 hover:shadow-md transition-all"
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
