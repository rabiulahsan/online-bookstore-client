import { Outlet } from "react-router-dom";
import Navbar from "../Pages/HomePage/Navbar/Navbar";
import CartProvider from "../Providers/CartProvider";
import Footer from "../Components/Footer/Footer";

const MainLayout = () => {
  return (
    <>
      <CartProvider>
        <Navbar></Navbar>
      </CartProvider>
      <Outlet></Outlet>
      <Footer></Footer>
    </>
  );
};

export default MainLayout;
