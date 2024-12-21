/* eslint-disable react/prop-types */
import { AiOutlineShoppingCart } from "react-icons/ai";

const CartButton = ({ book }) => {
  console.log(book);
  return (
    <div>
      <p
        className="bg-rose-100 hover:bg-rose-200 px-5 py-[10px] rounded-sm text-2xl flex items-center justify-center cursor-pointer"
        title="Add to cart"
      >
        <AiOutlineShoppingCart></AiOutlineShoppingCart>
      </p>
    </div>
  );
};

export default CartButton;
