import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#72A1E5' // Vista Blue
    },
    secondary: {
      main: '#372772', // Deep Purple
    },
    error: {
        main: '#FFCAB1' // Apricot
    },
    warning: {
        main: '#ECDCB0' // Dutch white
    },
    info: {
        main: '#9883E5' // Tropical Indigo
    },
    success: {
        main: '#8CC084' // Pistachio
    },
  }
  // Add more theme customization options as needed
});

export default theme;
