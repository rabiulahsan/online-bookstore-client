/* eslint-disable react/prop-types */
import { FaStar } from "react-icons/fa";
import { ImBin } from "react-icons/im";
import { FaRegEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import DeleteModals from "../../../Components/DeleteModals/DeleteModals";
import { useState } from "react";

const AuthorMybookRow = ({ book, handleBookDelete }) => {
  const [showModal, setShowModal] = useState(false);

  // Function to delete book when confirmed
  const handleConfirmDelete = () => {
    handleBookDelete(book._id);
  };

  return (
    <>
      <tr className="bg-slate-100 hover:bg-slate-200 w-full text-center border-t border-slate-400">
        <td className="py-3 font-semibold">
          <Link to={`/books/${book._id}`}>
            <img
              src={book.image}
              alt={book.title}
              className="h-[50px] w-[50px] object-contain mx-auto"
            />
          </Link>
        </td>
        <td className="font-bold">
          <Link to={`/books/${book._id}`} className="hover:underline">
            {book.title}
          </Link>
        </td>
        <td className="font-bold">{book.price} $</td>
        <td className="font-semibold">{book.discount}</td>
        <td>
          <span className="font-semibold flex items-center justify-center">
            {book.rating.average} <FaStar className="text-lg text-yellow-500" />
          </span>
        </td>
        <td>
          <Link to={`/dashboard/author/updatebook/${book._id}`}>
            <span className="w-16 py-2 flex items-center justify-center bg-slate-600 hover:bg-slate-700 text-white rounded cursor-pointer">
              <FaRegEdit className="text-xl" />
            </span>
          </Link>
        </td>
        <td>
          <span
            onClick={() => setShowModal(true)}
            className="w-16 py-2 flex items-center justify-center bg-rose-500 hover:bg-rose-600 text-white rounded cursor-pointer"
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

export default AuthorMybookRow;
