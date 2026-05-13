import { useEffect, useState } from "react";
import { getAllCars } from "../api/carApi";

const MapPage = () => {
  const [cars, setCars] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);
  const [mapUrl, setMapUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const buildMapUrl = (lat, lon) => {
    const delta = 0.02;
    const bbox = [lon - delta, lat - delta, lon + delta, lat + delta]
      .map((v) => v.toFixed(6))
      .join("%2C");
    return `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat.toFixed(6)}%2C${lon.toFixed(6)}`;
  };

  const geocodeLocation = async (location) => {
    if (!location) {
      setError("Ingen plats angiven för bilen.");
      setMapUrl("");
      return;
    }

    try {
      setError("");
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          location,
        )}&limit=1`,
      );
      const result = await response.json();

      if (result.length === 0) {
        setError(`Hittade ingen karta för platsen: ${location}`);
        setMapUrl("");
        return;
      }

      const { lat, lon } = result[0];
      setMapUrl(buildMapUrl(Number(lat), Number(lon)));
    } catch (fetchError) {
      setError("Kunde inte hämta kartdata. Försök igen senare.");
      setMapUrl("");
    }
  };

  useEffect(() => {
    const loadCars = async () => {
      setLoading(true);
      try {
        const response = await getAllCars();
        const carList = response.data || [];
        setCars(carList);
        const firstCar = carList[0] || null;
        setSelectedCar(firstCar);
        if (firstCar) {
          await geocodeLocation(firstCar.location);
        }
      } catch (fetchError) {
        setError("Kunde inte hämta bilar för kartan.");
      } finally {
        setLoading(false);
      }
    };

    loadCars();
  }, []);

  const handleCarSelect = async (car) => {
    setSelectedCar(car);
    await geocodeLocation(car.location);
  };

  return (
    <div className="page">
      <h1>Karta</h1>
      <p>Välj en bil för att se var den ligger på kartan.</p>

      {loading ? (
        <div>Laddar kartdata...</div>
      ) : (
        <div
          className="map-page-grid"
          style={{
            display: "grid",
            gap: "1.5rem",
            gridTemplateColumns: "320px 1fr",
          }}
        >
          <aside
            className="map-car-list"
            style={{
              padding: "1rem",
              border: "1px solid #ddd",
              borderRadius: "12px",
              background: "#fff",
            }}
          >
            <h2>Tillgängliga bilar</h2>
            {cars.length === 0 ? (
              <p>Inga godkända bilar hittades.</p>
            ) : (
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {cars.map((car) => (
                  <li key={car._id} style={{ marginBottom: "1rem" }}>
                    <button
                      type="button"
                      onClick={() => handleCarSelect(car)}
                      style={{
                        width: "100%",
                        textAlign: "left",
                        padding: "0.75rem",
                        borderRadius: "10px",
                        border:
                          car === selectedCar
                            ? "2px solid #2563eb"
                            : "1px solid #ccc",
                        background: car === selectedCar ? "#eff6ff" : "#fafafa",
                        cursor: "pointer",
                      }}
                    >
                      <strong>{car.title}</strong>
                      <div style={{ fontSize: "0.95rem", color: "#555" }}>
                        {car.location || "Ingen plats"}
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </aside>

          <section
            className="map-view"
            style={{
              minHeight: "520px",
              borderRadius: "12px",
              overflow: "hidden",
              border: "1px solid #ddd",
            }}
          >
            {error ? (
              <div style={{ padding: "1.5rem" }}>
                <p style={{ color: "#b91c1c" }}>{error}</p>
              </div>
            ) : mapUrl ? (
              <iframe
                title="Bilens plats"
                src={mapUrl}
                style={{ width: "100%", minHeight: "520px", border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div style={{ padding: "1.5rem" }}>
                <p>Välj en bil för att visa platsen på kartan.</p>
              </div>
            )}
          </section>
        </div>
      )}
    </div>
  );
};

export default MapPage;
