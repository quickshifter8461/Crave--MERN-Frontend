import React from "react";
import { Box, Avatar, Typography, Button } from "@mui/material";

const UserProfile = () => {
  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: "30vh",
        backgroundImage: `url('https://cdn.pixabay.com/photo/2017/08/10/14/09/restaurant-2623071_960_720.jpg')`, 
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Avatar
          src="https://via.placeholder.com/100"
          alt="Profile Picture"
          sx={{
            width: 100,
            height: 100,
            border: "3px solid white",
          }}
        />
        <Typography variant="h6" color="white">
          Vishnu
        </Typography>
      </Box>
      <Box sx={{ marginTop: 2 }}>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#E63946",
            color: "white",
            textTransform: "none",
            fontWeight: "bold",
            ":hover": { backgroundColor: "#d32f2f" },
          }}
        >
          Edit Profile
        </Button>
      </Box>
    </Box>
  );
};

export default UserProfile;
