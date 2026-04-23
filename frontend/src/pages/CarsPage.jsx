import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CarCard from "../components/Cars/CarCard";

const CarsPage = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulerad data - ersätt med riktigt API-anrop
    const mockCars = [
      {
        _id: "1",
        title: "Trygg Familjebil",
        brand: "Volvo",
        model: "XC60",
        year: 2022,
        price: 450000,
        image: "https://images.unsplash.com/photo-1590362891991-f776e747a588?auto=format&fit=crop&q=80&w=1000",
        location: "Stockholm",
        fuelType: "Bensin/El",
        gearbox: "Automat"
      },
      {
        _id: "2",
        title: "Klassisk Ädelsten",
        brand: "Saab",
        model: "9-3",
        year: 2011,
        price: 150000,
        image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=1000",
        location: "Göteborg",
        fuelType: "Bensin",
        gearbox: "Manuell"
      },
      {
        _id: "3",
        title: "Sportig Pendlarbil",
        brand: "Volkswagen",
        model: "Golf GTE",
        year: 2021,
        price: 320000,
        image: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fd?auto=format&fit=crop&q=80&w=1000",
        location: "Malmö",
        fuelType: "Hybrid",
        gearbox: "Automat"
      },
    ];

    setTimeout(() => {
      setCars(mockCars);
      setLoading(false);
    }, 600); // Simulate network delay
  }, []);

  return (
    <div className="container mx-auto px-4 md:px-6 py-12">
      <div className="mb-10 text-center md:text-left">
        <h1 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">Tillgängliga Bilar</h1>
        <p className="text-lg text-slate-600 max-w-2xl">Hitta din nästa bil bland vårt handplockade utbud av kvalitetssäkrade fordon över hela Sverige.</p>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {cars.map((car) => (
             <CarCard key={car._id} car={car} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CarsPage;
