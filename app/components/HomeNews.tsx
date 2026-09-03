"use client";

import { useState } from "react";
import axios from "axios";
import Image from "next/image";
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

type News = {
  id: number;
  title: string;
  content: string;
  categoryname: string;
  created: string;
  image: string;
  slug: string;
  comments:
    | {
        newsId: number;
        content: string;
      }[]
    | null;
  pullQuote?: string | null;
  heroImageSrc?: string | null;
};

// ============================================================
// PROPS
// ============================================================

type HomeNewsProps = {
  initialNews: News[];
  initialTotalPages: number;
};

// ============================================================
// COMPONENT
// ============================================================

export default function HomeNews({
  initialNews,
  initialTotalPages,
}: HomeNewsProps) {
  // ==========================================================
  // STATE
  // ==========================================================

  const [news, setNews] = useState<News[]>(initialNews);

  const [currentPage, setCurrentPage] = useState(1);

  const [totalPages, setTotalPages] =
    useState(initialTotalPages);

  const [loading, setLoading] = useState(false);

  const pageSize = 10;

  // ==========================================================
  // FORMAT DATE
  // ==========================================================

  const formatTime = (date: string) => {
    const newsDate = new Date(date);

    const day = newsDate.getUTCDate();

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

    const month =
      monthNames[newsDate.getUTCMonth()];

    const year = newsDate.getUTCFullYear();

    return `${year} ${month} ${day}`;
  };

  // ==========================================================
  // GET NEWS FOR PAGINATION
  // ==========================================================

  const getNews = async (page: number) => {
    try {
      setLoading(true);

      const API_URL =
        process.env.NEXT_PUBLIC_API_URL;

      if (!API_URL) {
        throw new Error(
          "NEXT_PUBLIC_API_URL is not configured"
        );
      }

      const response = await axios.get(
        `${API_URL}/news`,
        {
          params: {
            page,
            pageSize,
          },
        }
      );

      // ======================================================
      // PAGINATED RESPONSE
      // ======================================================

      if (Array.isArray(response.data?.data)) {
        setNews(response.data.data);

        setTotalPages(
          typeof response.data.totalPages ===
            "number"
            ? response.data.totalPages
            : 1
        );

        return;
      }

      // ======================================================
      // OLD ARRAY RESPONSE
      // ======================================================

      if (Array.isArray(response.data)) {
        setNews(response.data);
        setTotalPages(1);

        return;
      }

      // ======================================================
      // INVALID RESPONSE
      // ======================================================

      setNews([]);
      setTotalPages(1);
    } catch (error) {
      console.error(
        "Failed to fetch news:",
        error
      );

      setNews([]);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  };

  // ==========================================================
  // CHANGE PAGE
  // ==========================================================

  const changePage = async (page: number) => {
    if (
      page < 1 ||
      page > totalPages ||
      page === currentPage ||
      loading
    ) {
      return;
    }

    setCurrentPage(page);

    await getNews(page);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // ==========================================================
  // PAGE NUMBERS
  // ==========================================================

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
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

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (currentPage < totalPages - 2) {
      pages.push("...");
    }

    pages.push(totalPages);

    return pages;
  };

  // ==========================================================
  // EMPTY
  // ==========================================================

  if (
    !Array.isArray(news) ||
    news.length === 0
  ) {
    return (
      <main className="min-h-screen bg-[#faf8f6] px-5 py-10">
        <div className="mx-auto max-w-[1280px]">
          <p
            className="
              text-center
              font-[family-name:var(--font-devanagari)]
            "
          >
            कुनै समाचार भेटिएन।
          </p>
        </div>
      </main>
    );
  }

  // ==========================================================
  // FEATURED + GRID
  // ==========================================================

  const featuredNews = news[0];

  const gridNews = news.slice(1);

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

        {/* ==================================================
            PAGE TITLE
        =================================================== */}

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
            ताजा समाचार
          </h1>
        </div>

        {/* ==================================================
            MAIN GRID
        =================================================== */}

        <div
          className="
            grid
            grid-cols-1
            gap-6
            lg:grid-cols-[minmax(0,2fr)_270px]
          "
        >

          {/* =================================================
              LEFT CONTENT
          ================================================== */}

          <div>

            {/* ===============================================
                FEATURED NEWS
            ================================================ */}

            <Link
              href={`/news/${featuredNews.slug}`}
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

                <div
                  className="
                    relative
                    aspect-[16/9]
                    w-full
                    overflow-hidden
                    bg-gray-100
                  "
                >
                  <Image
                    src={featuredNews.image}
                    alt={featuredNews.title}
                    fill
                    priority
                    sizes="
                      (max-width: 1024px) 100vw,
                      850px
                    "
                    className="
                      object-cover
                      transition
                      duration-500
                      hover:scale-105
                    "
                  />
                </div>

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
                    प्रमुख खबर
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
                    {featuredNews.title}
                  </h2>

                  <p
                    className="
                      mt-3
                      line-clamp-2
                      font-[family-name:var(--font-devanagari)]
                      text-sm
                      leading-7
                      text-gray-600
                      sm:text-base
                    "
                  >
                    {featuredNews.content}
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
                      dateTime={featuredNews.created}
                    >
                      {formatTime(
                        featuredNews.created
                      )}
                    </time>
                  </div>

                </div>
              </article>
            </Link>

            {/* =================================================
                NEWS GRID
            ================================================== */}

            {gridNews.length > 0 && (
              <div
                className="
                  mt-6
                  grid
                  grid-cols-1
                  gap-5
                  sm:grid-cols-2
                "
              >
                {gridNews.map((item) => (
                  <Link
                    key={item.id}
                    href={`/news/${item.slug}`}
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

                      <div
                        className="
                          relative
                          aspect-[16/9]
                          w-full
                          overflow-hidden
                          bg-gray-100
                        "
                      >
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          sizes="
                            (max-width: 640px) 100vw,
                            (max-width: 1024px) 50vw,
                            400px
                          "
                          className="
                            object-cover
                            transition
                            duration-500
                            hover:scale-105
                          "
                        />
                      </div>

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
                          {item.title}
                        </h2>

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
                          <Clock size={13} />

                          <time
                            dateTime={item.created}
                          >
                            {formatTime(
                              item.created
                            )}
                          </time>
                        </div>

                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            )}

            {/* =================================================
                PAGINATION
            ================================================== */}

            {totalPages > 1 && (
              <nav
                aria-label="समाचार पृष्ठहरू"
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
                    currentPage === 1 ||
                    loading
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
                      currentPage === 1 ||
                      loading
                        ? "cursor-not-allowed opacity-40"
                        : "hover:bg-gray-100"
                    }
                  `}
                >
                  <ChevronLeft size={16} />
                </button>

                {/* PAGE NUMBERS */}

                {getPageNumbers().map(
                  (page, index) => {
                    if (page === "...") {
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
                        disabled={loading}
                        aria-current={
                          page === currentPage
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
                      totalPages ||
                    loading
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
                        totalPages ||
                      loading
                        ? "cursor-not-allowed opacity-40"
                        : "hover:bg-gray-100"
                    }
                  `}
                >
                  <ChevronRight size={16} />
                </button>

              </nav>
            )}

          </div>

          {/* =================================================
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
                POPULAR NEWS
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
                "
              >
                लोकप्रिय खबरें
              </h2>

              <div>
                {news
                  .slice(0, 5)
                  .map((item, index) => (
                    <Link
                      key={item.id}
                      href={`/news/${item.slug}`}
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
                            hover:text-[#6d001b]
                          "
                        >
                          {item.title}
                        </h3>

                        <p
                          className="
                            mt-1
                            text-[10px]
                            text-gray-500
                          "
                        >
                          {index + 1} दिन अघि
                        </p>

                      </div>
                    </Link>
                  ))}
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
                className="mx-auto text-[#6d001b]"
                size={25}
              />

              <h2
                className="
                  mt-3
                  font-[family-name:var(--font-devanagari)]
                  text-xl
                  font-bold
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
                राजनीतिका हर अहम खबर सीधै आफ्नो
                इनबक्समा पाउनुहोस्।
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