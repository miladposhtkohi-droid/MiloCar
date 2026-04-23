import { Link } from "react-router-dom";

const CarCard = ({ car }) => {
  return (
    <article className="car-card">
      <h3>{car.title}</h3>

      <p>
        {car.brand} {car.model} • {car.year}
      </p>

      <p className="price">{car.price.toLocaleString()} kr</p>

      <p>{car.location}</p>

      <p>
        {car.fuelType} • {car.gearbox}
      </p>

      <Link to={`/cars/${car._id}`} className="details-link">
        Visa detaljer
      </Link>
    </article>
  );
};

export default CarCard;
