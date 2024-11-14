import React from "react";
import "./style/SearchBar.css"

const SearchBar = ({ query, setQuery, search }) => {
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      search(event);
    }
  };
  return (
    <div className="SearchBar">
      <input
        type="text"
        className="search-input"
        placeholder="city name or zip"
        name="query"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        onKeyDown={handleKeyPress}
      />
    </div>
  );
};

export default SearchBar;
