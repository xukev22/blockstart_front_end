import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#FFFFFA", // White
    },
    secondary: {
      main: "#448BF6", // Powder blue
      light:"#5697F9",
      dark: "#1C7BF6"
    },
    error: {
      main: "#FF686B", // Light red
    },
    warning: {
      main: "#ECDCB0", // Dutch white
    },
    info: {
      main: "#656CFA", // Tropical Indigo
    },
    success: {
      main: "#8CC084", // Pistachio
    },

  },
  // Add more theme customization options as needed
  
  
});

export default theme;
