import { useState } from "react";

const CarFilter = ({ onChange }) => {
  const [filters, setFilters] = useState({
    brand: "",
    fuelType: "",
    gearbox: "",
    minPrice: "",
    maxPrice: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    const newFilters = {
      ...filters,
      [name]: value,
    };

    setFilters(newFilters);
    onChange(newFilters); // skicka upp filtren till CarsPage
  };

  return (
    <div className="car-filter">
      <input
        name="brand"
        placeholder="Märke (Volvo, BMW...)"
        value={filters.brand}
        onChange={handleChange}
      />

      <select name="fuelType" value={filters.fuelType} onChange={handleChange}>
        <option value="">Bränsle</option>
        <option value="bensin">Bensin</option>
        <option value="diesel">Diesel</option>
        <option value="el">El</option>
        <option value="hybrid">Hybrid</option>
      </select>

      <select name="gearbox" value={filters.gearbox} onChange={handleChange}>
        <option value="">Växellåda</option>
        <option value="manuell">Manuell</option>
        <option value="automat">Automat</option>
      </select>

      <input
        type="number"
        name="minPrice"
        placeholder="Min pris"
        value={filters.minPrice}
        onChange={handleChange}
      />

      <input
        type="number"
        name="maxPrice"
        placeholder="Max pris"
        value={filters.maxPrice}
        onChange={handleChange}
      />
    </div>
  );
};

export default CarFilter;
