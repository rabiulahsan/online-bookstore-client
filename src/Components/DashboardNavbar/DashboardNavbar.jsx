import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/UseAuth/UseAuth";
import useLoggedUser from "../../Hooks/useLoggedUser/useLoggedUser";
import { useState } from "react";

const DashboardNavbar = () => {
  const [loggedUser] = useLoggedUser();
  const { logOut } = useAuth();
  const navigate = useNavigate();
  const [logoutClicked, setLogoutClicked] = useState(null);

  const handleLogout = () => {
    // console.log("Clicked log out button");
    logOut()
      .then(navigate("/"))
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className=" boder-b border-slate-100 flex justify-between items-center">
      <div className="flex items-center gap-x-2">
        <Link to="author/profile">
          <p className="font-bold text-slate-600 text-3xl">
            {loggedUser?.name}
          </p>
        </Link>
      </div>
      <div className="relative">
        <img
          onClick={() => setLogoutClicked(!logoutClicked)}
          className="h-[40px] w-[40px] rounded-full border-2 border-slate-600 cursor-pointer"
          src={loggedUser?.image}
          alt={loggedUser?.name}
        />

        {logoutClicked && (
          <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 px-5 py-3 bg-slate-200 backdrop-blur-md rounded shadow-lg">
            <p
              onClick={handleLogout}
              className="bg-rose-500 font-semibold px-5 py-2 rounded-sm text-white cursor-pointer hover:bg-rose-600"
            >
              Logout
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardNavbar;
