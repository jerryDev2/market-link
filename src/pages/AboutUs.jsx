import React from "react";

const whyChooseUsData = [
  {
    icon: "🌱",
    title: "Direct from Farmers",
    description:
      "Connect directly with local farmers and get the freshest, seasonal produce from nearby farms.",
    image: "/images/local-farmer.jfif",
  },
  {
    icon: "📍",
    title: "Find Markets & Farmers",
    description:
      "Discover nearby farmers markets and locate farmers using integrated maps with directions.",
    image: "/images/showcase.jfif",
  },
  {
    icon: "📦",
    title: "Pre-Order Convenience",
    description:
      "Reserve your favorite items in advance and pick them up at your preferred market time.",
    image: "/images/farmer%20phone.jfif",
  },
  {
    icon: "💬",
    title: "Community Connection",
    description:
      "Leave reviews, build relationships with farmers, and support your local community.",
    image: "/images/community.jfif",
  },
];

const problemPoints = [
  {
    title: "The Problem",
    description:
      "Local farmers markets are thriving, but shoppers face challenges:",
    points: [
      "No advance notice of which farmers will be present",
      "Unknown product availability and pricing",
      "Limited communication beyond chalkboards and flyers",
      "Frequent wasted trips due to sold-out items or closed stalls",
    ],
    image: "/images/gunnar-ridderstrom-mW7HP9Viykk-unsplash.jpg",
  },
  {
    title: "Farmers Face Challenges Too",
    description: "On the other side, farmers struggle with:",
    points: [
      "No easy way to publicize weekly inventory",
      "Difficulty managing pre-orders and customer relationships",
      "Limited visibility and reach to regular customers",
      "Unable to plan harvest based on demand",
    ],
    image: "/images/growth.jfif",
  },
];

