/* eslint-disable react/prop-types */
import { IoBookmark, IoBookmarkOutline } from "react-icons/io5";
import useLoggedUser from "../../Hooks/useLoggedUser/useLoggedUser";
import useAxiosSecure from "../../Hooks/useAxiosSecure/useAxiosSecure";
import useGetFav from "../../Hooks/useGetFav/useGetFav";
import { useEffect, useState } from "react";

const BookmarkButton = ({ book }) => {
  //   console.log(book);
  const [axiosSecure] = useAxiosSecure();
  const [loggedUser] = useLoggedUser();
  const [saved, setSaved] = useState(false);
  const [favouriteData] = useGetFav();

  // Check if the book is already in favorites
  useEffect(() => {
    const isBookSaved = favouriteData.some((data) => data.bookId === book._id);
    setSaved(isBookSaved);
  }, [favouriteData, book._id]);

  const handleAddingtoFav = async (book) => {
    try {
      if (loggedUser && loggedUser._id) {
        const result = await axiosSecure.post(
          `http://localhost:5000/api/favs/add/${loggedUser._id}`,
          book
        );
        console.log("Bookmark added successfully:", result.data.result);
        setSaved(true);
      }
    } catch (error) {
      console.error("Error adding bookmark:", error);
    }
  };

  return (
    <div>
      {saved ? (
        <p
          className="bg-rose-100 hover:bg-rose-200 px-5 py-[10px] rounded-sm text-2xl flex items-center justify-center cursor-pointer"
          title="Add to favourite book"
          onClick={() => handleAddingtoFav(book)}
        >
          <IoBookmark></IoBookmark>
        </p>
      ) : (
        <p
          className="bg-rose-100 hover:bg-rose-200 px-5 py-[10px] rounded-sm text-2xl flex items-center justify-center cursor-pointer"
          title="Add to favourite book"
          onClick={() => handleAddingtoFav(book)}
        >
          <IoBookmarkOutline></IoBookmarkOutline>
        </p>
      )}
    </div>
  );
};

export default BookmarkButton;
