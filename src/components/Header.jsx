import React from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom';


function Header() {
    const navigate = useNavigate();
  return (
    <div className="w-full bg-white" style={{ fontFamily: "Poppins" }}>
      <header className="mx-auto flex w-full max-w-5xl items-center justify-between gap-4 border-b border-[#efefef] py-3">
        {/* <img src={Logo} alt="Destiny Mini Mart logo" width="150px" /> */}{" "}
        <h1>Logo</h1>
        <form className="relative flex-1">
          <div className="flex w-full items-center gap-2 rounded-2xl bg-[#f0f0f0] pl-3 transition focus-within:bg-[#f7f1ee] focus-within:ring-2 focus-within:ring-[#DE541E]/20">
            <i className="fa-solid fa-magnifying-glass text-xl text-[#a3a3a3]"></i>
            <input
              type="search"
              placeholder="Search products"
              className="w-full border-0 bg-transparent p-2 text-sm text-[#2b2b2b] outline-none placeholder:text-[#7d7d7d]"
            />
          </div>
        </form>
        <div className="relative flex items-center gap-4">
          <button
            type="button"
            aria-label="Open cart"
            className="group relative flex h-11 w-11 items-center justify-center rounded-full bg-[#f7f3f0] text-[#8f8f8f] transition duration-200 hover:-translate-y-0.5 hover:bg-[#ffc53e4d] hover:text-[#ffc53e]"
          >
            <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#F9C74F] px-1 text-[10px] font-bold text-black">
              0
            </span>
            <i className="fa-solid fa-cart-arrow-down text-xl"></i>
          </button>

          <Link
            to="/signup"
            className="inline-flex items-center justify-center rounded-full bg-[#F9C74F] px-4 py-2.5 text-sm font-medium text-black shadow-sm transition duration-200 hover:-translate-y-0.5 hover:bg-[#ffc53e]"
          >
            Sign up
          </Link>
        </div>
      </header>

      <ul className="mx-auto flex max-w-5xl gap-4 py-2 text-[14px] text-[#4d4d4d]">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "border-b-2 border-[#F9C74F] text-[#F9C74F]" : ""
          }
        >
          <li className="cursor-pointer border-b-2 border-transparent pb-1 transition-all duration-300 hover:border-[#ffc02c] hover:text-[#ffc02c]">
            Home
          </li>
        </NavLink>
        <NavLink
          to="/product"
          className={({ isActive }) =>
            isActive ? "border-b-2 border-[#F9C74F] text-[#F9C74F]" : ""
          }
        >
          <li className="cursor-pointer border-b-2 border-transparent pb-1 transition-all duration-300 hover:border-[#ffc02c] hover:text-[#ffc02c]">
            Product
          </li>
        </NavLink>
        <NavLink
          to="/market"
          className={({ isActive }) =>
            isActive ? "border-b-2 border-[#F9C74F] text-[#F9C74F]" : ""
          }
        >
          <li className="cursor-pointer border-b-2 border-transparent pb-1 transition-all duration-300 hover:border-[#ffc02c] hover:text-[#ffc02c]">
            Market
          </li>
        </NavLink>
        <NavLink
          to="/about-us"
          className={({ isActive }) =>
            isActive ? "border-b-2 border-[#F9C74F] text-[#F9C74F]" : ""
          }
        >
          <li className="cursor-pointer border-b-2 border-transparent pb-1 transition-all duration-300 hover:border-[#ffc02c] hover:text-[#ffc02c]">
            About us
          </li>
        </NavLink>
        <NavLink
          to="/contact-us"
          className={({ isActive }) =>
            isActive ? "border-b-2 border-[#F9C74F] text-[#F9C74F]" : ""
          }
        >
          <li className="cursor-pointer border-b-2 border-transparent pb-1 transition-all duration-300 hover:border-[#ffc02c] hover:text-[#ffc02c]">
            Contact us
          </li>
        </NavLink>
      </ul>
    </div>
  );
}

export default Header