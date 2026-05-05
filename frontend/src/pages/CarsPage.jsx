import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllCars } from "../api/carApi";
import CarCard from "../components/Cars/CarCard";
import "./CarsPage.css";

const CarsPage = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await getAllCars();
        setCars(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching cars:", error);
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  if (loading) {
    return <div>Laddar bilar...</div>;
  }

  return (
    <div className="page">
      <h1>Alla bilar</h1>

      {cars.length === 0 ? (
        <p>Inga bilar tillgängliga just nu.</p>
      ) : (
        <div className="car-grid">
          {cars.map((car) => (
            <CarCard key={car._id} car={car} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CarsPage;
