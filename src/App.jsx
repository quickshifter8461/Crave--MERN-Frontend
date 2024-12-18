import React from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";

import { darkTheme } from "./Theme/DarkTheme";

import UserRoute from "./Routers/UserRoute";
import { AuthProvider } from "./Components/Auth/AuthContext";
import { Toaster } from "react-hot-toast";
import { AppProvider } from "./Components/AppContext/AppContext";

const App = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <AuthProvider>
        <AppProvider>
          <UserRoute />
        </AppProvider>
      </AuthProvider>
      <Toaster />
    </ThemeProvider>
  );
};

export default App;
