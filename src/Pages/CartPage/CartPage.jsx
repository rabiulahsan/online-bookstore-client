import { useLoaderData } from "react-router-dom";

const CartPage = () => {
  const cartData = useLoaderData();
  console.log(cartData);
  return <div></div>;
};

export default CartPage;
