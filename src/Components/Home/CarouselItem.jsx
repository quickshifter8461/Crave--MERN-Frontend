import React from "react";


const CarouselItem = ({ image, title, onClick }) => {
  return (
    <div className="flex flex-col justify-center items-center cursor-pointer" onClick={(e) => { 
      onClick(); 
      e.stopPropagation(); 
  }}>
      <img
        className="w-[4rem] h-[4rem] sm:w-[6rem] sm:h-[6rem] md:w-[8rem] md:h-[8rem] lg:w-[10rem] lg:h-[10rem] xl:w-[12rem] xl:h-[12rem] rounded-full object-cover object-center"
        src={image}
        alt={title}
      />
      <span className="py-5 font-sans font-medium text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl">
        {title}
      </span>
    </div>
  );
};

export default CarouselItem;
