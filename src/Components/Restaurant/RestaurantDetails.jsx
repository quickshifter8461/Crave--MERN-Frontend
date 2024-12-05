import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import {
  Divider,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import MenuCard from "./MenuCard";
import CombinedSearchField from "../Searchbar/SearchBar";

const categories = ["Pizza", "Biriyani", "Burger", "Chicken"];
const foodTypes = [
  { label: "ALL", value: "all" },
  { label: "Veg", value: "veg" },
  { label: "Non-Veg", value: "non-veg" },
];
const menu = [1,1,2,3,4,5,5]

const RestaurantDetails = () => {
    const [foodType, setFoodType] = useState('all')

    const handleFilter = (e)=>{
        console.log(e.target.value, e.target.name)
    }
  return (
    <div className="px-5 lg:px-20">
        <CombinedSearchField/>
      <section>
        <h3 className="py-2 mt-10 text-text-secondary">
          Home/Indian/Chicking/details
        </h3>
        <div>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <img
                src="https://cdn.pixabay.com/photo/2016/11/18/14/05/brick-wall-1834784_1280.jpg"
                alt="Kfc"
                className="w-full h-[40vh] object-cover"
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <img
                src="https://cdn.pixabay.com/photo/2021/02/08/12/40/lasagna-5994612_960_720.jpg"
                alt="Kfc"
                className="w-full h-[40vh] object-fill"
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <img
                src="https://cdn.pixabay.com/photo/2016/08/06/13/40/kfc-1574389_960_720.jpg"
                alt="Kfc"
                className="w-full h-[40vh] object-fill"
              />
            </Grid>
          </Grid>
        </div>
        <div className="pt-3 pb-5">
          <h1 className="text-4xl font-semibold">Chicking</h1>
          <p className="text-gray-500 mt-1">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Impedit
            laudantium voluptatibus omnis placeat quidem magni harum ut sed
            excepturi beatae aliquam possimus tempora, velit id maiores delectus
            quas dicta tenetur?
          </p>
          <div className="space-y-3 mt-3">
            <p className="text-gray-500 flex items-center gap-3">
              <LocationOnIcon />
              <span>Kochi, Kerala</span>
            </p>
            <p className="text-gray-500 flex items-center gap-3">
              <EventAvailableIcon />
              <span>Mon-Sun 9AM-3AM(Today)</span>
            </p>
          </div>
        </div>
      </section>
      <Divider />
      <section className="pt-[2rem] lg:flex relative">
        <div className="space-y-10 lg:w-[20%] filter ">
          <div className="box space-y-5 lg:sticky top-28">
            <div>
              <Typography variant="h5" sx={{ paddingBottom: "1rem" }}>
                Food Type
              </Typography>
              <FormControl className="py-10 space-y-5" component={"fieldset"}>
                <RadioGroup onChange={handleFilter} name="food_type" value={foodTypes}>
                  {foodTypes.map((item) => (
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
            <Divider/>
            <div>
              <Typography variant="h5" sx={{ paddingBottom: "1rem" }}>
                Food Category
              </Typography>
              <FormControl className="py-10 space-y-5" component={"fieldset"}>
                <RadioGroup onChange={handleFilter} name="food_type" value={categories}>
                  {categories.map((item) => (
                    <FormControlLabel
                      key={item}
                      value={item}
                      control={<Radio />}
                      label={item}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </div>
          </div>
        </div>
        <div className="space-y-5 lg:w-[80%] lg:pl-10">
            {menu.map((item)=><MenuCard/>)}
        </div>
      </section>
    </div>
  );
};

export default RestaurantDetails;
