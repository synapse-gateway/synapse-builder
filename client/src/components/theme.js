import { red } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";
import "../index.css";

// A custom theme for this app
const theme = createTheme({
  palette: {
    primary: {
      main: "#0A0188",
    },
    secondary: {
      main: "#FFBD3A",
    },
    success: {
      main: "#0A0188",
    },
    error: {
      main: "#E4017D",
    },
  },
  typography: {
    fontFamily: ["Work Sans"],
  },
});

export default theme;
