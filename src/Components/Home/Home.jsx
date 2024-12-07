import React from "react";
import Branding from "/home-page-branding.png";
import "./Home.css";
import MultiItemCarousel from "../Carousel/MultiItemCarousel";
import { topFoods } from "./topFoods";
import CarouselItem from "./CarouselItem";
import RestaurantCard from "../Restaurant/RestaurantCard";
import CombinedSearchField from "../Searchbar/SearchBar";

const Home = () => {
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

  const restaurants = [
    { id: 1, name: "Restaurant A", image: "/rest-a.jpg" },
    { id: 2, name: "Restaurant B", image: "/rest-b.jpg" },
    { id: 3, name: "Restaurant C", image: "/rest-c.jpg" },
    { id: 4, name: "Restaurant D", image: "/rest-d.jpg" },
    { id: 5, name: "Restaurant E", image: "/rest-e.jpg" },
    { id: 6, name: "Restaurant F", image: "/rest-f.jpg" },
  ];

  return (
    <div className="pb-10">
      {/* Banner Section */}
      <section className="banner relative flex flex-col justify-center items-center text-center">
        <div className="z-10 w-full max-w-3xl px-4 lg:w-[50vw]">
          <img src={Branding} alt="Branding" className="w-full mx-auto" />
          <p className="text-xl lg:text-4xl pb-10 ">
            Satisfy Your Cravings, Anytime.
          </p>
          <CombinedSearchField />
        </div>
        <div className="cover absolute inset-0"></div>
        <div className="fadeOut"></div>
      </section>

      {/* Carousel Section */}
      <section className="p-6 lg:py-10 lg:px-20">
        <h2 className="text-3xl font-semibold pb-8 ">Find your cravings</h2>
        <MultiItemCarousel
          data={topFoods}
          settings={sliderSettings}
          renderItem={(item) => (
            <CarouselItem
              key={item.title}
              image={item.image}
              title={item.title}
            />
          )}
        />
      </section>

      {/* Restaurants Section */}
      <section className="px-5 lg:px-20">
        <h2 className="text-2xl font-semibold py-3 pb-8">
          Restaurants Near You
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-5 justify-items-center">
          {restaurants.map((restaurant) => (
            <RestaurantCard
              key={restaurant.id}
              name={restaurant.name}
              image={restaurant.image}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
