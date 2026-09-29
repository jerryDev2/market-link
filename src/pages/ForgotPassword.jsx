import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Mail } from "lucide-react";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

function ForgotPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [status, setStatus] = useState({
    type: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email.trim()) {
      setStatus({
        type: "error",
        message: "Please enter your email address.",
      });
      return;
    }

    setLoading(true);
    setStatus({
      type: "",
      message: "",
    });

    try {
      const response = await fetch(`${API_BASE_URL}/api/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim(),
        }),
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          result.message || result.error || "Unable to send a recovery code.",
        );
      }

      // Go to reset-password page after the code is sent
      navigate("/reset-password", {
        state: {
          email: email.trim(),
        },
      });
    } catch (error) {
      console.error("Forgot password error:", error);

      setStatus({
        type: "error",
        message:
          error.message ||
          "Something went wrong while sending the recovery code.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-[#FFFDF5] px-4 py-12 sm:px-6">
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md rounded-2xl border border-[#E8F5E9] bg-white p-6 shadow-[0_20px_60px_rgba(27,94,32,0.09)] sm:p-9"
      >
        <Link
          to="/login"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#1B5E20] hover:text-[#154a1a]"
        >
          <ArrowLeft size={16} />
          Back to sign in
        </Link>

        <div className="mt-8 flex h-12 w-12 items-center justify-center rounded-full bg-[#E8F5E9] text-[#1B5E20]">
          <Mail size={22} />
        </div>

        <p className="mt-6 text-xs font-semibold uppercase tracking-[0.16em] text-[#2E7D32]">
          Account recovery
        </p>

        <h1 className="mt-2 text-3xl font-bold text-[#1B5E20]">
          Forgot your password?
        </h1>

        <p className="mt-3 text-sm leading-6 text-[#52645A]">
          Enter your account email and we’ll send a 6-digit code to reset your
          password.
        </p>

        {status.message ? (
          <p
            role="alert"
            className={`mt-6 rounded-lg border px-4 py-3 text-sm ${
              status.type === "success"
                ? "border-[#C8E6C9] bg-[#E8F5E9] text-[#1B5E20]"
                : "border-[#F8D7DA] bg-[#FFF1F2] text-[#B42318]"
            }`}
          >
            {status.message}
          </p>
        ) : null}

        <form onSubmit={handleSubmit} className="mt-7 space-y-4">
          <label
            htmlFor="recovery-email"
            className="block text-sm font-medium text-[#263238]"
          >
            Email address
          </label>

          <input
            id="recovery-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@example.com"
            className="w-full rounded-lg border border-[#DCE8DD] px-4 py-3 text-base text-[#263238] outline-none focus:border-[#2E7D32] focus:ring-2 focus:ring-[#2E7D32]/20"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-[#1B5E20] px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-[#154a1a] disabled:cursor-wait disabled:opacity-70"
          >
            {loading ? "Sending..." : "Send recovery code"}
          </button>
        </form>
      </motion.section>
    </main>
  );
}

export default ForgotPassword;
