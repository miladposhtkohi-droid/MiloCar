import Car from "../models/Car.js";

//create car
export const createCar = async (req, res) => {
  try {
    //hämta usrid från token
    const userId = req.user.id;

    // Skapa bil-objekt med text-fält
    const carData = {
      title: req.body.title,
      brand: req.body.brand,
      model: req.body.model,
      year: req.body.year,
      price: req.body.price,
      mileage: req.body.mileage,
      location: req.body.location,
      fuelType: req.body.fuelType,
      gearbox: req.body.gearbox,
      description: req.body.description,
      status: "pending",
      owner: userId,
    };

    // Lägg till bild om den finns
    if (req.file) {
      carData.image = req.file.filename; // Spara filnamnet från multer
    }

    //skapa ny bil
    const car = await Car.create(carData);

    //returnera bil
    res.status(201).json(car);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get all cars
export const getAllCars = async (req, res) => {
  try {
    const cars = await Car.find({ status: "approved" }).populate(
      "owner",
      "name email",
    );
    res.status(200).json(cars);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get my car
export const getMyCar = async (req, res) => {
  try {
    //hämta alla bilar
    const cars = await Car.find({ owner: req.user.id }).populate(
      "owner",
      "name email",
    );
    if (!cars || cars.length === 0) {
      return res.status(404).json({ message: "Cars not found" });
    }
    // skicka tillbackan listan med bilar
    res.status(200).json(cars);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get car by id
export const getCarById = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id).populate(
      "owner",
      "name email",
    );
    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }
    res.status(200).json(car);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//uppdate car

export const updateCar = async (req, res) => {
  try {
    const carId = req.params.id;
    const userId = req.user.id;
    const userRole = req.user.role;

    //hämta bilen
    const car = await Car.findById(carId);
    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }

    //kolla om användaren är ägare till bilen eller admin
    if (car.owner.toString() !== userId && userRole !== "admin") {
      return res.status(403).json({ message: "Unauthorized" });
    }

    //uppdatera bilen
    const updatedCar = await Car.findByIdAndUpdate(carId, req.body, {
      new: true,
    });

    return res.status(200).json(updatedCar);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//delete a car

export const deleteCar = async (req, res) => {
  try {
    const carId = req.params.id;
    const userId = req.user.id;
    const userRole = req.user.role;

    // hämta bilen
    const car = await Car.findById(carId);
    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }

    // om användaren INTE är ägare och INTE admin → blockera
    if (car.owner.toString() !== userId && userRole !== "admin") {
      return res.status(403).json({ message: "Unauthorized" });
    }

    // radera bilen
    const deletedCar = await Car.findByIdAndDelete(carId);
    return res.status(200).json(deletedCar || { message: "Car deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
