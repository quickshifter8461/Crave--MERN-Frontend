import { Box, Modal } from "@mui/material";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AddAddressForm from "./AddressForm";


const Edit = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const handleClose = () => {
    navigate("/order");
  };
  
  
  return (
    <>
      <Modal
        open={
          location.pathname === "/add/newAddress" 
        //   ||
        //   location.pathname === "/account/login" 
        }
        onClose={handleClose}
      >
        <Box >
          {location.pathname === "/add/newAddress"?<AddAddressForm/>:<LoginCard/>}
        </Box>
      </Modal>
    </>
  );
};

export default Edit;
