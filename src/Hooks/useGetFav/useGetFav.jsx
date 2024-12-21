import { useEffect, useState } from "react";
import useLoggedUser from "../useLoggedUser/useLoggedUser";
import useAxiosSecure from "../useAxiosSecure/useAxiosSecure";

const useGetFav = () => {
  const [favouriteData, setFavouriteData] = useState([]);
  const [isFavLoading, setIsFavLoading] = useState([]);
  const [loggedUser] = useLoggedUser();
  const [axiosSecure] = useAxiosSecure();

  useEffect(() => {
    const fetchFavourites = async () => {
      setIsFavLoading(true); // Set loading to true before the request is made
      try {
        if (loggedUser && loggedUser._id) {
          const res = await axiosSecure.get(
            `http://localhost:5000/api/favs/getall/${loggedUser._id}`
          );
          setFavouriteData(res.data[0]?.bookmarks);
        }
      } catch (error) {
        console.log("Error getting favourite data:", error);
      } finally {
        setIsFavLoading(false); // Set loading to false after the request is complete
      }
    };

    fetchFavourites();
  }, [loggedUser, axiosSecure]);

  return [favouriteData, isFavLoading];
};

export default useGetFav;
