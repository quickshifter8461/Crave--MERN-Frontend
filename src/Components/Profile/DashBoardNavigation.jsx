import React from "react";
import StoreIcon from "@mui/icons-material/Store";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import HomeIcon from "@mui/icons-material/Home";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import LogoutIcon from "@mui/icons-material/Logout";
import RateReviewIcon from "@mui/icons-material/RateReview";
import { Divider, Drawer, useMediaQuery, Box, Typography } from "@mui/material";
import { useNavigate } from "react-router";
import { useAuth } from "../Auth/AuthContext";
import { axiosInstance } from "../../config/api";
import toast from "react-hot-toast";
import { useApp } from "../AppContext/AppContext";

const menu = [
  { title: "Orders", icon: <StoreIcon /> },
  { title: "Reviews", icon: <RateReviewIcon /> },
  { title: "Favorites", icon: <BookmarkAddedIcon /> },
  { title: "Address", icon: <HomeIcon /> },
  { title: "Payments", icon: <AccountBalanceIcon /> },
  { title: "Logout", icon: <LogoutIcon /> },
];

const DashBoardNavigation = ({ open, handleClose }) => {
  const smallScreen = useMediaQuery("(max-width:1080px)");
  const verySmallScreen = useMediaQuery("(max-width:600px)");
  const { setAppState } = useApp();
  const navigate = useNavigate();
  const { setIsLoggedIn } = useAuth();

  const handleNavigate = async (item) => {
    if (item.title === "Logout") {
      try {
        await axiosInstance.put("/auth/logout");
        toast.success("Logout was successful");
        console.log("Logged out");
        localStorage.removeItem("loggedIn");
        setAppState({})
        setIsLoggedIn(false);
        navigate("/account/login");
      } catch (error) {
        console.error("Logout failed:", error);
        alert("An error occurred while logging out.");
      }
    } else {
      navigate(`/my-profile/${item.title.toLowerCase()}`);
    }
  };

  return (
    <Drawer
      variant={smallScreen ? "temporary" : "permanent"}
      onClose={handleClose}
      open={smallScreen ? open : true}
      anchor="left"
      sx={{
        "& .MuiDrawer-paper": {
          width: smallScreen ? "40vw" : "20vw",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          borderRadius:0,
          zIndex: smallScreen ? 1200 : -1,
        },
      }}
    >
      <Box
        sx={{
          mt: smallScreen ? 10 : 12,
          mb: 10,
          px: 2,
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}
      >
        {menu.map((item, i) => (
          <React.Fragment key={i}>
            <Box
              onClick={() => handleNavigate(item)}
              sx={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
                gap: 2,
                p: 1,
                fontSize: verySmallScreen ? "0.8rem" : "1rem",
              }}
            >
              {item.icon}
              <Typography
                variant="body1"
                sx={{
                  fontSize: verySmallScreen ? "0.9rem" : "1rem",
                  fontWeight: 500,
                }}
              >
                {item.title}
              </Typography>
            </Box>
            {i !== menu.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </Box>
    </Drawer>
  );
};

export default DashBoardNavigation;
