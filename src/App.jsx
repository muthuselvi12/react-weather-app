import { useState } from "react";
import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const fetchWeather = async () => {
    const apiKey = "bafb9741175f3c6796dea28d9e4aa451";
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      const data = await response.json();

      if (data.cod === "404") {
        setError("City not found!");
        setWeather(null);
      } else {
        setWeather(data);
        setError("");
      }
    } catch (err) {
      setError("Error fetching weather data");
      setWeather(null);
    }
  };

  // Function to choose background based on condition
  function getBackground() {
    if (!weather) {
      return "default.jpg";
    }

    // Get the main condition (like "Clear", "Clouds", "Rain", "Snow")
    const condition = weather.weather[0].main.toLowerCase();

    // Check exact matches
    if (condition === "clear") {
      return "sunny.webp";
    } else if (condition === "clouds") {
      return "cloudy.jpg";
    } else if (condition === "rain") {
      return "rainny.jpg";
    } else if (condition === "snow") {
      return "snow.jpg";
    } else {
      return "default.jpg";
    }
  }

  return (
    <>
      <div
        className="app"
        style={{
          backgroundImage: `url(${getBackground()})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          minHeight: "100vh",
          color: "white",
        }}
      >
        <h1>🌤️ Weather App</h1>
        <div className="search">
          <input
            type="text"
            placeholder="Enter city name"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button onClick={fetchWeather}>Get Weather</button>
        </div>

        {error && <p className="error">{error}</p>}

        {weather && weather.main && (
          <div className="weather-card">
            <h2>{weather.name}</h2>
            <p>Temperature: {weather.main.temp} °C</p>
            <p>Condition: {weather.weather[0].description}</p>
            <p>Humidity: {weather.main.humidity}%</p>
            <p>Wind Speed: {weather.wind.speed} m/s</p>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
