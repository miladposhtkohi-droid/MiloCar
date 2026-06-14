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

// 3. Middleware för att läsa JSON och URL-kodade formulär
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

// Felhantering för multer och andra serverfel
app.use((err, req, res, next) => {
  console.error(err);

  if (err.code === "LIMIT_FILE_SIZE") {
    return res.status(400).json({ message: "Filen är för stor. Max 10MB." });
  }

  if (
    err.name === "MulterError" ||
    err.message === "Endast bildfiler är tillåtna"
  ) {
    return res.status(400).json({ message: err.message });
  }

  res.status(500).json({ message: err.message || "Internal server error" });
});

// 8. Starta servern
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
