/* eslint-disable react/prop-types */
import { AiOutlineShoppingCart } from "react-icons/ai";
import useLoggedUser from "../../Hooks/useLoggedUser/useLoggedUser";
import useAxiosSecure from "../../Hooks/useAxiosSecure/useAxiosSecure";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const FavPageCartBtn = ({ singleBookData, cartDataId }) => {
  const { title, discount, image, price, bookId } = singleBookData;
  const [loggedUser] = useLoggedUser();
  const [axiosSecure] = useAxiosSecure();
  const [inCart, setInCart] = useState(true); // null to avoid flashing
  console.log(singleBookData);
  // Check if the item is already in the cart
  useEffect(() => {
    if (cartDataId && bookId) {
      const isinCart = cartDataId.includes(bookId);
      setInCart(isinCart); // Set to true or false after the check
    }
  }, [cartDataId, bookId]);

  // Toast helper function
  const showToast = (message, type = "info", position = "top-right") => {
    toast(message, {
      position,
      type,
      autoClose: 5000, // Auto close after 5 seconds
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const handleAddCart = async () => {
    const newPrice =
      parseInt(singleBookData?.discount.split("%"), 10) > 0
        ? (
            singleBookData?.price -
            (singleBookData?.price *
              parseInt(singleBookData?.discount.split("%"), 10)) /
              100
          ).toFixed(2)
        : price;
    const item = {
      bookId: bookId,
      title,
      discount,
      image,
      price: newPrice,
    };

    try {
      if (loggedUser && loggedUser._id) {
        const result = await axiosSecure.post(
          `http://localhost:5000/api/carts/add/${loggedUser._id}`,
          item
        );
        console.log("Item added to cart successfully:", result.data.result);
        setInCart(true); // Update state to reflect item in cart
        showToast("Book has been added to cart successfully!", "success");
      }
    } catch (error) {
      console.log("Error Adding to Cart:", error);
    }
  };

  return (
    <>
      {!inCart ? (
        <button
          onClick={handleAddCart}
          className={`flex items-center gap-x-2 bg-rose-100 text-rose-600 font-bold px-6 py-2 rounded-sm border-2 border-rose-500 hover:bg-rose-200`}
        >
          Add to Cart{" "}
          <AiOutlineShoppingCart className="text-2xl"></AiOutlineShoppingCart>
        </button>
      ) : (
        <p className="font-bold text-sm text-slate-600">
          This item is already in the cart.
        </p>
      )}
    </>
  );
};

export default FavPageCartBtn;
