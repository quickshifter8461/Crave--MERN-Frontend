import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import UserProfile from "./UserProfilePage";

import Address from "./AddressPage";
import Favorite from "./FavoritePage";
import PaymentsPage from "./PaymentsPage";
import ReviewPage from "./ReviewPage";
import DashBoardNavigation from "./DashBoardNavigation";
import OrderPage from "./OrderPage";


const DashBoard = () => {
  const [openSideBar, setOpenSideBar] = useState(false);
  return (
    <div className="lg:flex justify-between">
      <div className="sticky h-[80vh] lg:w-[20%]">
        <DashBoardNavigation open={openSideBar} />
      </div>
      <div className="lg:w-[80%]">
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
