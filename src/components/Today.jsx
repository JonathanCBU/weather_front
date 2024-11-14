import React from "react";
import "./style/Today.css";
import day_img from "../assets/clear.png";
import { useEffect, useState } from "react";
import axios from "axios";

const Today = () => {
  const [weather, setWeather] = useState({});

  // const fetchApi = async () => {
  //   // const response = await axios.get("/weather/Brooklyn");

  //   // TODO: figure out what is cached that's not updating my proxy
  //   const response = await axios.get("http://127.0.0.1:8080/weather/Brooklyn");

  //   console.log(response.data);
  // };

  // useEffect(() => {
  //   fetchApi();
  // }, []);

  return (
    <div className="today">
      <div className="indicator">
        <img src={day_img} alt="" className="weather-icon" />
        <p className="description">Desc</p>
      </div>
      <div className="numericInfo">
        <div className="temp">
          <p className="farenheit">temp_f</p>
          <p className="celsius">temp_c</p>
        </div>
        <div className="air">
          <p>hume</p>
          <p>wind</p>
        </div>
      </div>
    </div>
  );
};

export default Today;
