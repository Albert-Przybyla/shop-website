"use client";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/scrollbar";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Photo } from "@/types/types.response";
import { useRef, useState } from "react";
import { FreeMode, Navigation, Pagination, Scrollbar } from "swiper/modules";
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
  const swiperRef = useRef<any>(null);
  const handleThumbnailClick = (index: number) => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slideTo(index);
    }
  };

  return (
    <>
      <Swiper
        ref={swiperRef}
        modules={[Pagination, Navigation]}
        pagination={{ clickable: true }}
        spaceBetween={30}
        slidesPerView={1}
        className="w-[500px] max-w-[calc(100%-2rem)] cursor-zoom-in aspect-square"
      >
        {photos.map((image, index) => (
          <SwiperSlide
            key={index}
            style={{
              backgroundImage: `url(${image.url})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            className="cursor-zoom-in aspect-square"
            onClick={() => {
              setOpenModal(index);
            }}
          />
        ))}
      </Swiper>
      <div className="flex flex-row mt-4 justify-center w-full px-3">
        <Swiper
          modules={[Scrollbar, FreeMode]}
          freeMode={true}
          slidesPerView={"auto"}
          spaceBetween={5}
          className="h-[100px] cursor-pointer"
          scrollbar={{
            hide: true,
          }}
        >
          {photos.map((image, index) => (
            <SwiperSlide
              key={index}
              onClick={() => handleThumbnailClick(index)}
              style={{ width: "100px", marginRight: "5px" }}
            >
              <div
                style={{
                  backgroundImage: `url(${image.url})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
                className="cursor-pointer aspect-square h-[100px] w-[100px]"
              ></div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <ImageModal
        images={photos.map((image) => image.url)}
        openIndex={openModal}
        onClose={() => setOpenModal(undefined)}
      />
    </>
  );
};

export default ProductSlider;
