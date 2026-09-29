import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Minus,
  Plus,
  ShieldCheck,
  ShoppingBag,
  Truck,
} from "lucide-react";
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

const ProductPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();

  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);

        const response = await fetch(apiUrl("/api/product"));

        if (!response.ok) {
          throw new Error("Unable to load products");
        }

        const payload = await response.json();

        const products = Array.isArray(payload)
          ? payload
          : payload.products || payload.data || [];

        const foundProduct = products.find(
          (item) =>
            String(item.productId || item.id) === String(productId) ||
            String(item.name || "").toLowerCase() ===
              String(productId).toLowerCase(),
        );

        if (!foundProduct) {
          setProductData(null);
          return;
        }

        setProductData({
          id: foundProduct.productId || foundProduct.id,
          name: foundProduct.name || "Product",
          category: foundProduct.category || "Farm produce",
          description:
            foundProduct.description || "Fresh produce from local farmers.",
          price: Number(foundProduct.price || 0),
          imageUrl:
            foundProduct.imageUrl ||
            foundProduct.image ||
            foundProduct.productImage ||
            "",
          quantity: Number(foundProduct.quantity || 0),
          unit: foundProduct.unit || "unit",
        });
      } catch (error) {
        console.error("Product detail error:", error);
        setProductData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleAddToCart = async () => {
    if (!productData) return;

    const token = localStorage.getItem("token");
    const user = getStoredUser();
    const userId = getUserId(user);

    if (!token || !userId) {
      toast.error("Please sign in before adding products to your cart.");
      navigate("/login");
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
          userId,
          productId: productData.id,
          quantity,
          price: productData.price,
        }),
      });

      const payload = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          payload.message || payload.error || "Unable to add product to cart",
        );
      }

      const currentCount = Number(localStorage.getItem("cartCount") || 0);

      localStorage.setItem("cartCount", String(currentCount + quantity));

      window.dispatchEvent(new Event("cart-updated"));

      toast.success(`${productData.name} added to cart.`);
    } catch (error) {
      console.error("Add to cart error:", error);

      toast.error(error.message || "Unable to add this product to your cart.");
    } finally {
      setIsAdding(false);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-[#F7F9F3] px-5 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="flex min-h-[500px] items-center justify-center rounded-[28px] bg-white">
            <div className="text-center">
              <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-[#E8F5E9] border-t-[#1B5E20]" />

              <p className="mt-4 text-sm font-medium text-[#4A5E4F]">
                Loading product...
              </p>
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (!productData) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-[#F7F9F3] px-5">
        <div className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#E8F5E9] text-2xl">
            🥬
          </div>

          <h1 className="mt-5 text-3xl font-bold text-[#173E1A]">
            Product not found
          </h1>

          <p className="mt-2 text-[#607568]">
            This product is currently unavailable.
          </p>

          <Link
            to="/product"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#1B5E20] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#154a1a]"
          >
            <ArrowLeft size={17} />
            Back to products
          </Link>
        </div>
      </main>
    );
  }

  const total = productData.price * quantity;

  const increaseQuantity = () => {
    if (productData.quantity > 0) {
      setQuantity((prev) => Math.min(prev + 1, productData.quantity));
    }
  };

  const decreaseQuantity = () => {
    setQuantity((prev) => Math.max(1, prev - 1));
  };

  return (
    <main className="min-h-screen bg-[#F7F9F3] px-5 py-10 sm:px-8 lg:px-12 lg:py-14">
      <div className="mx-auto max-w-6xl">
        {/* Back */}
        <Link
          to="/product"
          className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-[#1B5E20] transition hover:text-[#154a1a]"
        >
          <ArrowLeft size={17} />
          Back to products
        </Link>

        <div className="grid overflow-hidden rounded-[30px] border border-[#E5EEE6] bg-white shadow-[0_20px_60px_rgba(27,94,32,0.07)] lg:grid-cols-2">
          {/* IMAGE */}
          <section className="flex min-h-[420px] items-center justify-center bg-[#F1F7F1] p-6 sm:p-10 lg:min-h-[620px]">
            <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-[24px] bg-white p-6">
              {productData.imageUrl ? (
                <img
                  src={productData.imageUrl}
                  alt={productData.name}
                  className="h-full max-h-[540px] w-full object-contain transition duration-500 hover:scale-105"
                  onError={(event) => {
                    event.currentTarget.style.display = "none";
                  }}
                />
              ) : (
                <div className="text-center text-[#607568]">
                  <ShoppingBag size={50} className="mx-auto mb-3 opacity-40" />
                  <p>No image available</p>
                </div>
              )}
            </div>
          </section>

          {/* DETAILS */}
          <section className="flex flex-col p-6 sm:p-10 lg:p-14">
            {/* Category */}
            <span className="w-fit rounded-full bg-[#E8F5E9] px-4 py-1.5 text-xs font-bold uppercase tracking-[0.12em] text-[#1B5E20]">
              {productData.category}
            </span>

            {/* Name */}
            <h1 className="mt-5 text-4xl font-bold leading-tight text-[#173E1A] sm:text-5xl">
              {productData.name}
            </h1>

            {/* Description */}
            <p className="mt-5 max-w-xl text-base leading-7 text-[#607568]">
              {productData.description}
            </p>

            {/* Price */}
            <div className="mt-7 border-y border-[#E8F0E8] py-6">
              <p className="text-3xl font-bold text-[#1B5E20]">
                ₦{productData.price.toLocaleString()}
              </p>

              <p className="mt-1 text-sm text-[#78909C]">
                per {productData.unit}
              </p>
            </div>

            {/* Stock */}
            <div className="mt-6">
              {productData.quantity > 0 ? (
                <p className="text-sm font-semibold text-[#2E7D32]">
                  ✓ {productData.quantity} available
                </p>
              ) : (
                <p className="text-sm font-semibold text-red-600">
                  Out of stock
                </p>
              )}
            </div>

            {/* Quantity */}
            <div className="mt-7">
              <p className="mb-3 text-sm font-semibold text-[#263238]">
                Quantity
              </p>

              <div className="flex w-fit items-center overflow-hidden rounded-xl border border-[#DDE9DE] bg-white">
                <button
                  type="button"
                  onClick={decreaseQuantity}
                  disabled={quantity <= 1}
                  className="grid h-12 w-12 place-items-center text-[#1B5E20] transition hover:bg-[#F3F8F3] disabled:opacity-30"
                >
                  <Minus size={17} />
                </button>

                <span className="flex h-12 w-14 items-center justify-center border-x border-[#DDE9DE] font-semibold text-[#173E1A]">
                  {quantity}
                </span>

                <button
                  type="button"
                  onClick={increaseQuantity}
                  disabled={
                    productData.quantity <= 0 ||
                    quantity >= productData.quantity
                  }
                  className="grid h-12 w-12 place-items-center text-[#1B5E20] transition hover:bg-[#F3F8F3] disabled:opacity-30"
                >
                  <Plus size={17} />
                </button>
              </div>
            </div>

            {/* Total */}
            <div className="mt-6 flex items-center justify-between rounded-xl bg-[#F7F9F3] px-5 py-4">
              <span className="text-sm text-[#607568]">Total</span>

              <span className="text-xl font-bold text-[#173E1A]">
                ₦{total.toLocaleString()}
              </span>
            </div>

            {/* Add to cart */}
            <button
              type="button"
              disabled={isAdding || productData.quantity <= 0}
              onClick={handleAddToCart}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#1B5E20] px-6 py-4 text-base font-bold text-white transition hover:bg-[#154a1a] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isAdding ? (
                <>
                  <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Adding to cart...
                </>
              ) : (
                <>
                  <ShoppingBag size={20} />
                  Add to cart
                </>
              )}
            </button>

            {/* Features */}
            <div className="mt-8 grid gap-4 border-t border-[#E8F0E8] pt-7 sm:grid-cols-2">
              <div className="flex gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#E8F5E9]">
                  <Truck size={19} className="text-[#1B5E20]" />
                </div>

                <div>
                  <p className="text-sm font-semibold text-[#173E1A]">
                    Local delivery
                  </p>

                  <p className="mt-1 text-xs leading-5 text-[#607568]">
                    Fresh produce delivered from local farmers.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#E8F5E9]">
                  <ShieldCheck size={19} className="text-[#1B5E20]" />
                </div>

                <div>
                  <p className="text-sm font-semibold text-[#173E1A]">
                    Farmer verified
                  </p>

                  <p className="mt-1 text-xs leading-5 text-[#607568]">
                    Quality produce from trusted sources.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

export default ProductPage;
