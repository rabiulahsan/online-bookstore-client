/* eslint-disable react/prop-types */
import { IoBookmark, IoBookmarkOutline } from "react-icons/io5";
import useLoggedUser from "../../Hooks/useLoggedUser/useLoggedUser";
import useAxiosSecure from "../../Hooks/useAxiosSecure/useAxiosSecure";

import { useEffect, useState } from "react";

const BookmarkButton = ({ book, favArray }) => {
  const [axiosSecure] = useAxiosSecure();
  const [loggedUser] = useLoggedUser();
  const [saved, setSaved] = useState(null);
  // console.log(favArray);
  // console.log(book);

  // Check if the book is already in favorites
  useEffect(() => {
    if (favArray && book?._id) {
      const isBookSaved = favArray.includes(book._id);
      console.log("done");
      setSaved(isBookSaved);
    }
  }, [favArray, book?._id]);

  // Toggle favorite state
  const handleToggleFav = async () => {
    try {
      if (loggedUser && loggedUser._id) {
        if (saved) {
          // If already saved, remove from favorites
          const result = await axiosSecure.delete(
            `/api/favs/remove/${loggedUser._id}/${book?._id}`
          );
          setSaved(false);
          console.log("Bookmark removed successfully:", result.data);
        } else {
          // If not saved, add to favorites
          const result = await axiosSecure.post(
            `/api/favs/add/${loggedUser._id}`,
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
    <p
      className="bg-rose-100 hover:bg-rose-200 px-5 py-[10px] rounded-sm text-2xl flex items-center justify-center cursor-pointer"
      title={saved ? "Remove from wishlist book" : "Add to wishlist book"}
      onClick={handleToggleFav}
    >
      {saved ? <IoBookmark /> : <IoBookmarkOutline />}
    </p>
  );
};

export default BookmarkButton;
