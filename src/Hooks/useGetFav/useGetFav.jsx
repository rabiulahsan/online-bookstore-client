import { useEffect, useState } from "react";
import useLoggedUser from "../useLoggedUser/useLoggedUser";
import useAxiosSecure from "../useAxiosSecure/useAxiosSecure";
import useAuth from "../UseAuth/UseAuth";

const useGetFav = () => {
  const [favouriteData, setFavouriteData] = useState([]);
  const [favArray, setFavArray] = useState([]);
  const [isFavLoading, setIsFavLoading] = useState(true); // Start as false
  const [loggedUser] = useLoggedUser();
  const [axiosSecure] = useAxiosSecure();
  const { user } = useAuth();

  useEffect(() => {
    const fetchFavourites = async () => {
      if (!user || loggedUser?.role !== "user") {
        setIsFavLoading(false);
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
