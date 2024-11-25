import axios from "axios";
import React, { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import AlertDialog from "./components/AlertDialog";
import Container from "@mui/material/Container";
import Today from "./components/Today";
import Grid2 from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import UnitSelection from "./components/UnitSelection";

import clear from "./assets/clear.png";
import cloud from "./assets/cloud.png";
import drizzle from "./assets/drizzle.png";
import rain from "./assets/rain.png";
import snow from "./assets/snow.png";
import Forecast from "./components/Forecast";

const App = () => {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({
    loading: true,
    data: {},
    error: false,
  });
  const [isMetric, setIsMetric] = useState(true);

  const icon_codes = {
    "01d": clear,
    "01n": clear,
    "02d": cloud,
    "02n": cloud,
    "03d": cloud,
    "03n": cloud,
    "50n": cloud,
    "50d": cloud,
    "04d": drizzle,
    "04n": drizzle,
    "09d": rain,
    "09n": rain,
    "10d": rain,
    "10n": rain,
    "13d": snow,
    "13n": snow,
  };

  const dummyWeather = {
    icon: icon_codes["01d"],
    description: "this is a description",
    temp_c: 30.17,
    wind_kph: 2.14,
    humidity_pct: 57,
  };

  const dummyLocation = {
    name: "Essex",
    state: "MA",
    country: "US",
  };

  const dummyForecast = [
    {
      icon: icon_codes["01d"],
      temp_high_c: 45.01,
      temp_low_c: 12.32,
      date: 1732405366,
    },
    {
      icon: icon_codes["09d"],
      temp_high_c: 40.01,
      temp_low_c: 200.333,
      date: 1732491765,
    },
  ];

  const toggleIsMetric = (unit) => {
    if (unit === "deg_c" && !isMetric) {
      setIsMetric(true);
    } else if (unit === "deg_f" && isMetric) {
      setIsMetric(false);
    } else {
      setIsMetric(true);
    }
  };

  const renderTemperature = (temperature) => {
    if (isMetric) {
      return Math.round(temperature);
    } else {
      return Math.round((temperature * 9) / 5 + 32);
    }
  };

  const search = async (event) => {
    event.preventDefault();
    setWeather({ ...weather, loading: true });
    const url = `http://127.0.0.1:8080/weather?loc=${query}`;

    try {
      const response = await axios.get(url);
      setWeather({ data: response.data, loading: false, error: false });
    } catch (error) {
      setWeather({ ...weather, data: {}, loading: false, error: true });
    }
  };

  useEffect(() => {
    // const defaultLoad = async () => {
    //   setWeather({ ...weather, loading: true });
    //   const url = `http://127.0.0.1:8080/weather?loc=London`;
    //   try {
    //     const response = await axios.get(url);
    //     setWeather({ data: response.data, loading: false, error: false });
    //   } catch (error) {
    //     setWeather({ ...weather, data: {}, loading: false, error: true });
    //   }
    // };
    // const positionLoad = async (coordinates) => {
    //   setWeather({ ...weather, loading: true });
    //   const url = `http://127.0.0.1:8080/coordinates?lat=${coordinates.coords.latitude}&lon=${coordinates.coords.longitude}`;
    //   try {
    //     const response = await axios.get(url);
    //     setWeather({ data: response.data, loading: false, error: false });
    //   } catch (error) {
    //     setWeather({ ...weather, data: {}, loading: false, error: true });
    //   }
    // };
    // if (navigator.geolocation) {
    //   navigator.geolocation.getCurrentPosition(
    //     (position) => {
    //       positionLoad(position);
    //     },
    //     () => {
    //       setWeather({ ...weather, error: true });
    //     }
    //   );
    // } else {
    //   defaultLoad();
    // }
  }, []);

  return (
    <Container>
      <CssBaseline />
      <SearchBar query={query} setQuery={setQuery} search={search} />
      {/* {weather.loading && (
        <>
          <br />
          <br />
        </>
      )} */}

      {weather.error && <AlertDialog />}

      {weather && weather.data && (
        <Box>
          <UnitSelection isMetric={isMetric} setIsMetric={toggleIsMetric} />
          <Today
            weatherIn={dummyWeather}
            locationIn={dummyLocation}
            isMetricIn={isMetric}
            displayTemp={renderTemperature}
          />
          <Box sx={{ width: "100%" }}>
            <Grid2
              container
              spacing={3}
              direction="row"
              alignItems="center"
              justifyContent="center"
              sx={{ minHeight: "45vh" }}
            >
              {dummyForecast.map((day) => (
                <Forecast day={day} displayTemp={renderTemperature} />
              ))}
            </Grid2>
          </Box>
        </Box>
      )}
    </Container>
  );
};
export default App;

/*

Do data validation on the frontend

*/
