import { useEffect, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure/useAxiosSecure";
import AdminAllUserRow from "./AdminAllUserRow";

const AdminAllUser = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState([]);
  const [axiosSecure] = useAxiosSecure();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        const response = await axiosSecure.get(`/api/users/getallusers`);

        setUsers(response.data); // Update state with the fetched books
        setIsLoading(false);
      } catch (error) {
        console.error("Error getting author's data: ", error);
      }
    };

    fetchUsers();
  }, [axiosSecure]);

  const handleUserDelete = async (userId) => {
    try {
      // Call the API to delete the book
      const response = await axiosSecure.delete(
        `/api/users/deleteuser/${userId}`
      );
      console.log("Delete response:", response.data);

      if (response.status === 200) {
        // Update the state to reflect the deletion
        setUsers((prevUser) => prevUser.filter((user) => user._id !== userId));
      } else {
        console.error("Failed to delete the author");
      }
    } catch (error) {
      console.error("Error deleting the author:", error);
    }
  };

  console.log(users);
  return (
    <div className="bg-white my-[5%] p-[5%]">
      {isLoading ? (
        <p>Loading...</p>
      ) : users?.length === 0 ? (
        <p className="text-center my-[5%] font-bold text-slate-700 text-2xl">
          There is no User
        </p>
      ) : (
        <div className="my-[3%]   p-[3%] bg-white rounded-[10px] ">
          <p className="font-bold text-2xl text-slate-600 text-center">
            All Users
          </p>
          <table className="table-fixed w-full ">
            {/* head */}
            <thead className="border border-t-0 border-l-0 border-r-0 border-b-slate-500 ">
              <tr>
                <th className="py-5">Image</th>
                <th>Name</th>
                <th>Email</th>
                <th>Created At</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {users?.map((user, i) => (
                <AdminAllUserRow
                  key={i}
                  user={user}
                  handleUserDelete={handleUserDelete}
                ></AdminAllUserRow>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminAllUser;
