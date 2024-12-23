import { useContext } from "react";
import { CartContext } from "../../Providers/CartProvider";
import StaggerAnimation from "../../Components/StaggerAnimation/StaggerAnimation";
import { ImBin } from "react-icons/im";
import useAxiosSecure from "../../Hooks/useAxiosSecure/useAxiosSecure";
import useLoggedUser from "../../Hooks/useLoggedUser/useLoggedUser";

const CartPage = () => {
  const cart = useContext(CartContext);
  const { cartData, setCartData, isCartLoading } = cart;
  const [axiosSecure] = useAxiosSecure();
  const [loggedUser] = useLoggedUser();

  const handleItemDelete = async (bookId) => {
    try {
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
        <div className=" flex flex-col gap-y-4">
          {cartData?.map((cart, i) => (
            <div
              className=" flex items-center justify-between px-[5%] py-5 bg-white rounded-sm"
              key={i}
            >
              <img
                src={cart?.image}
                alt=""
                className="w-[50px] h-[50px] rounded-sm border-2 border-slate-600"
              />
              <p>{cart?.title}</p>
              <p>{cart?.discount}</p>
              <p>
                $
                {(
                  cart?.price -
                  (cart?.price * parseInt(cart?.discount.split("%"), 10)) / 100
                ).toFixed(2)}
              </p>
              <p
                onClick={() => handleItemDelete(cart?.bookId)}
                className="flex items-center gap-x-2 bg-rose-500 hover:bg-rose-600 text-white font-semibold px-4 py-2 rounded-sm cursor-pointer mt-4"
              >
                <span>
                  <ImBin className="text-xl"></ImBin>
                </span>
                Delete
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CartPage;
