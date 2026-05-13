import { useEffect, useState } from "react";
import { getMyCars, deleteCar } from "../api/carApi";
import { useNavigate } from "react-router-dom";
import CarCard from "../components/Cars/CarCard";
import "./MyCarsPage.css";

const MyCarsPage = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchMyCars = async () => {
    setLoading(true);
    const res = await getMyCars();
    setCars(res.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchMyCars();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Är du säker att du vill ta bort bilen?")) return;

    await deleteCar(id);
    fetchMyCars(); // hämta listan igen efter borttagning
  };

  const handleEdit = (carId) => {
    navigate(`/cars/${carId}/edit`);
  };

  if (loading) return <div>Laddar dina bilar...</div>;

  return (
    <div className="page">
      <h1>Mina bilar</h1>

      {cars.length === 0 && <p>Du har inte lagt upp några bilar ännu.</p>}

      <div className="car-grid">
        {cars.map((car) => (
          <div key={car._id} className="my-car-item">
            <CarCard car={car} />

            <div className="my-car-actions">
              {car.status === "approved" && (
                <button onClick={() => handleEdit(car._id)}>Redigera</button>
              )}
              <button onClick={() => handleDelete(car._id)}>Ta bort</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyCarsPage;
