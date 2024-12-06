import React from "react";
import {
  Box,
  Container,
  Typography,
  Link,
  Grid,
  IconButton,
} from "@mui/material";
import { Facebook, Twitter, Instagram, LinkedIn } from "@mui/icons-material";
import Logo from "/home-page-branding.png";
const Footer = () => {
  return (
    <Box
      sx={{
        py: 1,
        px: 2,
        backgroundColor: "#1E1E1E", // Light background color
      }}
    >
      <Container maxWidth="xxl" className="text-center">
        <Grid
          container
          spacing={2}
          justifyContent="space-between"
          alignItems="center"
        >
          {/* Left Section: Logo & Copyright */}
          <Grid item xs={12} md={4}>
            <img src={Logo} alt="logo" />
          </Grid>

          {/* Center Section: Navigation Links */}
          <Grid item xs={12} md={4} sx={{ textAlign: "center" }}>
            <Typography variant="h5" align="center" color="secondary">
              Your food cravings, delivered with love.
            </Typography>
          </Grid>
          {/* Right Section: Social Media Icons */}
          <Grid item xs={12} md={4} sx={{ textAlign: "center" }}>
            <IconButton href="#" aria-label="Facebook" color="secondary">
              <Facebook />
            </IconButton>
            <IconButton href="#" aria-label="Twitter" color="secondary">
              <Twitter />
            </IconButton>
            <IconButton href="#" aria-label="Instagram" color="secondary">
              <Instagram />
            </IconButton>
            <IconButton href="#" aria-label="LinkedIn" color="secondary">
              <LinkedIn />
            </IconButton>
          </Grid>
        </Grid>
        <Typography variant="body2" color="textSecondary">
          © {new Date().getFullYear()} Crave. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
