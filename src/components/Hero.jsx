import React from "react";
import Slider from "react-slick";
import img1 from "../assets/VIPIN JI TA_30.06.24/new_folder_1/p_img1_3.png";
import img2 from "../assets/VIPIN JI TA_30.06.24/new_folder_2/p_img2_2.png";
import img3 from "../assets/VIPIN JI TA_30.06.24/new_folder_3/p_img3_3.png";
import img4 from "../assets/VIPIN JI TA_30.06.24/new_folder_4/p_img4_2.png";
import img5 from "../assets/VIPIN JI TA_30.06.24/new_folder_5/p_img5_3.png";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const Hero = () => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  const heroData = [
    { title: "Latest Arrivals", subtitle: "Our Bestseller", image: img1 },
    { title: "Summer Collection", subtitle: "New Season", image: img2 },
    { title: "Latest Arrivals", subtitle: "Our Bestseller", image: img3 },
    { title: "Summer Collection", subtitle: "New Season", image: img4 },
    { title: "Latest Arrivals", subtitle: "Our Bestseller", image: img5 },  
  ];

  return (
    <div className="w-full border border-gray-400">
      <Carousel
        responsive={responsive}
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={3000}
        showDots={true}
        removeArrowOnDeviceType={["tablet", "mobile"]}
      >
        {heroData.map((slide, index) => (
          <div key={index} className="flex flex-col sm:flex-row items-center justify-center h-auto sm:h-[400px] p-4">
            {/* Hero Left Side */}
            <div className="sm:w-1/2 flex items-center justify-center h-full">
              <div className="text-[#414141] px-4">
                <div className="flex items-center gap-2">
                  <p className="w-8 md:w-11 h-[2px] bg-[#414141]"></p>
                  <p className="font-medium text-sm md:text-base">{slide.subtitle}</p>
                </div>
                <h1 className="prata-regular text-2xl sm:text-3xl lg:text-4xl leading-relaxed">
                  {slide.title}
                </h1>
                <div className="flex items-center gap-2">
                  <p className="font-semibold text-sm md:text-base">Shop Now</p>
                  <p className="w-8 md:w-11 h-[2px] bg-[#414141]"></p>
                </div>
              </div>
            </div>
            {/* Hero right side */}
            <div className="sm:w-1/2 h-full flex items-center justify-center">
              <img
                src={slide.image}
                className="w-full max-h-[300px] sm:max-h-full object-contain"
                alt={`${slide.title} - ${slide.subtitle}`}
              />
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Hero;
