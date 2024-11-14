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
    console.log("From Forecast");
    console.log(data);
    console.log("forecast");
    console.log(forecast);
    console.log("location");
    console.log(location);
    console.log("daily");
    console.log(forecast.daily[0]);
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
    setIsCelsius((prevState) => !prevState);
  };

  const convertToCelsius = (temperature) => {
    return Math.round((temperature - 32) * (5 / 9));
  };

  const convertToFahrenheit = (temperature) => {
    return Math.round((temperature * 9) / 5 + 32);
  };

  const renderTemperature = (temperature) => {
    if (isCelsius) {
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
                {location.name},<span>{location.state},</span>
                <span>{location.country}</span>
              </h2>
            </div>
            <div className="Date">
              <span>{console.log("GET DATE", forecast.current.dt)}</span>
            </div>
            <div className="Weather-today">
              <img src={icon_codes[forecast.current.weather[0].icon]}></img>
              <p>{forecast.current.weather[0].description}</p>
              <div className="Temp">
                {console.log(
                  "RENDER TEMP BASED ON UNITS",
                  forecast.current.temp
                )}
                <button onClick={console.log("TOGGLE TEMPS", isMetric)}>
                  {isMetric ? "°C" : "°F"}
                </button>
              </div>
              <div className="Air">
                <div className="air-col">
                  <img src={wind}></img>
                  <p>{forecast.current.wind_speed}kph</p>
                </div>
                <div className="air-col">
                  <img src={humidity}></img>
                  <p>{forecast.current.humidity}%</p>
                </div>
              </div>
            </div>
            <div className="Future">
              <h3>The Next 5 Days:</h3>
              <div className="forecast-container">
                {forecast.daily.slice(0, 5).map((day) => (
                  <div className="day" key={day.dt}>
                    <p>{day.dt}</p>
                    <img src={icon_codes[day.weather[0].icon]}></img>
                    <p>
                      H: {day.temp.max}°C L: {day.temp.min}°C
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Forecast;
