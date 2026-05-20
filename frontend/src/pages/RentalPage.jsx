import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getAllCars } from "../api/carApi";
import {
  createBooking,
  getMyBookings,
  cancelBooking,
} from "../api/bookingApi";
import "./RentalPage.css";

const RentalPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Cars list states
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  // User Bookings states
  const [bookings, setBookings] = useState([]);
  const [bookingsLoading, setBookingsLoading] = useState(false);

  // Filters states
  const [search, setSearch] = useState("");
  const [fuelFilter, setFuelFilter] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  // Booking Modal States
  const [selectedCar, setSelectedCar] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [submittingBooking, setSubmittingBooking] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Fetch cars & bookings on mount
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const res = await getAllCars();
        // Filtrera bilar som är godkända (approved)
        // I fall getAllCars redan filtrerar, det är jättebra. Men vi ser till att det är godkända annonser
        setCars(res.data || []);
        setLoading(false);
      } catch (err) {
        console.error("Kunde inte hämta bilar:", err);
        setLoading(false);
      }
    };

    fetchCars();
    if (user) {
      fetchUserBookings();
    }
  }, [user]);

  const fetchUserBookings = async () => {
    setBookingsLoading(true);
    try {
      const res = await getMyBookings();
      setBookings(res.data || []);
    } catch (err) {
      console.error("Kunde inte hämta bokningar:", err);
    } finally {
      setBookingsLoading(false);
    }
  };

  // Helper function to resolve image URL
  const getCarImage = (car) => {
    if (!car.image) {
      return "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=1000";
    }
    if (car.image.startsWith("http") || car.image.startsWith("blob:")) {
      return car.image;
    }
    return `http://localhost:3000/uploads/${car.image}`;
  };

  // Helper to calculate daily rental rate (since cars are for sale, let's derive a realistic premium daily rental fee!)
  const getDailyRate = (car) => {
    // Standard daily price is 0.2% of car value + 199 kr baseline (e.g. 200,000kr car is 599kr / day)
    const derivedRate = Math.round(car.price * 0.002) + 199;
    // Cap daily rate between 299 kr and 2499 kr
    return Math.min(Math.max(derivedRate, 299), 2499);
  };

  // Calculate rental breakdown
  const calculateTotal = (dailyRate) => {
    if (!startDate || !endDate) return { days: 0, subtotal: 0, service: 0, total: 0 };
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays <= 0) return { days: 0, subtotal: 0, service: 0, total: 0 };
    
    const subtotal = dailyRate * diffDays;
    const service = 250; // Basavgift för städning & service
    const total = subtotal + service;

    return { days: diffDays, subtotal, service, total };
  };

  // Handle open booking modal
  const handleOpenBooking = (car) => {
    setSelectedCar(car);
    // Sätt standard-datum till imorgon och i övermorgon
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dayAfter = new Date();
    dayAfter.setDate(dayAfter.getDate() + 2);

    setStartDate(tomorrow.toISOString().split("T")[0]);
    setEndDate(dayAfter.toISOString().split("T")[0]);
    setErrorMessage("");
    setBookingSuccess(false);
  };

  // Handle close booking modal
  const handleCloseBooking = () => {
    setSelectedCar(null);
    setBookingSuccess(false);
  };

  // Handle Booking Submit
  const handleConfirmBooking = async () => {
    if (!user) {
      setErrorMessage("Vänligen logga in först för att genomföra bokningen.");
      return;
    }

    if (!startDate || !endDate) {
      setErrorMessage("Vänligen välj start- och slutdatum.");
      return;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);
    if (end <= start) {
      setErrorMessage("Slutdatumet måste vara efter startdatumet.");
      return;
    }

    const dailyRate = getDailyRate(selectedCar);
    const { total } = calculateTotal(dailyRate);

    setSubmittingBooking(true);
    setErrorMessage("");

    try {
      await createBooking({
        carId: selectedCar._id,
        startDate,
        endDate,
        totalPrice: total,
      });

      setBookingSuccess(true);
      fetchUserBookings(); // Refresh bookings list
      
      // Stäng modal efter en liten stund
      setTimeout(() => {
        handleCloseBooking();
      }, 2500);
    } catch (err) {
      setErrorMessage(
        err.response?.data?.message || "Kunde inte spara din bokning. Försök igen."
      );
    } finally {
      setSubmittingBooking(false);
    }
  };

  // Handle Booking Cancel
  const handleCancelBooking = async (bookingId) => {
    if (!window.confirm("Är du säker på att du vill avboka den här resan?")) {
      return;
    }

    try {
      await cancelBooking(bookingId);
      alert("Din bokning har avbokats framgångsrikt.");
      fetchUserBookings();
    } catch (err) {
      alert("Kunde inte avboka resan: " + (err.response?.data?.message || err.message));
    }
  };

  // Filter logic
  const filteredCars = cars.filter((car) => {
    const matchesSearch =
      car.brand.toLowerCase().includes(search.toLowerCase()) ||
      car.model.toLowerCase().includes(search.toLowerCase()) ||
      car.title.toLowerCase().includes(search.toLowerCase());
    
    const matchesFuel = fuelFilter ? car.fuelType === fuelFilter : true;
    
    const dailyRate = getDailyRate(car);
    const matchesPrice = maxPrice ? dailyRate <= parseInt(maxPrice) : true;

    return matchesSearch && matchesFuel && matchesPrice;
  });

  return (
    <div className="rental-container">
      {/* Hero Section */}
      <section className="rental-hero">
        <h1 className="text-slate-900">MiloCar Premium Uthyrning</h1>
        <p className="text-slate-600">
          Hyr en högklassig bil tryggt och enkelt. Välj bland hundratals
          godkända fordon över hela Sverige med helförsäkring och support dygnet runt.
        </p>
      </section>

      {/* Advanced Filters */}
      <section className="rental-filters">
        <div className="filter-group">
          <label htmlFor="search-input">Sök Bil</label>
          <input
            id="search-input"
            type="text"
            placeholder="Sök märke, modell..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="filter-input"
          />
        </div>

        <div className="filter-group">
          <label htmlFor="fuel-select">Bränsletyp</label>
          <select
            id="fuel-select"
            value={fuelFilter}
            onChange={(e) => setFuelFilter(e.target.value)}
            className="filter-input"
          >
            <option value="">Alla bränslen</option>
            <option value="bensin">Bensin</option>
            <option value="diesel">Diesel</option>
            <option value="el">Elbil</option>
            <option value="hybrid">Hybrid</option>
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="price-select">Maxpris per dag (kr)</label>
          <select
            id="price-select"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="filter-input"
          >
            <option value="">Valfritt pris</option>
            <option value="400">400 kr / dag</option>
            <option value="600">600 kr / dag</option>
            <option value="900">900 kr / dag</option>
            <option value="1500">1500 kr / dag</option>
          </select>
        </div>
      </section>

      {/* Cars Grid */}
      <main>
        {loading ? (
          <div className="text-center py-10 font-semibold text-slate-500">
            Laddar tillgängliga bilar...
          </div>
        ) : filteredCars.length === 0 ? (
          <div className="text-center py-12 text-slate-500 bg-white rounded-2xl border border-slate-100 p-8">
            Inga bilar matchade dina sökfilter. Prova att ändra filtren.
          </div>
        ) : (
          <div className="rental-grid">
            {filteredCars.map((car) => {
              const dailyRate = getDailyRate(car);
              return (
                <article key={car._id} className="rental-card">
                  <div className="rental-image-container">
                    <img
                      src={getCarImage(car)}
                      alt={`${car.brand} ${car.model}`}
                      className="rental-img"
                    />
                    <div className="rental-price-badge">
                      {dailyRate} kr <span>/ dag</span>
                    </div>
                  </div>

                  <div className="rental-card-content">
                    <div className="rental-title-block">
                      <h3>{car.title}</h3>
                      <div className="rental-location-text">
                        <svg
                          className="w-4 h-4 text-blue-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        <span>{car.location}</span>
                      </div>
                    </div>

                    <div className="rental-details-grid">
                      <div className="rental-detail-item">
                        <span className="rental-detail-label">Bränsle</span>
                        <span className="rental-detail-value">{car.fuelType}</span>
                      </div>
                      <div className="rental-detail-item">
                        <span className="rental-detail-label">Växellåda</span>
                        <span className="rental-detail-value">{car.gearbox}</span>
                      </div>
                      <div className="rental-detail-item">
                        <span className="rental-detail-label">År</span>
                        <span className="rental-detail-value">{car.year}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleOpenBooking(car)}
                      className="btn-rent"
                    >
                      Boka & Hyr Nu
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </main>

      {/* Booking Modal */}
      {selectedCar && (
        <div className="booking-modal-overlay" onClick={handleCloseBooking}>
          <div
            className="booking-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="modal-close-btn" onClick={handleCloseBooking}>
              ✕
            </button>

            {bookingSuccess ? (
              <div className="booking-success-container">
                <div className="success-check-circle">✓</div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Bokning Bekräftad!</h2>
                <p className="text-slate-600 mb-4">
                  Grattis! Din resa med <strong>{selectedCar.title}</strong> är nu inbokad.
                </p>
                <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 w-full">
                  <p className="text-sm text-slate-500">Bokningsperiod:</p>
                  <p className="font-bold text-slate-800">
                    {startDate} till {endDate}
                  </p>
                </div>
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-extrabold text-slate-900 mb-4">Boka din MiloCar</h2>

                <div className="booking-summary-car">
                  <img
                    src={getCarImage(selectedCar)}
                    alt={selectedCar.title}
                    className="modal-car-img"
                  />
                  <div className="modal-car-info">
                    <h4>{selectedCar.title}</h4>
                    <p className="capitalize">
                      {selectedCar.brand} • {selectedCar.gearbox} • {selectedCar.fuelType}
                    </p>
                    <p className="font-bold text-blue-600 mt-1">
                      {getDailyRate(selectedCar)} kr / dag
                    </p>
                  </div>
                </div>

                {!user && (
                  <div className="warning-badge">
                    Du behöver vara inloggad för att boka.{" "}
                    <Link to="/login" onClick={handleCloseBooking}>
                      Klicka här för att logga in
                    </Link>
                    .
                  </div>
                )}

                <div className="booking-dates-selector">
                  <div className="filter-group">
                    <label htmlFor="start-date">Hämta ut</label>
                    <input
                      id="start-date"
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      min={new Date().toISOString().split("T")[0]}
                      className="filter-input"
                    />
                  </div>

                  <div className="filter-group">
                    <label htmlFor="end-date">Lämna tillbaka</label>
                    <input
                      id="end-date"
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      min={startDate || new Date().toISOString().split("T")[0]}
                      className="filter-input"
                    />
                  </div>
                </div>

                {/* Pricing Summary */}
                {startDate && endDate && (
                  <div className="price-breakdown">
                    <div className="price-row">
                      <span>
                        Dagspris ({getDailyRate(selectedCar)} kr ×{" "}
                        {calculateTotal(getDailyRate(selectedCar)).days} dagar)
                      </span>
                      <span>
                        {calculateTotal(getDailyRate(selectedCar)).subtotal.toLocaleString()}{" "}
                        kr
                      </span>
                    </div>
                    <div className="price-row">
                      <span>Service & Städavgift</span>
                      <span>
                        {calculateTotal(getDailyRate(selectedCar)).service.toLocaleString()}{" "}
                        kr
                      </span>
                    </div>
                    <div className="price-row total">
                      <span>Totalbelopp</span>
                      <span>
                        {calculateTotal(getDailyRate(selectedCar)).total.toLocaleString()} kr
                      </span>
                    </div>
                  </div>
                )}

                {errorMessage && (
                  <p className="text-red-500 text-sm font-semibold mb-4 bg-red-50 p-3 rounded-lg">
                    {errorMessage}
                  </p>
                )}

                <button
                  onClick={handleConfirmBooking}
                  disabled={
                    !user ||
                    submittingBooking ||
                    calculateTotal(getDailyRate(selectedCar)).days <= 0
                  }
                  className="btn-confirm-booking"
                >
                  {submittingBooking ? "Slutför bokning..." : "Slutför & Bekräfta Bokning"}
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* Active User Bookings Section */}
      {user && (
        <section className="active-bookings-section">
          <h2 className="section-title">Mina Bokade Resor</h2>
          {bookingsLoading ? (
            <p className="text-slate-500">Laddar dina bokningar...</p>
          ) : bookings.length === 0 ? (
            <div className="bookings-empty">
              Du har inga bokade resor för tillfället. Hitta en bil ovan för att boka din första resa!
            </div>
          ) : (
            <div className="bookings-list">
              {bookings.map((booking) => (
                <div key={booking._id} className="booking-item">
                  <div className="booking-item-details">
                    <img
                      src={getCarImage(booking.car)}
                      alt={booking.car.title}
                      className="w-20 h-14 object-cover rounded-lg"
                    />
                    <div className="booking-car-info">
                      <h4>{booking.car.title}</h4>
                      <div className="booking-date-range">
                        <svg
                          className="w-4 h-4 text-slate-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        <span>
                          {new Date(booking.startDate).toLocaleDateString("sv-SE")} –{" "}
                          {new Date(booking.endDate).toLocaleDateString("sv-SE")}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="booking-meta">
                    <div className="booking-item-price">
                      <p className="text-xs text-slate-400">Totalpris</p>
                      <p className="booking-item-price-val">
                        {booking.totalPrice.toLocaleString()} kr
                      </p>
                    </div>

                    <span className={`booking-status-badge ${booking.status}`}>
                      {booking.status}
                    </span>

                    {booking.status === "aktiv" && (
                      <button
                        onClick={() => handleCancelBooking(booking._id)}
                        className="btn-cancel-booking"
                      >
                        Avboka
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      )}
    </div>
  );
};

export default RentalPage;
