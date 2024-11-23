import React from "react";
import { useState, useEffect } from "react";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";

const UnitSelection = ({ isMetric, setIsMetric }) => {
  const [current, setCurrent] = useState(isMetric ? "deg_c" : "deg_f");

  const handleChange = (event, newCurrent) => {
    setCurrent(newCurrent);
    setIsMetric(event.target.value);
  };

  useEffect(() => {
    setCurrent(isMetric ? "deg_c" : "deg_f");
  }, [isMetric]);
  return (
    <ToggleButtonGroup
      color="primary"
      value={current}
      exclusive
      onChange={handleChange}
    >
      <ToggleButton value="deg_c">°C</ToggleButton>
      <ToggleButton value="deg_f">°F</ToggleButton>
    </ToggleButtonGroup>
  );
};

export default UnitSelection;
