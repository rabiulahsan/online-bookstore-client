/* eslint-disable react/prop-types */
import { IoBookmark, IoBookmarkOutline } from "react-icons/io5";
import useLoggedUser from "../../Hooks/useLoggedUser/useLoggedUser";
import useAxiosSecure from "../../Hooks/useAxiosSecure/useAxiosSecure";
import useGetFav from "../../Hooks/useGetFav/useGetFav";
import { useEffect, useState } from "react";

const BookmarkButton = ({ book }) => {
  const [axiosSecure] = useAxiosSecure();
  const [loggedUser] = useLoggedUser();
  const [saved, setSaved] = useState(false);
  const [favouriteData] = useGetFav();

  // Check if the book is already in favorites
  useEffect(() => {
    const isBookSaved = favouriteData?.some((data) => data.bookId === book._id);
    setSaved(isBookSaved);
  }, [favouriteData, book._id]);

  // Toggle favorite state
  const handleToggleFav = async () => {
    try {
      if (loggedUser && loggedUser._id) {
        if (saved) {
          // If already saved, remove from favorites
          const result = await axiosSecure.delete(
            `http://localhost:5000/api/favs/remove/${loggedUser._id}/${book._id}`
          );
          console.log("Bookmark removed successfully:", result.data);
          setSaved(false); // Update state to false
        } else {
          // If not saved, add to favorites
          const result = await axiosSecure.post(
            `http://localhost:5000/api/favs/add/${loggedUser._id}`,
            book
          );
          console.log("Bookmark added successfully:", result.data.result);
          setSaved(true); // Update state to true
        }
      }
    } catch (error) {
      console.error("Error toggling bookmark:", error);
    }
  };

  return (
    <div>
      <p
        className="bg-rose-100 hover:bg-rose-200 px-5 py-[10px] rounded-sm text-2xl flex items-center justify-center cursor-pointer"
        title={saved ? "Remove from favorite book" : "Add to favorite book"}
        onClick={handleToggleFav}
      >
        {saved ? <IoBookmark /> : <IoBookmarkOutline />}
      </p>
    </div>
  );
};

export default BookmarkButton;
