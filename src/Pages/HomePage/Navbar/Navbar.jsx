import { LuUserPlus } from "react-icons/lu";
import { MdOutlineLogout } from "react-icons/md";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import ActiveLink from "../../../Components/ActiveLink/ActiveLink";
import useAuth from "../../../Hooks/UseAuth/UseAuth";
import useAllAuthors from "../../../Hooks/UseAllAuthors/UseAllAuthors";
import useVerifyAuthor from "../../../Hooks/useVerifyAuthor/useVerifyAuthor";
import useVerifyUser from "../../../Hooks/useVerifyUser/useVerifyUser";
import useLoggedUser from "../../../Hooks/useLoggedUser/useLoggedUser";
import useVerifyAdmin from "../../../Hooks/useVerifyAdmin/useVerifyAdmin";

const Navbar = () => {
  const { user, logOut } = useAuth();
  // console.log(user);
  const navigate = useNavigate();
  const [loggedUser] = useLoggedUser();
  const [allAuthor, isLoading] = useAllAuthors();
  // console.log(allAuthor);

  const [isAuthor] = useVerifyAuthor();
  const [isUser] = useVerifyUser();
  const [isAdmin] = useVerifyAdmin();

  // console.log(isAuthor);
  // console.log(isUser);

  const handleLogOut = () => {
    // console.log("Clicked log out button");
    logOut()
      .then(navigate("/"))
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <div className="hidden md:flex justify-between items-center w-full py-5 px-[5%] relative bg-slate-100  ">
        <div className="flex">
          <p className="title">
            <Link href="/">
              <p className="text-4xl font-bold font-playball text-slate-600">
                <span className="text-rose-500">Book</span>Verse
              </p>
            </Link>
          </p>
          <div className="flex items-center gap-x-6 mx-12">
            <span className="text-slate-500 font-semibold">
              <ActiveLink to="/">Home</ActiveLink>
            </span>
            <span className="text-slate-500 font-semibold">
              <ActiveLink to="/books">Books</ActiveLink>
            </span>

            {user && (
              <>
                <span className="text-slate-500 font-semibold">
                  <ActiveLink to="/favourites">Favourites</ActiveLink>
                </span>
                <span className="text-slate-500 font-semibold">
                  <ActiveLink to="/my-books">My Books</ActiveLink>
                </span>
              </>
            )}
          </div>
        </div>

        <div className="nav-options flex items-center gap-x-4">
          {user && (
            <span className=" border border-rose-500 rounded-full p-2 bg-rose-500 hover:bg-rose-600 cursor-pointer">
              <AiOutlineShoppingCart className="text-2xl font-semibold text-white"></AiOutlineShoppingCart>
            </span>
          )}
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
