/* eslint-disable react/prop-types */
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FaStar } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { IoBookmark, IoBookmarkOutline } from "react-icons/io5";
import useVerifyUser from "../../Hooks/useVerifyUser/useVerifyUser";

const BookPageCard = ({ book }) => {
  const [isUser] = useVerifyUser();
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
          <span
            className="bg-rose-100 hover:bg-rose-200 px-5 py-[10px] rounded-sm text-2xl flex items-center justify-center cursor-pointer"
            title="Add to cart"
          >
            <AiOutlineShoppingCart></AiOutlineShoppingCart>
          </span>
          <span
            className="bg-rose-100 hover:bg-rose-200 px-5 py-[10px] rounded-sm text-2xl flex items-center justify-center cursor-pointer"
            title="Add to favourite book"
          >
            <IoBookmarkOutline></IoBookmarkOutline>
          </span>
        </div>
      )}
    </div>
  );
};

export default BookPageCard;
