import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";



// App
const app = express();
// Port
const port = process.env.PORT || 3000;
// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/auth", authRoutes);
// koppla till databas
connectDB();

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
