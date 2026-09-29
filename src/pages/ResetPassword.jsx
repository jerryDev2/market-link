import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, LockKeyhole, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

function ResetPassword() {
  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email || "";

  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const [status, setStatus] = useState({
    type: "",
    message: "",
  });

  const handleCodeChange = (event) => {
    const value = event.target.value.replace(/\D/g, "").slice(0, 6);

    setCode(value);

    if (status.message) {
      setStatus({
        type: "",
        message: "",
      });
    }
  };

  const handleResetPassword = async (event) => {
    event.preventDefault();

    if (!email) {
      setStatus({
        type: "error",
        message:
          "Your email address is missing. Please start the password recovery process again.",
      });
      return;
    }

    if (code.length !== 6) {
      setStatus({
        type: "error",
        message: "Please enter the 6-digit verification code.",
      });
      return;
    }

    if (newPassword.length < 6) {
      setStatus({
        type: "error",
        message: "Password must be at least 6 characters.",
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      setStatus({
        type: "error",
        message: "Passwords do not match.",
      });
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          code,
          newPassword,
        }),
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          result.message || result.error || "Unable to reset your password.",
        );
      }

      setStatus({
        type: "success",
        message: result.message || "Password reset successfully.",
      });

      // Give the user a moment to see the success message
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      console.error("Password reset error:", error);

      setStatus({
        type: "error",
        message:
          error.message ||
          "Something went wrong while resetting your password.",
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
          to="/forgot-password"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#1B5E20] hover:text-[#154a1a]"
        >
          <ArrowLeft size={16} />
          Back
        </Link>

        <div className="mt-8 flex h-14 w-14 items-center justify-center rounded-full bg-[#E8F5E9] text-[#1B5E20]">
          <LockKeyhole size={25} />
        </div>

        <p className="mt-6 text-xs font-semibold uppercase tracking-[0.16em] text-[#2E7D32]">
          Password recovery
        </p>

        <h1 className="mt-2 text-3xl font-bold text-[#1B5E20]">
          Reset your password
        </h1>

        <p className="mt-3 text-sm leading-6 text-[#52645A]">
          Enter the 6-digit code we sent to:
        </p>

        <p className="mt-2 break-all font-semibold text-[#1B5E20]">
          {email || "your email address"}
        </p>

        {status.message ? (
          <div
            role="alert"
            className={`mt-6 rounded-xl border px-4 py-3 text-sm font-medium ${
              status.type === "success"
                ? "border-[#C8E6C9] bg-[#E8F5E9] text-[#1B5E20]"
                : "border-[#F8D7DA] bg-[#FFF1F2] text-[#B42318]"
            }`}
          >
            {status.type === "success" && (
              <CheckCircle size={17} className="mr-2 inline" />
            )}

            {status.message}
          </div>
        ) : null}

        <form onSubmit={handleResetPassword} className="mt-7 space-y-5">
          {/* CODE */}

          <div>
            <label
              htmlFor="reset-code"
              className="mb-2 block text-sm font-medium text-[#263238]"
            >
              Verification code
            </label>

            <input
              id="reset-code"
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              maxLength={6}
              value={code}
              onChange={handleCodeChange}
              placeholder="000000"
              className="w-full rounded-xl border border-[#DCE8DD] px-4 py-4 text-center text-2xl font-bold tracking-[0.5em] text-[#1B5E20] outline-none focus:border-[#2E7D32] focus:ring-2 focus:ring-[#2E7D32]/20"
            />
          </div>

          {/* NEW PASSWORD */}

          <div>
            <label
              htmlFor="new-password"
              className="mb-2 block text-sm font-medium text-[#263238]"
            >
              New password
            </label>

            <input
              id="new-password"
              type="password"
              autoComplete="new-password"
              required
              minLength={6}
              value={newPassword}
              onChange={(event) => setNewPassword(event.target.value)}
              placeholder="Enter new password"
              className="w-full rounded-xl border border-[#DCE8DD] px-4 py-3 text-base text-[#263238] outline-none focus:border-[#2E7D32] focus:ring-2 focus:ring-[#2E7D32]/20"
            />
          </div>

          {/* CONFIRM PASSWORD */}

          <div>
            <label
              htmlFor="confirm-password"
              className="mb-2 block text-sm font-medium text-[#263238]"
            >
              Confirm new password
            </label>

            <input
              id="confirm-password"
              type="password"
              autoComplete="new-password"
              required
              minLength={6}
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              placeholder="Confirm new password"
              className="w-full rounded-xl border border-[#DCE8DD] px-4 py-3 text-base text-[#263238] outline-none focus:border-[#2E7D32] focus:ring-2 focus:ring-[#2E7D32]/20"
            />
          </div>

          <button
            type="submit"
            disabled={
              loading || code.length !== 6 || !newPassword || !confirmPassword
            }
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#1B5E20] px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-[#154a1a] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? (
              "Resetting password..."
            ) : (
              <>
                <CheckCircle size={18} />
                Reset password
              </>
            )}
          </button>
        </form>
      </motion.section>
    </main>
  );
}

export default ResetPassword;
