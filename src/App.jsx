import React, { useRef } from "react";
import Today from "./components/Today";
import Weather from "./components/Weather";
import axios from "axios";
import { useEffect, useState } from "react";

const Search = () => {
  const inputRef = useRef();

  const [currentData, setCurrentData] = useState(false);
  const [forecastData, setForecastData] = useState(false);

  const fetchApi = async (location) => {
    try {
      console.log(location);
      const url = `http://127.0.0.1:8080/weather/${location}`;
      const response = await axios.get(url);
      console.log(response.data);
      setCurrentData(response.data.current);
      setForecastData(response.data.forcast);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchApi("Boston");
  }, []);

  return (
    <div className="search">
      <form onSubmit={() => fetchApi(inputRef.current.value)}>
        <input type="text" placeholder="city or zip" ref={inputRef} />
      </form>
    </div>
  );
};

const App = () => {
  return (
    <div className="app">
      <Weather />
    </div>
  );
};

export default App;
