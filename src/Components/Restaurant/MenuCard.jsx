import {
  Box,
  Button,
  Card,
  CardMedia,
  Rating,
  Typography,
} from "@mui/material";
import React from "react";
import { axiosInstance } from "../../config/api";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useApp } from "../AppContext/AppContext";
const MenuCard = ({
  id,
  image,
  title,
  description,
  rating,
  price,
  category,
  isAvailable,
  restaurantId,
}) => {
  const navigate = useNavigate();
  const { appState, setAppState } = useApp();
  const handleAddToCart = async () => {
    try {
      if(!localStorage.getItem("loggedIn")) {
        toast.error("Please login to add item");
        navigate("/account/login");
        return;
      }
      const response = await axiosInstance({
        url: "/cart/add",
        data: { foodId: id, restaurantId: restaurantId, quantity: 1 },
        method: "POST",
      });
      toast.success("Item added successfully");
      setAppState((prevAppState) => ({
       ...prevAppState,
        cart: response.data.cart,
      }));
    } catch (error) {
      if (error.response) {
        const errorMessage = error.response.data.message;
        if (
          errorMessage ===
          "Item from different restaurant is already added to cart"
        ) {
          toast.error(
            "Item from a different restaurant is already added to the cart"
          );
          navigate("/cart");
        } else {
          toast.error("Failed to add item to the cart");
        }
      } else {
        console.error(error);
        toast.error("An unexpected error occurred");
      }
    }
  };

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        height: { xs: "auto", sm: "250px" }, 
        alignItems: "center",
        padding: 2,
        backgroundColor: "background.default",
        boxShadow: 1,
        borderRadius: 2,
        m: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: { xs: "100%", sm: "auto" },
        }}
      >
        <Box sx={{ position: "relative", mb: { xs: 2, sm: 6 } }}>
          <CardMedia
            component="img"
            image={image}
            alt={title}
            sx={{
              width: { xs: "100%", sm: 150 },
              height: { xs: "auto", sm: 150 },
              borderRadius: 2,
              objectFit: "cover",
            }}
          />

          <Button
            color={isAvailable ? "primary" : "error"}
            size="small"
            sx={{
              width: { xs: "100%", sm: "150px" },
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
              top: { xs: "unset", sm: "160px" },
              bottom: { xs: 0, sm: "unset" },
              fontWeight: "bold",
              
            }}
            onClick={handleAddToCart}
            type="submit"
            variant="contained"
            disabled={!isAvailable}
          >
            {isAvailable ? "ADD" : "OUT OF STOCK"}
          </Button>
        </Box>
      </Box>

      <Box
        sx={{
          flex: 1,
          pl: { xs: 0, sm: "60px" },
          textAlign: { xs: "center", sm: "left" },
        }}
      >
        <Box display="flex" alignItems="center" mb={1} justifyContent={{ xs: "center", sm: "flex-start" }}>
          <Typography variant="h6" fontWeight="bold">
            {title}
          </Typography>
        </Box>
        <Rating
          name="read-only"
          value={rating}
          precision={0.5}
          readOnly
          sx={{ fontSize: "1.2rem", justifyContent: { xs: "center", sm: "flex-start" } }}
        />
        <Typography
          variant="body2"
          color="text.secondary"
          mb={1}
          sx={{ display: { xs: "block" } }}
        >
          {description}
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={1}>
          {category}
        </Typography>
        <Typography variant="subtitle1" fontWeight="bold" color="text.primary">
          ₹{price}
        </Typography>
      </Box>
    </Card>
  );
};

export default MenuCard;