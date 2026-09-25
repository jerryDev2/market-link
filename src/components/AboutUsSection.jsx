import { Link } from "react-router-dom";

function AboutUsSection() {
  return (
    <section className="relative overflow-hidden bg-[#E8F5E9] py-20 sm:py-24">
      <div className="relative mx-auto max-w-[1200px] px-5 sm:px-8 lg:px-10">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Image Side */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-[24px]">
              <img
                src="/images/about-market.jpg"
                alt="Local farmer with fresh farm produce"
                className="h-[380px] w-full object-cover sm:h-[450px]"
              />

              {/* Image overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1B5E20]/50 via-transparent to-transparent" />
            </div>

            {/* Floating card */}
            <div className="absolute -bottom-6 right-4 rounded-2xl bg-white px-5 py-4 shadow-[0_10px_30px_rgba(27,94,32,0.15)] sm:right-8">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#E8F5E9]">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    className="h-6 w-6 text-[#1B5E20]"
                  >
                    <path
                      d="M12 21s8-4.5 8-11a8 8 0 0 0-16 0c0 6.5 8 11 8 11Z"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    />
                    <path
                      d="M9 10.5c1.5-2 4.5-2 6 0M9.5 14c1.5 1 3.5 1 5 0"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>

                <div>
                  <p className="font-['Poppins'] text-sm font-bold text-[#1B5E20]">
                    Local & Fresh
                  </p>
                  <p className="font-['Inter'] text-xs text-[#607D8B]">
                    Supporting local farmers
                  </p>
                </div>
              </div>
            </div>

            {/* Small accent */}
            <div className="absolute -left-3 -top-3 h-16 w-16 rounded-2xl border-4 border-[#F9C74F] sm:-left-5 sm:-top-5" />
          </div>

          {/* Content Side */}
          <div className="lg:pl-4">
            <div className="mb-4 flex items-center gap-3">
              <span className="h-[2px] w-8 bg-[#F9C74F]" />

              <span className="font-['Poppins'] text-xs font-semibold uppercase tracking-[0.18em] text-[#1B5E20]">
                About MarketLink
              </span>
            </div>

            <h2 className="max-w-xl font-['Poppins'] text-3xl font-bold leading-tight text-[#1B5E20] sm:text-4xl">
              Connecting local farmers with the people they feed.
            </h2>

            <p className="mt-5 font-['Inter'] text-base leading-7 text-[#455A64]">
              MarketLink makes it easier for people to discover fresh farm
              products while giving local farmers a better way to reach
              customers in their communities.
            </p>

            <p className="mt-4 font-['Inter'] text-base leading-7 text-[#455A64]">
              From finding a nearby market to browsing products and pre-ordering
              your produce, we are creating a simpler connection between the
              farm and your table.
            </p>

            {/* Brand values */}
            <div className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div>
                <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-white text-[#1B5E20]">
                  ✓
                </div>
                <p className="font-['Poppins'] text-sm font-semibold text-[#1B5E20]">
                  Fresh Produce
                </p>
              </div>

              <div>
                <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-white text-[#1B5E20]">
                  ✓
                </div>
                <p className="font-['Poppins'] text-sm font-semibold text-[#1B5E20]">
                  Local Farmers
                </p>
              </div>

              <div>
                <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-white text-[#1B5E20]">
                  ✓
                </div>
                <p className="font-['Poppins'] text-sm font-semibold text-[#1B5E20]">
                  Better Communities
                </p>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-8">
              <Link
                to="/about"
                className="group inline-flex items-center gap-2 rounded-xl bg-[#1B5E20] px-6 py-3.5 font-['Poppins'] text-sm font-semibold text-white shadow-[0_5px_15px_rgba(27,94,32,0.15)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#2E7D32]"
              >
                Learn More About Us
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutUsSection;
