import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import React from "react";
import { useState, useEffect } from "react";
import AirIcon from "@mui/icons-material/Air";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import DeviceThermostatIcon from "@mui/icons-material/DeviceThermostat";
import Grid2 from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";

const InfoWithIcon = ({ IconComponent, value, unit }) => {
  return (
    <Grid2 container spacing={1} style={{ textAlign: "center" }}>
      <IconComponent />
      <Typography variant="body1">
        {value}
        {unit}
      </Typography>
    </Grid2>
  );
};

const LocaleInfo = ({ name, state, country }) => {
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

  return (
    <Box>
      <Typography variant="h5">{getCurrentDate()}</Typography>
      <Typography variant="body1">
        {name}, {state ? <span>{state}, </span> : null}
        <span>{country}</span>
      </Typography>
    </Box>
  );
};

const Today = ({ weatherIn, locationIn, isMetricIn,  displayTemp, displayWind}) => {
  /*
  Inputs:
    weatherIn = {
      icon: str (path to weather indicator file)
      description: str
      temp_c: float
      humidity_pct: float
      wind_kph: float
    }
    locationIn = {
      name: str
      state: str
      country: str
    }
      isMetricIn: bool
  */
  const [location, setLocation] = useState(locationIn);
  const [weather, setWeather] = useState(weatherIn);

  const updateDisplayInfo = async () => {
    setLocation(locationIn);
    setWeather(weatherIn);
  };

  useEffect(() => {
    updateDisplayInfo();
  }, [weather, location]);

  return (
    <Grid2
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: "10vh" }}
    >
      <LocaleInfo
        name={location.name}
        state={location.state}
        country={location.country}
      />
      <img src={weather.icon}></img>
      <p>{weather.description}</p>
      <Stack direction="row" spacing={5}>
        {" "}
        <InfoWithIcon
          IconComponent={DeviceThermostatIcon}
          value={displayTemp(weather.temp_c)}
          unit={isMetricIn ? "°C" : "°F"}
        />
        <InfoWithIcon
          IconComponent={AirIcon}
          value={displayWind(weather.wind_mps)}
          unit={isMetricIn ? "kph" : "mph"}
        />
        <InfoWithIcon
          IconComponent={WaterDropIcon}
          value={weather.humidity_pct}
          unit={"%"}
        />
      </Stack>
    </Grid2>
  );
};

export default Today;
