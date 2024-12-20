import useAuth from "../../Hooks/UseAuth/UseAuth";

const AdminPage = () => {
  const { user } = useAuth;
  const name = user?.displayName || "Admin";
  return <div>its me {name}admin of the page</div>;
};

export default AdminPage;
