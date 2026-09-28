import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_URL || "";

const apiUrl = (path) => `${API_BASE_URL}${path}`;

const navItems = [
  "Overview",
  "Products",
  "Orders",
  "Stock",
  "Reviews",
  "Insights",
  "Profile",
  "Logout",
];

const emptyProduct = {
  name: "",
  description: "",
  category: "",
  price: "",
  quantity: "",
  unit: "",
};

const orderStatuses = [
  "Pending",
  "Accepted",
  "Ready for Pickup",
  "Completed",
  "Cancelled",
];

const getStoredUser = () => {
  try {
    const rawUser = localStorage.getItem("user");

    if (!rawUser) {
      return null;
    }

    return JSON.parse(rawUser);
  } catch (error) {
    console.error("Error reading stored user:", error);
    return null;
  }
};



const getFirstName = (user) => {
  if (!user) {
    return "";
  }

  return (user.firstName || user.firstname || user.first_name || "").trim();
};



const getLastName = (user) => {
  if (!user) {
    return "";
  }

  return (user.lastName || user.lastname || user.last_name || "").trim();
};



const getDisplayName = (user) => {
  if (!user) {
    return "Farmer";
  }

  const firstName = getFirstName(user);
  const lastName = getLastName(user);

  if (firstName || lastName) {
    return `${firstName} ${lastName}`.trim();
  }

  const name = user.name || user.fullName || user.fullname || "";

  if (name) {
    return name;
  }

  if (user.email) {
    return user.email.split("@")[0];
  }

  return "Farmer";
};



const normalizeFarmerProfile = (profile) => {
  if (!profile) {
    return null;
  }

  const nestedUser = profile.user || {};

  const firstName =
    profile.firstName ||
    nestedUser.firstName ||
    nestedUser.firstname ||
    nestedUser.first_name ||
    "";

  const lastName =
    profile.lastName ||
    nestedUser.lastName ||
    nestedUser.lastname ||
    nestedUser.last_name ||
    "";

  return {
    firstName,

    lastName,

    name:
      profile.name ||
      profile.fullName ||
      profile.fullname ||
      nestedUser.name ||
      `${firstName} ${lastName}`.trim(),

    profileImage:
      profile.profileImage ||
      profile.avatar ||
      profile.profileImageUrl ||
      profile.imageUrl ||
      nestedUser.profileImage ||
      nestedUser.avatar ||
      nestedUser.profileImageUrl ||
      nestedUser.imageUrl ||
      "",

    farmName:
      profile.farmName ||
      profile.businessName ||
      profile.stallName ||
      nestedUser.farmName ||
      nestedUser.businessName ||
      nestedUser.stallName ||
      "",

    location:
      profile.location ||
      profile.marketLocation ||
      profile.farmLocation ||
      profile.address ||
      nestedUser.location ||
      nestedUser.marketLocation ||
      "",

    description:
      profile.description ||
      profile.bio ||
      profile.about ||
      nestedUser.description ||
      nestedUser.bio ||
      "",

    phoneNumber:
      profile.phoneNumber ||
      profile.phone ||
      nestedUser.phoneNumber ||
      nestedUser.phone ||
      "",

    email: profile.email || nestedUser.email || "",
  };
};



const buildOverviewCards = (productCount = 0) => [
  {
    label: "Products",
    value: String(productCount),
  },
  {
    label: "Orders",
    value: "0",
  },
  {
    label: "Pending",
    value: "0",
  },
  {
    label: "Revenue",
    value: "₦0",
  },
];



