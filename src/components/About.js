import React from 'react';
import './About.css';

function About() {
  return (
    <section id="about" className="about-section">
      <div className="about-container">
        <h2 className="about-title">About <span>KhetGuru</span></h2>
        <p className="about-description">
          KhetGuru is an <strong>AI-powered smart agriculture platform</strong> helping farmers make
          informed decisions based on location, soil type, crop preferences, and more. It empowers
          the farming community with intelligent tools, actionable insights, and a collaborative ecosystem.
        </p>
      </div>
    </section>
  );
}

export default About;
