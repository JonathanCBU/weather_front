import React from "react";

const Search = () => {
  const handleSubmit = (event) => {
  };

  return (
    <div className="search">
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="city or zip" />
      </form>
    </div>
  );
};

export default Search;
