import { FcGoogle } from "react-icons/fc";
import useAuth from "../../../Hooks/UseAuth/UseAuth";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const GoogleSignIn = () => {
  const { user, googleLogin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from?.pathname || "/";

  // Toast helper function
  const showToast = (message, type = "info", position = "top-right") => {
    toast(message, {
      position,
      type,
      autoClose: 5000, // Auto close after 5 seconds
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const handleGoogleSignIn = () => {
    if (user) {
      showToast("At first you have to logout", "warning");
      return;
    } else {
      googleLogin()
        .then((result) => {
          const loggedInUser = result.user;
          console.log(loggedInUser);
          const saveUser = {
            name: loggedInUser.displayName,
            email: loggedInUser.email,
            image: loggedInUser.photoURL,
            role: "user",
            createdAt: new Date().toISOString(),
          };
          fetch(
            "https://online-bookstore-server.vercel.app/api/users/postuser",
            {
              method: "POST",
              headers: {
                "content-type": "application/json",
              },
              body: JSON.stringify(saveUser),
            }
          )
            .then((res) => res.json())
            .then(() => {
              navigate(from, { replace: true });
            });
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div
        onClick={handleGoogleSignIn}
        className=" border border-blue-500 my-8  flex text-center text-white cursor-pointer font-semibold"
      >
        <span className="text-2xl p-2">
          <FcGoogle></FcGoogle>
        </span>
        <span className="bg-blue-500 w-full py-2 px-6 hover:bg-blue-600">
          Continue with Google
        </span>
      </div>
    </div>
  );
};

export default GoogleSignIn;
