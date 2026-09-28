import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  CheckCircle2,
  Clock3,
  MapPin,
  Phone,
  PackageCheck,
  ArrowLeft,
} from "lucide-react";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";
const apiUrl = (path) => `${API_BASE_URL}${path}`;

function OrderDetailsPage() {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      const token = localStorage.getItem("token");

      if (!token || !orderId) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(apiUrl(`/api/orders/${orderId}`), {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Unable to load your order");
        }

        const data = await response.json();
        setOrder(data.order || data.data || data);
      } catch (error) {
        console.error("Order fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#F7F9F3] px-5 py-16">
        <div className="mx-auto max-w-4xl rounded-[28px] border border-[#E7F1E8] bg-white p-10 text-center shadow-sm">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-[#EAF3EB] border-t-[#1B5E20]" />
          <p className="mt-4 text-base font-medium text-[#2F443B]">
            Loading your order...
          </p>
        </div>
      </main>
    );
  }

  if (!order) {
    return (
      <main className="min-h-screen bg-[#F7F9F3] px-5 py-16">
        <div className="mx-auto max-w-4xl rounded-[28px] border border-[#E7F1E8] bg-white p-10 text-center shadow-sm">
          <p className="text-lg font-semibold text-[#173E1A]">
            Order not found
          </p>
          <Link
            to="/product"
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#1B5E20] px-5 py-3 text-sm font-semibold text-white"
          >
            <ArrowLeft size={17} /> Back to products
          </Link>
        </div>
      </main>
    );
  }

  const status = order.status || "Pending";
  const total = Number(order.totalAmount || order.total || 0);
  const orderItems = Array.isArray(order.items) ? order.items : [];

  return (
    <main className="min-h-screen bg-[#F7F9F3] px-5 py-10 sm:px-8 lg:px-12 lg:py-16">
      <div className="mx-auto max-w-5xl">
        <Link
          to="/product"
          className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-[#1B5E20] hover:text-[#154a1a]"
        >
          <ArrowLeft size={17} /> Back to products
        </Link>

        <div className="rounded-[28px] border border-[#E7F1E8] bg-white p-6 shadow-[0_12px_28px_rgba(27,94,32,0.04)] sm:p-8">
          <div className="flex flex-col gap-4 border-b border-[#EDF4EE] pb-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#1B5E20]">
                Order details
              </p>
              <h1 className="mt-2 text-3xl font-bold text-[#173E1A]">
                #{order.orderId || orderId}
              </h1>
            </div>

            <div className="rounded-full bg-[#EAF3EB] px-4 py-2 text-sm font-semibold text-[#1B5E20]">
              {status}
            </div>
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <section className="space-y-4">
              <div className="rounded-[22px] bg-[#F9FBF8] p-4">
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-[#EAF3EB] p-2 text-[#1B5E20]">
                    <PackageCheck size={18} />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.12em] text-[#4A5E4F]">
                      Status
                    </p>
                    <p className="font-semibold text-[#173E1A]">{status}</p>
                  </div>
                </div>
              </div>

              <div className="rounded-[22px] border border-[#E7F1E8] bg-white p-4">
                <h2 className="text-xl font-bold text-[#173E1A]">Items</h2>
                <div className="mt-4 space-y-3">
                  {orderItems.length === 0 ? (
                    <p className="text-sm text-[#4A5E4F]">
                      No items in this order.
                    </p>
                  ) : (
                    orderItems.map((item, index) => (
                      <div
                        key={`${item.productId || item.name || index}`}
                        className="flex items-center justify-between rounded-xl bg-[#F7F9F3] px-3 py-3"
                      >
                        <div>
                          <p className="font-semibold text-[#173E1A]">
                            {item.productName || item.name || "Product"}
                          </p>
                          <p className="text-sm text-[#4A5E4F]">
                            Qty: {item.quantity || 1}
                          </p>
                        </div>
                        <p className="font-bold text-[#173E1A]">
                          ₦{Number(item.price || 0).toLocaleString()}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </section>

            <aside className="space-y-4">
              <div className="rounded-[22px] border border-[#E7F1E8] bg-white p-4">
                <h2 className="text-xl font-bold text-[#173E1A]">
                  Customer info
                </h2>
                <div className="mt-4 space-y-3 text-sm text-[#2F443B]">
                  <div className="flex items-center gap-3">
                    <Phone size={16} className="text-[#1B5E20]" />
                    <span>
                      {order.phoneNumber ||
                        order.customerPhone ||
                        "Not provided"}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin size={16} className="text-[#1B5E20]" />
                    <span>
                      {order.deliveryAddress || order.address || "Not provided"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="rounded-[22px] border border-[#E7F1E8] bg-white p-4">
                <h2 className="text-xl font-bold text-[#173E1A]">Summary</h2>
                <div className="mt-4 space-y-2 text-sm text-[#2F443B]">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₦{total.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery</span>
                    <span>₦0</span>
                  </div>
                </div>
                <div className="mt-4 border-t border-[#EDF4EE] pt-4">
                  <div className="flex justify-between font-bold text-[#173E1A]">
                    <span>Total</span>
                    <span>₦{total.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </main>
  );
}

export default OrderDetailsPage;
