import React from "react";
import "./style/Today.css";
import day_img from "../assets/day.svg";
import { useEffect, useState } from "react";
import axios from "axios";

const Today = () => {
  const [weather, setWeather] = useState({});

  const fetchApi = async () => {
    const response = await axios.get("http://127.0.0.1:8080/api");
    console.log(response.data.hello);
  };

  useEffect(() => {
    fetchApi();
  }, []);

  return (
    <div className="today">
      <div className="indicator">
        <img src={day_img} alt="" className="weather-icon" />
        <p className="description">Desc</p>
      </div>
      <div className="numericInfo">
        <div className="temp">
          <p className="farenheit">32</p>
          <p className="celsius">0</p>
        </div>
        <div className="humidity"></div>
        <div className="wind"></div>
      </div>
    </div>
  );
};

export default Today;
