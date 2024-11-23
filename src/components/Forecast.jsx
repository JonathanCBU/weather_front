import Grid2 from "@mui/material/Grid2";
import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  ...theme.applyStyles("dark", {
    backgroundColor: "#1A2027",
  }),
}));

const Forecast = ({ days }) => {
  /*
  Inputs:
    days = [{
      icon: str (path to weather indicator file)
      temp_high_c: float
      temp_low_c: float
      date: int
    },]
      isMetricIn: bool
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
          <Item>
            <Typography variant="h6">{formatDay(day.date)}</Typography>
            <img src={day.icon}></img>
            <Typography variant="h8">
              High: {day.temp_high_c}, Low: {day.temp_low_c}
            </Typography>
          </Item>
        ))}
      </Grid2>
    </Box>
  );
};

export default Forecast;
