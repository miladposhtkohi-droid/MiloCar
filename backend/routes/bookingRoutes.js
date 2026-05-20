import express from "express";
import {
  createBooking,
  getMyBookings,
  cancelBooking,
} from "../controllers/bookingController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Alla bokningsvägar kräver inloggning
router.use(authMiddleware);

router.post("/", createBooking);
router.get("/my", getMyBookings);
router.put("/:id/cancel", cancelBooking);

export default router;
