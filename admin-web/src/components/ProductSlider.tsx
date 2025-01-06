import { Photo } from "@/types/types.response";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/effect-fade";
// import "swiper/css/scrollbar";
// import "swiper/css/pagination";

const ProductSlider = ({ photos }: { photos: Photo[] }) => {
  return (
    <Swiper
      modules={[Pagination]}
      navigation
      pagination={{ clickable: true }}
      spaceBetween={30}
      slidesPerView={1}
      className="w-full min-h-[50vh] h-[500px] max-h-[60vh]"
    >
      {photos.map((image) => (
        <SwiperSlide
          key={image.id}
          style={{
            backgroundImage: `url(${image.url})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          className="w-full overflow-hidden min-h-[50vh] h-[500px] max-h-[60vh]"
        ></SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ProductSlider;
