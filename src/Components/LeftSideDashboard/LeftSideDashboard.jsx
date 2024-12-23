import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaUser, FaBookOpen } from "react-icons/fa";
import { LuNotebookPen } from "react-icons/lu";
import { IoIosLogOut } from "react-icons/io";
import useAuth from "../../Hooks/UseAuth/UseAuth";

const LeftSideDashboard = () => {
  const { logOut } = useAuth();
  const navigate = useNavigate();
  const path = useLocation().pathname;
  console.log(path);

  const handleLogout = () => {
    // console.log("Clicked log out button");
    logOut()
      .then(navigate("/"))
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="bg-slate-700  min-h-screen">
      <div className="py-[5%] border-b border-slate-50">
        <p>
          <Link href="/">
            <p className="text-3xl font-bold font-playball text-white text-center">
              <span className="text-rose-500">Book</span>Verse
            </p>
          </Link>
        </p>
      </div>
      <div className="p-[8%]">
        <ul className=" flex flex-col gap-y-2">
          {/* profile button  */}
          <Link to="/dashboard/author/profile">
            <li
              className={`flex items-center justify-start gap-x-5 cursor-pointer  px-5 py-4 rounded-sm hover:bg-slate-600 ${
                path === "/dashboard/author/profile"
                  ? "bg-rose-500 text-white"
                  : ""
              }`}
            >
              <span>
                <FaUser className="text-white font-bold text-2xl"></FaUser>
              </span>
              <span className="text-slate-100  text-lg">Profile</span>
            </li>
          </Link>

          {/* my books button  */}
          <Link to="/dashboard/author/mybook">
            <li
              className={`flex items-center justify-start gap-x-5 cursor-pointer  px-5 py-4 rounded-sm hover:bg-slate-600 ${
                path === "/dashboard/author/mybook"
                  ? "bg-rose-500 text-white"
                  : ""
              }`}
            >
              <span>
                <FaBookOpen className="text-white font-bold text-2xl"></FaBookOpen>
              </span>
              <span className="text-slate-100  text-lg">My Books</span>
            </li>
          </Link>

          {/* new book button  */}
          <Link to="/dashboard/author/newbook">
            <li
              className={`flex items-center justify-start gap-x-5 cursor-pointer  px-5 py-4 rounded-sm hover:bg-slate-600 ${
                path === "/dashboard/author/newbook"
                  ? "bg-rose-500 text-white"
                  : ""
              }`}
            >
              <span>
                <LuNotebookPen className="text-white font-bold text-2xl"></LuNotebookPen>
              </span>
              <span className="text-slate-100  text-lg">New Book</span>
            </li>
          </Link>

          {/* logout button  */}

          <li
            onClick={handleLogout}
            className="flex items-center justify-start gap-x-5 cursor-pointer  px-5 py-4 rounded-sm hover:bg-slate-600"
          >
            <span>
              <IoIosLogOut className="text-white font-bold text-2xl"></IoIosLogOut>
            </span>
            <span className="text-slate-100  text-lg">Log out</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default LeftSideDashboard;
