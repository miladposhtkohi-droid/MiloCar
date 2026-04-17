import Car from "../models/Car.js";

//create car
export const createCar = async (req, res) => {
  try {
    //hämta usrid från token
    const userId = req.user.id;
    //skapa ny bil med data från body och owner
    const car = await Car.create({
      ...req.body,
      owner: userId,
    });

    //returnera bil
    res.status(201).json(car);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get my car
export const getmyCar = async (req, res) => {
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

    //kolla om användaren är ägare till bilen
    if (car.owner.toString() === userId) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    //uppdatera bilen
    const updatedCar = await Car.findByIdAndUpdate(carId, req.body, {
      new: true,
    });
    res.status(200).json(updatedCar);

    //om admin uppdaterar bilen
    if (userRole === "admin") {
      const updatedCar = await Car.findByIdAndUpdate(carId, req.body, {
        new: true,
      });
      return res.status(200).json(updatedCar);
    }

    //annars förbjudet
    return res.status(403).json({ message: "Forbidden" });
  } catch (error) {}
};


//delete a car 

export const deleteCar = async (req, res) => {

try {
    const carId = req.params.id;
    const userId = req.user.id;
    const userRole = req.user.role;

    //hämta bilen
    const car = await Car.findById(carId);
    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }

    //kolla om användaren är ägare till bilen
    if (car.owner.toString() === userId) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    //delete bilen
    const deletedCar = await Car.findByIdAndDelete(carId);
    res.status(200).json(deletedCar);

    //om admin delete bilen
    if (userRole === "admin") {
      const deletedCar = await Car.findByIdAndDelete(carId);
      return res.status(200).json(deletedCar);
    }

    //annars förbjudet
    return res.status(403).json({ message: "Forbidden" });
}
catch (error) {
    res.status(500).json({ message: error.message });
}       


}




