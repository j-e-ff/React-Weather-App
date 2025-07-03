import cloudsIcon from "../assets/icons/clouds.svg";
import clearIcon from "../assets/icons/clear.svg";
import mistIcon from "../assets/icons/mist.svg";
import moderateHeavyRainIcon from "../assets/icons/moderate_heavy_rain.svg";
import noResultIcon from "../assets/icons/no-result.svg";
import rainIcon from "../assets/icons/rain.svg";
import snowIcon from "../assets/icons/snow.svg";
import thunderRainIcon from "../assets/icons/thunder_rain.svg";
import thunderIcon from "../assets/icons/thunder.svg";

const WeatherSection = ({ currentWeather }) => {
  // Function to get the appropriate weather icon
  const getWeatherIcon = (weatherIcon) => {
    switch (weatherIcon) {
      case "clear":
        return clearIcon;
      case "clouds":
        return cloudsIcon;
      case "rain":
        return rainIcon;
      case "snow":
        return snowIcon;
      case "thunder":
        return thunderIcon;
      case "thunder_rain":
        return thunderRainIcon;
      case "moderate_heavy_rain":
        return moderateHeavyRainIcon;
      case "mist":
        return mistIcon;
      default:
        return noResultIcon;
    }
  };

  return (
    <div className="current-weather">
      {currentWeather.weatherIcon && (
        <div className="weather-icon-container">
          <img
            src={getWeatherIcon(currentWeather.weatherIcon)}
            alt="Weather icon"
            className="weather-icon"
          />
        </div>
      )}
      <h2 className="temperature">
        {currentWeather.temperature}
        <span>°F</span>
      </h2>
      <p className="description">{currentWeather.description}</p>
    </div>
  );
};

export default WeatherSection;
