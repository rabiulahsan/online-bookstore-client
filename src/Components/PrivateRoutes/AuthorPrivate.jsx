/* eslint-disable react/prop-types */
import { Navigate, useLocation } from "react-router-dom";
import SkeletonCard from "../Skeleton/SkeletonCard";
import useVerifyAuthor from "../../Hooks/useVerifyAuthor/useVerifyAuthor";

const AuthorPrivate = ({ children }) => {
  const location = useLocation();
  const [isAuthor, isLoading] = useVerifyAuthor();

  // Show loading state if the verification is still in progress
  if (isLoading) {
    return (
      <div className="flex flex-col gap-y-5 px-[10%]">
        <SkeletonCard number={5} height={70}></SkeletonCard>
      </div>
    );
  }

  // Render children if the user is verified
  if (isAuthor === true) {
    return children;
  }

  // Redirect to home page if user is not verified
  return <Navigate state={{ from: location }} to="/" replace />;
};

export default AuthorPrivate;
