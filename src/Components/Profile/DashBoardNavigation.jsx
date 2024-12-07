import React from "react";
import StoreIcon from "@mui/icons-material/Store";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import HomeIcon from "@mui/icons-material/Home";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import LogoutIcon from "@mui/icons-material/Logout";
import RateReviewIcon from "@mui/icons-material/RateReview";
import { Divider, Drawer, useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router";
const menu = [
  { title: "Orders", icon: <StoreIcon /> },
  { title: "Reviews", icon: <RateReviewIcon /> },
  { title: "Favorites", icon: <BookmarkAddedIcon /> },
  { title: "Address", icon: <HomeIcon /> },
  { title: "Payments", icon: <AccountBalanceIcon /> },
  { title: "Logout", icon: <LogoutIcon /> },
];
const DashBoardNavigation = ({ open, handleClose }) => {
  const smallScreen = useMediaQuery("(max-width:1080px)");
  const navigate = useNavigate();
  const handleNavigate = (item) => {
    navigate(`/my-profile/${item.title.toLowerCase()}`);
  };
  return (
    <Drawer
      variant={smallScreen ? "temporary" : "permanent"}
      onClose={handleClose}
      open={smallScreen ? open : true}
      anchor="left"
      sx={{ zIndex: -1, position: "sticky" }}
    >
      <div className="w-[50vw] lg:w-[20vw] h-[100vh] flex flex-col justify-evenly mt-[110px] mb-10 text-xl gap-10 ">
        {menu.map((item, i) => (
          <React.Fragment key={i}>
            <div
              onClick={() => handleNavigate(item)}
              className="px-5 flex items-center space-x-5 cursor-pointer"
            >
              {item.icon}
              <span>{item.title}</span>
            </div>
            {i !== menu.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </div>
    </Drawer>
  );
};

export default DashBoardNavigation;
