import { Navigate, Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";

const Layout = () => {
  // const user = useSelector(state => state.auth.user)
  return (
    <div className="w-full h-full">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
