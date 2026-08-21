"use client";

import Image from "next/image";
import { Search, UserCircle, Menu, X } from "lucide-react";
import { useState } from "react";

const categories = [
  "गृहपृष्ठ",
  "राजनीति",
  "समाज",
  "अर्थतन्त्र",
  "व्यापार",
  "खेलकुद",
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="w-full   bg-[var(--surface-container-lowest)]">
      {/* Top Header */}
      <div className="mx-auto flex h-[88px] max-w-[1728px] items-center justify-between px-6 sm:px-8 lg:px-12">
        
        {/* Logo */}
        <a href="/" className="shrink-0">
          <Image
            src="/logo.png"
            alt="प्रश्न"
            width={105}
            height={60}
            priority
            className="h-auto w-[85px] sm:w-[100px]"
          />
        </a>

        {/* Desktop Right Actions */}
        <div className="hidden items-center gap-7 md:flex">
          <button
            aria-label="Search"
            className="text-[var(--primary)] transition hover:opacity-70"
          >
            <Search size={28} strokeWidth={2} />
          </button>

          <button
            aria-label="Account"
            className="text-[var(--primary)] transition hover:opacity-70"
          >
            <UserCircle size={30} strokeWidth={2} />
          </button>

          <button className="rounded-md bg-[var(--primary)] px-6 py-3 text-base font-bold text-white transition hover:bg-[var(--primary-container)]">
            लगइन
          </button>
        </div>

        {/* Mobile Actions */}
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

      {/* Divider */}
      <div className="border-t border-[var(--surface-container-high)]" />

      {/* Desktop Navigation */}
      <nav className="hidden h-[74px] items-center justify-center border-b border-[var(--surface-container-high)] md:flex">
        <div className="flex items-center gap-11">
          {categories.map((category, index) => (
            <a
              key={category}
              href="#"
              className={`relative flex h-[74px] items-center px-1 text-[16px] font-bold transition ${
                index === 2
                  ? "text-[var(--primary)]"
                  : "text-[var(--on-surface-variant)] hover:text-[var(--primary)]"
              }`}
            >
              {category}

              {/* Active underline */}
              {index === 2 && (
                <span className="absolute bottom-0 left-0 right-0 h-[3px] bg-[var(--primary)]" />
              )}
            </a>
          ))}
        </div>
      </nav>

      {/* Mobile Navigation */}
      {menuOpen && (
        <nav className="border-b border-[var(--surface-container-high)] bg-[var(--surface)] md:hidden">
          <div className="flex flex-col px-6 py-3">
            {categories.map((category, index) => (
              <a
                key={category}
                href="#"
                onClick={() => setMenuOpen(false)}
                className={`border-b border-[var(--surface-container)] py-4 text-base font-bold ${
                  index === 2
                    ? "text-[var(--primary)]"
                    : "text-[var(--on-surface-variant)]"
                }`}
              >
                {category}
              </a>
            ))}

            {/* Mobile Login */}
            <button className="my-4 rounded-md bg-[var(--primary)] px-5 py-3 font-bold text-white">
              लगइन
            </button>
          </div>
        </nav>
      )}
    </header>
  );
}