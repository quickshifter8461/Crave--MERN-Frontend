import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const MultiItemCarousel = ({ data, settings, renderItem }) => {
  return (
    <div>
      <Slider {...settings}>
        {data.map((item, index) => renderItem(item, index))}
      </Slider>
    </div>
  );
};

export default MultiItemCarousel;
