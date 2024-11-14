import React from "react";
import { useState, useEffect, useRef } from "react";
import "./style/Weather.css";
import axios from "axios";
import clear from "../assets/clear.png";
import cloud from "../assets/cloud.png";
import drizzle from "../assets/drizzle.png";
import rain from "../assets/rain.png";
import snow from "../assets/snow.png";
import wind from "../assets/wind.png";
import humidity from "../assets/humidity.png";

const Weather = () => {
  const inputRef = useRef();

  const [currentData, setCurrentData] = useState(false);
  const [forecastData, setForecastData] = useState(false);
  const [locationData, setLocationData] = useState(false);

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

  const Forecast = ({ props }) => {
    return (
      <div>
        <img src={icon_codes[props.icon]}></img>
        <p>{props.date}</p>
        <p>{props.high}</p>
        <p>{props.low}</p>
      </div>
    );
  };

  const fetchApi = async (location) => {
    try {
      console.log(location);
      const url = `http://127.0.0.1:8080/weather/${location}`;
      const response = await axios.get(url);
      console.log(response.data);
      setCurrentData(response.data.current);
      setForecastData(response.data.daily);
      setLocationData({
        name: response.data.name,
        state: response.data.state,
        country: response.data.country,
      });
      console.log(forecastData[0]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchApi("New York");
  }, []);

  return (
    <div className="weather">
      <div className="search">
        <input type="text" placeholder="city or zip" ref={inputRef} />
        <button onClick={() => fetchApi(inputRef.current.value)}>Search</button>
      </div>
      <div className="indicator">
        <img
          src={icon_codes[currentData.icon]}
          alt=""
          className="weather-icon"
        />
        <p>{locationData.name}</p>
        <p className="description">{currentData.description}</p>
      </div>
      <div className="numericInfo">
        <div className="temp">
          <p className="farenheit">{currentData.temp_f}°F</p>
          <p className="celsius">{currentData.temp_c}°C</p>
        </div>
        <div className="air">
          <p>{currentData.humidity}%</p>
          <p>{currentData.wind_speed}kph</p>
        </div>
      </div>
      <div className="forecast">
        {forecastData ? <Forecast props={forecastData[0]} /> : <p>no forcast yet</p>}
      </div>
    </div>
  );
};

export default Weather;
