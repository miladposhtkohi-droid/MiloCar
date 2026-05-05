import { useState, useEffect } from "react";
import { getAllCarsAdmin, approveCar, rejectCar } from "../api/adminApi";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPendingCars = async () => {
    try {
      setLoading(true);
      const response = await getAllCarsAdmin();
      setCars(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching cars:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingCars();
  }, []);

  const handleApprove = async (carId) => {
    try {
      await approveCar(carId);
      fetchPendingCars(); // Uppdatera listan
    } catch (error) {
      alert("Kunde inte godkänna bilen");
    }
  };

  const handleReject = async (carId) => {
    try {
      await rejectCar(carId);
      fetchPendingCars(); // Uppdatera listan
    } catch (error) {
      alert("Kunde inte avslå bilen");
    }
  };

  const pendingCars = cars.filter((car) => car.status === "pending");
  const approvedCars = cars.filter((car) => car.status === "approved");
  const rejectedCars = cars.filter((car) => car.status === "rejected");

  if (loading) {
    return <div className="admin-loading">Laddar...</div>;
  }

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h1>Admin Dashboard</h1>
        <p>Hantera bil-inlägg från användare</p>
      </div>

      <div className="admin-stats">
        <div className="stat-card">
          <h3>Väntar på godkännande</h3>
          <div className="stat-number">{pendingCars.length}</div>
        </div>
        <div className="stat-card">
          <h3>Godkända bilar</h3>
          <div className="stat-number">{approvedCars.length}</div>
        </div>
        <div className="stat-card">
          <h3>Avslagna bilar</h3>
          <div className="stat-number">{rejectedCars.length}</div>
        </div>
      </div>

      <div className="admin-section">
        <h2>Bilar som väntar på godkännande</h2>
        {pendingCars.length === 0 ? (
          <p className="no-cars">Inga bilar väntar på godkännande</p>
        ) : (
          <div className="cars-grid">
            {pendingCars.map((car) => (
              <div key={car._id} className="car-card">
                <div className="car-info">
                  <h3>{car.title}</h3>
                  <p>
                    <strong>Märke:</strong> {car.brand}
                  </p>
                  <p>
                    <strong>Modell:</strong> {car.model}
                  </p>
                  <p>
                    <strong>År:</strong> {car.year}
                  </p>
                  <p>
                    <strong>Pris:</strong> {car.price.toLocaleString()} kr
                  </p>
                  <p>
                    <strong>Plats:</strong> {car.location}
                  </p>
                  <p>
                    <strong>Ägare:</strong> {car.owner?.name || "Okänd"}
                  </p>
                </div>
                <div className="car-actions">
                  <button
                    onClick={() => handleApprove(car._id)}
                    className="btn-approve"
                  >
                    Godkänn
                  </button>
                  <button
                    onClick={() => handleReject(car._id)}
                    className="btn-reject"
                  >
                    Avslå
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
