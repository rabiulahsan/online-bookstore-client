import { useEffect, useState } from "react";
import useAuth from "../UseAuth/UseAuth";
import useAxiosSecure from "../useAxiosSecure/useAxiosSecure";

const useLoggedUser = () => {
  const { user, loading } = useAuth();
  const [loggedUser, setLoggedUser] = useState(null);
  const [getUserIsLoading, setGetUserIsLoading] = useState(true);
  const [axiosSecure] = useAxiosSecure();

  useEffect(() => {
    if (loading || !user?.email) return;

    const verifyAuthor = async () => {
      setGetUserIsLoading(true);
      try {
        const res = await axiosSecure.get(`/api/getuser?email=${user.email}`);
        // console.log(res.data);
        setLoggedUser(res.data.user);
        // setIsAuthor(res.data.isAuthor);
      } catch (error) {
        console.error("Error verifying author:", error);
        // setIsAuthor(false); // Default to false on error
      } finally {
        setGetUserIsLoading(false);
      }
    };

    verifyAuthor();
  }, [user?.email, loading, axiosSecure]);

  return [loggedUser, getUserIsLoading];
};

export default useLoggedUser;
