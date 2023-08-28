import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import About from "./pages/About";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import Login from "./pages/Login";
import Event from "./pages/Event";
import Dashboard from "./pages/Dashboard";
import Property from "./pages/Property";
import AffiliateLogin from "./pages/Affiliate/AffiliateLogin";
import AffiliateLayout from "./pages/Affiliate/AffiliateLayout";
import AffiliateDashboard from "./pages/Affiliate/AffiliateDashboard";
import AdminLayout from "./pages/Admin/AdminLayout";
import AdminDashboard from "./pages/Admin/AdminDashboard";

function App() {
  const user = useSelector((state) => state.auth.user);
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="blog" element={<Blog />} />
        <Route path="event" element={<Event />} />
        {user ? <Route path="dashboard" element={<Dashboard />} /> : null}
        <Route path="property" element={<Property />} />
      </Route>

      <Route path="/login" element={<Login />} />

      <Route path="/affiliate" element={<AffiliateLayout />}>
        <Route index element={<AffiliateLogin />} />
        <Route path="dashboard" element={<AffiliateDashboard />} />
      </Route>

      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
      </Route>
    </Routes>
  );
}

export default App;
