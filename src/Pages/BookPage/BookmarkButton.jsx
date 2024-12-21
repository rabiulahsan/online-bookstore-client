/* eslint-disable react/prop-types */
import { IoBookmark, IoBookmarkOutline } from "react-icons/io5";

const BookmarkButton = ({ book }) => {
  console.log(book);
  return (
    <div>
      <p
        className="bg-rose-100 hover:bg-rose-200 px-5 py-[10px] rounded-sm text-2xl flex items-center justify-center cursor-pointer"
        title="Add to favourite book"
      >
        <IoBookmarkOutline></IoBookmarkOutline>
      </p>
    </div>
  );
};

export default BookmarkButton;
