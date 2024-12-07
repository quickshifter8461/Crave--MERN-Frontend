import { Box, Modal } from "@mui/material";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { style } from "../Cart/Cart";
import RegistrationForm from "./RegisterForm";
import LoginCard from "./LoginForm";

const Auth = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const handleClose = () => {
    navigate("/");
  };
  
  
  return (
    <>
      <Modal
        open={
          location.pathname === "/account/register" ||
          location.pathname === "/account/login"
        }
        onClose={handleClose}
      >
        <Box >
          {location.pathname === "/account/register"?<RegistrationForm/>:<LoginCard/>}
        </Box>
      </Modal>
    </>
  );
};

export default Auth;
