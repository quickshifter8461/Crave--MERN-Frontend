import React from "react";
import {
  Box,
  Card,
  CardMedia,
  Typography,
  IconButton,
  CardContent,
} from "@mui/material";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";

const CartItem = ({ item, onUpdateQuantity, onRemoveItem }) => {
  const { quantity } = item;
  const price = item.totalItemPrice;
  const singleItemPrice = item.foodId.price;
  const id = item.foodId._id;

  // Handler for incrementing quantity
  const handleIncrement = () => {
    onUpdateQuantity(id, "increment");
  };

  // Handler for decrementing quantity
  const handleDecrement = () => {
    onUpdateQuantity(id, "decrement");
  };

  // Handler for removing item completely
  const handleDelete = () => {
    onRemoveItem(id);
  };

  // Style objects for reusability
  const cardStyles = {
    display: "flex",
    flexDirection: { xs: "row", sm: "row" },
    alignItems: "center",
    background: "linear-gradient(145deg, #2B2B2B, #3C3C3C)",
    color: "#FFFFFF",
    borderRadius: "12px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
    overflow: "hidden",
    marginBottom: "1.5rem",
    padding: { xs: "1rem", sm: "1rem" },
  };

  const cardMediaStyles = {
    width: { xs: 150, sm: 200 },
    height: { xs: 200, sm: 200 },
    objectFit: "cover",
    borderRadius: "12px",
    margin: { xs: "0 1rem 0 0", sm: "1rem" },
  };

  const contentStyles = {
    flex: 1,
    padding: { xs: "0.5rem", sm: "1rem" },
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  };

  const typographyStyles = {
    itemTitle: {
      fontWeight: "bold",
      fontSize: { xs: "1rem", sm: "1.2rem" },
      marginBottom: "0.5rem",
      display: "inline-block",
    },
    priceText: {
      fontSize: { xs: "0.8rem", sm: "0.9rem" },
      color: "#A9A9A9",
      marginBottom: "1rem",
    },
    quantityText: {
      fontSize: "1rem",
      fontWeight: "bold",
      margin: "0 1rem",
    },
    totalPrice: {
      marginTop: "1rem",
      fontWeight: "bold",
      fontSize: { xs: "1rem", sm: "1.2rem" },
      textAlign: "right",
      color: "#FFFFFF",
    },
  };

  const iconButtonStyles = {
    color: "#FFFFFF",
    "&:hover": { color: "#E63946" },
  };

  return (
    <Card sx={cardStyles}>
      <CardMedia
        component="img"
        image={item.foodId.image}
        alt={item.foodId.name}
        sx={cardMediaStyles}
      />
      <CardContent sx={contentStyles}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="h6" sx={typographyStyles.itemTitle}>
            {item.foodId.name}
          </Typography>
          <IconButton onClick={handleDelete} sx={iconButtonStyles}>
            <DeleteIcon />
          </IconButton>
        </Box>
        <Typography variant="body2" sx={typographyStyles.priceText}>
          ₹{singleItemPrice}
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: { xs: "column", sm: "row" },
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              marginBottom: { xs: "1rem", sm: 0 },
            }}
          >
            <IconButton onClick={handleDecrement} sx={iconButtonStyles}>
              <RemoveCircleOutlineIcon />
            </IconButton>
            <Typography variant="body1" sx={typographyStyles.quantityText}>
              {quantity}
            </Typography>
            <IconButton onClick={handleIncrement} sx={iconButtonStyles}>
              <AddCircleOutlineIcon />
            </IconButton>
          </Box>
          <Typography variant="h6" sx={typographyStyles.totalPrice}>
            ₹{price}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CartItem;
