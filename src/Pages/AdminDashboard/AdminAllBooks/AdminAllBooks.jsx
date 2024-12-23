import { useEffect, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure/useAxiosSecure";
import { ImBin } from "react-icons/im";

const AdminAllBooks = () => {
  const [allBooks, setAllBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [axiosSecure] = useAxiosSecure();
  console.log(allBooks);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setIsLoading(true);
        const response = await axiosSecure.get(`/api/books/getallbooks`);

        setAllBooks(response.data); // Update state with the fetched books
        setIsLoading(false);
      } catch (error) {
        console.error("Error getting author's data: ", error);
      }
    };

    fetchBooks();
  }, [axiosSecure]);

  const handleBookDelete = async (bookId) => {
    try {
      // Call the API to delete the book
      const response = await axiosSecure.delete(
        `/api/books/deletebook/${bookId}`
      );
      console.log("Delete response:", response.data);

      if (response.status === 200) {
        // Update the state to reflect the deletion
        setAllBooks((prevBook) =>
          prevBook.filter((book) => book._id !== bookId)
        );
      } else {
        console.error("Failed to delete the author");
      }
    } catch (error) {
      console.error("Error deleting the author:", error);
    }
  };

  return (
    <div className="bg-white my-[5%] p-[5%]">
      <p className="font-bold text-xl text-slate-500">All Books</p>
      {isLoading ? (
        <p>Loading...</p>
      ) : allBooks.length === 0 ? (
        <p className="text-center my-[5%] font-bold text-slate-700 text-2xl">
          There is no Book
        </p>
      ) : (
        <div className="flex flex-col gap-y-5 px-[5%] my-[4%] ">
          {allBooks?.map((book, i) => (
            <div
              className=" bg-slate-100 flex justify-between items-center px-[5%] py-[2%]"
              key={i}
            >
              <img
                src={book?.image}
                alt={book?.title}
                className="w-[40px] h-[40px] rounded-full border-3 border-slate-600 object-cover"
              />
              <p>{book?.title}</p>
              <p>{book?.price}</p>
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
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminAllBooks;
