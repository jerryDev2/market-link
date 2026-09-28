import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Check,
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
  } catch (error) {
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
  const [image, setImage] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        setLoading(true);
        const response = await fetch(apiUrl("/api/product"), {
          headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
          throw new Error("Unable to load this product");
        }

        const payload = await response.json();
        const products = Array.isArray(payload)
          ? payload
          : payload.products || payload.data || [];
        const foundProduct = products.find(
          (item) =>
            String(item.productId || item.id) === String(productId) ||
            String(item.name).toLowerCase() === String(productId).toLowerCase(),
        );

        if (!foundProduct) {
          setProductData(null);
          return;
        }

        const normalizedProduct = {
          id: foundProduct.productId || foundProduct.id,
          name: foundProduct.name || "Product",
          category: foundProduct.category || "Farm produce",
          description:
            foundProduct.description || "Freshly harvested from local farms.",
          price: Number(foundProduct.price ?? 0),
          image:
            foundProduct.imageUrl ||
            foundProduct.image ||
            foundProduct.productImage ||
            "",
          quantity: Number(foundProduct.quantity ?? 0),
          unit: foundProduct.unit || "unit",
        };

        setProductData(normalizedProduct);
        setImage(normalizedProduct.image || "");
      } catch (error) {
        console.error("Product detail error:", error);
        setProductData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProductData();
  }, [productId]);

  const handleAddToCart = async () => {
    if (!productData) {
      return;
    }

    const token = localStorage.getItem("token");
    const user = getStoredUser();
    const userId = getUserId(user);

    if (!token || !userId) {
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
      toast.error(
        error.message || "Something went wrong while adding this item.",
      );
    } finally {
      setIsAdding(false);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-[#F7F9F3] px-6 py-16">
        <div className="mx-auto max-w-4xl rounded-[28px] border border-[#E7F1E8] bg-white p-10 text-center shadow-sm">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-[#EAF3EB] border-t-[#1B5E20]" />
          <p className="mt-4 text-base font-medium text-[#2F443B]">
            Loading product...
          </p>
        </div>
      </main>
    );
  }

  if (!productData) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center bg-[#F7F9F3] px-6 py-20 text-center">
        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-[#1B5E20]">
            MarketLink
          </p>
          <h1 className="text-3xl font-bold text-[#173E1A]">
            Product not found
          </h1>
          <p className="mt-3 text-[#4A5E4F]">
            This product is not available right now.
          </p>
          <Link
            to="/product"
            className="mt-7 inline-flex items-center gap-2 rounded-[10px] bg-[#1B5E20] px-5 py-3 text-sm font-semibold text-white"
          >
            <ArrowLeft size={17} /> Back to products
          </Link>
        </div>
      </main>
    );
  }

  const total = (productData.price * quantity).toLocaleString();

  return (
    <main className="min-h-screen bg-[#F7F9F3] px-5 py-10 sm:px-8 lg:px-12 lg:py-16">
      <div className="mx-auto max-w-6xl">
        <Link
          to="/product"
          className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-[#1B5E20] hover:text-[#154a1a]"
        >
          <ArrowLeft size={17} /> Back to all products
        </Link>

        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(360px,0.9fr)] lg:items-start lg:gap-16">
          <section className="grid gap-4 sm:grid-cols-[92px_minmax(0,1fr)]">
            <div className="order-2 flex gap-3 sm:order-1 sm:flex-col">
              {image ? (
                <button
                  type="button"
                  onClick={() => setImage(productData.image)}
                  className="h-20 w-20 cursor-pointer overflow-hidden rounded-xl border-2 border-[#E7F1E8] bg-white p-1 transition hover:border-[#1B5E20]"
                >
                  <img
                    src={productData.image}
                    alt={productData.name}
                    className="h-full w-full object-cover"
                  />
                </button>
              ) : null}
            </div>

            <div className="order-1 flex aspect-square items-center justify-center overflow-hidden rounded-2xl border border-[#E7F1E8] bg-white p-5 sm:order-2">
              {image ? (
                <img
                  src={image}
                  alt={productData.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="text-sm text-[#4A5E4F]">No image available</div>
              )}
            </div>
          </section>

          <section className="pt-1">
            <span className="inline-flex rounded-full bg-[#EAF3EB] px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-[#1B5E20]">
              {productData.category}
            </span>
            <h1 className="mt-4 text-4xl font-bold leading-tight text-[#173E1A] sm:text-5xl">
              {productData.name}
            </h1>

            <div className="mt-5 flex items-end gap-2 border-b border-[#EDF4EE] pb-6">
              <span className="text-3xl font-bold text-[#173E1A]">
                ₦{productData.price.toLocaleString()}
              </span>
              <span className="pb-1 text-sm text-[#4A5E4F]">
                per {productData.unit}
              </span>
            </div>

            <p className="mt-6 max-w-xl text-base leading-7 text-[#4A5E4F]">
              {productData.description}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <div className="flex h-12 items-center rounded-[10px] border border-[#E7F1E8] bg-white">
                <button
                  type="button"
                  onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                  className="grid h-full w-12 place-items-center text-[#1B5E20] transition hover:bg-[#F3F8F3]"
                  aria-label="Decrease quantity"
                >
                  <Minus size={16} />
                </button>
                <span className="w-8 text-center font-semibold text-[#173E1A]">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((prev) => prev + 1)}
                  className="grid h-full w-12 place-items-center text-[#1B5E20] transition hover:bg-[#F3F8F3]"
                  aria-label="Increase quantity"
                >
                  <Plus size={16} />
                </button>
              </div>
              <span className="text-sm text-[#4A5E4F]">₦{total} total</span>
            </div>

            <button
              type="button"
              disabled={isAdding}
              onClick={handleAddToCart}
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-[10px] bg-[#F9C74F] px-5 py-4 text-sm font-bold text-[#173E1A] transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto sm:min-w-64"
            >
              {isAdding ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-[#173E1A] border-t-transparent" />
                  Adding...
                </>
              ) : (
                <>
                  <ShoppingBag size={19} /> Add to cart
                </>
              )}
            </button>

            <div className="mt-9 grid gap-4 border-t border-[#EDF4EE] pt-6 text-sm text-[#4A5E4F] sm:grid-cols-2">
              <div className="flex gap-3">
                <Truck className="shrink-0 text-[#1B5E20]" size={20} />
                <span>
                  <strong className="block font-semibold text-[#173E1A]">
                    Local delivery
                  </strong>
                  Carefully packed for your door.
                </span>
              </div>
              <div className="flex gap-3">
                <ShieldCheck className="shrink-0 text-[#1B5E20]" size={20} />
                <span>
                  <strong className="block font-semibold text-[#173E1A]">
                    Farmer verified
                  </strong>
                  Traceable and fresh from the source.
                </span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

export default ProductPage;
