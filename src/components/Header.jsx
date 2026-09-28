import { useContext, useEffect, useRef, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Search, X } from "lucide-react";
import { ShopContext } from "../context/ShopContext.jsx";
import logo from "../assets/images/marketlinklogo.png";

const getStoredUser = () => {
  try {
    const rawUser = localStorage.getItem("user");
    return rawUser ? JSON.parse(rawUser) : null;
  } catch (error) {
    return null;
  }
};

function Header() {
  const [currentUser, setCurrentUser] = useState(() => getStoredUser());
  const [cartCount, setCartCount] = useState(() =>
    Number(localStorage.getItem("cartCount") || 0),
  );
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const { products } = useContext(ShopContext);
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

  const renderSearch = (mobile = false) => (
    <form
      onSubmit={submitSearch}
      className={`relative flex h-10 items-center rounded-full bg-[#FFFDF5] px-4 ${mobile ? "w-full" : "w-[210px]"}`}
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
            className="absolute left-0 right-0 top-full z-[60] mt-2 overflow-hidden rounded-xl border border-[#E7F1E8] bg-white py-1 text-[#173E1A] shadow-[0_16px_36px_rgba(23,62,26,0.16)]"
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

  useEffect(() => {
    const syncUser = () => setCurrentUser(getStoredUser());
    const syncCart = () =>
      setCartCount(Number(localStorage.getItem("cartCount") || 0));

    syncUser();
    syncCart();

    window.addEventListener("storage", syncUser);
    window.addEventListener("storage", syncCart);
    window.addEventListener("auth-change", syncUser);
    window.addEventListener("auth-change", syncCart);
    window.addEventListener("cart-updated", syncCart);

    return () => {
      window.removeEventListener("storage", syncUser);
      window.removeEventListener("storage", syncCart);
      window.removeEventListener("auth-change", syncUser);
      window.removeEventListener("auth-change", syncCart);
      window.removeEventListener("cart-updated", syncCart);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isCustomer =
    currentUser &&
    String(currentUser.role || currentUser.userRole || "").toUpperCase() ===
      "CUSTOMER";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setCurrentUser(null);
    window.dispatchEvent(new Event("auth-change"));
    navigate("/");
  };

  return (
    <motion.header className="relative z-50 bg-[#1B5E20]">
      <motion.nav className="mx-auto flex h-[76px] max-w-6xl items-center justify-between px-5 sm:px-8 lg:px-10">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2.5">
          
          <img src={logo} alt="" className="w-40"/>
          

        </a>

        {/* Navigation */}
        <div className="hidden items-center gap-8 xl:flex">
          <NavLink
            to="/"
            className="font-['Poppins'] text-sm font-medium text-white/90 transition hover:text-[#F9C74F] border-b-2 hover:border-[#F9C74F] p-2 border-transparent "
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

        {/* Right side */}
        <div className="hidden items-center gap-7 xl:flex">
          {/* Search */}
          {renderSearch()}

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

                            <circle cx="10" cy="20" r="1.2" fill="currentColor"/>
                            <circle cx="18" cy="20" r="1.2" fill="currentColor"/>
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
          type="button"
          aria-label="Open menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
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
      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-visible border-t border-white/15 bg-[#1B5E20] px-5 pb-5 pt-4 xl:hidden"
          >
            <div className="mx-auto flex max-w-6xl flex-col gap-3">
              {renderSearch(true)}
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
                  className="py-2 text-sm font-medium text-white/90 hover:text-[#F9C74F]"
                >
                  {label}
                </NavLink>
              ))}
              <div className="flex items-center gap-3 border-t border-white/15 pt-3">
                <button
                  type="button"
                  onClick={() => {
                    setMenuOpen(false);
                    navigate(
                      currentUser && localStorage.getItem("token")
                        ? "/cart"
                        : "/login",
                    );
                  }}
                  className="rounded-lg border border-white/20 px-4 py-2 text-sm font-semibold text-white"
                >
                  Cart ({cartCount})
                </button>
                {currentUser ? (
                  <button
                    type="button"
                    onClick={() => {
                      setMenuOpen(false);
                      navigate("/customer-profile");
                    }}
                    className="rounded-lg bg-[#F9C74F] px-4 py-2 text-sm font-semibold text-[#173E1A]"
                  >
                    Profile
                  </button>
                ) : (
                  <Link
                    to="/login"
                    onClick={() => setMenuOpen(false)}
                    className="rounded-lg bg-[#F9C74F] px-4 py-2 text-sm font-semibold text-[#173E1A]"
                  >
                    Sign in
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.header>
  );
}

export default Header;
