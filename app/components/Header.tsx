"use client";

import Image from "next/image";
import Link from "next/link";
import { Search, UserCircle, Menu, X } from "lucide-react";
import { useState } from "react";

const categories = [
  { name: "गृहपृष्ठ", href: "/home" },
  { name: "राजनीति", href: "/category/8" },
  { name: "समाज", href: "/category/7" },
  { name: "अर्थतन्त्र", href: "/category/6" },
  { name: "व्यापार", href: "/category/5" },
  { name: "खेलकुद", href: "/category/4" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="w-full bg-[var(--surface-container-lowest)]">

      {/* Logo */}
      <div className="mx-auto flex h-[88px] max-w-[1728px] items-center justify-between px-6 sm:px-8 lg:px-12">

        <Link href="/" className="shrink-0">
          <Image
            src="/logo.png"
            alt="प्रश्न"
            width={105}
            height={60}
            priority
            className="h-auto w-[85px] sm:w-[100px]"
          />
        </Link>

        {/* Desktop */}
        <div className="hidden items-center gap-7 md:flex">

          <button
            aria-label="Search"
            className="text-[var(--primary)] transition hover:opacity-70"
          >
            <Search size={28} />
          </button>

          <button
            aria-label="Account"
            className="text-[var(--primary)] transition hover:opacity-70"
          >
            <UserCircle size={30} />
          </button>

          <Link
            href="/login"
            className="rounded-md bg-[var(--primary)] px-6 py-3 text-base font-bold text-white transition hover:bg-[var(--primary-container)]"
          >
            लगइन
          </Link>

        </div>

        {/* Mobile */}
        <div className="flex items-center gap-4 md:hidden">

          <button
            aria-label="Search"
            className="text-[var(--primary)]"
          >
            <Search size={23} />
          </button>

          <button
            aria-label="Menu"
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-[var(--primary)]"
          >
            {menuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>

        </div>
      </div>

      <div className="border-t border-[var(--surface-container-high)]" />

      {/* Desktop Navigation */}
      <nav className="hidden h-[74px] items-center justify-center border-b border-[var(--surface-container-high)] md:flex">

        <div className="flex items-center gap-11">

          {categories.map((category, index) => (
            <Link
              key={category.href}
              href={category.href}
              className={`relative flex h-[74px] items-center px-1 text-[16px] font-bold transition ${
                index === 2
                  ? "text-[var(--primary)]"
                  : "text-[var(--on-surface-variant)] hover:text-[var(--primary)]"
              }`}
            >
              {category.name}

              {index === 2 && (
                <span className="absolute bottom-0 left-0 right-0 h-[3px] bg-[var(--primary)]" />
              )}
            </Link>
          ))}

        </div>
      </nav>

      {/* Mobile Navigation */}
      {menuOpen && (
        <nav className="border-b border-[var(--surface-container-high)] bg-[var(--surface)] md:hidden">

          <div className="flex flex-col px-6 py-3">

            {categories.map((category, index) => (
              <Link
                key={category.href}
                href={category.href}
                onClick={() => setMenuOpen(false)}
                className={`border-b border-[var(--surface-container)] py-4 text-base font-bold ${
                  index === 2
                    ? "text-[var(--primary)]"
                    : "text-[var(--on-surface-variant)]"
                }`}
              >
                {category.name}
              </Link>
            ))}

            <Link
              href="/login"
              onClick={() => setMenuOpen(false)}
              className="my-4 rounded-md bg-[var(--primary)] px-5 py-3 text-center font-bold text-white"
            >
              लगइन
            </Link>

          </div>

        </nav>
      )}

    </header>
  );
}