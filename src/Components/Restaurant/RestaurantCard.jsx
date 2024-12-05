import React from "react";
import { Card, Chip, IconButton } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
const RestaurantCard = () => {
  return (
    <Card className="w-[18rem]">
      <div
        className={`${true ? "cursor-pointer" : "cursor-not-allowed"} relative`}
      >
        <img className="w-full h-[10rem] rounded-t-md object-cover"
          src="https://b.zmtcdn.com/data/pictures/chains/4/95314/eeceb6b37200a6f510d9b1406f5ad220_o2_featured_v2.jpg?output-format=webp"
          alt=""
        />
        <Chip size="small" className="absolute top-2 left-2" color={true ? "success" : "error"} label={true ? "Open" : "Closed"}/>
      </div>
      <div className="p-4 textPart lg:flex w-full justify-between">
        <div className="space-y-1">
            <h3 className="font-semibold text-lg">Chicking</h3>
           <p className="text-sm">Fast Food, Pizza, Burger</p> 
        </div>
        <div>
            <IconButton >
              {true?<FavoriteIcon/>:<FavoriteBorderIcon/>}
            </IconButton>
        </div>
      </div>
    </Card>
  );
};

export default RestaurantCard;
