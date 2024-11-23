import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";

const Forecast = ({ weather }) => {
  const data = { weather };
  const [forecast, setForecast] = useState(weather.data.forecast);
  const [isMetric, setIsMetric] = useState(true);



  const updateForecast = async () => {
    setLocation(weather.data.location);
    setForecast(weather.data.forecast);
  };

  useEffect(() => {
    updateForecast();
  }, [data]);

  const formatDay = (dateString) => {
    const options = { weekday: "short", day: "numeric", month: "numeric" };
    const date = new Date(dateString * 1000);
    return date.toLocaleDateString("en-US", options);
  };

  const toggleTemperatureUnit = () => {
    setIsMetric((prevState) => !prevState);
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
          <div className="Future">
            <div className="forecast-container">
              {forecast.daily.slice(1, 6).map((day) => (
                <div className="day" key={day.dt}>
                  <p>{formatDay(day.dt)}</p>
                  <img src={icon_codes[day.weather[0].icon]}></img>
                  <p>
                    H: {renderTemperature(day.temp.max)} L:{" "}
                    {renderTemperature(day.temp.min)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Forecast;
