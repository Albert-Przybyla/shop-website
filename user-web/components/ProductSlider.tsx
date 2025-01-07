"use client";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/scrollbar";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Photo } from "@/types/types.response";
import { useState } from "react";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Button from "./Button";
import { X } from "lucide-react";

const ImageModal = ({ images, openIndex, onClose }: { images: string[]; openIndex?: number; onClose: () => void }) => {
  return (
    <div
      className={`fixed top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.8)] z-[999] ${
        openIndex !== undefined ? "flex" : "hidden"
      }`}
    >
      <Button onClick={onClose} className=" z-10 aspect-square h-auto fixed top-5 right-5 text-background border-none">
        <X width={30} height={30} />
      </Button>
      <div className="w-screen h-screen p-3">
        <Swiper
          modules={[Pagination, Navigation]}
          navigation
          pagination={{ clickable: true }}
          initialSlide={openIndex || 0}
          spaceBetween={30}
          slidesPerView={1}
          className="h-full w-full "
        >
          {images.map((image, index) => (
            <SwiperSlide
              key={index}
              className="h-full flex items-center justify-center"
              style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
            >
              <img src={image} alt={`Image ${index + 1}`} className="max-w-full max-h-full" />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

const ProductSlider = ({ photos }: { photos: Photo[] }) => {
  const [openModal, setOpenModal] = useState<number | undefined>(undefined);
  return (
    <>
      <Swiper
        modules={[Pagination, Navigation]}
        pagination={{ clickable: true }}
        spaceBetween={30}
        slidesPerView={1}
        className="w-[500px] max-w-[60vh] cursor-zoom-in aspect-square"
      >
        {photos.map((image, index) => (
          <SwiperSlide
            key={index}
            style={{
              backgroundImage: `url(${image.url})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            className="w-[500px] max-w-[60vh] cursor-zoom-in aspect-square"
            onClick={() => {
              setOpenModal(index);
            }}
          ></SwiperSlide>
        ))}
        <ImageModal
          images={photos.map((image) => image.url)}
          openIndex={openModal}
          onClose={() => setOpenModal(undefined)}
        />
      </Swiper>
    </>
  );
};

export default ProductSlider;
