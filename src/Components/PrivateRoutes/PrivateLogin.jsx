/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";
import useAuth from "../../Hooks/UseAuth/UseAuth";

const PrivateLogin = ({ children }) => {
  const { user } = useAuth();

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
