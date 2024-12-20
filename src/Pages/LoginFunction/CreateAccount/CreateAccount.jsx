import { Link } from "react-router-dom";

const CreateAccount = () => {
  return (
    <div className="flex items-center">
      <div className="doctor-login  w-1/2 min-h-screen bg-slate-200 flex items-center justify-center">
        <div className="text-center w-2/3 mx-auto">
          <p className="text-4xl font-bold text-slate-700 ">For Author</p>
          <p className="text-slate-700 my-5">
            Share your stories, engage with your readers, and track your
            book&apos;s performance. Log in or create an account to grow your
            readership today!
          </p>
          <Link to="/author/login">
            <button className="text-white font-semibold bg-slate-600 px-6 py-[10px] rounded-sm hover:bg-slate-700 mb-5">
              Login
            </button>
          </Link>

          <p>Don&apos;t Have an Account?</p>
          <Link to="/author/signup">
            <p className="font-bold text-lg hover:underline text-slate-600">
              Signup
            </p>
          </Link>
        </div>
      </div>
      <div className="patient-login  w-1/2 min-h-screen bg-rose-100 flex items-center justify-center">
        <div className=" text-center w-2/3 mx-auto">
          <p className="text-4xl font-bold text-rose-600 ">For User</p>
          <p className="text-slate-700 my-5">
            Discover your next favorite book, connect with authors, and manage
            your reading list effortlessly. Log in or create an account to begin
            your literary journey!
          </p>
          <Link to="/user/login">
            <button className="text-white font-semibold bg-rose-500 px-6 py-[10px] rounded-sm hover:bg-rose-700 mb-5">
              Login
            </button>
          </Link>

          <p>Don&apos;t Have an Account?</p>
          <Link to="/user/signup">
            <p className="font-bold text-lg hover:underline text-rose-500">
              Signup
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CreateAccount;
