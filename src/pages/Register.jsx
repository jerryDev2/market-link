import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Check } from "lucide-react";

const API_BASE_URL = import.meta.env.VITE_API_URL || "";
const apiUrl = (path) => `${API_BASE_URL}${path}`;

const validatePassword = (password) => {
  if (password.length < 8) {
    return "Password must be at least 8 characters long.";
  }

  if (!/[A-Z]/.test(password)) {
    return "Password must include at least one capital letter.";
  }

  if (!/\d/.test(password)) {
    return "Password must include at least one number.";
  }

  return "";
};

const marketHighlights = [
  {
    title: "Fresh weekly stock",
    description: "See what local farmers have available before you travel.",
  },
  {
    title: "Reserve ahead",
    description: "Save your favorite produce and pickup details in advance.",
  },
  {
    title: "Local trust",
    description:
      "Support nearby growers and discover quality produce close to home.",
  },
  {
    title: "Friendly community",
    description:
      "Connect with farmers, browse reviews, and discover new favorites.",
  },
];

function Register() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    role: "CUSTOMER",
    password: "",
    confirmPassword: "",
  });

  const [passwordError, setPasswordError] = useState("");
  const [notice, setNotice] = useState({ type: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (notice.message) {
      setNotice({ type: "", message: "" });
    }

    if (passwordError) {
      setPasswordError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {
      firstName,
      lastName,
      email,
      phoneNumber,
      role,
      password,
      confirmPassword,
    } = formData;

    if (
      !firstName.trim() ||
      !lastName.trim() ||
      !email.trim() ||
      !phoneNumber.trim() ||
      !role ||
      !password ||
      !confirmPassword
    ) {
      setNotice({
        type: "error",
        message: "Please fill in all the required information.",
      });
      return;
    }

    const passwordValidationMessage = validatePassword(password);
    if (passwordValidationMessage) {
      setPasswordError(passwordValidationMessage);
      setNotice({ type: "error", message: passwordValidationMessage });
      return;
    }

    if (password !== confirmPassword) {
      setPasswordError("Your password does not match.");
      setNotice({ type: "error", message: "Your password does not match." });
      return;
    }

    setPasswordError("");
    setNotice({ type: "", message: "" });
    setIsSubmitting(true);

    try {
      const response = await fetch(apiUrl("/api/user"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error("Something went wrong. Please try again.");
      }

      if (!data?.user) {
        throw new Error("No user was returned from the server.");
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      window.dispatchEvent(new Event("auth-change"));

      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        role: "CUSTOMER",
        password: "",
        confirmPassword: "",
      });

      const userRole = data.user?.role?.toUpperCase();

      setNotice({
        type: "success",
        message: "Account created successfully! Redirecting...",
      });

      if (userRole === "CUSTOMER") {
        navigate("/");
      } else if (userRole === "FARMER") {
        navigate("/farmer-dashboard");
      }
    } catch (error) {
      console.error("signup error:", error);
      setNotice({
        type: "error",
        message: error.message || "Something went wrong during signup.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="min-h-screen bg-[#FFFDF5] px-4 py-6 sm:px-6 lg:px-8 lg:py-10 ">
      <div className="mx-auto max-w-6xl overflow-hidden rounded-[28px] border border-[#E8F5E9] bg-white shadow-[0_25px_80px_rgba(27,94,32,0.08)]">
        <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
          <section className="bg-[#A5D6A7] p-6 sm:p-8 lg:p-12">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#1B5E20] text-lg font-bold text-white shadow-sm">
                M
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#1B5E20]">
                  MarketLink
                </p>
                <h2 className="text-xl font-bold text-[#1B5E20]">
                  Farmers market made simple
                </h2>
              </div>
            </div>

            <div className="mt-10 max-w-md">
              <span className="inline-flex rounded-full border border-[#1B5E20]/20 bg-[#FFFDF5]/70 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-[#1B5E20]">
                Fresh produce • Local farmers
              </span>
              <h1 className="mt-5 text-3xl font-bold leading-tight text-[#1B5E20] sm:text-4xl lg:text-5xl">
                Join your local market community.
              </h1>
              <p className="mt-4 text-base leading-7 text-[#263238] sm:text-lg">
                Discover nearby markets, browse weekly produce, reserve
                favorites for pickup, and support growers in your area.
              </p>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {marketHighlights.map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-[#E8F5E9] bg-[#FFFDF5]/75 p-4 shadow-sm backdrop-blur-sm"
                >
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-[#F9C74F] text-lg text-[#263238]">
                    <Check size={18} aria-hidden="true" />
                  </div>
                  <h3 className="text-base font-semibold text-[#1B5E20]">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-[#263238]/80">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-white p-6 sm:p-8 lg:p-12">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-medium text-[#263238]/70">
                  Create account
                </p>
                <h2 className="mt-1 text-3xl font-bold text-[#1B5E20] sm:text-4xl">
                  Register
                </h2>
              </div>
              <span className="inline-flex w-fit items-center rounded-full bg-[#F9C74F] px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-[#263238]">
                Shopper & Farmer
              </span>
            </div>

            {notice.message ? (
              <div
                className={`mt-6 rounded-xl border px-4 py-3 text-sm font-medium ${
                  notice.type === "success"
                    ? "border-[#C8E6C9] bg-[#E8F5E9] text-[#1B5E20]"
                    : "border-[#F8D7DA] bg-[#FFF1F2] text-[#B42318]"
                }`}
              >
                {notice.message}
              </div>
            ) : null}

            <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="firstName"
                    className="mb-2 block text-sm font-medium text-[#263238]"
                  >
                    First name
                  </label>
                  <input
                    value={formData.firstName}
                    onChange={handleChange}
                    id="firstName"
                    name="firstName"
                    type="text"
                    placeholder="Alicia"
                    className="w-full rounded-xl border border-[#E8F5E9] bg-white px-4 py-3 text-base text-[#263238] placeholder:text-[#263238]/45 focus:border-[#2E7D32] focus:outline-none focus:ring-2 focus:ring-[#2E7D32]/20"
                  />
                </div>

                <div>
                  <label
                    htmlFor="lastName"
                    className="mb-2 block text-sm font-medium text-[#263238]"
                  >
                    Last name
                  </label>
                  <input
                    value={formData.lastName}
                    onChange={handleChange}
                    id="lastName"
                    name="lastName"
                    type="text"
                    placeholder="Jones"
                    className="w-full rounded-xl border border-[#E8F5E9] bg-white px-4 py-3 text-base text-[#263238] placeholder:text-[#263238]/45 focus:border-[#2E7D32] focus:outline-none focus:ring-2 focus:ring-[#2E7D32]/20"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-[#263238]"
                >
                  Email address
                </label>
                <input
                  value={formData.email}
                  onChange={handleChange}
                  id="email"
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-[#E8F5E9] bg-white px-4 py-3 text-base text-[#263238] placeholder:text-[#263238]/45 focus:border-[#2E7D32] focus:outline-none focus:ring-2 focus:ring-[#2E7D32]/20"
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="mb-2 block text-sm font-medium text-[#263238]"
                >
                  Phone number
                </label>
                <input
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  id="phoneNumber"
                  type="tel"
                  name="phoneNumber"
                  placeholder="+233 20 000 0000"
                  className="w-full rounded-xl border border-[#E8F5E9] bg-white px-4 py-3 text-base text-[#263238] placeholder:text-[#263238]/45 focus:border-[#2E7D32] focus:outline-none focus:ring-2 focus:ring-[#2E7D32]/20"
                />
              </div>

              <div>
                <label
                  htmlFor="role"
                  className="mb-2 block text-sm font-medium text-[#263238]"
                >
                  I am joining as
                </label>
                <select
                  value={formData.role}
                  name="role"
                  onChange={handleChange}
                  id="role"
                  className="w-full rounded-xl border border-[#E8F5E9] bg-white px-4 py-3 text-base text-[#263238] focus:border-[#2E7D32] focus:outline-none focus:ring-2 focus:ring-[#2E7D32]/20"
                >
                  <option value="CUSTOMER">Customer</option>
                  <option value="FARMER">Farmer</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-medium text-[#263238]"
                >
                  Password
                </label>
                <input
                  value={formData.password}
                  name="password"
                  onChange={handleChange}
                  id="password"
                  type="password"
                  placeholder="Create a strong password"
                  className="w-full rounded-xl border border-[#E8F5E9] bg-white px-4 py-3 text-base text-[#263238] placeholder:text-[#263238]/45 focus:border-[#2E7D32] focus:outline-none focus:ring-2 focus:ring-[#2E7D32]/20"
                />
                <p className="mt-2 text-xs text-[#4A5E4F]">
                  Use at least 8 characters, 1 capital letter and 1 number.
                </p>
                {passwordError ? (
                  <p className="mt-2 text-sm text-[#B42318]">{passwordError}</p>
                ) : null}
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="mb-2 block text-sm font-medium text-[#263238]"
                >
                  Confirm password
                </label>
                <input
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  name="confirmPassword"
                  id="confirmPassword"
                  type="password"
                  placeholder="Repeat password"
                  className="w-full rounded-xl border border-[#E8F5E9] bg-white px-4 py-3 text-base text-[#263238] placeholder:text-[#263238]/45 focus:border-[#2E7D32] focus:outline-none focus:ring-2 focus:ring-[#2E7D32]/20"
                />
              </div>

              <div className="flex items-start gap-3 rounded-xl bg-[#E8F5E9] p-3 text-sm text-[#263238]">
                <input
                  id="terms"
                  type="checkbox"
                  className="mt-1 h-4 w-4 rounded border-[#2E7D32] text-[#1B5E20] focus:ring-[#2E7D32]"
                />
                <label htmlFor="terms" className="leading-6">
                  I agree to the{" "}
                  <span className="font-semibold text-[#1B5E20]">Terms</span>{" "}
                  and{" "}
                  <span className="font-semibold text-[#1B5E20]">
                    Privacy Policy
                  </span>
                  , and I want to receive updates about local markets and fresh
                  picks.
                </label>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-xl bg-[#1B5E20] px-5 py-3.5 text-base font-semibold text-white transition hover:bg-[#154a1a] focus:outline-none focus:ring-4 focus:ring-[#1B5E20]/20 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting ? "Creating account..." : "Create account"}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-[#263238]/70">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-semibold text-[#1B5E20] hover:text-[#154a1a]"
              >
                Sign in
              </Link>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Register;
