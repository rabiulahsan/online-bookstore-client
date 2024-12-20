import { Link } from "react-router-dom";

const CreateAccount = () => {
  return (
    <div className="flex items-center">
      <div className="doctor-login  w-1/2 min-h-screen bg-slate-200 flex items-center justify-center">
        <div className="text-center w-2/3 mx-auto">
          <p className="text-4xl font-bold text-slate-700 ">For Doctors</p>
          <p className="text-slate-700 my-5">
            Manage appointments, connect with patients, and grow your practice.
            Log in or create an account to get started!
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
          <p className="text-4xl font-bold text-rose-600 ">For Patient</p>
          <p className="text-slate-700 my-5">
            Access top doctors anytime! Log in to book appointments, manage your
            health records, and get personalized healthcare easily.
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
