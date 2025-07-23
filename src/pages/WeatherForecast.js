import React, { useEffect, useState } from 'react';
import { Container, Card, Row, Col, Spinner, Alert, Form, Button } from 'react-bootstrap';

const WeatherForecast = () => {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [error, setError] = useState('');
  const [city, setCity] = useState('');
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(false);

  const API_KEY = '60324270c5d4432baa750251252307';

  const fetchWeather = (query) => {
    setLoading(true);
    setError('');
    fetch(`https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${query}&days=7&aqi=yes&alerts=yes`)
      .then((res) => res.json())
      .then((data) => {
        if (data.location && data.current && data.forecast) {
          setWeather({
            city: data.location.name,
            region: data.location.region,
            country: data.location.country,
            temp: data.current.temp_c,
            condition: data.current.condition.text,
            icon: data.current.condition.icon,
            wind: data.current.wind_kph,
            humidity: data.current.humidity,
            uv: data.current.uv,
            feelslike: data.current.feelslike_c,
          });
          setForecast(data.forecast.forecastday);
          setAlerts(data.alerts?.alert || []);
        } else {
          setError('Weather data not available.');
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError('Failed to fetch weather information.');
        setLoading(false);
      });
  };

  const handleSearch = () => {
    if (!city.trim()) {
      setError('Please enter a city name.');
      return;
    }
    fetchWeather(city);
  };

  const handleReset = () => {
    setCity('');
    setError('');
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          fetchWeather(`${lat},${lon}`);
        },
        () => setError('Location access denied.')
      );
    } else {
      setError('Geolocation not supported.');
    }
  };

  useEffect(() => {
    handleReset(); // Fetch on first load
  }, []);

  return (
    <Container className="my-5" style={{ background: "#F4FFF4", borderRadius: "18px" }}>
      <h2 className="text-center mb-4">🌦️ Weather Forecast</h2>

      {/* Search Bar */}
      <Row className="mb-4">
        <Col md={6}>
          <Form.Control
            type="text"
            placeholder="Enter city name"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </Col>
        <Col md="auto">
          <Button variant="primary" onClick={handleSearch}>Search</Button>
        </Col>
        <Col md="auto">
          <Button variant="secondary" onClick={handleReset}>Reset to My Location</Button>
        </Col>
      </Row>

      {/* Alerts */}
      {alerts.length > 0 && (
        <Alert variant="warning">
          <h5>⚠️ Severe Weather Alerts:</h5>
          <ul>
            {alerts.map((alert, idx) => (
              <li key={idx}>
                <strong>{alert.headline}</strong> – {alert.desc}
              </li>
            ))}
          </ul>
        </Alert>
      )}

      {/* Errors and Spinner */}
      {error && <Alert variant="danger">{error}</Alert>}
      {loading && <Spinner animation="border" />}

      {/* Current Weather */}
      {weather && !loading && (
        <Card className="mb-4 shadow p-4 border-0" style={{ background: "#ffeeeee6" }}>
          <h4>📍 Current Weather in {weather.city}, {weather.region}, {weather.country}</h4>
          <Row className="align-items-center">
            <Col xs={4}>
              <img src={weather.icon} alt={weather.condition} />
            </Col>
            <Col xs={8}>
              <p><strong>🌡️ Temp:</strong> {weather.temp}°C (Feels like {weather.feelslike}°C)</p>
              <p><strong>☁️ Condition:</strong> {weather.condition}</p>
              <p><strong>💧 Humidity:</strong> {weather.humidity}%</p>
              <p><strong>🌬️ Wind:</strong> {weather.wind} km/h</p>
              <p><strong>🔆 UV Index:</strong> {weather.uv}</p>
            </Col>
          </Row>
        </Card>
      )}

      {/* Forecast */}
      {forecast.length > 0 && (
        <Card className="mb-4 shadow p-4 border-0" style={{ background: "#ffeeeee6" }}>
          <h4>📅 7-Day Forecast</h4>
          <Row>
            {forecast.map((day, index) => (
              <Col key={index} xs={12} md={6} lg={4} className="my-3">
                <Card className="h-100 text-center">
                  <Card.Body>
                    <Card.Title>{day.date}</Card.Title>
                    <img src={day.day.condition.icon} alt={day.day.condition.text} />
                    <p><strong>🌡️ Day:</strong> {day.day.maxtemp_c}°C</p>
                    <p><strong>🌙 Night:</strong> {day.day.mintemp_c}°C</p>
                    <p><strong>💧 Humidity:</strong> {day.day.avghumidity}%</p>
                    <p><strong>☁️ Condition:</strong> {day.day.condition.text}</p>
                    <p><strong>🌧️ Rain:</strong> {day.day.daily_chance_of_rain}%</p>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Card>
      )}
    </Container>
  );
};

export default WeatherForecast;
