import express from "express";
import Car from "../models/Car.js";

const router = express.Router();

//create car
router.post("/", async (req, res) => {
  try {
    //hämta usrid från token
    const userId = req.user.id;
    //skapa ny bil med data från body och owner
    const car = await Car.create({
      ...req.body,
      owner: userId,
    });
    //skapa bil i databasen
    await car.save();
    //returnera bil
    res.status(201).json(car);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//get all cars
router.get("/", async (req, res) => {
  try {
    //hämta alla bilar
    const cars = await Car.find().populate("owner", "name email");
    // skicka tillbackan listan med bilar
    res.status(200).json(cars);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
