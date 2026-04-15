import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";



//import routes
import authRoutes from "./routes/authRoutes.js";
import carRoutes from "./routes/carRoutes.js";


// App
const app = express();
// Port
const port = process.env.PORT || 3000;
//tillåt frontend att ansluta
app.use(cors());
// Middleware
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("app is running");
});

//api routes
app.use("/api/auth", authRoutes);
app.use('/api/cars', carRoutes)
// koppla till databas
connectDB();

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
