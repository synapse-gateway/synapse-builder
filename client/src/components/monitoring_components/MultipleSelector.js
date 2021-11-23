import * as React from "react";
import { useTheme } from "@mui/material/styles";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function MultipleSelect({ options, setFilterValue, value }) {
  const theme = useTheme();
  const [selections, setSelections] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    console.log(value, "VALUE");
    setSelections(
      // On autofill we get a the stringified value.
      typeof value === "string" ? value.split(",") : value
    );
    setFilterValue(value);
  };

  return (
    <div>
      <FormControl fullWidth={true} sx={{ minHeight: 65 }}>
        <InputLabel id="demo-multiple-name-label">Root Queries</InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          multiple
          value={selections}
          onChange={handleChange}
          label="Root Queries"
        >
          {options.map((item) => (
            <MenuItem
              key={item}
              value={item}
              style={getStyles(item, selections, theme)}
            >
              {item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
