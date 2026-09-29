import React, { useContext } from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext.jsx";
import ProductItem from "../components/ProductItem.jsx";

function FreshProduct() {
  const { products } = useContext(ShopContext);
  const navigate = useNavigate();

  // Show only a few products on the homepage
  const featuredProducts = products.slice(0, 4);

  return (
    <section className="bg-[#fbfbf6] py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <div className="mb-12 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="inline-flex items-center rounded-full border border-[#D9EFD8] bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#1B5E20]">
              Fresh picks
            </span>

            <h2 className="mt-4 text-3xl font-black tracking-tight text-[#173E1A] sm:text-4xl">
              Farm-fresh finds for today
            </h2>

            <p className="mt-3 max-w-xl text-sm leading-6 text-[#5B6F61] sm:text-base">
              Fresh produce and quality goods sourced directly from farmers and
              trusted sellers.
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate("/product")}
            className="inline-flex items-center gap-2 self-start rounded-full bg-[#1B5E20] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#154a1a]"
          >
            Shop all items
            <span aria-hidden="true">→</span>
          </button>
        </div>

        {/* Products */}
        {featuredProducts.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id || product.productId || index}
                initial={{
                  opacity: 0,
                  y: 35,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                  amount: 0.15,
                }}
                transition={{
                  duration: 0.45,
                  delay: index * 0.08,
                  ease: "easeOut",
                }}
              >
                <ProductItem {...product} />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-[#E4F1E6] bg-white px-6 py-12 text-center">
            <p className="text-sm text-[#5B6F61]">
              No products available right now.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

export default FreshProduct;
