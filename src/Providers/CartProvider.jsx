/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useEffect, useState } from "react";
import useLoggedUser from "../Hooks/useLoggedUser/useLoggedUser";

export const CartContext = createContext(null);
const CartProvider = ({ children }) => {
  const [cartData, setCartData] = useState([]);
  const [isCartLoading, setIsCartLoading] = useState(true);
  const [loggedUser] = useLoggedUser();

  useEffect(() => {
    const fetchCarts = async () => {
      try {
        setIsCartLoading(true); // Start loading

        // Get the JWT token from local storage
        const token = localStorage.getItem("access-token");

        if (loggedUser && loggedUser._id && token) {
          const res = await fetch(
            `http://localhost:5000/api/carts/getall/${loggedUser._id}`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`, // Include the token in the Authorization header
                "Content-Type": "application/json",
              },
            }
          );

          const data = await res.json();
          console.log(data);

          setCartData(data?.items || []); // Update state with cart items
          setIsCartLoading(false); // Ensure loading state is updated
        }
      } catch (error) {
        console.log("Error getting Cart data:", error);
      }
    };

    // Only fetch if `loggedUser` is available and stable
    if (loggedUser && loggedUser._id) {
      fetchCarts();
    }
  }, [loggedUser]);

  const cartDetails = {
    cartData,
    setCartData,
    setIsCartLoading,
    isCartLoading,
  };
  return (
    <CartContext.Provider value={cartDetails}>{children}</CartContext.Provider>
  );
};

export default CartProvider;
