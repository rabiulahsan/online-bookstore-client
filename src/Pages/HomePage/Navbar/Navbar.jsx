import { LuUserPlus } from "react-icons/lu";
import { MdOutlineLogout } from "react-icons/md";
import { Link } from "react-router-dom";
import ActiveLink from "../../../Components/ActiveLink/ActiveLink";

const Navbar = () => {
  const handleLogOut = () => {
    console.log("Clicked log out button");
  };

  const user = null;
  return (
    <div>
      <div className="hidden md:flex justify-between items-center w-full py-5 px-[6%] relative bg-white bg-opacity-60 backdrop-blur-sm">
        <div className="title">
          <Link href="/">
            <p className="text-4xl font-bold font-playball text-slate-600">
              <span className="text-rose-500">Book</span>Verse
            </p>
          </Link>
        </div>

        <div className="nav-options flex items-center gap-x-4">
          <div className="flex items-center gap-x-8 mr-10">
            <span className="text-slate-500 font-semibold">
              <ActiveLink to="/">Home</ActiveLink>
            </span>
            <span className="text-slate-500 font-semibold">
              <ActiveLink to="/doctors">Books</ActiveLink>
            </span>
          </div>

          {user ? (
            <button
              onClick={handleLogOut}
              className="flex gap-x-2 items-center font-bold text-slate-100 bg-rose-500 px-7 py-[10px] rounded-sm hover:bg-slate-800"
            >
              Log out
              <MdOutlineLogout className="text-xl font-semibold" />
            </button>
          ) : (
            <Link to="/create-account">
              <button className="flex gap-x-2 items-center font-bold text-white bg-rose-500 px-7 py-[10px] rounded-sm hover:bg-slate-800">
                Log in
                <LuUserPlus className="text-xl font-semibold" />
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
