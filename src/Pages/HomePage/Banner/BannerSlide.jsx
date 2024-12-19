import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";

//todo add actual book image

const BannerSlide = () => {
  return (
    <div className="w-[80%] mx-auto flex justify-center items-center mt-[5%]">
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        loop={true}
        slidesPerView={3} // Show 3 slides at a time
        spaceBetween={60} // Space between slides
        autoplay={{
          delay: 2000, // Slide changes every 3 seconds
          disableOnInteraction: false, // Keeps autoplay running even when interacted
        }}
        coverflowEffect={{
          rotate: 0,
          depth: 250,
          slideShadows: true,
        }}
        modules={[EffectCoverflow, Autoplay]}
      >
        <SwiperSlide>
          <img
            src="https://i.pinimg.com/564x/f7/c8/12/f7c812c9b0296cd9f119e33a06d9a256.jpg"
            alt=""
            className="h-full object-cover shadow-[-8px_8px_10px_rgba(0,0,0,0.5)]"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://marketplace.canva.com/EAFf0E5urqk/1/0/1003w/canva-blue-and-green-surreal-fiction-book-cover-53S3IzrNxvY.jpg"
            alt=""
            className="h-full object-cover shadow-[-8px_8px_10px_rgba(0,0,0,0.5)]"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://bukovero.com/wp-content/uploads/2016/07/Harry_Potter_and_the_Cursed_Child_Special_Rehearsal_Edition_Book_Cover.jpg"
            alt=""
            className="h-full object-cover shadow-[-8px_8px_10px_rgba(0,0,0,0.5)]"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://marketplace.canva.com/EAFfSnGl7II/2/0/1003w/canva-elegant-dark-woods-fantasy-photo-book-cover-vAt8PH1CmqQ.jpg"
            alt=""
            className="h-full object-cover shadow-[-8px_8px_10px_rgba(0,0,0,0.5)]"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://marketplace.canva.com/EAFaQMYuZbo/1/0/1003w/canva-brown-rusty-mystery-novel-book-cover-hG1QhA7BiBU.jpg"
            alt=""
            className="h-full object-cover shadow-[-8px_8px_10px_rgba(0,0,0,0.5)]"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsfxrcUtlaLqSTTpA7N9cWKIopvRNtXngM2A&s"
            alt=""
            className="h-full object-cover shadow-[-8px_8px_10px_rgba(0,0,0,0.5)]"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://i.pinimg.com/736x/35/66/dc/3566dc24c327c144d18dffbac7145d28.jpg"
            alt=""
            className="h-full object-cover shadow-[-8px_8px_10px_rgba(0,0,0,0.5)]"
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default BannerSlide;
