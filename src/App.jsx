import React, { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import About from "./pages/About";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import Login from "./pages/Login";
import ResetPasswordPage from "./pages/resetPassword";
import Event from "./pages/Event";
import Dashboard from "./pages/Dashboard";
import Property from "./pages/Property";
import AffiliateLogin from "./pages/Affiliate/AffiliateLogin";
import AffiliateLayout from "./pages/Affiliate/AffiliateLayout";
import AffiliateDashboard from "./pages/Affiliate/AffiliateDashboard";
import AdminLayout from "./pages/Admin/AdminLayout";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import Users from "./pages/Admin/Users";
import Payment from "./pages/Admin/Payment";
import AdminProperty from "./pages/Admin/AdminProperty";
import Affiliates from "./pages/Admin/Affiliates";
import Settings from "./pages/Admin/Settings";
import VerifyPayment from "./pages/VerifyPayment";
import ReferralLogin from "./pages/ReferralLogin";
import SingleProperty from "./pages/PropertyDetails";
import Terms from "./pages/Terms";
import { Toaster } from "react-hot-toast";
import Catalogue from "./pages/Catalogue";

function App() {
  // const user = useSelector((state) => state.auth.user);

  return (
    <Suspense fallback="">
      <Toaster />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="blog" element={<Blog />} />
          <Route path="event" element={<Event />} />
          <Route path="terms" element={<Terms />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="list-property/:id" element={<SingleProperty />} />
        </Route>
        <Route path="property" element={<Property />} />
        <Route path="catalogue" element={<Catalogue />} />
        <Route path="/login" element={<Login />} />
        <Route path="/auth/reset-password" element={<ResetPasswordPage />} />
        <Route
          path="/referralLogin/:referralCode"
          element={<ReferralLogin />}
        />

        <Route path="/verify" element={<VerifyPayment />} />
        <Route path="/affiliate" element={<AffiliateLayout />}>
          <Route index element={<AffiliateLogin />} />
          <Route path="dashboard" element={<AffiliateDashboard />} />
        </Route>
        <Route element={<AdminLayout />}>
          <Route exact path="/admin" element={<AdminDashboard />}>
            <Route index element={<Users />} />
            <Route path="payment" element={<Payment />} />
            <Route path="property" element={<AdminProperty />} />
            <Route path="affiliates" element={<Affiliates />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
