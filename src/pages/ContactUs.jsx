import React from "react";
import {
  FaArrowRight,
  FaClock,
  FaEnvelope,
  FaLocationDot,
  FaPhone,
  FaWhatsapp,
} from "react-icons/fa6";
import image2 from "../assets/image/Basket.jpg";

function ContactUs() {
  return (
    <main className="overflow-hidden bg-[#fffdf5] text-[#263238]">
      <section className="bg-[#e5f3df]">
        <div className="mx-auto grid max-w-[1200px] items-center gap-10 px-5 py-12 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:px-10 lg:py-16">
          <div>
            <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#1b5e20] px-4 py-2 font-[Poppins] text-xs font-semibold uppercase tracking-[0.16em] text-white">
              <span className="h-2 w-2 rounded-full bg-[#f9c74f]" /> We are here
              for you
            </p>
            <h1 className="max-w-162.5 font-[Poppins] text-4xl font-bold leading-[1.08] text-[#1b5e20] sm:text-5xl lg:text-6xl">
              Let&apos;s make fresh happen.
            </h1>
            <p className="mt-5 max-w-132.5 text-base leading-7 text-[#47604d] sm:text-lg">
              Questions, ideas, or a little help with your order? Drop us a line
              and our team will get back to you soon.
            </p>    
            <div className="mt-8 flex flex-wrap gap-3 text-sm font-semibold">
              <a
                href="mailto:support@farmersmarketlink.com"
                className="inline-flex items-center gap-2 rounded-full bg-[#f9c74f] px-5 py-3 text-[#1b5e20] transition hover:-translate-y-0.5 hover:bg-[#ffd968]"
              >
                Say hello <FaArrowRight aria-hidden="true" />
              </a>
              <a
                href="#visit-us"
                className="rounded-full border border-[#1b5e20]/25 px-5 py-3 text-[#1b5e20] transition hover:bg-white/60"
              >
                Find our market
              </a>
            </div>
          </div>
          <div className="relative">
            <div
              className="absolute -left-4 -top-4 h-20 w-20 rounded-full bg-[#f9c74f]"
              aria-hidden="true"
            />
            <img
              src={image2}
              alt="A basket of fresh vegetables"
              className="relative h-[280px] w-full rounded-[28px] object-cover shadow-[14px_14px_0_#1b5e20] sm:h-[360px]"
            />
            <div className="absolute -bottom-5 right-4 rounded-2xl bg-white px-5 py-4 shadow-lg sm:right-8">
              <p className="font-[Poppins] text-2xl font-bold text-[#1b5e20]">
                24/7
              </p>
              <p className="text-xs font-medium text-[#607d68]">
                market energy
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1200px] gap-8 px-5 py-16 sm:px-8 lg:grid-cols-[0.82fr_1.18fr] lg:px-10">
        <div>
          <p className="font-[Poppins] text-sm font-semibold uppercase tracking-[0.14em] text-[#e09f00]">
            Contact details
          </p>
          <h2 className="mt-2 font-[Poppins] text-3xl font-bold text-[#1b5e20]">
            Come say hi.
          </h2>
          <p className="mt-3 max-w-sm text-sm leading-6 text-[#607d68]">
            We love meeting the people who make local food special. Here&apos;s
            where to find us.
          </p>
          <div className="mt-8 space-y-5">
            <div className="flex gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#e5f3df] text-[#2e7d32]">
                <FaLocationDot aria-hidden="true" />
              </span>
              <div>
                <p className="font-[Poppins] font-semibold">Our location</p>
                <p className="mt-1 text-sm leading-5 text-[#607d68]">
                  123 Green Farm Road
                  <br />
                  Lagos, Nigeria
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#fff3c7] text-[#b77900]">
                <FaPhone aria-hidden="true" />
              </span>
              <div>
                <p className="font-[Poppins] font-semibold">Call us</p>
                <p className="mt-1 text-sm leading-5 text-[#607d68]">
                  +234 810 123 4567
                  <br />
                  +234 810 765 4321
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#e5f3df] text-[#2e7d32]">
                <FaEnvelope aria-hidden="true" />
              </span>
              <div>
                <p className="font-[Poppins] font-semibold">Email us</p>
                <a
                  href="mailto:support@farmersmarketlink.com"
                  className="mt-1 block text-sm text-[#607d68] hover:text-[#1b5e20]"
                >
                  support@farmersmarketlink.com
                </a>
              </div>
            </div>
            <div className="flex gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#fff3c7] text-[#b77900]">
                <FaClock aria-hidden="true" />
              </span>
              <div>
                <p className="font-[Poppins] font-semibold">Open hours</p>
                <p className="mt-1 text-sm leading-5 text-[#607d68]">
                  Mon-Fri: 8:00 AM - 6:00 PM
                  <br />
                  Sat-Sun: 9:00 AM - 4:00 PM
                </p>
              </div>
            </div>
          </div>
          <a
            href="https://wa.me/2348101234567"
            className="mt-9 inline-flex items-center gap-2 font-[Poppins] text-sm font-semibold text-[#1b5e20] hover:text-[#e09f00]"
          >
            <FaWhatsapp aria-hidden="true" className="text-lg" /> Chat with us
            on WhatsApp
          </a>
        </div>
        <div className="rounded-[28px] border border-[#dce9d8] bg-white p-6 shadow-[0_18px_50px_rgba(27,94,32,0.08)] sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-[Poppins] text-sm font-semibold uppercase tracking-[0.14em] text-[#e09f00]">
                Inbox open
              </p>
              <h2 className="mt-1 font-[Poppins] text-2xl font-bold text-[#1b5e20]">
                Send us a message
              </h2>
            </div>
            <span className="hidden rounded-full bg-[#e5f3df] px-3 py-1 text-xs font-semibold text-[#2e7d32] sm:block">
              Usually replies in 1 day
            </span>
          </div>
          <form className="mt-7 space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="text-sm font-semibold">
                Your name
                <input
                  required
                  type="text"
                  placeholder="e.g. Ada Okafor"
                  className="mt-2 w-full rounded-xl border border-[#d5e1d2] bg-[#fbfdf9] px-4 py-3 text-sm font-normal outline-none transition placeholder:text-[#9aaba0] focus:border-[#2e7d32] focus:ring-2 focus:ring-[#2e7d32]/10"
                />
              </label>
              <label className="text-sm font-semibold">
                Email address
                <input
                  required
                  type="email"
                  placeholder="you@example.com"
                  className="mt-2 w-full rounded-xl border border-[#d5e1d2] bg-[#fbfdf9] px-4 py-3 text-sm font-normal outline-none transition placeholder:text-[#9aaba0] focus:border-[#2e7d32] focus:ring-2 focus:ring-[#2e7d32]/10"
                />
              </label>
            </div>
            <label className="block text-sm font-semibold">
              What can we help with?
              <select className="mt-2 w-full rounded-xl border border-[#d5e1d2] bg-[#fbfdf9] px-4 py-3 text-sm font-normal outline-none focus:border-[#2e7d32]">
                <option>General enquiry</option>
                <option>Order support</option>
                <option>Become a farmer partner</option>
                <option>Feedback</option>
              </select>
            </label>
            <label className="block text-sm font-semibold">
              Your message
              <textarea
                required
                rows="5"
                placeholder="Tell us what is on your mind..."
                className="mt-2 w-full resize-none rounded-xl border border-[#d5e1d2] bg-[#fbfdf9] px-4 py-3 text-sm font-normal outline-none transition placeholder:text-[#9aaba0] focus:border-[#2e7d32] focus:ring-2 focus:ring-[#2e7d32]/10"
              />
            </label>
            <button
              type="submit"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#1b5e20] px-5 py-3.5 font-[Poppins] text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#2e7d32]"
            >
              Send message <FaArrowRight aria-hidden="true" />
            </button>
          </form>
        </div>
      </section>

      <section
        id="visit-us"
        className="bg-[#1b5e20] px-5 py-14 text-white sm:px-8 lg:px-10"
      >
        <div className="mx-auto max-w-[1200px]">
          <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="font-[Poppins] text-sm font-semibold uppercase tracking-[0.14em] text-[#f9c74f]">
                The local spot
              </p>
              <h2 className="mt-2 font-[Poppins] text-3xl font-bold">
                Find us in Lagos.
              </h2>
            </div>
            <a
              href="https://www.google.com/maps/search/?api=1&query=123+Green+Farm+Road+Lagos+Nigeria"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#f9c74f] hover:text-white"
            >
              Open in Google Maps <FaArrowRight aria-hidden="true" />
            </a>
          </div>
          <div className="overflow-hidden rounded-[24px] border-4 border-white/10 bg-[#dce9d8] shadow-[0_18px_50px_rgba(0,0,0,0.18)]">
            <iframe
              title="Map showing Farmer MarketLink in Lagos, Nigeria"
              src="https://www.google.com/maps?q=123+Green+Farm+Road,+Lagos,+Nigeria&output=embed"
              className="h-[320px] w-full border-0 sm:h-[390px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </main>
  );
}

export default ContactUs;
