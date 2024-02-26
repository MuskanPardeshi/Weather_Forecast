import './WeatherInfo.css'; 
import React, { useState } from 'react';
import CatAnimation from './CatAnimation'; 

const API_KEY = 'f2cc2ed07b7c1f158cc9def1c9db33eb';

function WeatherInfo() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [containsRainOrCloud, setContainsRainOrCloud] = useState(false);

  const fetchWeatherData = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=Metric&appid=${API_KEY}`
      );
  
      if (!response.ok) {
        throw new Error(`Failed to fetch weather data. Status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log('Weather Data:', data);
      setWeatherData(data);
  
      const containsRainCloud = data.weather[0].description.toLowerCase().includes('rain') ||
                                data.weather[0].description.toLowerCase().includes('cloud');
      setContainsRainOrCloud(containsRainCloud);
  
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setWeatherData(null);
      setContainsRainOrCloud(false);
    }
  };

  return (
    <div className="WeatherInfo">
      <h1>Weather Forecast</h1>
      <div className="input-container">
        <input
          type="text"
          id="city"
          placeholder='Enter City'
          value={city}
           onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={fetchWeatherData}>Get Weather</button>
      </div>
      {weatherData && (
        <div>
          <h2>Weather in {weatherData.name}</h2>
          <p>Temperature: {weatherData.main.temp} °C</p>
          <p>Humidity: {weatherData.main.humidity}</p>
          <p>Weather: {weatherData.weather[0].description}</p>
          <CatAnimation containsRainOrCloud={containsRainOrCloud} />
        </div>
      )}
    </div>
  );
}

export default WeatherInfo;

