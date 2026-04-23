import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-900 pt-24 pb-32 lg:pt-36 lg:pb-40">
        <div className="absolute inset-0 overflow-hidden">
          {/* Snygg gradient i bakgrunden */}
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-40 -left-40 w-96 h-96 bg-indigo-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        </div>
        
        <div className="relative container mx-auto px-4 md:px-6 text-center z-10 text-white">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
            Upplev friheten med <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">MiloCar</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 max-w-2xl mx-auto mb-10 font-light">
            Upptäck, hyr eller sälj bilar säkert och smidigt. Vi kopplar ihop bilägare med förare över hela Sverige.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/cars" className="w-full sm:w-auto px-8 py-4 text-lg font-semibold bg-blue-600 text-white rounded-full hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/25 transition-all transform hover:-translate-y-1">
              Utforska bilar
            </Link>
            <Link to="/register" className="w-full sm:w-auto px-8 py-4 text-lg font-semibold bg-white/10 text-white rounded-full backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all">
              Bli medlem idag
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">Varför välja MiloCar?</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Den ledande plattformen för biluthyrning och försäljning i Sverige med oslagbar trygghet.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 group">
              <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center mb-6 text-blue-600 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Hyr bilar direkt</h3>
              <p className="text-slate-600">
                Hitta din perfekta bil för alla tillfällen med våra filter och smarta sökfunktioner över hela landet.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 group">
              <div className="w-14 h-14 bg-indigo-50 rounded-xl flex items-center justify-center mb-6 text-indigo-600 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Sälj snabbt & säkert</h3>
              <p className="text-slate-600">
                Nå ut till tusentals köpare över hela Sverige med vår smarta plattform och säkra betalningslösningar.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 group">
              <div className="w-14 h-14 bg-sky-50 rounded-xl flex items-center justify-center mb-6 text-sky-600 group-hover:scale-110 group-hover:bg-sky-600 group-hover:text-white transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Smart Sökning</h3>
              <p className="text-slate-600">
                Avancerad filtrering via vår karta eller detaljerad vy för att garantera att du hittar exakt det du behöver.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
