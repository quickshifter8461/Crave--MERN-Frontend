import React, { useEffect, useState } from "react";
// Ensure the correct path
import Branding from "/home-page-branding.png";
import "./Home.css";
import MultiItemCarousel from "../Carousel/MultiItemCarousel";
import { topFoods } from "./topFoods"; // Assuming this remains static
import CarouselItem from "./CarouselItem";
import RestaurantCard from "../Restaurant/RestaurantCard";
import CombinedSearchField from "../Searchbar/SearchBar";
import { axiosInstance } from "../../config/api";
import ShimmerCard from "../Shimmer/shimmer";
import { useNavigate } from "react-router-dom";

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

  // Fetch restaurants data
  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get("/restaurants/all-restaurants");
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
    navigate('/carousel/details', { state: { title: item.title } });
  };
   

  return (
    <div className="pb-10">
      {/* Banner Section */}
      <section className="banner relative flex flex-col justify-center items-center text-center">
        <div className="z-10 w-full max-w-3xl px-4 lg:w-[50vw]">
          <img src={Branding} alt="Branding" className="w-full mx-auto" />
          <p className="text-xl lg:text-4xl pb-10">
            Satisfy Your Cravings, Anytime.
          </p>
          <CombinedSearchField />
        </div>
        <div className="cover absolute inset-0"></div>
        <div className="fadeOut"></div>
      </section>

      {/* Carousel Section */}
      <section className="p-6 lg:py-10 lg:px-20">
        <h2 className="text-3xl font-semibold pb-8">Find your cravings</h2>
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
      </section>

      {/* Restaurants Section */}
      <section className="px-5 lg:px-20">
        <h2 className="text-2xl font-semibold py-3 pb-8">
          Restaurants Near You
        </h2>
        {loading ? (
          <ShimmerCard/>
        ) : error ? (
          <p className="text-red-500">Error: {error}</p>
        ) : restaurants.length === 0 ? (
          <p>No restaurants found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5 justify-items-center">
            {restaurants.map((restaurant) => (
              <RestaurantCard
              key={restaurant._id}
              restaurantId={restaurant._id}
              name={restaurant.name}
              image={restaurant.image}
              cuisines={restaurant.cuisine}
              isOpen={restaurant.status}
              rating={restaurant.rating} 
              isBookmarked={restaurant.isBookmarked}
            />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
