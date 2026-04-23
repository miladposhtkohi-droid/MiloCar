import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCarById } from "../api/carApi";

const CarDetailsPage = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchCar = async () => {
    setLoading(true);
    const res = await getCarById(id);
    setCar(res.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchCar();
  }, [id]);

  if (loading) return <div>Laddar bil...</div>;
  if (!car) return <div>Kunde inte hitta bilen.</div>;

  return (
    <div className="page">
      <h1>{car.title}</h1>

      <div className="car-details">
        <p><strong>Märke:</strong> {car.brand}</p>
        <p><strong>Modell:</strong> {car.model}</p>
        <p><strong>Årsmodell:</strong> {car.year}</p>
        <p><strong>Pris:</strong> {car.price.toLocaleString()} kr</p>
        <p><strong>Plats:</strong> {car.location}</p>
        <p><strong>Bränsle:</strong> {car.fuelType}</p>
        <p><strong>Växellåda:</strong> {car.gearbox}</p>

        <p><strong>Beskrivning:</strong></p>
        <p>{car.description || "Ingen beskrivning tillagd."}</p>
      </div>
    </div>
  );
};

export default CarDetailsPage;
