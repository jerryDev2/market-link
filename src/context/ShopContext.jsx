import { createContext, useEffect, useState } from "react";

export const ShopContext = createContext();

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

const apiUrl = (path) => `${API_BASE_URL}${path}`;

const normalizeProduct = (item) => ({
  id: item.productId || item.id || String(Math.random()),
  name: item.name || "Unnamed product",
  price: Number(item.price ?? 0),
  category: item.category || "Uncategorized",
  description: item.description || "Fresh local produce.",
  image: item.imageUrl || item.image || item.productImage || item.photo || "",
  quantity: Number(item.quantity ?? 0),
  unit: item.unit || "unit",
  createdAt: item.createdAt || new Date().toISOString(),
});

const ShopContextProvider = ({ children }) => {
  const currency = "₦";
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(apiUrl("/api/product"), {
          headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await response.json();
        const payload = Array.isArray(data)
          ? data
          : data.products || data.data || [];
        setProducts(payload.map(normalizeProduct));
      } catch (error) {
        console.error("Shop products error:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const value = {
    products,
    currency,
    loading,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export default ShopContextProvider;
