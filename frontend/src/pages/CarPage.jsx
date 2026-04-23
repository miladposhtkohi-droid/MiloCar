import { useEffect, useState } from "react";
import { getAllCars } from "../api/carApi";
import CarCard from "../components/Cars/CarCard";
import CarFilter from "../components/Cars/CarFilter";

const CarsPage = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCars = async (filters = {}) => {
    setLoading(true);
    const res = await getAllCars(filters);
    setCars(res.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchCars();
  }, []);

  const handleFilterChange = (filters) => {
    const params = {};
    if (filters.brand) params.brand = filters.brand;
    if (filters.fuelType) params.fuelType = filters.fuelType;
    if (filters.gearbox) params.gearbox = filters.gearbox;
    if (filters.minPrice) params.minPrice = filters.minPrice;
    if (filters.maxPrice) params.maxPrice = filters.maxPrice;

    fetchCars(params);
  };

  if (loading) return <div>Laddar bilar...</div>;

  return (
    <div className="page">
      <h1>Alla bilar</h1>

      <CarFilter onChange={handleFilterChange} />

      <div className="car-grid">
        {cars.map((car) => (
          <CarCard key={car._id} car={car} />
        ))}
      </div>
    </div>
  );
};

export default CarsPage;
