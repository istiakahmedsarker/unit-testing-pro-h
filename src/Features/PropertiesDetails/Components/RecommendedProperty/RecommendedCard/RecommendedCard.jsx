import React from 'react';
import { IoBedOutline } from 'react-icons/io5';
import { PiBathtub } from 'react-icons/pi';
import { BiShapeSquare } from 'react-icons/bi';
import { HiArrowTopRightOnSquare } from 'react-icons/hi2';
import { GiSelfLove } from 'react-icons/gi';
import { Link } from 'react-router-dom';
// for slider
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Autoplay } from 'swiper/modules';

const RecommendedCard = ({ recommended }) => {
  const {
    _id,
    propertyTitle,
    propertyImages,
    location,
    squareFootage,
    bedroom,
    bathroom,
    propertyStatus,
    price,
  } = recommended;
  console.log(recommended);
  return (
    <div className="px-4 py-5 rounded-lg shadow-lg drop-shadow-lg bg-white my-6">
      <div className=" w-full">
        {/* use slider for property image*/}
        <Swiper
          slidesPerView={1}
          spaceBetween={0}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination, Autoplay]}
          className="mySwiper h-full"
          loop={true}
        >
          {propertyImages?.map((img, i) => (
            <SwiperSlide
              key={i}
              style={{ width: '100%' }}
              className=" h-full relative"
            >
              <div className="h-full w-full absolute z-30 bg-[#0b48ff] opacity-10 "></div>
              <div className="w-full h-full rounded-lg ">
                <img
                  src={img}
                  alt={propertyTitle}
                  className="w-full mx-auto h-56  rounded-lg object-cover relative "
                />
                <div className="absolute inset-0 flex items-end justify-end">
                  <h3 className="text-white bottom-0 text-sm  bg-[#eb6753] px-3 py-3 rounded-l-2xl">
                    ${price}
                  </h3>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <Link to={`/propertiesDetails/${recommended._id}`}>
        <h3 className="font-bold my-2 underline ">
          {recommended.propertyTitle}
        </h3>
      </Link>
      <div>
        <h3>
          {recommended.location.city}, {recommended.location.state}
        </h3>
        <div className="flex justify-between items-center mt-3  gap-5">
          <h3 className="flex items-center gap-2">
            <span>
              <IoBedOutline />
            </span>
            <span className="text-sm"> {recommended.bedroom} Bed</span>
          </h3>
          <h3 className="flex items-center gap-2">
            <span>
              <PiBathtub />
            </span>
            <span className="text-sm"> {recommended.bathroom} Bath</span>
          </h3>
          <h3 className="flex items-center gap-1">
            <span>
              <BiShapeSquare />
            </span>
            <span className="text-sm">{recommended.squareFootage} sqFt</span>
          </h3>
        </div>
        <hr className="my-3" />
        <div className="flex items-center justify-between">
          <h3>For {recommended.propertyStatus}</h3>
          <h3 className="flex justify-center items-center gap-4">
            <HiArrowTopRightOnSquare />
            <GiSelfLove />
          </h3>
        </div>
      </div>
    </div>
  );
};

export default RecommendedCard;
