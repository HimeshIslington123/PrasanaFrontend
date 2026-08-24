"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { User, Lock, Eye, EyeOff } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
const router=useRouter();
  const API_BASE = process.env.NEXT_PUBLIC_API_URL;

  const handleGoogleLogin = () => {
    window.location.href = `${API_BASE}/Authencation/google`;
  };

const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  setLoading(true);
  setError("");

  try {
    const response = await axios.post(
      `${API_BASE}/Authencation/login`,
      {
        email: email,
        password: password,
      },
      {
        withCredentials: true,
      }
    );

    console.log("Login successful:", response.data);

    // CHECK COOKIE
    const cookieCheck = await axios.get(
      `${API_BASE}/Authencation/check-cookie`,
      {
        withCredentials: true,
      }
    );
alert(JSON.stringify(cookieCheck.data));
    console.log("COOKIE CHECK:", cookieCheck.data);

    //router.push("/admin/article");

  } catch (error: any) {
    console.error("Login error:", error);

    if (error.response) {
      setError(
        error.response.data?.message ||
        error.response.data ||
        "इमेल वा पासवर्ड गलत छ।"
      );
    } else {
      setError("सर्भरसँग जडान हुन सकेन।");
    }
  } finally {
    setLoading(false);
  }
};

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

          <h1 className="text-2xl font-bold text-[var(--on-surface)] text-center">
            लगइन गर्नुहोस्
          </h1>

          <p className="text-[var(--secondary)] text-center mt-2 text-[15px]">
            आफ्नो खातामा प्रवेश गर्न विवरण भर्नुहोस्।
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleLogin}
          className="flex flex-col gap-5"
        >

          {/* Email */}
          <div>
            <label
              htmlFor="identifier"
              className="block text-sm font-bold text-[var(--on-surface)] mb-2"
            >
              इमेल वा प्रयोगकर्ता नाम
            </label>

            <div className="relative">
              <User
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--secondary)]"
                size={18}
              />

              <input
                id="identifier"
                type="text"
                name="email"
                value={email}
                placeholder="तपाईंको इमेल..."
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[var(--surface-container-low)] rounded-lg py-3 pl-10 pr-3 text-[15px] text-[var(--on-surface)] placeholder:text-[var(--secondary)] outline-none focus:ring-2 focus:ring-[var(--primary)]"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label
                htmlFor="password"
                className="text-sm font-bold text-[var(--on-surface)]"
              >
                पासवर्ड
              </label>

              <Link
                href="/forgot-password"
                className="text-sm font-semibold text-[var(--primary)] hover:underline"
              >
                पासवर्ड बिर्सनुभयो?
              </Link>
            </div>

            <div className="relative">
              <Lock
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--secondary)]"
                size={18}
              />

              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-[var(--surface-container-low)] rounded-lg py-3 pl-10 pr-10 text-[15px] text-[var(--on-surface)] placeholder:text-[var(--secondary)] outline-none focus:ring-2 focus:ring-[var(--primary)]"
              />

              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--secondary)]"
                aria-label={
                  showPassword
                    ? "पासवर्ड लुकाउनुहोस्"
                    : "पासवर्ड देखाउनुहोस्"
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
            <p className="text-sm text-red-500 text-center">
              {error}
            </p>
          )}

          {/* Login button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[var(--primary)] text-[var(--on-primary)] font-semibold rounded-lg py-3 text-[15px] hover:bg-[var(--primary-container)] transition-colors disabled:opacity-50"
          >
            {loading ? "लगइन हुँदैछ..." : "लगइन"}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-4 my-6">
          <div className="h-px flex-1 bg-[var(--outline-variant)]" />
          <span className="text-sm text-[var(--secondary)]">
            वा
          </span>
          <div className="h-px flex-1 bg-[var(--outline-variant)]" />
        </div>

        {/* Google */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-3 border border-[var(--outline-variant)] rounded-lg py-3 text-[var(--on-surface)] font-semibold text-[15px] hover:bg-[var(--surface-container-low)] transition-colors"
        >
          <FcGoogle size={20} />
          Google मार्फत लगइन
        </button>

        <p className="text-center text-sm text-[var(--on-surface)] mt-6">
          खाता छैन?{" "}
          <Link
            href="/register"
            className="font-bold text-[var(--primary)] hover:underline"
          >
            यहाँ साइन अप गर्नुहोस्
          </Link>
        </p>
      </div>
    </div>
  );
}