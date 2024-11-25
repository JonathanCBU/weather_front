import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

const Forecast = ({ day, displayTemp }) => {
  /*
  Inputs:
    day = {
      icon: str (path to weather indicator file)
      temp_high_c: float
      temp_low_c: float
      date: int
    }
      displayTemp: function
  */
  const [forecast, setForecast] = useState(day);

  const updateForecast = async () => {
    setForecast(day);
  };

  useEffect(() => {
    updateForecast();
  }, [day]);

  const formatDay = (dateString) => {
    const options = { weekday: "short", day: "numeric", month: "numeric" };
    const date = new Date(dateString * 1000);
    return date.toLocaleDateString("en-US", options);
  };

  return (
          <Card sx={{ width: "20%" }}>
            <CardMedia component="img" image={forecast.icon} sx={{width: "50%", height: "20%"}}/>
            <CardContent>
              <Typography variant="h6">{formatDay(forecast.date)}</Typography>
              <Typography variant="h8">
                High: {displayTemp(forecast.temp_high_c)}, Low:{" "}
                {displayTemp(forecast.temp_low_c)}
              </Typography>
            </CardContent>
          </Card>
  );
};

export default Forecast;
