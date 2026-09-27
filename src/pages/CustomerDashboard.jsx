import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const navItems = [
  "Overview",
  "My Orders",
  "Order History",
  "Favorites",
  "Reviews",
  "Notifications",
];

const overviewStats = [
  { label: "Active Orders", value: 0 },
  { label: "Favorite Products", value: 0 },
  { label: "Favorite Farmers", value: 0 },
];

const recentOrders = [];

const quickActions = [
  { label: "View My Orders", tab: "My Orders" },
  { label: "View Favorites", tab: "Favorites" },
  { label: "My Profile", route: "/customer-profile" },
];

const orderList = [];

const orderHistory = [];

const favoriteProducts = [];

const reviews = [
  {
    customer: "Jerry",
    rating: "★★★★★",
    comment: "Very fresh tomatoes and good packaging.",
  },
  {
    customer: "Mary",
    rating: "★★★★★",
    comment: "The peppers were crisp and full of flavor.",
  },
  {
    customer: "Daniel",
    rating: "★★★★☆",
    comment: "Delivery was fast, and the produce was clean.",
  },
];

const notifications = [
  "Your order #1021 has been accepted by the farmer.",
  "New stock is available for tomatoes and carrots.",
  "A farmer you follow added fresh produce for this week.",
  "Your review on Green Valley Farms was published.",
];

