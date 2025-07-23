import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Services.css';

import profileImg from '../assets/services/profile.jfif';
import weatherImg from '../assets/services/weather.jfif';
import pestImg from '../assets/services/pest.jpg';
import diagnosisImg from '../assets/services/diagnosis.jpg';
import schedulerImg from '../assets/services/scheduler.webp';
import marketImg from '../assets/services/market.jfif';

const services = [
  {
    title: "Farmer Profile & Land Details",
    description: "Maintain your personal profile and record land specifics for personalized guidance.",
    image: profileImg,
    link: "/farmer-profile"
  },
  {
    title: "Weather Forecasts & Tips",
    description: "Access hyperlocal weather updates and smart farming recommendations.",
    image: weatherImg,
    link: "/weather-forecast"
  },
  {
    title: "AI Pest & Disease Detection",
    description: "Detect crop issues early with AI-driven pest and disease diagnostics.",
    image: pestImg,
    link: "/pest-detection"
  },
  {
    title: "Problem Diagnosis & Remedies",
    description: "Get AI-based suggestions to solve crop and soil problems instantly.",
    image: diagnosisImg,
    link: "/diagnosis-remedies"
  },
  {
    title: "Task Scheduler & Reminders",
    description: "Never miss a step — schedule tasks and receive timely reminders.",
    image: schedulerImg,
    link: "/task-scheduler"
  },
  {
    title: "Market Price Alerts",
    description: "Stay updated with market trends and get alerts for best-selling opportunities.",
    image: marketImg,
    link: "/market-alerts"
  }
];

function Services() {
  return (
    <section id="services" className="services-section">
      <h2 className="section-title">Services</h2>
      <div className="services-grid">
        {services.map((service, idx) => (
          <Link to={service.link} key={idx} className="service-card-wrapper">
            <Card className="service-card dark-card">
              <Card.Img variant="top" src={service.image} className="service-image" />
              <Card.Body className="service-body">
                <Card.Title className="service-title">{service.title}</Card.Title>
                <Card.Text className="service-desc">{service.description}</Card.Text>
              </Card.Body>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default Services;
