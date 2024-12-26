import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow } from "swiper/modules";
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
            src="https://m.media-amazon.com/images/I/71lwUXdZJqL.jpg"
            alt=""
            className="h-full object-cover shadow-[-8px_8px_10px_rgba(0,0,0,0.5)]"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://sterling-us.imgix.net/covers/9781454951209.jpg?auto=format&h=648"
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
            src="https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1540217136l/16160797.jpg"
            alt=""
            className="h-full object-cover shadow-[-8px_8px_10px_rgba(0,0,0,0.5)]"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://cdn2.penguin.com.au/covers/400/9780241734315.jpg"
            alt=""
            className="h-full object-cover shadow-[-8px_8px_10px_rgba(0,0,0,0.5)]"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1408303130i/375802.jpg"
            alt=""
            className="h-full object-cover shadow-[-8px_8px_10px_rgba(0,0,0,0.5)]"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://cdn2.penguin.com.au/covers/original/9780718177027.jpg"
            alt=""
            className="h-full object-cover shadow-[-8px_8px_10px_rgba(0,0,0,0.5)]"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://static-01.daraz.com.bd/p/f4daed9c04bf02dcf5dd856e2987f701.jpg"
            alt=""
            className="h-full object-cover shadow-[-8px_8px_10px_rgba(0,0,0,0.5)]"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://i.harperapps.com/hcanz/covers/9780063055391/y648.jpg"
            alt=""
            className="h-full object-cover shadow-[-8px_8px_10px_rgba(0,0,0,0.5)]"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1346380157i/9408584.jpg"
            alt=""
            className="h-full object-cover shadow-[-8px_8px_10px_rgba(0,0,0,0.5)]"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://m.media-amazon.com/images/I/71Cc71zZFsL._AC_UF894,1000_QL80_.jpg"
            alt=""
            className="h-full object-cover shadow-[-8px_8px_10px_rgba(0,0,0,0.5)]"
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default BannerSlide;
