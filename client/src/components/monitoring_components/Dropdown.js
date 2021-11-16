import React from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

const Dropdown = ({ value, onChange, options }) => {
  return (
    <TextField
      select
      label="Root query"
      value={value}
      onChange={onChange}
      fullWidth={true}
    >
      {options.map((item) => (
        <MenuItem key={item} value={item}>
          {item === "all" ? <em>All</em> : item}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default Dropdown;
