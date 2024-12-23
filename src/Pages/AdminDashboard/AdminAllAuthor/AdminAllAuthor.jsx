import { useEffect, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure/useAxiosSecure";

const AdminAllAuthor = () => {
  const [allAuthors, setAllAuthors] = useState([]);
  const [isallAuthorsLoading, setIsallAuthorsLoading] = useState(true);
  const [axiosSecure] = useAxiosSecure();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setIsallAuthorsLoading(true);
        const response = await axiosSecure.get(`/api/authors/getallauthors`);

        setAllAuthors(response.data); // Update state with the fetched books
        setIsallAuthorsLoading(false);
      } catch (error) {
        console.error("Error getting author's data: ", error);
      }
    };

    fetchBooks();
  }, [axiosSecure]);

  console.log(allAuthors);
  return (
    <div className="bg-white my-[5%] p-[5%]">
      <p className="font-bold text-xl text-slate-500">All Books</p>
      {isallAuthorsLoading ? (
        <p>Loading...</p>
      ) : allAuthors.length <= 0 ? (
        <p className="text-center my-[5%] font-bold text-slate-700 text-2xl">
          There is no author
        </p>
      ) : (
        <div className="flex flex-col gap-y-5 px-[5%] my-[4%] ">
          {allAuthors?.map((author, i) => (
            <div className=" bg-slate-100 " key={i}>
              <img
                src={author?.image}
                alt={author?.name}
                className="w-[40px] h-[40px] rounded-full border-3 border-slate-600 object-cover"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminAllAuthor;
