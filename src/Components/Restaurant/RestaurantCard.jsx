import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Chip,
  IconButton,
  Typography,
  Box,
  Rating,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";

const RestaurantCard = ({
  restaurantId,
  name,
  image,
  cuisines,
  isOpen,
  dishName,
  rating,
}) => {
  const navigate = useNavigate();

  const [isBookmarked, setIsBookmarked] = useState(() => {
    const savedBookmarkStatus = localStorage.getItem(
      `bookmark-${restaurantId}`
    );
    return savedBookmarkStatus === "true";
  });

  // Common styles extracted into constants
  const cardStyles = {
    maxWidth: 500,
    width: "100%",
    margin: "auto",
    cursor: isOpen === "open" ? "pointer" : "not-allowed",
    opacity: isOpen === "open" ? 1 : 0.7,
  };

  const imageStyles = {
    filter: isOpen === "open" ? "none" : "grayscale(100%)",
    transition: "filter 0.3s",
    maxHeight: 230,
    minHeight: 230,
  };

  const chipStyles = {
    position: "absolute",
    top: 8,
    left: 8,
  };

  const contentStyles = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 2,
  };

  const handleBookmarkClick = (e) => {
    e.stopPropagation();
    const newBookmarkStatus = !isBookmarked;
    setIsBookmarked(newBookmarkStatus);
    localStorage.setItem(
      `bookmark-${restaurantId}`,
      newBookmarkStatus.toString()
    );
  };

  const handleCardClick = () => {
    if (isOpen === "open") {
      navigate(`/restaurant/${restaurantId}`);
    }
  };

  const isRestaurantOpen = isOpen === "open";

  return (
    <Card sx={cardStyles} onClick={handleCardClick}>
      <Box sx={{ position: "relative" }}>
        <CardMedia component="img" image={image} alt={name} sx={imageStyles} />
        <Chip
          label={isRestaurantOpen ? "Open" : "Closed"}
          color={isRestaurantOpen ? "success" : "error"}
          size="small"
          sx={chipStyles}
        />
      </Box>
      <CardContent sx={contentStyles}>
        <Box sx={{ flexGrow: 1, pr: 1 }}>
          <Typography
            variant="h6"
            component="h3"
            noWrap
            sx={{ fontWeight: "bold" }}
          >
            {name}
          </Typography>
          {dishName && <Typography variant="body">{dishName}</Typography>}
          <Typography variant="body2" color="textSecondary" noWrap>
            {cuisines}
          </Typography>
          <Rating
            name="half-rating-read"
            defaultValue={rating}
            precision={0.5}
            readOnly
          />
        </Box>
        <IconButton onClick={handleBookmarkClick}>
          {isBookmarked ? <BookmarkAddedIcon /> : <BookmarkAddIcon />}
        </IconButton>
      </CardContent>
    </Card>
  );
};

export default RestaurantCard;
