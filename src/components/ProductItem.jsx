import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Check, Minus, Plus, ShoppingBag } from "lucide-react";
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

const ProductItem = (product) => {
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

  const productId = product.id || product.productId || "";
  const image = product.image || "";
  const name = product.name || "Fresh product";
  const price = Number(product.price ?? 0);
  const category = product.category || "Farm produce";
  const description =
    product.description || "Freshly harvested from local farms.";

  const handleAddToCart = async () => {
    const token = localStorage.getItem("token");
    const user = getStoredUser();
    const userId = getUserId(user);

    if (!token || !userId) {
      navigate("/login");
      return;
    }

    try {
      setIsAdding(true);
      const response = await fetch(
        apiUrl(
           `/api/cart/item?userId=${userId}&productId=${productId}&quantity=${quantity}`,
        ),
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId,
            productId,
            quantity,
            price,
          }),
        },
      );

      const payload = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          payload.message || payload.error || "Unable to add product to cart",
        );
      }

      const currentCount = Number(localStorage.getItem("cartCount") || 0);
      localStorage.setItem("cartCount", String(currentCount + quantity));
      window.dispatchEvent(new Event("cart-updated"));
      toast.success(`${name} added to cart.`);
    } catch (error) {
      console.error("Add to cart error:", error);
      toast.error(
        error.message || "Something went wrong while adding this product.",
      );
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <article className="group overflow-hidden rounded-[26px] border border-[#E7F1E8] bg-white shadow-[0_18px_40px_rgba(23,62,26,0.04)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_52px_rgba(23,62,26,0.08)]">
      <Link to={`/productPage/${productId}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden bg-[#F3F8F3] p-3">
          {image ? (
            <img
              src={image}
              alt={name}
              className="h-full w-full rounded-[18px] object-cover transition duration-500 group-hover:scale-[1.02]"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center rounded-[18px] bg-[#EAF3EB] text-sm font-medium text-[#4A5E4F]">
              No image
            </div>
          )}
          <span className="absolute left-5 top-5 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#1B5E20] backdrop-blur-sm">
            {category}
          </span>
        </div>
      </Link>

      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold text-[#173E1A]">{name}</h2>
            <p className="mt-1 text-sm text-[#4A5E4F]">{description}</p>
          </div>
          <Link
            to={`/productPage/${productId}`}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#EAF3EB] text-[#1B5E20] transition hover:bg-[#D7EED8]"
          >
            <ArrowRight size={18} />
          </Link>
        </div>

        <div className="mt-5 flex items-center justify-between border-t border-[#EDF4EE] pt-4">
          <div>
            <p className="text-xs uppercase tracking-[0.12em] text-[#4A5E4F]">
              Price
            </p>
            <p className="mt-1 text-2xl font-bold text-[#173E1A]">
              ₦{price.toLocaleString()}
            </p>
          </div>

          
        </div>

        <button
          type="button"
          disabled={isAdding}
          onClick={handleAddToCart}
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#1B5E20] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#154a1a] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isAdding ? (
            <>
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              Adding...
            </>
          ) : (
            <>
              <ShoppingBag size={18} /> Add to cart
            </>
          )}
        </button>
      </div>
    </article>
  );
};

export default ProductItem;
