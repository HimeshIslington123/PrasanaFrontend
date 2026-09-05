"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Clock,
  ChevronLeft,
  ChevronRight,
  Mail,
} from "lucide-react";

// ============================================================
// TYPES
// ============================================================

type Blog = {
  id: number;
  title: string;
  content: string;
  date: string;
  userId: string;

  image?: string | null;
  pullQuote?: string | null;
  heroImageSrc?: string | null;

  slug: string;

  shareCount: number;
  viewCount: number;
  commentCount: number;
};

// ============================================================
// API
// ============================================================

const API_BASE = process.env.NEXT_PUBLIC_API_URL;

// ============================================================
// PAGE
// ============================================================

export default function BlogPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  const [currentPage, setCurrentPage] = useState(1);

  const [loading, setLoading] = useState(true);

  const pageSize = 7;

  // ==========================================================
  // GET BLOGS
  // ==========================================================

  useEffect(() => {
    const getBlogs = async () => {
      try {
        setLoading(true);

        if (!API_BASE) {
          throw new Error(
            "NEXT_PUBLIC_API_URL is not configured"
          );
        }

        const response = await fetch(
          `${API_BASE}/Blog`,
          {
            cache: "no-store",
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch blogs");
        }

        const data: Blog[] = await response.json();

        setBlogs(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error(
          "Failed to fetch blogs:",
          error
        );

        setBlogs([]);
      } finally {
        setLoading(false);
      }
    };

    getBlogs();
  }, []);

  // ==========================================================
  // LOADING
  // ==========================================================

  if (loading) {
    return (
      <main className="min-h-screen bg-[#faf8f6]">
        <div
          className="
            mx-auto
            max-w-[1280px]
            px-4
            py-10
            sm:px-6
            lg:px-8
          "
        >
          <div className="flex justify-center py-20">
            <p
              className="
                font-[family-name:var(--font-devanagari)]
                text-gray-500
              "
            >
              ब्लगहरू लोड हुँदैछ...
            </p>
          </div>
        </div>
      </main>
    );
  }

  // ==========================================================
  // EMPTY
  // ==========================================================

  if (blogs.length === 0) {
    return (
      <main className="min-h-screen bg-[#faf8f6]">
        <div
          className="
            mx-auto
            max-w-[1280px]
            px-4
            py-10
            sm:px-6
            lg:px-8
          "
        >
          <h1
            className="
              inline-block
              border-b-2
              border-[#6d001b]
              pb-2
              font-[family-name:var(--font-devanagari)]
              text-3xl
              font-bold
              text-[#171313]
              sm:text-4xl
            "
          >
            ब्लग
          </h1>

          <p
            className="
              mt-10
              text-center
              font-[family-name:var(--font-devanagari)]
              text-gray-500
            "
          >
            कुनै ब्लग भेटिएन।
          </p>
        </div>
      </main>
    );
  }

  // ==========================================================
  // PAGINATION
  // ==========================================================

  const totalPages = Math.ceil(
    blogs.length / pageSize
  );

  const startIndex =
    (currentPage - 1) * pageSize;

  const currentBlogs = blogs.slice(
    startIndex,
    startIndex + pageSize
  );

  // ==========================================================
  // PAGE NUMBERS
  // ==========================================================

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= 5) {
      for (
        let i = 1;
        i <= totalPages;
        i++
      ) {
        pages.push(i);
      }

      return pages;
    }

    pages.push(1);

    if (currentPage > 3) {
      pages.push("...");
    }

    const start = Math.max(
      2,
      currentPage - 1
    );

    const end = Math.min(
      totalPages - 1,
      currentPage + 1
    );

    for (
      let i = start;
      i <= end;
      i++
    ) {
      pages.push(i);
    }

    if (
      currentPage <
      totalPages - 2
    ) {
      pages.push("...");
    }

    pages.push(totalPages);

    return pages;
  };

  // ==========================================================
  // CHANGE PAGE
  // ==========================================================

  const changePage = (page: number) => {
    if (
      page < 1 ||
      page > totalPages ||
      page === currentPage
    ) {
      return;
    }

    setCurrentPage(page);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // ==========================================================
  // FORMAT DATE
  // ==========================================================

  const formatTime = (date: string) => {
    const blogDate = new Date(date);

    const monthNames = [
      "जनवरी",
      "फेब्रुअरी",
      "मार्च",
      "अप्रिल",
      "मे",
      "जुन",
      "जुलाई",
      "अगस्ट",
      "सेप्टेम्बर",
      "अक्टोबर",
      "नोभेम्बर",
      "डिसेम्बर",
    ];

    const day =
      blogDate.getUTCDate();

    const month =
      monthNames[
        blogDate.getUTCMonth()
      ];

    const year =
      blogDate.getUTCFullYear();

    return `${year} ${month} ${day}`;
  };

  // ==========================================================
  // FEATURED BLOG
  // ==========================================================

  const featuredBlog =
    currentBlogs[0];

  const gridBlogs =
    currentBlogs.slice(1);

  // ==========================================================
  // PAGE
  // ==========================================================

  return (
    <main className="min-h-screen bg-[#faf8f6]">
      <div
        className="
          mx-auto
          max-w-[1280px]
          px-4
          py-8
          sm:px-6
          lg:px-8
        "
      >
        {/* ====================================================
            PAGE TITLE
        ===================================================== */}

        <div className="mb-7">
          <h1
            className="
              inline-block
              border-b-2
              border-[#6d001b]
              pb-2
              font-[family-name:var(--font-devanagari)]
              text-3xl
              font-bold
              text-[#171313]
              sm:text-4xl
            "
          >
            ब्लग
          </h1>
        </div>

        {/* ====================================================
            MAIN GRID
        ===================================================== */}

        <div
          className="
            grid
            grid-cols-1
            gap-6
            lg:grid-cols-[minmax(0,2fr)_270px]
          "
        >
          {/* ==================================================
              LEFT CONTENT
          ================================================== */}

          <div>
            {/* ================================================
                FEATURED BLOG
            ================================================= */}

            <Link
              href={`/blog/${featuredBlog.slug}`}
              className="block"
            >
              <article
                className="
                  cursor-pointer
                  overflow-hidden
                  border
                  border-[#ead9d9]
                  bg-[#fffdfc]
                  transition
                  hover:shadow-md
                "
              >
                {/* IMAGE */}

                {(
                  featuredBlog.heroImageSrc ||
                  featuredBlog.image
                ) && (
                  <div
                    className="
                      relative
                      aspect-[16/9]
                      w-full
                      overflow-hidden
                      bg-gray-100
                    "
                  >
                    <img
                      src={
                        featuredBlog.heroImageSrc ||
                        featuredBlog.image ||
                        ""
                      }
                      alt={
                        featuredBlog.title
                      }
                      className="
                        h-full
                        w-full
                        object-cover
                        transition
                        duration-500
                        hover:scale-105
                      "
                    />
                  </div>
                )}

                {/* CONTENT */}

                <div className="p-5 sm:p-6">
                  <span
                    className="
                      inline-block
                      border
                      border-[#8a1d36]
                      px-2
                      py-1
                      font-[family-name:var(--font-devanagari)]
                      text-[11px]
                      font-bold
                      text-[#6d001b]
                    "
                  >
                    प्रमुख ब्लग
                  </span>

                  <h2
                    className="
                      mt-3
                      font-[family-name:var(--font-devanagari)]
                      text-2xl
                      font-bold
                      leading-tight
                      text-[#171313]
                      sm:text-3xl
                    "
                  >
                    {featuredBlog.title}
                  </h2>

                  <p
                    className="
                      mt-3
                      line-clamp-3
                      font-[family-name:var(--font-devanagari)]
                      text-sm
                      leading-7
                      text-gray-600
                      sm:text-base
                    "
                  >
                    {featuredBlog.content}
                  </p>

                  <div
                    className="
                      mt-4
                      flex
                      items-center
                      gap-2
                      text-xs
                      text-gray-500
                    "
                  >
                    <Clock size={13} />

                    <time
                      dateTime={
                        featuredBlog.date
                      }
                    >
                      {formatTime(
                        featuredBlog.date
                      )}
                    </time>
                  </div>
                </div>
              </article>
            </Link>

            {/* =================================================
                BLOG GRID
            ================================================== */}

            {gridBlogs.length > 0 && (
              <div
                className="
                  mt-6
                  grid
                  grid-cols-1
                  gap-5
                  sm:grid-cols-2
                "
              >
                {gridBlogs.map(
                  (blog) => (
                    <Link
                      key={blog.id}
                      href={`/blog/${blog.slug}`}
                      className="block"
                    >
                      <article
                        className="
                          h-full
                          cursor-pointer
                          overflow-hidden
                          border
                          border-[#ead9d9]
                          bg-[#fffdfc]
                          transition
                          hover:-translate-y-1
                          hover:shadow-md
                        "
                      >
                        {/* IMAGE */}

                        {(blog.image ||
                          blog.heroImageSrc) && (
                          <div
                            className="
                              relative
                              aspect-[16/9]
                              w-full
                              overflow-hidden
                              bg-gray-100
                            "
                          >
                            <img
                              src={
                                blog.image ||
                                blog.heroImageSrc ||
                                ""
                              }
                              alt={
                                blog.title
                              }
                              className="
                                h-full
                                w-full
                                object-cover
                                transition
                                duration-500
                                hover:scale-105
                              "
                            />
                          </div>
                        )}

                        {/* CONTENT */}

                        <div className="p-4">
                          <h2
                            className="
                              line-clamp-2
                              font-[family-name:var(--font-devanagari)]
                              text-lg
                              font-bold
                              leading-snug
                              text-[#171313]
                            "
                          >
                            {blog.title}
                          </h2>

                          <p
                            className="
                              mt-2
                              line-clamp-2
                              font-[family-name:var(--font-devanagari)]
                              text-sm
                              leading-6
                              text-gray-600
                            "
                          >
                            {blog.content}
                          </p>

                          <div
                            className="
                              mt-3
                              flex
                              items-center
                              gap-2
                              text-xs
                              text-gray-500
                            "
                          >
                            <Clock
                              size={13}
                            />

                            <time
                              dateTime={
                                blog.date
                              }
                            >
                              {formatTime(
                                blog.date
                              )}
                            </time>
                          </div>
                        </div>
                      </article>
                    </Link>
                  )
                )}
              </div>
            )}

            {/* =================================================
                PAGINATION
            ================================================== */}

            {totalPages > 1 && (
              <nav
                aria-label="ब्लग पृष्ठहरू"
                className="
                  mt-12
                  flex
                  flex-wrap
                  items-center
                  justify-center
                  gap-1
                  border-t
                  border-[#ead9d9]
                  pt-5
                "
              >
                {/* PREVIOUS */}

                <button
                  type="button"
                  onClick={() =>
                    changePage(
                      currentPage - 1
                    )
                  }
                  disabled={
                    currentPage === 1
                  }
                  aria-label="अघिल्लो पृष्ठ"
                  className={`
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    border
                    border-[#ead9d9]
                    bg-white
                    text-gray-600
                    transition
                    ${
                      currentPage ===
                      1
                        ? "cursor-not-allowed opacity-40"
                        : "hover:bg-gray-100"
                    }
                  `}
                >
                  <ChevronLeft
                    size={16}
                  />
                </button>

                {/* PAGE NUMBERS */}

                {getPageNumbers().map(
                  (page, index) => {
                    if (
                      page ===
                      "..."
                    ) {
                      return (
                        <span
                          key={`dots-${index}`}
                          className="
                            px-2
                            text-sm
                            text-gray-500
                          "
                        >
                          ...
                        </span>
                      );
                    }

                    return (
                      <button
                        key={page}
                        type="button"
                        onClick={() =>
                          changePage(
                            page as number
                          )
                        }
                        aria-current={
                          page ===
                          currentPage
                            ? "page"
                            : undefined
                        }
                        className={`
                          h-9
                          min-w-9
                          border
                          px-2
                          text-sm
                          transition
                          ${
                            page ===
                            currentPage
                              ? "border-[#6d001b] bg-[#6d001b] text-white"
                              : "border-[#ead9d9] bg-white hover:bg-gray-100"
                          }
                        `}
                      >
                        {page}
                      </button>
                    );
                  }
                )}

                {/* NEXT */}

                <button
                  type="button"
                  onClick={() =>
                    changePage(
                      currentPage + 1
                    )
                  }
                  disabled={
                    currentPage ===
                    totalPages
                  }
                  aria-label="अर्को पृष्ठ"
                  className={`
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    border
                    border-[#ead9d9]
                    bg-white
                    text-gray-600
                    transition
                    ${
                      currentPage ===
                      totalPages
                        ? "cursor-not-allowed opacity-40"
                        : "hover:bg-gray-100"
                    }
                  `}
                >
                  <ChevronRight
                    size={16}
                  />
                </button>
              </nav>
            )}
          </div>

          {/* ==================================================
              RIGHT SIDEBAR
          ================================================== */}

          <aside
            className="
              sticky
              top-6
              self-start
              space-y-6
            "
          >
            {/* =================================================
                AD
            ================================================== */}

            <section
              className="
                overflow-hidden
                border
                border-[#ead9d9]
                bg-[#fffdfc]
              "
            >
              <div
                className="
                  flex
                  h-[250px]
                  items-center
                  justify-center
                  bg-[#f3eeee]
                  text-xs
                  text-gray-400
                "
              >
                Advertisement
              </div>
            </section>

            {/* =================================================
                POPULAR BLOGS
            ================================================== */}

            <section
              className="
                border
                border-[#ead9d9]
                bg-[#fffdfc]
                p-4
              "
            >
              <h2
                className="
                  border-b
                  border-[#b78a96]
                  pb-2
                  font-[family-name:var(--font-devanagari)]
                  text-xl
                  font-bold
                  text-[#171313]
                "
              >
                लोकप्रिय ब्लगहरू
              </h2>

              <div>
                {blogs
                  .slice(0, 5)
                  .map(
                    (
                      blog,
                      index
                    ) => (
                      <Link
                        key={
                          blog.id
                        }
                        href={`/blog/${blog.slug}`}
                        className="block"
                      >
                        <div
                          className="
                            cursor-pointer
                            border-b
                            border-[#ead9d9]
                            py-4
                            last:border-b-0
                          "
                        >
                          <h3
                            className="
                              line-clamp-2
                              font-[family-name:var(--font-devanagari)]
                              text-sm
                              font-medium
                              leading-6
                              text-[#171313]
                              hover:text-[#6d001b]
                            "
                          >
                            {blog.title}
                          </h3>

                          <p
                            className="
                              mt-1
                              text-[10px]
                              text-gray-500
                            "
                          >
                            {index + 1}{" "}
                            लोकप्रिय
                          </p>
                        </div>
                      </Link>
                    )
                  )}
              </div>
            </section>

            {/* =================================================
                NEWSLETTER
            ================================================== */}

            <section
              className="
                border
                border-[#ead9d9]
                bg-[#f3eeee]
                p-5
                text-center
              "
            >
              <Mail
                className="
                  mx-auto
                  text-[#6d001b]
                "
                size={25}
              />

              <h2
                className="
                  mt-3
                  font-[family-name:var(--font-devanagari)]
                  text-xl
                  font-bold
                  text-[#171313]
                "
              >
                न्यूजलेटर
              </h2>

              <p
                className="
                  mt-2
                  font-[family-name:var(--font-devanagari)]
                  text-xs
                  leading-5
                  text-gray-600
                "
              >
                महत्वपूर्ण सामग्री
                सीधै आफ्नो इनबक्समा
                पाउनुहोस्।
              </p>

              <input
                type="email"
                placeholder="तपाईंको ईमेल ठेगाना"
                aria-label="तपाईंको ईमेल ठेगाना"
                className="
                  mt-4
                  w-full
                  border
                  border-[#ead9d9]
                  bg-white
                  px-3
                  py-3
                  text-sm
                  outline-none
                  focus:border-[#6d001b]
                "
              />

              <button
                type="button"
                className="
                  mt-2
                  w-full
                  bg-[#6d001b]
                  py-2.5
                  font-[family-name:var(--font-devanagari)]
                  text-xs
                  font-bold
                  text-white
                  hover:opacity-90
                "
              >
                सदस्यता लिने
              </button>
            </section>
          </aside>
        </div>
      </div>
    </main>
  );
}