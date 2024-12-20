import { useEffect, useState } from "react";
import useAxiosSecure from "../useAxiosSecure/useAxiosSecure";
import useAuth from "../UseAuth/UseAuth";

const useVerifyUser = () => {
  const { user, loading } = useAuth();
  const [axiosSecure] = useAxiosSecure();

  const [isUser, setIsUser] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (loading || !user?.email) return;

    const verifyUser = async () => {
      setIsLoading(true);
      try {
        const res = await axiosSecure.get(
          `/api/users/role?email=${user.email}`
        );
        setIsUser(res.data.isUser);
      } catch (error) {
        console.error("Error verifying user:", error);
        setIsUser(false); // Default to false on error
      } finally {
        setIsLoading(false);
      }
    };

    verifyUser();
  }, [user?.email, loading, axiosSecure]);
  return [isUser, isLoading];
};

export default useVerifyUser;
