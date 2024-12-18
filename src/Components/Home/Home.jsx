import React, { useEffect, useState } from "react";
import Branding from "/home-page-branding.png";
import "./Home.css";
import MultiItemCarousel from "../Carousel/MultiItemCarousel";
import { topFoods } from "./topFoods";
import CarouselItem from "./CarouselItem";
import RestaurantCard from "../Restaurant/RestaurantCard";
import { axiosInstance } from "../../config/api";
import { useNavigate } from "react-router-dom";
import {
  Box,
  CircularProgress,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import Footer from "../Footer/Footer";

const Home = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 540,
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 4 },
      },
      {
        breakpoint: 1080,
        settings: { slidesToShow: 4 },
      },
      {
        breakpoint: 1290,
        settings: { slidesToShow: 5 },
      },
    ],
  };
  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(
          "/restaurants/all-restaurants"
        );
        setRestaurants(response.data);
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  const handleClick = async (item) => {
    navigate("/carousel/details", { state: { title: item.title } });
  };

  return (
    <>
    <Box className="pb-10">
      <Box
        component="section"
        className="banner relative flex flex-col justify-center items-center text-center"
      >
        <Container
          maxWidth="md"
          sx={{
            position: "relative",
            zIndex: 10,
            textAlign: "center",
          }}
        >
          <Box
            component="img"
            src={Branding}
            alt="Branding"
            sx={{ width: "100%", mx: "auto" }}
          />
          <Typography
            variant="h4"
            className="lg:text-4xl"
            sx={{ pb: 4 }}
            gutterBottom
          >
            Satisfy Your Cravings, Anytime.
          </Typography>
        </Container>
        <Box
          className="cover"
          sx={{
            position: "absolute",
            inset: 0,
          }}
        />
        <Box className="fadeOut"></Box>
      </Box>
      <Box
        component="section"
        sx={{
          p: 6,
          py: { lg: 5 },
          px: { lg: 10 },
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: "600",
            pb: 4,
          }}
        >
          Find your cravings
        </Typography>
        <MultiItemCarousel
          data={topFoods}
          settings={sliderSettings}
          renderItem={(item) => (
            <CarouselItem
              key={item.title}
              image={item.image}
              title={item.title}
              onClick={() => handleClick(item)}
            />
          )}
        />
      </Box>
      <Box
        component="section"
        sx={{
          px: 5,
          py: 2,
          lg: { px: 10 },
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: 600,
            pb: 3,
          }}
        >
          Restaurants Near You
        </Typography>
        {loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "200px",
            }}
          >
            <CircularProgress />
          </Box>
        ) : error ? (
          <Typography variant="body1" color="error">
            Error: {error}
          </Typography>
        ) : restaurants.length === 0 ? (
          <Typography variant="body1">No restaurants found.</Typography>
        ) : (
          <Grid container spacing={2.5} justifyContent="center">
            {restaurants.map((restaurant) => (
              <Grid item xs={12} sm={6} lg={4} xl={3} key={restaurant._id}>
                <RestaurantCard
                  restaurantId={restaurant._id}
                  name={restaurant.name}
                  image={restaurant.image}
                  cuisines={restaurant.cuisine}
                  isOpen={restaurant.status}
                  rating={restaurant.rating}
                  isBookmarked={restaurant.isBookmarked}
                />
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Box>
    <Footer/>
    </>
  );
};

export default Home;
