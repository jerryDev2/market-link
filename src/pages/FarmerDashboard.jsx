import React, { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const navItems = [
  "Overview",
  "Products",
  "Orders",
  "Stock",
  "Reviews",
  "Insights",
  "Profile",
  "Logout",
];

const productRows = [
  { name: "Tomatoes", price: "₦2,000", stock: 20, category: "Vegetables" },
  { name: "Pepper", price: "₦1,500", stock: 15, category: "Vegetables" },
  { name: "Carrots", price: "₦3,000", stock: 10, category: "Vegetables" },
];

const overviewCards = [
  { label: "Products", value: "25" },
  { label: "Orders", value: "18" },
  { label: "Pending", value: "4" },
  { label: "Revenue", value: "₦150,000" },
];

const recentOrders = [
  { id: "#1024", status: "Pending" },
  { id: "#1023", status: "Accepted" },
  { id: "#1022", status: "Ready" },
];

const orderStatuses = [
  "Pending",
  "Accepted",
  "Ready for Pickup",
  "Completed",
  "Cancelled",
];

const currentOrder = {
  id: "#1025",
  customer: "John",
  items: ["Tomatoes × 2", "Pepper × 1"],
  pickup: "Saturday, 10:00 AM",
};

const stockItems = [
  { name: "Tomatoes", qty: "20 kg" },
  { name: "Pepper", qty: "15 kg" },
  { name: "Carrots", qty: "10 kg" },
];

const reviews = [
  {
    customer: "John",
    rating: "★★★★★",
    comment: "Very fresh tomatoes.",
  },
  {
    customer: "Mary",
    rating: "★★★★★",
    comment: "The peppers are always crisp and clean.",
  },
  {
    customer: "Derrick",
    rating: "★★★★☆",
    comment: "Pickup was smooth and on time.",
  },
];

const insightStats = {
  totalOrders: 120,
  completedOrders: 105,
  revenue: "₦850,000",
  topProducts: ["Tomatoes", "Pepper", "Carrots"],
};

const productFormFields = [
  "Product Name",
  "Category",
  "Price",
  "Unit",
  "Quantity",
  "Description",
  "Image",
];

const getStoredUser = () => {
  try {
    const rawUser = localStorage.getItem("user");
    return rawUser ? JSON.parse(rawUser) : null;
  } catch (error) {
    return null;
  }
};

const getDisplayName = (user) => {
  if (!user) return "Farmer";

  const firstName = user.firstName || user.firstname || "";
  const lastName = user.lastName || user.lastname || "";
  const nameFromUser = user.name || user.fullName || user.fullname || "";

  if (firstName || lastName) {
    return `${firstName} ${lastName}`.trim() || "Farmer";
  }

  if (nameFromUser) {
    return nameFromUser;
  }

  if (user.email) {
    return user.email.split("@")[0];
  }

  return "Farmer";
};

function FarmerDashboard() {
  const [activeTab, setActiveTab] = useState("Overview");
  const [showProductForm, setShowProductForm] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const navigate = useNavigate();

  const user = getStoredUser();
  const farmerName = getDisplayName(user);
  const farmerEmail = user?.email || "farmer@marketlink.com";
  const farmName =
    user?.farmName ||
    user?.businessName ||
    user?.stallName ||
    "MarketLink Farm";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.dispatchEvent(new Event("auth-change"));
    navigate("/");
  };

  const headerLabel = useMemo(() => {
    if (activeTab === "Overview") return "Overview";
    if (activeTab === "Products") return "My Products";
    if (activeTab === "Orders") return "Orders";
    if (activeTab === "Stock") return "Weekly Stock";
    if (activeTab === "Reviews") return "Customer Reviews";
    if (activeTab === "Insights") return "Sales Overview";
    return "Farmer Dashboard";
  }, [activeTab]);

  const renderOverview = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm text-[#4A5E4F]">Welcome, {farmerName} 👋</p>
          <h2 className="mt-2 text-3xl font-bold text-[#173E1A]">Overview</h2>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {overviewCards.map((card) => (
          <div
            key={card.label}
            className="rounded-[20px] border border-[#E7F1E8] bg-white p-5 shadow-[0_12px_28px_rgba(27,94,32,0.06)]"
          >
            <p className="text-sm text-[#4A5E4F]">{card.label}</p>
            <p className="mt-2 text-3xl font-bold text-[#173E1A]">
              {card.value}
            </p>
          </div>
        ))}
      </div>

      <div className="rounded-[22px] border border-[#E7F1E8] bg-white p-5 shadow-[0_12px_28px_rgba(27,94,32,0.06)]">
        <h3 className="mb-3 text-xl font-bold text-[#173E1A]">Recent Orders</h3>
        <div className="space-y-3">
          {recentOrders.map((order) => (
            <div
              key={order.id}
              className="flex items-center justify-between rounded-xl bg-[#F7F9F3] px-4 py-3"
            >
              <span className="font-medium text-[#173E1A]">
                Order {order.id}
              </span>
              <span className="rounded-full bg-[#E8F5E9] px-2.5 py-1 text-xs font-semibold text-[#1B5E20]">
                {order.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-[22px] border border-[#E7F1E8] bg-white p-5 shadow-[0_12px_28px_rgba(27,94,32,0.06)]">
        <p className="text-sm text-[#4A5E4F]">Farm</p>
        <p className="mt-2 text-2xl font-bold text-[#173E1A]">{farmName}</p>
      </div>
    </div>
  );

  const renderProducts = () => (
    <div className="space-y-5">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-3xl font-bold text-[#173E1A]">My Products</h2>
        <button
          onClick={() => setShowProductForm(true)}
          className="rounded-xl bg-[#1B5E20] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#154a1a]"
        >
          + Add Product
        </button>
      </div>

      {showProductForm ? (
        <div className="rounded-[22px] border border-[#E7F1E8] bg-white p-5 shadow-[0_12px_28px_rgba(27,94,32,0.06)]">
          <h3 className="mb-4 text-xl font-bold text-[#173E1A]">Add Product</h3>
          <div className="grid gap-4 md:grid-cols-2">
            {productFormFields.map((field) => (
              <div
                key={field}
                className={
                  field === "Description" || field === "Image"
                    ? "md:col-span-2"
                    : ""
                }
              >
                <label className="mb-2 block text-sm font-medium text-[#2F443B]">
                  {field}
                </label>
                <input
                  type={
                    field === "Price" || field === "Quantity"
                      ? "number"
                      : field === "Image"
                        ? "file"
                        : "text"
                  }
                  placeholder={
                    field === "Price"
                      ? "0"
                      : field === "Image"
                        ? "Upload product image"
                        : ""
                  }
                  className="w-full rounded-xl border border-[#E7F1E8] bg-[#F9FBF8] px-3.5 py-3 text-sm text-[#173E1A] outline-none transition focus:border-[#2E7D32] focus:ring-2 focus:ring-[#A5D6A7]/50"
                />
              </div>
            ))}
          </div>

          <div className="mt-5 flex justify-end gap-3">
            <button
              onClick={() => setShowProductForm(false)}
              className="rounded-xl border border-[#1B5E20] bg-white px-4 py-2.5 text-sm font-semibold text-[#1B5E20]"
            >
              Cancel
            </button>
            <button className="rounded-xl bg-[#F9C74F] px-4 py-2.5 text-sm font-semibold text-[#173E1A]">
              Add Product
            </button>
          </div>
        </div>
      ) : null}

      <div className="overflow-hidden rounded-[22px] border border-[#E7F1E8] bg-white shadow-[0_12px_28px_rgba(27,94,32,0.06)]">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left">
            <thead className="bg-[#EAF3EB] text-sm uppercase tracking-[0.08em] text-[#1B5E20]">
              <tr>
                <th className="px-5 py-3">Product</th>
                <th className="px-5 py-3">Price</th>
                <th className="px-5 py-3">Stock</th>
                <th className="px-5 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {productRows.map((product) => (
                <tr key={product.name} className="border-t border-[#EDF4EE]">
                  <td className="px-5 py-3 font-semibold text-[#173E1A]">
                    {product.name}
                  </td>
                  <td className="px-5 py-3 text-[#3E5243]">{product.price}</td>
                  <td className="px-5 py-3 text-[#3E5243]">{product.stock}</td>
                  <td className="px-5 py-3">
                    <div className="flex flex-wrap gap-2">
                      <button className="rounded-lg border border-[#1B5E20] px-2.5 py-1.5 text-xs font-semibold text-[#1B5E20]">
                        View
                      </button>
                      <button className="rounded-lg border border-[#1B5E20] px-2.5 py-1.5 text-xs font-semibold text-[#1B5E20]">
                        Edit
                      </button>
                      <button className="rounded-lg border border-[#D34B4B] px-2.5 py-1.5 text-xs font-semibold text-[#D34B4B]">
                        Delete
                      </button>
                      <button className="rounded-lg bg-[#F9C74F] px-2.5 py-1.5 text-xs font-semibold text-[#173E1A]">
                        Mark Sold Out
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderOrders = () => (
    <div className="space-y-5">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-3xl font-bold text-[#173E1A]">Orders</h2>
      </div>

      <div className="flex flex-wrap gap-2">
        {orderStatuses.map((status) => (
          <button
            key={status}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
              status === "Pending"
                ? "bg-[#F9C74F] text-[#173E1A]"
                : "bg-[#EAF3EB] text-[#1B5E20]"
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      <div className="rounded-[22px] border border-[#E7F1E8] bg-white p-5 shadow-[0_12px_28px_rgba(27,94,32,0.06)]">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-2xl font-bold text-[#173E1A]">
            Order {currentOrder.id}
          </h3>
          <span className="rounded-full bg-[#FFF3CD] px-2.5 py-1 text-xs font-semibold text-[#8A6D1F]">
            Pending
          </span>
        </div>

        <div className="mt-5 space-y-3 text-[#2F443B]">
          <p>
            <span className="font-semibold text-[#173E1A]">Customer:</span>{" "}
            {currentOrder.customer}
          </p>
          <p>
            <span className="font-semibold text-[#173E1A]">Products:</span>
          </p>
          <ul className="list-disc space-y-1 pl-6">
            {currentOrder.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p>
            <span className="font-semibold text-[#173E1A]">Pickup:</span>{" "}
            {currentOrder.pickup}
          </p>
        </div>

        <div className="mt-5 flex flex-wrap gap-3">
          <button
            onClick={() => setAccepted(true)}
            className="rounded-xl bg-[#1B5E20] px-4 py-2.5 text-sm font-semibold text-white"
          >
            Accept
          </button>
          <button className="rounded-xl border border-[#1B5E20] bg-white px-4 py-2.5 text-sm font-semibold text-[#1B5E20]">
            Decline
          </button>
          {accepted ? (
            <button className="rounded-xl bg-[#F9C74F] px-4 py-2.5 text-sm font-semibold text-[#173E1A]">
              Mark as Ready
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );

  const renderStock = () => (
    <div className="space-y-5">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-3xl font-bold text-[#173E1A]">Weekly Stock</h2>
        <button className="rounded-xl bg-[#1B5E20] px-4 py-2.5 text-sm font-semibold text-white">
          Update Stock
        </button>
      </div>

      <div className="rounded-[22px] border border-[#E7F1E8] bg-white p-5 shadow-[0_12px_28px_rgba(27,94,32,0.06)]">
        <div className="space-y-3">
          {stockItems.map((item) => (
            <div
              key={item.name}
              className="flex items-center justify-between rounded-xl bg-[#F7F9F3] px-4 py-3"
            >
              <span className="font-medium text-[#173E1A]">{item.name}</span>
              <div className="flex items-center gap-3">
                <span className="text-[#3E5243]">{item.qty}</span>
                <button className="rounded-lg border border-[#1B5E20] px-2.5 py-1.5 text-xs font-semibold text-[#1B5E20]">
                  Sold Out
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderReviews = () => (
    <div className="space-y-5">
      <h2 className="text-3xl font-bold text-[#173E1A]">Customer Reviews</h2>

      <div className="space-y-4">
        {reviews.map((review) => (
          <div
            key={review.customer}
            className="rounded-[22px] border border-[#E7F1E8] bg-white p-5 shadow-[0_12px_28px_rgba(27,94,32,0.06)]"
          >
            <div className="flex items-center justify-between gap-3">
              <p className="font-bold text-[#173E1A]">
                Customer: {review.customer}
              </p>
              <span className="text-[#F9C74F]">{review.rating}</span>
            </div>
            <p className="mt-3 text-lg italic text-[#2E4A3B]">
              "{review.comment}"
            </p>
            <button className="mt-4 rounded-xl border border-[#1B5E20] bg-white px-4 py-2.5 text-sm font-semibold text-[#1B5E20]">
              Reply
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  const renderInsights = () => (
    <div className="space-y-5">
      <h2 className="text-3xl font-bold text-[#173E1A]">Sales Overview</h2>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-[20px] border border-[#E7F1E8] bg-white p-5 shadow-[0_12px_28px_rgba(27,94,32,0.06)]">
          <p className="text-sm text-[#4A5E4F]">Total Orders</p>
          <p className="mt-2 text-3xl font-bold text-[#173E1A]">
            {insightStats.totalOrders}
          </p>
        </div>
        <div className="rounded-[20px] border border-[#E7F1E8] bg-white p-5 shadow-[0_12px_28px_rgba(27,94,32,0.06)]">
          <p className="text-sm text-[#4A5E4F]">Completed Orders</p>
          <p className="mt-2 text-3xl font-bold text-[#173E1A]">
            {insightStats.completedOrders}
          </p>
        </div>
        <div className="rounded-[20px] border border-[#E7F1E8] bg-white p-5 shadow-[0_12px_28px_rgba(27,94,32,0.06)]">
          <p className="text-sm text-[#4A5E4F]">Revenue</p>
          <p className="mt-2 text-3xl font-bold text-[#173E1A]">
            {insightStats.revenue}
          </p>
        </div>
      </div>

      <div className="rounded-[22px] border border-[#E7F1E8] bg-white p-5 shadow-[0_12px_28px_rgba(27,94,32,0.06)]">
        <h3 className="text-xl font-bold text-[#173E1A]">
          Best Selling Products
        </h3>
        <ol className="mt-4 space-y-3 pl-6 text-[#2F443B]">
          {insightStats.topProducts.map((product, index) => (
            <li key={product} className="list-decimal text-base">
              {index + 1}. {product}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );

  const renderProfile = () => {
    const profileDetails = [
      {
        label: "Stall / Business name",
        value:
          user?.farmName ||
          user?.businessName ||
          user?.stallName ||
          "MarketLink Farm",
      },
      {
        label: "Contact information",
        value: `${user?.phoneNumber || user?.phone || "+233 000 000 000"} · ${farmerEmail}`,
      },
      {
        label: "Address",
        value:
          user?.address ||
          user?.farmAddress ||
          "No. 12 Farm Lane, Ashaiman, Greater Accra",
      },
      {
        label: "Market location",
        value: user?.marketLocation || "Agbogba Farmers Market · Stall A-07",
      },
      {
        label: "Operating days",
        value: user?.operatingDays || "Monday - Saturday",
      },
      {
        label: "Pickup time windows",
        value:
          user?.pickupTimeWindows || "7:00 AM - 11:00 AM · 3:00 PM - 6:00 PM",
      },
    ];

    return (
      <div className="space-y-5">
        <div className="rounded-[22px] border border-[#E7F1E8] bg-white p-5 shadow-[0_12px_28px_rgba(27,94,32,0.06)]">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm text-[#4A5E4F]">Farmer profile</p>
              <h2 className="mt-2 text-3xl font-bold text-[#173E1A]">
                {farmerName}
              </h2>
            </div>
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#1B5E20] text-2xl font-bold text-white shadow-sm">
              {farmerName.charAt(0).toUpperCase()}
            </div>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {profileDetails.map((item) => (
            <div
              key={item.label}
              className="rounded-[20px] border border-[#E7F1E8] bg-white p-5 shadow-[0_12px_28px_rgba(27,94,32,0.06)]"
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
      </div>
    );
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "Products":
        return renderProducts();
      case "Orders":
        return renderOrders();
      case "Stock":
        return renderStock();
      case "Reviews":
        return renderReviews();
      case "Insights":
        return renderInsights();
      case "Profile":
        return renderProfile();
      case "Overview":
      default:
        return renderOverview();
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#F5F8F4] px-0 py-0">
      <div className="h-screen w-full overflow-hidden border-0 bg-[#121E15] shadow-none">
        <div className="flex h-full w-full flex-col lg:flex-row">
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
                const active = item === activeTab;

                return (
                  <button
                    key={item}
                    onClick={() => {
                      if (item === "Logout") {
                        handleLogout();
                        return;
                      }
                      setActiveTab(item);
                    }}
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

          <main className="flex-1 overflow-y-auto bg-[#F7F9F3] p-5 sm:p-6 lg:p-8">
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#1B5E20]">
                  Farmer Dashboard
                </p>
                <h1 className="mt-2 text-3xl font-bold text-[#173E1A] sm:text-4xl">
                  {headerLabel}
                </h1>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => setActiveTab("Overview")}
                  className="rounded-xl border border-[#1B5E20] bg-white px-4 py-2.5 text-sm font-semibold text-[#1B5E20]"
                >
                  Overview
                </button>
                <button
                  onClick={() => setActiveTab("Profile")}
                  className="rounded-xl border border-[#1B5E20] bg-transparent px-4 py-2.5 text-sm font-semibold text-[#1B5E20]"
                >
                  Profile
                </button>
                <button
                  onClick={() => setShowProductForm(true)}
                  className="rounded-xl bg-[#1B5E20] px-4 py-2.5 text-sm font-semibold text-white"
                >
                  Add Product
                </button>
              </div>
            </div>

            {renderTabContent()}
          </main>
        </div>
      </div>
    </div>
  );
}

export default FarmerDashboard;
