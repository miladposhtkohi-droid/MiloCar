import { useState, useEffect } from "react";
import { createCar, updateCar, getCarById } from "../api/carApi";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./CarFormPage.css";

const CarFormPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useAuth();
  const isEditMode = !!id;

  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(isEditMode);

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
    imageFile: null,
  });

  // Hämta bil-data om det är edit-mode
  useEffect(() => {
    if (isEditMode) {
      const fetchCar = async () => {
        try {
          const response = await getCarById(id);
          const car = response.data;

          // Kontrollera behörigheter
          if (user.role !== "admin" && car.owner._id !== user.id) {
            alert("Du har inte behörighet att redigera denna annons");
            navigate("/my-cars");
            return;
          }

          setForm({
            title: car.title || "",
            brand: car.brand || "",
            model: car.model || "",
            year: car.year || "",
            price: car.price || "",
            mileage: car.mileage || "",
            location: car.location || "",
            fuelType: car.fuelType || "",
            gearbox: car.gearbox || "",
            description: car.description || "",
            image: car.image || "",
            imageFile: null,
          });
          setLoading(false);
        } catch (error) {
          console.error("Error fetching car:", error);
          alert("Kunde inte hämta bil-data");
          navigate("/my-cars");
        }
      };
      fetchCar();
    }
  }, [id, isEditMode, navigate, user]);

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
      } else {
        setForm({
          ...form,
          image: "",
          imageFile: null,
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

      if (isEditMode) {
        await updateCar(id, formData);
        alert("Annons uppdaterad!");
        navigate("/my-cars");
      } else {
        await createCar(formData);
        setShowSuccess(true);
        setTimeout(() => {
          navigate("/my-cars");
        }, 3000);
      }
    } catch (error) {
      console.error("Error saving car:", error);
      alert(
        `Kunde inte ${isEditMode ? "uppdatera" : "skapa"} bil: ` +
          (error.response?.data?.message || error.message),
      );
    }
  };

  if (showSuccess) {
    return (
      <div className="car-form-page">
        <div className="success-container">
          <div className="success-icon">✓</div>
          <h1>Annons inlämnad!</h1>
          <p>Din bil väntar nu på godkännande från admin.</p>
          <div className="success-info">
            <p>
              <strong>Din annons kommer att visas på sidan</strong> när den har
              godkänts av vår administratör. Du kan se statusen på sidan "Mina
              bilar".
            </p>
            <p>Du omdirigeras till "Mina bilar" på några sekunder...</p>
          </div>
          <button
            onClick={() => navigate("/my-cars")}
            className="btn-success-redirect"
          >
            Gå till Mina bilar
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="car-form-page">
        <div className="form-container">
          <div className="loading">Laddar bil-data...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="car-form-page">
      <div className="form-container">
        <h1>{isEditMode ? "Redigera annons" : "Lägg upp bil"}</h1>
        <p>
          {isEditMode
            ? "Uppdatera informationen om din bil"
            : "Fyll i informationen om din bil nedan"}
        </p>

        <form
          onSubmit={handleSubmit}
          className="car-form"
          encType="multipart/form-data"
        >
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
