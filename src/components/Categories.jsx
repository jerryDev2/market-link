import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const categories = [
  {
    title: "Crops & Grains",
    filter: "Grains",
    image: "/images/Crop%20and%20Grain%20Farms/crop%20and%20grain.jfif",
    description: "Maize, rice, wheat and other staple farm produce.",
  },
  {
    title: "Fruits & Vegetables",
    filter: "Fruits",
    image:
      "/images/Horticulture%20and%20Vegetable%20Farms/Horticulture%20and%20Vegetable%20Farms.jfif",
    description: "Fresh fruits, vegetables and greens from local farms.",
  },
  {
    title: "Livestock & Dairy",
    filter: "Livestock",
    image:
      "/images/Livestock%20and%20Dairy%20Farms/Livestock%20and%20Dairy%20Farms.jfif",
    description: "Quality meat, milk and other livestock products.",
  },
  {
    title: "Poultry & Eggs",
    filter: "Poultry",
    image:
      "/images/Poultry%20and%20Egg%20Farms/Poultry%20and%20Egg%20Farms.jfif",
    description: "Fresh eggs and poultry products from local farms.",
  },
];

function Categories() {
  return (
    <section id="categories" className="bg-[#F5F9F3] py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mb-10">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#1B5E20]">
            Farm Categories
          </span>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#173E1A] sm:text-4xl">
            Shop by category
          </h2>

          <p className="mt-3 max-w-xl text-sm leading-6 text-[#4B5F52]">
            Explore fresh produce and farm products from trusted local farmers.
          </p>
        </div>

        {/* Categories */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map(({ title, filter, image, description }, index) => (
            <motion.article
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.4,
                delay: index * 0.05,
              }}
              className="group overflow-hidden rounded-2xl border border-[#E2EEE3] bg-white transition hover:-translate-y-1 hover:shadow-lg"
            >
              {/* Image */}
              <div className="h-52 overflow-hidden">
                <img
                  src={image}
                  alt={title}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="text-lg font-bold text-[#173E1A]">{title}</h3>

                <p className="mt-2 text-sm leading-6 text-[#5B6F61]">
                  {description}
                </p>

                <Link
                  to={`/product?category=${encodeURIComponent(filter)}`}
                  className="mt-5 inline-flex items-center text-sm font-semibold text-[#1B5E20] transition hover:text-[#154a1a]"
                >
                  Shop category
                  <span className="ml-2 transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Categories;
