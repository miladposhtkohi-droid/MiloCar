import express from "express";
import cors from "cors";
import dotenv from "dotenv";
// Config
dotenv.config();
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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});