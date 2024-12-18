import React, { useState, useEffect } from "react";
import {
  Divider,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Rating,
  Typography,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import MenuCard from "./MenuCard";
import CombinedSearchField from "../Searchbar/SearchBar";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../../config/api";
import ShimmerCard from "../Shimmer/shimmer";

const categories = [
  { label: "ALL", value: "all" },
  { label: "Veg", value: "veg" },
  { label: "Non-Veg", value: "non-veg" },
];

const RestaurantDetails = () => {
  const { id } = useParams();
  const [foodType, setFoodType] = useState("all");
  const [menuItems, setMenuItems] = useState([]);
  const [filteredMenuItems, setFilteredMenuItems] = useState([]);
  const [restaurantData, setRestaurantData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleFilter = (e) => {
    const selectedFoodType = e.target.value;
    setFoodType(selectedFoodType);

    if (selectedFoodType === "all") {
      setFilteredMenuItems(menuItems);
    } else {
      setFilteredMenuItems(
        menuItems.filter((item) => item.category === selectedFoodType)
      );
    }
  };

  useEffect(() => {
    const fetchRestaurantDetails = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(`/restaurants/${id}`);
        const data = response.data;
        setRestaurantData(data);
        setMenuItems(data.menuItems);
        setFilteredMenuItems(data.menuItems);
      } catch (error) {
        setError(error.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurantDetails();
  }, [id]);

  return (
    <div className="px-5 lg:px-20">
      {loading ? (
        <ShimmerCard />
      ) : error ? (
        <p className="text-red-500">Error: {error}</p>
      ) : (
        <section className="py-5 px-5 ">
          <h3 className="py-2 text-sm text-gray-500 font-medium">
            {`Home / ${restaurantData.name} / Details`}
          </h3>
          <div className="flex flex-col lg:flex-row items-start gap-8 bg-background-paper shadow-md rounded-lg p-5">
            <div className="w-full lg:w-1/2">
              <img
                src={restaurantData.image}
                alt={restaurantData.name}
                className="w-full h-[50vh] object-cover rounded-lg"
              />
            </div>

            <div className="w-full lg:w-1/2">
              <h1 className="text-3xl font-bold mb-3">{restaurantData.name}</h1>
              <p className="text-gray-400 mb-5 leading-relaxed">
                {restaurantData.cuisine}
              </p>
              <Rating
                name="half-rating-read"
                defaultValue={restaurantData.rating}
                precision={0.5}
                readOnly
              />
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <LocationOnIcon className="text-red-500" fontSize="large" />
                  <span className="text-gray-400 text-lg">
                    {restaurantData.location}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <EventAvailableIcon
                    className="text-green-500"
                    fontSize="large"
                  />
                  <span className="text-gray-400 text-lg">
                    Mon-Sun 9AM - 3AM (Open Now)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <Divider />
      <section className="py-[2rem] lg:flex relative">
        <div className="space-y-10 lg:w-[20%] filter ">
          <div className="box space-y-5 lg:sticky top-28">
            <div>
              <Typography variant="h5" sx={{ paddingBottom: "1rem" }}>
                Food category
              </Typography>
              <FormControl className="py-10 space-y-5" component={"fieldset"}>
                <RadioGroup
                  onChange={handleFilter}
                  name="food_type"
                  value={foodType}
                >
                  {categories.map((item) => (
                    <FormControlLabel
                      key={item.label}
                      value={item.value}
                      control={<Radio />}
                      label={item.label}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </div>
            <Divider />
          </div>
        </div>
        <div className="space-y-5 lg:w-[80%] lg:pl-10">
          {filteredMenuItems.map((item) => (
            <MenuCard
              key={item._id}
              id={item._id}
              title={item.name}
              image={item.image}
              description={item.description}
              rating={item.rating}
              category={item.category}
              isAvailable={item.isAvailable}
              price={item.price}
              restaurantId={restaurantData._id}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default RestaurantDetails;
