import React from "react";

const categories = [
  {
    title: "Crop & Grain Farms",
    badge: "Staple Harvest",
    image: "/images/Crop%20and%20Grain%20Farms/crop%20and%20grain.jfif",
    description:
      "Maize, wheat, rice, and sorghum grown for reliable food supply and daily nutrition.",
  },
  {
    title: "Horticulture & Vegetable Farms",
    badge: "Fresh Produce",
    image:
      "/images/Horticulture%20and%20Vegetable%20Farms/Horticulture%20and%20Vegetable%20Farms.jfif",
    description:
      "Fresh fruits, greens, and vegetables grown for taste, health, and local variety.",
  },
  {
    title: "Livestock & Dairy Farms",
    badge: "Healthy Living",
    image:
      "/images/Livestock%20and%20Dairy%20Farms/Livestock%20and%20Dairy%20Farms.jfif",
    description:
      "Milk, meat, and livestock products from farms focused on quality and care.",
  },
  {
    title: "Poultry & Egg Farms",
    badge: "Protein Source",
    image:
      "/images/Poultry%20and%20Egg%20Farms/Poultry%20and%20Egg%20Farms.jfif",
    description:
      "Eggs and poultry raised with care for everyday nutrition and freshness.",
  },
];

function Categories() {
  return (
    <section
      id="categories"
      className="relative overflow-hidden bg-[#F5F9F3] py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <span className="inline-flex items-center rounded-full border border-[#CDE7D0] bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#1B5E20] shadow-sm">
              Farm Categories
            </span>
            <h2 className="mt-4 text-3xl font-black tracking-tight text-[#173E1A] sm:text-4xl">
              Find your favorite harvest
            </h2>
          </div>

          <button
            type="button"
            className="inline-flex items-center gap-2 self-start rounded-full border border-[#1B5E20]/10 bg-white px-4 py-2.5 text-sm font-semibold text-[#1B5E20] shadow-sm transition hover:-translate-y-0.5 hover:border-[#1B5E20]/20 hover:shadow-md"
          >
            Browse all farms
            <span aria-hidden="true">→</span>
          </button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {categories.map(({ title, badge, image, description }) => (
            <article
              key={title}
              className="group overflow-hidden rounded-[28px] border border-[#E7F3E8] bg-white shadow-[0_18px_45px_rgba(27,94,32,0.08)] transition duration-300 hover:-translate-y-2 hover:shadow-[0_25px_60px_rgba(27,94,32,0.12)]"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={image}
                  alt={title}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0C1E10]/75 via-[#0C1E10]/10 to-transparent" />
                <span className="absolute left-4 top-4 inline-flex rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#1B5E20] backdrop-blur-sm">
                  {badge}
                </span>
              </div>

              <div className="p-5">
                <h3 className="text-xl font-bold leading-tight text-[#173E1A]">
                  {title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-[#4B5F52]">
                  {description}
                </p>

                <div className="mt-5 flex items-center justify-between">
                  <button
                    type="button"
                    className="rounded-full bg-[#1B5E20] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#154a1a]"
                  >
                    View
                  </button>
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#EAF7EA] text-lg text-[#1B5E20]">
                    →
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Categories;
