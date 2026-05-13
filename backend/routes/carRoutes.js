import express from "express";

import {
  createCar,
  getMyCar,
  updateCar,
  deleteCar,
  getAllCars,
} from "../controllers/carController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import upload from "../middleware/upload.js";

const router = express.Router();

//get all cars (public or protected? let's assume public for viewing cars)

router.get("/", getAllCars);

//create car

router.post("/", authMiddleware, upload.single("image"), createCar);

//get my car

router.get("/my", authMiddleware, getMyCar);

//update car

router.put("/:id", authMiddleware, updateCar);

//delete car

router.delete("/:id", authMiddleware, deleteCar);

export default router;
