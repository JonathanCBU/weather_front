import axios from "axios";
import { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import Forecast from "./components/Forecast";

const App = () => {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({
    loading: true,
    data: {},
    error: false,
  });

  const search = async (event) => {
    event.preventDefault();
    setWeather({ ...weather, loading: true });
    const url = `http://127.0.0.1:8080/weather/${query}`;

    try {
      const response = await axios.get(url);
      setWeather({ data: response.data, loading: false, error: false });
    } catch (error) {
      setWeather({ ...weather, data: {}, loading: false, error: true });
    }
  };

  useEffect(() => {
    const defaultLoad = async () => {
      setWeather({ ...weather, loading: true });
      const url = `http://127.0.0.1:8080/weather/London`;

      try {
        const response = await axios.get(url);
        setWeather({ data: response.data, loading: false, error: false });
      } catch (error) {
        setWeather({ ...weather, data: {}, loading: false, error: true });
      }
    };

    const positionLoad = async (coordinates) => {
      setWeather({ ...weather, loading: true });
      const url = `http://127.0.0.1:8080/coordinates?lat=${coordinates.coords.latitude}&lon=${coordinates.coords.longitude}`;

      try {
        const response = await axios.get(url);
        setWeather({ data: response.data, loading: false, error: false });
      } catch (error) {
        setWeather({ ...weather, data: {}, loading: false, error: true });
      }
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          positionLoad(position);
        },
        () => {
          console.log("Could not get location");
        }
      );
    } else {
      defaultLoad();
    }
  }, []);

  return (
    <div className="app">
      <SearchBar query={query} setQuery={setQuery} search={search} />

      {weather.loading && (
        <>
          <br />
          <br />
        </>
      )}

      {weather.error && (
        <>
          <br />
          <br />
          <alert className="error-message">
            Sorry, no result found. Please Try again
          </alert>
        </>
      )}

      {weather && weather.data && <Forecast weather={weather} />}
    </div>
  );
};
export default App;
