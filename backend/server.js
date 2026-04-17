import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';



import authRoutes from './routes/authRoutes.js';
import carRoutes from './routes/carRoutes.js';

// 1. Ladda miljövariabler (.env)
dotenv.config();

// 2. Skapa express-app
const app = express();

// 3. Middleware för att läsa JSON
app.use(express.json());

// 4. Tillåt frontend (React) att prata med backend
app.use(cors());

// 5. Koppla till MongoDB
connectDB();

// 6. Test-route
app.get('/', (req, res) => {
  res.send('Car Center API is running...');
});

// 7. API-routes
app.use('/api/auth', authRoutes);
app.use('/api/cars', carRoutes);

// 8. Starta servern
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
