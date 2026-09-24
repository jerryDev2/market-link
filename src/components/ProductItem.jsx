import { useContext, useState } from "react";
import { X } from "lucide-react";
import { ShopContext } from "../context/ShopContext.jsx";

const ProductItem = ({ id, image, name, price }) => {
    const { currency } = useContext(ShopContext);
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <div
                onClick={() => setShowModal(true)}
                className="cursor-pointer"
            >
                <div className="overflow-hidden">
                    <img
                        className="w-full transition duration-300 ease-in-out hover:scale-110 h-50 object-contain"
                        src={image[0]}
                        alt={name}
                    />
                </div>

                <p className="pt-3 pb-1 text-small">
                    {name}
                </p>

                <p className="text-sm font-medium">
                    {currency}{price}/kg
                </p>
            </div>

            {/*SECTION FOR THE MODAL*/}


            {showModal && (
                <div
                    onClick={() => setShowModal(false)}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm"
                >
                    <div
                        onClick={(ev) => ev.stopPropagation()}
                        className="relative w-full max-w-2xl rounded-xl bg-white p-6 shadow-xl"
                    >
                        <button
                            onClick={() => setShowModal(false)}
                            className="absolute right-4 top-4 cursor-pointer rounded-full p-2 transition hover:bg-gray-100"
                        >
                            <X size={20} />
                        </button>

                        <div className="grid gap-6 sm:grid-cols-2">
                            <div className="overflow-hidden rounded-lg">
                                <img
                                    src={image[0]}
                                    alt={name}
                                    className="h-full w-full object-cover"
                                />
                            </div>

                            <div className="flex flex-col justify-center">
                                <h2 className="mb-3 text-2xl font-medium">
                                    {name}
                                </h2>

                                <p className="mb-4 text-lg font-medium">
                                    {currency}{price}/kg
                                </p>

                                <p className="text-sm leading-6 text-gray-500">
                                    Fresh {name.toLowerCase()} available
                                    for purchase. Select the quantity you
                                    need and add it to your cart.
                                </p>

                                <button
                                    className="mt-6 w-full rounded-md bg-darkBlue px-5 py-3 text-sm text-text transition hover:opacity-90 border "
                                >
                                    Add to Cart
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

