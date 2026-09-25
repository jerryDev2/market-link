import React, {useEffect} from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";

import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import Product from "./pages/Product";
import Market from "./pages/Market";
import ContactUs from "./pages/ContactUs";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ProductPage from "./pages/ProductPage.jsx";
import Lenis from "lenis";

function App() {

    useEffect(() => {
        // initialize Lenis on the specific wrapper/content so fixed header stays outside transformed element
        const wrapper = document.querySelector(".lenis-wrapper");
        const content = document.querySelector(".lenis-content");
        const lenis = new Lenis({
            wrapper: wrapper || undefined,
            content: content || undefined,
            duration: 1.2,
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 2,
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => lenis.destroy();
    }, []);

    return (
        <BrowserRouter>

            <Header/>
            <Routes>


                <Route path="/" element={<Home/>}/>
                <Route path="/about-us" element={<AboutUs/>}/>
                <Route path="/product" element={<Product/>}/>
                <Route path="/market" element={<Market/>}/>
                <Route path="/productPage/:productId" element={<ProductPage/>}/>
                <Route path="/contact-us" element={<ContactUs/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/login" element={<Login/>}/>
            </Routes>
            <Footer/>
        </BrowserRouter>);
}

export default App;
