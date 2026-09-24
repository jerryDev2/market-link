import {useContext, useEffect, useState} from "react";
import {ChevronDown, Leaf} from "lucide-react";
import {ShopContext} from "../context/ShopContext.jsx";
import ProductItem from "../components/ProductItem.jsx";

function Product() {
    const {products} = useContext(ShopContext);

    const [category, setCategory] = useState("All-Products");
    const [showFilter, setShowFilter] = useState(false);
    const [filterProducts, setFilterProducts] = useState([]);
    const [sortType, setSortType] = useState("newest");

    const toggleCategory = (ev) => {
        setCategory(ev.target.value);
    };

    useEffect(() => {
        let productsCopy = [...products];

        // CATEGORY FILTER
        if (category !== "All-Products") {
            productsCopy = productsCopy.filter((item) => item.category === category);
        }

        // SORT
        switch (sortType) {
            case "newest":
                productsCopy.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                break;

            case "oldest":
                productsCopy.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
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

        setFilterProducts(productsCopy);
    }, [products, category, sortType]);

    return (<div
        className={"flex max-w-5xl mx-auto h-screen flex-col gap-1 border-t bgred-900 pt-10 sm:flex-row sm:gap-10"}
    >
        {/* FILTER OPTION */}
        <div className={"min-w-60"}>
            <p
                onClick={() => setShowFilter(!showFilter)}
                className={"my-2 flex cursor-pointer items-center gap-2 text-xl"}
            >
                FILTERS

                <ChevronDown
                    className={`h-3 sm:hidden ${showFilter ? "rotate-90" : ""}`}
                />
            </p>

            {/* CATEGORIES FILTER */}
            <div className={''}>
                <label className="flex cursor-pointer gap-2 ">
                    <input
                        type="radio"
                        name="category"
                        value="All-Products"
                        checked={category === "All-Products"}
                        onChange={toggleCategory}
                        className="hidden"
                    />
                    <span className={category === "All-Products" ? "text-lightBlue" : ""}>
            All
        </span>
                </label>

                <label className="flex cursor-pointer gap-2 border bg-green-950 text-red-600">
                    <input
                        type="radio"
                        name="category"
                        value="Fruits"
                        checked={category === "Fruits"}
                        onChange={toggleCategory}
                        className="hidden"
                    />

                    <Leaf/>

                    <span className={category === "Fruits" ? "text-lightBlue active:bg-green-950 " : ""}>
            Fruits
        </span>
                </label>

                <label className="flex cursor-pointer gap-2">
                    <input
                        type="radio"
                        name="category"
                        value="Vegetables"
                        checked={category === "Vegetables"}
                        onChange={toggleCategory}
                        className="hidden"
                    />
                    <span className={category === "Vegetables" ? "text-lightBlue" : ""}>
            Vegetables
        </span>
                </label>

                <label className="flex cursor-pointer gap-2">
                    <input
                        type="radio"
                        name="category"
                        value="Livestock"
                        checked={category === "Livestock"}
                        onChange={toggleCategory}
                        className="hidden"
                    />
                    <span className={category === "Livestock" ? "text-lightBlue" : ""}>
            Livestock
        </span>
                </label>

                <label className="flex cursor-pointer gap-2">
                    <input
                        type="radio"
                        name="category"
                        value="Grains"
                        checked={category === "Grains"}
                        onChange={toggleCategory}
                        className="hidden"
                    />
                    <span className={category === "Grains" ? "text-lightBlue" : ""}>
            Grains
        </span>
                </label>
            </div>
        </div>

        {/* RIGHT SIDE */}
        <div className={"flex-1 scrollbar-none overflow-y-auto"}>
            <div
                className={"mb-4 flex  justify- text-base sm:text-2xl"}
            >
                {/* PRODUCT SORT */}
                <select
                    value={sortType}
                    onChange={(ev) => setSortType(ev.target.value)}
                    className={"border border-gray-300 py-2 text-sm"}
                >
                    <option value="newest">
                        Sort by: Newest
                    </option>

                    <option value="oldest">
                        Sort by: Oldest
                    </option>

                    <option value="low-high">
                        Sort by: Low to High
                    </option>

                    <option value="high-low">
                        Sort by: High to Low
                    </option>
                </select>
            </div>

            {/* MAP PRODUCTS */}
            <div
                className={"grid grid-cols-2 gap-4 gap-y-6 md:grid-cols-4 lg:grid-cols-4"}
            >
                {filterProducts.map((item) => (<ProductItem
                    key={item.id}
                    name={item.name}
                    id={item.id}
                    price={item.price}
                    image={item.image}

                />))}
            </div>
        </div>
    </div>);
}

export default Product;