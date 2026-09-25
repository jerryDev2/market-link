import { Link, NavLink } from "react-router-dom";
import logo from "../assets/images/marketlinklogo.png"
function Header() {
  return (
    <header className="relative z-50 bg-[#1B5E20]">
      <nav className="mx-auto flex h-[76px] max-w-6xl items-center justify-between px-5 sm:px-8 lg:px-10">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2.5">
          
          <img src={logo} alt="" className="w-40"/>
          

        </a>

        {/* Navigation */}
        <div className="hidden items-center gap-8 lg:flex">
          <NavLink
            to="/"
            className="font-['Poppins'] text-sm font-medium text-white/90 transition hover:text-[#F9C74F] border-b-2 hover:border-[#F9C74F] p-2 border-transparent "
          >
            Home
          </NavLink>

          <NavLink
            to="/product"
            className="font-['Poppins'] text-sm font-medium text-white/90 transition  hover:text-[#F9C74F] border-b-2 hover:border-[#F9C74F] p-2 border-transparent"
          >
            Products
          </NavLink>

          <NavLink
            to="/market"
            className="font-['Poppins'] text-sm font-medium text-white/90 transition  hover:text-[#F9C74F] border-b-2 hover:border-[#F9C74F] p-2 border-transparent"
          >
            Market
          </NavLink>

          <NavLink
            to="/about-us"
            className="font-['Poppins'] text-sm font-medium text-white/90 transition  hover:text-[#F9C74F] border-b-2 hover:border-[#F9C74F] p-2 border-transparent"
          >
            About Us
          </NavLink>

          <NavLink
            to="/contact-us"
            className="font-['Poppins'] text-sm font-medium text-white/90 transition  hover:text-[#F9C74F] border-b-2 hover:border-[#F9C74F] p-2 border-transparent"
          >
            Contact Us
          </NavLink>
        </div>

        {/* Right side */}
        <div className="hidden items-center gap-7 lg:flex">
          {/* Search */}
          <div className="flex h-10 w-[210px] items-center rounded-full bg-[#FFFDF5] px-4">
            <input
              type="text"
              placeholder="Search fresh products..."
              className="min-w-0 flex-1 bg-transparent font-['Inter'] text-xs text-[#263238] outline-none placeholder:text-[#78909C]"
            />

            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="h-4 w-4 text-[#2E7D32]"
            >
              <circle
                cx="11"
                cy="11"
                r="6.5"
                stroke="currentColor"
                strokeWidth="2"
              />

              <path
                d="M16 16L21 21"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>

          {/* Cart */}
          <button
            aria-label="Shopping cart"
            className="relative cursor-pointer text-white transition hover:text-[#F9C74F] "
          >
            <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
              <path
                d="M4 5H6L8.2 15.2C8.4 16.2 9.3 17 10.4 17H17.5C18.5 17 19.3 16.4 19.7 15.5L21 9H7"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              <circle cx="10" cy="20" r="1.2" fill="currentColor" />
              <circle cx="18" cy="20" r="1.2" fill="currentColor" />
            </svg>

            <span className="absolute -right-2.5 -top-2 flex h-[17px] min-w-[17px] items-center justify-center rounded-full bg-[#F9C74F] px-1 font-['Inter'] text-[9px] font-bold text-[#263238]">
              0
            </span>
          </button>

          <Link to="/login">
            <button
              aria-label="Account"
              className="cursor-pointer rounded-2xl bg-[#F9C74F] px-6 py-2.5 text-sm font-semibold text-[#000000] transition hover:bg-[#ffbc20]"
            >
              Sign in
            </button>
          </Link>
        </div>

        {/* Mobile menu */}
        <button
          aria-label="Open menu"
          className="rounded-lg p-2 text-white lg:hidden"
        >
          <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7">
            <path
              d="M4 7H20M4 12H20M4 17H20"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </nav>
    </header>
  );
}

export default Header;
