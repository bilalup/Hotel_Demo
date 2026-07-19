import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs, FreeMode } from "swiper/modules";
import { useState } from "react";
import { optimizeImage } from "../../utils/imageUrl";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/free-mode";
import "swiper/css/thumbs";

export function RoomGallerySwiper({ images = [], name }) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <div>
      <Swiper
        modules={[Navigation, Thumbs]}
        navigation
        thumbs={{ swiper: thumbsSwiper }}
        className="aspect-[16/10] overflow-hidden rounded-2xl"
      >
        {images.map((src, i) => (
          <SwiperSlide key={src + i}>
            <img
              src={optimizeImage(src, 1400)}
              alt={`${name} ${i + 1}`}
              loading={i === 0 ? "eager" : "lazy"}
              decoding="async"
              className="h-full w-full object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {images.length > 1 && (
        <Swiper
          onSwiper={setThumbsSwiper}
          modules={[FreeMode, Thumbs]}
          spaceBetween={12}
          slidesPerView={Math.min(images.length, 5)}
          freeMode
          watchSlidesProgress
          className="mt-3"
        >
          {images.map((src, i) => (
            <SwiperSlide key={src + i} className="cursor-pointer overflow-hidden rounded-lg opacity-60 transition-opacity [&.swiper-slide-thumb-active]:opacity-100">
              <img
                src={optimizeImage(src, 200)}
                alt=""
                loading="lazy"
                decoding="async"
                className="aspect-square h-full w-full object-cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
}
