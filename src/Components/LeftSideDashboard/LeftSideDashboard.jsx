import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaUser, FaBookOpen } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";
import useAuth from "../../Hooks/UseAuth/UseAuth";
import useVerifyAuthor from "../../Hooks/useVerifyAuthor/useVerifyAuthor";
import useVerifyAdmin from "../../Hooks/useVerifyAdmin/useVerifyAdmin";
import { FaUsers } from "react-icons/fa6";
import { FaUsersBetweenLines } from "react-icons/fa6";
import { LuNotebookPen } from "react-icons/lu";

const LeftSideDashboard = () => {
  const [isAuthor] = useVerifyAuthor();
  const [isAdmin] = useVerifyAdmin();
  const { logOut } = useAuth();
  const navigate = useNavigate();
  const path = useLocation().pathname;
  // console.log(path);

  const handleLogout = () => {
    // console.log("Clicked log out button");
    logOut()
      .then(navigate("/"))
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="bg-slate-700  min-h-screen sticky top-0">
      <div className="py-[5%] border-b border-slate-50">
        <p>
          <Link href="localhost:5173/">
            <p className="text-3xl font-bold font-playball text-white text-center">
              <span className="text-rose-500">Book</span>Verse
            </p>
          </Link>
        </p>
      </div>
      <div className="p-[8%]">
        {/* if user is author */}
        {isAuthor && (
          <ul className=" flex flex-col gap-y-2">
            {/* profile button  */}
            <Link to="/dashboard/author/profile">
              <li
                className={`flex items-center justify-start gap-x-5 cursor-pointer  px-5 py-4 rounded-sm  ${
                  path === "/dashboard/author/profile"
                    ? "bg-rose-500 text-white"
                    : "hover:bg-slate-600"
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
                className={`flex items-center justify-start gap-x-5 cursor-pointer  px-5 py-4 rounded-sm  ${
                  path === "/dashboard/author/mybook"
                    ? "bg-rose-500 text-white"
                    : "hover:bg-slate-600"
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
                className={`flex items-center justify-start gap-x-5 cursor-pointer  px-5 py-4 rounded-sm  ${
                  path === "/dashboard/author/newbook"
                    ? "bg-rose-500 text-white"
                    : "hover:bg-slate-600"
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
        )}
        {/* if user is admin  */}
        {isAdmin && (
          <ul className=" flex flex-col gap-y-2">
            {/* profile button  */}
            <Link to="/dashboard/admin/profile">
              <li
                className={`flex items-center justify-start gap-x-5 cursor-pointer  px-5 py-4 rounded-sm  ${
                  path === "/dashboard/admin/profile"
                    ? "bg-rose-500 text-white"
                    : "hover:bg-slate-600"
                }`}
              >
                <span>
                  <FaUser className="text-white font-bold text-2xl"></FaUser>
                </span>
                <span className="text-slate-100  text-lg">Profile</span>
              </li>
            </Link>

            {/* books button  */}
            <Link to="/dashboard/admin/allbooks">
              <li
                className={`flex items-center justify-start gap-x-5 cursor-pointer  px-5 py-4 rounded-sm  ${
                  path === "/dashboard/admin/allbooks"
                    ? "bg-rose-500 text-white"
                    : "hover:bg-slate-600"
                }`}
              >
                <span>
                  <FaBookOpen className="text-white font-bold text-2xl"></FaBookOpen>
                </span>
                <span className="text-slate-100  text-lg">Books</span>
              </li>
            </Link>

            {/* Users button  */}
            <Link to="/dashboard/admin/allusers">
              <li
                className={`flex items-center justify-start gap-x-5 cursor-pointer  px-5 py-4 rounded-sm  ${
                  path === "/dashboard/admin/allusers"
                    ? "bg-rose-500 text-white"
                    : "hover:bg-slate-600"
                }`}
              >
                <span>
                  <FaUsers className="text-white font-bold text-2xl"></FaUsers>
                </span>
                <span className="text-slate-100  text-lg">Users</span>
              </li>
            </Link>

            {/* Authors button  */}
            <Link to="/dashboard/admin/allauthors">
              <li
                className={`flex items-center justify-start gap-x-5 cursor-pointer  px-5 py-4 rounded-sm  ${
                  path === "/dashboard/admin/allauthors"
                    ? "bg-rose-500 text-white"
                    : "hover:bg-slate-600"
                }`}
              >
                <span>
                  <FaUsersBetweenLines className="text-white font-bold text-2xl"></FaUsersBetweenLines>
                </span>
                <span className="text-slate-100  text-lg">Authors</span>
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
        )}
      </div>
    </div>
  );
};

export default LeftSideDashboard;
