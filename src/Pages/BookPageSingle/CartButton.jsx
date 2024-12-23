import { AiOutlineShoppingCart } from "react-icons/ai";
import useLoggedUser from "../../Hooks/useLoggedUser/useLoggedUser";
import useAxiosSecure from "../../Hooks/useAxiosSecure/useAxiosSecure";
import { useEffect, useState } from "react";
import useGetCart from "../../Hooks/useGetCart/useGetCart";

/* eslint-disable react/prop-types */
const CartButton = ({ singleBookData }) => {
  const { title, discount, image, price, _id } = singleBookData;
  const [loggedUser] = useLoggedUser();
  const [axiosSecure] = useAxiosSecure();
  const [inCart, setInCart] = useState(true); // null to avoid flashing
  const [cartData, isCartLoading] = useGetCart();

  // Check if item is already in the cart
  useEffect(() => {
    const isinCart = cartData?.some((cart) => cart.bookId === _id);
    setInCart(isinCart); // Set to true or false after loading
  }, [cartData, isCartLoading, _id]);

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
      bookId: _id,
      title,
      discount,
      image,
      price: newPrice,
    };

    try {
      if (loggedUser && loggedUser._id) {
        const result = await axiosSecure.post(
          `https://online-bookstore-server.vercel.app/api/carts/add/${loggedUser._id}`,
          item
        );
        console.log("Item added to cart successfully:", result.data.result);
        setInCart(true); // Update state to reflect item in cart
      }
    } catch (error) {
      console.log("Error Adding to Cart:", error);
    }
  };

  return (
    <div>
      {isCartLoading ? (
        <p>Loading...</p> // Show loading message while checking
      ) : !inCart ? (
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
    </div>
  );
};

export default CartButton;
