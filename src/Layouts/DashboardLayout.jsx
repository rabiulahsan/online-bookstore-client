import { Outlet } from "react-router-dom";
import LeftSideDashboard from "../Components/LeftSideDashboard/LeftSideDashboard";

const DashboardLayout = () => {
  return (
    <div className="flex">
      <div className="w-1/4 border border-slate-500">
        <LeftSideDashboard></LeftSideDashboard>
      </div>
      <div className="w-3/4">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default DashboardLayout;
