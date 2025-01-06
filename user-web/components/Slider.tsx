"use client";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/scrollbar";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { motion } from "framer-motion";
import React from "react";
import { Autoplay, EffectFade, Scrollbar } from "swiper/modules";

const Slider = () => {
  const images = ["/images/slide-1.jpg", "/images/slide-2.jpg", "/images/slide-3.jpg"];
  return (
    <motion.div initial={{ opacity: 0.9 }} animate={{ opacity: 1 }}>
      <Swiper
        spaceBetween={30}
        effect={"fade"}
        navigation={true}
        centeredSlides={true}
        loop={true}
        scrollbar={{
          hide: true,
        }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        modules={[Autoplay, EffectFade, Scrollbar]}
        className="w-full overflow-hidden min-h-[50vh] h-[500px] max-h-[60vh]"
      >
        {images.map((slide, index) => (
          <SwiperSlide
            key={index}
            style={{
              backgroundImage: `url(${slide})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></SwiperSlide>
        ))}
      </Swiper>
    </motion.div>
  );
};

export default Slider;
