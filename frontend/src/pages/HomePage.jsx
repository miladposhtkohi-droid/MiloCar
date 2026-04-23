import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="home-page">
      <div className="hero-section">
        <h1>Välkommen till MiloCar</h1>
        <p>Upptäck, hyr eller sälj bilar enkelt och säkert</p>
        <div className="hero-buttons">
          <Link to="/cars" className="btn btn-primary">
            Se alla bilar
          </Link>
          <Link to="/register" className="btn btn-secondary">
            Bli medlem
          </Link>
        </div>
      </div>
      
      <div className="features-section">
        <div className="feature-card">
          <h3>Hyr bilar</h3>
          <p>Hitta din perfekta bil för alla tillfällen</p>
        </div>
        <div className="feature-card">
          <h3>Sälj bilar</h3>
          <p>Nå ut till köpare över hela Sverige</p>
        </div>
        <div className="feature-card">
          <h3>Sök bilar</h3>
          <p>Avancerad sökning och filtrering</p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
