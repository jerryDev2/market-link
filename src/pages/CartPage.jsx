import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
  User,
  Phone,
  MapPin,
  CheckCircle2,
} from "lucide-react";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

const apiUrl = (path) => `${API_BASE_URL}${path}`;

const getStoredUser = () => {
  try {
    const rawUser = localStorage.getItem("user");
    return rawUser ? JSON.parse(rawUser) : null;
  } catch (error) {
    return null;
  }
};

const getUserId = (user) =>
  user?.userId || user?.id || user?.customerId || user?.customer_id || null;

const normalizeCartItem = (item) => {
  const product = item.product || {};

  const productId =
    item.productId ||
    product.productId ||
    product.id ||
    item.id ||
    item.cartItemId ||
    "";

  const quantity = Number(item.quantity ?? product.quantity ?? 1);

  return {
    id: item.cartItemId || item.id || `${productId}-${Math.random()}`,
    productId,
    name: item.productName || product.name || "Product",
    image:
      item.productImage ||
      product.image ||
      product.imageUrl ||
      item.image ||
      item.imageUrl ||
      "",
    price: Number(item.price ?? product.price ?? 0),
    quantity: Number.isFinite(quantity) && quantity > 0 ? quantity : 1,
    unit: item.unit || product.unit || "unit",
  };
};

