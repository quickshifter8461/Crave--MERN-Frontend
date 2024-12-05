import { createTheme } from "@mui/material/styles";

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#E63946", // Crimson Red for primary buttons and highlights
    },
    secondary: {
      main: "#FFC107", // Amber Yellow for secondary actions
    },
    background: {
      default: "#121212", // Dark background
      paper: "#1E1E1E", // Slightly lighter for cards or modals
    },
    text: {
      primary: "#E1E1E1", // Off-white for primary text
      secondary: "#A9A9A9", // Gray for secondary text
    },
    error: {
      main: "#FF6F61", // Bright error color
    },
    success: {
      main: "#2A9D8F", // Emerald Green for success messages
    },
    info: {
      main: "#00A8E8", // Electric Blue for informational messages
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
    button: {
      textTransform: "none", // Avoids uppercase buttons
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8, // Rounded buttons
          padding: "8px 16px",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12, // Rounded corners for cards and dialogs
        },
      },
    },
  },
});
