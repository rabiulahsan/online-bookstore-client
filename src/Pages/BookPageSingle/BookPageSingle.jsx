import { useLoaderData } from "react-router-dom";

const BookPageSingle = () => {
  const singleBookData = useLoaderData();
  console.log(singleBookData);
  return <div></div>;
};

export default BookPageSingle;
