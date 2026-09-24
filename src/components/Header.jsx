function Header() {
  return (
    <header className="relative z-50 bg-[#1B5E20]">
      <nav className="mx-auto flex h-[76px] max-w-[1200px] items-center justify-between px-5 sm:px-8 lg:px-10">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2.5">
          <div className="flex h-11 w-11 items-center justify-center">
            <svg viewBox="0 0 48 48" fill="none" className="h-11 w-11">
              <path
                d="M24 43C24 30 25 20 34 10"
                stroke="#F9C74F"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <path
                d="M23 30C14 29 8 24 7 16C15 15 23 19 25 27"
                fill="#A5D6A7"
              />
              <path
                d="M25 22C27 13 34 8 42 8C41 17 35 23 25 24"
                fill="#F9C74F"
              />
              <path
                d="M24 36C16 35 11 31 9 25C17 25 22 28 24 36"
                fill="#4CAF50"
              />
            </svg>
          </div>

          <div className="leading-[1]">
            <span className="block font-['Poppins'] text-[17px] font-bold text-white">
              Farmer's
            </span>

            <span className="block font-['Poppins'] text-[17px] font-bold text-[#F9C74F]">
              MarketLink
            </span>
          </div>
        </a>

        {/* Navigation */}
        <div className="hidden items-center gap-8 lg:flex">
          <a
            href="/"
            className="relative font-['Poppins'] text-sm font-semibold text-white"
          >
            Home
            <span className="absolute -bottom-[22px] left-0 h-[3px] w-full rounded-full bg-[#F9C74F]" />
          </a>

          <a
            href="/shop"
            className="font-['Poppins'] text-sm font-medium text-white/90 transition hover:text-[#F9C74F]"
          >
            Shop
          </a>

          <a
            href="/farmers"
            className="font-['Poppins'] text-sm font-medium text-white/90 transition hover:text-[#F9C74F]"
          >
            For Farmers
          </a>

          <a
            href="/about"
            className="font-['Poppins'] text-sm font-medium text-white/90 transition hover:text-[#F9C74F]"
          >
            About
          </a>

          <a
            href="/contact"
            className="font-['Poppins'] text-sm font-medium text-white/90 transition hover:text-[#F9C74F]"
          >
            Contact
          </a>
        </div>

        {/* Right side */}
        <div className="hidden items-center gap-4 lg:flex">
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

          {/* Account */}
          <button
            aria-label="Account"
            className="text-white transition hover:text-[#F9C74F]"
          >
            <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
              <circle
                cx="12"
                cy="8"
                r="3.5"
                stroke="currentColor"
                strokeWidth="1.8"
              />

              <path
                d="M5.5 20C6.1 15.9 8.3 14 12 14C15.7 14 17.9 15.9 18.5 20"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </button>

          {/* Cart */}
          <button
            aria-label="Shopping cart"
            className="relative text-white transition hover:text-[#F9C74F]"
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
