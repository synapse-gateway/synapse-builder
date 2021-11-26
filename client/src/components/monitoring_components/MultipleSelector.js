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

export default function MultipleSelect({ filterProps }) {
  //options, setFilterValue, labelName }) {
  const theme = useTheme();
  const [selections, setSelections] = React.useState([]);

  const handleChange = (event) => {
    let {
      target: { value },
    } = event;

    // On autofill we get a stringified value.
    value = typeof value === "string" ? value.split(",") : value;

    if (!selections.includes("all") && value.includes("all")) {
      value = ["all"];
    } else if (selections.includes("all") && value.length > 1) {
      value.splice(value.indexOf("all"), 1);
    }

    setSelections(value);
    filterProps.onClick(value);
  };

  return (
    <div>
      <FormControl fullWidth={true} sx={{ minHeight: 65 }}>
        <InputLabel id={`multiple-name-label-${filterProps.label}`}>
          {filterProps.label}
        </InputLabel>
        <Select
          labelId={`multiple-name-label-${filterProps.label}`}
          id={`multiple-name-${filterProps.label}`}
          multiple
          value={selections}
          onChange={handleChange}
          label={filterProps.label}
        >
          {filterProps.options.map((item) => (
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
