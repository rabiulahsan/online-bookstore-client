/* eslint-disable react/prop-types */
import { FaStar } from "react-icons/fa";
import { ImBin } from "react-icons/im";
import { FaRegEdit } from "react-icons/fa";
import { Link } from "react-router-dom";

const AuthorMybookRow = ({ book, handleBookDelete }) => {
  return (
    <tr className="bg-slate-100 hover:bg-slate-200 w-full text-center border-t border-slate-400">
      <td className="py-3 font-semibold">
        <Link to={`/books/${book?._id}`}>
          <img
            src={book?.image}
            alt={book?.title}
            className="h-[50px] w-[50px] object-contain mx-auto"
          />
        </Link>
      </td>
      <td className="font-bold">
        <Link to={`/books/${book?._id}`} className="hover:underline">
          {book?.title}
        </Link>
      </td>
      <td className="font-bold">{book?.price} $</td>
      <td className="font-semibold">{book?.discount}</td>
      <td className="">
        <span className="font-semibold flex items-center justify-center">
          {book?.rating?.average} <FaStar className="text-lg text-yellow-500" />
        </span>
      </td>
      <td className="">
        <span
          onClick={() => handleBookDelete(book?._id)}
          className="w-16 py-2 mx-auto flex items-center justify-center bg-slate-600 hover:bg-slate-700 text-white font-semibold rounded-sm cursor-pointer"
        >
          <FaRegEdit className="text-xl" />
        </span>
      </td>
      <td className="">
        <span
          onClick={() => handleBookDelete(book?._id)}
          className="w-16 py-2 mx-auto flex items-center justify-center bg-rose-500 hover:bg-rose-600 text-white font-semibold rounded-sm cursor-pointer"
        >
          <ImBin className="text-xl" />
        </span>
      </td>
    </tr>
  );
};

export default AuthorMybookRow;
