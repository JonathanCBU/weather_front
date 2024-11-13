import React from "react";
import Today from "./components/Today";
import Search from "./components/Search";

const App = () => {
  return (
    <div className="app">
      <Search />
      <Today />
    </div>
  );
};

export default App;
