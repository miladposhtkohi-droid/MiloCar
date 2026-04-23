import { Link } from "react-router-dom";

const CarCard = ({ car }) => {
  return (
    <article className="bg-white rounded-xl shadow-sm hover:shadow-xl border border-slate-100 overflow-hidden group transition-all duration-300 flex flex-col h-full transform hover:-translate-y-1">
      {/* Image container with fixed aspect ratio */}
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
        <img 
          src={car.image || "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=1000"} 
          alt={`${car.brand} ${car.model}`} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-slate-800 shadow-sm">
          {car.year}
        </div>
      </div>
      
      {/* Card Content */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1">{car.title || `${car.brand} ${car.model}`}</h3>
            <p className="text-sm text-slate-500">{car.brand} {car.model}</p>
          </div>
        </div>

        <p className="text-xl font-extrabold text-blue-600 mt-2 mb-4">
          {car.price ? car.price.toLocaleString() : "Pris ej angivet"} kr
        </p>

        {/* Feature badges */}
        <div className="grid grid-cols-2 gap-2 mt-auto mb-5 text-xs text-slate-600">
          <div className="flex items-center gap-1 bg-slate-50 px-2 py-1.5 rounded-md">
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3.5 h-3.5 text-slate-400">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
            </svg>
            <span className="truncate">{car.location || "Sverige"}</span>
          </div>
          <div className="flex items-center gap-1 bg-slate-50 px-2 py-1.5 rounded-md">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3.5 h-3.5 text-slate-400">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.315 48.315 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" />
            </svg>
            <span>{car.gearbox || "Manuell"}</span>
          </div>
          <div className="flex items-center gap-1 bg-slate-50 px-2 py-1.5 rounded-md col-span-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3.5 h-3.5 text-slate-400">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
            </svg>
            <span>{car.fuelType || "Bensin"}</span>
          </div>
        </div>

        {/* View Details Button */}
        <Link 
          to={`/cars/${car._id}`} 
          className="w-full text-center bg-slate-900 text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-blue-600 transition-colors"
        >
          Visa detaljer
        </Link>
      </div>
    </article>
  );
};

export default CarCard;
