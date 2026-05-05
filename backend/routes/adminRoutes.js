import express from "express";
import authMiddleware, { adminMiddleware } from "../middleware/authMiddleware.js";
import { getAllCarsAdmin, approveCar, rejectCar } from "../controllers/adminController.js";

const router = express.Router();

// Admin: se alla bilar
router.get("/cars", authMiddleware, adminMiddleware, getAllCarsAdmin);

// Admin: godkänn bil
router.patch("/cars/:id/approve", authMiddleware, adminMiddleware, approveCar);

// Admin: avslå bil
router.patch("/cars/:id/reject", authMiddleware, adminMiddleware, rejectCar);

export default router;
