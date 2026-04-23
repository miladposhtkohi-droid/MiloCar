import { Outlet } from "react-router-dom";
import Navbar from "./components/Layout/Navbar";

const App = () => {
  return (
    <div className="app-container bg-red-500">
      <Navbar />

      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default App;
