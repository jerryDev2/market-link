import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Check,
  Minus,
  Plus,
  ShieldCheck,
  ShoppingBag,
  Truck,
} from "lucide-react";
import { ShopContext } from "../context/ShopContext.jsx";

const ProductPage = () => {
  const { productId } = useParams();
  const { currency, products } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  const fetchProductData = () => {
    const product = products.find((item) => item.id === productId);
    setProductData(product || null);
    setImage(product?.image[0] || "");
    setQuantity(1);
    setAddedToCart(false);
  };

  useEffect(() => {
    fetchProductData();
  }, [productId, products]);

  if (productData === false) {
    return <div className="min-h-[60vh] bg-(--color-cream)" />;
  }

  if (!productData) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center bg-(--color-cream) px-6 py-20 text-center">
        <div>
          <p className="mb-3 font-[Poppins] text-sm font-semibold uppercase tracking-[0.18em] text-(--color-pry)">
            MarketLink
          </p>
          <h1 className="font-[Poppins] text-3xl font-bold text-(--color-text)">
            Product not found
          </h1>
          <p className="mt-3 text-(--color-text)/70">
            This harvest may have already found a home.
          </p>
          <Link
            to="/product"
            className="mt-7 inline-flex cursor-pointer items-center gap-2 rounded-[10px] bg-(--color-pry) px-5 py-3 font-[Poppins] text-sm font-semibold text-white transition hover:bg-(--color-success)"
          >
            <ArrowLeft size={17} /> Back to products
          </Link>
        </div>
      </main>
    );
  }

  const total = (Number(productData.price) * quantity).toFixed(2);

  return (
    <main className="min-h-screen bg-(--color-cream) px-5 py-10 sm:px-8 lg:px-12 lg:py-16">
      <div className="mx-auto max-w-6xl">
        <Link
          to="/product"
          className="mb-8 inline-flex cursor-pointer items-center gap-2 font-[Poppins] text-sm font-semibold text-(--color-pry) transition hover:text-(--color-success)"
        >
          <ArrowLeft size={17} /> Back to all products
        </Link>

        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(360px,0.9fr)] lg:items-start lg:gap-16">
          <section className="grid gap-4 sm:grid-cols-[92px_minmax(0,1fr)]">
            <div className="order-2 flex gap-3 sm:order-1 sm:flex-col">
              {productData.image.map((productImage, index) => (
                <button
                  key={productImage}
                  type="button"
                  onClick={() => setImage(productImage)}
                  className={`h-20 w-20 cursor-pointer overflow-hidden rounded-xl border-2 bg-white p-1 transition ${image === productImage ? "border-(--color-gold)" : "border-(--color-border) hover:border-(--color-pry)"}`}
                  aria-label={`View ${productData.name} image ${index + 1}`}
                >
                  <img
                    src={productImage}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>
            <div className="order-1 flex aspect-square items-center justify-center overflow-hidden rounded-2xl border border-(--color-border) bg-white p-5 sm:order-2 lg:max-h-150">
              <img
                src={image}
                alt={productData.name}
                className="h-full w-full object-contain transition duration-500"
              />
            </div>
          </section>

          <section className="pt-1">
            <span className="inline-flex rounded-full bg-(--color-light-green) px-3 py-1 font-[Poppins] text-xs font-semibold uppercase tracking-[0.12em] text-(--color-pry)">
              {productData.category}
            </span>
            <h1 className="mt-4 font-[Poppins] text-4xl font-bold leading-tight text-(--color-pry) sm:text-5xl">
              {productData.name}
            </h1>
            <div className="mt-5 flex items-end gap-2 border-b border-(--color-border) pb-6">
              <span className="font-[Poppins] text-3xl font-bold text-(--color-text)">
                {currency}
                {productData.price}
              </span>
              <span className="pb-1 text-sm text-(--color-text)/60">
                per kg
              </span>
            </div>
            <p className="mt-6 max-w-xl text-base leading-7 text-(--color-text)/75">
              Freshly sourced from a trusted local farmer and ready for your
              next meal. Choose the amount you need and we will prepare it with
              care.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <div className="flex h-12 items-center rounded-[10px] border border-(--color-border) bg-white">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="grid h-full w-12 cursor-pointer place-items-center text-(--color-pry) transition hover:bg-(--color-light-gray)"
                  aria-label="Decrease quantity"
                >
                  <Minus size={16} />
                </button>
                <span className="w-8 text-center font-[Poppins] font-semibold text-(--color-text)">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="grid h-full w-12 cursor-pointer place-items-center text-(--color-pry) transition hover:bg-(--color-light-gray)"
                  aria-label="Increase quantity"
                >
                  <Plus size={16} />
                </button>
              </div>
              <span className="text-sm text-(--color-text)/60">
                {currency}
                {total} total
              </span>
            </div>

            <button
              type="button"
              onClick={() => setAddedToCart(true)}
              className="mt-5 flex w-full cursor-pointer items-center justify-center gap-2 rounded-[10px] bg-(--color-gold) px-5 py-4 font-[Poppins] text-sm font-bold text-(--color-text) transition hover:brightness-95 sm:w-auto sm:min-w-64"
            >
              {addedToCart ? (
                <>
                  <Check size={19} /> Added to basket
                </>
              ) : (
                <>
                  <ShoppingBag size={19} /> Add to basket
                </>
              )}
            </button>

            <div className="mt-9 grid gap-4 border-t border-(--color-border) pt-6 text-sm text-(--color-text)/75 sm:grid-cols-2">
              <div className="flex gap-3">
                <Truck className="shrink-0 text-(--color-success)" size={20} />
                <span>
                  <strong className="block font-[Poppins] text-(--color-text)">
                    Local delivery
                  </strong>
                  Carefully packed for your door.
                </span>
              </div>
              <div className="flex gap-3">
                <ShieldCheck
                  className="shrink-0 text-(--color-success)"
                  size={20}
                />
                <span>
                  <strong className="block font-[Poppins] text-(--color-text)">
                    Farmer verified
                  </strong>
                  Know where your food comes from.
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
