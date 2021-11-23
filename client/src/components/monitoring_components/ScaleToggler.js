import React from "react";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";

const ScaleToggler = ({ groupName, selection, onChange, options }) => {
  return (
    <ToggleButtonGroup
      value={selection}
      onChange={onChange}
      fullWidth={true}
      sx={{ minHeight: 65 }}
      exclusive
    >
      {options.map((option, idx) => {
        return (
          <ToggleButton
            key={idx}
            value={option}
            aria-label={groupName}
            fullWidth={true}
            color="primary"
            disabled={selection === option}
          >
            {option}
          </ToggleButton>
        );
      })}
    </ToggleButtonGroup>
  );
};

export default ScaleToggler;
