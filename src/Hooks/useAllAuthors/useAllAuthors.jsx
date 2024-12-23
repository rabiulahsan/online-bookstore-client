import { useEffect, useState } from "react";

const useAllAuthors = () => {
  const [allAuthor, setAllAuthor] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(
      "https://online-bookstore-server.vercel.app/api/authors/getallauthors"
    )
      .then((res) => res.json())
      .then((data) => {
        // Filter Author with verified: true
        const verifiedAuthor = data.filter(
          (author) => author.verified === true
        );
        setAllAuthor(verifiedAuthor);
        setIsLoading(false);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);
  return [allAuthor, isLoading];
};

export default useAllAuthors;