function FarmerDashboard() {
  const navigate = useNavigate();



  const [activeTab, setActiveTab] = useState("Overview");


  const [storedUser, setStoredUser] = useState(() => getStoredUser());



  const [products, setProducts] = useState([]);

  const [showProductForm, setShowProductForm] = useState(false);

  const [product, setProduct] = useState(emptyProduct);

  const [image, setImage] = useState(null);

  const [imagePreview, setImagePreview] = useState("");

  const [loading, setLoading] = useState(false);

 

  const [farmerProfile, setFarmerProfile] = useState(null);

  const [isEditingProfile, setIsEditingProfile] = useState(false);

  const [profileImageFile, setProfileImageFile] = useState(null);

  const [profileImagePreview, setProfileImagePreview] = useState("");

  const [profileForm, setProfileForm] = useState({
    profileImage: "",
    farmName: "",
    location: "",
    description: "",
    phoneNumber: "",
    email: "",
  });



  const user = storedUser;

  const normalizedUser = normalizeFarmerProfile(user);

  const normalizedProfile = normalizeFarmerProfile(farmerProfile);



  const firstName = normalizedProfile?.firstName || getFirstName(user) || "";

  const lastName = normalizedProfile?.lastName || getLastName(user) || "";

  const farmerName =
    `${firstName} ${lastName}`.trim() ||
    getDisplayName(normalizedProfile || user);

  const farmerEmail = normalizedProfile?.email || user?.email || "";

  const farmName =
    normalizedProfile?.farmName ||
    user?.farmName ||
    user?.businessName ||
    user?.stallName ||
    "";


  const getFarmerProfile = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        console.warn("No JWT token found.");

        return null;
      }

      const response = await fetch(apiUrl("/api/farmer-profile/me"), {
        method: "GET",

        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 401 || response.status === 403) {
        console.error("JWT expired or unauthorized.");

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        window.dispatchEvent(new Event("auth-change"));

        navigate("/");

        return null;
      }

      if (!response.ok) {
        const errorText = await response.text();

        console.error("Farmer profile error:", errorText);

        throw new Error("Failed to fetch farmer profile");
      }

      const data = await response.json();

      console.log("Raw farmer profile:", data);

      const normalized = normalizeFarmerProfile(data);

      setFarmerProfile(normalized);

    
      if (normalized?.firstName || normalized?.lastName) {
        const updatedUser = {
          ...user,

          firstName: normalized.firstName || getFirstName(user),

          lastName: normalized.lastName || getLastName(user),

          profileImage: normalized.profileImage || user?.profileImage || "",
        };

        localStorage.setItem("user", JSON.stringify(updatedUser));

        setStoredUser(updatedUser);
      }

      return normalized;
    } catch (error) {
      console.error("Error fetching farmer profile:", error);

      return null;
    }
  };



  const loadProducts = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.warn("No token found when loading products.");

      return;
    }

    try {
      const response = await fetch(apiUrl("/api/product/my-products"), {
        method: "GET",

        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 401 || response.status === 403) {
        console.error("Unauthorized while loading products.");

        return;
      }

      if (!response.ok) {
        throw new Error("Failed to load products");
      }

      const payload = await response.json();

      const productList = Array.isArray(payload)
        ? payload
        : payload.products || payload.data || [];

      const normalizedProducts = productList.map((item) => ({
        id: item.productId || item.id || Math.random().toString(36).slice(2),

        image:
          item.imageUrl ||
          item.image ||
          item.productImage ||
          item.image_path ||
          item.photo ||
          "",

        name: item.name || "Unnamed product",

        description: item.description || "No description provided.",

        category: item.category || "Uncategorized",

        price: item.price ?? 0,

        unit: item.unit || "unit",

        quantity: item.quantity ?? 0,
      }));

      setProducts(normalizedProducts);

      console.log("Products loaded:", normalizedProducts);
    } catch (error) {
      console.error("Product fetch error:", error);

      setProducts([]);
    }
  };



  useEffect(() => {
    loadProducts();
    getFarmerProfile();
  }, []);

  

  const handleChange = (event) => {
    const { name, value } = event.target;

    setProduct((previous) => ({
      ...previous,
      [name]: value,
    }));
  };



  const handleImageChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setImage(file);

    /*
     * Revoke old preview first.
     */
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }

    const preview = URL.createObjectURL(file);

    setImagePreview(preview);
  };



  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

 

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!image) {
      toast.error("Please select a product image before saving.");

      return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Please sign in again to continue.");

      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("name", product.name);

      formData.append("description", product.description);

      formData.append("category", product.category);

      formData.append("price", product.price);

      formData.append("quantity", product.quantity);

      formData.append("unit", product.unit);

      formData.append("image", image);

      const response = await fetch(apiUrl("/api/product"), {
        method: "POST",

        headers: {
          Authorization: `Bearer ${token}`,
        },

        body: formData,
      });

      if (response.status === 401 || response.status === 403) {
        toast.error("Your session has expired. Please sign in again.");

        handleLogout();

        return;
      }

      if (!response.ok) {
        const errorText = await response.text();

        console.error("Backend error:", errorText);

        throw new Error("Failed to add product");
      }

      const savedProduct = await response.json();

      console.log("Product saved:", savedProduct);

      await loadProducts();

      closeProductForm();

      toast.success("Product added successfully.");
    } catch (error) {
      console.error("Error adding product:", error);

      toast.error(
        error.message || "Something went wrong while adding your product.",
      );
    } finally {
      setLoading(false);
    }
  };


  const closeProductForm = () => {
    setShowProductForm(false);

    setProduct(emptyProduct);

    setImage(null);

    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }

    setImagePreview("");
  };

 

  useEffect(() => {
    const source = normalizedProfile || normalizedUser || {};

    setProfileForm({
      profileImage: source.profileImage || "",

      farmName: source.farmName || "",

      location: source.location || "",

      description: source.description || "",

      phoneNumber: source.phoneNumber || "",

      email: source.email || user?.email || "",
    });

    /*
     * Backend image is a real URL.
     * We only use this as the preview when
     * there is no newly selected file.
     */
    setProfileImagePreview(source.profileImage || "");
  }, [farmerProfile, storedUser]);

 

  const handleProfileFormChange = (event) => {
    const { name, value } = event.target;

    setProfileForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

 

  const handleProfileImageUpload = (event) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setProfileImageFile(file);

    /*
     * Remove previous temporary preview.
     */
    if (profileImagePreview && profileImagePreview.startsWith("blob:")) {
      URL.revokeObjectURL(profileImagePreview);
    }

    const preview = URL.createObjectURL(file);

    setProfileImagePreview(preview);
  };

 

  useEffect(() => {
    return () => {
      if (profileImagePreview && profileImagePreview.startsWith("blob:")) {
        URL.revokeObjectURL(profileImagePreview);
      }
    };
  }, [profileImagePreview]);


 const saveFarmerProfile = async () => {
   const token = localStorage.getItem("token");

   if (!token) {
     alert("Please login first.");
     return;
   }

   try {
     setLoading(true);

     const formData = new FormData();

     formData.append("farmName", profileForm.farmName || "");
     formData.append("location", profileForm.location || "");
     formData.append("description", profileForm.description || "");
     formData.append("phoneNumber", profileForm.phoneNumber || "");

     /*
      * Only append image when the farmer
      * actually selected a new image.
      */
     if (profileImageFile) {
       formData.append("profileImage", profileImageFile);
     }

     const response = await fetch(apiUrl("/api/farmer-profile/me"), {
       method: "PUT",

       headers: {
         Authorization: `Bearer ${token}`,
       },

       body: formData,
     });

     if (response.status === 401 || response.status === 403) {
       localStorage.removeItem("token");
       localStorage.removeItem("user");

       window.dispatchEvent(new Event("auth-change"));

       navigate("/");

       return;
     }

     if (!response.ok) {
       const errorText = await response.text();

       console.error("Profile update error:", errorText);

       throw new Error("Failed to update farmer profile");
     }

     const savedProfile = await response.json();

     console.log("PROFILE SAVED:", savedProfile);

     /*
      * The response now contains:
      *
      * firstName
      * lastName
      * email
      * phoneNumber
      * farmName
      * location
      * description
      * profileImage
      *
      * profileImage should now be a Cloudinary URL.
      */

     setFarmerProfile(savedProfile);

     /*
      * Update localStorage user.
      */
     const currentUser = getStoredUser() || {};

     const updatedUser = {
       ...currentUser,

       firstName: savedProfile.firstName || currentUser.firstName,

       lastName: savedProfile.lastName || currentUser.lastName,

       email: savedProfile.email || currentUser.email,

       phoneNumber: savedProfile.phoneNumber || currentUser.phoneNumber,

       farmName: savedProfile.farmName,

       location: savedProfile.location,

       description: savedProfile.description,

       profileImage: savedProfile.profileImage,
     };

     localStorage.setItem("user", JSON.stringify(updatedUser));

     setStoredUser(updatedUser);

     /*
      * Remove the temporary browser file.
      */
     setProfileImageFile(null);

     /*
      * Use the REAL Cloudinary URL.
      */
     setProfileForm((prev) => ({
       ...prev,

       profileImage: savedProfile.profileImage || "",

       farmName: savedProfile.farmName || "",

       location: savedProfile.location || "",

       description: savedProfile.description || "",

       phoneNumber: savedProfile.phoneNumber || "",

       email: savedProfile.email || "",
     }));

     setIsEditingProfile(false);

     alert("Profile updated successfully!");
   } catch (error) {
     console.error("Error saving farmer profile:", error);

     alert(error.message);
   } finally {
     setLoading(false);
   }
 };

  const handleLogout = () => {
    localStorage.removeItem("token");

    localStorage.removeItem("user");

    window.dispatchEvent(new Event("auth-change"));

    navigate("/");
  };



  const handleProfileClick = async () => {
    await getFarmerProfile();

    setActiveTab("Profile");
  };



  const stockItemsList = products.map((item) => ({
    name: item.name,

    qty: `${item.quantity} ${item.unit}`,
  }));



  const overviewCards = useMemo(
    () => buildOverviewCards(products.length),
    [products.length],
  );



  const headerLabel = useMemo(() => {
    switch (activeTab) {
      case "Products":
        return "My Products";

      case "Orders":
        return "Orders";

      case "Stock":
        return "Weekly Stock";

      case "Reviews":
        return "Customer Reviews";

      case "Insights":
        return "Sales Overview";

      case "Profile":
        return "Farmer Profile";

      case "Overview":
      default:
        return "Overview";
    }
  }, [activeTab]);



  const renderOverview = () => (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-[#4A5E4F]">
          Welcome,{" "}
          <span className="font-semibold text-[#1B5E20]">{farmerName}</span> 👋
        </p>

        <h2 className="mt-2 text-3xl font-bold text-[#173E1A]">Overview</h2>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {overviewCards.map((card) => (
          <div
            key={card.label}
            className="rounded-[20px] border border-[#E7F1E8] bg-white p-5 shadow-[0_12px_28px_rgba(27,94,32,0.06)]"
          >
            <p className="text-sm text-[#4A5E4F]">{card.label}</p>

            <p className="mt-2 text-3xl font-bold text-[#173E1A]">
              {card.value}
            </p>
          </div>
        ))}
      </div>

      <div className="rounded-[22px] border border-[#E7F1E8] bg-white p-5 shadow-[0_12px_28px_rgba(27,94,32,0.06)]">
        <h3 className="mb-3 text-xl font-bold text-[#173E1A]">Recent Orders</h3>

        <p className="text-sm text-[#4A5E4F]">No recent orders yet.</p>
      </div>

      <div className="rounded-[22px] border border-[#E7F1E8] bg-white p-5 shadow-[0_12px_28px_rgba(27,94,32,0.06)]">
        <p className="text-sm text-[#4A5E4F]">Farm</p>

        <p className="mt-2 text-2xl font-bold text-[#173E1A]">
          {farmName || "My Farm"}
        </p>
      </div>
    </div>
  );


  const renderProducts = () => (
    <div className="space-y-5">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-3xl font-bold text-[#173E1A]">My Products</h2>

        <button
          onClick={() => setShowProductForm(true)}
          className="rounded-xl bg-[#1B5E20] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#154a1a]"
        >
          + Add Product
        </button>
      </div>

      {showProductForm && (
        <form
          onSubmit={handleSubmit}
          className="rounded-[22px] border border-[#E7F1E8] bg-white p-5 shadow-[0_12px_28px_rgba(27,94,32,0.06)]"
        >
          <h3 className="mb-4 text-xl font-bold text-[#173E1A]">Add Product</h3>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-[#2F443B]">
                Product name
              </label>

              <input
                type="text"
                name="name"
                value={product.name}
                onChange={handleChange}
                placeholder="Tomatoes"
                className="w-full rounded-xl border border-[#E7F1E8] bg-[#F9FBF8] px-3.5 py-3 text-sm text-[#173E1A] outline-none focus:border-[#2E7D32]"
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-[#2F443B]">
                Category
              </label>

              <input
                type="text"
                name="category"
                value={product.category}
                onChange={handleChange}
                placeholder="Vegetables"
                className="w-full rounded-xl border border-[#E7F1E8] bg-[#F9FBF8] px-3.5 py-3 text-sm text-[#173E1A] outline-none focus:border-[#2E7D32]"
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-[#2F443B]">
                Price
              </label>

              <input
                type="number"
                name="price"
                value={product.price}
                onChange={handleChange}
                min="0"
                placeholder="0"
                className="w-full rounded-xl border border-[#E7F1E8] bg-[#F9FBF8] px-3.5 py-3 text-sm text-[#173E1A] outline-none focus:border-[#2E7D32]"
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-[#2F443B]">
                Quantity
              </label>

              <input
                type="number"
                name="quantity"
                value={product.quantity}
                onChange={handleChange}
                min="0"
                placeholder="0"
                className="w-full rounded-xl border border-[#E7F1E8] bg-[#F9FBF8] px-3.5 py-3 text-sm text-[#173E1A] outline-none focus:border-[#2E7D32]"
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-[#2F443B]">
                Unit
              </label>

              <input
                type="text"
                name="unit"
                value={product.unit}
                onChange={handleChange}
                placeholder="kg, bunch, crate"
                className="w-full rounded-xl border border-[#E7F1E8] bg-[#F9FBF8] px-3.5 py-3 text-sm text-[#173E1A] outline-none focus:border-[#2E7D32]"
                required
              />
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-[#2F443B]">
                Description
              </label>

              <textarea
                rows="3"
                name="description"
                value={product.description}
                onChange={handleChange}
                placeholder="Freshly harvested tomatoes"
                className="w-full rounded-xl border border-[#E7F1E8] bg-[#F9FBF8] px-3.5 py-3 text-sm text-[#173E1A] outline-none focus:border-[#2E7D32]"
                required
              />
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-[#2F443B]">
                Product image
              </label>

              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full rounded-xl border border-[#E7F1E8] p-2 text-sm"
                required
              />

              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt={product.name || "Product preview"}
                  className="mt-4 h-52 w-full rounded-xl object-cover"
                />
              ) : (
                <div className="mt-4 flex h-52 items-center justify-center rounded-xl bg-[#F3F8F3] text-sm text-[#4A5E4F]">
                  Image preview will appear here
                </div>
              )}
            </div>
          </div>

          <div className="mt-5 flex justify-end gap-3">
            <button
              type="button"
              onClick={closeProductForm}
              className="rounded-xl border border-[#1B5E20] bg-white px-4 py-2.5 text-sm font-semibold text-[#1B5E20]"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="rounded-xl bg-[#F9C74F] px-4 py-2.5 text-sm font-semibold text-[#173E1A]"
            >
              {loading ? "Adding..." : "Add Product"}
            </button>
          </div>
        </form>
      )}

      {products.length === 0 ? (
        <div className="rounded-[22px] border border-[#E7F1E8] bg-white p-5">
          <p className="text-sm text-[#4A5E4F]">No products added yet.</p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {products.map((item) => (
            <div
              key={item.id}
              className="overflow-hidden rounded-[22px] border border-[#E7F1E8] bg-white shadow-sm"
            >
              {item.image ? (
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-52 w-full object-cover"
                />
              ) : (
                <div className="flex h-52 items-center justify-center bg-[#F3F8F3] text-sm text-[#4A5E4F]">
                  No image
                </div>
              )}

              <div className="space-y-3 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-bold text-[#173E1A]">
                      {item.name}
                    </h3>

                    <p className="text-xs font-medium uppercase text-[#1B5E20]">
                      {item.category}
                    </p>
                  </div>

                  <span className="rounded-full bg-[#E8F5E9] px-2.5 py-1 text-xs font-semibold text-[#1B5E20]">
                    {item.quantity} {item.unit}
                  </span>
                </div>

                <p className="text-sm text-[#3E5243]">{item.description}</p>

                <div className="flex items-center justify-between border-t border-[#EDF4EE] pt-3">
                  <span className="text-sm text-[#4A5E4F]">Price</span>

                  <span className="font-bold text-[#173E1A]">
                    ₦{Number(item.price).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  /*
  |--------------------------------------------------------------------------
  | ORDERS
  |--------------------------------------------------------------------------
  */

  const renderOrders = () => (
    <div className="space-y-5">
      <h2 className="text-3xl font-bold text-[#173E1A]">Orders</h2>

      <div className="flex flex-wrap gap-2">
        {orderStatuses.map((status) => (
          <button
            key={status}
            className="rounded-full bg-[#EAF3EB] px-4 py-2 text-sm font-semibold text-[#1B5E20]"
          >
            {status}
          </button>
        ))}
      </div>

      <div className="rounded-[22px] border border-[#E7F1E8] bg-white p-5">
        <h3 className="text-xl font-bold text-[#173E1A]">No orders yet</h3>

        <p className="mt-3 text-sm text-[#4A5E4F]">
          Customer orders will appear here.
        </p>
      </div>
    </div>
  );

  /*
  |--------------------------------------------------------------------------
  | STOCK
  |--------------------------------------------------------------------------
  */

  const renderStock = () => (
    <div className="space-y-5">
      <h2 className="text-3xl font-bold text-[#173E1A]">Weekly Stock</h2>

      <div className="rounded-[22px] border border-[#E7F1E8] bg-white p-5">
        {stockItemsList.length === 0 ? (
          <p className="text-sm text-[#4A5E4F]">No stock yet.</p>
        ) : (
          <div className="space-y-3">
            {stockItemsList.map((item) => (
              <div
                key={item.name}
                className="flex items-center justify-between rounded-xl bg-[#F7F9F3] px-4 py-3"
              >
                <span className="font-medium text-[#173E1A]">{item.name}</span>

                <span className="text-[#3E5243]">{item.qty}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  /*
  |--------------------------------------------------------------------------
  | REVIEWS
  |--------------------------------------------------------------------------
  */

  const renderReviews = () => (
    <div className="space-y-5">
      <h2 className="text-3xl font-bold text-[#173E1A]">Customer Reviews</h2>

      <div className="rounded-[22px] border border-[#E7F1E8] bg-white p-5">
        <p className="text-sm text-[#4A5E4F]">
          Customer reviews will appear here.
        </p>
      </div>
    </div>
  );

  /*
  |--------------------------------------------------------------------------
  | INSIGHTS
  |--------------------------------------------------------------------------
  */

  const renderInsights = () => (
    <div className="space-y-5">
      <h2 className="text-3xl font-bold text-[#173E1A]">Sales Overview</h2>

      <div className="grid gap-4 sm:grid-cols-3">
        {[
          ["Total Orders", "0"],
          ["Completed Orders", "0"],
          ["Revenue", "₦0"],
        ].map(([label, value]) => (
          <div
            key={label}
            className="rounded-[20px] border border-[#E7F1E8] bg-white p-5"
          >
            <p className="text-sm text-[#4A5E4F]">{label}</p>

            <p className="mt-2 text-3xl font-bold text-[#173E1A]">{value}</p>
          </div>
        ))}
      </div>
    </div>
  );

  /*
  |--------------------------------------------------------------------------
  | PROFILE
  |--------------------------------------------------------------------------
  */

  const renderProfile = () => {
    const currentProfileImage =
      profileImagePreview ||
      profileForm.profileImage ||
      normalizedProfile?.profileImage ||
      user?.profileImage ||
      "";

    return (
      <div className="space-y-5">
        {/* PROFILE HEADER */}

        <div className="rounded-[22px] border border-[#E7F1E8] bg-white p-5 shadow-sm">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              {currentProfileImage ? (
                <img
                  src={currentProfileImage}
                  alt={farmerName}
                  className="h-20 w-20 rounded-full border-4 border-[#EAF3EB] object-cover"
                />
              ) : (
                <div className="flex h-20 w-20 items-center justify-center rounded-full border-4 border-[#EAF3EB] bg-[#F3F8F3] text-2xl font-bold text-[#1B5E20]">
                  {firstName?.charAt(0).toUpperCase() || "F"}
                </div>
              )}

              <div>
                <p className="text-sm text-[#4A5E4F]">Farmer profile</p>

                {/* FIRST NAME + LAST NAME */}

                <h2 className="mt-2 text-3xl font-bold text-[#173E1A]">
                  {farmerName}
                </h2>

                <p className="mt-1 text-sm text-[#4A5E4F]">{farmerEmail}</p>
              </div>
            </div>

            <div className="rounded-2xl bg-[#EAF3EB] px-4 py-2 text-sm font-semibold text-[#1B5E20]">
              {farmName || "My Farm"}
            </div>
          </div>
        </div>

        {!isEditingProfile ? (
          <>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-[20px] border border-[#E7F1E8] bg-white p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#1B5E20]">
                  First name
                </p>

                <p className="mt-3 font-medium text-[#263238]">
                  {firstName || "Not provided"}
                </p>
              </div>

              <div className="rounded-[20px] border border-[#E7F1E8] bg-white p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#1B5E20]">
                  Last name
                </p>

                <p className="mt-3 font-medium text-[#263238]">
                  {lastName || "Not provided"}
                </p>
              </div>

              <div className="rounded-[20px] border border-[#E7F1E8] bg-white p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#1B5E20]">
                  Farm name
                </p>

                <p className="mt-3 font-medium text-[#263238]">
                  {profileForm.farmName || "Not provided"}
                </p>
              </div>

              <div className="rounded-[20px] border border-[#E7F1E8] bg-white p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#1B5E20]">
                  Location
                </p>

                <p className="mt-3 font-medium text-[#263238]">
                  {profileForm.location || "Not provided"}
                </p>
              </div>

              <div className="rounded-[20px] border border-[#E7F1E8] bg-white p-5 md:col-span-2">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#1B5E20]">
                  Description
                </p>

                <p className="mt-3 font-medium text-[#263238]">
                  {profileForm.description || "No description yet."}
                </p>
              </div>

              <div className="rounded-[20px] border border-[#E7F1E8] bg-white p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#1B5E20]">
                  Phone
                </p>

                <p className="mt-3 font-medium text-[#263238]">
                  {profileForm.phoneNumber || "Not provided"}
                </p>
              </div>

              <div className="rounded-[20px] border border-[#E7F1E8] bg-white p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#1B5E20]">
                  Email
                </p>

                <p className="mt-3 font-medium text-[#263238]">
                  {profileForm.email || farmerEmail || "Not provided"}
                </p>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setIsEditingProfile(true)}
                className="rounded-xl bg-[#1B5E20] px-4 py-2.5 text-sm font-semibold text-white"
              >
                Edit profile
              </button>
            </div>
          </>
        ) : (
          <form
            onSubmit={(event) => {
              event.preventDefault();

              saveFarmerProfile();
            }}
            className="rounded-[22px] border border-[#E7F1E8] bg-white p-5 shadow-sm"
          >
            {/* PROFILE IMAGE */}

            <div className="mb-6 flex justify-center">
              <label className="relative flex h-28 w-28 cursor-pointer items-center justify-center overflow-hidden rounded-full border-4 border-[#EAF3EB] bg-[#F3F8F3]">
                {profileImagePreview ? (
                  <img
                    src={profileImagePreview}
                    alt="Profile preview"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="text-3xl font-bold text-[#1B5E20]">
                    {firstName?.charAt(0).toUpperCase() || "+"}
                  </span>
                )}

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleProfileImageUpload}
                  className="hidden"
                />

                <span className="absolute bottom-0 right-0 rounded-full bg-[#1B5E20] px-2 py-1 text-[10px] font-semibold text-white">
                  Change
                </span>
              </label>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {/* FIRST NAME */}

              <div>
                <label className="mb-2 block text-sm font-medium text-[#2F443B]">
                  First name
                </label>

                <input
                  type="text"
                  value={firstName}
                  disabled
                  className="w-full cursor-not-allowed rounded-xl border border-[#E7F1E8] bg-[#EEF3EE] px-3.5 py-3 text-sm text-[#173E1A]"
                />
              </div>

              {/* LAST NAME */}

              <div>
                <label className="mb-2 block text-sm font-medium text-[#2F443B]">
                  Last name
                </label>

                <input
                  type="text"
                  value={lastName}
                  disabled
                  className="w-full cursor-not-allowed rounded-xl border border-[#E7F1E8] bg-[#EEF3EE] px-3.5 py-3 text-sm text-[#173E1A]"
                />
              </div>

              {/* FARM NAME */}

              <div>
                <label className="mb-2 block text-sm font-medium text-[#2F443B]">
                  Farm name
                </label>

                <input
                  type="text"
                  name="farmName"
                  value={profileForm.farmName}
                  onChange={handleProfileFormChange}
                  className="w-full rounded-xl border border-[#E7F1E8] bg-[#F9FBF8] px-3.5 py-3 text-sm text-[#173E1A] outline-none focus:border-[#2E7D32]"
                />
              </div>

              {/* LOCATION */}

              <div>
                <label className="mb-2 block text-sm font-medium text-[#2F443B]">
                  Location
                </label>

                <input
                  type="text"
                  name="location"
                  value={profileForm.location}
                  onChange={handleProfileFormChange}
                  className="w-full rounded-xl border border-[#E7F1E8] bg-[#F9FBF8] px-3.5 py-3 text-sm text-[#173E1A] outline-none focus:border-[#2E7D32]"
                />
              </div>

              {/* DESCRIPTION */}

              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-medium text-[#2F443B]">
                  Description
                </label>

                <textarea
                  rows="4"
                  name="description"
                  value={profileForm.description}
                  onChange={handleProfileFormChange}
                  placeholder="Tell customers about your farm..."
                  className="w-full rounded-xl border border-[#E7F1E8] bg-[#F9FBF8] px-3.5 py-3 text-sm text-[#173E1A] outline-none focus:border-[#2E7D32]"
                />
              </div>

              {/* PHONE */}

              <div>
                <label className="mb-2 block text-sm font-medium text-[#2F443B]">
                  Phone number
                </label>

                <input
                  type="text"
                  name="phoneNumber"
                  value={profileForm.phoneNumber}
                  onChange={handleProfileFormChange}
                  className="w-full rounded-xl border border-[#E7F1E8] bg-[#F9FBF8] px-3.5 py-3 text-sm text-[#173E1A] outline-none focus:border-[#2E7D32]"
                />
              </div>

              {/* EMAIL */}

              <div>
                <label className="mb-2 block text-sm font-medium text-[#2F443B]">
                  Email
                </label>

                <input
                  type="email"
                  name="email"
                  value={profileForm.email}
                  onChange={handleProfileFormChange}
                  className="w-full rounded-xl border border-[#E7F1E8] bg-[#F9FBF8] px-3.5 py-3 text-sm text-[#173E1A] outline-none focus:border-[#2E7D32]"
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => {
                  setIsEditingProfile(false);

                  setProfileImageFile(null);

                  setProfileImagePreview(profileForm.profileImage || "");
                }}
                className="rounded-xl border border-[#1B5E20] bg-white px-4 py-2.5 text-sm font-semibold text-[#1B5E20]"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="rounded-xl bg-[#1B5E20] px-4 py-2.5 text-sm font-semibold text-white"
              >
                Save changes
              </button>
            </div>
          </form>
        )}
      </div>
    );
  };

  /*
  |--------------------------------------------------------------------------
  | TAB CONTENT
  |--------------------------------------------------------------------------
  */

  const renderTabContent = () => {
    switch (activeTab) {
      case "Products":
        return renderProducts();

      case "Orders":
        return renderOrders();

      case "Stock":
        return renderStock();

      case "Reviews":
        return renderReviews();

      case "Insights":
        return renderInsights();

      case "Profile":
        return renderProfile();

      case "Overview":
      default:
        return renderOverview();
    }
  };

  /*
  |--------------------------------------------------------------------------
  | MAIN UI
  |--------------------------------------------------------------------------
  */

  return (
    <>
      <Toaster position="top-right" richColors closeButton theme="light" />

      <div className="min-h-screen w-full bg-[#F5F8F4]">
        <div className="min-h-screen w-full bg-[#121E15]">
          <div className="flex min-h-screen w-full flex-col lg:flex-row">
            {/* SIDEBAR */}

            <aside className="w-full border-b border-[#1F3324] bg-[#0F1D12] p-5 text-[#E9F5EA] lg:min-h-screen lg:w-72 lg:border-b-0 lg:border-r">
              <div className="flex items-center gap-3 pb-5">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#F9C74F] text-sm font-black text-[#173E1A]">
                  M
                </div>

                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#A5D6A7]">
                    MarketLink
                  </p>
                </div>
              </div>

              <nav className="space-y-2">
                {navItems.map((item) => {
                  const active = item === activeTab;

                  return (
                    <button
                      key={item}
                      onClick={() => {
                        if (item === "Logout") {
                          handleLogout();

                          return;
                        }

                        if (item === "Products") {
                          loadProducts();

                          setActiveTab("Products");

                          return;
                        }

                        if (item === "Profile") {
                          handleProfileClick();

                          return;
                        }

                        setActiveTab(item);
                      }}
                      className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm font-medium transition ${
                        active
                          ? "bg-[#1B5E20] text-white"
                          : "text-[#D8E7DB] hover:bg-[#163A1F] hover:text-white"
                      }`}
                    >
                      <span>{item}</span>

                      <span
                        className={`h-2 w-2 rounded-full ${
                          active ? "bg-[#F9C74F]" : "bg-transparent"
                        }`}
                      />
                    </button>
                  );
                })}
              </nav>
            </aside>

            {/* MAIN */}

            <main className="flex-1 overflow-y-auto bg-[#F7F9F3] p-5 sm:p-6 lg:p-8">
              <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#1B5E20]">
                    Farmer Dashboard
                  </p>

                  <h1 className="mt-2 text-3xl font-bold text-[#173E1A] sm:text-4xl">
                    {headerLabel}
                  </h1>

                  {/* USER NAME */}

                  <p className="mt-1 text-sm text-[#4A5E4F]">{farmerName}</p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => setActiveTab("Overview")}
                    className="rounded-xl border border-[#1B5E20] bg-white px-4 py-2.5 text-sm font-semibold text-[#1B5E20]"
                  >
                    Overview
                  </button>

                  <button
                    onClick={handleProfileClick}
                    className="rounded-xl border border-[#1B5E20] bg-transparent px-4 py-2.5 text-sm font-semibold text-[#1B5E20]"
                  >
                    Profile
                  </button>

                  <button
                    onClick={() => {
                      setShowProductForm(true);

                      setActiveTab("Products");
                    }}
                    className="rounded-xl bg-[#1B5E20] px-4 py-2.5 text-sm font-semibold text-white"
                  >
                    Add Product
                  </button>
                </div>
              </div>

              {renderTabContent()}
            </main>
          </div>
        </div>
      </div>
    </>
  );
}

export default FarmerDashboard;
