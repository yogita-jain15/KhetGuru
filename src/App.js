import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavbarComponent from './components/NavbarComponent';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Contact from './components/Contact';
import Footer from './components/Footer';
import './App.css';

// Individual service pages
import FarmerProfile from './pages/FarmerProfile';
import WeatherForecast from './pages/WeatherForecast';
import PestDetection from './pages/PestDetection';
import DiagnosisRemedies from './pages/DiagnosisRemedies';
import TaskScheduler from './pages/TaskScheduler';
import MarketAlerts from './pages/MarketAlerts';

function App() {
  return (
    <Router>
      <NavbarComponent />

      <Routes>
        <Route path="/" element={
          <>
            <Hero />
            <div className="main-container">
              <section id="about">
                <About />
              </section>
              <section id="services">
                <Services />
              </section>
              <section id="contact">
                <Contact />
              </section>
            </div>
          </>
        } />

        {/* Service Detail Pages */}
        <Route path="/farmer-profile" element={<FarmerProfile />} />
        <Route path="/weather-forecast" element={<WeatherForecast />} />
        <Route path="/pest-detection" element={<PestDetection />} />
        <Route path="/diagnosis-remedies" element={<DiagnosisRemedies />} />
        <Route path="/task-scheduler" element={<TaskScheduler />} />
        <Route path="/market-alerts" element={<MarketAlerts />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
