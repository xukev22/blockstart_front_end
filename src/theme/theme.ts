import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#FFFFFA", // White
    },
    secondary: {
      main: "#2F78E6", // Powder blue
    },
    error: {
      main: "#FF686B", // Light red
    },
    warning: {
      main: "#ECDCB0", // Dutch white
    },
    info: {
      main: "#00171F", // Tropical Indigo
    },
    success: {
      main: "#8CC084", // Pistachio
    },
  },
  // Add more theme customization options as needed
});

export default theme;
