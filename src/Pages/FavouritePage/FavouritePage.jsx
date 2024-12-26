import StaggerAnimation from "../../Components/StaggerAnimation/StaggerAnimation";
import FavouritePageCard from "./FavouritePageCard";
import { useEffect, useState } from "react";
import useLoggedUser from "../../Hooks/useLoggedUser/useLoggedUser";
import useAxiosSecure from "../../Hooks/useAxiosSecure/useAxiosSecure";
import useGetCart from "../../Hooks/useGetCart/useGetCart";
import useVerifyUser from "../../Hooks/useVerifyUser/useVerifyUser";
import useVerifyAuthor from "../../Hooks/useVerifyAuthor/useVerifyAuthor";
import SkeletonCard from "../../Components/Skeleton/SkeletonCard";

const FavouritePage = () => {
  const [favouriteData, setFavouriteData] = useState([]);
  const [favArray, setFavArray] = useState([]);
  const [, , cartDataId] = useGetCart();
  const [isFavLoading, setIsFavLoading] = useState(true);
  const [loggedUser] = useLoggedUser();
  const [axiosSecure] = useAxiosSecure();
  const [isUser] = useVerifyUser();
  const [isAuthor] = useVerifyAuthor();
  // console.log(favouriteData);

  useEffect(() => {
    const fetchFavourites = async () => {
      try {
        setIsFavLoading(true); // Start loading
        if (loggedUser && loggedUser._id) {
          const res = await axiosSecure.get(
            `/api/favs/getall/${loggedUser?._id}`
          );
          setFavouriteData(res.data[0]?.bookmarks || []);
          setFavArray(res.data[0]?.bookmarksIdArray || []);
          setIsFavLoading(false); // Stop loading
        }
      } catch (error) {
        console.log("Error getting favourite data:", error);
      }
    };

    // Only fetch if `loggedUser` is available and stable
    if (loggedUser && loggedUser._id) {
      fetchFavourites();
    }
  }, [loggedUser, axiosSecure]);

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
      {isFavLoading ? (
        <div className="grid gap-y-12 gap-x-4 grid-cols-1 lg:grid-cols-4 px-[5%] py-[4%]">
          <SkeletonCard number={8}></SkeletonCard>
        </div>
      ) : favouriteData?.length === 0 ? (
        <div className="min-h-[500px] flex items-center justify-center">
          <div>
            <img
              src="/nodata.png"
              alt="No data"
              className="w-[300px] mx-auto"
            />
            <p className="text-center font-bold text-slate-600 text-xl">
              You have no items on wishlist
            </p>
          </div>
        </div>
      ) : (
        <div className="grid gap-y-12 gap-x-4 grid-cols-1 lg:grid-cols-4 px-[5%] py-[4%]">
          {favouriteData.map((book, i) => (
            <FavouritePageCard
              key={i}
              book={book}
              setFavouriteData={setFavouriteData}
              favouriteData={favouriteData}
              isFavLoading={isFavLoading}
              cartDataId={cartDataId}
              favArray={favArray}
              isAuthor={isAuthor}
              isUser={isUser}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FavouritePage;
