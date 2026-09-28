import React from "react";
import "./App.css";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import Login from "./pages/Login";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ProductPage from "./pages/ProductPage.jsx";
import AboutUs from "./pages/AboutUs";
import Product from "./pages/Product";
import Market from "./pages/Market";
import ContactUs from "./pages/ContactUs";
import Register from "./pages/Register";
import FarmerProfile from "./pages/FarmerProfile";
import Home from "./pages/Home";
import FarmerDashboard from "./pages/FarmerDashboard";
import CustomerDashboard from "./pages/CustomerDashboard";
import CustomerProfile from "./pages/CustomerProfile";
import CartPage from "./pages/CartPage.jsx";
import OrderDetailsPage from "./pages/OrderDetailsPage.jsx";

const getStoredUser = () => {
  try {
    const rawUser = localStorage.getItem("user");
    return rawUser ? JSON.parse(rawUser) : null;
  } catch (error) {
    return null;
  }
};

function RequireAuth({ children, allowedRole }) {
  const user = getStoredUser();
  const token = localStorage.getItem("token");

  if (!user || !token) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRole) {
    const userRole = String(user.role || user.userRole || "").toUpperCase();
    if (userRole !== String(allowedRole).toUpperCase()) {
      return <Navigate to="/login" replace />;
    }
  }

  return children;
}

function AppLayout() {
  const location = useLocation();
  const hiddenLayoutRoutes = ["/farmer-dashboard", "/farmer-profile"];

  const shouldHideLayout = hiddenLayoutRoutes.includes(location.pathname);

  return (
    <>
      {!shouldHideLayout && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/product" element={<Product />} />
        <Route path="/productPage/:productId" element={<ProductPage />} />
        <Route path="/market" element={<Market />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/order-details/:orderId" element={<OrderDetailsPage />} />
        <Route
          path="/farmer-profile"
          element={
            <RequireAuth allowedRole="FARMER">
              <FarmerProfile />
            </RequireAuth>
          }
        />
        <Route
          path="/farmer-dashboard"
          element={
            <RequireAuth allowedRole="FARMER">
              <FarmerDashboard />
            </RequireAuth>
          }
        />
        <Route
          path="/customer-dashboard"
          element={
            <RequireAuth allowedRole="CUSTOMER">
              <CustomerDashboard />
            </RequireAuth>
          }
        />
        <Route
          path="/customer-profile"
          element={
            <RequireAuth allowedRole="CUSTOMER">
              <CustomerProfile />
            </RequireAuth>
          }
        />
      </Routes>
      {!shouldHideLayout && <Footer />}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}

export default App;
