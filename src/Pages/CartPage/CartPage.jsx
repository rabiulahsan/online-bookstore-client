import { useContext } from "react";
import { CartContext } from "../../Providers/CartProvider";
import StaggerAnimation from "../../Components/StaggerAnimation/StaggerAnimation";
import useAxiosSecure from "../../Hooks/useAxiosSecure/useAxiosSecure";
import useLoggedUser from "../../Hooks/useLoggedUser/useLoggedUser";
import CartRow from "./CartRow";

const CartPage = () => {
  const cart = useContext(CartContext);
  const { cartData, setCartData, isCartLoading } = cart;
  const [axiosSecure] = useAxiosSecure();
  const [loggedUser] = useLoggedUser();

  const handleItemDelete = async (bookId) => {
    try {
      console.log(bookId);
      // Call the API to delete the book
      const response = await axiosSecure.delete(
        `/api/carts/remove/${loggedUser?._id}/${bookId}`
      );
      console.log("Delete response:", response.data.items);

      if (response.status === 200) {
        // Update the state to reflect the deletion
        setCartData(response?.data.items);
      } else {
        console.error("Failed to delete the book");
      }
    } catch (error) {
      console.error("Error deleting the book:", error);
    }
  };

  console.log(cartData);
  return (
    <div className="bg-slate-100 px-[12%] py-[5%]">
      <div className="flex items-center justify-center py-[2%] gap-x-[2%]">
        <span className="flex-grow h-[3px] bg-gradient-to-r from-transparent to-rose-500"></span>
        <span className="font-bold text-3xl mx-4 bg-gradient-to-r from-rose-600 via-pink-500 to-slate-600 bg-clip-text text-transparent">
          <StaggerAnimation text={"All of Your Cart Items"}></StaggerAnimation>
        </span>
        <span className="flex-grow h-[3px] bg-gradient-to-r from-rose-600 to-transparent"></span>
      </div>

      {isCartLoading ? (
        <p className="text-center font-bold text-slate-600 text-xl">
          Loading...
        </p>
      ) : cartData?.length <= 0 ? (
        <p className="text-center font-bold text-slate-600 text-xl">
          You have no items on cart
        </p>
      ) : (
        <div className="my-[3%] mx-[3%] px-[5%] py-[3%] bg-white rounded-[10px]">
          <table className="table-fixed w-full ">
            {/* head */}
            <thead className="border border-t-0 border-l-0 border-r-0 border-b-slate-500 ">
              <tr>
                <th className="py-5">cover</th>
                <th>name</th>
                <th>discount</th>
                <th>price</th>
                <th>delete</th>
              </tr>
            </thead>
            <tbody>
              {cartData?.map((cart) => (
                <CartRow
                  key={cart._id}
                  cart={cart}
                  handleItemDelete={handleItemDelete}
                ></CartRow>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CartPage;
