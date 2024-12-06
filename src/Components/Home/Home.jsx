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
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 540, // For small screens (mobile)
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768, // For tablets
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 1080, // For small desktops
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 1290, // For large desktops
        settings: {
          slidesToShow: 5,
        },
      },
    ],
  };
  const restaurant = [1, 2, 3, 4, 5, 6];
  return (
    <div className="pb-10">
      
      <section className="banner relative flex flex-col justify-center items-center">
        <div className="w-[50vw] z-10 text-center items-center">
          <img src={Branding} alt="Brand name" width={1200} />
          <p className="z-10 text-xl lg:text-4xl pb-10">
            Satisfy Your Cravings, Anytime.
          </p>
          <CombinedSearchField />
        </div>

        <div className="cover absolute top-0 left-0 right-0"></div>
        <div className="fadeOut"></div>
      </section>
      <section className="p-10 lg:py-10 lg:px-20">
        <p className="text-2xl font-semibold py-3 pb-10">Find your cravings</p>
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
      <section className="px-5 lg:px-20 pt-10">
        <h1 className="text-2xl font-sans font-semibold py-3 pb-8">
          Restaurants Near You
        </h1>
        <div className="flex flex-wrap items-center justify-around gap-5">
          {restaurant.map((item) => (
            <RestaurantCard key={item}/>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
