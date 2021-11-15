import React from "react";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";

const ScaleToggler = ({ selection, onChange, timeRange }) => {
  return (
    <ToggleButtonGroup
      value={selection} //{timeScale}
      onChange={onChange} //{handleToggle}
      aria-label="time range filter"
      exclusive
    >
      {Object.keys(timeRange).map((range, idx) => {
        return (
          <ToggleButton
            key={idx}
            value={range}
            aria-label={`last ${range}`}
            sx={{ width: 90 }}
            color="primary"
            disabled={selection === range}
          >
            {range}
          </ToggleButton>
        );
      })}
    </ToggleButtonGroup>
  );
};

export default ScaleToggler;
