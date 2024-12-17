import React from "react";
import Navbar from "../Components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "../Components/Home/Home";
import RestaurantDetails from "../Components/Restaurant/RestaurantDetails";
import Cart from "../Components/Cart/Cart";
import DashBoard from "../Components/Profile/DashBoard";
import Error from "../Components/Error/Error";
import Auth from "../Components/Auth/Auth";
import CheckOutPage from "../Components/Order/CheckOutPage";
import Edit from "../Components/Profile/Edit";
import CarouselDetailsPage from "../Components/Carousel/CarouselDetailsPage";


const UserRoute = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        {/* Home Route */}
        <Route path="/" element={<Home />} />

        <Route path="/carousel/details" element={<CarouselDetailsPage/>}/>
        {/* Account Registration Route */}
        <Route path="/account/:register" element={<Home />} />

        {/* Restaurant Details Route */}
        <Route path="/restaurant/:id" element={<RestaurantDetails />} />

        {/* Cart Route */}
        <Route path="/cart" element={<Cart />} />

        {/* {Order Rote} */}
        <Route path="/order" element={<CheckOutPage />} />
        {/* User Profile and Dashboard Routes */}
        <Route path="/my-profile/*" element={<DashBoard />} />

        <Route path="/edit/profile" element={<Edit/>}/>

        <Route path="/add/newAddress" element={<Edit/>}/>
        {/* Fallback for Undefined Routes */}
        <Route path="*" element={<Error />} />
      </Routes>
      <Auth />
    </div>
  );
};

export default UserRoute;
