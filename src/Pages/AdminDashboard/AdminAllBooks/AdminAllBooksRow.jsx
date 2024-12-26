/* eslint-disable react/prop-types */
import { useState } from "react";
import DeleteModals from "../../../Components/DeleteModals/DeleteModals";
import { ImBin } from "react-icons/im";

const AdminAllBooksRow = ({ book, handleBookDelete }) => {
  const [showModal, setShowModal] = useState(false);
  console.log(book);

  // Function to delete book when confirmed
  const handleConfirmDelete = () => {
    handleBookDelete(book._id);
  };
  return (
    <>
      <tr className="bg-slate-100 text-sm hover:bg-slate-200 w-full text-center border-t border-slate-400">
        <td className="py-3 font-semibold">
          <img
            src={book.image}
            alt={book.title}
            className="h-[50px] w-[50px] object-contain mx-auto "
          />
        </td>
        <td className="font-bold">{book?.title}</td>
        <td className="font-bold">{book?.author[0]}</td>

        <td>{book?.price}</td>

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
        message={`Are you sure you want to delete "${book.title}"?`}
      />
    </>
  );
};

export default AdminAllBooksRow;
