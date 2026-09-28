import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ShoppingBag,
  Package,
  History,
  Heart,
  Star,
  Bell,
  RefreshCw,
  Eye,
  LogOut,
} from "lucide-react";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

const apiUrl = (path) => `${API_BASE_URL}${path}`;

/* --------------------------------------------------
   GET LOGGED-IN USER
-------------------------------------------------- */

const getStoredUser = () => {
  try {
    const rawUser = localStorage.getItem("user");
    return rawUser ? JSON.parse(rawUser) : null;
  } catch {
    return null;
  }
};

const getUserId = (user) =>
  user?.userId || user?.id || user?.farmerId || user?.farmer_id || null;

/* --------------------------------------------------
   FORMAT MONEY
-------------------------------------------------- */

const formatMoney = (amount) => {
  const value = Number(amount || 0);

  return `₦${value.toLocaleString("en-NG", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  })}`;
};

/* --------------------------------------------------
   STATUS COLOR
-------------------------------------------------- */

const getStatusClass = (status) => {
  const normalized = String(status || "").toUpperCase();

  switch (normalized) {
    case "PENDING":
      return "bg-yellow-100 text-yellow-700";

    case "ACCEPTED":
      return "bg-green-100 text-green-700";

    case "PROCESSING":
      return "bg-blue-100 text-blue-700";

    case "COMPLETED":
    case "DELIVERED":
      return "bg-emerald-100 text-emerald-700";

    case "DECLINED":
    case "CANCELLED":
      return "bg-red-100 text-red-700";

    default:
      return "bg-gray-100 text-gray-700";
  }
};

/* --------------------------------------------------
   NAVIGATION
-------------------------------------------------- */

const navItems = [
  {
    label: "Overview",
    icon: Package,
  },
  {
    label: "My Orders",
    icon: ShoppingBag,
  },
  {
    label: "Order History",
    icon: History,
  },
  {
    label: "Favorites",
    icon: Heart,
  },
  {
    label: "Reviews",
    icon: Star,
  },
  {
    label: "Notifications",
    icon: Bell,
  },
];

/* --------------------------------------------------
   COMPONENT
-------------------------------------------------- */

