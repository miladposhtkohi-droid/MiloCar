import express from "express";
import { createCar, getmyCar, updateCar, deleteCar } from "../controllers/carController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

//create car
router.post("/", authMiddleware, createCar);

//get my car
router.get("/", authMiddleware, getmyCar);

//update car
router.put("/:id", authMiddleware, updateCar);


//delete car
router.delete("/:id", authMiddleware, deleteCar);


export default router;
