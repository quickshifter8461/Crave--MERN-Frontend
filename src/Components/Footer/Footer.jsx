import React from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  IconButton,
  Link,
} from "@mui/material";
import { styled } from "@mui/system";
import {
  FaLeaf,
  FaRecycle,
  FaSeedling,
  FaTwitter,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

const StyledFooter = styled("footer")(({ theme }) => ({
  backgroundColor: "#1E1E1E",
  color: "#FFFFFF",
  padding: theme.spacing(6, 0),
  marginTop: "auto",
}));

const SocialIcon = styled(IconButton)(({ theme }) => ({
  margin: theme.spacing(0, 1),
  transition: "all 0.3s ease",
  color: "#FFFFFF", // Icon color
  "&:hover": {
    transform: "scale(1.1)",
    color: "#FFC107", // Accent color on hover
    backgroundColor: "rgba(255, 193, 7, 0.1)",
  },
}));

const FooterLink = styled(Link)(({ theme }) => ({
  color: "#FFC107", // Accent color for links
  textDecoration: "none",
  transition: "color 0.3s ease",
  "&:hover": {
    color: "#FFFFFF", // Highlighted text on hover
  },
}));

const Footer = () => {
  const initiatives = [
    {
      title: "Fast Delivery",
      icon: <FaLeaf />,
      description: "Delivering your favorites lightning fast!",
    },
    {
      title: "Sustainable Packaging",
      icon: <FaRecycle />,
      description: "Eco-friendly packaging for a greener tomorrow.",
    },
    {
      title: "Fresh Ingredients",
      icon: <FaSeedling />,
      description: "We prioritize quality and freshness.",
    },
  ];

  return (
    <StyledFooter $sx={{ mt: 5 }} role="contentinfo" aria-label="Site footer">
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              From Cart to Crave in Minutes.
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              We bring deliciousness to your doorstep while caring for the
              planet.
            </Typography>
            <Box sx={{ display: "flex", gap: 1 }}>
              <SocialIcon aria-label="Twitter" component="a" href="#">
                <FaTwitter />
              </SocialIcon>
              <SocialIcon aria-label="Facebook" component="a" href="#">
                <FaFacebookF />
              </SocialIcon>
              <SocialIcon aria-label="Instagram" component="a" href="#">
                <FaInstagram />
              </SocialIcon>
              <SocialIcon aria-label="LinkedIn" component="a" href="#">
                <FaLinkedinIn />
              </SocialIcon>
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Why Choose Us?
            </Typography>
            <Grid container spacing={2}>
              {initiatives.map((initiative) => (
                <Grid item xs={12} key={initiative.title}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Box sx={{ color: "#FFC107" }}>{initiative.icon}</Box>
                    <Box>
                      <Typography variant="subtitle2">
                        {initiative.title}
                      </Typography>
                      <Typography variant="body2">
                        {initiative.description}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Quick Links
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <FooterLink
                href="#"
                aria-label="Read about our sustainability practices"
              >
                About Us
              </FooterLink>
              <FooterLink href="#" aria-label="Learn about our partnerships">
                Blog
              </FooterLink>
              <FooterLink href="#" aria-label="View our certifications">
                FAQ
              </FooterLink>
              <FooterLink
                href="#"
                aria-label="Join our eco-friendly initiatives"
              >
                Contact Us
              </FooterLink>
            </Box>
          </Grid>
        </Grid>

        <Box
          sx={{
            mt: 4,
            pt: 2,
            borderTop: "1px solid #FFC107",
            textAlign: "center",
          }}
        >
          <Typography variant="body2">
            © {new Date().getFullYear()} CraveCart. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </StyledFooter>
  );
};

export default Footer;
