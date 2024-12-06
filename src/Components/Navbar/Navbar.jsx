import React from "react";
import Logo from "/Logo.png";
import IconButton from "@mui/material/IconButton";

import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";

import { Avatar, Badge } from "@mui/material";

const Navbar = () => {
  return (
    <div className="px-5 sticky top-0 z-50 py-[0.8rem] bg-background-paper shadow-xl shadow-background lg:px-20 flex justify-between">
      <div className="flex items-center space-x-4">
        <div className="lg:mr-10 cursor-pointer flex items-center space-x-4">
          <img className="logo" src={Logo} alt="Crave Logo" width={90} />
        </div>
      </div>
      <div className="flex items-center space-x-2 lg:space-x-10">
        <div>
          <Avatar sx={{ bgcolor: "white" }}>V</Avatar>
        </div>
        <div>
          <IconButton>
            <Badge color="primary" badgeContent={3}>
              <ShoppingCartCheckoutIcon sx={{ fontSize: "2.5rem" }} />
            </Badge>
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
