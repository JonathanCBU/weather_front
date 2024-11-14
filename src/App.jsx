import React, { useRef } from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import SearchBar from "./components/SearchBar"

const App = () => {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({
    loading: true,
    data: {},
    error: false,
  });

  const search = async (event) => {
    event.preventDefault();
    if (
      event.type === "click" ||
      (event.type === "keypress" && event.key === "Enter")
    ) {
      setWeather({ ...weather, loading: true });
      const url = `http://127.0.0.1:8080/weather/${query}`;

      try {
        const response = await axios.get(url);
        console.log(response.data);
        setWeather({ data: response.data, loading: false, error: false });
      } catch (error) {
        setWeather({ ...weather, data: {}, loading: false, error: true });
        console.log("error", error);
      }
    }
  };

  return (
    <div className="app">
      <SearchBar query={query} setQuery={setQuery} search={search} />

      {weather.loading && (
        <>
          <br />
          <br />
          <h4>Searching...</h4>
        </>
      )}

      {weather.error && (
        <>
          <br />
          <br />
          <span className="error-message">
            <span>Sorry, no result found. Please Try again</span>
          </span>
        </>
      )}

      {weather && weather.data && weather.data.condition && (
        <p>Data is good!</p>
      )}
    </div>
  );
};
export default App;
