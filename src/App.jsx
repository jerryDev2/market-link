import React from "react";
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import Product from "./pages/Product";
import Market from "./pages/Market";
import ContactUs from "./pages/ContactUs";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Footer from "./components/Footer";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/product" element={<Product />} />
        <Route path="/market" element={<Market />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
