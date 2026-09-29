import { useContext, useEffect, useRef, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  Search,
  X,
  User,
  ChevronDown,
  LayoutDashboard,
  UserCircle,
  LogOut,
  ShoppingCart,
} from "lucide-react";
import { ShopContext } from "../context/ShopContext.jsx";
import logo from "../assets/images/marketlinklogo.png";

const getStoredUser = () => {
  try {
    const rawUser = localStorage.getItem("user");
    return rawUser ? JSON.parse(rawUser) : null;
  } catch (error) {
    console.error("Could not read stored user:", error);
    return null;
  }
};

function Header() {
  const [currentUser, setCurrentUser] = useState(() => getStoredUser());
  const [cartCount, setCartCount] = useState(() =>
    Number(localStorage.getItem("cartCount") || 0),
  );

  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const [searchValue, setSearchValue] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);

  const userMenuRef = useRef(null);
  const mobileMenuRef = useRef(null);

  /*
  |--------------------------------------------------------------------------
  | USER ROLE
  |--------------------------------------------------------------------------
  */

  const userRole = String(
    currentUser?.role || currentUser?.userRole || "",
  ).toUpperCase();

  const isLoggedIn =
    Boolean(currentUser) && Boolean(localStorage.getItem("token"));

  const isCustomer = userRole === "CUSTOMER";
  const isFarmer = userRole === "FARMER";

  /*
  |--------------------------------------------------------------------------
  | DASHBOARD ROUTE
  |--------------------------------------------------------------------------
  */

  const dashboardRoute = isFarmer ? "/farmer-dashboard" : "/customer-dashboard";

  /*
  |--------------------------------------------------------------------------
  | PROFILE ROUTE
  |--------------------------------------------------------------------------
  */

  const profileRoute = isFarmer ? "/farmer-profile" : "/customer-profile";

  /*
  |--------------------------------------------------------------------------
  | SEARCH
  |--------------------------------------------------------------------------
  */

  const matchingProducts = searchValue.trim()
    ? products
        .filter((product) =>
          [product.name, product.category, product.description]
            .filter(Boolean)
            .some((value) =>
              String(value)
                .toLowerCase()
                .includes(searchValue.trim().toLowerCase()),
            ),
        )
        .slice(0, 5)
    : [];

  const submitSearch = (event) => {
    event.preventDefault();

    const query = searchValue.trim();

    if (!query) return;

    setSearchFocused(false);
    setMenuOpen(false);

    navigate(`/product?search=${encodeURIComponent(query)}`);
  };

  /*
  |--------------------------------------------------------------------------
  | SEARCH COMPONENT
  |--------------------------------------------------------------------------
  */

  const renderSearch = (mobile = false) => (
    <form
      onSubmit={submitSearch}
      className={`relative flex h-10 items-center rounded-full bg-[#FFFDF5] px-4 ${
        mobile ? "w-full" : "w-[210px]"
      }`}
      role="search"
    >
      <input
        type="search"
        value={searchValue}
        onChange={(event) => setSearchValue(event.target.value)}
        onFocus={() => setSearchFocused(true)}
        placeholder="Search fresh products..."
        aria-label="Search products"
        aria-expanded={searchFocused && Boolean(searchValue.trim())}
        className="min-w-0 flex-1 bg-transparent font-['Inter'] text-xs text-[#263238] outline-none placeholder:text-[#78909C]"
      />

      <button
        type="submit"
        aria-label="Submit product search"
        className="grid h-8 w-8 shrink-0 place-items-center text-[#2E7D32]"
      >
        <Search size={17} />
      </button>

      <AnimatePresence>
        {searchFocused && searchValue.trim() ? (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            className="absolute left-0 right-0 top-full z-[100] mt-2 overflow-hidden rounded-xl border border-[#E7F1E8] bg-white py-1 text-[#173E1A] shadow-[0_16px_36px_rgba(23,62,26,0.16)]"
          >
            {matchingProducts.length ? (
              matchingProducts.map((product) => (
                <Link
                  key={product.id}
                  to={`/productPage/${product.id}`}
                  onClick={() => {
                    setSearchFocused(false);
                    setMenuOpen(false);
                  }}
                  className="block px-4 py-3 text-left transition hover:bg-[#F3F8F3]"
                >
                  <span className="block truncate text-sm font-semibold">
                    {product.name}
                  </span>

                  <span className="mt-0.5 block text-xs text-[#607568]">
                    {product.category}
                  </span>
                </Link>
              ))
            ) : (
              <p className="px-4 py-3 text-sm text-[#607568]">
                No matching products
              </p>
            )}

            <button
              type="submit"
              className="w-full border-t border-[#E7F1E8] px-4 py-2.5 text-left text-xs font-semibold text-[#1B5E20] hover:bg-[#F3F8F3]"
            >
              See all results for “{searchValue.trim()}”
            </button>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </form>
  );

  /*
  |--------------------------------------------------------------------------
  | SYNC USER + CART
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    const syncUser = () => {
      setCurrentUser(getStoredUser());
    };

    const syncCart = () => {
      setCartCount(Number(localStorage.getItem("cartCount") || 0));
    };

    syncUser();
    syncCart();

    window.addEventListener("storage", syncUser);
    window.addEventListener("storage", syncCart);

    window.addEventListener("auth-change", syncUser);
    window.addEventListener("cart-updated", syncCart);

    return () => {
      window.removeEventListener("storage", syncUser);
      window.removeEventListener("storage", syncCart);

      window.removeEventListener("auth-change", syncUser);
      window.removeEventListener("cart-updated", syncCart);
    };
  }, []);

  /*
  |--------------------------------------------------------------------------
  | CLOSE USER MENU WHEN CLICKING OUTSIDE
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  /*
  |--------------------------------------------------------------------------
  | LOGOUT
  |--------------------------------------------------------------------------
  */

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("cartCount");

    setCurrentUser(null);
    setUserMenuOpen(false);
    setMenuOpen(false);

    window.dispatchEvent(new Event("auth-change"));

    navigate("/");
  };

  /*
  |--------------------------------------------------------------------------
  | GO TO PROFILE
  |--------------------------------------------------------------------------
  */

  const handleProfile = () => {
    setUserMenuOpen(false);
    setMenuOpen(false);

    navigate(profileRoute);
  };

  /*
  |--------------------------------------------------------------------------
  | GO TO DASHBOARD
  |--------------------------------------------------------------------------
  */

  const handleDashboard = () => {
    setUserMenuOpen(false);
    setMenuOpen(false);

    navigate(dashboardRoute);
  };

  /*
  |--------------------------------------------------------------------------
  | USER DISPLAY NAME
  |--------------------------------------------------------------------------
  */

  const displayName = currentUser
    ? `${currentUser.firstName || ""} ${currentUser.lastName || ""}`.trim() ||
      "My Account"
    : "My Account";

  /*
  |--------------------------------------------------------------------------
  | USER DROPDOWN
  |--------------------------------------------------------------------------
  */

  const renderUserDropdown = (mobile = false) => {
    if (!isLoggedIn) {
      return (
        <Link
          to="/login"
          onClick={() => {
            setUserMenuOpen(false);
            setMenuOpen(false);
          }}
          className={`flex items-center justify-center rounded-xl bg-[#F9C74F] px-5 py-2.5 text-sm font-semibold text-[#173E1A] transition hover:bg-[#ffbc20] ${
            mobile ? "w-full" : ""
          }`}
        >
          Sign in
        </Link>
      );
    }

    return (
      <div
        ref={!mobile ? userMenuRef : null}
        className={`relative ${mobile ? "w-full" : ""}`}
      >
        {/* User Icon */}
        <button
          type="button"
          onClick={() => setUserMenuOpen((open) => !open)}
          aria-label="Open account menu"
          aria-expanded={userMenuOpen}
          className={`flex items-center gap-2 rounded-full transition ${
            mobile
              ? "w-full justify-between border border-white/20 px-4 py-3 text-white"
              : "text-white hover:text-[#F9C74F]"
          }`}
        >
          <span
            className={`flex items-center justify-center rounded-full ${
              mobile
                ? "h-9 w-9 bg-[#F9C74F] text-[#173E1A]"
                : "h-10 w-10 border border-white/30 bg-white/10"
            }`}
          >
            <User size={20} />
          </span>

          {mobile ? (
            <>
              <span className="flex-1 text-left">
                <span className="block text-sm font-semibold">
                  {displayName}
                </span>

                <span className="block text-xs text-white/60">{userRole}</span>
              </span>

              <ChevronDown
                size={18}
                className={`transition-transform ${
                  userMenuOpen ? "rotate-180" : ""
                }`}
              />
            </>
          ) : null}
        </button>

        {/* Dropdown */}
        <AnimatePresence>
          {userMenuOpen ? (
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.97 }}
              transition={{ duration: 0.15 }}
              className={`${
                mobile
                  ? "relative mt-3 w-full"
                  : "absolute right-0 top-full mt-3 w-[280px]"
              } z-[100] overflow-hidden rounded-2xl border border-[#E7F1E8] bg-white shadow-[0_18px_45px_rgba(23,62,26,0.18)]`}
            >
              {/* Account Information */}
              <div className="bg-[#F3F8F3] px-5 py-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#1B5E20] text-white">
                    <User size={20} />
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold text-[#173E1A]">
                      {displayName}
                    </p>

                    <p className="truncate text-xs text-[#607568]">
                      {currentUser?.email}
                    </p>

                    <span className="mt-1 inline-flex rounded-full bg-[#F9C74F] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-[#263238]">
                      {userRole}
                    </span>
                  </div>
                </div>
              </div>

              {/* Menu Items */}
              <div className="p-2">
                <button
                  type="button"
                  onClick={handleProfile}
                  className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-medium text-[#263238] transition hover:bg-[#F3F8F3]"
                >
                  <UserCircle size={19} className="text-[#2E7D32]" />

                  <span>Profile</span>
                </button>

                <button
                  type="button"
                  onClick={handleDashboard}
                  className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-medium text-[#263238] transition hover:bg-[#F3F8F3]"
                >
                  <LayoutDashboard size={19} className="text-[#2E7D32]" />

                  <span>Dashboard</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setUserMenuOpen(false);
                    setMenuOpen(false);
                    navigate("/cart");
                  }}
                  className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-medium text-[#263238] transition hover:bg-[#F3F8F3]"
                >
                  <ShoppingCart size={19} className="text-[#2E7D32]" />

                  <span className="flex-1">My Cart</span>

                  <span className="rounded-full bg-[#F9C74F] px-2 py-0.5 text-xs font-bold text-[#263238]">
                    {cartCount}
                  </span>
                </button>

                <div className="my-2 border-t border-[#E7F1E8]" />

                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-semibold text-[#B42318] transition hover:bg-[#FFF1F2]"
                >
                  <LogOut size={19} />

                  <span>Logout</span>
                </button>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    );
  };

  /*
  |--------------------------------------------------------------------------
  | HEADER
  |--------------------------------------------------------------------------
  */

  return (
    <motion.header
      ref={headerRef}
      initial={sticky ? { y: -100 } : false}
      animate={{ y: 0 }}
      exit={sticky ? { y: -100 } : undefined}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className={`${sticky ? "fixed left-1/2 top-4 z-[100] w-[calc(100%-2rem)] max-w-6xl -translate-x-1/2 rounded-2xl shadow-lg" : "relative z-50"} bg-[#1B5E20]`}
    >
      <motion.nav className="mx-auto flex h-[76px] max-w-6xl items-center justify-between px-5 sm:px-8 lg:px-10">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2.5">
          
          <img src={logo} alt="" className="w-40"/>
          

        </a>

        {/* Navigation */}
        <div className="hidden items-center gap-8 xl:flex">
          <NavLink
            to="/"
            className="border-b-2 border-transparent p-2 font-['Poppins'] text-sm font-medium text-white/90 transition hover:border-[#F9C74F] hover:text-[#F9C74F]"
          >
            Home
          </NavLink>

                    <NavLink
                        to="/product"
                        className="font-['Poppins'] text-sm font-medium! text-white/90 transition  hover:text-[#F9C74F] border-b-2 hover:border-[#F9C74F] p-2 border-transparent"
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

        {/* Desktop Right Side */}
        <div className="hidden items-center gap-5 xl:flex">
          {/* Search */}
          {renderSearch()}

          {/* Cart */}
          <button
            type="button"
            aria-label="Shopping cart"
            onClick={() => {
              if (isLoggedIn) {
                navigate("/cart");
              } else {
                navigate("/login");
              }
            }}
            className="relative cursor-pointer text-white transition hover:text-[#F9C74F]"
          >
            <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
              <path
                d="M4 5H6L8.2 15.2C8.4 16.2 9.3 17 10.4 17H17.5C18.5 17 19.3 16.4 19.7 15.5L21 9H7"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

                            <circle cx="10" cy="20" r="1.2" fill="currentColor"/>
                            <circle cx="18" cy="20" r="1.2" fill="currentColor"/>
                        </svg>

            <span className="absolute -right-2.5 -top-2 flex h-[17px] min-w-[17px] items-center justify-center rounded-full bg-[#F9C74F] px-1 font-['Inter'] text-[9px] font-bold text-[#263238]">
              {cartCount}
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

        {/* Mobile Menu Button */}
        <button
          type="button"
          aria-label="Open menu"
          aria-expanded={menuOpen}
          onClick={() => {
            setMenuOpen((open) => !open);
            setUserMenuOpen(false);
          }}
          className="rounded-lg p-2 text-white xl:hidden"
        >
          {menuOpen ? (
            <X size={26} />
          ) : (
            <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7">
              <path
                d="M4 7H20M4 12H20M4 17H20"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          )}
        </button>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            ref={mobileMenuRef}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-visible border-t border-white/15 bg-[#1B5E20] px-5 pb-6 pt-4 xl:hidden"
          >
            <div className="mx-auto flex max-w-6xl flex-col gap-3">
              {/* Search */}
              {renderSearch(true)}

              {/* Navigation Links */}
              {[
                ["Home", "/"],
                ["Products", "/product"],
                ["Market", "/market"],
                ["About Us", "/about-us"],
                ["Contact Us", "/contact-us"],
              ].map(([label, to]) => (
                <NavLink
                  key={to}
                  to={to}
                  onClick={() => setMenuOpen(false)}
                  className="py-2 text-sm font-medium text-white/90 transition hover:text-[#F9C74F]"
                >
                  {label}
                </NavLink>
              ))}

              {/* Mobile Account Area */}
              <div className="mt-2 border-t border-white/15 pt-4">
                {renderUserDropdown(true)}
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.header>
  );
}

export default Header;