function CustomerDashboard() {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("Overview");

  const [orders, setOrders] = useState([]);

  const [loadingOrders, setLoadingOrders] = useState(true);

  const [error, setError] = useState("");

  const user = getStoredUser();

  const token = localStorage.getItem("token");

  const userId = getUserId(user);

  /* --------------------------------------------------
     LOAD FARMER ORDERS
  -------------------------------------------------- */

  const loadOrders = async () => {
    if (!token || !userId) {
      navigate("/login", { replace: true });
      return;
    }

    try {
      setLoadingOrders(true);
      setError("");

      const response = await fetch(
        `${API_BASE_URL}/api/orders/user/${userId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );

      if (response.status === 401 || response.status === 403) {
        localStorage.removeItem("token");

        toast.error("Your session has expired. Please login again.");

        navigate("/login", { replace: true });
        return;
      }

      if (!response.ok) {
        throw new Error(`Unable to load orders (${response.status})`);
      }

      const data = await response.json();
      console.log("userId", )

      console.log("Farmer orders:", data);

      setOrders(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Order loading error:", err);

      setError("Unable to load your orders.");

      setOrders([]);

      toast.error("Something went wrong while loading your orders.");
    } finally {
      setLoadingOrders(false);
    }
  };

  /* --------------------------------------------------
     LOAD ORDERS WHEN DASHBOARD OPENS
  -------------------------------------------------- */

  useEffect(() => {
    loadOrders();
  }, [userId, token]);

  /* --------------------------------------------------
     CALCULATE ORDER GROUPS
  -------------------------------------------------- */

  const activeOrders = useMemo(() => {
    return orders.filter((order) => {
      const status = String(order.status || "").toUpperCase();

      return (
        status !== "COMPLETED" &&
        status !== "DELIVERED" &&
        status !== "CANCELLED" &&
        status !== "DECLINED"
      );
    });
  }, [orders]);

  const orderHistory = useMemo(() => {
    return orders.filter((order) => {
      const status = String(order.status || "").toUpperCase();

      return (
        status === "COMPLETED" ||
        status === "DELIVERED" ||
        status === "CANCELLED" ||
        status === "DECLINED"
      );
    });
  }, [orders]);

  /* --------------------------------------------------
     TOTAL ORDER VALUE
  -------------------------------------------------- */

  const totalOrderValue = useMemo(() => {
    return orders.reduce(
      (total, order) => total + Number(order.totalAmount || 0),
      0,
    );
  }, [orders]);

  /* --------------------------------------------------
     CUSTOMER/FARMER NAME
  -------------------------------------------------- */

  const displayName =
    user?.firstName || user?.name || user?.username || "Farmer";

  /* --------------------------------------------------
     LOGOUT
  -------------------------------------------------- */

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.dispatchEvent(new Event("auth-change"));

    navigate("/");
  };

  /* --------------------------------------------------
     VIEW ORDER
  -------------------------------------------------- */

  const viewOrder = (orderId) => {
    navigate(`/order-details/${orderId}`);
  };

  /* --------------------------------------------------
     OVERVIEW
  -------------------------------------------------- */

  const renderOverview = () => {
    return (
      <div className="space-y-6">
        {/* HEADER */}

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-[#4A5E4F]">Farmer Dashboard</p>

            <h2 className="mt-2 text-4xl font-bold text-[#173E1A]">
              Welcome, {displayName}
            </h2>

            <p className="mt-2 text-sm text-[#4A5E4F]">
              Here is an overview of your orders and activity.
            </p>
          </div>

          <button
            onClick={loadOrders}
            disabled={loadingOrders}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#1B5E20] px-4 py-2.5 text-sm font-semibold text-white disabled:opacity-60"
          >
            <RefreshCw
              size={16}
              className={loadingOrders ? "animate-spin" : ""}
            />
            Refresh
          </button>
        </div>

        {/* STATS */}

        <div className="grid gap-4 md:grid-cols-3">
          {/* ACTIVE ORDERS */}

          <div className="rounded-[20px] border border-[#E7F1E8] bg-white p-5 shadow-[0_12px_28px_rgba(27,94,32,0.06)]">
            <div className="flex items-center justify-between">
              <p className="text-sm text-[#4A5E4F]">Active Orders</p>

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E8F5E9] text-[#1B5E20]">
                <ShoppingBag size={20} />
              </div>
            </div>

            <p className="mt-3 text-3xl font-bold text-[#173E1A]">
              {activeOrders.length}
            </p>
          </div>

          {/* TOTAL ORDERS */}

          <div className="rounded-[20px] border border-[#E7F1E8] bg-white p-5 shadow-[0_12px_28px_rgba(27,94,32,0.06)]">
            <div className="flex items-center justify-between">
              <p className="text-sm text-[#4A5E4F]">Total Orders</p>

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FFF7DD] text-[#A67C00]">
                <Package size={20} />
              </div>
            </div>

            <p className="mt-3 text-3xl font-bold text-[#173E1A]">
              {orders.length}
            </p>
          </div>

          {/* TOTAL VALUE */}

          <div className="rounded-[20px] border border-[#E7F1E8] bg-white p-5 shadow-[0_12px_28px_rgba(27,94,32,0.06)]">
            <div className="flex items-center justify-between">
              <p className="text-sm text-[#4A5E4F]">Order Value</p>

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E8F5E9] text-[#1B5E20]">
                ₦
              </div>
            </div>

            <p className="mt-3 text-2xl font-bold text-[#173E1A]">
              {formatMoney(totalOrderValue)}
            </p>
          </div>
        </div>

        {/* RECENT ORDERS */}

        <div className="rounded-[22px] border border-[#E7F1E8] bg-white p-5 shadow-[0_12px_28px_rgba(27,94,32,0.06)]">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-xl font-bold text-[#173E1A]">Recent Orders</h3>

            <button
              onClick={() => setActiveTab("My Orders")}
              className="text-sm font-semibold text-[#1B5E20]"
            >
              View all
            </button>
          </div>

          {loadingOrders ? (
            <div className="py-8 text-center">
              <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-[#EAF3EB] border-t-[#1B5E20]" />

              <p className="mt-3 text-sm text-[#4A5E4F]">Loading orders...</p>
            </div>
          ) : activeOrders.length === 0 ? (
            <p className="py-6 text-sm text-[#4A5E4F]">
              You currently have no active orders.
            </p>
          ) : (
            <div className="space-y-3">
              {activeOrders.slice(0, 5).map((order) => (
                <div
                  key={order.orderId}
                  className="flex flex-col gap-3 rounded-xl bg-[#F7F9F3] px-4 py-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <p className="font-semibold text-[#173E1A]">
                      Order #{order.orderId}
                    </p>

                    <p className="mt-1 text-sm text-[#4A5E4F]">
                      {order.items?.length || 0} item
                      {order.items?.length === 1 ? "" : "s"}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusClass(
                        order.status,
                      )}`}
                    >
                      {order.status}
                    </span>

                    <button
                      onClick={() => viewOrder(order.orderId)}
                      className="inline-flex items-center gap-1 rounded-lg bg-[#1B5E20] px-3 py-2 text-xs font-semibold text-white"
                    >
                      <Eye size={14} />
                      View
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  /* --------------------------------------------------
     ACTIVE ORDERS
  -------------------------------------------------- */

  const renderOrders = () => {
    return (
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-[#173E1A]">My Orders</h2>

            <p className="mt-1 text-sm text-[#4A5E4F]">
              Orders currently requiring your attention.
            </p>
          </div>

          <button
            onClick={loadOrders}
            className="inline-flex items-center gap-2 rounded-xl border border-[#1B5E20] bg-white px-4 py-2.5 text-sm font-semibold text-[#1B5E20]"
          >
            <RefreshCw size={16} />
            Refresh
          </button>
        </div>

        {loadingOrders ? (
          <Loading />
        ) : error ? (
          <ErrorBox message={error} retry={loadOrders} />
        ) : activeOrders.length === 0 ? (
          <EmptyState message="You have no active orders." />
        ) : (
          <div className="space-y-4">
            {activeOrders.map((order) => (
              <OrderCard key={order.orderId} order={order} onView={viewOrder} />
            ))}
          </div>
        )}
      </div>
    );
  };

  /* --------------------------------------------------
     ORDER HISTORY
  -------------------------------------------------- */

  const renderHistory = () => {
    return (
      <div className="space-y-5">
        <div>
          <h2 className="text-3xl font-bold text-[#173E1A]">Order History</h2>

          <p className="mt-1 text-sm text-[#4A5E4F]">
            Completed, cancelled and declined orders.
          </p>
        </div>

        {loadingOrders ? (
          <Loading />
        ) : orderHistory.length === 0 ? (
          <EmptyState message="No order history yet." />
        ) : (
          <div className="space-y-4">
            {orderHistory.map((order) => (
              <OrderCard key={order.orderId} order={order} onView={viewOrder} />
            ))}
          </div>
        )}
      </div>
    );
  };

  /* --------------------------------------------------
     FAVORITES
  -------------------------------------------------- */

  const renderFavorites = () => {
    return (
      <div className="space-y-5">
        <h2 className="text-3xl font-bold text-[#173E1A]">Favorites</h2>

        <EmptyState message="Your favorite products will appear here." />
      </div>
    );
  };

  /* --------------------------------------------------
     REVIEWS
  -------------------------------------------------- */

  const renderReviews = () => {
    return (
      <div className="space-y-5">
        <h2 className="text-3xl font-bold text-[#173E1A]">Reviews</h2>

        <EmptyState message="Your reviews will appear here." />
      </div>
    );
  };

  /* --------------------------------------------------
     NOTIFICATIONS
  -------------------------------------------------- */

  const renderNotifications = () => {
    return (
      <div className="space-y-5">
        <h2 className="text-3xl font-bold text-[#173E1A]">Notifications</h2>

        <EmptyState message="You have no new notifications." />
      </div>
    );
  };

  /* --------------------------------------------------
     TAB SWITCH
  -------------------------------------------------- */

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

  /* --------------------------------------------------
     PAGE
  -------------------------------------------------- */

  return (
    <div className="min-h-screen w-full bg-[#F5F8F4]">
      <div className="min-h-screen w-full overflow-hidden border border-[#DDEFE1] bg-[#121E15] shadow-[0_25px_80px_rgba(17,33,21,0.25)]">
        <div className="flex min-h-screen w-full flex-col lg:flex-row">
          {/* SIDEBAR */}

          <aside className="w-full border-b border-[#1F3324] bg-[#0F1D12] p-5 text-[#E9F5EA] lg:w-72 lg:border-b-0 lg:border-r">
            <div className="flex items-center justify-between pb-5">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#F9C74F] text-sm font-black text-[#173E1A]">
                  M
                </div>

                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#A5D6A7]">
                    MarketLink
                  </p>

                  <p className="text-sm font-bold text-white">
                    Farmer Dashboard
                  </p>
                </div>
              </div>
            </div>

            {/* NAVIGATION */}

            <nav className="space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;

                const active = item.label === activeTab;

                return (
                  <button
                    key={item.label}
                    onClick={() => setActiveTab(item.label)}
                    className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium transition ${
                      active
                        ? "bg-[#1B5E20] text-white shadow-sm"
                        : "text-[#D8E7DB] hover:bg-[#163A1F] hover:text-white"
                    }`}
                  >
                    <Icon size={17} />

                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>

            {/* LOGOUT */}

            <button
              onClick={handleLogout}
              className="mt-8 flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium text-red-300 transition hover:bg-red-950/40"
            >
              <LogOut size={17} />
              Logout
            </button>
          </aside>

          {/* MAIN */}

          <main className="flex-1 bg-[#F7F9F3] p-5 sm:p-6 lg:p-8">
            {/* TOP HEADER */}

            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#1B5E20]">
                  MarketLink
                </p>

                <h1 className="mt-2 text-3xl font-bold text-[#173E1A] sm:text-4xl">
                  {activeTab}
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

/* ==================================================
   ORDER CARD
================================================== */

function OrderCard({ order, onView }) {
  const items = Array.isArray(order.items) ? order.items : [];

  return (
    <div className="rounded-[22px] border border-[#E7F1E8] bg-white p-5 shadow-[0_12px_28px_rgba(27,94,32,0.06)]">
      {/* HEADER */}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xl font-bold text-[#173E1A]">
            Order #{order.orderId}
          </p>

          <p className="mt-1 text-sm text-[#4A5E4F]">
            {items.length} item
            {items.length === 1 ? "" : "s"}
          </p>
        </div>

        <span
          className={`inline-flex w-fit rounded-full px-3 py-1 text-xs font-semibold ${getStatusClass(
            order.status,
          )}`}
        >
          {order.status}
        </span>
      </div>

      {/* ITEMS */}

      <div className="mt-5 space-y-2">
        {items.map((item) => {
          const product = item.product || {};

          return (
            <div
              key={item.orderItemId}
              className="flex items-center justify-between rounded-xl bg-[#F7F9F3] px-4 py-3"
            >
              <div>
                <p className="font-semibold text-[#173E1A]">
                  {product.name || "Product"}
                </p>

                <p className="text-xs text-[#4A5E4F]">
                  Quantity: {item.quantity}
                </p>
              </div>

              <p className="font-semibold text-[#173E1A]">
                {formatMoney(
                  Number(item.price || 0) * Number(item.quantity || 0),
                )}
              </p>
            </div>
          );
        })}
      </div>

      {/* FOOTER */}

      <div className="mt-5 flex flex-col gap-3 border-t border-[#EDF4EE] pt-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.12em] text-[#4A5E4F]">
            Pickup
          </p>

          <p className="mt-1 text-sm font-semibold text-[#173E1A]">
            {order.pickupPlace || "Not specified"}
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-xs uppercase tracking-[0.12em] text-[#4A5E4F]">
              Total
            </p>

            <p className="mt-1 text-lg font-bold text-[#173E1A]">
              {formatMoney(order.totalAmount)}
            </p>
          </div>

          <button
            onClick={() => onView(order.orderId)}
            className="inline-flex items-center gap-2 rounded-xl bg-[#1B5E20] px-4 py-2.5 text-sm font-semibold text-white"
          >
            <Eye size={16} />
            View
          </button>
        </div>
      </div>
    </div>
  );
}

/* ==================================================
   LOADING
================================================== */

function Loading() {
  return (
    <div className="rounded-[22px] border border-[#E7F1E8] bg-white p-10 text-center">
      <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-[#EAF3EB] border-t-[#1B5E20]" />

      <p className="mt-4 text-sm text-[#4A5E4F]">Loading your orders...</p>
    </div>
  );
}

/* ==================================================
   EMPTY STATE
================================================== */

function EmptyState({ message }) {
  return (
    <div className="rounded-[22px] border border-[#E7F1E8] bg-white p-10 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#E8F5E9] text-[#1B5E20]">
        <ShoppingBag size={24} />
      </div>

      <p className="mt-4 text-sm text-[#4A5E4F]">{message}</p>
    </div>
  );
}

/* ==================================================
   ERROR
================================================== */

function ErrorBox({ message, retry }) {
  return (
    <div className="rounded-[22px] border border-red-100 bg-white p-8 text-center">
      <p className="text-sm text-red-600">{message}</p>

      <button
        onClick={retry}
        className="mt-4 rounded-xl bg-[#1B5E20] px-4 py-2.5 text-sm font-semibold text-white"
      >
        Try Again
      </button>
    </div>
  );
}

export default CustomerDashboard;
