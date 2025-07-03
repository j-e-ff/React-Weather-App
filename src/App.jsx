import { useState, useRef, useEffect } from "react";
import HourlyForecast from "./componentes/HourlyForecast";
import SearchSection from "./componentes/SearchSection";
import WeatherSection from "./componentes/WeatherSection";
import { weatherCodes } from "../constants";
import NoResultsDiv from "./componentes/NoResultsDiv";
// importing the WeatherAPI API key from the file
const API_KEY = import.meta.env.VITE_API_KEY;

const App = () => {
  // variables
  const [currentWeather, setCurrentWeather] = useState({});
  const [hourlyForecasts, setHourlyForecast] = useState([]);
  const [hasNoResult, setHasNoResult] = useState(false);
  const searchInputRef = useRef(null);

  // Fetching next 24 hours and filtering (grabbing 2 days for full 24hrs)
  const filterHourlyForecast = (hourlyData) => {
    const currentHour = new Date().setMinutes(0, 0, 0);
    const next24Hours = currentHour + 24 * 60 * 60 * 1000;

    // Filter the hourly data to only include the next 24 hours
    const next24HoursData = hourlyData.filter(({ time }) => {
      const forecastTime = new Date(time).getTime();
      return forecastTime >= currentHour && forecastTime <= next24Hours;
    });
    // Setting hourly forecast
    setHourlyForecast(next24HoursData);
  };

  // Method for fetching weather details, defined here because it needs direct access to the state variables managed in App.jsx
  const getWeatherDetails = async (API_URL) => {
    setHasNoResult(false);
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error();
      const data = await response.json();

      // getting detials from searched city
      const temperature = Math.round(data.current.temp_f);
      const description = data.current.condition.text;
      const weatherIcon = Object.keys(weatherCodes).find((icon) =>
        weatherCodes[icon].includes(data.current.condition.code)
      );

      // setting details
      setCurrentWeather({ temperature, description, weatherIcon });

      // Combine hourly data from both forecast days
      const combinedHourlyData = [
        ...data.forecast.forecastday[0].hour,
        ...data.forecast.forecastday[1].hour,
      ];
      searchInputRef.current.value = data.location.name;
      filterHourlyForecast(combinedHourlyData);
    } catch {
      setHasNoResult(true);
    }
  };

  // Fetch default city weather data on initial render
  useEffect(() => {
    const defaultCity = "Los Angeles";
    const API_URL = `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${defaultCity}&days=2`;
    getWeatherDetails(API_URL); // fetching weather details for user's current location
  }, []);

  return (
    <div className="container">
      {/* Search Section */}
      <SearchSection
        getWeatherDetails={getWeatherDetails}
        searchInputRef={searchInputRef}
      />

      {/* Weather section */}
      {hasNoResult ? (
        <NoResultsDiv />
      ) : (
        <div className="weather-section">
          <WeatherSection currentWeather={currentWeather} />
          {/* Hourly Forecast List */}
          <div className="hourly-forecast">
            <ul className="weather-list">
              {hourlyForecasts.map((hourlyWeather) => (
                <HourlyForecast
                  key={hourlyWeather.time_epoch}
                  hourlyWeather={hourlyWeather}
                />
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
