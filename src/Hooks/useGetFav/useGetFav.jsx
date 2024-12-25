import { useEffect, useState } from "react";
import useLoggedUser from "../useLoggedUser/useLoggedUser";
import useAxiosSecure from "../useAxiosSecure/useAxiosSecure";

const useGetFav = () => {
  const [favouriteData, setFavouriteData] = useState([]);
  const [isFavLoading, setIsFavLoading] = useState(true);
  const [loggedUser] = useLoggedUser();
  const [axiosSecure] = useAxiosSecure();

  useEffect(() => {
    const fetchFavourites = async () => {
      try {
        setIsFavLoading(true); // Start loading
        if (loggedUser && loggedUser._id) {
          const res = await axiosSecure.get(
            `/api/favs/getall/${loggedUser?._id}`
          );
          setFavouriteData(res.data[0]?.bookmarks || []);
        }
      } catch (error) {
        console.log("Error getting favourite data:", error);
      } finally {
        setIsFavLoading(false); // Stop loading
      }
    };

    // Only fetch if `loggedUser` is available and stable
    if (loggedUser && loggedUser._id) {
      fetchFavourites();
    }
  }, [loggedUser, axiosSecure]);

  return [favouriteData, isFavLoading];
};

export default useGetFav;
