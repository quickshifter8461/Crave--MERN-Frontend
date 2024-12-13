import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Chip,
  IconButton,
  Typography,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";

const RestaurantCard = ({ restaurantId, name, image, cuisines, isOpen }) => {
  const navigate = useNavigate();

  const [isBookmarked, setIsBookmarked] = useState(() => {
    const savedBookmarkStatus = localStorage.getItem(`bookmark-${restaurantId}`);
    return savedBookmarkStatus === "true";
  });

  const handleBookmarkClick = () => {
    const newBookmarkStatus = !isBookmarked;
    setIsBookmarked(newBookmarkStatus);
    localStorage.setItem(`bookmark-${restaurantId}`, newBookmarkStatus.toString());
  };

  const handleCardClick = () => {
    if (isOpen) {
      navigate(`/restaurant/${restaurantId}`);
    }
  };

  return (
    <Card
      sx={{
        maxWidth: 345,
        width: "100%",
        margin: "auto",
        cursor: isOpen ? "pointer" : "not-allowed",
        opacity: isOpen ? 1 : 0.7,
      }}
      onClick={handleCardClick}
    >
      <Box sx={{ position: "relative" }}>
      <CardMedia
          component="img"
          image={image}
          alt={name}
          sx={{
            filter: isOpen ? "none" : "grayscale(100%)",
            transition: "filter 0.3s",
            maxHeight:230,
            minHeight:230
          }}
        />
        <Chip
          label={isOpen ? "Open" : "Closed"}
          color={isOpen ? "success" : "error"}
          size="small"
          sx={{
            position: "absolute",
            top: 8,
            left: 8,
          }}
        />
      </Box>
      <CardContent
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: 2,
        }}
      >
        <Box sx={{ flexGrow: 1, pr: 1 }}>
          <Typography
            variant="h6"
            component="h3"
            noWrap
            sx={{ fontWeight: "bold" }}
          >
            {name}
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            noWrap
          >
            {cuisines}
          </Typography>
        </Box>
        <IconButton
          onClick={(e) => {
            e.stopPropagation(); // Prevent triggering the card click event
            handleBookmarkClick();
          }}
        >
          {isBookmarked ? <BookmarkAddedIcon /> : <BookmarkAddIcon />}
        </IconButton>
      </CardContent>
    </Card>
  );
};

export default RestaurantCard;
