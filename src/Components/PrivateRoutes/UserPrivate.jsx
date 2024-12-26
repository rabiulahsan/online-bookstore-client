/* eslint-disable react/prop-types */

import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../../Hooks/UseAuth/UseAuth";
import SkeletonCard from "../Skeleton/SkeletonCard";
import useVerifyUser from "../../Hooks/useVerifyUser/useVerifyUser";

const UserPrivate = ({ children }) => {
  const { loading } = useAuth();
  const location = useLocation();
  const [isUser] = useVerifyUser();

  if (loading) {
    return (
      <div className="grid gap-x-20 gap-y-16 grid-cols-1 lg:grid-cols-3 px-[10%]  ">
        <SkeletonCard number={16}></SkeletonCard>;
      </div>
      // setLoading(false);
    );
  }

  if (isUser) {
    return children;
  }
  return <Navigate state={{ from: location }} to="/login" replace></Navigate>;
};

export default UserPrivate;
