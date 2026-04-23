import { Outlet } from "react-router-dom";
import Navbar from "./Layout/navbar/Navbar"; // Note: Make sure the path is correct according to the file structure

const App = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      
      <footer className="bg-slate-900 text-slate-300 py-8 text-center mt-auto">
        <div className="container mx-auto px-4">
          <p className="font-light">&copy; {new Date().getFullYear()} MiloCar. Sveriges smidigaste plattform för bilar.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
