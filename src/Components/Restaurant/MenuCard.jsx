import {
  Box,
  Button,
  Card,
  CardMedia,
  Chip,
  Rating,
  Typography,
} from "@mui/material";
import React from "react";

const MenuCard = ({
  image,
  title,
  description,
  rating,
  price,
  category,
  isAvailable,
}) => {
  return (
    <Card
      sx={{
        display: "flex",
        height: "250px",
        alignItems: "center",
        padding: 3,
        backgroundColor: "background.default",
        boxShadow: 1,
        borderRadius: 2,
        m: 2,
      }}
    >
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <Box sx={{ position: "relative", mb: 6 }}>
          <CardMedia
            component="img"
            image={image}
            alt={title}
            sx={{
              width: 150,
              height: 150,
              borderRadius: 2,
              objectFit: "cover",
            }}
          />
          
          <Button
            color={isAvailable ? "primary" : "error"}
            size="small"
            sx={{
              width: "150px",
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
              top: "160px",
              fontWeight: "bold",
            }}
            type="submit"
            variant="contained"
            disabled={!isAvailable}
          >
            {isAvailable ? "ADD" : "OUT OF STOCK"}
          </Button>
        </Box>
      </Box>

      <Box sx={{ flex: "1", pl: "60px" }}>
        <Box display="flex" alignItems="center" mb={1}>
          <Typography variant="h6" fontWeight="bold">
            {title}
          </Typography>
        </Box>
        <Rating
          name="read-only"
          value={rating}
          precision={0.5}
          readOnly
          sx={{ fontSize: "1.2rem" }}
        />
        <Typography variant="body2" color="text.secondary" mb={1}>
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
