import { FaQuoteLeft } from "react-icons/fa";
import { FaArrowRightLong, FaArrowLeftLong } from "react-icons/fa6";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import { Navigation } from "swiper/modules";

const ReviewSection = () => {
  return (
    <div className="py-[5%] w-[80%] mx-auto">
      <Swiper
        slidesPerView={3}
        spaceBetween={20}
        loop={true}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
          clickable: true,
        }}
        modules={[Navigation]}
        className="mySwiper"
      >
        <div className="flex flex-wrap justify-center gap-8 py-[4%]">
          {randomReveiws.map((review) => (
            <SwiperSlide key={review.id}>
              <div
                key={review.id}
                className="relative bg-[rgba(255,255,255,0.3)] shadow-lg rounded-lg p-[10%]  max-w-sm w-full text-center backdrop-blur-lg"
              >
                {/* Quote in the background */}
                <p className="absolute top-10 left-10 text-[60px] text-slate-200 font-bold leading-none transform -translate-x-6 -translate-y-6">
                  <FaQuoteLeft></FaQuoteLeft>
                </p>

                {/* Review content */}
                <div className="relative z-10">
                  <p className="text-slate-600 mb-4">{review.description}</p>
                  <div className="flex justify-center mb-4">
                    {Array.from({ length: review.rating }).map((_, index) => (
                      <span key={index} className="text-yellow-400 text-xl">
                        &#9733;
                      </span>
                    ))}
                    {Array.from({ length: 5 - review.rating }).map(
                      (_, index) => (
                        <span key={index} className="text-gray-300 text-xl">
                          &#9733;
                        </span>
                      )
                    )}
                  </div>
                  <h3 className="font-bold text-slate-600 text-lg">
                    {review.name}
                  </h3>
                  <p className="text-sm text-slate-600">{review.title}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </div>
        <div className="slider-controler flex justify-center items-center gap-x-5 mt-5">
          <div className="swiper-button-prev bg-rose-100 hover:bg-rose-200 cursor-pointer font-bold text-rose-600 p-3 rounded-full">
            <FaArrowLeftLong size={20} />
          </div>
          <div className="swiper-button-next bg-rose-100 hover:bg-rose-200 cursor-pointer font-bold text-rose-600 p-3 rounded-full">
            <FaArrowRightLong size={20} />
          </div>
        </div>
      </Swiper>
    </div>
  );
};

export default ReviewSection;

const randomReveiws = [
  {
    id: 1,
    name: "John Doe",
    title: "Software Engineer",
    rating: 5,
    description:
      "The service was absolutely fantastic! I couldn't have asked for a better experience. Highly recommend!",
  },
  {
    id: 2,
    name: "Emily Smith",
    title: "Graphic Designer",
    rating: 4,
    description:
      "Great selection of features and very user-friendly. A few minor improvements could make it perfect.",
  },
  {
    id: 3,
    name: "Michael Johnson",
    title: "Freelance Writer",
    rating: 5,
    description:
      "Excellent! Everything exceeded my expectations. The support team is also very responsive and helpful.",
  },
  {
    id: 4,
    name: "Sophia Brown",
    title: "Marketing Specialist",
    rating: 3,
    description:
      "The overall experience was okay. Some aspects could use a bit of polish, but it's still worth a try.",
  },
  {
    id: 5,
    name: "David Wilson",
    title: "Entrepreneur",
    rating: 4,
    description:
      "Very useful and well-designed! It has saved me a lot of time, and I appreciate the attention to detail.",
  },
];
