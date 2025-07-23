import React from 'react';
import './Hero.css';
import heroImage from '../assets/hero.jpg';

function Hero() {
  return (
    <div
      className="hero-section"
      style={{ backgroundImage: `url(${heroImage})` }}
    >
      <div className="hero-image-overlay"></div>
      <div className="hero-content">
        <div className="hero-box title">
          Empowering Farmers with <span style={{ color: '#2e7d32' }}>AI</span>
        </div>
        <div className="hero-box subtitle">
          Smart agriculture solutions tailored to your land, crop, and goals.
        </div>
        <div>
          <a href="#services" className="hero-box button">
            Explore Services
          </a>

        </div>
      </div>
    </div>
  );
}

export default Hero;