function CartPage() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [checkoutForm, setCheckoutForm] = useState({
    name: "",
    phone: "",
    address: "",
  });

  const user = getStoredUser();
  const token = localStorage.getItem("token");
  const userId = getUserId(user);

  const loadCart = async () => {
    if (!token || !userId) {
      navigate("/login", { replace: true });
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(apiUrl(`/api/cart/user/${userId}`), {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Unable to load cart");
      }

      const payload = await response.json();

      const rawItems = Array.isArray(payload)
        ? payload
        : payload.items || payload.data || payload.cart || [];

      const normalizedItems = rawItems.map(normalizeCartItem);

      // Combine duplicate products
      const groupedItems = normalizedItems.reduce((acc, item) => {
        const existing = acc.find(
          (cartItem) => String(cartItem.productId) === String(item.productId),
        );

        if (existing) {
          existing.quantity += item.quantity;
        } else {
          acc.push({ ...item });
        }

        return acc;
      }, []);

      setItems(groupedItems);
      syncLocalCartCount(groupedItems);
    } catch (error) {
      console.error("Cart load failure:", error);
      setItems([]);
      toast.error("Something went wrong while loading your cart.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCart();
  }, [userId, token]);

  const itemCount = useMemo(
    () => items.reduce((sum, item) => sum + Number(item.quantity || 0), 0),
    [items],
  );

  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items],
  );

  const syncLocalCartCount = (nextItems) => {
    const count = nextItems.reduce(
      (sum, item) => sum + Number(item.quantity || 0),
      0,
    );
    localStorage.setItem("cartCount", String(count));
    window.dispatchEvent(new Event("cart-updated"));
  };

  const updateItemQuantity = async (item, nextQuantity) => {
    if (!token || !userId) {
      navigate("/login");
      return;
    }

    const safeQuantity = Math.max(1, Number(nextQuantity) || 1);

    try {
      const response = await fetch(apiUrl("/api/cart/item"), {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          cartItemId: item.id,
          productId: item.productId,
          quantity: safeQuantity,
        }),
      });

      if (!response.ok) {
        throw new Error("Unable to update cart item");
      }

      const nextItems = items.map((cartItem) =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: safeQuantity }
          : cartItem,
      );

      setItems(nextItems);
      syncLocalCartCount(nextItems);
      toast.success("Cart updated successfully.");
    } catch (error) {
      console.error("Cart update error:", error);
      toast.error("Something went wrong while updating your cart.");
    }
  };

  const removeItem = async (item) => {
    if (!token || !userId) {
      navigate("/login");
      return;
    }

    try {
      const response = await fetch(apiUrl(`/api/cart/${item.id}`), {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Unable to remove item from cart");
      }

      const nextItems = items.filter((cartItem) => cartItem.id !== item.id);
      setItems(nextItems);
      syncLocalCartCount(nextItems);
      toast.success(`${item.name} removed from cart.`);
    } catch (error) {
      console.error("Remove cart item error:", error);
      toast.error("Something went wrong while removing the item.");
    }
  };

 const handleCheckoutSubmit = async (event) => {
   event.preventDefault();

   if (!token || !userId) {
     navigate("/login");
     return;
   }

   if (
     !checkoutForm.name.trim() ||
     !checkoutForm.phone.trim() ||
     !checkoutForm.address.trim()
   ) {
     toast.error("Please complete your delivery details to continue.");
     return;
   }

   if (items.length === 0) {
     toast.error("Your cart is empty.");
     return;
   }

   try {
     setIsSubmitting(true);

     const response = await fetch(apiUrl("/api/orders"), {
       method: "POST",
       headers: {
         Authorization: `Bearer ${token}`,
         "Content-Type": "application/json",
       },
       body: JSON.stringify({
         userId: userId,
         pickupPlace: checkoutForm.address,
       }),
     });

     const payload = await response.json().catch(() => ({}));

     if (!response.ok) {
       throw new Error(
         payload.message || payload.error || "Unable to place order",
       );
     }

     console.log("Order created:", payload);

     const orderId =
       payload.orderId ||
       payload.id ||
       payload.order?.orderId ||
       payload.order?.id;

     localStorage.setItem("last-order", JSON.stringify(payload));

     localStorage.setItem("cartCount", "0");

     setItems([]);

     setCheckoutOpen(false);

     window.dispatchEvent(new Event("cart-updated"));

     if (orderId) {
       navigate(`/order-details/${orderId}`);
     } else {
       navigate("/customer-dashboard");
     }

     toast.success(
       "Order placed successfully. Your farmer will review it soon.",
     );
   } catch (error) {
     console.error("Checkout error:", error);

     toast.error(
       error.message || "Something went wrong while placing your order.",
     );
   } finally {
     setIsSubmitting(false);
   }
 };

  if (loading) {
    return (
      <main className="min-h-screen bg-[#F7F9F3] px-5 py-16">
        <div className="mx-auto max-w-5xl rounded-[28px] border border-[#E7F1E8] bg-white p-10 text-center shadow-sm">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-[#EAF3EB] border-t-[#1B5E20]" />
          <p className="mt-4 text-base font-medium text-[#2F443B]">
            Loading your cart...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F7F9F3] px-5 py-10 sm:px-8 lg:px-12 lg:py-16">
      <div className="mx-auto max-w-6xl">
        <Link
          to="/product"
          className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-[#1B5E20] hover:text-[#154a1a]"
        >
          <ArrowLeft size={17} /> Back to products
        </Link>

        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#1B5E20]">
              Basket
            </p>
            <h1 className="mt-2 text-3xl font-bold text-[#173E1A] sm:text-4xl">
              Your cart
            </h1>
          </div>

          <div className="rounded-full bg-[#EAF3EB] px-4 py-2 text-sm font-semibold text-[#1B5E20]">
            {itemCount} item{itemCount === 1 ? "" : "s"}
          </div>
        </div>

        {items.length === 0 ? (
          <div className="rounded-[28px] border border-[#E7F1E8] bg-white p-8 text-center shadow-sm">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#EAF3EB] text-[#1B5E20]">
              <ShoppingBag size={28} />
            </div>
            <h2 className="mt-5 text-2xl font-bold text-[#173E1A]">
              Your cart is empty
            </h2>
            <p className="mt-2 text-[#4A5E4F]">
              Add some fresh produce from the market and come back here.
            </p>
            <Link
              to="/product"
              className="mt-6 inline-flex rounded-xl bg-[#1B5E20] px-5 py-3 text-sm font-semibold text-white"
            >
              Continue shopping
            </Link>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.5fr)_360px]">
            <section className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="rounded-[24px] border border-[#E7F1E8] bg-white p-4 shadow-[0_12px_28px_rgba(27,94,32,0.04)] sm:p-5"
                >
                  <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                    <div className="h-28 w-full overflow-hidden rounded-2xl bg-[#F3F8F3] sm:w-28">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-sm font-medium text-[#4A5E4F]">
                          No image
                        </div>
                      )}
                    </div>

                    <div className="flex-1">
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                          <h2 className="text-xl font-bold text-[#173E1A]">
                            {item.name}
                          </h2>
                          <p className="mt-1 text-sm text-[#4A5E4F]">
                            {item.unit} • ₦{Number(item.price).toLocaleString()}{" "}
                            each
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={() => removeItem(item)}
                          className="inline-flex items-center gap-2 self-start rounded-full border border-[#E7F1E8] bg-[#F8FAF8] px-3 py-1.5 text-xs font-semibold text-[#B42318]"
                        >
                          <Trash2 size={14} /> Remove
                        </button>
                      </div>

                      <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-center rounded-xl border border-[#E7F1E8] bg-[#F9FBF8] p-1">
                          <button
                            type="button"
                            onClick={() =>
                              updateItemQuantity(item, item.quantity - 1)
                            }
                            className="grid h-10 w-10 place-items-center rounded-lg text-[#1B5E20] hover:bg-white"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="min-w-10 text-center font-semibold text-[#173E1A]">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              updateItemQuantity(item, item.quantity + 1)
                            }
                            className="grid h-10 w-10 place-items-center rounded-lg text-[#1B5E20] hover:bg-white"
                          >
                            <Plus size={16} />
                          </button>
                        </div>

                        <div className="text-left sm:text-right">
                          <p className="text-xs uppercase tracking-[0.12em] text-[#4A5E4F]">
                            Total
                          </p>
                          <p className="mt-1 text-2xl font-bold text-[#173E1A]">
                            ₦{(item.price * item.quantity).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </section>

            <aside className="rounded-[28px] border border-[#E7F1E8] bg-white p-5 shadow-[0_12px_28px_rgba(27,94,32,0.04)]">
              <h2 className="text-xl font-bold text-[#173E1A]">Summary</h2>

              <div className="mt-5 space-y-3 text-sm text-[#2F443B]">
                <div className="flex items-center justify-between">
                  <span>Items</span>
                  <span>{itemCount}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Subtotal</span>
                  <span>₦{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Delivery</span>
                  <span>₦0</span>
                </div>
              </div>

              <div className="mt-5 border-t border-[#EDF4EE] pt-4">
                <div className="flex items-center justify-between text-lg font-bold text-[#173E1A]">
                  <span>Total</span>
                  <span>₦{subtotal.toLocaleString()}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setCheckoutOpen(true)}
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#1B5E20] px-5 py-3 text-sm font-semibold text-white"
              >
                <CheckCircle2 size={18} /> Checkout
              </button>
            </aside>
          </div>
        )}
      </div>

      {checkoutOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#173E1A]/55 px-4 py-8 backdrop-blur-sm">
          <div className="w-full max-w-xl rounded-[28px] bg-white p-6 shadow-[0_30px_80px_rgba(23,62,26,0.18)]">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#1B5E20]">
                  Delivery
                </p>
                <h2 className="mt-2 text-2xl font-bold text-[#173E1A]">
                  Checkout
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setCheckoutOpen(false)}
                className="grid h-10 w-10 place-items-center rounded-full bg-[#F3F8F3] text-[#173E1A]"
              >
            
              </button>
            </div>

            <form onSubmit={handleCheckoutSubmit} className="mt-6 space-y-4">
              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-medium text-[#2F443B]">
                  <User size={16} className="text-[#1B5E20]" /> Full name
                </label>
                <input
                  type="text"
                  value={checkoutForm.name}
                  onChange={(event) =>
                    setCheckoutForm((previous) => ({
                      ...previous,
                      name: event.target.value,
                    }))
                  }
                  className="w-full rounded-xl border border-[#E7F1E8] bg-[#F9FBF8] px-3.5 py-3 text-sm text-[#173E1A] outline-none focus:border-[#2E7D32]"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-medium text-[#2F443B]">
                  <Phone size={16} className="text-[#1B5E20]" /> Phone number
                </label>
                <input
                  type="tel"
                  value={checkoutForm.phone}
                  onChange={(event) =>
                    setCheckoutForm((previous) => ({
                      ...previous,
                      phone: event.target.value,
                    }))
                  }
                  className="w-full rounded-xl border border-[#E7F1E8] bg-[#F9FBF8] px-3.5 py-3 text-sm text-[#173E1A] outline-none focus:border-[#2E7D32]"
                  placeholder="0803 000 0000"
                />
              </div>

              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-medium text-[#2F443B]">
                  <MapPin size={16} className="text-[#1B5E20]" /> Delivery
                  address
                </label>
                <textarea
                  rows="4"
                  value={checkoutForm.address}
                  onChange={(event) =>
                    setCheckoutForm((previous) => ({
                      ...previous,
                      address: event.target.value,
                    }))
                  }
                  className="w-full rounded-xl border border-[#E7F1E8] bg-[#F9FBF8] px-3.5 py-3 text-sm text-[#173E1A] outline-none focus:border-[#2E7D32]"
                  placeholder="Enter your delivery address"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setCheckoutOpen(false)}
                  className="rounded-xl border border-[#1B5E20] bg-white px-4 py-2.5 text-sm font-semibold text-[#1B5E20]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="rounded-xl bg-[#1B5E20] px-4 py-2.5 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isSubmitting ? "Placing order..." : "Continue"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}

export default CartPage;
