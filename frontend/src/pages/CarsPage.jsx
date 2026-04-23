import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const CarsPage = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulerad data - ersätt med riktigt API-anrop
    const mockCars = [
      {
        id: 1,
        brand: "Volvo",
        model: "XC60",
        year: 2022,
        price: 450000,
        image: "/images/volvo-xc60.jpg"
      },
      {
        id: 2,
        brand: "Saab",
        model: "9-3",
        year: 2019,
        price: 250000,
        image: "/images/saab-93.jpg"
      }
    ];
    
    setCars(mockCars);
    setLoading(false);
  }, []);

  if (loading) {
    return <div>Laddar bilar...</div>;
  }

  return (
    <div className="cars-page">
      <div className="page-header">
        <h1>Tillgängliga Bilar</h1>
        <p>Hitta din drömbil bland vårt utbud</p>
      </div>
      
      <div className="cars-grid">
        {cars.map((car) => (
          <div key={car.id} className="car-card">
            <div className="car-image">
              <img src={car.image} alt={`${car.brand} ${car.model}`} />
            </div>
            <div className="car-info">
              <h3>{car.brand} {car.model}</h3>
              <p className="car-year">År: {car.year}</p>
              <p className="car-price">{car.price.toLocaleString()} kr</p>
              <Link to={`/cars/${car.id}`} className="btn btn-primary">
                Se detaljer
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarsPage;
