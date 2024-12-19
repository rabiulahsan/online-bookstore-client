import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <>
      {/* <Navbar></Navbar> */}
      <Outlet></Outlet>
    </>
  );
};

export default MainLayout;
