import { useEffect, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure/useAxiosSecure";
import AdminAllBooksRow from "./AdminAllBooksRow";
import SkeletonTable from "../../../Components/Skeleton/skeletonTable";

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
    <div className="bg-white my-[5%] py-[5%] px-[2%]">
      {isLoading ? (
        <div className="mt-[4%]">
          <SkeletonTable number={4}></SkeletonTable>
        </div>
      ) : allBooks.length === 0 ? (
        <div className="min-h-[500px] flex items-center justify-center">
          <div className="">
            <img src="/nodata.png" alt="" className="w-[300px] mx-auto" />
            <p className="text-center font-bold text-slate-700 text-2xl">
              There is no book
            </p>
          </div>
        </div>
      ) : (
        <div className="my-[3%]   py-[3%] px-[2%] bg-white rounded-[10px] ">
          <p className="font-bold text-2xl text-slate-600 text-center ">
            All Books
          </p>
          <p className="font-semibold text-sm text-slate-600 text-center mt-1 mb-[5%]">
            Total Books : {allBooks?.length}
          </p>
          <table className="table-fixed w-full ">
            {/* head */}
            <thead className="border border-t-0 border-l-0 border-r-0 border-b-slate-500 ">
              <tr>
                <th className="py-5">Cover</th>
                <th>Title</th>
                <th>Author</th>
                <th>Price</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {allBooks?.map((book, i) => (
                <AdminAllBooksRow
                  key={i}
                  book={book}
                  handleBookDelete={handleBookDelete}
                ></AdminAllBooksRow>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminAllBooks;
