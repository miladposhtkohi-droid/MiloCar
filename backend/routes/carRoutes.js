import express from "express";
import {
  createCar,
  getMyCar,
  getCarById,
  updateCar,
  deleteCar,
  getAllCars,
} from "../controllers/carController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import upload from "../middleware/upload.js";

const router = express.Router();

//get all cars (public or protected? let's assume public for viewing cars)
router.get("/", getAllCars);

//get my car
router.get("/my", authMiddleware, getMyCar);

//get car by id
router.get("/:id", getCarById);

//create car
router.post("/", authMiddleware, upload.single("image"), createCar);

//update car
router.put("/:id", authMiddleware, updateCar);

//delete car
router.delete("/:id", authMiddleware, deleteCar);

export default router;
