/* eslint-disable react/prop-types */

import { FaStar } from "react-icons/fa6";
import { Link } from "react-router-dom";
import useVerifyUser from "../../Hooks/useVerifyUser/useVerifyUser";
import CartButton from "../BookPage/CartButton";
import { IoBookmark, IoBookmarkOutline } from "react-icons/io5";
import useAxiosSecure from "../../Hooks/useAxiosSecure/useAxiosSecure";
import useLoggedUser from "../../Hooks/useLoggedUser/useLoggedUser";
import { useEffect, useState } from "react";
import useGetFav from "../../Hooks/useGetFav/useGetFav";

const FavouritePageCard = ({ book, onRemoveBookmark }) => {
  const [isUser] = useVerifyUser();

  const [axiosSecure] = useAxiosSecure();
  const [loggedUser] = useLoggedUser();
  const [saved, setSaved] = useState(false);
  const [favouriteData] = useGetFav();
  console.log(book);

  // Check if the book is already in favorites
  useEffect(() => {
    const isBookSaved = favouriteData?.some(
      (data) => data.bookId === book.bookId
    );
    setSaved(isBookSaved);
  }, [favouriteData, book]);

  // Toggle favorite state
  const handleToggleFav = async () => {
    try {
      if (loggedUser && loggedUser._id) {
        if (saved) {
          // If already saved, remove from favorites
          const result = await axiosSecure.delete(
            `http://localhost:5000/api/favs/remove/${loggedUser._id}/${book?.bookId}`
          );
          onRemoveBookmark(book?.bookId);
          console.log("Bookmark removed successfully:", result.data);
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
    <div className="">
      <div className="flex flex-col items-center group ">
        <Link to={`/books/${book?._id}`}>
          <img
            src={book?.image}
            alt={book?.title}
            className="w-[220px] h-[320px] mx-auto  rounded-xl  shadow-[-6px_6px_8px_rgba(0,0,0,0.6)] transform group-hover:-translate-y-4 transition-transform duration-300"
          />

          <p className="font-bold text-slate-700 text-lg mb-2 mt-4 text-center">
            {book?.title}
          </p>
          <p className="flex items-center justify-between w-[220px]">
            <span className="text-gray-600 ">{book?.author}</span>
            <span className="text-slate-600 flex items-center font-semibold gap-x-1">
              {book?.rating?.average}
              {"  "}
              <FaStar className="text-lg text-yellow-500"></FaStar>
            </span>
          </p>
        </Link>
      </div>

      {/* if user then only displayed this button */}
      {isUser && (
        <div className="  text-rose-600 font-bold flex items-center justify-center gap-x-3 my-3">
          <CartButton book={book}></CartButton>
          <div>
            <p
              className="bg-rose-100 hover:bg-rose-200 px-5 py-[10px] rounded-sm text-2xl flex items-center justify-center cursor-pointer"
              title={
                saved ? "Remove from favorite book" : "Add to favorite book"
              }
              onClick={handleToggleFav}
            >
              {saved ? <IoBookmark /> : <IoBookmarkOutline />}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default FavouritePageCard;
