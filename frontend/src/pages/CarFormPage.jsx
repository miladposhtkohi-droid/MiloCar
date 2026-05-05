import { useState } from "react";
import { createCar } from "../api/carApi";
import { useNavigate } from "react-router-dom";
import "./CarFormPage.css";

const CarFormPage = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    brand: "",
    model: "",
    year: "",
    price: "",
    mileage: "",
    location: "",
    fuelType: "",
    gearbox: "",
    description: "",
    image: "",
  });

  const handleChange = (e) => {
    if (e.target.type === "file") {
      // Hantera fil-uppladdning
      const file = e.target.files[0];
      if (file) {
        // Skapa en temporär URL för förhandsvisning
        const imageUrl = URL.createObjectURL(file);
        setForm({
          ...form,
          image: imageUrl,
          imageFile: file, // Spara fil-objektet för upload
        });
      }
    } else {
      // Hantera vanliga text-inputs
      setForm({
        ...form,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Skapa FormData för att hantera fil-uppladdning
      const formData = new FormData();

      // Lägg till alla text-fält
      formData.append("title", form.title);
      formData.append("brand", form.brand);
      formData.append("model", form.model);
      formData.append("year", parseInt(form.year));
      formData.append("price", parseInt(form.price));
      formData.append("mileage", parseInt(form.mileage || 0));
      formData.append("location", form.location);
      formData.append("fuelType", form.fuelType);
      formData.append("gearbox", form.gearbox);
      formData.append("description", form.description);

      // Lägg till bild om den finns
      if (form.imageFile) {
        formData.append("image", form.imageFile);
      }

      await createCar(formData);
      navigate("/my-cars");
    } catch (error) {
      console.error("Error creating car:", error);
      alert(
        "Kunde inte skapa bil: " +
          (error.response?.data?.message || error.message),
      );
    }
  };

  return (
    <div className="car-form-page">
      <div className="form-container">
        <h1>Lägg upp bil</h1>
        <p>Fyll i informationen om din bil nedan</p>

        <form onSubmit={handleSubmit} className="car-form">
          <div className="form-group">
            <label htmlFor="title">Titel</label>
            <input
              id="title"
              name="title"
              placeholder="Titel (ex: Volvo XC60 Momentum)"
              value={form.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="img-upload">
            <label htmlFor="image">Bild</label>
            <input
              id="image"
              name="image"
              type="file"
              accept="image/*"
              onChange={handleChange}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="brand">Märke</label>
              <input
                id="brand"
                name="brand"
                placeholder="Volvo, BMW..."
                value={form.brand}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="model">Modell</label>
              <input
                id="model"
                name="model"
                placeholder="XC60, A4..."
                value={form.model}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="year">Årsmodell</label>
              <input
                id="year"
                type="number"
                name="year"
                placeholder="2022"
                value={form.year}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="price">Pris (kr)</label>
              <input
                id="price"
                type="number"
                name="price"
                placeholder="250000"
                value={form.price}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="location">Plats</label>
            <input
              id="location"
              name="location"
              placeholder="Stockholm, Göteborg..."
              value={form.location}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="fuelType">Bränsletyp</label>
              <select
                id="fuelType"
                name="fuelType"
                value={form.fuelType}
                onChange={handleChange}
                required
              >
                <option value="">Välj bränsletyp</option>
                <option value="bensin">Bensin</option>
                <option value="diesel">Diesel</option>
                <option value="el">El</option>
                <option value="hybrid">Hybrid</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="gearbox">Växellåda</label>
              <select
                id="gearbox"
                name="gearbox"
                value={form.gearbox}
                onChange={handleChange}
                required
              >
                <option value="">Välj växellåda</option>
                <option value="manuell">Manuell</option>
                <option value="automat">Automat</option>
              </select>
            </div>
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="btn-cancel"
              onClick={() => navigate("/my-cars")}
            >
              Avbryt
            </button>
            <button type="submit" className="btn-submit">
              Spara bil
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CarFormPage;
