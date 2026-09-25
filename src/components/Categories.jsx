import { Link } from "react-router-dom";

function Categories() {
  const categories = [
    {
      title: "Fruits & Vegetables",
      description: "Fresh, seasonal produce from local farmers.",
      image: "/images/categories/fruits-vegetables.jpg",
      link: "/products?category=fruits-vegetables",
    },
    {
      title: "Livestock & Poultry",
      description: "Healthy livestock and poultry from trusted farmers.",
      image: "/images/categories/livestock.jpg",
      link: "/products?category=livestock",
    },
    {
      title: "Grains & Cereals",
      description: "Quality grains sourced directly from local farms.",
      image: "/images/categories/grains.jpg",
      link: "/products?category=grains",
    },
    {
      title: "Dairy & Eggs",
      description: "Fresh eggs and farm-sourced dairy products.",
      image: "/images/categories/dairy-eggs.jpg",
      link: "/products?category=dairy-eggs",
    },
  ];

  return (
    <section className="bg-[#FFFDF5] py-20 sm:py-24">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8 lg:px-10">
        {/* Section Header */}
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <span className="h-[2px] w-8 bg-[#F9C74F]" />

              <span className="font-['Poppins'] text-xs font-semibold uppercase tracking-[0.18em] text-[#1B5E20]">
                Shop by Category
              </span>
            </div>

            <h2 className="font-['Poppins'] text-3xl font-bold tracking-tight text-[#1B5E20] sm:text-4xl">
              Fresh from the Farm
            </h2>

            <p className="mt-3 max-w-xl font-['Inter'] text-sm leading-7 text-[#607D8B] sm:text-base">
              Explore fresh farm products and connect with local farmers through
              MarketLink.
            </p>
          </div>

          <Link
            to="/categories"
            className="group inline-flex w-fit items-center gap-2 font-['Poppins'] text-sm font-semibold text-[#1B5E20]"
          >
            View All Categories
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>

        {/* Categories */}
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <Link
              key={category.title}
              to={category.link}
              className="group overflow-hidden rounded-2xl border border-[#E8F5E9] bg-white shadow-[0_4px_15px_rgba(27,94,32,0.06)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_15px_30px_rgba(27,94,32,0.12)]"
            >
              {/* Image */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={category.image}
                  alt={category.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Image overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1B5E20]/70 via-[#1B5E20]/10 to-transparent" />
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-['Poppins'] text-lg font-semibold text-[#1B5E20]">
                      {category.title}
                    </h3>

                    <p className="mt-2 font-['Inter'] text-sm leading-6 text-[#607D8B]">
                      {category.description}
                    </p>
                  </div>

                  {/* Gold circle arrow */}
                  <span className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#F9C74F] font-semibold text-[#1B5E20] transition-all duration-300 group-hover:translate-x-1 group-hover:bg-[#1B5E20] group-hover:text-white">
                    →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom Message */}
        <div className="mt-10 flex flex-col items-center justify-center gap-2 text-center sm:flex-row">
          <span className="h-2 w-2 rounded-full bg-[#F9C74F]" />

          <p className="font-['Inter'] text-sm text-[#607D8B]">
            Fresh Produce
            <span className="mx-2 text-[#A5D6A7]">•</span>
            Local Farmers
            <span className="mx-2 text-[#A5D6A7]">•</span>
            Better Communities
          </p>

          <span className="h-2 w-2 rounded-full bg-[#F9C74F]" />
        </div>
      </div>
    </section>
  );
}

export default Categories;
