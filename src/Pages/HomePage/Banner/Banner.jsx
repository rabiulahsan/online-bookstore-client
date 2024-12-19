import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <div className="flex px-[5%] py-[5%] gap-x-2 bg-slate-100">
      <div className="w-2/5 flex-col justify-start items-center ">
        <p className="text-6xl text-slate-700 font-bold ">
          Books That Fit In Your Pocket
        </p>
        <p className=" text-slate-600 my-5">
          Explore a world of eBooks and audiobooks at your fingertips. Buy,
          listen online, or download for offline access—immerse yourself in
          endless stories, learning, and adventures anytime, anywhere.
        </p>
        <Link to="/create-account">
          <button className="bg-rose-500 font-semibold text-white px-6 py-3 rounded-sm hover:bg-rose-600">
            Find Your Books
          </button>
        </Link>
      </div>
      <div className="w-3/5 border border-slate-600"></div>
    </div>
  );
};

export default Banner;
