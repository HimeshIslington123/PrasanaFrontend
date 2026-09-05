
"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Search,
  UserCircle,
  Menu,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

// ============================================================
// TYPES
// ============================================================

type UserDetail = {
  name: string;
  email: string;
  isEmailVerify: boolean;
};

// ============================================================
// CATEGORIES
// ============================================================

const categories = [
  { name: "गृहपृष्ठ", href: "/" },

  { name: "राजनीति", href: "/category/politics" },

  { name: "समाज", href: "/category/society" },

  { name: "अर्थतन्त्र", href: "/category/economy" },

  { name: "व्यापार", href: "/category/business" },

  { name: "खेलकुद", href: "/category/sports" },

   { name: "साहित्य", href: "/category/literature" },
  
];

// ============================================================
// COMPONENT
// ============================================================

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchText, setSearchText] = useState("");

  // Profile
  const [userDetail, setUserDetail] =
    useState<UserDetail | null>(null);

  const [profileOpen, setProfileOpen] = useState(false);

  const pathname = usePathname();
  const router = useRouter();

  // ============================================================
  // AUTH
  // ============================================================

  const { user, loading, logout } = useAuth();

  // ============================================================
  // GET CURRENT USER DETAILS
  // ============================================================

  useEffect(() => {
    if (!user) {
      setUserDetail(null);
      return;
    }

    const getUserDetail = async () => {
      try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/Authencation/getme`,
      {
        withCredentials: true,
      }
    );

    setUserDetail(response.data);
  } catch (error) {
        console.error(
          "Failed to get current user details:",
          error
        );

        setUserDetail(null);
      }
    };

    getUserDetail();
  }, [user]);

  // ============================================================
  // SEARCH
  // ============================================================

  const handleSearch = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const trimmedSearch = searchText.trim();

    if (!trimmedSearch) return;

    router.push(
      `/search?q=${encodeURIComponent(trimmedSearch)}`
    );

    setSearchOpen(false);
    setMenuOpen(false);
  };

  // ============================================================
  // LOGOUT
  // ============================================================

  const handleLogout = async () => {
    await logout();

    setUserDetail(null);
    setProfileOpen(false);
    setMenuOpen(false);

    router.push("/");
    router.refresh();
  };

  // ============================================================
  // RENDER
  // ============================================================

  return (
    <header className="w-full bg-[var(--surface-container-lowest)]">

      {/* ======================================================
          TOP HEADER
      ====================================================== */}

      <div className="mx-auto flex h-[88px] max-w-[1728px] items-center justify-between px-6 sm:px-8 lg:px-12">

        {/* ====================================================
            LOGO
        ==================================================== */}

        <Link
          href="/"
          className="shrink-0"
        >
          <Image
            src="/logo1.png"
            alt="प्रश्न"
            width={105}
            height={60}
            priority
            className="h-auto w-[85px] sm:w-[100px]"
          />
        </Link>

        {/* ====================================================
            DESKTOP
        ==================================================== */}

        <div className="hidden items-center gap-7 md:flex">

          {/* ==================================================
              SEARCH
          ================================================== */}

          <button
            type="button"
            onClick={() =>
              setSearchOpen((prev) => !prev)
            }
            aria-label="Search"
            className="text-[var(--primary)] transition hover:opacity-70"
          >
            {searchOpen ? (
              <X size={28} />
            ) : (
              <Search size={28} />
            )}
          </button>

          {/* ==================================================
              LOGIN / PROFILE / LOGOUT
          ================================================== */}

          {!loading &&
            (user ? (
              <>
                {/* ==========================================
                    PROFILE
                ========================================== */}

                <div
                  className="relative"
                  onMouseEnter={() =>
                    setProfileOpen(true)
                  }
                  onMouseLeave={() =>
                    setProfileOpen(false)
                  }
                >
                  <button
                    type="button"
                    aria-label="Account"
                    className="text-[var(--primary)] transition hover:opacity-70"
                  >
                    <UserCircle size={30} />
                  </button>

                  {/* ========================================
                      PROFILE POPUP
                  ======================================== */}

                  {profileOpen && userDetail && (
                    <div className="absolute right-0 top-full z-50 w-72 pt-3">

                      <div className="rounded-lg border border-[var(--surface-container-high)] bg-[var(--surface-container-lowest)] p-5 shadow-lg">

                        {/* USER INFORMATION */}

                        <div className="mb-4 flex items-center gap-3">

                          {/* ICON */}

                          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[var(--primary)] text-white">
                            <UserCircle size={30} />
                          </div>

                          {/* NAME + EMAIL */}

                          <div className="min-w-0">

                            <p className="truncate text-base font-bold text-[var(--on-surface)]">
                              {userDetail.name}
                            </p>

                            <p className="truncate text-sm text-[var(--on-surface-variant)]">
                              {userDetail.email}
                            </p>

                          </div>

                        </div>

                        {/* DIVIDER */}

                        <div className="border-t border-[var(--surface-container-high)] pt-3">

                          {/* EMAIL STATUS */}

                          <div className="flex items-center justify-between">

                            <span className="text-sm text-[var(--on-surface-variant)]">
                              Email
                            </span>

                            <span
                              className={`text-sm font-semibold ${
                                userDetail.isEmailVerify
                                  ? "text-green-600"
                                  : "text-red-600"
                              }`}
                            >
                              {userDetail.isEmailVerify
                                ? "Verified"
                                : "Not verified"}
                            </span>

                          </div>

                        </div>

                      </div>

                    </div>
                  )}
                </div>

                {/* ==========================================
                    LOGOUT
                ========================================== */}

                <button
                  type="button"
                  onClick={handleLogout}
                  className="rounded-md bg-[var(--primary)] px-6 py-3 text-base font-bold text-white transition hover:bg-[var(--primary-container)]"
                >
                  लगआउट
                </button>
              </>
            ) : (
              /* ============================================
                 LOGIN
              ============================================ */

              <Link
                href="/login"
                className="rounded-md bg-[var(--primary)] px-6 py-3 text-base font-bold text-white transition hover:bg-[var(--primary-container)]"
              >
                लगइन
              </Link>
            ))}

        </div>

        {/* ====================================================
            MOBILE
        ==================================================== */}

        <div className="flex items-center gap-4 md:hidden">

          {/* SEARCH */}

          <button
            type="button"
            onClick={() =>
              setSearchOpen((prev) => !prev)
            }
            aria-label="Search"
            className="text-[var(--primary)]"
          >
            {searchOpen ? (
              <X size={23} />
            ) : (
              <Search size={23} />
            )}
          </button>

          {/* MENU */}

          <button
            type="button"
            aria-label="Menu"
            onClick={() =>
              setMenuOpen((prev) => !prev)
            }
            className="text-[var(--primary)]"
          >
            {menuOpen ? (
              <X size={26} />
            ) : (
              <Menu size={26} />
            )}
          </button>

        </div>

      </div>

      {/* ======================================================
          SEARCH BAR
      ====================================================== */}

      {searchOpen && (
        <div className="border-t border-[var(--surface-container-high)]">

          <form
            onSubmit={handleSearch}
            className="mx-auto flex max-w-[1728px] items-center gap-3 px-6 py-4 sm:px-8 lg:px-12"
          >

            <input
              type="text"
              value={searchText}
              onChange={(e) =>
                setSearchText(e.target.value)
              }
              placeholder="समाचार खोज्नुहोस्..."
              autoFocus
              className="w-full border border-[var(--outline-variant)] bg-transparent px-4 py-3 text-[var(--on-surface)] outline-none transition focus:border-[var(--primary)]"
            />

            <button
              type="submit"
              className="shrink-0 bg-[var(--primary)] px-5 py-3 font-[family-name:var(--font-devanagari)] font-bold text-white transition hover:opacity-90"
            >
              खोज्नुहोस्
            </button>

          </form>

        </div>
      )}

      {/* ======================================================
          DIVIDER
      ====================================================== */}

      <div className="border-t border-[var(--surface-container-high)]" />

      {/* ======================================================
          DESKTOP NAVIGATION
      ====================================================== */}

      <nav className="hidden h-[74px] items-center justify-center border-b border-[var(--surface-container-high)] md:flex">

        <div className="flex items-center gap-11">

          {categories.map((category) => {

            const isActive =
              pathname === category.href;

            return (
              <Link
                key={category.href}
                href={category.href}
                className={`relative flex h-[74px] items-center px-1 text-[16px] font-bold transition ${
                  isActive
                    ? "text-[var(--primary)]"
                    : "text-[var(--on-surface-variant)] hover:text-[var(--primary)]"
                }`}
              >

                {category.name}

                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[3px] bg-[var(--primary)]" />
                )}

              </Link>
            );

          })}

        </div>

      </nav>

      {/* ======================================================
          MOBILE NAVIGATION
      ====================================================== */}

      {menuOpen && (
        <nav className="border-b border-[var(--surface-container-high)] bg-[var(--surface)] md:hidden">

          <div className="flex flex-col px-6 py-3">

            {categories.map((category) => {

              const isActive =
                pathname === category.href;

              return (
                <Link
                  key={category.href}
                  href={category.href}
                  onClick={() =>
                    setMenuOpen(false)
                  }
                  className={`border-b border-[var(--surface-container)] py-4 text-base font-bold ${
                    isActive
                      ? "text-[var(--primary)]"
                      : "text-[var(--on-surface-variant)]"
                  }`}
                >
                  {category.name}
                </Link>
              );

            })}

            {/* ================================================
                MOBILE LOGIN / LOGOUT
            ================================================ */}

            {!loading &&
              (user ? (
                <>
                  {/* MOBILE USER INFO */}

                  {userDetail && (
                    <div className="my-4 rounded-lg border border-[var(--surface-container-high)] p-4">

                      <div className="flex items-center gap-3">

                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[var(--primary)] text-white">
                          <UserCircle size={27} />
                        </div>

                        <div className="min-w-0">

                          <p className="truncate font-bold text-[var(--on-surface)]">
                            {userDetail.name}
                          </p>

                          <p className="truncate text-sm text-[var(--on-surface-variant)]">
                            {userDetail.email}
                          </p>

                        </div>

                      </div>

                      <div className="mt-3 border-t border-[var(--surface-container-high)] pt-3">

                        <div className="flex items-center justify-between">

                          <span className="text-sm text-[var(--on-surface-variant)]">
                            Email
                          </span>

                          <span
                            className={`text-sm font-semibold ${
                              userDetail.isEmailVerify
                                ? "text-green-600"
                                : "text-red-600"
                            }`}
                          >
                            {userDetail.isEmailVerify
                              ? "Verified"
                              : "Not verified"}
                          </span>

                        </div>

                      </div>

                    </div>
                  )}

                  {/* MOBILE LOGOUT */}

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="my-4 rounded-md bg-[var(--primary)] px-5 py-3 text-center font-bold text-white"
                  >
                    लगआउट
                  </button>
                </>
              ) : (
                <Link
                  href="/login"
                  onClick={() =>
                    setMenuOpen(false)
                  }
                  className="my-4 rounded-md bg-[var(--primary)] px-5 py-3 text-center font-bold text-white"
                >
                  लगइन
                </Link>
              ))}

          </div>

        </nav>
      )}

    </header>
  );
}
