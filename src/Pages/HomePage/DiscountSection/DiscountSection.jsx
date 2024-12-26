import { Link } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);
const DiscountSection = () => {
  const leftimage = useRef(null);
  const rightimage = useRef(null);

  //animation for books images
  useGSAP(() => {
    //animation for left image
    gsap.fromTo(
      leftimage.current,
      { x: -200, y: 100, opacity: 0 }, // Initial position: bottom-left
      {
        x: 0,
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: leftimage.current,
          start: "top 80%",
          end: "top 40%",
          scrub: 1,
          toggleActions: "reverse play reverse reverse",
        },
      }
    );

    //animation for right image
    gsap.fromTo(
      rightimage.current,
      { x: 200, y: 100, opacity: 0 }, // Initial position: bottom-right
      {
        x: 0,
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: rightimage.current,
          start: "top 80%",
          end: "top 40%",
          scrub: 1,
          toggleActions: "reverse play reverse reverse",
        },
      }
    );
  });
  return (
    <div className="flex justify-between items-center bg-slate-100 py-[5%] w-[70%] mx-auto">
      {/* Books Section */}
      <div className="flex justify-center items-center bg-slate-100  relative gap-x-10 py-8">
        {/* First Book */}
        <img
          ref={leftimage}
          src="https://m.media-amazon.com/images/I/71lwUXdZJqL.jpg"
          alt=""
          className="w-48 h-[300px] transform rotate-[-10deg] shadow-[-8px_8px_10px_rgba(0,0,0,0.5)]"
        />
        {/* Second Book */}
        <img
          ref={rightimage}
          src="https://sterling-us.imgix.net/covers/9781454951209.jpg?auto=format&h=648"
          alt=""
          className="w-48 h-[300px] transform rotate-[10deg] -translate-x-8 shadow-[-8px_8px_10px_rgba(0,0,0,0.5)]"
        />
      </div>

      {/* Text Section */}
      <div className="max-w-md text-center">
        <h2 className="text-3xl font-bold text-slate-600 mb-4">
          Up To 50% Discount
        </h2>
        <p className="text-gray-600 mb-6">
          Take advantage of the discount days we have for you, buy books from
          your favorite writers. The more you buy, the more discounts we have
          for you.
        </p>
        <Link to="/books">
          <button className="bg-rose-500 text-white py-2 px-6 rounded-sm font-semibold hover:bg-rose-600">
            Buy Now
          </button>
        </Link>
      </div>
    </div>
  );
};

export default DiscountSection;
