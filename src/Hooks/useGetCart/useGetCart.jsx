import { useEffect, useState } from "react";
import useAxiosSecure from "../useAxiosSecure/useAxiosSecure";
import useLoggedUser from "../useLoggedUser/useLoggedUser";

const useGetCart = () => {
  const [cartData, setCartData] = useState([]);
  const [cartDataId, setCartDataId] = useState([]);
  const [isCartLoading, setIsCartLoading] = useState(false); // Start as false
  const [loggedUser] = useLoggedUser();
  const [axiosSecure] = useAxiosSecure();

  useEffect(() => {
    const fetchCarts = async () => {
      if (loggedUser?.role !== "user") {
        return; // Skip API call for authors
      }

      setIsCartLoading(true); // Start loading
      try {
        if (loggedUser && loggedUser._id) {
          const res = await axiosSecure.get(
            `http://localhost:5000/api/carts/getall/${loggedUser?._id}`
          );
          setCartData(res.data?.items || []);
          setCartDataId(res.data?.itemsIdArray || []);
        }
      } catch (error) {
        console.log("Error getting Cart data:", error);
      } finally {
        setIsCartLoading(false); // Stop loading
      }
    };

    if (loggedUser && loggedUser._id) {
      fetchCarts();
    }
  }, [loggedUser, axiosSecure]);

  return [cartData, isCartLoading, cartDataId];
};

export default useGetCart;
