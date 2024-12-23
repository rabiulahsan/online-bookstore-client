import { useEffect, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure/useAxiosSecure";
import { ImBin } from "react-icons/im";

const AdminAllAuthor = () => {
  const [allAuthors, setAllAuthors] = useState([]);
  const [isallAuthorsLoading, setIsallAuthorsLoading] = useState(true);
  const [axiosSecure] = useAxiosSecure();
  console.log(allAuthors);

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        setIsallAuthorsLoading(true);
        const response = await axiosSecure.get(`/api/authors/getallauthors`);

        setAllAuthors(response.data); // Update state with the fetched books
        setIsallAuthorsLoading(false);
      } catch (error) {
        console.error("Error getting author's data: ", error);
      }
    };

    fetchAuthors();
  }, [axiosSecure]);

  const handleAuthorDelete = async (authorId) => {
    try {
      // Call the API to delete the book
      const response = await axiosSecure.delete(
        `/api/authors/deleteauthor/${authorId}`
      );
      console.log("Delete response:", response.data);

      if (response.status === 200) {
        // Update the state to reflect the deletion
        setAllAuthors((prevAuthor) =>
          prevAuthor.filter((author) => author._id !== authorId)
        );
      } else {
        console.error("Failed to delete the author");
      }
    } catch (error) {
      console.error("Error deleting the author:", error);
    }
  };

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
            <div
              className=" bg-slate-100 flex justify-between items-center px-[5%] py-[2%]"
              key={i}
            >
              <img
                src={author?.image}
                alt={author?.name}
                className="w-[40px] h-[40px] rounded-full border-3 border-slate-600 object-cover"
              />
              <p>{author?.name}</p>
              <p>{author?.email}</p>
              <p
                onClick={() => handleAuthorDelete(author?._id)}
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

export default AdminAllAuthor;
