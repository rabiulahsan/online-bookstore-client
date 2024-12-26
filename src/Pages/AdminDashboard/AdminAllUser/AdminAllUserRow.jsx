/* eslint-disable react/prop-types */
import { ImBin } from "react-icons/im";
import DeleteModals from "../../../Components/DeleteModals/DeleteModals";
import { useState } from "react";

const AdminAllUserRow = ({ user, handleUserDelete }) => {
  const [showModal, setShowModal] = useState(false);
  //   console.log(user);

  // Function to delete user when confirmed
  const handleConfirmDelete = () => {
    handleUserDelete(user._id);
  };
  return (
    <>
      <tr className="bg-slate-100 hover:bg-slate-200 w-full text-sm text-center border-t border-slate-400">
        <td className="py-3 font-semibold">
          <img
            src={user.image}
            alt={user.name}
            className="h-[50px] w-[50px] object-contain mx-auto rounded-full"
          />
        </td>
        <td className="font-bold">{user?.name}</td>
        <td className="font-bold">{user?.email}</td>

        <td>
          {new Date(user.createdAt).toLocaleDateString("en-US", {
            month: "short",
            day: "2-digit",
            year: "numeric",
          })}
        </td>

        <td>
          <span
            onClick={() => setShowModal(true)}
            className="mx-auto w-16 py-2 flex items-center justify-center bg-rose-500 hover:bg-rose-600 text-white rounded cursor-pointer"
          >
            <ImBin className="text-xl" />
          </span>
        </td>
      </tr>

      {/* Delete Modal */}
      <DeleteModals
        showModal={showModal}
        setShowModal={setShowModal}
        onConfirm={handleConfirmDelete}
        message={`Are you sure you want to delete "${user.name}"?`}
      />
    </>
  );
};

export default AdminAllUserRow;
