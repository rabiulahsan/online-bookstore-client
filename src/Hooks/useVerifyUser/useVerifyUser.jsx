import { useEffect, useState } from "react";
import useAxiosSecure from "../useAxiosSecure/useAxiosSecure";
import useAuth from "../UseAuth/UseAuth";

const useVerifyUser = () => {
  const { user, loading } = useAuth();
  const [axiosSecure] = useAxiosSecure();

  const [isUser, setIsUser] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (loading) return;
    if (!user?.email) return;

    let retryCount = 0;
    const maxRetries = 5;
    const retryInterval = 1000; // 1 second

    const verifyUser = async () => {
      setIsLoading(true);
      while (retryCount < maxRetries) {
        try {
          const res = await axiosSecure.get(
            `/api/users/role?email=${user.email}`
          );

          if (res.data.isUser) {
            setIsUser(true);
            setIsLoading(false);
            return;
          }
        } catch (error) {
          console.error("Error verifying user:", error);
        }

        retryCount++;
        await new Promise((resolve) => setTimeout(resolve, retryInterval));
      }

      setIsUser(false); // If not found after retries
      setIsLoading(false);
    };

    verifyUser();
  }, [user?.email, loading, axiosSecure]);

  return [isUser, isLoading];
};

export default useVerifyUser;
