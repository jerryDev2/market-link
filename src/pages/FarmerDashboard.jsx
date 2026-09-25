import React from "react";

const navItems = [
  "Dashboard",
  "Profile",
  "Products",
  "Orders",
  "Stock",
  "Reviews",
  "Insights",
  "Logout",
];

const statCards = [
  { label: "Total Products", value: "25", detail: "8 added this week" },
  { label: "Total Orders", value: "18", detail: "4 pending" },
  { label: "Revenue", value: "GHS 15.8k", detail: "+12.1%" },
  { label: "Active Sales", value: "92%", detail: "Strong demand" },
];

const products = [
  {
    name: "Fresh Tomatoes",
    emoji: "🍅",
    price: "GHS 18/kg",
    unit: "1kg",
    qty: "42 bags",
    category: "Vegetables",
    status: "Available",
  },
  {
    name: "Cocoyam Leaves",
    emoji: "🌿",
    price: "GHS 12/bunch",
    unit: "bunch",
    qty: "18 bunches",
    category: "Greens",
    status: "Low stock",
  },
  {
    name: "Free-range Eggs",
    emoji: "🥚",
    price: "GHS 9/pack",
    unit: "pack",
    qty: "60 packs",
    category: "Dairy",
    status: "Available",
  },
];

const orderStats = [
  { label: "New Orders", value: "18", tone: "bg-[#E8F5E9] text-[#1B5E20]" },
  { label: "Pending", value: "9", tone: "bg-[#FFF3CD] text-[#8A6D1F]" },
  { label: "Accepted", value: "12", tone: "bg-[#E3F2FD] text-[#1565C0]" },
  {
    label: "Ready for Pickup",
    value: "7",
    tone: "bg-[#DFF3DF] text-[#2E7D32]",
  },
  { label: "Completed", value: "156", tone: "bg-[#E8F5E9] text-[#1B5E20]" },
  { label: "Cancelled", value: "4", tone: "bg-[#FDECEA] text-[#C62828]" },
];

const recentOrders = [
  { customer: "Ama K.", item: "Tomatoes", status: "Accepted", total: "GHS 72" },
  { customer: "Kojo T.", item: "Eggs", status: "Pending", total: "GHS 48" },
  {
    customer: "Esi M.",
    item: "Cocoyam leaves",
    status: "Ready",
    total: "GHS 36",
  },
];

const weeklyStock = [
  "Weekly stock template",
  "Update quantities",
  "Update prices",
  "Recurring products",
];

const reviewList = [
  { name: "Ama K.", text: "Very fresh and neatly packed", rating: "★★★★★" },
  { name: "Kojo T.", text: "Pickup was quick and easy", rating: "★★★★☆" },
];

