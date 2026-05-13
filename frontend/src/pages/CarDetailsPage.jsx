import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCarById } from "../api/carApi";

const CarDetailsPage = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mapUrl, setMapUrl] = useState("");
  const [mapError, setMapError] = useState("");
  const [geocodeLoading, setGeocodeLoading] = useState(false);

  const buildMapUrl = (lat, lon) => {
    const delta = 0.02;
    const bbox = [lon - delta, lat - delta, lon + delta, lat + delta]
      .map((value) => value.toFixed(6))
      .join("%2C");

    return `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat.toFixed(6)}%2C${lon.toFixed(6)}`;
  };

  const geocodeLocation = async (location) => {
    if (!location) {
      setMapError("Ingen plats angiven för denna bil.");
      setMapUrl("");
      return;
    }

    setMapError("");
    setGeocodeLoading(true);

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}&limit=1`,
      );
      const data = await response.json();

      if (!data || data.length === 0) {
        setMapError(`Kunde inte hitta platsen: ${location}`);
        setMapUrl("");
      } else {
        const { lat, lon } = data[0];
        setMapUrl(buildMapUrl(Number(lat), Number(lon)));
      }
    } catch (error) {
      setMapError("Kunde inte hämta kartinformation just nu.");
      setMapUrl("");
    } finally {
      setGeocodeLoading(false);
    }
  };

  const fetchCar = async () => {
    setLoading(true);
    const res = await getCarById(id);
    setCar(res.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchCar();
  }, [id]);

  useEffect(() => {
    if (car) {
      geocodeLocation(car.location);
    }
  }, [car]);

  if (loading) return <div>Laddar bil...</div>;
  if (!car) return <div>Kunde inte hitta bilen.</div>;

  return (
    <div className="page">
      <h1>{car.title}</h1>

      <div
        className="car-details"
        style={{ display: "grid", gap: "2rem", gridTemplateColumns: "1fr 1fr" }}
      >
        <div>
          <p>
            <strong>Märke:</strong> {car.brand}
          </p>
          <p>
            <strong>Modell:</strong> {car.model}
          </p>
          <p>
            <strong>Årsmodell:</strong> {car.year}
          </p>
          <p>
            <strong>Pris:</strong> {car.price.toLocaleString()} kr
          </p>
          <p>
            <strong>Plats:</strong> {car.location}
          </p>
          <p>
            <strong>Bränsle:</strong> {car.fuelType}
          </p>
          <p>
            <strong>Växellåda:</strong> {car.gearbox}
          </p>
        </div>

        <div>
          <p>
            <strong>Beskrivning:</strong>
          </p>
          <p>{car.description || "Ingen beskrivning tillagd."}</p>
        </div>
      </div>

      <div style={{ marginTop: "2rem" }}>
        <h2>Bilens plats</h2>

        {geocodeLoading ? (
          <p>Laddar kartan...</p>
        ) : mapError ? (
          <p style={{ color: "#b91c1c" }}>{mapError}</p>
        ) : mapUrl ? (
          <iframe
            title="Bilens plats"
            src={mapUrl}
            style={{
              width: "100%",
              minHeight: "420px",
              border: 0,
              borderRadius: "12px",
            }}
            loading="lazy"
            referrerPolicy="no-referrer"
          />
        ) : (
          <p>Platsinformationen är inte tillräcklig för att visa kartan.</p>
        )}
      </div>
    </div>
  );
};

export default CarDetailsPage;
