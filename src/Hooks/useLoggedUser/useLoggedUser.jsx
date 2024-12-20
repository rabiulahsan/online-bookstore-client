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

    const getLoggedUser = async () => {
      setGetUserIsLoading(true);
      try {
        const res = await axiosSecure.get(`/api/getuser?email=${user.email}`);
        // console.log(res.data);
        setLoggedUser(res.data.user);
      } catch (error) {
        console.error("Error verifying author:", error);
        setLoggedUser(null); // Default to false on error
      } finally {
        setGetUserIsLoading(false);
      }
    };

    getLoggedUser();
  }, [user?.email, loading, axiosSecure]);

  return [loggedUser, getUserIsLoading];
};

export default useLoggedUser;
