import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import UserProfile from "./UserProfilePage";
import Address from "./AddressPage";
import Favorite from "./FavoritePage";
import PaymentsPage from "./PaymentsPage";
import ReviewPage from "./ReviewPage";
import DashBoardNavigation from "./DashBoardNavigation";
import OrderPage from "./OrderPage";
import { useMediaQuery } from "@mui/material";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
const DashBoard = () => {
  const [openSideBar, setOpenSideBar] = useState(false);
  const isSmallScreen = useMediaQuery("(max-width:1080px)");

  return (
    <div
      className={`flex flex-col lg:flex-row ${isSmallScreen ? "gap-4" : "background-pepper"}`}
    >
      <div
        className={`${
          isSmallScreen ? "w-full" : "sticky lg:w-[20%]"
        } lg:h-[100vh]`}
      >
        <DashBoardNavigation
          open={openSideBar}
          handleClose={() => setOpenSideBar(false)}
        />
      </div>
      {isSmallScreen && (
        <button
          className="text-start ps-5"
          onClick={() => setOpenSideBar(!openSideBar)}
        >
          <NavigateNextIcon/>
        </button>
      )}
      <div
        className={`${
          isSmallScreen ? "w-full" : "lg:w-[80%]"
        } flex-grow`}
      >
        <Routes>
          <Route path="/" element={<UserProfile />} />
          <Route path="/orders" element={<OrderPage />} />
          <Route path="/reviews" element={<ReviewPage />} />
          <Route path="/address" element={<Address />} />
          <Route path="/favorites" element={<Favorite />} />
          <Route path="/payments" element={<PaymentsPage />} />
        </Routes>
      </div>
    </div>
  );
};

export default DashBoard;
