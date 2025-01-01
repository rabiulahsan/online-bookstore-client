import { useEffect, useState } from "react";
import useLoggedUser from "../../../Hooks/useLoggedUser/useLoggedUser";
import useAxiosSecure from "../../../Hooks/useAxiosSecure/useAxiosSecure";

const AuthorDashboard = () => {
  const [myBooks, setMybooks] = useState([]);
  const [loggedUser] = useLoggedUser();
  const [axiosSecure] = useAxiosSecure();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        if (loggedUser?._id) {
          const response = await axiosSecure.get(
            `/api/books/getbook/${loggedUser._id}`
          );
          // console.log("Fetched books:", response.data.data);
          setMybooks(response.data.data); // Update state with the fetched books
        }
      } catch (error) {
        console.error("Error getting author's book data: ", error);
      }
    };

    fetchBooks();
  }, [loggedUser, axiosSecure]);
  return (
    <div className="my-[5%]  px-[8%] py-[5%] bg-white flex justify-center items-center">
      <div className="">
        <p className="font-bold text-4xl text-slate-700 text-center mb-[8%]">
          Welcome to Dashboard !
        </p>
        <p className="font-semibold text-xl text-slate-600 text-center">
          {loggedUser?.name}
        </p>
        <p className="font-semibold  text-slate-600 text-center">
          {loggedUser?.email}
        </p>
        <p className="text-center font-semibold text-slate-600">
          Total Books : {myBooks?.length > 0 ? myBooks?.length : "0"}
        </p>
      </div>
    </div>
  );
};

export default AuthorDashboard;
