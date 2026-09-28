import React from "react";
import {motion} from "motion/react";


const products = [{
    name: "Organic Tomatoes", price: "$6.50", unit: "/kg", image: "/images/fresh produce.jfif", tag: "Fresh Pick", farmer: "Green Valley Farms",
}, {
    name: "Sweet Bell Peppers", price: "$8.20", unit: "/kg", image: "/images/showcase.jfif", tag: "Best Seller", farmer: "Sunrise Harvest",
}, {
    name: "Farm Eggs", price: "$4.90", unit: "/tray", image: "/images/local-farmer.jfif", tag: "Local", farmer: "Hillcrest Poultry",
}, {
    name: "Fresh Lettuce Mix", price: "$5.75", unit: "/bundle", image: "/images/growth.jfif", tag: "New", farmer: "Cedar Greens",
},];

function FreshProduct() {
    return (<section className="bg-[#fbfbf6] py-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mb-12 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
                    <div>
            <span className="inline-flex items-center rounded-full border border-[#D9EFD8] bg-white px-3 py-1 text-[11px] font-semibold tracking-[0.18em] text-[#1B5E20] uppercase">
              Fresh picks
            </span>
                        <h2 className="mt-4 text-3xl font-black tracking-tight text-[#173E1A] sm:text-4xl">
                            Farm-fresh finds for today
                        </h2>
                    </div>

                    <button
                        type="button"
                        className="inline-flex items-center gap-2 self-start rounded-full bg-[#1B5E20] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#154a1a]"
                    >
                        Shop all items
                        <span aria-hidden="true">→</span>
                    </button>
                </div>

                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                    {products.map(({name, price, unit, image, tag, farmer}) => (<motion.article
                            initial={{opacity: 0, y: 100,}}
                            whileInView={{opacity: 1, y: 0, duration: 1, delay: 0.25}}
                            viewport={{once: true}}
                            exit={{opacity: 0}}

                            key={name}
                            className="group overflow-hidden rounded-[28px] border border-[#E4F1E6] bg-white shadow-[0_18px_45px_rgba(27,94,32,0.08)] transition duration-300 hover:-translate-y-2 hover:shadow-[0_25px_60px_rgba(27,94,32,0.12)]"
                        >
                            <div className="relative overflow-hidden">
                                <img
                                    src={image}
                                    alt={name}
                                    className="h-64 w-full object-cover transition duration-500 group-hover:scale-105"
                                />
                                <span className="absolute top-4 left-4 rounded-full bg-[#F9C74F] px-2.5 py-1 text-[10px] font-bold tracking-[0.14em] text-[#173E1A] uppercase">
                  {tag}
                </span>
                            </div>

                            <div className="p-5">
                                <div className="flex items-start justify-between gap-3">
                                    <div>
                                        <h3 className="text-xl font-bold text-[#173E1A]">{name}</h3>
                                        <p className="mt-1 text-xs font-medium tracking-[0.12em] text-[#5B6F61] uppercase">
                                            {farmer}
                                        </p>
                                    </div>
                                    <button
                                        type="button"
                                        aria-label={`Add ${name} to cart`}
                                        className="flex h-10 w-10 items-center justify-center rounded-full bg-[#EAF7EA] text-xl text-[#1B5E20] transition hover:bg-[#DFF1E0]"
                                    >
                                        +
                                    </button>
                                </div>

                                <div className="mt-5 flex items-end justify-between">
                                    <div>
                                        <p className="text-2xl font-black text-[#173E1A]">
                                            {price}
                                        </p>
                                        <p className="text-xs tracking-[0.15em] text-[#5B6F61] uppercase">
                                            {unit}
                                        </p>
                                    </div>

                                    <button
                                        type="button"
                                        className="rounded-full border border-[#1B5E20]/10 bg-[#F7FBF6] px-3 py-2 text-sm font-semibold text-[#1B5E20] transition hover:border-[#1B5E20]/20 hover:bg-[#EEF8EE]"
                                    >
                                        View
                                    </button>
                                </div>
                            </div>
                        </motion.article>))}
                </div>
            </div>
        </section>);
}

export default FreshProduct;
