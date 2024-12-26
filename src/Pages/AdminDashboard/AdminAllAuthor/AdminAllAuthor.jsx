import { useEffect, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure/useAxiosSecure";
import AdminAllAuthorRow from "./AdminAllAuthorRow";

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
    <div className="bg-white my-[5%] py-[5%] px-[2%]">
      {isallAuthorsLoading ? (
        <p>Loading...</p>
      ) : allAuthors.length === 0 ? (
        <p className="text-center my-[5%] font-bold text-slate-700 text-2xl">
          There is no author
        </p>
      ) : (
        <div className="my-[3%]   py-[3%] px-[2%] bg-white rounded-[10px] ">
          <p className="font-bold text-2xl text-slate-600 text-center ">
            All Authors
          </p>
          <p className="font-semibold text-sm text-slate-600 text-center mt-1 mb-[5%]">
            Total Authors : {allAuthors?.length}
          </p>
          <table className="table-fixed w-full ">
            {/* head */}
            <thead className="border border-t-0 border-l-0 border-r-0 border-b-slate-500 ">
              <tr>
                <th className="py-5">Image</th>
                <th>Name</th>
                <th>Status</th>
                <th>Created At</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {allAuthors?.map((author, i) => (
                <AdminAllAuthorRow
                  key={i}
                  author={author}
                  handleAuthorDelete={handleAuthorDelete}
                ></AdminAllAuthorRow>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminAllAuthor;
