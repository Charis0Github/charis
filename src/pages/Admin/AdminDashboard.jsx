import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AdminDashboard = () => {
  const user = useSelector((state) => state.auth.user);
  return (
    <React.Fragment>
      {user ? (
        <div className="">
          <div>Just checing ooo</div>
        </div>
      ) : (
        <Navigate to="/" />
      )}
    </React.Fragment>
  );
};

export default AdminDashboard;
