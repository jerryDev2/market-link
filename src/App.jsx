import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AboutUs from "./pages/AboutUs";
import Product from "./pages/Product";
import Market from "./pages/Market";
import ContactUs from "./pages/ContactUs";
import Login from "./pages/Login";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Register from "./pages/Register";
import FarmerProfile from "./pages/FarmerProfile";
import FarmerDashboard from "./pages/FarmerDashboard";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/product" element={<Product />} />
        <Route path="/market" element={<Market />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/farmer-profile" element={<FarmerProfile />} />
        <Route path="/farmer-dashboard" element={<FarmerDashboard />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
