import { useEffect, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure/useAxiosSecure";

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
  return <div></div>;
};

export default AdminAllBooks;
