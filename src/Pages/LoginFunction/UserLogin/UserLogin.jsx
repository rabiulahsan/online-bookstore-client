import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../../Hooks/UseAuth/UseAuth";
import { FaRegFaceRollingEyes } from "react-icons/fa6";
import { LuEyeClosed } from "react-icons/lu";
import GoogleSignIn from "./GoogleSignIn";

const UserLogin = () => {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const checkUser = async (email) => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/users/getallusers"
      );
      const data = await response.json();
      // console.log(data);
      // console.log(email);

      // Filter users to find the matching patient
      const result = data.filter((user) => user.email === email);
      return result.length > 0 ? result[0] : null; // Return the user if found, otherwise null
    } catch (error) {
      console.error("Error fetching data:", error);
      return null; // Return null in case of an error
    }
  };

  const onSubmit = async (data) => {
    try {
      const user = await checkUser(data.email);
      // console.log(user);

      if (user) {
        // User exists, proceed with sign-in
        signIn(data.email, data.password)
          .then((result) => {
            // const user = result.user;
            // console.log(user);
            reset();
            navigate(from, { replace: true });

            // todo display toast
          })
          .catch((error) => {
            setError(error.message);
          });
      } else {
        // User does not exist
        setError("User does not exist");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setError("An error occurred. Please try again later.");
    }
  };
  return (
    <div className="bg-slate-100 min-h-screen flex items-center justify-center py-[2%]">
      <div className="bg-white shadow-lg rounded-lg py-[3%] px-[4%]  max-w-lg w-full">
        <h1 className="text-rose-500 font-bold text-2xl text-center">
          Log into your account
        </h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-lg mx-auto mt-[5%]"
        >
          <div className="form-control mb-4">
            <label className="label block text-gray-700 text-sm font-bold mb-[6px]">
              <span className="label-text">Email*</span>
            </label>
            <input
              type="email"
              {...register("email", { required: true })}
              placeholder="Enter your email"
              className="border-2 border-slate-300 rounded-md w-full py-2 px-4 text-slate-700   focus:outline-none"
            />
            {errors.email && (
              <span className="text-red-600 font-semibold text-sm">
                Email is required
              </span>
            )}
          </div>

          <div className="form-control mb-4">
            <label className="label block text-gray-700 text-sm font-bold mb-[6px]">
              <span className="label-text">Password*</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"} // Toggles between 'text' and 'password'
                {...register("password", {
                  required: true,
                  minLength: 6,
                  maxLength: 20,
                  pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/, // At least one uppercase, lowercase, number, and special character
                })}
                placeholder="Enter your password"
                className="border-2 border-slate-300 rounded-md w-full py-2 px-4 text-slate-700 focus:outline-none"
              />
              <button
                type="button"
                className="absolute top-1/2 right-3 transform -translate-y-1/2 text-slate-500"
                onClick={() => setShowPassword(!showPassword)} // Toggle password visibility
              >
                {showPassword ? (
                  <FaRegFaceRollingEyes size={20} />
                ) : (
                  <LuEyeClosed size={20} />
                )}
              </button>
            </div>
            {errors.password?.type === "required" && (
              <p className="text-red-600 font-semibold text-sm">
                Password is required
              </p>
            )}
            {errors.password?.type === "minLength" && (
              <p className="text-red-600 font-semibold text-sm">
                Password must be at least 6 characters
              </p>
            )}
            {errors.password?.type === "maxLength" && (
              <p className="text-red-600 font-semibold text-sm">
                Password must be less than 20 characters
              </p>
            )}
            {errors.password?.type === "pattern" && (
              <p className="text-red-600 font-semibold text-sm">
                Password must have one uppercase, one lowercase, one number, and
                one special character.
              </p>
            )}
          </div>

          {error && (
            <p className="text-red-600 font-semibold text-sm my-5">{error}</p>
          )}

          <div className="form-control mt-6 flex justify-center items-center">
            <input
              className="cursor-pointer text-center bg-rose-500 hover:bg-rose-600 text-white font-semibold py-2 px-6 rounded-sm focus:outline-none "
              type="submit"
              value="Log In"
            />
          </div>
        </form>

        <p className="mt-5  text-slate-600 text-center">
          Don&apos;t have an account?{" "}
          <Link to="/user/signup">
            {" "}
            <span className="underline font-bold text-rose-600">Signup</span>
          </Link>
        </p>
        <p className=" text-center font-semibold text-slate-600 mt-5">or</p>
        <GoogleSignIn></GoogleSignIn>
      </div>
    </div>
  );
};

export default UserLogin;
