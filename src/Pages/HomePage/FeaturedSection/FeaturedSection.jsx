import { useEffect, useState } from "react";
import useGetAllBooks from "../../../Hooks/useGetAllBooks/useGetAllBooks";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";

// todo is loading skeleton animation

const FeaturedSection = () => {
  const [allBooks, isLoading] = useGetAllBooks();
  const [featuredBooks, setFeaturedBooks] = useState([]);

  useEffect(() => {
    if (allBooks) {
      const fb = allBooks.filter((book) => book?.featured);
      setFeaturedBooks(fb);
    }
  }, [allBooks]); // Runs whenever `allBooks` changes

  return (
    <div className="py-[5%]">
      <div className="flex items-center justify-center my-[4%] gap-x-[8%]">
        <span className="flex-grow h-[3px] bg-gradient-to-r from-transparent to-rose-600"></span>
        <span className="font-bold text-3xl mx-4 bg-gradient-to-r from-rose-600 via-pink-500 to-slate-600 bg-clip-text text-transparent">
          Featured Books
        </span>
      </div>
      <div className="flex flex-1 items-center justify-between px-[10%] pt-[2%] backdrop-blur-lg">
        {featuredBooks?.slice(0, 4)?.map((book) => (
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
        ))}
      </div>
    </div>
  );
};

export default FeaturedSection;
