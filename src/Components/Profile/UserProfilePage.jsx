import React, { useEffect, useState } from "react";
import { Box, Avatar, Typography, Button, Card } from "@mui/material";
import { axiosInstance } from "../../config/api";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get("/auth/profile");
        setUser(response.data);
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading)
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "80vw",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );

  if (error)
    return (
      <div className="text-center py-10">
        <p className="text-red-500 pb-10">Something went wrong: {error}</p>
        <Button variant="contained" onClick={() => window.location.reload()}>
          Retry
        </Button>
      </div>
    );

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: "50vh",
        backgroundImage: `url('https://cdn.pixabay.com/photo/2017/08/10/14/09/restaurant-2623071_960_720.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
      }}
    >
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "#1E1E1E",
          gap: 2,
          padding: { xs: "30px", sm: "40px", md: "50px" },
          width: { xs: "90%", sm: "70%", md: "400px" },
          boxShadow: 3,
        }}
      >
        <Avatar
          src={user.profilePic}
          alt="Profile Picture"
          sx={{
            width: { xs: 80, sm: 100 },
            height: { xs: 80, sm: 100 },
            border: "3px solid white",
          }}
        />
        <Typography variant="h6" color="white" textAlign="center">
          {user.name}
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          gutterBottom
          textAlign="center"
        >
          <strong>Email:</strong> {user.email}
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          gutterBottom
          textAlign="center"
        >
          <strong>Phone:</strong> {user.phone}
        </Typography>
      </Card>
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
          onClick={() => navigate("/edit/profile", {
            state: { from: location.pathname },
          })}
        >
          Edit Profile
        </Button>
      </Box>
    </Box>
  );
};

export default UserProfile;
