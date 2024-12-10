import React from "react";
import "./App.css";
import { CssBaseline, ThemeProvider } from "@mui/material";

import { darkTheme } from "./Theme/DarkTheme";

import UserRoute from "./Routers/UserRoute";
import { AuthProvider } from "./Components/Auth/AuthContext";


const App = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <AuthProvider>
        <UserRoute />
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
