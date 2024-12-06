import React from "react";
import Navbar from "../Components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "../Components/Home/Home";
import RestaurantDetails from "../Components/Restaurant/RestaurantDetails";
import Cart from "../Components/Cart/Cart";
import Dashboad from "../Components/Profile/DashBoad";
import Error from "../Components/Error/Error";

const UserRoute = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        {/* Home Route */}
        <Route path="/" element={<Home />} />

        {/* Account Registration Route */}
        <Route path="/account/:register" element={<Home />} />

        {/* Restaurant Details Route */}
        <Route
          path="/restaurant/:city/:title/:id"
          element={<RestaurantDetails />}
        />

        {/* Cart Route */}
        <Route path="/cart" element={<Cart />} />

        {/* User Profile and Dashboard Routes */}
        <Route path="/my-profile/*" element={<Dashboad />} />

        {/* Fallback for Undefined Routes */}
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
};

export default UserRoute;
