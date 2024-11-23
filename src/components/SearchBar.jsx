import React from "react";
import Grid2 from "@mui/material/Grid2";
import TextField from "@mui/material/TextField";

const SearchBar = ({ query, setQuery, search }) => {
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      search(event);
    }
  };
  return (
    <Grid2
      container
      spacing={5}
      direction="row"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: "10vh" }}
    >
      <TextField
        id="search-bar"
        label="City name or zip code"
        name="query"
        value={query}
        onChange={(event) => setQuery(event.target.value)} // TODO: add suggestion after x characters
        onKeyDown={handleKeyPress}
      />
    </Grid2>
  );
};

export default SearchBar;
