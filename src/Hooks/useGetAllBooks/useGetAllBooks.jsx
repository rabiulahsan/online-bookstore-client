import { useEffect, useState } from "react";

const useGetAllBooks = () => {
  const [allBooks, setAllBooks] = useState([]);
  const [isAllBookLoading, setisAllBookLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch(
          "https://online-bookstore-server.vercel.app/api/books/getallbooks"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        // Assuming `data` is the array of books
        setAllBooks(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setisAllBookLoading(false);
      }
    };

    fetchBooks();
  }, []);

  return [allBooks, isAllBookLoading];
};

export default useGetAllBooks;
