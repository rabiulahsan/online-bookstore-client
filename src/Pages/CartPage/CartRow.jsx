import { ImBin } from "react-icons/im";

/* eslint-disable react/prop-types */
const CartRow = ({ cart, handleItemDelete }) => {
  // console.log(cart);
  return (
    <tr className="hover:bg-gray-200 w-full text-center  ">
      <td className="py-5 font-semibold">
        <img
          src={cart?.image}
          alt={cart?.title}
          className="h-[60px] w-[60px] object-contain"
        />
      </td>
      <td className="font-bold">{cart?.title}</td>
      <td className="font-semibold">{cart?.discount}</td>
      <td className="font-bold">{cart?.price} $</td>
      <td className="">
        <span
          onClick={() => handleItemDelete(cart?.bookId)}
          className="w-16 py-2 mx-auto flex items-center justify-center  bg-rose-500 hover:bg-rose-600 text-white font-semibold rounded-sm cursor-pointer"
        >
          <ImBin className="text-xl" />
        </span>
      </td>
    </tr>
  );
};

export default CartRow;
