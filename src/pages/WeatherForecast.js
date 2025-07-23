import React, { useEffect, useState } from 'react';
import { Container, Card, Row, Col, Spinner, Alert } from 'react-bootstrap';

const WeatherForecast = () => {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [error, setError] = useState('');

  const API_KEY = '60324270c5d4432baa750251252307';

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;

          fetch(
            `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${lat},${lon}&days=7&aqi=yes&alerts=yes`
          )
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
              } else {
                setError('Weather data not available.');
              }
            })
            .catch((err) => {
              console.error(err);
              setError('Failed to fetch weather information.');
            });
        },
        () => setError('Location access denied.')
      );
    } else {
      setError('Geolocation not supported.');
    }
  }, []);

  return (
    <Container className="my-5" style={{background:"#F4FFF4", borderRadius:"18px"}}>
      <h2 className="text-center mb-4">🌦️ Weather Forecast</h2>

      {error && <Alert variant="danger">{error}</Alert>}
      {!weather && !error && <Spinner animation="border" />}

      {weather && (
        <Card className="mb-4 shadow p-4 border-0" style={{background:"#ffeeeee6"}}>
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

      {forecast.length > 0 && (
        <Card className="mb-4 shadow p-4 border-0" style={{background:"#ffeeeee6"}}>
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
