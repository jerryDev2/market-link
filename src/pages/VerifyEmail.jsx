import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, Mail, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

function VerifyEmail() {
  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email || "";

  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);

  const [notice, setNotice] = useState({
    type: "",
    message: "",
  });

  const handleChange = (event) => {
    const value = event.target.value.replace(/\D/g, "").slice(0, 6);

    setCode(value);

    if (notice.message) {
      setNotice({
        type: "",
        message: "",
      });
    }
  };

  const handleVerify = async (event) => {
    event.preventDefault();

    if (!email) {
      setNotice({
        type: "error",
        message:
          "Your email address is missing. Please return to registration.",
      });
      return;
    }

    if (code.length !== 6) {
      setNotice({
        type: "error",
        message: "Please enter the 6-digit verification code.",
      });
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/verify-signup-code`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          code,
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          data.message || data.error || "Invalid or expired verification code.",
        );
      }
      const userRole = data.user?.role?.toUpperCase();

      setNotice({
        type: "success",
        message: data.message || "Your email has been verified successfully.",
      });

      if (userRole === "CUSTOMER") {
        navigate("/");
      } else if (userRole === "FARMER") {
        navigate("/farmer-dashboard");
      }
    } catch (error) {
      console.error("Email verification error:", error);

      setNotice({
        type: "error",
        message:
          error.message || "Something went wrong while verifying your email.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (!email) {
      setNotice({
        type: "error",
        message:
          "Your email address is missing. Please return to registration.",
      });
      return;
    }

    setResending(true);

    try {
      /*
       * This endpoint must exist in your backend.
       *
       * If your backend uses a different endpoint for resending,
       * change this URL.
       */
      const response = await fetch(`${API_BASE_URL}/api/resend-signup-code`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          data.message || data.error || "Unable to resend verification code.",
        );
      }

      setNotice({
        type: "success",
        message:
          data.message ||
          "A new verification code has been sent to your email.",
      });
    } catch (error) {
      console.error("Resend verification error:", error);

      setNotice({
        type: "error",
        message: error.message || "Unable to resend verification code.",
      });
    } finally {
      setResending(false);
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
          to="/register"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#1B5E20] hover:text-[#154a1a]"
        >
          <ArrowLeft size={16} />
          Back to registration
        </Link>

        <div className="mt-8 flex h-14 w-14 items-center justify-center rounded-full bg-[#E8F5E9] text-[#1B5E20]">
          <Mail size={25} />
        </div>

        <p className="mt-6 text-xs font-semibold uppercase tracking-[0.16em] text-[#2E7D32]">
          Verify your email
        </p>

        <h1 className="mt-2 text-3xl font-bold text-[#1B5E20]">
          Check your inbox
        </h1>

        <p className="mt-3 text-sm leading-6 text-[#52645A]">
          We sent a 6-digit verification code to:
        </p>

        <p className="mt-2 break-all font-semibold text-[#1B5E20]">
          {email || "your email address"}
        </p>

        {notice.message ? (
          <div
            role="alert"
            className={`mt-6 rounded-xl border px-4 py-3 text-sm font-medium ${
              notice.type === "success"
                ? "border-[#C8E6C9] bg-[#E8F5E9] text-[#1B5E20]"
                : "border-[#F8D7DA] bg-[#FFF1F2] text-[#B42318]"
            }`}
          >
            {notice.message}
          </div>
        ) : null}

        <form onSubmit={handleVerify} className="mt-7">
          <label
            htmlFor="verification-code"
            className="mb-2 block text-sm font-medium text-[#263238]"
          >
            Verification code
          </label>

          <input
            id="verification-code"
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            maxLength={6}
            value={code}
            onChange={handleChange}
            placeholder="000000"
            className="w-full rounded-xl border border-[#DCE8DD] px-4 py-4 text-center text-2xl font-bold tracking-[0.5em] text-[#1B5E20] outline-none focus:border-[#2E7D32] focus:ring-2 focus:ring-[#2E7D32]/20"
          />

          <button
            type="submit"
            disabled={loading || code.length !== 6}
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#1B5E20] px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-[#154a1a] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? (
              "Verifying..."
            ) : (
              <>
                <CheckCircle size={18} />
                Verify email
              </>
            )}
          </button>
        </form>

        <div className="mt-7 border-t border-[#EDF4EE] pt-6 text-center">
          <p className="text-sm text-[#52645A]">Didn't receive the code?</p>

          <button
            type="button"
            onClick={handleResend}
            disabled={resending}
            className="mt-2 text-sm font-semibold text-[#1B5E20] hover:text-[#154a1a] disabled:opacity-50"
          >
            {resending ? "Sending new code..." : "Send a new code"}
          </button>
        </div>
      </motion.section>
    </main>
  );
}

export default VerifyEmail;
