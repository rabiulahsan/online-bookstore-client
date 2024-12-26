/* eslint-disable react/prop-types */
import { Navigate, useLocation } from "react-router-dom";
import SkeletonCard from "../Skeleton/SkeletonCard";
import useVerifyUser from "../../Hooks/useVerifyUser/useVerifyUser";

const UserPrivate = ({ children }) => {
  const location = useLocation();
  const [isUser, isLoading] = useVerifyUser();
  console.log(isUser); // Debugging purposes

  // Show loading state if the verification is still in progress
  if (isLoading) {
    return (
      <div className="flex flex-col gap-y-5 px-[10%]">
        <SkeletonCard number={5} height={70}></SkeletonCard>
      </div>
    );
  }

  // Render children if the user is verified
  if (isUser === true) {
    return children;
  }

  // Redirect to home page if user is not verified
  return <Navigate state={{ from: location }} to="/" replace />;
};

export default UserPrivate;
