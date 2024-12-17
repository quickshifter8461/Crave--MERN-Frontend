import { Box, Modal } from "@mui/material";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AddAddressForm from "./AddressForm";
import EditProfileForm from "./EditProfile";

const ROUTES = {
  ADD_ADDRESS: "/add/newAddress",
  EDIT_PROFILE: "/edit/profile",
};

const Edit = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleClose = () => {
    navigate(-1); 
  };

  const isAddAddress = location.pathname === ROUTES.ADD_ADDRESS;
  const isEditProfile = location.pathname === ROUTES.EDIT_PROFILE;
  return (
    <>
      <Modal
        open={
          location.pathname === "/add/newAddress" 
          ||
          location.pathname === "/edit/profile" 
        }
        onClose={handleClose}
      >
        <Box >
          {location.pathname === "/add/newAddress"?<AddAddressForm/>:<EditProfileForm/>}
        </Box>
      </Modal>
    </>
  );
};

export default Edit;
