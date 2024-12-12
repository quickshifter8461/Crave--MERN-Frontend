import React from "react";
import "./App.css";
import { CssBaseline, ThemeProvider } from "@mui/material";

import { darkTheme } from "./Theme/DarkTheme";

import UserRoute from "./Routers/UserRoute";
import { AuthProvider } from "./Components/Auth/AuthContext";
import { Toaster } from "react-hot-toast";


const App = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <AuthProvider>
        <UserRoute />
      </AuthProvider>
      <Toaster />
    </ThemeProvider>
  );
};

export default App;
