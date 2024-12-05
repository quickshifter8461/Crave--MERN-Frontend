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

const MenuCard = () => {
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
            image="https://cdn.pixabay.com/photo/2020/10/05/19/55/hamburger-5630646_1280.jpg"
            alt="Chicken Steak"
            sx={{
              width: 150,
              height: 150,
              borderRadius: 2,
              objectFit: "cover",
            }}
          />
          <Chip
            label="Bestseller"
            color="warning"
            size="small"
            sx={{
              position: "absolute",
              top: 5,
              left: 5,
              right: 5,
              opacity: 0.5,
              borderRadius: 1,
              fontWeight: "bold",
            }}
          />
          <Button
            color="error"
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
            disabled={false}
          >
           {true?"ADD":"OUT OF STOCK"}
          </Button>
        </Box>
      </Box>

      <Box sx={{ flex: "1", pl: "60px" }}>
        <Box display="flex" alignItems="center" mb={1}>
          <Typography variant="h6" fontWeight="bold">
            Chicken Steak With BBQ Sauce
          </Typography>
        </Box>
        <Rating
          name="read-only"
          value={4.5}
          precision={0.5}
          readOnly
          sx={{ fontSize: "1.2rem" }}
        />
        <Typography variant="body2" color="text.secondary" mb={1}>
          2 Pcs Chicken + 3 Strips
        </Typography>
        <Typography variant="subtitle1" fontWeight="bold" color="text.primary">
          ₹340
        </Typography>
      </Box>
    </Card>
  );
};

export default MenuCard;
