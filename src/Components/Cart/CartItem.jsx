import React from "react";
import IconButton from "@mui/material/IconButton";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
const CartItem = () => {
  return (
    <div className="px-5">
      <div className="lg:flex items-center lg:space-x-5">
       <div>
       <img
          className="w-[5rem] h-[5rem] object-cover"
          src="https://cdn.pixabay.com/photo/2020/10/05/19/55/hamburger-5630646_1280.jpg"
          alt=""
        />
       </div>
      <div className="flex items-center justify-between lg:w-[70%]">
        <div className="space-y-1 lg:space-y-3 w-full">
          <p>Burger</p>
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-1">
              <IconButton>
                <RemoveCircleOutlineIcon />
              </IconButton>
              <div className="w-5 h-5 text-xs flex items-center justify-center">
                {5}
              </div>
              <IconButton>
                <AddCircleOutlineIcon />
              </IconButton>
            </div>
          </div>
        </div>
        <p>₹1985</p>
      </div>
      </div>
    </div>
  );
};

export default CartItem;
