import { Link } from "react-router-dom";
import "./CarCard.css";

const CarCard = ({ car }) => {
  const getStatusLabel = () => {
    switch (car.status) {
      case "pending":
        return "Väntar på godkännande";
      case "approved":
        return "Godkänd";
      case "rejected":
        return "Avslaget";
      default:
        return "";
    }
  };

  const getStatusClass = () => {
    return `status-${car.status}`;
  };

  return (
    <article className="car-card">
      {/* Image container */}
      <div className="car-card-image-container">
        <img
          src={
            car.image ||
            "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=1000"
          }
          alt={`${car.brand} ${car.model}`}
          className="car-card-image"
        />
        <div className="car-card-year-badge">{car.year}</div>
        {car.status && (
          <div className={`car-card-status-badge ${getStatusClass()}`}>
            {getStatusLabel()}
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="car-card-content">
        <div className="car-card-header">
          <h3 className="car-card-title">
            {car.title || `${car.brand} ${car.model}`}
          </h3>
          <p className="car-card-subtitle">
            {car.brand} {car.model}
          </p>
        </div>

        <p className="car-card-price">
          {car.price ? car.price.toLocaleString() : "Pris ej angivet"} kr
        </p>

        {/* Feature badges */}
        <div className="car-card-features">
          <div className="car-card-feature location">
            <svg
              className="car-card-feature-icon"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
              />
            </svg>
            <span className="car-card-feature-text">
              {car.location || "Sverige"}
            </span>
          </div>
          <div className="car-card-feature">
            <svg
              className="car-card-feature-icon"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.315 48.315 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z"
              />
            </svg>
            <span>{car.gearbox || "Manuell"}</span>
          </div>
          <div className="car-card-feature">
            <svg
              className="car-card-feature-icon"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
              />
            </svg>
            <span>{car.fuelType || "Bensin"}</span>
          </div>
        </div>

        {/* View Details Button */}
        <Link to={`/cars/${car._id}`} className="car-card-button">
          Visa detaljer
        </Link>
      </div>
    </article>
  );
};

export default CarCard;
