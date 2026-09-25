import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { ChevronDown, SlidersHorizontal } from "lucide-react";
import { ShopContext } from "../context/ShopContext.jsx";
import ProductItem from "../components/ProductItem.jsx";

function Product() {
  const { products } = useContext(ShopContext);

  const [category, setCategory] = useState("All-Products");
  const [showFilter, setShowFilter] = useState(false);
  const [sortType, setSortType] = useState("newest");
  const [showSortOptions, setShowSortOptions] = useState(false);
  const sortMenuRef = useRef(null);

  const sortOptions = [
    { value: "newest", label: "Newest first" },
    { value: "oldest", label: "Oldest first" },
    { value: "low-high", label: "Price: low to high" },
    { value: "high-low", label: "Price: high to low" },
  ];

  const toggleCategory = (ev) => {
    setCategory(ev.target.value);
  };

  useEffect(() => {
    const closeSortOptions = (event) => {
      if (!sortMenuRef.current?.contains(event.target)) {
        setShowSortOptions(false);
      }
    };

    document.addEventListener("pointerdown", closeSortOptions);
    return () => document.removeEventListener("pointerdown", closeSortOptions);
  }, []);

  const filterProducts = useMemo(() => {
    let productsCopy = [...products];

    // CATEGORY FILTER
    if (category !== "All-Products") {
      productsCopy = productsCopy.filter((item) => item.category === category);
    }

    // SORT
    switch (sortType) {
      case "newest":
        productsCopy.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
        );
        break;

      case "oldest":
        productsCopy.sort(
          (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
        );
        break;

      case "low-high":
        productsCopy.sort((a, b) => Number(a.price) - Number(b.price));
        break;

      case "high-low":
        productsCopy.sort((a, b) => Number(b.price) - Number(a.price));
        break;

      default:
        break;
    }

    return productsCopy;
  }, [products, category, sortType]);

  const categories = [
    "All-Products",
    "Fruits",
    "Vegetables",
    "Livestock",
    "Grains",
  ];

  return (
    <main className="min-h-screen bg-(--color-cream) px-5 py-10 sm:px-8 lg:px-12 lg:py-16">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <p className="font-[Poppins] text-sm font-semibold uppercase tracking-[0.18em] text-(--color-success)">
            The market
          </p>
          <h1 className="mt-3 font-[Poppins] text-4xl font-bold text-(--color-pry) sm:text-5xl">
            Good food, close to home.
          </h1>
          <p className="mt-4 text-base leading-7 text-(--color-text)/70">
            Browse fresh produce and essentials from the farmers who grow them.
          </p>
        </div>

        <div className="mt-10 flex flex-col gap-5 border-y border-(--color-border) py-5 lg:flex-row lg:items-center lg:justify-between">
          <button
            type="button"
            onClick={() => setShowFilter(!showFilter)}
            className="inline-flex cursor-pointer items-center gap-2 self-start font-[Poppins] text-sm font-semibold text-(--color-pry) lg:hidden"
          >
            <SlidersHorizontal size={17} /> Filter by category{" "}
            <ChevronDown size={16} className={showFilter ? "rotate-180" : ""} />
          </button>
          <div
            className={`${showFilter ? "flex" : "hidden"} flex-wrap gap-2 lg:flex`}
          >
            {categories.map((item) => (
              <label
                key={item}
                className={`cursor-pointer rounded-full border px-4 py-2 font-[Poppins] text-sm font-semibold transition ${category === item ? "border-(--color-pry) bg-(--color-pry) text-white" : "border-(--color-border) bg-white text-(--color-text) hover:border-(--color-pry)"}`}
              >
                <input
                  type="radio"
                  name="category"
                  value={item}
                  checked={category === item}
                  onChange={toggleCategory}
                  className="sr-only"
                />
                {item === "All-Products" ? "All products" : item}
              </label>
            ))}
          </div>
          <div className="flex items-center gap-3 self-start lg:self-auto">
            <label className="font-[Poppins] text-xs font-semibold tracking-[0.08em] text-(--color-text)/60 uppercase">
              Sort by
            </label>
            <div ref={sortMenuRef} className="relative min-w-52">
              <button
                type="button"
                aria-haspopup="listbox"
                aria-expanded={showSortOptions}
                onClick={() => setShowSortOptions((isOpen) => !isOpen)}
                className="flex w-full cursor-pointer items-center justify-between gap-4 rounded-xl border border-(--color-border) bg-white py-3 pr-4 pl-4 text-left font-[Poppins] text-sm font-semibold text-(--color-pry) shadow-[0_5px_18px_rgba(27,94,32,0.06)] outline-none transition hover:border-(--color-success) focus:border-(--color-success) focus:ring-4 focus:ring-(--color-light-gray)"
              >
                {sortOptions.find((option) => option.value === sortType)?.label}
                <ChevronDown
                  size={17}
                  aria-hidden="true"
                  className={`text-(--color-success) transition-transform ${showSortOptions ? "rotate-180" : ""}`}
                />
              </button>
              {showSortOptions && (
                <div
                  role="listbox"
                  aria-label="Sort products"
                  className="absolute right-0 z-20 mt-2 w-full overflow-hidden rounded-xl border border-(--color-border) bg-white p-1.5 shadow-[0_14px_30px_rgba(27,94,32,0.14)]"
                >
                  {sortOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      role="option"
                      aria-selected={sortType === option.value}
                      onClick={() => {
                        setSortType(option.value);
                        setShowSortOptions(false);
                      }}
                      className={`flex w-full cursor-pointer items-center justify-between rounded-lg px-3 py-2.5 text-left font-[Poppins] text-sm transition ${sortType === option.value ? "bg-(--color-light-gray) font-bold text-(--color-pry)" : "text-(--color-text) hover:bg-(--color-cream)"}`}
                    >
                      {option.label}
                      {sortType === option.value && (
                        <span
                          className="h-2 w-2 rounded-full bg-(--color-success)"
                          aria-hidden="true"
                        />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mb-5 mt-8 flex items-center justify-between">
          <p className="text-sm text-(--color-text)/60">
            {filterProducts.length} products available
          </p>
        </div>
        <div className="grid grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
          {filterProducts.map((item, index) => (
            <ProductItem key={`${item.id}-${index}`} {...item} />
          ))}
        </div>
      </div>
    </main>
  );
}

export default Product;