function CustomerDashboard() {
  const [activeTab, setActiveTab] = useState("Overview");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.dispatchEvent(new Event("auth-change"));
    navigate("/");
  };

  const renderOverview = () => (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-[#4A5E4F]">Customer Dashboard</p>
        <h2 className="mt-2 text-4xl font-bold text-[#173E1A]">
          Welcome, Jerry
        </h2>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {overviewStats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-[20px] border border-[#E7F1E8] bg-white p-5 shadow-[0_12px_28px_rgba(27,94,32,0.06)]"
          >
            <p className="text-sm text-[#4A5E4F]">{stat.label}</p>
            <p className="mt-2 text-3xl font-bold text-[#173E1A]">
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      <div className="rounded-[22px] border border-[#E7F1E8] bg-white p-5 shadow-[0_12px_28px_rgba(27,94,32,0.06)]">
        <h3 className="mb-4 text-xl font-bold text-[#173E1A]">Recent Orders</h3>
        {recentOrders.length === 0 ? (
          <p className="text-sm text-[#4A5E4F]">No recent orders yet.</p>
        ) : (
          <div className="space-y-3">
            {recentOrders.map((order) => (
              <div
                key={order.id}
                className="flex items-center justify-between rounded-xl bg-[#F7F9F3] px-4 py-3"
              >
                <span className="font-semibold text-[#173E1A]">
                  Order {order.id}
                </span>
                <span className="rounded-full bg-[#E8F5E9] px-2.5 py-1 text-xs font-semibold text-[#1B5E20]">
                  {order.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="rounded-[22px] border border-[#E7F1E8] bg-white p-5 shadow-[0_12px_28px_rgba(27,94,32,0.06)]">
        <h3 className="mb-4 text-xl font-bold text-[#173E1A]">Quick Actions</h3>
        <div className="flex flex-wrap gap-3">
          {quickActions.map((action) =>
            action.route ? (
              <Link
                key={action.label}
                to={action.route}
                className="rounded-xl bg-[#1B5E20] px-4 py-2.5 text-sm font-semibold text-white"
              >
                {action.label}
              </Link>
            ) : (
              <button
                key={action.label}
                onClick={() => setActiveTab(action.tab)}
                className="rounded-xl border border-[#1B5E20] bg-white px-4 py-2.5 text-sm font-semibold text-[#1B5E20]"
              >
                {action.label}
              </button>
            ),
          )}
        </div>
      </div>
    </div>
  );

  const renderOrders = () => (
    <div className="space-y-5">
      <h2 className="text-3xl font-bold text-[#173E1A]">My Orders</h2>
      {orderList.length === 0 ? (
        <div className="rounded-[20px] border border-[#E7F1E8] bg-white p-5 shadow-[0_12px_28px_rgba(27,94,32,0.06)]">
          <p className="text-sm text-[#4A5E4F]">
            You have no active orders yet.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {orderList.map((order) => (
            <div
              key={order.id}
              className="rounded-[20px] border border-[#E7F1E8] bg-white p-5 shadow-[0_12px_28px_rgba(27,94,32,0.06)]"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xl font-bold text-[#173E1A]">
                    Order {order.id}
                  </p>
                  <p className="mt-1 text-sm text-[#4A5E4F]">{order.items}</p>
                </div>
                <span className="inline-flex rounded-full bg-[#E8F5E9] px-3 py-1 text-xs font-semibold text-[#1B5E20]">
                  {order.status}
                </span>
              </div>

              <div className="mt-4 flex flex-col gap-2 text-sm text-[#2F443B] sm:flex-row sm:items-center sm:justify-between">
                <span>Pickup: {order.pickup}</span>
                <span className="font-semibold text-[#173E1A]">
                  Total: {order.total}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderHistory = () => (
    <div className="space-y-5">
      <h2 className="text-3xl font-bold text-[#173E1A]">Order History</h2>
      {orderHistory.length === 0 ? (
        <div className="rounded-[20px] border border-[#E7F1E8] bg-white p-5 shadow-[0_12px_28px_rgba(27,94,32,0.06)]">
          <p className="text-sm text-[#4A5E4F]">No order history yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {orderHistory.map((order) => (
            <div
              key={order.id}
              className="flex items-center justify-between rounded-[20px] border border-[#E7F1E8] bg-white p-4 shadow-[0_12px_28px_rgba(27,94,32,0.06)]"
            >
              <div>
                <p className="font-bold text-[#173E1A]">{order.id}</p>
                <p className="text-sm text-[#4A5E4F]">{order.date}</p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-[#173E1A]">{order.total}</p>
                <p className="text-xs text-[#1B5E20]">{order.status}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderFavorites = () => (
    <div className="space-y-5">
      <h2 className="text-3xl font-bold text-[#173E1A]">Favorites</h2>
      {favoriteProducts.length === 0 ? (
        <div className="rounded-[20px] border border-[#E7F1E8] bg-white p-5 shadow-[0_12px_28px_rgba(27,94,32,0.06)]">
          <p className="text-sm text-[#4A5E4F]">
            Your favorite products will appear here.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-3">
          {favoriteProducts.map((product) => (
            <div
              key={product.name}
              className="rounded-[20px] border border-[#E7F1E8] bg-white p-5 shadow-[0_12px_28px_rgba(27,94,32,0.06)]"
            >
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-[#E8F5E9] text-2xl">
                🥬
              </div>
              <p className="text-xl font-bold text-[#173E1A]">{product.name}</p>
              <p className="mt-1 text-sm text-[#4A5E4F]">{product.farmer}</p>
              <p className="mt-3 text-lg font-semibold text-[#1B5E20]">
                {product.price}
              </p>
              <button className="mt-4 rounded-xl bg-[#1B5E20] px-3 py-2 text-sm font-semibold text-white">
                Reorder
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderReviews = () => (
    <div className="space-y-5">
      <h2 className="text-3xl font-bold text-[#173E1A]">Reviews</h2>
      <div className="space-y-4">
        {reviews.map((review) => (
          <div
            key={review.customer}
            className="rounded-[22px] border border-[#E7F1E8] bg-white p-5 shadow-[0_12px_28px_rgba(27,94,32,0.06)]"
          >
            <div className="flex items-center justify-between gap-3">
              <p className="font-bold text-[#173E1A]">{review.customer}</p>
              <span className="text-[#F9C74F]">{review.rating}</span>
            </div>
            <p className="mt-3 text-base italic text-[#2F443B]">
              "{review.comment}"
            </p>
            <button className="mt-4 rounded-xl border border-[#1B5E20] bg-white px-3.5 py-2 text-sm font-semibold text-[#1B5E20]">
              Reply
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  const renderNotifications = () => (
    <div className="space-y-5">
      <h2 className="text-3xl font-bold text-[#173E1A]">Notifications</h2>
      <div className="space-y-3">
        {notifications.map((notification, index) => (
          <div
            key={`${notification}-${index}`}
            className="flex items-start gap-3 rounded-[18px] border border-[#E7F1E8] bg-white p-4 shadow-[0_12px_28px_rgba(27,94,32,0.06)]"
          >
            <span className="mt-1 flex h-2.5 w-2.5 rounded-full bg-[#F9C74F]" />
            <p className="text-[#2F443B]">{notification}</p>
          </div>
        ))}
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case "My Orders":
        return renderOrders();
      case "Order History":
        return renderHistory();
      case "Favorites":
        return renderFavorites();
      case "Reviews":
        return renderReviews();
      case "Notifications":
        return renderNotifications();
      case "Overview":
      default:
        return renderOverview();
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#F5F8F4] px-0 py-0">
      <div className="min-h-screen w-full overflow-hidden border border-[#DDEFE1] bg-[#121E15] shadow-[0_25px_80px_rgba(17,33,21,0.25)]">
        <div className="flex min-h-screen w-full flex-col lg:flex-row">
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
                    onClick={() => setActiveTab(item)}
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
                  Customer Dashboard
                </p>
                <h1 className="mt-2 text-3xl font-bold text-[#173E1A] sm:text-4xl">
                  {activeTab === "Overview" ? "Overview" : activeTab}
                </h1>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => setActiveTab("Overview")}
                  className="rounded-xl border border-[#1B5E20] bg-white px-4 py-2.5 text-sm font-semibold text-[#1B5E20]"
                >
                  Overview
                </button>
                <Link
                  to="/customer-profile"
                  className="rounded-xl bg-[#1B5E20] px-4 py-2.5 text-sm font-semibold text-white"
                >
                  My Profile
                </Link>
              </div>
            </div>

            {renderTabContent()}
          </main>
        </div>
      </div>
    </div>
  );
}

export default CustomerDashboard;
