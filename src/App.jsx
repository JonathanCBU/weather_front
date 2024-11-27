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
    ready: false,
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
      return Math.round(temperature * 100) / 100;
    } else {
      return Math.round(((temperature * 9) / 5 + 32) * 100) / 100;
    }
  };

  const renderWindSpeed = (speed) => {
    let kmh = Math.round(((speed * 3600) / 1000) * 100) / 100;
    if (isMetric) {
      return kmh;
    } else {
      return Math.round((kmh / 0.621) * 100) / 100;
    }
  };

  const search = async (event) => {
    event.preventDefault();
    setWeather({ ...weather, ready: false });
    const url = `http://127.0.0.1:5000/bylocale`;

    try {
      const response = await axios.get(url);
      setWeather({ data: response.data, ready: true, error: false });
    } catch (error) {
      setWeather({ ...weather, data: {}, ready: false, error: true });
    }
    console.log(weather.data);
  };

  useEffect(() => {
    const positionLoad = async (coordinates) => {
      setWeather({ ...weather, ready: false });
      const url = "http://127.0.0.1:5000/bycoords";
      const data = JSON.stringify({
        lat: 123.456,
        lon: 10.1,
      });
      try {
        console.log("requesting data");
        const response = await axios.post(url, data, {
          headers: { "Content-Type": "application/json" },
        });
        setWeather({ data: response.data, ready: true, error: false });
      } catch (error) {
        setWeather({ ...weather, data: {}, ready: false, error: true });
        console.log("Caught error", error);
      }
    };
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log("Position found", position.coords);

          positionLoad(position.coords);
        },
        () => {
          setWeather({ ...weather, error: true });
        }
      );
    } else {
      setWeather({ ...weather, ready: false });
    }
    console.log("Initial weather", weather.data, weather.error, weather.ready);
  }, []);

  return (
    <Container>
      <CssBaseline />
      <Grid2
        container
        spacing={3}
        direction="row"
        alignItems="center"
        justifyContent="center"
      >
        <SearchBar query={query} setQuery={setQuery} search={search} />
        <UnitSelection isMetric={isMetric} setIsMetric={toggleIsMetric} />
      </Grid2>
      {!weather.ready && (
        <>
          <br />
          <br />
        </>
      )}

      {weather.error && <AlertDialog />}

      {weather.ready && (
        <Box>
          <Today
            dummyWeather={weather.data.today}
            weatherIn={weather.data.today}
            Icon={icon_codes[weather.data.today.icon_code]}
            locationIn={weather.data.locale}
            isMetricIn={isMetric}
            displayTemp={renderTemperature}
            displayWind={renderWindSpeed}
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
              {weather.data.forecast.map((day) => (
                <Forecast
                  day={day}
                  displayTemp={renderTemperature}
                  Icon={icon_codes[day.icon_code]}
                />
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
