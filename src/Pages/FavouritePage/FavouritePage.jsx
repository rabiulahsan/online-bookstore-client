import StaggerAnimation from "../../Components/StaggerAnimation/StaggerAnimation";
import FavouritePageCard from "./FavouritePageCard";
import { useEffect, useState } from "react";
import useLoggedUser from "../../Hooks/useLoggedUser/useLoggedUser";
import useAxiosSecure from "../../Hooks/useAxiosSecure/useAxiosSecure";

const FavouritePage = () => {
  const [favouriteData, setFavouriteData] = useState([]);
  const [isFavLoading, setIsFavLoading] = useState(true);
  const [loggedUser] = useLoggedUser();
  const [axiosSecure] = useAxiosSecure();

  useEffect(() => {
    const fetchFavourites = async () => {
      try {
        setIsFavLoading(true); // Start loading
        if (loggedUser && loggedUser._id) {
          const res = await axiosSecure.get(
            `/api/favs/getall/${loggedUser?._id}`
          );
          setFavouriteData(res.data[0]?.bookmarks || []);
        }
      } catch (error) {
        console.log("Error getting favourite data:", error);
      } finally {
        setIsFavLoading(false); // Stop loading
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
        <p>Loading....</p>
      ) : (
        <div className="grid  gap-y-12 gap-x-4 grid-cols-1 lg:grid-cols-4 px-[5%] my-[4%] ">
          {favouriteData?.map((book) => (
            <FavouritePageCard
              key={book._id}
              book={book}
              setFavouriteData={setFavouriteData}
              favouriteData={favouriteData}
              isFavLoading={isFavLoading}
            ></FavouritePageCard>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavouritePage;
