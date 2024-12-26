import { FaStarHalfAlt } from "react-icons/fa";
import { FaRegStar, FaStar } from "react-icons/fa6";
import { useLoaderData } from "react-router-dom";
import useVerifyUser from "../../Hooks/useVerifyUser/useVerifyUser";
import BookmarkButton from "../BookPage/BookmarkButton";
import CartButton from "./CartButton";
import useGetCart from "../../Hooks/useGetCart/useGetCart";
import useGetFav from "../../Hooks/useGetFav/useGetFav";
import useGetAllBooks from "../../Hooks/useGetAllBooks/useGetAllBooks";
import RelatedBook from "./RelatedBook";
import RandomBooks from "./RandomBooks";
import { useEffect, useState } from "react";

const BookPageSingle = () => {
  const [allBooks, isAllBookLoading] = useGetAllBooks();
  const singleBookData = useLoaderData();
  const [isUser] = useVerifyUser();
  const [, isCartLoading, cartDataId] = useGetCart();
  const [, isFavLoading, favArray] = useGetFav();
  const [randomBooks, setRandomBooks] = useState([]);

  //for loading
  const isLoading =
    isAllBookLoading || (isUser && (isCartLoading || isFavLoading));

  //related books
  const relatedBooks = allBooks?.filter((book) =>
    book.category.some((cat) => singleBookData.category.includes(cat))
  );

  // Randomly select 4 books from allBooks
  useEffect(() => {
    if (allBooks?.length > 0 && randomBooks.length === 0) {
      // Shuffle and select random books only once
      const books = allBooks
        .sort(() => Math.random() - 0.5) // Shuffle the array randomly
        .slice(0, 4); // Take the first 4 books after shuffling

      setRandomBooks(books);
    }
  }, [randomBooks, allBooks]);
  // console.log(randomBooks);

  return (
    <div className="px-[8%] py-[5%] bg-slate-100">
      {/* upper side  */}
      <div className="flex  gap-x-5">
        {/* upper left side  */}
        <div className="w-[70%]">
          <div className="flex items-center gap-x-5">
            {/* img section  */}
            <div className="w-[45%] relative">
              <img
                src={singleBookData?.image}
                alt={singleBookData?.title}
                className="object-cover w-[200px] h-auto mx-auto  rounded-xl  shadow-[-6px_6px_8px_rgba(0,0,0,0.6)]"
              />
              {parseInt(singleBookData?.discount.split("%"), 10) > 0 && (
                <p className="absolute bg-rose-500 text-white font-bold  px-4 py-2 rounded-sm top-3 right-[16%]">
                  {singleBookData?.discount}
                </p>
              )}
            </div>
            {/* details section  */}
            <div className="w-[55%]  ">
              <p className="text-slate-700 font-bold text-2xl">
                {singleBookData?.title}
              </p>
              <p className="text-gray-600 mt-2 mb-4">
                By {singleBookData?.author} ||{" "}
                {singleBookData?.publication_date
                  ? new Date(
                      singleBookData.publication_date
                    ).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                    })
                  : "N/A"}
              </p>

              <p className="flex items-center gap-x-2  mb-4">
                {singleBookData?.rating.average}
                <span className="flex">
                  {Array.from({ length: 5 }).map((_, i) => {
                    const rating = singleBookData?.rating.average || 0;
                    const fullStar = i < Math.floor(rating);
                    const halfStar = rating - i >= 0.5 && rating - i < 1;

                    return fullStar ? (
                      <FaStar key={i} className="text-lg text-yellow-500" />
                    ) : halfStar ? (
                      <FaStarHalfAlt
                        key={i}
                        className="text-lg text-yellow-500"
                      />
                    ) : (
                      <FaRegStar key={i} className="text-lg text-slate-400" />
                    );
                  })}
                </span>
                ({singleBookData?.rating?.reviews_count})
              </p>
              <div className=" flex items-center gap-x-3">
                {singleBookData?.category?.map((cat, i) => (
                  <p
                    key={i}
                    className="bg-rose-200 rounded-sm px-3 py-1 text-rose-600 font-semibold  my-3"
                  >
                    {cat}
                  </p>
                ))}
              </div>
              <div className="flex items-center gap-x-3 ">
                {singleBookData?.tags?.map((tag, i) => (
                  <p
                    key={i}
                    className="bg-rose-200 rounded-sm px-3 py-1 text-rose-600 font-semibold"
                  >
                    {tag}
                  </p>
                ))}
              </div>

              <p className="text-gray-600 my-5">
                {singleBookData?.description.slice(0, 160)}....
              </p>
              <div className="">
                {parseInt(singleBookData?.discount.split("%"), 10) > 0 ? (
                  <>
                    <span className="line-through text-slate-500 font-semibold text-lg mr-2">
                      ${singleBookData?.price}
                    </span>{" "}
                    <span className="text-slate-700 font-bold text-2xl">
                      $
                      {(
                        singleBookData?.price -
                        (singleBookData?.price *
                          parseInt(singleBookData?.discount.split("%"), 10)) /
                          100
                      ).toFixed(2)}
                    </span>
                  </>
                ) : (
                  <span className="text-slate-700 font-bold text-2xl">
                    ${singleBookData?.price}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-x-4 mt-5">
                {/* if user then only display this button */}
                {isLoading ? (
                  <p className="text-center font-bold text-slate-600">
                    Loading....
                  </p>
                ) : (
                  isUser && (
                    <div className="text-rose-600 font-bold flex items-center justify-center gap-x-3 my-3">
                      <CartButton
                        singleBookData={singleBookData}
                        cartDataId={cartDataId}
                      />
                      <BookmarkButton
                        book={singleBookData}
                        favArray={favArray}
                      />
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
          {/* description part  */}
          <div className="w-full  "></div>
        </div>
        {/* upper right side  */}
        <div className="w-[30%] ">
          <p className="text-center font-bold text-slate-600 text-xl mb-5">
            Related Books
          </p>
          <div className="flex flex-col gap-y-4">
            {relatedBooks?.slice(0, 5).map((book, i) => (
              <RelatedBook key={i} book={book}></RelatedBook>
            ))}
          </div>
        </div>
      </div>

      {/* lower side */}
      <div className="">
        <div className="flex items-center justify-center py-[4%] gap-x-[8%]">
          <span className="flex-grow h-[3px] bg-gradient-to-r from-transparent to-rose-600"></span>
          <span className="font-bold text-3xl mx-4 bg-gradient-to-r from-rose-600 via-pink-500 to-slate-600 bg-clip-text text-transparent">
            Frequently Bought Together
          </span>
        </div>
        <div className="flex items-center justify-between px-[5%]">
          {randomBooks?.map((book, i) => (
            <RandomBooks book={book} key={i}></RandomBooks>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookPageSingle;
