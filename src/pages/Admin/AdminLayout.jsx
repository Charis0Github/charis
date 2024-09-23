import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminLayout = () => {
  const user = useSelector((state) => state.auth.user);
  return (
    <div className="w-full h-full">
      {user ? <Outlet /> : <Navigate to="/login" />}
    </div>
  );
};

export default AdminLayout;
