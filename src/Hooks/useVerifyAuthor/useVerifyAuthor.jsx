import { useEffect, useState } from "react";
import useAxiosSecure from "../useAxiosSecure/useAxiosSecure";
import useAuth from "../UseAuth/UseAuth";

const useVerifyAuthor = () => {
  const { user, loading } = useAuth();
  const [axiosSecure] = useAxiosSecure();

  const [isAuthor, setIsAuthor] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (loading || !user?.email) return;

    const verifyAuthor = async () => {
      setIsLoading(true);
      try {
        const res = await axiosSecure.get(
          `/api/authors/role?email=${user.email}`
        );
        setIsAuthor(res.data.isAuthor);
      } catch (error) {
        console.error("Error verifying instructor:", error);
        setIsAuthor(false); // Default to false on error
      } finally {
        setIsLoading(false);
      }
    };

    verifyAuthor();
  }, [user?.email, loading, axiosSecure]);
  return [isAuthor, isLoading];
};

export default useVerifyAuthor;
