"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  LayoutDashboard,
  Newspaper,
  Image as ImageIcon,
  BarChart3,
  Users,
  ExternalLink,
  LogOut,
  Menu,
  X,
  Tags,NotebookPen
} from "lucide-react";

const navItems = [
  {
    name: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    name: "News",
    href: "/admin/newsDashboard",
    icon: Newspaper,
  },
  {
    name: "Media",
    href: "/admin/media",
    icon: ImageIcon,
  },
  {
    name: "User",
    href: "/admin/UserDetails",
    icon: Users,
  },
  {
    name: "Category",
    href: "/admin/categories",
    icon: Tags,
  },
   {
    name: "Blog",
    href: "/admin/blog",
    icon: NotebookPen,
  },
];

export default function AdminHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[#e2beba] bg-white">
      <div className="flex h-[72px] items-center justify-between px-4 sm:px-6">

        {/* LEFT */}
        <div className="flex items-center">

          {/* LOGO */}
          <Link
            href="/admin"
            className="flex items-center gap-3"
            onClick={() => setMenuOpen(false)}
          >
            <Image
              src="/logo.png"
              alt="प्रश्न"
              width={42}
              height={42}
              className="h-20 w-20 object-contain"
              priority
            />

           
          </Link>

          {/* DESKTOP NAVIGATION */}
          <nav className="ml-8 hidden items-center gap-2 lg:flex">
            {navItems.map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-[#5a403e] transition hover:bg-[#f9f3f2] hover:text-[#8f000d]"
                >
                  <Icon size={17} strokeWidth={1.8} />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* DESKTOP RIGHT */}
        <div className="hidden items-center gap-3 sm:flex">
          <Link
            href="/"
            className="flex items-center gap-2 rounded-md border border-[#e2beba] px-3 py-2 text-sm font-medium text-[#5a403e] transition hover:bg-[#f9f3f2] hover:text-[#8f000d]"
          >
            <ExternalLink size={16} />
            <span className="hidden md:inline">View Website</span>
          </Link>

          <button
            type="button"
            className="flex items-center gap-2 rounded-md bg-[#8f000d] px-3 py-2 text-sm font-semibold text-white transition hover:bg-[#72000a]"
          >
            <LogOut size={16} />
            <span>Logout</span>
          </button>
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          className="rounded-md p-2 text-[#5a403e] transition hover:bg-[#f9f3f2] lg:hidden"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="border-t border-[#e2beba] bg-white lg:hidden">
          <nav className="space-y-1 px-4 py-3">
            {navItems.map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 rounded-md px-3 py-3 text-sm font-medium text-[#5a403e] transition hover:bg-[#f9f3f2] hover:text-[#8f000d]"
                >
                  <Icon size={19} strokeWidth={1.8} />
                  {item.name}
                </Link>
              );
            })}

            <div className="my-2 border-t border-[#eee1df]" />

            {/* VIEW WEBSITE */}
            <Link
              href="/"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-3 rounded-md px-3 py-3 text-sm font-medium text-[#5a403e] transition hover:bg-[#f9f3f2] hover:text-[#8f000d]"
            >
              <ExternalLink size={19} />
              View Website
            </Link>

            {/* LOGOUT */}
            <button
              type="button"
              className="flex w-full items-center gap-3 rounded-md px-3 py-3 text-left text-sm font-semibold text-[#8f000d] transition hover:bg-[#f9f3f2]"
            >
              <LogOut size={19} />
              Logout
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}