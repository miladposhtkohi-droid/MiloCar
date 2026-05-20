import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import carRoutes from "./routes/carRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";

// 1. Ladda miljövariabler (.env)
dotenv.config();

// 2. Skapa express-app
const app = express();

// 3. Middleware för att läsa JSON
app.use(express.json());

// 4. Tillåt frontend (React) att prata med backend
app.use(cors());

// 4.1. Servera uppladdade bilder
app.use("/uploads", express.static("uploads"));

// 5. Koppla till MongoDB
connectDB();

// 6. Test-route
app.get("/", (req, res) => {
  res.send("Car Center API is running...");
});

// 7. API-routes
app.use("/api/auth", authRoutes);
app.use("/api/cars", carRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/bookings", bookingRoutes);

// 8. Starta servern
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
