import { useEffect, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure/useAxiosSecure";
import { ImBin } from "react-icons/im";

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
      <p className="font-bold text-xl text-slate-500">All Books</p>
      {isLoading ? (
        <p>Loading...</p>
      ) : users?.length === 0 ? (
        <p className="text-center my-[5%] font-bold text-slate-700 text-2xl">
          There is no User
        </p>
      ) : (
        <div className="flex flex-col gap-y-5 px-[5%] my-[4%] ">
          {users?.map((user, i) => (
            <div
              className=" bg-slate-100 flex justify-between items-center px-[5%] py-[2%]"
              key={i}
            >
              <img
                src={user?.image}
                alt={user?.name}
                className="w-[40px] h-[40px] rounded-full border-3 border-slate-600 object-cover"
              />
              <p>{user?.name}</p>
              <p>{user?.email}</p>
              <p
                onClick={() => handleUserDelete(user?._id)}
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

export default AdminAllUser;
