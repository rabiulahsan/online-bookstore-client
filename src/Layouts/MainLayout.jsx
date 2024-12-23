import { Outlet } from "react-router-dom";
import Navbar from "../Pages/HomePage/Navbar/Navbar";
import CartProvider from "../Providers/CartProvider";

const MainLayout = () => {
  return (
    <>
      <CartProvider>
        <Navbar></Navbar>
      </CartProvider>
      <Outlet></Outlet>
    </>
  );
};

export default MainLayout;
