function HeroSection() {
  return (
    <section className="overflow-hidden bg-[#FFFDF5]">
      <div className="relative mx-auto min-h-[650px] max-w-[1400px] overflow-hidden">
        {/* Decorative background */}
        <div className="pointer-events-none absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-[#E8F5E9]" />

        <div className="pointer-events-none absolute -bottom-48 -left-40 h-[500px] w-[500px] rounded-full bg-[#A5D6A7]/30" />

        <div className="relative grid min-h-[650px] lg:grid-cols-[0.92fr_1.08fr]">
          {/* ================= LEFT CONTENT ================= */}
          <div className="relative z-10 flex flex-col justify-center px-6 py-16 sm:px-10 lg:px-14 xl:px-20">
            {/* Eyebrow */}
            <div className="mb-6 flex items-center gap-3">
              <span className="h-[2px] w-10 bg-[#F9C74F]" />

              <span className="font-['Poppins'] text-xs font-semibold uppercase tracking-[0.18em] text-[#1B5E20]">
                Connecting Farmers
              </span>
            </div>

            {/* Heading */}
            <h1 className="max-w-[650px] font-['Poppins'] text-[42px] font-bold leading-[1.08] tracking-[-1.5px] text-[#1B5E20] sm:text-[52px] lg:text-[54px] xl:text-[60px]">
              Fresh produce,
              <br />
              <span className="relative inline-block">
                straight from
                <span className="absolute bottom-0 left-0 h-2 w-full rounded-full bg-[#F9C74F]/30" />
              </span>
              <br />
              <span className="text-[#F9C74F]">local farmers.</span>
            </h1>

            {/* Description */}
            <p className="mt-7 max-w-[500px] font-['Inter'] text-[16px] leading-7 text-[#455A64] sm:text-[17px]">
              Discover fresh, healthy and affordable produce while supporting
              the farmers who grow it. One marketplace, connecting local farms
              directly to your doorstep.
            </p>

            {/* CTA Buttons */}
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a
                href="/shop"
                className="group flex items-center gap-3 rounded-xl bg-[#1B5E20] px-7 py-3.5 font-['Poppins'] text-sm font-semibold text-white shadow-[0_8px_20px_rgba(27,94,32,0.18)] transition duration-300 hover:-translate-y-1 hover:bg-[#145218] hover:shadow-[0_12px_25px_rgba(27,94,32,0.25)]"
              >
                Shop Fresh Produce
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </a>

              <a
                href="/farmers"
                className="group flex items-center gap-2 rounded-xl border-[1.5px] border-[#1B5E20] px-7 py-3.5 font-['Poppins'] text-sm font-semibold text-[#1B5E20] transition duration-300 hover:bg-[#E8F5E9]"
              >
                Meet Our Farmers
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </a>
            </div>

            {/* Trust indicators */}
            <div className="mt-12 flex flex-wrap items-center gap-6 sm:gap-8">
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#E8F5E9]">
                  <span className="text-lg">🌱</span>
                </div>

                <div>
                  <p className="font-['Poppins'] text-xs font-semibold text-[#1B5E20]">
                    Fresh & Natural
                  </p>

                  <p className="font-['Inter'] text-[10px] text-[#607D8B]">
                    From local farms
                  </p>
                </div>
              </div>

              <div className="hidden h-8 w-px bg-[#C8DCC9] sm:block" />

              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#E8F5E9]">
                  <span className="text-lg">🚚</span>
                </div>

                <div>
                  <p className="font-['Poppins'] text-xs font-semibold text-[#1B5E20]">
                    Fast Delivery
                  </p>

                  <p className="font-['Inter'] text-[10px] text-[#607D8B]">
                    To your doorstep
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ================= RIGHT IMAGE ================= */}
          <div className="relative min-h-[480px] lg:min-h-full">
            <div className="absolute inset-0">
              <img
                src="/src/assets/homepage-images/home-img1.png"
                alt="Local farmer holding freshly harvested produce"
                className="h-full w-full object-contain"
              />

              {/* Soft blend into content */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#FFFDF5] via-transparent to-transparent lg:w-1/3" />

              <div className="absolute inset-0 bg-gradient-to-t from-[#1B5E20]/25 via-transparent to-transparent" />
            </div>

            {/* Fresh / Local / Healthy badge */}
            <div className="absolute left-6 top-8 z-10 sm:left-10 sm:top-12 lg:left-12 lg:top-16">
              <div className="relative flex h-[125px] w-[125px] rotate-[-7deg] items-center justify-center rounded-full bg-[#FFFDF5]/95 shadow-xl backdrop-blur-sm">
                <div className="absolute inset-2 rounded-full border border-dashed border-[#A5D6A7]" />

                <div className="text-center font-['Poppins']">
                  <span className="block text-[18px] font-bold italic leading-none text-[#1B5E20]">
                    Fresh
                  </span>

                  <span className="block text-[14px] font-semibold italic text-[#2E7D32]">
                    Local
                  </span>

                  <span className="block text-[13px] font-bold italic text-[#F9C74F]">
                    Healthy
                  </span>
                </div>
              </div>
            </div>

            {/* Floating card */}
            <div className="absolute bottom-7 right-5 z-10 w-[230px] rounded-2xl border border-white/60 bg-[#FFFDF5]/95 p-4 shadow-[0_15px_40px_rgba(27,94,32,0.18)] backdrop-blur-md sm:bottom-10 sm:right-8 sm:w-[260px] lg:bottom-12 lg:right-12">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#E8F5E9] text-2xl">
                  🥬
                </div>

                <div>
                  <p className="font-['Poppins'] text-xs font-semibold text-[#1B5E20]">
                    Farm Fresh
                  </p>

                  <p className="font-['Inter'] text-[11px] text-[#607D8B]">
                    Harvested with care
                  </p>
                </div>

                <div className="ml-auto flex h-7 w-7 items-center justify-center rounded-full bg-[#1B5E20] text-xs text-white">
                  ✓
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Brand strip */}
      <div className="border-t border-[#D9E8DA] bg-[#E8F5E9]">
        <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-center gap-x-8 gap-y-3 px-6 py-4 sm:justify-between lg:px-10">
          <p className="font-['Poppins'] text-xs font-semibold text-[#1B5E20]">
            🌱 Fresh Produce
          </p>

          <span className="hidden h-4 w-px bg-[#A5D6A7] sm:block" />

          <p className="font-['Poppins'] text-xs font-semibold text-[#1B5E20]">
            👨‍🌾 Local Farmers
          </p>

          <span className="hidden h-4 w-px bg-[#A5D6A7] sm:block" />

          <p className="font-['Poppins'] text-xs font-semibold text-[#1B5E20]">
            🤝 Better Communities
          </p>

          <span className="hidden h-4 w-px bg-[#A5D6A7] sm:block" />

          <p className="font-['Poppins'] text-xs font-semibold text-[#1B5E20]">
            💚 Shop With Purpose
          </p>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
