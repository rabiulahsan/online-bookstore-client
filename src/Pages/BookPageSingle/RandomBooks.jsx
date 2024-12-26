import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";

/* eslint-disable react/prop-types */
const RandomBooks = ({ book }) => {
  console.log(book);
  return (
    <div className="flex flex-col items-center group" key={book?._id}>
      <Link to={`/books/${book?._id}`}>
        <img
          src={book?.image}
          alt={book?.title}
          className="w-[200px] mx-auto  rounded-xl  shadow-[-8px_8px_12px_rgba(0,0,0,0.6)] transform group-hover:-translate-y-4 transition-transform duration-300"
        />
        <p className="font-bold text-slate-700 text-xl mb-3 mt-4 text-center">
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
  );
};

export default RandomBooks;
