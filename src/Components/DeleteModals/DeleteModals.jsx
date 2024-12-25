/* eslint-disable react/prop-types */
import { useEffect, useRef } from "react";
import { FaRegTimesCircle } from "react-icons/fa";

const DeleteModals = ({ showModal, setShowModal, onConfirm, message }) => {
  const modalRef = useRef();

  // Close on 'Escape' key press
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        setShowModal(false);
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [setShowModal]);

  // Close when clicking outside the modal
  const handleOutsideClick = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setShowModal(false);
    }
  };

  if (!showModal) return null;

  return (
    <div
      onClick={handleOutsideClick}
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
    >
      <div
        ref={modalRef}
        className="bg-white pb-7 px-9 pt-12 rounded-xl w-[400px] relative"
      >
        <p className="font-semibold text-slate-600 text-center text-xl mb-7">
          {message || "Are you sure you want to delete this?"}
        </p>
        <button
          className="absolute -top-4 -right-4 text-slate-100 text-3xl bg-rose-500 rounded-full"
          onClick={() => setShowModal(false)}
        >
          <FaRegTimesCircle />
        </button>

        <div className="my-2 flex items-center justify-center gap-x-4">
          <button
            onClick={() => setShowModal(false)}
            className="px-4 py-2 bg-slate-600 hover:bg-slate-700 font-semibold text-white rounded-sm flex items-center justify-center gap-x-2 "
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onConfirm();
              setShowModal(false);
            }}
            className="px-6 py-2 bg-rose-500 hover:bg-rose-600 font-semibold text-white rounded-sm"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModals;
