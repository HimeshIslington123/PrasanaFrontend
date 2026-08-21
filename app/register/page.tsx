"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Eye, EyeOff } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";

const API_BASE = process.env.NEXT_PUBLIC_API_URL;

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleRegister(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const response = await axios.post(
        `${API_BASE}/Authencation/register`,
        {
          name,
          email,
          password,
        }
      );

      setSuccess(
        response.data?.message || "Registration successful!"
      );

      // Clear form
      setName("");
      setEmail("");
      setPassword("");
    } catch (error: unknown) {
      console.error("Registration error:", error);

      if (axios.isAxiosError(error)) {
        console.log("Status:", error.response?.status);
        console.log("Backend response:", error.response?.data);

        const data = error.response?.data;

        // ASP.NET Identity usually returns an array like:
        // [
        //   {
        //     code: "...",
        //     description: "..."
        //   }
        // ]

        if (Array.isArray(data)) {
          const messages = data
            .map((item: { description?: string; code?: string }) => {
              return item.description || item.code || "Registration failed";
            })
            .filter(Boolean);

          setError(
            messages.length > 0
              ? messages.join(", ")
              : "Registration failed"
          );
        } else if (data?.message) {
          setError(data.message);
        } else if (typeof data === "string") {
          setError(data);
        } else {
          setError(
            "Registration failed. Please check your information."
          );
        }
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  }

  function handleGoogleSignup() {
    if (!API_BASE) {
      setError("API URL is not configured.");
      return;
    }

    window.location.href = `${API_BASE}/Authencation/google`;
  }

  return (
    <div className="min-h-screen w-full bg-[var(--background)] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-[420px] bg-[var(--surface-container-lowest)] border border-[var(--outline-variant)] rounded-xl shadow-sm px-7 py-8 sm:px-9 sm:py-10">

        {/* Header */}
        <div className="flex flex-col items-center mb-6">
          <Image
            src="/logo.png"
            alt="प्रश्न"
            width={140}
            height={48}
            className="h-10 w-auto mb-5"
            priority
          />

          <p className="text-[var(--secondary)] text-center text-[15px]">
            Sign up for an account
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleRegister}
          className="flex flex-col gap-5"
        >
          {/* Full Name */}
          <div>
            <label
              htmlFor="fullName"
              className="block text-sm font-bold text-[var(--on-surface)] mb-2"
            >
              Full Name
            </label>

            <input
              id="fullName"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              required
              disabled={loading}
              className="w-full bg-[var(--surface-container-low)] rounded-lg py-3 px-3 text-[15px] text-[var(--on-surface)] placeholder:text-[var(--secondary)] outline-none focus:ring-2 focus:ring-[var(--primary)] disabled:opacity-50"
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-bold text-[var(--on-surface)] mb-2"
            >
              Email Address
            </label>

            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Prasana@gmail.com"
              required
              disabled={loading}
              className="w-full bg-[var(--surface-container-low)] rounded-lg py-3 px-3 text-[15px] text-[var(--on-surface)] placeholder:text-[var(--secondary)] outline-none focus:ring-2 focus:ring-[var(--primary)] disabled:opacity-50"
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-bold text-[var(--on-surface)] mb-2"
            >
              Password
            </label>

            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a password"
                required
                disabled={loading}
                className="w-full bg-[var(--surface-container-low)] rounded-lg py-3 px-3 pr-10 text-[15px] text-[var(--on-surface)] placeholder:text-[var(--secondary)] outline-none focus:ring-2 focus:ring-[var(--primary)] disabled:opacity-50"
              />

              <button
                type="button"
                onClick={() => setShowPassword((value) => !value)}
                disabled={loading}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--secondary)] disabled:opacity-50"
                aria-label={
                  showPassword ? "Hide password" : "Show password"
                }
              >
                {showPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="text-sm text-red-500 bg-red-50 rounded-lg p-3">
              {error}
            </div>
          )}

          {/* Success */}
          {success && (
            <div className="text-sm text-green-600 bg-green-50 rounded-lg p-3">
              {success}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[var(--primary)] text-[var(--on-primary)] font-semibold rounded-lg py-3 text-[15px] hover:bg-[var(--primary-container)] transition-colors disabled:opacity-50"
          >
            {loading ? "Creating account..." : "Sign Up"}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-4 my-6">
          <div className="h-px flex-1 bg-[var(--outline-variant)]" />

          <span className="text-sm text-[var(--secondary)]">
            OR
          </span>

          <div className="h-px flex-1 bg-[var(--outline-variant)]" />
        </div>

        {/* Google */}
        <button
          type="button"
          onClick={handleGoogleSignup}
          disabled={loading}
          className="w-full flex items-center justify-center gap-3 border border-[var(--outline-variant)] rounded-lg py-3 text-[var(--on-surface)] font-semibold text-[15px] hover:bg-[var(--surface-container-low)] transition-colors disabled:opacity-50"
        >
          <FcGoogle size={20} />
          Sign up with Google
        </button>

        {/* Login */}
        <p className="text-center text-sm text-[var(--on-surface)] mt-6">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-bold text-[var(--primary)] hover:underline"
          >
            Log In
          </Link>
        </p>

        {/* Terms */}
        <p className="text-center text-xs text-[var(--secondary)] mt-3 leading-relaxed">
          By signing up, you agree to our{" "}
          <Link href="/terms" className="underline">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="underline">
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </div>
  );
}