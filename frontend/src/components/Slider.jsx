import React, { useState } from "react";
import { useEffect } from "react";
import Spinner from "../components/Spinner";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {
  EffectFade,
  Autoplay,
  Navigation,
  Pagination,
} from "swiper";
import "swiper/css/bundle";
import { useNavigate } from "react-router-dom";

export default function Slider({ listings }) {

  SwiperCore.use([Autoplay, Navigation, Pagination]);
  const navigate = useNavigate();
  console.log(listings);
  return (
    listings ? (
      <>
        <Swiper
          slidesPerView={1}
          navigation
          pagination={{ type: "progressbar" }}
          effect="fade"
          module={[EffectFade]}
          autoplay={{ delay: 4000 }}
          className="h-[80vh] min-h-[19rem]"
        >
          {listings.map((data) => (
            <SwiperSlide
              key={data._id}
              onClick={() => navigate(`/category/${data.type}/${data._id}`)}
              className="w-full h-full"
            >
              <img
                src={data.imgUrls.front}
                style={{
                  imageRendering: "smooth",
                }}
                className="w-full relative h-full object-cover overflow-hidden"
              />
              <p className="text-[#f1faee] absolute left-1 top-3 font-normal max-w-[90%] bg-[#3b87b7] p-2 rounded-br-2xl text-md shadow-lg">
                {data?.name}
              </p>
              <p className="text-[#f1faee] absolute left-1 bottom-3 font-medium max-w-[90%] bg-[#e63946] p-2 rounded-tr-2xl text-md shadow-lg">
                Rs
                {data?.offer
                  ? data?.discount
                  : data?.regularPrice}
                {data?.type === "rent" && " / month"}
              </p>
            </SwiperSlide>
          ))}
        </Swiper>
      </>
    ) : null
  );
}
