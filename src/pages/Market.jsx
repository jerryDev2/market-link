import React, { useState } from "react";
const navItems = ["Home", "Shop", "For Farmers", "About", "Contact"];

const harvestCategories = [
  {
    name: "Fruits",
    description:
      "Sweet, fresh and naturally grown fruits straight from local farms.",
    image:
      "https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=900&q=85",
    badgeImage:
      "https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=160&q=85",
  },
  {
    name: "Vegetables",
    description: "Fresh vegetables for a healthier you and your family.",
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=85",
    badgeImage:
      "https://images.unsplash.com/photo-1524179091875-bf99a9a6af57?auto=format&fit=crop&w=160&q=85",
  },
  {
    name: "Dairy",
    description: "Pure cow milk, artisan wara cheese, nunu and farm butter.",
    image:
      "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=900&q=85",
    badgeImage:
      "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=160&q=85",
  },
];

const moreHarvestCategories = [
  {
    name: "Poultry",
    description:
      "Farm-fresh eggs, live broilers, cockerels and dressed turkey.",
    image:
      "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&w=900&q=85",
    badgeImage:
      "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?auto=format&fit=crop&w=160&q=85",
  },
  {
    name: "Livestock",
    description: "Quality livestock, live catfish and fresh farm meat.",
    image:
      "https://images.unsplash.com/photo-1551884831-bbf3cdc6469e?auto=format&fit=crop&w=900&q=85",
    badgeImage:
      "https://images.unsplash.com/photo-1551884831-bbf3cdc6469e?auto=format&fit=crop&w=160&q=85",
  },
  {
    name: "Grains",
    description:
      "Clean stone-free rice, maize, honey beans and healthy cereals.",
    image:
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=900&q=85",
    badgeImage:
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=160&q=85",
  },
];

const additionalHarvestCategories = [
  {
    name: "Tubers",
    description: "Wholesome yams, cassava, sweet potatoes and fresh cocoyam.",
    image:
      "https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=900&q=85",
    badgeImage:
      "https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=160&q=85",
  },
  {
    name: "Herbs",
    description:
      "Aromatic herbs and leafy greens picked fresh for every kitchen.",
    image:
      "https://images.unsplash.com/photo-1524179091875-bf99a9a6af57?auto=format&fit=crop&w=900&q=85",
    badgeImage:
      "https://images.unsplash.com/photo-1524179091875-bf99a9a6af57?auto=format&fit=crop&w=160&q=85",
  },
  {
    name: "Honey",
    description: "Pure, golden honey harvested from trusted local apiaries.",
    image:
      "https://images.unsplash.com/photo-1471943311424-646960669fbc?auto=format&fit=crop&w=900&q=85",
    badgeImage:
      "https://images.unsplash.com/photo-1471943311424-646960669fbc?auto=format&fit=crop&w=160&q=85",
  },
];

const processSteps = [
  {
    number: "1",
    title: "Explore Farm Produce",
    description:
      "Browse our real-time 50 product catalog with verified farmer identities, exact harvest dates, and transparent naira pricing.",
    color: "bg-[#e4f2e6]",
  },
  {
    number: "2",
    title: "Secure Escrow Order",
    description:
      "Place orders with buyer protection escrow. Funds are only remitted to the farmer once your produce arrives in prime condition.",
    color: "bg-[#fac449]",
  },
  {
    number: "3",
    title: "Cold Dispatch Delivery",
    description:
      "Enjoy reliable doorstep cold logistics straight from the farm, retaining nutrients, color, and garden-fresh taste.",
    color: "bg-[#a6d6a9]",
  },
];

