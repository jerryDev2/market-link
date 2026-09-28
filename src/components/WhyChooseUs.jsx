import React from "react";

const features = [
  {
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6">
        <path
          d="M4 15.5C6 12.7 8.4 11 12 11c3.4 0 5.8 1.6 8 4.5V19H4v-3.5Zm8-8.5c2.2 0 4 1.8 4 4 0 1.7-1.1 3.1-2.6 3.7C14.1 15 15 14 15 12.5c0-2.2-1.8-4-4-4s-4 1.8-4 4c0 1.5.9 2.5 2.6 3.2A4.1 4.1 0 0 1 8 11a4 4 0 0 1 4-4Z"
          fill="currentColor"
        />
      </svg>
    ),
    title: "Direct from Farmers",
    description:
      "Connect with trusted local growers and shop fresh produce harvested close to home.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6">
        <path
          d="M12 2a7 7 0 0 1 7 7c0 5.2-7 13-7 13S5 14.2 5 9a7 7 0 0 1 7-7Zm0 10.5A3.5 3.5 0 1 0 12 5a3.5 3.5 0 0 0 0 7.5Z"
          fill="currentColor"
        />
      </svg>
    ),
    title: "Find Nearby Markets",
    description:
      "Discover the best farm markets and stalls near you with location-based convenience.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6">
        <path
          d="M7 2.5A2.5 2.5 0 0 0 4.5 5v14A2.5 2.5 0 0 0 7 21.5h10A2.5 2.5 0 0 0 19.5 19V5A2.5 2.5 0 0 0 17 2.5H7Zm0 3h10v10.5H7V5.5Zm2 13h6v2H9v-2Z"
          fill="currentColor"
        />
      </svg>
    ),
    title: "Pre-Order Easily",
    description:
      "Reserve your favorite foods in advance and pick them up without the stress of last-minute queues.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6">
        <path
          d="M16.5 3a3.5 3.5 0 0 1 3.5 3.5c0 3.3-3.5 6.2-6.5 9.2-3-3-6.5-5.9-6.5-9.2A3.5 3.5 0 0 1 10.5 3c1.1 0 2.1.4 2.9 1.1A4 4 0 0 1 16.5 3Zm-8 7.8A3.5 3.5 0 0 0 5 14.4v2.8A2.8 2.8 0 0 0 7.8 20h8.4A2.8 2.8 0 0 0 19 17.2v-2.8a3.5 3.5 0 0 0-3.5-3.5H8.5Z"
          fill="currentColor"
        />
      </svg>
    ),
    title: "Support the Community",
    description:
      "Build stronger local relationships while helping farmers and families thrive together.",
  },
];

function WhyChooseUs() {
  return (
    <section className="bg-[#FFFDF5] px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#1B5E20]">
            Why choose us
          </p>
          <h2 className="mt-4 text-3xl font-black tracking-tight text-[#173E1A] sm:text-4xl lg:text-5xl">
            A better way to buy local
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-[#3F4D43] sm:text-lg">
            MarketLink makes it easier for families to shop fresh, local food
            while helping farmers grow sustainable businesses.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {features.map(({ icon, title, description }) => (
            <article
              key={title}
              className="rounded-[28px] border border-[#E7F3E8] bg-white p-6 shadow-[0_18px_45px_rgba(27,94,32,0.06)] transition duration-300 hover:-translate-y-2 hover:shadow-[0_25px_60px_rgba(27,94,32,0.1)]"
            >
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#EAF7EA] text-[#1B5E20] shadow-sm">
                {icon}
              </div>

              <h3 className="text-xl font-bold text-[#173E1A]">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-[#4B5F52]">
                {description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WhyChooseUs;
