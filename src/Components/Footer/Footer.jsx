import React from "react";
import {
  Box,
  Container,
  Typography,
  Link,
  Grid,
  IconButton,
} from "@mui/material";
import { Twitter, Instagram, LinkedIn } from "@mui/icons-material";
import GitHubIcon from '@mui/icons-material/GitHub';
import Logo from "/home-page-branding.png";
const Footer = () => {
  return (
    <Box
      sx={{
        py: 1,
        px: 2,
        backgroundColor: "#1E1E1E",
      }}
    >
      <Container maxWidth="xxl" className="text-center">
        <Grid
          container
          spacing={2}
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid item xs={12} md={4}>
            <img src={Logo} alt="logo" />
          </Grid>
          <Grid item xs={12} md={4} sx={{ textAlign: "center" }}>
            <Typography variant="h5" align="center" color="secondary">
              Your food cravings, delivered with love.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4} sx={{ textAlign: "center" }}>
            <IconButton href="https://github.com/quickshifter8461" target="_blank" aria-label="GitHub" color="secondary">
              <GitHubIcon/>
            </IconButton>
            <IconButton href="https://x.com/Vishnu_p_95" aria-label="Twitter" target="_blank" color="secondary">
              <Twitter />
            </IconButton>
            <IconButton href="https://www.instagram.com/quick__shifter/" aria-label="Instagram" target="_blank" color="secondary">
              <Instagram />
            </IconButton>
            <IconButton href="https://www.linkedin.com/in/vishnu-p-b18659290/" aria-label="LinkedIn" target="_blank" color="secondary">
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
