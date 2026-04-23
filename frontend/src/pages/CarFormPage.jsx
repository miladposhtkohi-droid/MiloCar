import { useState } from "react";
import { createCar } from "../api/carApi";
import { useNavigate } from "react-router-dom";

const CarFormPage = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    brand: "",
    model: "",
    year: "",
    price: "",
    location: "",
    fuelType: "",
    gearbox: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createCar(form);
      navigate("/my-cars");
    } catch (error) {
      alert("Kunde inte skapa bil");
    }
  };

  return (
    <div className="page">
      <h1>Lägg upp bil</h1>

      <form onSubmit={handleSubmit} className="car-form">
        <input
          name="title"
          placeholder="Titel (ex: Volvo XC60 Momentum)"
          value={form.title}
          onChange={handleChange}
          required
        />

        <input
          name="brand"
          placeholder="Märke (Volvo, BMW...)"
          value={form.brand}
          onChange={handleChange}
          required
        />

        <input
          name="model"
          placeholder="Modell (XC60, A4...)"
          value={form.model}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="year"
          placeholder="Årsmodell"
          value={form.year}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="price"
          placeholder="Pris"
          value={form.price}
          onChange={handleChange}
          required
        />

        <input
          name="location"
          placeholder="Plats (Stockholm, Göteborg...)"
          value={form.location}
          onChange={handleChange}
          required
        />

        <select
          name="fuelType"
          value={form.fuelType}
          onChange={handleChange}
          required
        >
          <option value="">Bränsletyp</option>
          <option value="bensin">Bensin</option>
          <option value="diesel">Diesel</option>
          <option value="el">El</option>
          <option value="hybrid">Hybrid</option>
        </select>

        <select
          name="gearbox"
          value={form.gearbox}
          onChange={handleChange}
          required
        >
          <option value="">Växellåda</option>
          <option value="manuell">Manuell</option>
          <option value="automat">Automat</option>
        </select>

        <button type="submit">Spara bil</button>
      </form>
    </div>
  );
};

export default CarFormPage;
