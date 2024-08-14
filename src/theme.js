// theme.js
import { createTheme } from '@mui/material/styles';

// Define your custom colors
const theme = createTheme({
  palette: {
    primary: {
      main: '#4F518C', // Replace with your primary color
    },
    secondary: {
      main: '#22AA61', // Replace with your secondary color
    },
  },
  typography: {
    fontFamily: "'Roboto', sans-serif", // Set the default font family
    h5: {
      fontFamily: "'Antic', sans-serif", // Apply the Antic font to h6
    },
  },
});

export default theme;
