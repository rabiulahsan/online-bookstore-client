import { AiOutlineShoppingCart } from "react-icons/ai";
import useLoggedUser from "../../Hooks/useLoggedUser/useLoggedUser";
import useAxiosSecure from "../../Hooks/useAxiosSecure/useAxiosSecure";
import { useState } from "react";

/* eslint-disable react/prop-types */
const CartButton = ({ singleBookData }) => {
  const { title, discount, image, price, _id } = singleBookData;
  const [loggedUser] = useLoggedUser();
  const [axiosSecure] = useAxiosSecure();

  const [cart, setCart] = useState(null);
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
          `http://localhost:5000/api/carts/add/${loggedUser._id}`,
          item
        );
        console.log("Item added to cart successfully:", result.data.result);
        setCart(true); // Update state to true
      }
    } catch (error) {
      console.error("Error Adding to Cart:", error);
    }
  };
  return (
    <button
      onClick={handleAddCart}
      disabled={cart}
      className="flex items-center gap-x-2 bg-rose-100 text-rose-600 font-bold px-6 py-2 rounded-sm border-2 border-rose-500 hover:bg-rose-200"
    >
      Add to Cart{" "}
      <AiOutlineShoppingCart className="text-2xl"></AiOutlineShoppingCart>
    </button>
  );
};

export default CartButton;
