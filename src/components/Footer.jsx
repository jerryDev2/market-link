import React from "react";
import { Link } from "react-router-dom";

const quickLinks = [
  { label: "Home", to: "/" },
  { label: "Products", to: "/product" },
  { label: "Market", to: "/market" },
  { label: "About Us", to: "/about-us" },
  { label: "Contact", to: "/contact-us" },
];

const supportLinks = [
  { label: "Login", to: "/login" },
  { label: "Register", to: "/signup" },
];

function Footer() {
  return (
    <footer className="relative mt-10 overflow-hidden bg-[#153D1F] text-[#F7F3E8]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(249,199,79,0.18),transparent_30%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.02),transparent,rgba(255,255,255,0.04))]" />

      <div className="relative mx-auto max-w-[1400px] px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr_1fr_1.3fr] lg:items-start">
          <div className="pr-6">
            <div className="mb-4 inline-flex items-center gap-2 rounded-xl border border-[#2E6B3F] bg-[#1D4F2B] px-3 py-2 shadow-[0_10px_30px_rgba(0,0,0,0.18)]">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#F9C74F] text-base font-black text-[#173E1A]">
                M
              </div>
              <div className="leading-none">
                <div className="text-[10px] font-black uppercase tracking-[0.18em] text-[#F7F3E8]">
                  MarketLink
                </div>
              </div>
            </div>

            <h3 className="text-3xl font-black tracking-[-0.04em] text-[#F7F3E8]">
              MarketLink
            </h3>

            <p className="mt-4 max-w-xs text-base leading-7 text-[#E7F4E6]">
              Fresh, local food and everyday essentials sourced from trusted
              farmers and nearby communities.
            </p>
          </div>

          <div>
            <h4 className="mb-5 text-xl font-semibold text-[#F7F3E8]">
              Quick Links
            </h4>
            <ul className="space-y-3 text-base text-[#E7F4E6]">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="transition hover:text-[#F9C74F]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-5 text-xl font-semibold text-[#F7F3E8]">
              Support
            </h4>
            <ul className="space-y-3 text-base text-[#E7F4E6]">
              {supportLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="transition hover:text-[#F9C74F]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-5 text-xl font-semibold text-[#F7F3E8]">
              Join Our Newsletter
            </h4>
            <p className="max-w-sm text-base leading-7 text-[#E7F4E6]">
              Get weekly farm updates, fresh picks, and local market deals
              straight to your inbox.
            </p>

            <div className="mt-5 flex max-w-md overflow-hidden rounded-xl border border-[#2E6B3F] bg-[#1D4F2B] shadow-sm">
              <input
                type="email"
                placeholder="Your email"
                className="w-full border-0 bg-transparent px-4 py-3.5 text-base text-[#F7F3E8] placeholder:text-[#CFEBD3] outline-none"
              />
              <button
                type="button"
                className="whitespace-nowrap bg-[#F9C74F] px-5 py-3 text-base font-semibold text-[#173E1A] transition hover:bg-[#f0bb39]"
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-[#2E6B3F] pt-5 text-center text-sm text-[#D9EEDB]">
          © 2026 MarketLink — All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
