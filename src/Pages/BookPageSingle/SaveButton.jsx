import { useState } from "react";
import { IoBookmark, IoBookmarkOutline } from "react-icons/io5";

const SaveButton = () => {
  const [saved, setSaved] = useState(false);
  return (
    <button
      className="bg-rose-100 text-rose-600 hover:bg-rose-200 text-2xl font-bold rounded-sm px-4 py-2 border-2 border-rose-500"
      title={saved ? "Remove from wishlist book" : "Add to wishlist book"}
    >
      {saved ? <IoBookmark /> : <IoBookmarkOutline />}
    </button>
  );
};

export default SaveButton;
