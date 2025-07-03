import cloudsIcon from "../assets/icons/clouds.svg";
import clearIcon from "../assets/icons/clear.svg";
import mistIcon from "../assets/icons/mist.svg";
import moderateHeavyRainIcon from "../assets/icons/moderate_heavy_rain.svg";
import noResultIcon from "../assets/icons/no-result.svg";
import rainIcon from "../assets/icons/rain.svg";
import snowIcon from "../assets/icons/snow.svg";
import thunderRainIcon from "../assets/icons/thunder_rain.svg";
import thunderIcon from "../assets/icons/thunder.svg";
import { weatherCodes } from "../../constants";

const HourlyForecast = ({hourlyWeather}) => {
  const temperature = Math.round(hourlyWeather.temp_f);
  const time = hourlyWeather.time.split(" ")[1].substring(0,5);
  const weatherIcon = Object.keys(weatherCodes).find((icon) =>
    weatherCodes[icon].includes(hourlyWeather.condition.code)
  );
  
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
    <li className="weather-item">
      <p className="time">{time}</p>
      <img src={getWeatherIcon(weatherIcon)} alt="Weather icon" className="weather-icon" />
      <p className="temperature">{temperature}°</p>
    </li>
  );
};

export default HourlyForecast;
