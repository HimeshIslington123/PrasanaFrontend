"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Search,
  UserCircle,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";

const categories = [
  { name: "गृहपृष्ठ", href: "/" },
  { name: "राजनीति", href: "/category/8" },
  { name: "समाज", href: "/category/7" },
  { name: "अर्थतन्त्र", href: "/category/6" },
  { name: "व्यापार", href: "/category/5" },
  { name: "खेलकुद", href: "/category/4" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchText, setSearchText] = useState("");

  const pathname = usePathname();
  const router = useRouter();

  // Auth
  const { user, loading, logout } = useAuth();

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

  const handleLogout = async () => {
    await logout();

    setMenuOpen(false);

    // Go home after logout
    router.push("/");
    router.refresh();
  };

  return (
    <header className="w-full bg-[var(--surface-container-lowest)]">

      {/* TOP HEADER */}
      <div className="mx-auto flex h-[88px] max-w-[1728px] items-center justify-between px-6 sm:px-8 lg:px-12">

        {/* LOGO */}
        <Link href="/" className="shrink-0">
          <Image
            src="/logo1.png"
            alt="प्रश्न"
            width={105}
            height={60}
            priority
            className="h-auto w-[85px] sm:w-[100px]"
          />
        </Link>

        {/* DESKTOP */}
        <div className="hidden items-center gap-7 md:flex">

          {/* SEARCH */}
          <button
            type="button"
            onClick={() => setSearchOpen((prev) => !prev)}
            aria-label="Search"
            className="text-[var(--primary)] transition hover:opacity-70"
          >
            {searchOpen ? (
              <X size={28} />
            ) : (
              <Search size={28} />
            )}
          </button>

        

          {/* LOGIN / LOGOUT */}
          {!loading &&
            (user ? (
              <>  {/* ACCOUNT */}
          <button
            type="button"
            aria-label="Account"
            className="text-[var(--primary)] transition hover:opacity-70"
          >
            <UserCircle size={30} />
          </button>
              <button
                type="button"
                onClick={handleLogout}
                className="rounded-md bg-[var(--primary)] px-6 py-3 text-base font-bold text-white transition hover:bg-[var(--primary-container)]"
              >
                लगआउट
              </button>
           </> ) : (
              <Link
                href="/login"
                className="rounded-md bg-[var(--primary)] px-6 py-3 text-base font-bold text-white transition hover:bg-[var(--primary-container)]"
              >
                लगइन
              </Link>
            ))}
        </div>

        {/* MOBILE */}
        <div className="flex items-center gap-4 md:hidden">

          {/* SEARCH */}
          <button
            type="button"
            onClick={() => setSearchOpen((prev) => !prev)}
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
            onClick={() => setMenuOpen((prev) => !prev)}
            className="text-[var(--primary)]"
          >
            {menuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

      </div>

      {/* SEARCH BAR */}
      {searchOpen && (
        <div className="border-t border-[var(--surface-container-high)]">
          <form
            onSubmit={handleSearch}
            className="mx-auto flex max-w-[1728px] items-center gap-3 px-6 py-4 sm:px-8 lg:px-12"
          >
            <input
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
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

      {/* DIVIDER */}
      <div className="border-t border-[var(--surface-container-high)]" />

      {/* DESKTOP NAVIGATION */}
      <nav className="hidden h-[74px] items-center justify-center border-b border-[var(--surface-container-high)] md:flex">
        <div className="flex items-center gap-11">
          {categories.map((category) => {
            const isActive = pathname === category.href;

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

      {/* MOBILE NAVIGATION */}
      {menuOpen && (
        <nav className="border-b border-[var(--surface-container-high)] bg-[var(--surface)] md:hidden">

          <div className="flex flex-col px-6 py-3">

            {categories.map((category) => {
              const isActive = pathname === category.href;

              return (
                <Link
                  key={category.href}
                  href={category.href}
                  onClick={() => setMenuOpen(false)}
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

            {/* MOBILE LOGIN / LOGOUT */}
            {!loading &&
              (user ? (
                <button
                  type="button"
                  onClick={handleLogout}
                  className="my-4 rounded-md bg-[var(--primary)] px-5 py-3 text-center font-bold text-white"
                >
                  लगआउट
                </button>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setMenuOpen(false)}
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