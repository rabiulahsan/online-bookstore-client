import { Link } from "react-router-dom";
import BannerSlide from "./BannerSlide";

const Banner = () => {
  return (
    <div className="flex py-[5%] gap-x-2 bg-slate-100">
      <div className="w-2/5 flex-col justify-start items-center ">
        <p className="text-6xl text-slate-700 font-bold ">
          Books That Fit In Your Pocket
        </p>
        <p className=" text-gray-600 my-5">
          Explore a world of eBooks and audiobooks at your fingertips. Buy,
          listen online, or download for offline access—immerse yourself in
          endless stories, learning, and adventures anytime, anywhere.
        </p>
        <Link to="/">
          <button className="bg-rose-500 font-semibold text-white px-6 py-3 rounded-sm hover:bg-rose-600">
            Find Your Books
          </button>
        </Link>
      </div>
      <div className="w-3/5">
        <BannerSlide></BannerSlide>
      </div>
    </div>
  );
};

export default Banner;