const verifiedFarmers = [
  {
    name: "Emeka's Farm Co-op",
    proprietor: "Emeka Okafor",
    location: "Benin City, Edo State",
    description:
      "Specializing in greenhouse and open-field vegetables with zero synthetic ripening agents.",
    produce: ["Plum Tomatoes", "Bell Peppers", "Yam Tubers"],
    rating: "4.9",
    reviews: "124",
    image: "/images/local-farmer.jfif",
  },
  {
    name: "Alhaji Danladi Agri-Farms",
    proprietor: "Danladi Usman",
    location: "Kano, Kano State",
    description:
      "Large-scale heirloom grains and pungent northern chili peppers grown with artisan irrigation.",
    produce: ["Ata Rodo Habanero", "Brown Beans", "Millet"],
    rating: "4.9",
    reviews: "210",
    image: "/images/farmer phone.jfif",
  },
  {
    name: "Mama Grace Organic Gardens",
    proprietor: "Grace Adebayo",
    location: "Ibadan, Oyo State",
    description:
      "Dedicated to nutrient-dense, pesticide-free leafy greens and premium Nigerian seasoning vegetables.",
    produce: ["Red Bell Pepper", "Ugwu Greens", "Ewedu"],
    rating: "4.8",
    reviews: "98",
    image: "/images/community.jfif",
  },
];

