import { useEffect, useState } from "react";
import useAxiosSecure from "../useAxiosSecure/useAxiosSecure";
import useAuth from "../UseAuth/UseAuth";

const useVerifyAdmin = () => {
  const { user, loading } = useAuth();
  const [axiosSecure] = useAxiosSecure();

  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  //   console.log(user?.email);

  useEffect(() => {
    if (loading || !user?.email) return;

    const verifyAdmin = async () => {
      setIsLoading(true);
      try {
        const res = await axiosSecure.get(
          `/api/admins/role?email=${user.email}`
        );
        // console.log(res);
        setIsAdmin(res.data.isAdmin);
      } catch (error) {
        console.error("Error verifying Admin:", error);
        setIsAdmin(false); // Default to false on error
      } finally {
        setIsLoading(false);
      }
    };

    verifyAdmin();
  }, [user?.email, loading, axiosSecure]);
  return [isAdmin, isLoading];
};

export default useVerifyAdmin;
