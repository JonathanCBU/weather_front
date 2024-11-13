import React from "react";
import "./Weather.css";
import day_img from "../assets/day.svg";

const Weather = () => {
  return (
    <div className="weather">
      <div className="search">
        <input type="text" placeholder="city or zip" />
      </div>
      <img src={day_img} alt="" className="weather-icon" />
      <div className="temp">
        <p className="farenheit">32</p>
        <p className="celsius">0</p>
      </div>
    </div>
  );
};

export default Weather;
