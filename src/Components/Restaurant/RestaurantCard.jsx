import React from "react";
import { Card, Chip, IconButton } from "@mui/material";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import { useNavigate } from "react-router-dom";
const RestaurantCard = () => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    // Navigate to the restaurant details page with the restaurant ID
    navigate(`/restaurant/${1}`);
  };
  return (
    <Card className="w-[18rem]">
      <div
      onClick={handleCardClick}
        className={`${
          true ? "cursor-pointer" : "cursor-not-allowed opacity-50 grayscale"
        } relative`}
      >
        <img
          className="w-full h-[10rem] rounded-t-md object-cover"
          src="https://b.zmtcdn.com/data/pictures/chains/4/95314/eeceb6b37200a6f510d9b1406f5ad220_o2_featured_v2.jpg?output-format=webp"
          alt=""
        />
        <div className="absolute top-2 left-2">
          <Chip
            size="small"
            color={true ? "success" : "error"} // Green for open, red for closed
            label={true ? "Open" : "Closed"}
          />
        </div>
        <div className="p-4 textPart lg:flex w-full justify-between">
          <div className="space-y-1">
            <h3 className="font-semibold text-lg">Chicking</h3>
            <p className="text-sm">Fast Food, Pizza, Burger</p>
          </div>
          <div>
            <IconButton>
              {true ? <BookmarkAddedIcon /> : <BookmarkAddIcon />}
            </IconButton>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default RestaurantCard;
