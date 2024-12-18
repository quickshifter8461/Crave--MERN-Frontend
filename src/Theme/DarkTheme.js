import { createTheme } from "@mui/material/styles";

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#E63946", 
    },
    secondary: {
      main: "#E5C881", 
    },
    background: {
      default: "#121212", 
      paper: "#1E1E1E", 
    },
    text: {
      primary: "#E1E1E1",
      secondary: "#A9A9A9", 
    },
    error: {
      main: "#FF6F61", 
    },
    success: {
      main: "#2A9D8F", 
    },
    info: {
      main: "#00A8E8", 
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
    button: {
      textTransform: "none", 
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: "8px 16px",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
  },
});
