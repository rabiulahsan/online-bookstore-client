/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";
import useAuth from "../../Hooks/UseAuth/UseAuth";
import SkeletonCard from "../Skeleton/SkeletonCard";

const PrivateLogin = ({ children }) => {
  const { user, loading } = useAuth();

  // Show loading state if the verification is still in progress
  if (loading) {
    return (
      <div className="flex flex-col gap-y-5 px-[10%]">
        <SkeletonCard number={5} height={70}></SkeletonCard>
      </div>
    );
  }

  // Render children if the user is verified
  if (!user) {
    return children;
  }

  if (user) {
    return <Navigate to="/" />;
  }

  // Redirect to home page if user is not verified
  return <Navigate state={{ from: location }} to="/" replace />;
};

export default PrivateLogin;
