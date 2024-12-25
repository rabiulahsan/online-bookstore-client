import { FaStarHalfAlt } from "react-icons/fa";
import { FaRegStar, FaStar } from "react-icons/fa6";
import { useLoaderData } from "react-router-dom";
import CartButton from "./CartButton";
import SaveButton from "./SaveButton";
import useVerifyAuthor from "../../Hooks/useVerifyAuthor/useVerifyAuthor";
import useVerifyUser from "../../Hooks/useVerifyUser/useVerifyUser";

const BookPageSingle = () => {
  const singleBookData = useLoaderData();
  const [isUser] = useVerifyUser();
  const [isAuthor] = useVerifyAuthor();

  // const [saved, setSaved] = useState(false);
  // console.log(singleBookData);
  return (
    <div className="px-[8%] py-[5%] bg-slate-100">
      {/* upper side  */}
      <div className="flex items-center gap-x-5">
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
                {isUser && (
                  <CartButton singleBookData={singleBookData}></CartButton>
                )}

                {(isUser || isAuthor) && <SaveButton></SaveButton>}
              </div>
            </div>
          </div>
          <div className="w-full  "></div>
        </div>
        {/* upper right side  */}
        <div className="w-[30%] "></div>
      </div>

      {/* lower side */}
      <div className=""></div>
    </div>
  );
};

export default BookPageSingle;
