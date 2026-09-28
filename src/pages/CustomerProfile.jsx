import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const getStoredUser = () => {
  try {
    const rawUser = localStorage.getItem("user");
    return rawUser ? JSON.parse(rawUser) : null;
  } catch (error) {
    return null;
  }
};

const getDisplayName = (user) => {
  if (!user) return "Customer";

  const firstName = user.firstName || user.firstname || "";
  const lastName = user.lastName || user.lastname || "";
  const fullName = user.name || user.fullName || user.fullname || "";

  if (firstName || lastName) {
    return `${firstName} ${lastName}`.trim() || "Customer";
  }

  if (fullName) {
    return fullName;
  }

  if (user.email) {
    return user.email.split("@")[0];
  }

  return "Customer";
};

function CustomerProfile() {
  const navigate = useNavigate();
  const initialUser = getStoredUser();
  const [user, setUser] = useState(initialUser || {});
  const [isEditing, setIsEditing] = useState(false);

  const displayName = getDisplayName(user);

  const [formData, setFormData] = useState({
    firstName: user?.firstName || user?.firstname || "",
    lastName: user?.lastName || user?.lastname || "",
    phoneNumber: user?.phoneNumber || user?.phone || "",
    email: user?.email || "",
    address: user?.address || user?.deliveryAddress || "",
    preferredPickup: user?.preferredPickup || user?.pickupTime || "",
    favoriteCategory: user?.favoriteCategory || "",
  });

  const profileInfo = [
    { label: "Full Name", value: displayName },
    {
      label: "Phone Number",
      value: user?.phoneNumber || user?.phone || "Not provided",
    },
    { label: "Email Address", value: user?.email || "Not provided" },
    {
      label: "Delivery Address",
      value: user?.address || user?.deliveryAddress || "Not provided",
    },
    {
      label: "Preferred Pickup",
      value: user?.preferredPickup || user?.pickupTime || "Not provided",
    },
    {
      label: "Favorite Category",
      value: user?.favoriteCategory || "Not provided",
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.dispatchEvent(new Event("auth-change"));
    navigate("/");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    const updatedUser = {
      ...user,
      firstName: formData.firstName,
      lastName: formData.lastName,
      phoneNumber: formData.phoneNumber,
      email: formData.email,
      address: formData.address,
      preferredPickup: formData.preferredPickup,
      favoriteCategory: formData.favoriteCategory,
      name: `${formData.firstName} ${formData.lastName}`.trim(),
    };

    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-[#FFFDF5] px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#1B5E20]">
              Customer Profile
            </p>
            <h1 className="mt-2 text-4xl font-bold text-[#173E1A]">
              My Profile
            </h1>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="rounded-xl border border-[#B42318] bg-white px-4 py-2.5 text-sm font-semibold text-[#B42318]"
          >
            Logout
          </button>
        </div>

        <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <aside className="rounded-[26px] border border-[#E7F1E8] bg-white p-6 shadow-[0_12px_28px_rgba(27,94,32,0.06)]">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#1B5E20] text-2xl font-bold text-white">
                {displayName.charAt(0).toUpperCase() || "C"}
              </div>
              <div>
                <p className="text-sm text-[#4A5E4F]">Customer</p>
                <h2 className="text-2xl font-bold text-[#173E1A]">
                  {displayName}
                </h2>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <div className="rounded-[18px] bg-[#E8F5E9] p-4">
                <p className="text-sm text-[#4A5E4F]">Favorite Products</p>
                <p className="mt-2 text-2xl font-bold text-[#173E1A]">0</p>
              </div>
              <div className="rounded-[18px] bg-[#F7F9F3] p-4">
                <p className="text-sm text-[#4A5E4F]">Favorite Farmers</p>
                <p className="mt-2 text-2xl font-bold text-[#173E1A]">0</p>
              </div>
            </div>
          </aside>

          <section className="rounded-[26px] border border-[#E7F1E8] bg-white p-6 shadow-[0_12px_28px_rgba(27,94,32,0.06)]">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-2xl font-bold text-[#173E1A]">
                Profile Details
              </h2>
              {!isEditing ? (
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="rounded-xl bg-[#F9C74F] px-4 py-2.5 text-sm font-semibold text-[#173E1A]"
                >
                  Edit Profile
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSave}
                  className="rounded-xl bg-[#1B5E20] px-4 py-2.5 text-sm font-semibold text-white"
                >
                  Save Changes
                </button>
              )}
            </div>

            {isEditing ? (
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-[#263238]">
                    First name
                  </label>
                  <input
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-[#E8F5E9] bg-white px-4 py-3 text-base text-[#263238] focus:border-[#2E7D32] focus:outline-none focus:ring-2 focus:ring-[#2E7D32]/20"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-[#263238]">
                    Last name
                  </label>
                  <input
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-[#E8F5E9] bg-white px-4 py-3 text-base text-[#263238] focus:border-[#2E7D32] focus:outline-none focus:ring-2 focus:ring-[#2E7D32]/20"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-[#263238]">
                    Phone Number
                  </label>
                  <input
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-[#E8F5E9] bg-white px-4 py-3 text-base text-[#263238] focus:border-[#2E7D32] focus:outline-none focus:ring-2 focus:ring-[#2E7D32]/20"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-[#263238]">
                    Email
                  </label>
                  <input
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-[#E8F5E9] bg-white px-4 py-3 text-base text-[#263238] focus:border-[#2E7D32] focus:outline-none focus:ring-2 focus:ring-[#2E7D32]/20"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-medium text-[#263238]">
                    Delivery Address
                  </label>
                  <input
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-[#E8F5E9] bg-white px-4 py-3 text-base text-[#263238] focus:border-[#2E7D32] focus:outline-none focus:ring-2 focus:ring-[#2E7D32]/20"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-[#263238]">
                    Preferred Pickup
                  </label>
                  <input
                    name="preferredPickup"
                    value={formData.preferredPickup}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-[#E8F5E9] bg-white px-4 py-3 text-base text-[#263238] focus:border-[#2E7D32] focus:outline-none focus:ring-2 focus:ring-[#2E7D32]/20"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-[#263238]">
                    Favorite Category
                  </label>
                  <input
                    name="favoriteCategory"
                    value={formData.favoriteCategory}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-[#E8F5E9] bg-white px-4 py-3 text-base text-[#263238] focus:border-[#2E7D32] focus:outline-none focus:ring-2 focus:ring-[#2E7D32]/20"
                  />
                </div>
              </div>
            ) : (
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {profileInfo.map((info) => (
                  <div
                    key={info.label}
                    className="rounded-[18px] bg-[#F7F9F3] p-4"
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#1B5E20]">
                      {info.label}
                    </p>
                    <p className="mt-2 text-base font-medium text-[#2F443B]">
                      {info.value}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}

export default CustomerProfile;
