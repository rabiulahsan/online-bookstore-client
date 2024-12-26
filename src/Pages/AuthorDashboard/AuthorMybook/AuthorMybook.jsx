import { useEffect, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure/useAxiosSecure";
import useLoggedUser from "../../../Hooks/useLoggedUser/useLoggedUser";
import AuthorMybookRow from "./AuthorMybookRow";
import SkeletonTable from "../../../Components/Skeleton/skeletonTable";

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
      <p className="font-bold text-2xl text-slate-600 text-center">All Books</p>
      {isloading ? (
        <div className="mt-[4%]">
          <SkeletonTable number={4}></SkeletonTable>
        </div>
      ) : myBooks.length == 0 ? (
        <div className="min-h-[500px] flex items-center justify-center">
          <div className="">
            <img src="/nodata.png" alt="" className="w-[300px] mx-auto" />
            <p className="text-center font-bold text-slate-700 text-2xl">
              You have no Book
            </p>
          </div>
        </div>
      ) : (
        <div className="my-[3%]   p-[3%] bg-white rounded-[10px] ">
          <table className="table-fixed w-full ">
            {/* head */}
            <thead className="border border-t-0 border-l-0 border-r-0 border-b-slate-500 ">
              <tr>
                <th className="py-5">Cover</th>
                <th>Name</th>
                <th>Price</th>
                <th>Discount</th>
                <th>Rating</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {myBooks?.map((book) => (
                <AuthorMybookRow
                  key={book._id}
                  book={book}
                  handleBookDelete={handleBookDelete}
                ></AuthorMybookRow>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AuthorMybook;
