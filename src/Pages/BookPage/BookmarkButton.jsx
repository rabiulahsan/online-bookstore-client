/* eslint-disable react/prop-types */
import { IoBookmark, IoBookmarkOutline } from "react-icons/io5";
import useLoggedUser from "../../Hooks/useLoggedUser/useLoggedUser";
import useAxiosSecure from "../../Hooks/useAxiosSecure/useAxiosSecure";
import { toast } from "react-toastify"; // Import toast
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

  // Toast helper function
  const showToast = (message, type = "info", position = "top-right") => {
    toast(message, {
      position,
      type,
      autoClose: 5000, // Auto close after 5 seconds
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

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
          showToast("Bookmark removed successfully!", "info");
        } else {
          // If not saved, add to favorites
          const result = await axiosSecure.post(
            `/api/favs/add/${loggedUser._id}`,
            book
          );
          console.log("Bookmark added successfully:", result.data.result);
          setSaved(true); // Update state to true
          showToast("Bookmark added successfully!", "success");
        }
      } else {
        showToast("You must be logged in to bookmark this item.", "error");
      }
    } catch (error) {
      console.error("Error toggling bookmark:", error);
      showToast("An error occurred while toggling the bookmark.", "error");
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
