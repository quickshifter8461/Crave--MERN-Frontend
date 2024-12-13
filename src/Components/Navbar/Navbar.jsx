import React, { useEffect, useState } from "react";
import Logo from "/Logo.png";
import {
  IconButton,
  Avatar,
  Badge,
  Button,
  AppBar,
  Toolbar,
  Box,
} from "@mui/material";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Auth/AuthContext";
import Cookies from "js-cookie";
import { axiosInstance } from "../../config/api";

const Navbar = ({ user = { initial: "" } }) => {
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const [cartItemCount, setCartItemCount] = useState(0);
  const navigate = useNavigate();

  // Function to fetch the cart and update item count
  const fetchCart = async () => {
    try {
      const data = await axiosInstance.get("/cart/get-cart");
      if (data.data.cart[0]) {
        setCartItemCount(data.data.cart[0].items.length);
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  useEffect(() => {
    const authToken = localStorage.getItem("loggedIn")
    console.log("Auth token:", authToken);
    if (authToken) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
    // Initial cart fetch on load
    fetchCart();
  }, [setIsLoggedIn]);

  return (
    <AppBar
      position="sticky"
      color="default"
      elevation={2}
      sx={{
        backgroundColor: "background.paper",
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        zIndex: 1300,
        borderRadius: "0",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          px: { xs: 2, lg: 10 },
        }}
      >
        {/* Logo */}
        <Box
          sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          <img src={Logo} alt="Crave Logo" width={90} />
        </Box>

        {/* Navigation Links / Buttons */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: { xs: 1, lg: 3 },
          }}
        >
          {isLoggedIn ? (
            <>
              {/* User Avatar */}
              <Avatar
                sx={{ bgcolor: "secondary.main", cursor: "pointer" }}
                onClick={() => navigate("/my-profile")}
              >
                {user.initial}
              </Avatar>

              {/* Cart Icon */}
              <IconButton
                color="secondary"
                aria-label="View cart"
                onClick={() => navigate("/cart")}
              >
                <Badge badgeContent={cartItemCount} color="error">
                  <ShoppingCartCheckoutIcon sx={{ fontSize: "2.5rem" }} />
                </Badge>
              </IconButton>
            </>
          ) : (
            <>
              <Button
                onClick={() => navigate("/account/login")}
                variant="contained"
                color="secondary"
              >
                Login
              </Button>
              <Button
                onClick={() => navigate("/account/register")}
                variant="outlined"
                color="secondary"
              >
                Signup
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
