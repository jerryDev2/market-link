import { useContext, useState } from "react";
import { ArrowUpRight, Check, Minus, Plus, ShoppingBag, X } from "lucide-react";
import { ShopContext } from "../context/ShopContext.jsx";
import { motion } from "motion/react";

const ProductItem = ({ image, name, price, category }) => {
  const { currency } = useContext(ShopContext);
  const [showModal, setShowModal] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  const closeModal = () => {
    setShowModal(false);
    setQuantity(1);
    setAddedToCart(false);
  };

  return (
    <>
      <article className="group overflow-hidden rounded-2xl border border-(--color-border) bg-white transition duration-300 hover:-translate-y-1 hover:shadow-[0_14px_30px_rgba(27,94,32,0.1)]">
        <motion.button
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          type="button"
          onClick={() => setShowModal(true)}
          className="block w-full cursor-pointer text-left"
        >
          <div className="relative aspect-4/3 overflow-hidden bg-(--color-light-gray) p-5">
            <img
              src={image[0]}
              alt={name}
              className="h-full w-full object-contain transition duration-500"
            />
          </div>
          <div className="p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="font-[Poppins] text-lg font-semibold text-(--color-text)">
                  {name}
                </h2>
                <p className="mt-1 text-sm text-(--color-text)/55">
                  Fresh local harvest
                </p>
              </div>
              <ArrowUpRight
                size={19}
                className="mt-1 text-(--color-success) transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </div>
            <div className="mt-5 flex items-center justify-between border-t border-(--color-border) pt-4">
              <p className="font-[Poppins] text-lg font-bold text-(--color-pry)">
                {currency}
                {price}
                <span className="ml-1 text-xs font-normal text-(--color-text)/55">
                  /kg
                </span>
              </p>
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-(--color-success)">
                <ShoppingBag size={14} /> View
              </span>
            </div>
          </div>
        </motion.button>
      </article>

      {showModal && (
        <div
          onClick={closeModal}
          className="fixed inset-0 z-50 flex items-center justify-center bg-(--color-text)/60 px-4 py-8 backdrop-blur-sm"
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label={`${name} details`}
            onClick={(event) => event.stopPropagation()}
            className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-(--color-cream) p-5 shadow-2xl sm:p-8"
          >
            <button
              type="button"
              onClick={closeModal}
              aria-label="Close product details"
              className="absolute top-4 right-4 z-10 grid h-10 w-10 cursor-pointer place-items-center rounded-full bg-white text-(--color-pry) transition hover:bg-(--color-light-gray)"
            >
              <X size={20} />
            </button>
            <div className="grid gap-8 sm:grid-cols-2 sm:items-center">
              <div className="flex aspect-square items-center justify-center overflow-hidden rounded-xl bg-white p-6">
                <img
                  src={image[0]}
                  alt={name}
                  className="h-full w-full object-contain"
                />
              </div>
              <div>
                <p className="font-[Poppins] text-xs font-semibold tracking-[0.16em] text-(--color-success) uppercase">
                  {category}
                </p>
                <h2 className="mt-3 font-[Poppins] text-3xl font-bold text-(--color-pry)">
                  {name}
                </h2>
                <p className="mt-4 font-[Poppins] text-2xl font-bold text-(--color-text)">
                  {currency}
                  {price}
                  <span className="ml-1 text-sm font-normal text-(--color-text)/60">
                    /kg
                  </span>
                </p>
                <p className="mt-4 text-sm leading-6 text-(--color-text)/70">
                  Fresh {name.toLowerCase()} from a trusted local farmer,
                  carefully prepared for your next meal.
                </p>
                <div className="mt-6 flex items-center gap-4">
                  <div className="flex h-11 items-center rounded-lg border border-(--color-border) bg-white">
                    <button
                      type="button"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      aria-label="Decrease quantity"
                      className="grid h-full w-10 cursor-pointer place-items-center text-(--color-pry)"
                    >
                      <Minus size={15} />
                    </button>
                    <span className="w-7 text-center font-[Poppins] font-semibold">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuantity(quantity + 1)}
                      aria-label="Increase quantity"
                      className="grid h-full w-10 cursor-pointer place-items-center text-(--color-pry)"
                    >
                      <Plus size={15} />
                    </button>
                  </div>
                  <span className="text-sm text-(--color-text)/60">
                    {currency}
                    {(Number(price) * quantity).toFixed(2)} total
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setAddedToCart(true)}
                  className="mt-5 flex w-full cursor-pointer items-center justify-center gap-2 rounded-[10px] bg-(--color-gold) px-5 py-3.5 font-[Poppins] text-sm font-bold text-(--color-text) transition hover:brightness-95"
                >
                  {addedToCart ? (
                    <>
                      <Check size={18} /> Added to basket
                    </>
                  ) : (
                    <>
                      <ShoppingBag size={18} /> Add to basket
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductItem;
