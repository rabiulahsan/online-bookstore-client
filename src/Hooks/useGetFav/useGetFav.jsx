import { useEffect, useState } from "react";
import useLoggedUser from "../useLoggedUser/useLoggedUser";
import useAxiosSecure from "../useAxiosSecure/useAxiosSecure";

const useGetFav = () => {
  const [favouriteData, setFavouriteData] = useState([]);
  const [favArray, setFavArray] = useState([]);
  const [isFavLoading, setIsFavLoading] = useState(false); // Start as false
  const [loggedUser] = useLoggedUser();
  const [axiosSecure] = useAxiosSecure();

  useEffect(() => {
    const fetchFavourites = async () => {
      if (loggedUser?.role !== "user") {
        return; // Skip API call for authors
      }

      setIsFavLoading(true); // Start loading
      try {
        if (loggedUser && loggedUser._id) {
          const res = await axiosSecure.get(
            `/api/favs/getall/${loggedUser?._id}`
          );
          setFavouriteData(res.data[0]?.bookmarks || []);
          setFavArray(res.data[0]?.bookmarksIdArray || []);
        }
      } catch (error) {
        console.log("Error getting favourite data:", error);
      } finally {
        setIsFavLoading(false); // Stop loading
      }
    };

    if (loggedUser && loggedUser._id) {
      fetchFavourites();
    }
  }, [loggedUser, axiosSecure]);

  return [favouriteData, isFavLoading, favArray];
};

export default useGetFav;
