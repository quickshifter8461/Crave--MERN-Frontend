import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  Button,
  Avatar,
  Divider,
  Rating,
} from "@mui/material";

const initialFavorites = [
  {
    id: 1,
    name: "Thali Time",
    location: "Sunderpur, Varanasi",
    rating: 4.5,
    image: "https://via.placeholder.com/100",
  },
  {
    id: 2,
    name: "Babbu's Galaxy Restaurant",
    location: "Chaoni, Nagpur",
    rating: 4.0,
    image: "https://via.placeholder.com/100",
  },
  {
    id: 3,
    name: "Traffic Jam Food Junction",
    location: "Cantt, Jabalpur",
    rating: 3.8,
    image: "https://via.placeholder.com/100",
  },
];
const Favorite = () => {
  const [favorites, setFavorites] = useState(initialFavorites);
  const handleRemoveFavorite = (id) => {
    const updatedFavorites = favorites.filter((fav) => fav.id !== id);
    setFavorites(updatedFavorites);
  };
  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h5" gutterBottom>
        Favorites
      </Typography>
      {favorites.length > 0 ? (
        <Grid container spacing={3}>
          {favorites.map((favorite) => (
            <Grid item xs={12} md={6} key={favorite.id}>
              <Card
                variant="outlined"
                sx={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CardContent sx={{ display: "flex", alignItems: "center" }}>
                  <Avatar
                    src={favorite.image}
                    alt={favorite.name}
                    sx={{ width: 70, height: 70, marginRight: 2 }}
                  />
                  <Box>
                    <Typography variant="h6">{favorite.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {favorite.location}
                    </Typography>
                    <Typography variant="body2" sx={{ marginTop: 1 }}>
                      <Rating
                        name="read-only"
                        value={favorite.rating}
                        precision={0.5}
                        readOnly
                      />
                    </Typography>
                  </Box>
                </CardContent>

                <Divider />
                <Box
                  sx={{
                    padding: 2,
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  <Button
                    variant="contained"
                    color="warning"
                    onClick={() => handleRemoveFavorite(favorite.id)}
                  >
                    Remove from Favorites
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="body1" color="text.secondary">
          No favorites added yet.
        </Typography>
      )}
    </Box>
  );
};

export default Favorite;
