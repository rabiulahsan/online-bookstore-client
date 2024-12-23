import { useEffect, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure/useAxiosSecure";
import useLoggedUser from "../../../Hooks/useLoggedUser/useLoggedUser";
import { FaStar } from "react-icons/fa";
import { ImBin } from "react-icons/im";

const AuthorMybook = () => {
  const [myBooks, setMybooks] = useState([]);
  const [isloading, setIsloading] = useState(true);
  const [axiosSecure] = useAxiosSecure();
  const [loggedUser] = useLoggedUser();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        if (loggedUser?._id) {
          setIsloading(true);
          const response = await axiosSecure.get(
            `/api/books/getbook/${loggedUser._id}`
          );
          // console.log("Fetched books:", response.data.data);
          setMybooks(response.data.data); // Update state with the fetched books
          setIsloading(false);
        }
      } catch (error) {
        console.error("Error getting author's book data: ", error);
      }
    };

    fetchBooks();
  }, [loggedUser, axiosSecure]);

  const handleBookDelete = async (bookId) => {
    try {
      // Call the API to delete the book
      const response = await axiosSecure.delete(
        `/api/books/deletebook/${bookId}`
      );
      console.log("Delete response:", response.data);

      if (response.status === 200) {
        // Update the state to reflect the deletion
        setMybooks((prevBooks) =>
          prevBooks.filter((book) => book._id !== bookId)
        );
      } else {
        console.error("Failed to delete the book");
      }
    } catch (error) {
      console.error("Error deleting the book:", error);
    }
  };

  console.log(myBooks);
  return (
    <div className="bg-white my-[5%] p-[5%]">
      <p className="font-bold text-xl text-slate-500">All Books</p>
      {isloading ? (
        <p>Loading...</p>
      ) : myBooks.length <= 0 ? (
        <p className="text-center my-[5%] font-bold text-slate-700 text-2xl">
          You have no Book
        </p>
      ) : (
        <div className="grid  gap-y-12 gap-x-4 grid-cols-1 lg:grid-cols-3 px-[5%] my-[4%] ">
          {myBooks?.map((book) => (
            <div className="flex flex-col items-center group" key={book?._id}>
              <div className="relative">
                <img
                  src={book?.image}
                  alt={book?.title}
                  className=" w-[200px]  rounded-xl  shadow-[-8px_8px_12px_rgba(0,0,0,0.6)] transform group-hover:-translate-y-4 transition-transform duration-300"
                />
                {parseInt(book?.discount.split("%"), 10) > 0 && (
                  <p className="absolute bg-rose-500 text-white font-bold  px-4 py-2 rounded-sm top-3 -right-8">
                    {book?.discount}
                  </p>
                )}
              </div>
              <p className="font-bold text-slate-700 text-xl mb-3 mt-4">
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
              <div className="flex items-center justify-center">
                <p
                  onClick={() => handleBookDelete(book?._id)}
                  className="flex items-center gap-x-2 bg-rose-500 hover:bg-rose-600 text-white font-semibold px-4 py-2 rounded-sm cursor-pointer mt-4"
                >
                  <span>
                    <ImBin className="text-xl"></ImBin>
                  </span>
                  Delete
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AuthorMybook;
