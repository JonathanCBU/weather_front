import React from "react";
import searchIcon from "../assets/search.png";

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
      <img src={searchIcon} onClick={search} />
    </div>
  );
};

export default SearchBar;
