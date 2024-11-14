import React, { useEffect, useState } from "react";
import "./style/Forecast.css";
import clear from "../assets/clear.png";
import cloud from "../assets/cloud.png";
import drizzle from "../assets/drizzle.png";
import rain from "../assets/rain.png";
import snow from "../assets/snow.png";
import wind from "../assets/wind.png";
import humidity from "../assets/humidity.png";

const Forecast = ({ weather }) => {
  const data = { weather };
  const [location, setLocation] = useState(weather.data.location);
  const [forecast, setForecast] = useState(weather.data.forecast);
  const [isMetric, setIsMetric] = useState(true);

  const icon_codes = {
    "01d": clear,
    "01n": clear,
    "02d": cloud,
    "02n": cloud,
    "03d": cloud,
    "03n": cloud,
    "50n": cloud,
    "50d": cloud,
    "04d": drizzle,
    "04n": drizzle,
    "09d": rain,
    "09n": rain,
    "10d": rain,
    "10n": rain,
    "13d": snow,
    "13n": snow,
  };

  const updateForecast = async () => {
    const url = `http://127.0.0.1:8080/weather/${data.name}`;
    setLocation(weather.data.location);
    setForecast(weather.data.forecast);
  };

  useEffect(() => {
    updateForecast();
  }, [data]);

  const formatDay = (dateString) => {
    const options = { weekday: "short" };
    const date = new Date(dateString * 1000);
    return date.toLocaleDateString("en-US", options);
  };

  const getCurrentDate = () => {
    const options = {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    };
    const currentDate = new Date().toLocaleDateString("en-US", options);
    return currentDate;
  };

  const toggleTemperatureUnit = () => {
    setIsMetric((prevState) => !prevState);
  };

  const convertToCelsius = (temperature) => {
    return Math.round((temperature - 32) * (5 / 9));
  };

  const convertToFahrenheit = (temperature) => {
    return Math.round((temperature * 9) / 5 + 32);
  };

  const renderTemperature = (temperature) => {
    if (isMetric) {
      return Math.round(temperature);
    } else {
      return convertToFahrenheit(temperature);
    }
  };

  return (
    <div>
      {forecast ? (
        <div className="Forecast">
          <div className="Today">
            <div className="Location">
              <h2>
                {location.name}, <span>{location.state}, </span>
                <span>{location.country}</span>
              </h2>
            </div>
            <div className="Date">
              <h3>{getCurrentDate()}</h3>
            </div>
            <div className="Weather-today">
              <img src={icon_codes[forecast.current.weather[0].icon]}></img>
              <p>{forecast.current.weather[0].description}</p>
              <div className="Temp">
                {renderTemperature(forecast.current.temp)}
                <button onClick={toggleTemperatureUnit}>
                  {isMetric ? "°C" : "°F"} | {isMetric ? "°F" : "°C"}
                </button>
              </div>
              <div className="Air">
                <div className="air-col">
                  <img src={wind}></img>
                  <p>Wind Speed: {forecast.current.wind_speed}kph</p>
                </div>
                <div className="air-col">
                  <img src={humidity}></img>
                  <p>Humidity: {forecast.current.humidity}%</p>
                </div>
              </div>
            </div>
            <div className="Future">
              <table className="forecast-container">
                <tr className="forecast-row">
                  {forecast.daily.slice(1, 6).map((day) => (
                    <td className="day" key={day.dt}>
                      <p>{formatDay(day.dt)}</p>
                      <img src={icon_codes[day.weather[0].icon]}></img>
                      <p>
                        H: {renderTemperature(day.temp.max)} L:{" "}
                        {renderTemperature(day.temp.min)}
                      </p>
                    </td>
                  ))}
                </tr>
              </table>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Forecast;
