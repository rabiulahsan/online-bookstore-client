/* eslint-disable react/prop-types */
import { ImBin } from "react-icons/im";
import DeleteModals from "../../../Components/DeleteModals/DeleteModals";
import { useState } from "react";

const AdminAllAuthorRow = ({ author, handleAuthorDelete }) => {
  const [showModal, setShowModal] = useState(false);
  console.log(author);

  // Function to delete author when confirmed
  const handleConfirmDelete = () => {
    handleAuthorDelete(author._id);
  };
  return (
    <>
      <tr className="bg-slate-100 hover:bg-slate-200 w-full text-center border-t border-slate-400">
        <td className="py-3 font-semibold">
          <img
            src={author.image}
            alt={author.name}
            className="h-[50px] w-[50px] object-contain mx-auto rounded-full"
          />
        </td>
        <td className="font-bold">{author?.name}</td>

        <td
          className={`font-bold ${
            author?.verified === true
              ? "text-green-500"
              : author?.verified === false
              ? "text-red-500"
              : author?.verified === "pending"
              ? "text-yellow-500"
              : "text-gray-500"
          }`}
        >
          {author?.verified === true
            ? "Verified"
            : author?.verified === false
            ? "Not Verified"
            : author?.verified === "pending"
            ? "Pending"
            : "unknown"}
        </td>

        <td>
          {new Date(author.createdAt || "2024-12-20").toLocaleDateString(
            "en-US",
            {
              month: "short",
              day: "2-digit",
              year: "numeric",
            }
          )}
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
        message={`Are you sure you want to delete "${author.name}"?`}
      />
    </>
  );
};

export default AdminAllAuthorRow;
