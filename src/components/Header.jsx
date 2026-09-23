import React from 'react'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-[#E8F5E9]">
      <nav className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1B5E20] text-lg font-bold text-white">
              M
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[#1B5E20]">
                MarketLink
              </p>
              <p className="text-xs font-medium text-[#263238]">Local Farmers Market</p>
            </div>
          </Link>

          {/* Navigation Links */}
          <div className="hidden flex-1 items-center justify-center gap-8 md:flex">
            <Link to="/" className="text-sm font-semibold text-[#263238] hover:text-[#1B5E20] transition">
              Home
            </Link>
            <Link to="/about-us" className="text-sm font-semibold text-[#263238] hover:text-[#1B5E20] transition">
              About Us
            </Link>
            <Link to="/market" className="text-sm font-semibold text-[#263238] hover:text-[#1B5E20] transition">
              Markets
            </Link>
            <Link to="/product" className="text-sm font-semibold text-[#263238] hover:text-[#1B5E20] transition">
              Products
            </Link>
            <Link to="/contact-us" className="text-sm font-semibold text-[#263238] hover:text-[#1B5E20] transition">
              Contact
            </Link>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center gap-3 sm:gap-4">
            <Link
              to="/login"
              className="rounded-lg px-4 py-2 text-sm font-semibold text-[#1B5E20] hover:bg-[#FFFDF5] transition"
            >
              Sign in
            </Link>
            <Link
              to="/register"
              className="rounded-lg bg-[#1B5E20] px-4 py-2 text-sm font-semibold text-white hover:bg-[#154a1a] transition"
            >
              Sign up
            </Link>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header