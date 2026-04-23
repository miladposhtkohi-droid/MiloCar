import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/70 border-b border-gray-200 shadow-sm transition-all duration-300">
      <div className="container mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center group-hover:bg-blue-700 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
              <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
              <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7h-3v7h.05a2.5 2.5 0 004.9 0H17a1 1 0 001-1V9.5L14 7z" />
            </svg>
          </div>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-indigo-600">
            MiloCar
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 font-medium text-slate-600">
          <NavLink to="/" className={({isActive}) => isActive ? "text-blue-600 transition-colors" : "hover:text-blue-600 transition-colors"}>Alla bilar</NavLink>
          <NavLink to="/map" className={({isActive}) => isActive ? "text-blue-600 transition-colors" : "hover:text-blue-600 transition-colors"}>Karta</NavLink>
          {user && <NavLink to="/my-cars" className={({isActive}) => isActive ? "text-blue-600 transition-colors" : "hover:text-blue-600 transition-colors"}>Mina bilar</NavLink>}
          {user && <NavLink to="/cars/new" className={({isActive}) => isActive ? "text-blue-600 transition-colors" : "hover:text-blue-600 transition-colors"}>Lägg upp bil</NavLink>}
        </nav>

        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-4">
              <div className="flex flex-col items-end hidden md:flex">
                <span className="text-sm font-semibold text-slate-800">{user.name}</span>
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
              <NavLink to="/login" className="px-4 py-2 text-sm font-medium text-slate-700 hover:text-blue-600 transition-colors hidden sm:block">Logga in</NavLink>
              <NavLink to="/register" className="px-5 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-full hover:bg-blue-700 hover:shadow-md transition-all">Skapa konto</NavLink>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
