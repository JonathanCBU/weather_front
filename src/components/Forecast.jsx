import Grid2 from "@mui/material/Grid2";
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

const Forecast = ({ days, displayTemp }) => {
  /*
  Inputs:
    days = [{
      icon: str (path to weather indicator file)
      temp_high_c: float
      temp_low_c: float
      date: int
    },]
      displayTemp: function
  */
  const [forecast, setForecast] = useState(days);

  const updateForecast = async () => {
    setForecast(days);
  };

  useEffect(() => {
    updateForecast();
  }, [days]);

  const formatDay = (dateString) => {
    const options = { weekday: "short", day: "numeric", month: "numeric" };
    const date = new Date(dateString * 1000);
    return date.toLocaleDateString("en-US", options);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Grid2
        container
        spacing={3}
        direction="row"
        alignItems="center"
        justifyContent="center"
        sx={{ minHeight: "40vh" }}
      >
        {forecast.map((day) => (
          <Card sx={{ width: "20%" }}>
            <CardMedia component="img" image={day.icon} />
            <CardContent>
              <Typography variant="h6">{formatDay(day.date)}</Typography>
              <Typography variant="h8">
                High: {displayTemp(day.temp_high_c)}, Low:{" "}
                {displayTemp(day.temp_low_c)}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Grid2>
    </Box>
  );
};

export default Forecast;
