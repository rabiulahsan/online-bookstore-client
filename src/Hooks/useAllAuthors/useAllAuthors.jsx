import { useEffect, useState } from "react";

const useAllAuthor = () => {
  const [allAuthor, setAllAuthor] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/authors/getallauthors")
      .then((res) => res.json())
      .then((data) => {
        // Filter Author with verified: true
        const verifiedAuthor = data.filter(
          (doctor) => doctor.verified === true
        );
        setAllAuthor(verifiedAuthor);
        setIsLoading(false);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);
  return [allAuthor, isLoading];
};

export default useAllAuthor;
