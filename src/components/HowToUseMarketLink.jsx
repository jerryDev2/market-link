function HowToUseMarketLink() {
  const steps = [
    {
      number: "01",
      title: "Find a Market",
      description:
        "Discover farmers markets and local sellers near you. Find fresh produce from trusted local farmers.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7">
          <path
            d="M20 10C20 15 12 21 12 21S4 15 4 10a8 8 0 1 1 16 0Z"
            stroke="currentColor"
            strokeWidth="1.8"
          />
          <circle
            cx="12"
            cy="10"
            r="2.5"
            stroke="currentColor"
            strokeWidth="1.8"
          />
        </svg>
      ),
    },

    {
      number: "02",
      title: "Browse Products",
      description:
        "Explore fresh fruits, vegetables, grains and other farm products available from local sellers.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7">
          <path
            d="M6 8h12l1 12H5L6 8Z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          <path
            d="M9 8a3 3 0 0 1 6 0"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      ),
    },

    {
      number: "03",
      title: "Pre-order",
      description:
        "Choose what you need, place your order ahead of time and secure your fresh produce before it sells out.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7">
          <rect
            x="5"
            y="3"
            width="14"
            height="18"
            rx="2"
            stroke="currentColor"
            strokeWidth="1.8"
          />
          <path
            d="m9 12 2 2 4-4"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },

    {
      number: "04",
      title: "Pick Up",
      description:
        "Head to your selected market, meet your local seller and pick up your fresh order with ease.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7">
          <path
            d="M3 6h11v11H3V6Z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          <path
            d="M14 10h4l3 3v4h-7v-7Z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          <circle
            cx="7"
            cy="19"
            r="1.5"
            stroke="currentColor"
            strokeWidth="1.8"
          />
          <circle
            cx="18"
            cy="19"
            r="1.5"
            stroke="currentColor"
            strokeWidth="1.8"
          />
        </svg>
      ),
    },
  ];

  return (
    <section className="relative overflow-hidden bg-[#FFFDF5] py-20 sm:py-24">
      {/* Decorative background */}
      <div className="pointer-events-none absolute -left-32 top-20 h-64 w-64 rounded-full bg-[#E8F5E9]" />

      <div className="pointer-events-none absolute -right-32 bottom-0 h-72 w-72 rounded-full bg-[#A5D6A7]/25" />

      <div className="relative mx-auto max-w-[1200px] px-5 sm:px-8 lg:px-10">
        {/* ================= SECTION HEADER ================= */}
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="h-[2px] w-8 bg-[#F9C74F]" />

            <span className="font-['Poppins'] text-xs font-semibold uppercase tracking-[0.18em] text-[#1B5E20]">
              Simple & Convenient
            </span>

            <span className="h-[2px] w-8 bg-[#F9C74F]" />
          </div>

          <h2 className="font-['Poppins'] text-3xl font-bold tracking-tight text-[#1B5E20] sm:text-4xl">
            How MarketLink Works
          </h2>

          <p className="mx-auto mt-4 max-w-xl font-['Inter'] text-sm leading-7 text-[#607D8B] sm:text-base">
            From finding your local market to picking up your fresh produce,
            MarketLink makes buying directly from local farmers simple.
          </p>
        </div>

        {/* ================= STEPS ================= */}
        <div className="relative mt-14">
          {/* Connecting line - desktop */}
          <div className="absolute left-[12%] right-[12%] top-[43px] hidden h-[2px] bg-gradient-to-r from-[#A5D6A7] via-[#F9C74F] to-[#A5D6A7] lg:block" />

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
            {steps.map((step, index) => (
              <div key={step.number} className="group relative">
                {/* Card */}
                <div className="relative h-full rounded-2xl border border-[#E8F5E9] bg-white p-6 text-center shadow-[0_5px_20px_rgba(27,94,32,0.05)] transition-all duration-300 hover:-translate-y-2 hover:border-[#A5D6A7] hover:shadow-[0_15px_35px_rgba(27,94,32,0.1)]">
                  {/* Step number */}
                  <div className="absolute right-4 top-4 font-['Poppins'] text-xs font-bold text-[#A5D6A7]">
                    {step.number}
                  </div>

                  {/* Icon */}
                  <div className="relative mx-auto mb-5 flex h-[68px] w-[68px] items-center justify-center rounded-2xl bg-[#E8F5E9] text-[#1B5E20] transition-all duration-300 group-hover:bg-[#1B5E20] group-hover:text-white">
                    {/* Yellow accent */}
                    <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-[#F9C74F]" />

                    {step.icon}
                  </div>

                  <h3 className="font-['Poppins'] text-lg font-semibold text-[#1B5E20]">
                    {step.title}
                  </h3>

                  <p className="mt-3 font-['Inter'] text-sm leading-6 text-[#607D8B]">
                    {step.description}
                  </p>

                  {/* Mobile/Tablet arrow */}
                  {index < steps.length - 1 && (
                    <div className="mt-6 flex justify-center lg:hidden">
                      <span className="text-xl text-[#A5D6A7]">↓</span>
                    </div>
                  )}
                </div>

                {/* Desktop connector node */}
                {index < steps.length - 1 && (
                  <div className="absolute -right-[15px] top-[35px] z-10 hidden h-7 w-7 items-center justify-center rounded-full border-4 border-[#FFFDF5] bg-[#F9C74F] lg:flex">
                    <span className="text-[10px] font-bold text-[#1B5E20]">
                      →
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ================= BOTTOM CTA ================= */}
        <div className="mx-auto mt-14 flex max-w-3xl flex-col items-center justify-between gap-5 rounded-2xl bg-[#1B5E20] px-7 py-6 text-center sm:flex-row sm:text-left">
          <div>
            <h3 className="font-['Poppins'] text-lg font-semibold text-white">
              Ready to shop fresh?
            </h3>

            <p className="mt-1 font-['Inter'] text-sm text-[#C8E6C9]">
              Connect with local farmers and discover what's fresh near you.
            </p>
          </div>

          <a
            href="/shop"
            className="group flex shrink-0 items-center gap-2 rounded-lg bg-[#F9C74F] px-5 py-3 font-['Poppins'] text-sm font-semibold text-[#263238] transition duration-300 hover:-translate-y-0.5 hover:bg-[#FFD66B]"
          >
            Explore Markets
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}

export default HowToUseMarketLink;
