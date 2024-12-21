import { useLoaderData } from "react-router-dom";
import useGetFav from "../../Hooks/useGetFav/useGetFav";

const FavouritePage = () => {
  const [favouriteData, isFavLoading] = useGetFav();
  return <div></div>;
};

export default FavouritePage;
