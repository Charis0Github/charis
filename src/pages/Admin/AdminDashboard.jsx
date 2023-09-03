import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "../../components/Sidebar";

const AdminDashboard = () => {
  const user = useSelector((state) => state.auth.user);
  return (
    <React.Fragment>
      {user ? (
        <div className="min-h-screen w-full lg:flex lg:items-start ">
          <Sidebar />
          <Outlet />
        </div>
      ) : (
        <Navigate to="/" />
      )}
    </React.Fragment>
  );
};

export default AdminDashboard;
