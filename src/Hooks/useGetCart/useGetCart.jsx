import { useEffect, useState } from "react";
import useAxiosSecure from "../useAxiosSecure/useAxiosSecure";
import useLoggedUser from "../useLoggedUser/useLoggedUser";

const useGetCart = () => {
  const [cartData, setCartData] = useState([]);
  const [isCartLoading, setIsCartLoading] = useState(true);
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
  return [cartData, isCartLoading];
};

export default useGetCart;
