import useGetFav from "../../Hooks/useGetFav/useGetFav";
import StaggerAnimation from "../../Components/StaggerAnimation/StaggerAnimation";
import FavouritePageCard from "./FavouritePageCard";
import { useEffect, useState } from "react";

const FavouritePage = () => {
  const [favouriteData, isFavLoading] = useGetFav();
  const [favBooks, setFavBooks] = useState([]);

  // Sync fetched data to local state
  useEffect(() => {
    if (favouriteData) {
      setFavBooks(favouriteData);
    }
  }, [favouriteData]);

  // Function to remove book locally after unbookmark
  const handleRemoveBookmark = (bookId) => {
    const newFavBook = favouriteData?.filter((book) => book.bookId !== bookId);
    setFavBooks(newFavBook);
  };

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
          {favBooks?.map((book) => (
            <FavouritePageCard
              key={book._id}
              book={book}
              onRemoveBookmark={handleRemoveBookmark}
            ></FavouritePageCard>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavouritePage;
