import { useLoaderData } from "react-router-dom";
import useGetFav from "../../Hooks/useGetFav/useGetFav";

const FavouritePage = () => {
  const [favouriteData, isFavLoading] = useGetFav();
  console.log(favouriteData);
  return <div></div>;
};

export default FavouritePage;
