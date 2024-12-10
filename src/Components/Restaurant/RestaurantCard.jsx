import React, { useState, useEffect } from "react";
import { Card, Chip, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";

const RestaurantCard = ({ restaurantId, name, image, cuisines, isOpen }) => {
  const navigate = useNavigate();

  // Initialize the bookmark state from localStorage or default to false
  const [isBookmarked, setIsBookmarked] = useState(() => {
    const savedBookmarkStatus = localStorage.getItem(`bookmark-${restaurantId}`);
    return savedBookmarkStatus === 'true'; // Parse as boolean
  });

  // Handle the bookmark toggle
  const handleBookmarkClick = () => {
    const newBookmarkStatus = !isBookmarked;
    setIsBookmarked(newBookmarkStatus);

    // Save the bookmark status to localStorage
    localStorage.setItem(`bookmark-${restaurantId}`, newBookmarkStatus.toString());
  };

  const handleCardClick = () => {
    // Navigate to the restaurant details page with the restaurant ID
    navigate(`/restaurant/${restaurantId}`);
  };

  return (
    <Card className="w-[18rem]">
      <div
        onClick={handleCardClick}
        className={`${
          isOpen ? "cursor-pointer" : "cursor-not-allowed opacity-50 grayscale"
        } relative`}
      >
        <img
          className="w-full h-[10rem] rounded-t-md object-cover"
          src={image}
          alt={name}
        />
        <div className="absolute top-2 left-2">
          <Chip
            size="small"
            color={isOpen ? "success" : "error"} // Green for open, red for closed
            label={isOpen ? "Open" : "Closed"}
          />
        </div>
        <div className="p-4 textPart lg:flex w-full justify-between">
          <div className="space-y-1">
            <h3 className="font-semibold text-lg">{name}</h3>
            <p className="text-sm">{cuisines}</p>
          </div>
          <div>
            <IconButton onClick={handleBookmarkClick}>
              {isBookmarked ? <BookmarkAddedIcon /> : <BookmarkAddIcon />}
            </IconButton>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default RestaurantCard;
