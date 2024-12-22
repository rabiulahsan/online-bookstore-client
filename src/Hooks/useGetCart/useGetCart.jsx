import { useEffect, useState } from "react";
import useAxiosSecure from "../useAxiosSecure/useAxiosSecure";
import useLoggedUser from "../useLoggedUser/useLoggedUser";

const useGetCart = () => {
  const [cartData, setCartData] = useState([]);
  const [isCartLoading, setIsCartLoading] = useState(false);
  const [loggedUser] = useLoggedUser();
  const [axiosSecure] = useAxiosSecure();

  useEffect(() => {
    const fetchCarts = async () => {
      try {
        setIsCartLoading(true); // Start loading
        if (loggedUser && loggedUser._id) {
          const res = await axiosSecure.get(
            `http://localhost:5000/api/carts/getall/${loggedUser?._id}`
          );
          console.log(res);
          setCartData(res.data?.items || []);
        }
      } catch (error) {
        console.log("Error getting Cart data:", error);
      } finally {
        setIsCartLoading(false); // Stop loading
      }
    };

    // Only fetch if `loggedUser` is available and stable
    if (loggedUser && loggedUser._id) {
      fetchCarts();
    }
  }, [loggedUser, axiosSecure]);
  return [cartData, isCartLoading];
};

export default useGetCart;
