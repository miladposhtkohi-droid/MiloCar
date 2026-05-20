import Booking from "../models/Booking.js";
import Car from "../models/Car.js";

// @desc    Create a new booking
// @route   POST /api/bookings
// @access  Private
export const createBooking = async (req, res) => {
  try {
    const { carId, startDate, endDate, totalPrice } = req.body;

    if (!carId || !startDate || !endDate || !totalPrice) {
      return res.status(400).json({ message: "Vänligen fyll i alla fält för bokningen." });
    }

    // Kontrollera om bilen existerar
    const carExists = await Car.findById(carId);
    if (!carExists) {
      return res.status(404).json({ message: "Bilen hittades inte." });
    }

    // Skapa bokningen
    const booking = await Booking.create({
      car: carId,
      user: req.user.id,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      totalPrice,
      status: "aktiv",
    });

    const populatedBooking = await Booking.findById(booking._id).populate("car");

    res.status(201).json(populatedBooking);
  } catch (error) {
    res.status(500).json({ message: "Kunde inte skapa bokning: " + error.message });
  }
};

// @desc    Get logged in user's bookings
// @route   GET /api/bookings/my
// @access  Private
export const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id })
      .populate("car")
      .sort({ createdAt: -1 });

    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Kunde inte hämta bokningar: " + error.message });
  }
};

// @desc    Cancel a booking
// @route   PUT /api/bookings/:id/cancel
// @access  Private
export const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Bokningen hittades inte." });
    }

    // Kontrollera att det är användarens bokning eller att användaren är admin
    if (booking.user.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({ message: "Inte behörig att avboka denna resa." });
    }

    booking.status = "avbokad";
    await booking.save();

    const updatedBooking = await Booking.findById(booking._id).populate("car");
    res.status(200).json(updatedBooking);
  } catch (error) {
    res.status(500).json({ message: "Kunde inte avboka resan: " + error.message });
  }
};
