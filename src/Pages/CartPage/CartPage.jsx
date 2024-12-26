import { useEffect, useState } from "react";
import StaggerAnimation from "../../Components/StaggerAnimation/StaggerAnimation";
import useAxiosSecure from "../../Hooks/useAxiosSecure/useAxiosSecure";
import useLoggedUser from "../../Hooks/useLoggedUser/useLoggedUser";
import CartRow from "./CartRow";
import SkeletonTable from "../../Components/Skeleton/skeletonTable";
import { toast } from "react-toastify";

const CartPage = () => {
  const [axiosSecure] = useAxiosSecure();
  const [loggedUser] = useLoggedUser();

  const [cartData, setCartData] = useState([]);
  const [isCartLoading, setIsCartLoading] = useState(true);
  const [total, setTotal] = useState("0");

  useEffect(() => {
    const fetchCarts = async () => {
      try {
        setIsCartLoading(true); // Start loading
        if (loggedUser && loggedUser._id) {
          const res = await axiosSecure.get(
            `/api/carts/getall/${loggedUser?._id}`
          );
          // console.log(res);
          setCartData(res.data?.items || []);
          setIsCartLoading(false);
        }
      } catch (error) {
        console.log("Error getting Cart data:", error);
      }
    };

    // Only fetch if `loggedUser` is available and stable
    if (loggedUser && loggedUser._id) {
      fetchCarts();
    }
  }, [loggedUser, axiosSecure]);

  // Calculate the total price whenever cartData changes
  useEffect(() => {
    const calculateTotal = () => {
      const totalPrice = cartData.reduce(
        (acc, item) => acc + parseFloat(item.price),
        0
      );
      setTotal(totalPrice.toFixed(2)); // Keep it formatted to 2 decimal places
    };

    if (cartData.length > 0) {
      calculateTotal();
    } else {
      setTotal("0"); // Reset to 0 if cartData is empty
    }
  }, [cartData]);

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

  //function for clear all the cart data
  const handleClearCart = async () => {
    const result = await axiosSecure.delete(
      `/api/carts/deletecart/${loggedUser?._id}`
    );
    console.log(result);
    setCartData([]);
  };

  //function for delete a cart item
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
        showToast("Book removed from cart successfully!", "info");
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
        <div className="mt-[4%]">
          <SkeletonTable number={4}></SkeletonTable>
        </div>
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

          <div className="flex justify-end items-center gap-x-5 mt-[4%]">
            <p
              onClick={handleClearCart}
              className="bg-slate-700 text-white font-semibold px-4 py-2 rounded-sm hover:bg-slate-800 cursor-pointer"
            >
              Clear All
            </p>
            <p className="bg-slate-700 text-white font-semibold px-4 py-2 rounded-sm hover:bg-slate-800 ">
              Total: {"  "}
              {total}$
            </p>
            <p className="bg-rose-500 text-white font-semibold px-4 py-2 rounded-sm hover:bg-rose-600 cursor-pointer">
              Checkout
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