function FarmerDashboard() {
  return (
    <div className="min-h-screen bg-[#F5F8F4] px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[26px] border border-[#DDEFE1] bg-[#121E15] shadow-[0_25px_80px_rgba(17,33,21,0.25)]">
        <div className="flex flex-col lg:flex-row">
          <aside className="w-full border-b border-[#1F3324] bg-[#0F1D12] p-5 text-[#E9F5EA] lg:w-72 lg:border-b-0 lg:border-r">
            <div className="flex items-center gap-3 pb-5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#F9C74F] text-sm font-black text-[#173E1A]">
                M
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#A5D6A7]">
                  MarketLink
                </p>
              </div>
            </div>

            <nav className="space-y-2">
              {navItems.map((item) => {
                const active = item === "Dashboard";

                return (
                  <button
                    key={item}
                    className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm font-medium transition ${
                      active
                        ? "bg-[#1B5E20] text-white shadow-sm"
                        : "text-[#D8E7DB] hover:bg-[#163A1F] hover:text-white"
                    }`}
                  >
                    <span>{item}</span>
                    <span
                      className={`h-2 w-2 rounded-full ${active ? "bg-[#F9C74F]" : "bg-transparent"}`}
                    />
                  </button>
                );
              })}
            </nav>
          </aside>

          <main className="flex-1 bg-[#F7F9F3] p-5 sm:p-6 lg:p-8">
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#1B5E20]">
                  Farmer Dashboard
                </p>
                <h1 className="mt-2 text-3xl font-bold text-[#173E1A] sm:text-4xl">
                  Welcome back, Green Valley
                </h1>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button className="rounded-xl border border-[#1B5E20] bg-white px-4 py-2.5 text-sm font-semibold text-[#1B5E20]">
                  Profile
                </button>
                <button className="rounded-xl bg-[#1B5E20] px-4 py-2.5 text-sm font-semibold text-white">
                  Add Product
                </button>
              </div>
            </div>

            <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {statCards.map((card) => (
                <div
                  key={card.label}
                  className="rounded-[20px] border border-[#E7F1E8] bg-white p-4 shadow-sm"
                >
                  <p className="text-sm text-[#3E5243]">{card.label}</p>
                  <div className="mt-3 flex items-end justify-between gap-3">
                    <p className="text-2xl font-bold text-[#1B5E20]">
                      {card.value}
                    </p>
                    <span className="rounded-full bg-[#E8F5E9] px-2 py-1 text-[10px] font-semibold text-[#2E7D32]">
                      {card.detail}
                    </span>
                  </div>
                </div>
              ))}
            </section>

            <section className="mt-6 grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
              <div className="space-y-6">
                <div className="rounded-[22px] border border-[#E7F1E8] bg-white p-5 shadow-sm">
                  <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-xl font-bold text-[#173E1A]">
                      My Products
                    </h2>
                    <button className="rounded-lg bg-[#1B5E20] px-3 py-2 text-xs font-semibold text-white">
                      Add Product
                    </button>
                  </div>

                  <div className="space-y-3">
                    {products.map((product) => (
                      <div
                        key={product.name}
                        className="flex flex-col gap-3 rounded-[18px] border border-[#E7F1E8] bg-[#FFFDF5] p-3 sm:flex-row sm:items-center"
                      >
                        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#E8F5E9] text-2xl">
                          {product.emoji}
                        </div>

                        <div className="flex-1">
                          <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                              <p className="font-bold text-[#173E1A]">
                                {product.name}
                              </p>
                              <p className="text-xs text-[#4F6A5B]">
                                {product.category}
                              </p>
                            </div>
                            <span className="w-fit rounded-full bg-[#E8F5E9] px-2 py-1 text-[10px] font-semibold text-[#2E7D32]">
                              {product.status}
                            </span>
                          </div>
                          <div className="mt-2 flex flex-wrap gap-3 text-[11px] text-[#3E5243]">
                            <span>Price: {product.price}</span>
                            <span>Unit: {product.unit}</span>
                            <span>Qty: {product.qty}</span>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2 sm:justify-end">
                          <button className="rounded-lg border border-[#1B5E20] px-2.5 py-1.5 text-[10px] font-semibold text-[#1B5E20]">
                            View
                          </button>
                          <button className="rounded-lg border border-[#1B5E20] px-2.5 py-1.5 text-[10px] font-semibold text-[#1B5E20]">
                            Edit
                          </button>
                          <button className="rounded-lg bg-[#F9C74F] px-2.5 py-1.5 text-[10px] font-semibold text-[#173E1A]">
                            Sold Out
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-[22px] border border-[#E7F1E8] bg-white p-5 shadow-sm">
                  <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-xl font-bold text-[#173E1A]">
                      Orders / Pre-Orders
                    </h2>
                    <button className="rounded-lg border border-[#1B5E20] bg-white px-3 py-2 text-xs font-semibold text-[#1B5E20]">
                      View all
                    </button>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                    {orderStats.map((order) => (
                      <div
                        key={order.label}
                        className={`rounded-[16px] p-3 ${order.tone}`}
                      >
                        <p className="text-[11px] font-medium">{order.label}</p>
                        <p className="mt-2 text-2xl font-bold">{order.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="rounded-[22px] border border-[#E7F1E8] bg-white p-5 shadow-sm">
                  <h3 className="text-lg font-bold text-[#173E1A]">
                    Weekly Stock
                  </h3>
                  <div className="mt-4 space-y-2">
                    {weeklyStock.map((item) => (
                      <div
                        key={item}
                        className="flex items-center gap-3 rounded-xl bg-[#F7F9F3] p-2.5 text-sm text-[#263238]"
                      >
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#A5D6A7] text-[10px] font-bold text-[#1B5E20]">
                          ✓
                        </span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-[22px] border border-[#E7F1E8] bg-white p-5 shadow-sm">
                  <h3 className="text-lg font-bold text-[#173E1A]">
                    Pickup Settings
                  </h3>
                  <div className="mt-4 space-y-2 text-sm text-[#263238]">
                    <div className="rounded-xl bg-[#F7F9F3] p-3">
                      <span className="font-semibold text-[#1B5E20]">
                        Dates:
                      </span>{" "}
                      Tue - Sat
                    </div>
                    <div className="rounded-xl bg-[#F7F9F3] p-3">
                      <span className="font-semibold text-[#1B5E20]">
                        Slots:
                      </span>{" "}
                      7:00 AM, 10:00 AM, 3:00 PM
                    </div>
                    <div className="rounded-xl bg-[#F7F9F3] p-3">
                      <span className="font-semibold text-[#1B5E20]">
                        Cutoff:
                      </span>{" "}
                      5:00 PM
                    </div>
                  </div>
                </div>

                <div className="rounded-[22px] border border-[#E7F1E8] bg-white p-5 shadow-sm">
                  <h3 className="text-lg font-bold text-[#173E1A]">
                    Recent Orders
                  </h3>
                  <div className="mt-4 space-y-3">
                    {recentOrders.map((order) => (
                      <div
                        key={`${order.customer}-${order.item}`}
                        className="rounded-xl bg-[#F7F9F3] p-3 text-sm"
                      >
                        <div className="flex items-center justify-between gap-3">
                          <span className="font-semibold text-[#173E1A]">
                            {order.customer}
                          </span>
                          <span className="rounded-full bg-[#E8F5E9] px-2 py-1 text-[10px] font-semibold text-[#2E7D32]">
                            {order.status}
                          </span>
                        </div>
                        <p className="mt-2 text-[#3E5243]">{order.item}</p>
                        <p className="mt-1 font-semibold text-[#173E1A]">
                          {order.total}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            <section className="mt-6 grid gap-6 lg:grid-cols-2">
              <div className="rounded-[22px] border border-[#E7F1E8] bg-white p-5 shadow-sm">
                <h3 className="text-lg font-bold text-[#173E1A]">Insights</h3>
                <div className="mt-4 space-y-3">
                  <div className="rounded-xl bg-[#E8F5E9] p-3">
                    <p className="text-[11px] text-[#1B5E20]">Best-selling</p>
                    <p className="mt-1 font-bold text-[#173E1A]">
                      Fresh Tomatoes
                    </p>
                  </div>
                  <div className="rounded-xl bg-[#FFFDF5] p-3">
                    <p className="text-[11px] text-[#3E5243]">Revenue</p>
                    <p className="mt-1 font-bold text-[#173E1A]">GHS 15.8k</p>
                  </div>
                </div>
              </div>

              <div className="rounded-[22px] border border-[#E7F1E8] bg-white p-5 shadow-sm">
                <h3 className="text-lg font-bold text-[#173E1A]">Reviews</h3>
                <div className="mt-4 space-y-3">
                  {reviewList.map((review) => (
                    <div
                      key={review.name}
                      className="rounded-xl bg-[#FFFDF5] p-3"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <span className="font-semibold text-[#173E1A]">
                          {review.name}
                        </span>
                        <span className="text-[#F9C74F]">{review.rating}</span>
                      </div>
                      <p className="mt-2 text-sm text-[#3E5243]">
                        {review.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}

export default FarmerDashboard;
