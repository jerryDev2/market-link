import React from "react";

function Avert() {
  return (
    <section className="px-4 pb-16 pt-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[28px]">
        <div
          className="relative flex min-h-[360px] items-center justify-center overflow-hidden bg-blend-overlay bg-[#00000057] bg-cover bg-center bg-[url('/images/farm.jpg')]"
      
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.18),transparent_52%)]" />

          <div className="relative z-10 flex w-full max-w-4xl flex-col items-center px-6 text-center">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-white/80">
              Sustainable living
            </p>
            <h2 className="max-w-3xl text-4xl font-semibold leading-[1.02] tracking-[-0.06em] text-white sm:text-5xl lg:text-6xl">
              Join our farming community today
            </h2>

            <div className="mt-8 flex w-full max-w-lg items-center overflow-hidden rounded-full border border-white/20 bg-white/90 shadow-[0_12px_30px_rgba(0,0,0,0.16)] backdrop-blur-sm">
              <input
                type="text"
                placeholder="Enter your email"
                className="w-full border-0 bg-transparent px-5 py-3.5 text-sm text-[#1B1B1B] placeholder:text-[#4F5A52] outline-none"
              />
              <button
                type="button"
                className="mr-2 shrink-0 rounded-full bg-[#EAF45F] px-5 py-2.5 text-sm font-semibold text-[#1B1B1B] transition hover:bg-[#dfe94a]"
              >
                Join now
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Avert;
