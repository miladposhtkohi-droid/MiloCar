import Car from "../models/Car.js";

export const getAllCarsAdmin = async (req, res) => {
  try {
    const cars = await Car.find().populate("owner", "name email");
    res.status(200).json(cars);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Admin: godkänd bil

export const approveCar = async (req, res) => {
  try {
    const car = await Car.findByIdAndUpdate(
      req.params.id,
      { approved: true },
      { new: true },
    );
    res.status(200).json(car);
    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }
    res.json({ message: "Car approved", car });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Asmin avslå bil
export const rejectCar = async (req, res) => {
  try {
    const car = await Car.findByIdAndUpdate(
      req.params.id,
      { approved: false },
      { new: true },
    );
    res.status(200).json(car);
    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }
    res.json({ message: "Car rejected", car });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
