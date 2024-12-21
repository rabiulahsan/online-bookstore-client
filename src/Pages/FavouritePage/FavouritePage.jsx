import { useLoaderData } from "react-router-dom";
import useGetFav from "../../Hooks/useGetFav/useGetFav";
import StaggerAnimation from "../../Components/StaggerAnimation/StaggerAnimation";

const FavouritePage = () => {
  const [favouriteData, isFavLoading] = useGetFav();
  console.log(favouriteData);
  return (
    <div className="px-[4%] bg-slate-100">
      <div className="flex items-center justify-center py-[2%] gap-x-[2%]">
        <span className="flex-grow h-[3px] bg-gradient-to-r from-transparent to-rose-500"></span>
        <span className="font-bold text-3xl mx-4 bg-gradient-to-r from-rose-600 via-pink-500 to-slate-600 bg-clip-text text-transparent">
          <StaggerAnimation
            text={"Get Your Favourite Books"}
          ></StaggerAnimation>
        </span>
        <span className="flex-grow h-[3px] bg-gradient-to-r from-rose-600 to-transparent"></span>
      </div>
    </div>
  );
};

export default FavouritePage;
