import React, { useEffect, useState } from 'react';
import {
  Container,
  Card,
  Row,
  Col,
  Spinner,
  Alert,
  Form,
  Button,
  InputGroup,
  ListGroup,
} from 'react-bootstrap';

const WeatherForecast = () => {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [error, setError] = useState('');
  const [city, setCity] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [unit, setUnit] = useState('C'); // C for Celsius, F for Fahrenheit
  const [isLoading, setIsLoading] = useState(false);

  const API_KEY = '60324270c5d4432baa750251252307';

  // Function to fetch weather based on a query (city name or lat,lon)
  const fetchWeather = (query) => {
    setIsLoading(true);
    setError('');
    fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${query}&days=10&aqi=yes&alerts=yes`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.location && data.current && data.forecast) {
          setWeather({
            city: data.location.name,
            region: data.location.region,
            country: data.location.country,
            temp_c: data.current.temp_c,
            temp_f: data.current.temp_f,
            condition: data.current.condition.text,
            icon: data.current.condition.icon,
            wind: data.current.wind_kph,
            humidity: data.current.humidity,
            uv: data.current.uv,
            feelslike_c: data.current.feelslike_c,
            feelslike_f: data.current.feelslike_f,
            alerts: data.alerts?.alert || [],
          });
          setForecast(data.forecast.forecastday);
        } else {
          setError('Weather data not available.');
        }
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError('Failed to fetch weather information.');
        setIsLoading(false);
      });
  };

  // Initial load from geolocation
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const lat = pos.coords.latitude;
          const lon = pos.coords.longitude;
          fetchWeather(`${lat},${lon}`);
        },
        () => setError('Location access denied.')
      );
    } else {
      setError('Geolocation not supported.');
    }
  }, []);

  // Fetch city suggestions when typing
  useEffect(() => {
    if (city.trim().length < 3) {
      setSuggestions([]);
      return;
    }

    fetch(`https://api.weatherapi.com/v1/search.json?key=${API_KEY}&q=${city}`)
      .then((res) => res.json())
      .then((data) => setSuggestions(data))
      .catch((err) => console.error(err));
  }, [city]);

  // Convert temperature based on unit
  const formatTemp = (c, f) => (unit === 'C' ? `${c}°C` : `${f}°F`);

  return (
    <Container className="my-5" style={{ background: '#F4FFF4', borderRadius: '18px' }}>
      <h2 className="text-center mb-4">🌦️ Weather Forecast</h2>

      {/* Search + Reset Controls */}
      <Row className="mb-3">
        <Col md={8}>
          <InputGroup>
            <Form.Control
              type="text"
              placeholder="Enter city name"
              value={city}
              onChange={(e) => {
                setCity(e.target.value);
                setError('');
              }}
            />
            <Button
              variant="primary"
              onClick={() => {
                if (!city.trim()) {
                  setError('⚠️ Enter a city name');
                  return;
                }
                fetchWeather(city.trim());
                setCity('');
                setSuggestions([]);
              }}
              className="btn-hover"
            >
              🔍 Search
            </Button>
          </InputGroup>

          {/* Autocomplete dropdown */}
          {suggestions.length > 0 && (
            <ListGroup>
              {suggestions.map((sug) => (
                <ListGroup.Item
                  key={sug.id}
                  action
                  onClick={() => {
                    fetchWeather(sug.name);
                    setCity('');
                    setSuggestions([]);
                  }}
                >
                  {sug.name}, {sug.region}, {sug.country}
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>

        <Col md={4}>
          <Button
            variant="success"
            onClick={() => {
              navigator.geolocation.getCurrentPosition(
                (pos) => {
                  const lat = pos.coords.latitude;
                  const lon = pos.coords.longitude;
                  fetchWeather(`${lat},${lon}`);
                },
                () => setError('Location access denied.')
              );
            }}
            className="btn-hover"
          >
            📍 Reset to My Location
          </Button>
        </Col>
      </Row>

      {/* Temperature toggle */}
      <div className="text-center mb-3">
        <Button
          variant={unit === 'C' ? 'info' : 'outline-info'}
          className="me-2"
          onClick={() => setUnit('C')}
        >
          °C
        </Button>
        <Button
          variant={unit === 'F' ? 'info' : 'outline-info'}
          onClick={() => setUnit('F')}
        >
          F
        </Button>
      </div>

      {/* Error and loading spinner */}
      {error && <Alert variant="danger">{error}</Alert>}
      {isLoading && <Spinner animation="border" />}

      {/* Current Weather */}
      {weather && (
        <Card className="mb-4 shadow p-4 border-0" style={{ background: '#ffeeeee6' }}>
          <h4>
            📍 Weather in {weather.city}, {weather.region}, {weather.country}
          </h4>
          <Row className="align-items-center">
            <Col xs={4}>
              <img src={weather.icon} alt={weather.condition} />
            </Col>
            <Col xs={8}>
              <p><strong>🌡️ Temp:</strong> {formatTemp(weather.temp_c, weather.temp_f)} (Feels like {formatTemp(weather.feelslike_c, weather.feelslike_f)})</p>
              <p><strong>☁️ Condition:</strong> {weather.condition}</p>
              <p><strong>💧 Humidity:</strong> {weather.humidity}%</p>
              <p><strong>🌬️ Wind:</strong> {weather.wind} km/h</p>
              <p><strong>🔆 UV Index:</strong> {weather.uv}</p>
            </Col>
          </Row>

          {/* Alerts */}
          {weather.alerts.length > 0 && (
            <Alert variant="danger" className="mt-3">
              <strong>⚠️ Weather Alerts:</strong>
              <ul>
                {weather.alerts.map((alert, idx) => (
                  <li key={idx}>
                    <strong>{alert.headline}:</strong> {alert.desc}
                  </li>
                ))}
              </ul>
            </Alert>
          )}
        </Card>
      )}

      {/* 10-Day Forecast */}
      {forecast.length > 0 && (
        <Card className="mb-4 shadow p-4 border-0" style={{ background: '#ffeeeee6' }}>
          <h4>📅 10-Day Forecast</h4>
          <Row>
            {forecast.map((day, index) => (
              <Col key={index} xs={12} md={6} lg={4} className="my-3">
                <Card className="h-100 text-center">
                  <Card.Body>
                    <Card.Title>{day.date}</Card.Title>
                    <img src={day.day.condition.icon} alt={day.day.condition.text} />
                    <p><strong>🌡️ Day:</strong> {formatTemp(day.day.maxtemp_c, day.day.maxtemp_f)}</p>
                    <p><strong>🌙 Night:</strong> {formatTemp(day.day.mintemp_c, day.day.mintemp_f)}</p>
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
