import { useEffect, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure/useAxiosSecure";
import useLoggedUser from "../../../Hooks/useLoggedUser/useLoggedUser";

const AuthorMybook = () => {
  const [myBook, setMybook] = useState([]);
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
          setMybook(response.data.data); // Update state with the fetched books
          setIsloading(false);
        }
      } catch (error) {
        console.error("Error getting author's book data: ", error);
      }
    };

    fetchBooks();
  }, [loggedUser, axiosSecure]);

  console.log(myBook);
  return (
    <div className="bg-white my-[5%] p-[5%]">
      <p className="font-bold text-xl text-slate-500">All Books</p>
    </div>
  );
};

export default AuthorMybook;