function AboutUs() {
  return (
    <div className="min-h-screen bg-[#FFFDF5]">
      {/* Hero Section */}
      <div className="px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="mx-auto max-w-6xl">
          <div className="overflow-hidden rounded-[30px] border border-[#E8F5E9] bg-white shadow-[0_25px_80px_rgba(27,94,32,0.08)]">
            <div className="grid gap-0 lg:grid-cols-[1.05fr_0.95fr]">
              <div className="p-6 sm:p-8 lg:p-12">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#1B5E20]">
                  About MarketLink
                </p>
                <h1 className="mt-4 text-4xl font-bold leading-tight text-[#1B5E20] sm:text-5xl lg:text-6xl">
                  Connecting Farmers with Community
                </h1>
                <p className="mt-6 text-lg leading-8 text-[#263238] sm:text-xl">
                  MarketLink is a unified platform designed to strengthen the
                  bond between local farmers and their customers by making
                  farmers market shopping more convenient, predictable, and
                  personal.
                </p>

                <div className="mt-8 flex flex-wrap justify-start gap-3">
                  <span className="inline-flex items-center rounded-full bg-[#E8F5E9] px-4 py-2 text-sm font-semibold text-[#1B5E20]">
                    🌾 Local First
                  </span>
                  <span className="inline-flex items-center rounded-full bg-[#E8F5E9] px-4 py-2 text-sm font-semibold text-[#1B5E20]">
                    📍 Community Driven
                  </span>
                  <span className="inline-flex items-center rounded-full bg-[#E8F5E9] px-4 py-2 text-sm font-semibold text-[#1B5E20]">
                    🎯 Transparent
                  </span>
                </div>

                <div className="mt-8 flex items-center gap-4 rounded-[20px] bg-[#FFFDF5] p-4 shadow-sm ring-1 ring-[#E8F5E9]">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#F9C74F] text-2xl">
                    ✓
                  </div>
                  <div>
                    <p className="text-sm font-medium uppercase tracking-[0.12em] text-[#1B5E20]">
                      Trusted by local growers
                    </p>
                    <p className="text-base font-semibold text-[#263238]">
                      Fresh produce, better planning, stronger relationships
                    </p>
                  </div>
                </div>
              </div>

              <div className="relative min-h-105 bg-[#A5D6A7]">
                <img
                  src="/images/fresh%20produce.jfif"
                  alt="Fresh farm produce"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-[#1B5E20]/60 via-[#1B5E20]/10 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 rounded-[22px] border border-white/30 bg-white/80 p-4 backdrop-blur-sm">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#1B5E20]">
                    Fresh weekly stock
                  </p>
                  <p className="mt-1 text-2xl font-bold text-[#263238]">
                    A simpler way to shop local
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* The Problem Sections */}
      <div className="px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-[#1B5E20] sm:text-4xl">
              Bridging the Gap
            </h2>
            <p className="mt-4 text-lg text-[#263238]/80">
              We identified challenges facing both customers and farmers at
              local markets
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {problemPoints.map((section, idx) => (
              <div
                key={idx}
                className="overflow-hidden rounded-[26px] border border-[#E8F5E9] bg-white shadow-sm"
              >
                <img
                  src={section.image}
                  alt={section.title}
                  className="h-52 w-full object-cover"
                />
                <div className="p-6 sm:p-8">
                  <h3 className="text-2xl font-bold text-[#1B5E20]">
                    {section.title}
                  </h3>
                  <p className="mt-3 text-[#263238]/80">
                    {section.description}
                  </p>
                  <ul className="mt-5 space-y-3">
                    {section.points.map((point, pointIdx) => (
                      <li key={pointIdx} className="flex gap-3">
                        <span className="text-lg text-[#F9C74F]">•</span>
                        <span className="text-[#263238]">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* The Solution */}
      <div className="px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="mx-auto max-w-6xl">
          <div className="rounded-[30px] border border-[#E8F5E9] bg-linear-to-br from-[#A5D6A7] to-[#81C784] p-6 sm:p-8 lg:p-12 shadow-[0_25px_80px_rgba(27,94,32,0.08)]">
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-bold text-[#1B5E20] sm:text-4xl">
                Our Solution: MarketLink
              </h2>
            </div>

            <div className="grid gap-8 lg:grid-cols-[1fr_1.05fr] lg:items-center">
              <div className="overflow-hidden rounded-[26px] bg-white/50 p-2 shadow-sm backdrop-blur-sm">
                <img
                  src="/images/showcase.jfif"
                  alt="MarketLink marketplace showcase"
                  className="h-75 w-full rounded-[18px] object-cover"
                />
              </div>

              <div>
                <p className="text-lg leading-8 text-[#263238] sm:text-xl">
                  MarketLink brings farmers and customers together on a single,
                  unified platform. Farmers can publish their weekly stock and
                  pricing, manage pre-orders, and showcase their stall locations
                  using interactive maps. Customers can discover nearby markets,
                  browse available products, reserve items in advance, and build
                  lasting relationships with their favorite local producers.
                </p>

                <div className="mt-8 grid gap-6 sm:grid-cols-2">
                  <div className="rounded-xl border border-[#1B5E20]/20 bg-white/80 p-4 backdrop-blur-sm">
                    <p className="font-semibold text-[#1B5E20]">For Farmers</p>
                    <ul className="mt-3 space-y-2 text-sm text-[#263238]">
                      <li>✓ Publish weekly inventory and pricing</li>
                      <li>✓ Manage pre-orders and customer relationships</li>
                      <li>✓ Plan harvest based on actual demand</li>
                      <li>✓ Build a loyal customer base</li>
                    </ul>
                  </div>
                  <div className="rounded-xl border border-[#1B5E20]/20 bg-white/80 p-4 backdrop-blur-sm">
                    <p className="font-semibold text-[#1B5E20]">
                      For Customers
                    </p>
                    <ul className="mt-3 space-y-2 text-sm text-[#263238]">
                      <li>✓ Browse nearby markets and farmers</li>
                      <li>✓ Search and filter available products</li>
                      <li>✓ Reserve items for pickup in advance</li>
                      <li>✓ Track orders and leave reviews</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Key Features */}
      <div className="px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-[#1B5E20] sm:text-4xl">
              Why Choose MarketLink
            </h2>
            <p className="mt-4 text-lg text-[#263238]/80">
              Experience the benefits of connecting directly with local farmers
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {whyChooseUsData.map((item, idx) => (
              <div
                key={idx}
                className="overflow-hidden rounded-[22px] border border-[#E8F5E9] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-40 w-full object-cover"
                />
                <div className="p-5">
                  <p className="text-4xl">{item.icon}</p>
                  <h3 className="mt-4 text-lg font-bold text-[#1B5E20]">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-[#263238]/80">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Impact Section */}
      <div className="px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="mx-auto max-w-6xl">
          <div className="rounded-[26px] border border-[#E8F5E9] bg-white p-6 sm:p-8 lg:p-12 shadow-sm">
            <h2 className="text-3xl font-bold text-[#1B5E20] sm:text-4xl">
              Our Impact
            </h2>
            <div className="mt-8 grid gap-8 sm:grid-cols-3">
              <div className="text-center">
                <p className="text-4xl font-bold text-[#F9C74F]">🌍</p>
                <p className="mt-4 text-lg font-semibold text-[#263238]">
                  Reduce Waste
                </p>
                <p className="mt-2 text-[#263238]/80">
                  Fewer wasted trips and better inventory planning for farmers
                </p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold text-[#F9C74F]">❤️</p>
                <p className="mt-4 text-lg font-semibold text-[#263238]">
                  Strengthen Community
                </p>
                <p className="mt-2 text-[#263238]/80">
                  Build meaningful connections between farmers and customers
                </p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold text-[#F9C74F]">📈</p>
                <p className="mt-4 text-lg font-semibold text-[#263238]">
                  Fair Business
                </p>
                <p className="mt-2 text-[#263238]/80">
                  Transparent pricing and direct relationships benefit everyone
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="mx-auto max-w-4xl text-center">
          <div className="rounded-[28px] border border-[#E8F5E9] bg-[#A5D6A7] p-6 sm:p-8 lg:p-12 shadow-[0_25px_80px_rgba(27,94,32,0.08)]">
            <h2 className="text-3xl font-bold text-[#1B5E20] sm:text-4xl">
              Join the Local Movement
            </h2>
            <p className="mt-4 text-lg leading-8 text-[#263238]">
              Whether you're a farmer looking to reach more customers or a
              customer searching for fresh, local produce, MarketLink makes it
              easy to connect with your community.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center sm:gap-4">
              <button className="rounded-xl bg-[#1B5E20] px-6 py-3 font-semibold text-white transition hover:bg-[#154a1a] focus:outline-none focus:ring-4 focus:ring-[#1B5E20]/20">
                Start Shopping
              </button>
              <button className="rounded-xl border-2 border-[#1B5E20] bg-white px-6 py-3 font-semibold text-[#1B5E20] transition hover:bg-[#FFFDF5] focus:outline-none focus:ring-4 focus:ring-[#1B5E20]/20">
                Become a Farmer Partner
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
