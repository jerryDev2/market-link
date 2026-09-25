import React from "react";

const profileDetails = [
  { label: "Stall / Business name", value: "Green Valley Harvest" },
  {
    label: "Contact information",
    value: "+233 20 123 4567 · hello@greenvalleyharvest.com",
  },
  { label: "Address", value: "No. 12 Farm Lane, Ashaiman, Greater Accra" },
  { label: "Market location", value: "Agbogba Farmers Market · Stall A-07" },
  { label: "Operating days", value: "Monday - Saturday" },
  {
    label: "Pickup time windows",
    value: "7:00 AM - 11:00 AM · 3:00 PM - 6:00 PM",
  },
];

const operatingDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const pickupWindows = [
  "7:00 AM - 9:00 AM",
  "10:00 AM - 12:00 PM",
  "3:00 PM - 5:00 PM",
];

function FarmerProfile() {
  return (
    <div className="min-h-screen bg-[#FFFDF5] px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#1B5E20]">
              Farmer Profile
            </p>
            <h1 className="mt-2 text-3xl font-bold text-[#1B5E20] sm:text-4xl">
              Your Market Identity
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button className="rounded-xl border border-[#1B5E20] bg-white px-5 py-2.5 text-sm font-semibold text-[#1B5E20] transition hover:bg-[#F7FAF7]">
              Edit Profile
            </button>
            <button className="rounded-xl bg-[#1B5E20] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#154a1a]">
              Dashboard
            </button>
          </div>
        </header>

        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <section className="overflow-hidden rounded-[28px] border border-[#E8F5E9] bg-white shadow-[0_20px_60px_rgba(27,94,32,0.08)]">
            <div className="bg-gradient-to-r from-[#A5D6A7] via-[#DFF3DF] to-[#FFFDF5] p-6 sm:p-8">
              <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#1B5E20] text-2xl font-bold text-white shadow-sm">
                    G
                  </div>

                  <div>
                    <p className="text-sm font-medium text-[#1B5E20]">
                      Farm stall
                    </p>
                    <h2 className="text-2xl font-bold text-[#1B5E20] sm:text-3xl">
                      Green Valley Harvest
                    </h2>
                  </div>
                </div>

                <span className="inline-flex items-center rounded-full bg-[#F9C74F] px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-[#263238]">
                  Verified Farmer
                </span>
              </div>
            </div>

            <div className="grid gap-5 p-6 sm:p-8 md:grid-cols-2">
              {profileDetails.map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-[#E8F5E9] bg-[#FFFDF5] p-4 shadow-sm"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#1B5E20]">
                    {item.label}
                  </p>
                  <p className="mt-3 text-base font-medium text-[#263238]">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <aside className="rounded-[28px] border border-[#E8F5E9] bg-white p-6 shadow-[0_20px_60px_rgba(27,94,32,0.08)]">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-[#1B5E20]">Market Map</h3>
              <span className="rounded-full bg-[#E8F5E9] px-2.5 py-1 text-xs font-semibold text-[#2E7D32]">
                Live pin
              </span>
            </div>

            <div className="relative mt-5 overflow-hidden rounded-[22px] border border-[#E8F5E9] bg-[#DFF3DF]">
              <div className="h-[270px] w-full bg-[radial-gradient(circle_at_20%_20%,rgba(27,94,32,0.16),transparent_22%),linear-gradient(135deg,#E8F5E9_0%,#CFEAD3_40%,#B9E1BA_100%)]">
                <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.18)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.18)_1px,transparent_1px)] bg-[size:32px_32px]" />
              </div>

              <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1B5E20] text-xl text-white shadow-lg ring-4 ring-white/80">
                  📍
                </div>
                <div className="mt-2 rounded-full bg-[#1B5E20] px-3 py-1 text-xs font-semibold text-white">
                  Stall A-07
                </div>
              </div>
            </div>

            <div className="mt-5 space-y-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#1B5E20]">
                  Operating days
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {operatingDays.map((day) => (
                    <span
                      key={day}
                      className="rounded-full border border-[#DCEFE0] bg-[#F8FCF8] px-2.5 py-1.5 text-xs font-medium text-[#263238]"
                    >
                      {day}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#1B5E20]">
                  Pickup windows
                </p>
                <div className="mt-3 space-y-2">
                  {pickupWindows.map((time) => (
                    <div
                      key={time}
                      className="flex items-center justify-between rounded-xl border border-[#E8F5E9] bg-[#FFFDF5] px-3 py-2 text-sm text-[#263238]"
                    >
                      <span>{time}</span>
                      <span className="text-[#2E7D32]">Open</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

export default FarmerProfile;
