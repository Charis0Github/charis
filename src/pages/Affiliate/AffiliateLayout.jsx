import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const AffiliateLayout = () => {
  const user = useSelector((state) => state.auth.user);
  return (
    <div className="w-full h-full">
      {user ? <Outlet /> : <Navigate to="/" />}
    </div>
  );
};

export default AffiliateLayout;
