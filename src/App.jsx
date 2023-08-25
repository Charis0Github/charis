import React from "react";
import { Routes, Route } from "react-router-dom";
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

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/layout" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="blog" element={<Blog />} />
        <Route path="event" element={<Event />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="property" element={<Property />} />
      </Route>
      <Route path="/affiliate" element={<AffiliateLayout />}>
        <Route index element={<AffiliateLogin />} />
        <Route path="dashboard" element={<AffiliateDashboard />} />
      </Route>
    </Routes>
  );
}

export default App;
