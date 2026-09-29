import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, Plus, Minus } from "lucide-react";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

const apiUrl = (path) => `${API_BASE_URL}${path}`;

const getStoredUser = () => {
  try {
    const rawUser = localStorage.getItem("user");
    return rawUser ? JSON.parse(rawUser) : null;
  } catch {
    return null;
  }
};

const getUserId = (user) =>
  user?.userId || user?.id || user?.customerId || user?.customer_id || null;

function ProductItem({
  id,
  productId,
  name,
  price,
  category,
  description,
  imageUrl,
  image,
  productImage,
  quantity: stockQuantity,
  unit = "unit",
}) {
  const navigate = useNavigate();

  const [cartQuantity, setCartQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

  /*
   * Cloudinary image
   *
   * We use the URL exactly as it comes from your backend.
   */
  const productImageUrl = imageUrl || image || productImage || "";

  const actualProductId = productId || id;

  const stock = Number(stockQuantity ?? 0);

  const increaseQuantity = () => {
    setCartQuantity((current) =>
      stock > 0 ? Math.min(current + 1, stock) : current + 1,
    );
  };

  const decreaseQuantity = () => {
    setCartQuantity((current) => Math.max(1, current - 1));
  };

  const handleAddToCart = async () => {
    const token = localStorage.getItem("token");
    const user = getStoredUser();
    const userId = getUserId(user);

    if (!token || !userId) {
      toast.error("Please sign in before adding products to your cart.");
      navigate("/login");
      return;
    }

    if (!actualProductId) {
      toast.error("Product information is missing.");
      return;
    }

    if (stock <= 0) {
      toast.error("This product is currently out of stock.");
      return;
    }

    try {
      setIsAdding(true);

      const response = await fetch(apiUrl("/api/cart/item"), {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: Number(userId),
          productId: Number(actualProductId),
          quantity: cartQuantity,
          price: Number(price),
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          data.message ||
            data.error ||
            "Unable to add this product to your cart.",
        );
      }

      const oldCount = Number(localStorage.getItem("cartCount") || 0);

      localStorage.setItem("cartCount", String(oldCount + cartQuantity));

      window.dispatchEvent(new Event("cart-updated"));

      toast.success(
        `${cartQuantity} ${name} ${
          cartQuantity === 1 ? "was" : "were"
        } added to your cart.`,
      );
    } catch (error) {
      console.error("Add to cart error:", error);

      toast.error(error.message || "Unable to add product to cart.");
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-(--color-border) bg-white shadow-[0_6px_22px_rgba(27,94,32,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_14px_35px_rgba(27,94,32,0.12)]">
      {/* PRODUCT IMAGE */}
      <Link
        to={`/productPage/${actualProductId}`}
        className="relative block overflow-hidden bg-[#F3F8F3]"
      >
        <div className="aspect-square w-full">
          {productImageUrl ? (
            <img
              src={productImageUrl}
              alt={name || "Product"}
              className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              loading="lazy"
              onError={(event) => {
                event.currentTarget.style.display = "none";
              }}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-sm text-(--color-text)/50">
              No image available
            </div>
          )}
        </div>

        {/* CATEGORY */}
        {category && (
          <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-(--color-success) shadow-sm">
            {category}
          </span>
        )}

        {/* STOCK */}
        {stock <= 0 ? (
          <span className="absolute right-3 top-3 rounded-full bg-red-600 px-3 py-1 text-[11px] font-bold text-white">
            Out of stock
          </span>
        ) : stock <= 5 ? (
          <span className="absolute right-3 top-3 rounded-full bg-[#F9C74F] px-3 py-1 text-[11px] font-bold text-[#173E1A]">
            Only {stock} left
          </span>
        ) : null}
      </Link>

      {/* PRODUCT INFORMATION */}
      <div className="flex flex-1 flex-col p-4">
        <Link to={`/productPage/${actualProductId}`} className="block">
          <h2 className="line-clamp-2 min-h-[48px] font-[Poppins] text-base font-bold leading-6 text-(--color-pry) transition hover:text-(--color-success)">
            {name}
          </h2>
        </Link>

        {description && (
          <p className="mt-2 line-clamp-2 text-sm leading-5 text-(--color-text)/60">
            {description}
          </p>
        )}

        {/* PRICE */}
        <div className="mt-4 flex items-end justify-between">
          <div>
            <p className="text-xl font-bold text-(--color-pry)">
              ₦{Number(price || 0).toLocaleString()}
            </p>

            <p className="mt-0.5 text-xs text-(--color-text)/50">per {unit}</p>
          </div>

          {stock > 0 && (
            <span className="text-xs font-medium text-(--color-success)">
              {stock} available
            </span>
          )}
        </div>

        {/* QUANTITY + ADD TO CART */}
        <div className="mt-4 flex items-center gap-2">
          {/* QUANTITY */}
          <div className="flex h-11 shrink-0 items-center rounded-xl border border-(--color-border) bg-white">
            <button
              type="button"
              onClick={decreaseQuantity}
              disabled={cartQuantity <= 1 || isAdding}
              className="grid h-full w-9 place-items-center text-(--color-success) transition hover:bg-(--color-light-gray) disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Decrease quantity"
            >
              <Minus size={15} />
            </button>

            <span className="w-7 text-center text-sm font-bold text-(--color-pry)">
              {cartQuantity}
            </span>

            <button
              type="button"
              onClick={increaseQuantity}
              disabled={isAdding || (stock > 0 && cartQuantity >= stock)}
              className="grid h-full w-9 place-items-center text-(--color-success) transition hover:bg-(--color-light-gray) disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Increase quantity"
            >
              <Plus size={15} />
            </button>
          </div>

          {/* ADD TO CART */}
          <button
            type="button"
            onClick={handleAddToCart}
            disabled={isAdding || stock <= 0}
            className="flex h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-(--color-pry) px-3 text-sm font-bold text-white transition hover:bg-(--color-success) disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isAdding ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Adding
              </>
            ) : (
              <>
                <ShoppingCart size={17} />
                Add to cart
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
}

export default ProductItem;
