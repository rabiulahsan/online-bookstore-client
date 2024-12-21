/* eslint-disable react/prop-types */
import { IoBookmark, IoBookmarkOutline } from "react-icons/io5";
import useLoggedUser from "../../Hooks/useLoggedUser/useLoggedUser";
import useAxiosSecure from "../../Hooks/useAxiosSecure/useAxiosSecure";

const BookmarkButton = ({ book }) => {
  //   console.log(book);
  const [axiosSecure] = useAxiosSecure();
  const [loggedUser] = useLoggedUser();

  const handleAddingtoFav = async (book) => {
    try {
      if (loggedUser && loggedUser._id) {
        const result = await axiosSecure.post(
          `http://localhost:5000/api/favs/add/${loggedUser._id}`,
          book
        );
        console.log("Bookmark added successfully:", result.data.result);
      }
    } catch (error) {
      console.error("Error adding bookmark:", error);
    }
  };

  return (
    <div>
      <p
        className="bg-rose-100 hover:bg-rose-200 px-5 py-[10px] rounded-sm text-2xl flex items-center justify-center cursor-pointer"
        title="Add to favourite book"
        onClick={() => handleAddingtoFav(book)}
      >
        <IoBookmarkOutline></IoBookmarkOutline>
      </p>
    </div>
  );
};

export default BookmarkButton;
