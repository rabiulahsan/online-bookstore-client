import { useLoaderData } from "react-router-dom";

const FavouritePage = () => {
  const loadedData = useLoaderData();
  console.log(loadedData);
  return <div></div>;
};

export default FavouritePage;
