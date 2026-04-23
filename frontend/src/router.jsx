import { createBrowserRouter } from "react-router-dom";
import App from "./App";

import HomePage from "./pages/HomePage";
import CarsPage from "./pages/CarsPage";
import CarDetailsPage from "./pages/CarDetailsPage";
import CarFormPage from "./pages/CarFormPage";
import MyCarsPage from "./pages/MyCarsPage";
import MapPage from "./pages/MapPage";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

import ProtectedRoute from "./components/Auth/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },

      { path: "cars", element: <CarsPage /> },
      { path: "cars/:id", element: <CarDetailsPage /> },

      {
        path: "cars/new",
        element: (
          <ProtectedRoute>
            <CarFormPage />
          </ProtectedRoute>
        ),
      },

      {
        path: "my-cars",
        element: (
          <ProtectedRoute>
            <MyCarsPage />
          </ProtectedRoute>
        ),
      },

      { path: "map", element: <MapPage /> },

      { path: "login", element: <LoginPage /> },
      { path: "register", element: <RegisterPage /> },
    ],
  },
]);

export default router;
