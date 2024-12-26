import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";

/* eslint-disable react/prop-types */
const RelatedBook = ({ book }) => {
  // console.log(book);
  return (
    <Link to={`/books/${book?._id}`}>
      <div className="border border-slate-300 flex gap-x-4 rounded-sm px-4 py-2">
        <div className="">
          <img
            src={book.image}
            alt=""
            className="w-[60px] h-[70px] object-cover rounded-sm "
          />
        </div>
        <div className="">
          <p className="font-bold text-slate-700 text-lg">{book.title}</p>
          <p className="text-gray-600 text-sm -mt-1">{book.author[0]}</p>
          <p className="flex items-center gap-x-2">
            <span className="font-semibold flex items-center justify-center">
              {book.rating.average}{" "}
              <FaStar className="text-lg text-yellow-500 pl-1" />
            </span>
            <span>({book.rating.reviews_count})</span>
          </p>
        </div>
      </div>
    </Link>
  );
};

export default RelatedBook;