const farmerBenefits = [
  {
    icon: "✣",
    title: "Fresh & Natural",
    description: "100% farm-fresh produce, picked and harvested daily",
  },
  {
    icon: "♧",
    title: "Local Farmers",
    description: "Empowering smallholders with fair, direct market pricing",
  },
  {
    icon: "✓",
    title: "Better Communities",
    description: "Escrow security, honest trade, and reduced food waste",
  },
];
function Market() {
  const [showMoreCategories, setShowMoreCategories] = useState(false);

  return (
    <main className="min-h-screen bg-[#dfe8d5] text-[#193d2c]">
      <section className="mx-auto max-w-[1500px] px-5 pb-16 pt-10 lg:px-8 xl:px-12">
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-[#2c6a4c] bg-[#e9f0e5] px-4 py-2 text-[0.72rem] font-bold uppercase tracking-[0.26em] text-[#0e5e2c]">
          <span className="text-base">✦</span>
          Direct Farm-to-door Marketplace
        </div>

        <div className="grid items-center gap-12 lg:grid-cols-[1.13fr_0.87fr]">
          <div className="pt-6">
            <h1 className="max-w-[770px] text-[3.4rem] font-black leading-[0.9] tracking-[-0.065em] text-[#123d2d] sm:text-[4.4rem] xl:text-[4.6rem]">
              <span className="block">Fresh Produce • Local</span>
              <span className="block">Farmers • Better</span>
              <span className="block">Communities</span>
            </h1>
            <p className="mt-7 max-w-[690px] text-[1.2rem] leading-[1.7] text-[#27573f]">
              Buy directly from verified Nigerian smallholders and commercial
              farmers. Enjoy farm-gate prices, 100% inspected freshness, and
              transparent escrow delivery.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <button className="inline-flex h-[54px] items-center gap-3 rounded-[12px] bg-[#12642e] px-6 text-[1rem] font-bold text-white shadow-[0_6px_12px_rgba(12,67,34,0.2)] transition hover:bg-[#0d4d26]">
                Shop Fresh Produce{" "}
                <span className="text-xl font-normal">→</span>
              </button>
              <button className="inline-flex h-[54px] items-center gap-3 rounded-[12px] border-[2px] border-[#12642e] bg-transparent px-6 text-[1rem] font-bold text-[#12642e] transition hover:bg-[#ecf6ed]">
                Meet Our Farmers
              </button>
            </div>
            <div className="mt-6 grid max-w-[730px] grid-cols-3 border-t border-[#d2ddcf] pt-4">
              <div>
                <div className="text-[1.45rem] font-black leading-none text-[#12642e]">
                  50+
                </div>
                <div className="mt-1 text-[0.78rem] text-[#537060]">
                  Fresh Farm Harvests
                </div>
              </div>
              <div>
                <div className="text-[1.45rem] font-black leading-none text-[#12642e]">
                  100%
                </div>
                <div className="mt-1 text-[0.78rem] text-[#537060]">
                  Verified Farmers
                </div>
              </div>
              <div>
                <div className="text-[1.45rem] font-black leading-none text-[#12642e]">
                  ₦0
                </div>
                <div className="mt-1 text-[0.78rem] text-[#537060]">
                  Middleman Markups
                </div>
              </div>
            </div>
          </div>

          <div className="relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[650px] overflow-hidden rounded-[30px] border border-[#b9cab4] bg-[#0d2c1a] p-3 shadow-[0_28px_70px_rgba(12,44,21,0.22)]">
              <div
                className="aspect-[1.55] rounded-[24px] bg-cover bg-center"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80')",
                }}
              />
              <div className="absolute inset-x-0 bottom-0 rounded-b-[24px] bg-[linear-gradient(180deg,rgba(13,44,26,0.05),rgba(13,44,26,0.9)_35%,rgba(13,44,26,0.96))] p-6">
                <div className="mb-3 text-[0.76rem] font-bold uppercase tracking-[0.2em] text-[#dfeecf]">
                  ✦ Harvested at Dawn
                </div>
                <div className="max-w-[430px] text-[2.2rem] font-black leading-[1.1] tracking-[-0.05em] text-white sm:text-[2.6rem]">
                  Taste the Real Nigerian Farm Freshness
                </div>
                <p className="mt-3 text-[1.02rem] text-[#edf6e8]">
                  Delivered with cold logistics within 24 hours of harvest.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-[#e2e9dc] bg-[#fffdf5] px-5 py-10 lg:px-8 xl:px-12">
        <div className="mx-auto max-w-[1250px]">
          <div className="mb-8 flex items-end justify-between gap-6">
            <div>
              <h2 className="text-[2rem] font-black leading-none tracking-[-0.04em] text-[#12642e] sm:text-[2.25rem]">
                Explore Our Fresh Harvests
              </h2>
              <p className="mt-2 text-[0.95rem] text-[#537060]">
                Select a category to view produce direct from local fields and
                pastures.
              </p>
            </div>
            <a
              href="#"
              className="hidden shrink-0 items-center gap-2 text-[0.9rem] font-bold text-[#12642e] transition hover:text-[#0d4d26] sm:flex"
            >
              View All 50 Products{" "}
              <span className="text-lg font-normal">›</span>
            </a>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {harvestCategories.map((category) => (
              <article
                key={category.name}
                className="overflow-hidden rounded-[16px] border border-[#e1e9dd] bg-[#fffdf5] shadow-[0_2px_5px_rgba(18,100,46,0.08)]"
              >
                <div className="relative">
                  <img
                    src={category.image}
                    alt={`${category.name} from local farms`}
                    className="h-[242px] w-full object-cover"
                  />
                  <span className="absolute -bottom-5 left-6 flex h-12 w-12 items-center justify-center rounded-full border-2 border-white bg-[#12642e] text-2xl text-[#fac449] shadow-sm">
                    <img
                      src={category.badgeImage}
                      alt=""
                      className="h-full w-full rounded-full object-cover"
                    />
                  </span>
                </div>
                <div className="flex h-[200px] flex-col p-7">
                  <h3 className="text-[1.25rem] font-black text-[#12642e]">
                    {category.name}
                  </h3>
                  <p className="mt-1.5 min-h-[48px] text-[0.84rem] leading-6 text-[#617968]">
                    {category.description}
                  </p>
                  <button className="mt-5 h-[41px] w-full shrink-0 rounded-[12px] bg-[#fac449] text-[0.9rem] font-bold text-[#173d2b] transition hover:bg-[#f5b82d]">
                    Shop {category.name} <span className="text-base">→</span>
                  </button>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {moreHarvestCategories.map((category) => (
              <article
                key={category.name}
                className="overflow-hidden rounded-[16px] border border-[#e1e9dd] bg-[#fffdf5] shadow-[0_2px_5px_rgba(18,100,46,0.08)]"
              >
                <div className="relative">
                  <img
                    src={category.image}
                    alt={`${category.name} from local farms`}
                    className="h-[218px] w-full object-cover"
                  />
                  <span className="absolute -bottom-5 left-6 flex h-12 w-12 items-center justify-center rounded-full border-2 border-white bg-[#12642e] text-2xl text-[#fac449] shadow-sm">
                    <img
                      src={category.badgeImage}
                      alt=""
                      className="h-full w-full rounded-full object-cover"
                    />
                  </span>
                </div>
                <div className="flex h-[200px] flex-col p-7">
                  <h3 className="text-[1.25rem] font-black text-[#12642e]">
                    {category.name}
                  </h3>
                  <p className="mt-1.5 min-h-[48px] text-[0.84rem] leading-6 text-[#617968]">
                    {category.description}
                  </p>
                  <button className="mt-5 h-[41px] w-full shrink-0 rounded-[12px] bg-[#fac449] text-[0.9rem] font-bold text-[#173d2b] transition hover:bg-[#f5b82d]">
                    Shop {category.name} <span className="text-base">→</span>
                  </button>
                </div>
              </article>
            ))}
          </div>

          {showMoreCategories && (
            <div className="mt-6 grid gap-6 md:grid-cols-3">
              {additionalHarvestCategories.map((category) => (
                <article
                  key={category.name}
                  className="overflow-hidden rounded-[16px] border border-[#e1e9dd] bg-[#fffdf5] shadow-[0_2px_5px_rgba(18,100,46,0.08)]"
                >
                  <div className="relative">
                    <img
                      src={category.image}
                      alt={`${category.name} from local farms`}
                      className="h-[218px] w-full object-cover"
                    />
                    <span className="absolute -bottom-5 left-6 flex h-12 w-12 items-center justify-center rounded-full border-2 border-white bg-[#12642e] shadow-sm">
                      <img
                        src={category.badgeImage}
                        alt=""
                        className="h-full w-full rounded-full object-cover"
                      />
                    </span>
                  </div>
                  <div className="flex h-[200px] flex-col p-7">
                    <h3 className="text-[1.25rem] font-black text-[#12642e]">
                      {category.name}
                    </h3>
                    <p className="mt-1.5 min-h-[48px] text-[0.84rem] leading-6 text-[#617968]">
                      {category.description}
                    </p>
                    <button className="mt-5 h-[41px] w-full shrink-0 rounded-[12px] bg-[#fac449] text-[0.9rem] font-bold text-[#173d2b] transition hover:bg-[#12642e] hover:text-white">
                      Shop {category.name} <span className="text-base">→</span>
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}

          <div className="mt-10 flex justify-center">
            <button
              type="button"
              onClick={() => setShowMoreCategories((current) => !current)}
              className="rounded-[12px] bg-[#fac449] px-7 py-3 text-[0.95rem] font-black text-[#173d2b] transition hover:bg-[#12642e] hover:text-white"
            >
              {showMoreCategories ? "Show Less ↑" : "Load More Categories ↓"}
            </button>
          </div>
        </div>
      </section>

      <section className="border-t border-[#dce9d9] bg-[#f1f8ed] px-5 py-16 lg:px-8 xl:px-12">
        <div className="mx-auto max-w-[1150px]">
          <div className="mx-auto max-w-[680px] text-center">
            <p className="text-[0.72rem] font-bold uppercase tracking-[0.16em] text-[#12642e]">
              Transparent Agricultural Commerce
            </p>
            <h2 className="mt-2 text-[2rem] font-black leading-none tracking-[-0.04em] text-[#12642e] sm:text-[2.25rem]">
              How Farmer&apos;s MarketLink Works
            </h2>
            <p className="mt-3 text-[0.95rem] text-[#617968]">
              We make farm-gate purchasing effortless, secure, and beneficial
              for both growers and households.
            </p>
          </div>

          <div className="mt-11 grid gap-6 md:grid-cols-3">
            {processSteps.map((step) => (
              <article
                key={step.number}
                className="min-h-[195px] rounded-[15px] border border-[#e0eade] bg-[#fffdf5] px-6 py-5 text-center shadow-[0_2px_5px_rgba(18,100,46,0.06)]"
              >
                <div
                  className={`mx-auto flex h-12 w-12 items-center justify-center rounded-[14px] text-[1.2rem] font-black text-[#12642e] ${step.color}`}
                >
                  {step.number}
                </div>
                <h3 className="mt-4 text-[1rem] font-black text-[#142d22]">
                  {step.title}
                </h3>
                <p className="mt-3 text-[0.75rem] leading-[1.55] text-[#6a7d70]">
                  {step.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-[#e2e9dc] bg-[#fffdf5] px-5 py-12 lg:px-8 xl:px-12">
        <div className="mx-auto max-w-[1250px]">
          <div className="mb-8 flex items-end justify-between gap-6">
            <div>
              <h2 className="text-[2rem] font-black leading-none tracking-[-0.04em] text-[#12642e] sm:text-[2.25rem]">
                Meet Our Verified Farmers
              </h2>
              <p className="mt-2 text-[0.95rem] text-[#537060]">
                Experienced, dedicated agrarian producers from across
                Nigeria&apos;s fertile states.
              </p>
            </div>
            <a
              href="#"
              className="hidden shrink-0 items-center gap-2 text-[0.85rem] font-bold text-[#12642e] transition hover:text-[#0d4d26] sm:flex"
            >
              Learn About Farmer Programs{" "}
              <span className="text-lg font-normal">›</span>
            </a>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {verifiedFarmers.map((farmer) => (
              <article
                key={farmer.name}
                className="flex min-h-[275px] flex-col rounded-[16px] border border-[#e1e9dd] bg-[#fffdf5] p-5 shadow-[0_2px_5px_rgba(18,100,46,0.08)]"
              >
                <div className="flex items-start gap-3">
                  <img
                    src={farmer.image}
                    alt={farmer.name}
                    className="h-14 w-14 shrink-0 rounded-[10px] object-cover"
                  />
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-[0.95rem] font-black text-[#142d22]">
                        {farmer.name}
                      </h3>
                      <span className="rounded-full bg-[#dff1df] px-2 py-0.5 text-[0.65rem] font-bold text-[#12642e]">
                        ✓ Verified
                      </span>
                    </div>
                    <p className="mt-1 text-[0.72rem] text-[#617968]">
                      Proprietor: {farmer.proprietor}
                    </p>
                    <p className="mt-1 text-[0.72rem] text-[#617968]">
                      <span className="text-[#12642e]">⌖</span>{" "}
                      {farmer.location}
                    </p>
                  </div>
                </div>

                <p className="mt-5 min-h-[42px] text-[0.74rem] leading-5 text-[#536c5d]">
                  {farmer.description}
                </p>
                <p className="mt-4 text-[0.65rem] font-bold uppercase tracking-[0.1em] text-[#617968]">
                  Main farm produce
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {farmer.produce.map((item) => (
                    <span
                      key={item}
                      className="rounded-full bg-[#e7f3e5] px-2.5 py-1 text-[0.67rem] font-medium text-[#34704b]"
                    >
                      {item}
                    </span>
                  ))}
                </div>

                <div className="mt-auto flex items-center justify-between border-t border-[#e1e9dd] pt-3">
                  <span className="text-[0.76rem] text-[#617968]">
                    <strong className="text-[#fac449]">★</strong>{" "}
                    {farmer.rating} ({farmer.reviews})
                  </span>
                  <button className="rounded-[10px] border border-[#12642e] px-4 py-2 text-[0.72rem] font-bold text-[#12642e] transition hover:bg-[#12642e] hover:text-white">
                    View Profile →
                  </button>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-20 grid gap-5 md:grid-cols-3">
            {farmerBenefits.map((benefit) => (
              <div
                key={benefit.title}
                className="flex min-h-[86px] items-center gap-4 rounded-[15px] border border-[#e1e9dd] bg-[#fffdf5] px-5 py-4"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[12px] bg-[#e4f2e6] text-xl font-bold text-[#25803c]">
                  {benefit.icon}
                </span>
                <div>
                  <h3 className="text-[0.8rem] font-black text-[#12642e]">
                    {benefit.title}
                  </h3>
                  <p className="mt-1 text-[0.72rem] leading-4 text-[#617968]">
                    {benefit.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#fffdf5] px-5 py-16 lg:px-8 xl:px-12">
        <div className="mx-auto flex max-w-[1100px] flex-col gap-8 rounded-[22px] bg-[#176326] px-8 py-10 text-white shadow-[0_10px_24px_rgba(18,60,28,0.16)] sm:px-11 md:flex-row md:items-center md:justify-between">
          <div className="max-w-[700px]">
            <p className="text-[0.7rem] font-bold uppercase tracking-[0.12em] text-[#fac449]">
              ◇ Direct from source guarantee
            </p>
            <h2 className="mt-3 text-[1.8rem] font-black leading-tight tracking-[-0.04em] sm:text-[2.1rem]">
              Are you a Nigerian commercial or smallholder farmer?
            </h2>
            <p className="mt-3 max-w-[620px] text-[0.9rem] leading-5 text-[#cce9c8]">
              Join Farmer&apos;s MarketLink to sell your harvest directly to
              thousands of household buyers, catering services, and wholesale
              distributors nationwide.
            </p>
          </div>
          <button className="shrink-0 rounded-[12px] bg-[#fac449] px-6 py-3.5 text-[0.82rem] font-black text-[#173d2b] shadow-[0_5px_12px_rgba(0,0,0,0.12)] transition hover:-translate-y-1 hover:bg-[#ffd265]">
            Register as a Farmer
          </button>
        </div>
      </section>

      <footer className="bg-[#176326] px-5 py-10 text-white lg:px-8 xl:px-12">
        <div className="mx-auto max-w-[1150px]">
          <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-[11px] bg-[#fac449] text-xl text-[#176326]">
                ✣
              </div>
              <div>
                <div className="text-[1.15rem] font-black leading-none">
                  Farmer&apos;s MarketLink
                </div>
                <p className="mt-1 text-[0.62rem] text-[#cce9c8]">
                  Fresh Produce • Local Farmers • Better Communities
                </p>
              </div>
            </div>

            <nav className="flex flex-wrap gap-x-6 gap-y-3 text-[0.75rem] font-semibold text-[#f1f8ed]">
              <a href="#" className="transition hover:text-[#fac449]">
                Home
              </a>
              <a href="#" className="transition hover:text-[#fac449]">
                Shop Produce
              </a>
              <a href="#" className="transition hover:text-[#fac449]">
                For Farmers
              </a>
              <a href="#" className="transition hover:text-[#fac449]">
                About Us
              </a>
              <a href="#" className="transition hover:text-[#fac449]">
                Contact Us
              </a>
            </nav>

            <div className="flex gap-2">
              {["f", "◎", "𝕏", "▶"].map((social) => (
                <a
                  key={social}
                  href="#"
                  aria-label="Social media"
                  className="flex h-8 w-8 items-center justify-center rounded-[8px] bg-white/10 text-[0.75rem] font-bold text-white transition hover:bg-[#fac449] hover:text-[#176326]"
                >
                  {social}
                </a>
              ))}
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-4 border-t border-white/20 pt-5 text-[0.68rem] text-[#cce9c8] md:flex-row md:items-center md:justify-between">
            <p>
              © 2026 Farmer&apos;s MarketLink. All rights reserved. Connecting
              Nigerian growers with families and communities.
            </p>
            <div className="flex flex-wrap gap-x-5 gap-y-2 font-semibold">
              <a href="#" className="transition hover:text-white">
                Verified Escrow Trade
              </a>
              <span>•</span>
              <a href="#" className="transition hover:text-white">
                Cold Chain Guarantee
              </a>
              <span>•</span>
              <a href="#" className="transition hover:text-white">
                Purity Standards
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}

export default Market;
