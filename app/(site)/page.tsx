"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import {
  Clock,
  ChevronLeft,
  ChevronRight,
  Mail,
} from "lucide-react";

// ==========================================
// TYPES
// ==========================================

type Comment = {
  newsId: number;
  content: string;
};

type News = {
  id: number;
  title: string;
  content: string;
  categoryname: string;
  created: string;
  image: string | null;
  comments?: Comment[] | null;
};

type PagedNewsResponse = {
  data?: News[];
  items?: News[];
  currentPage?: number;
  pageSize?: number;
  totalItems?: number;
  totalPages?: number;

  // Support .NET responses with different casing
  Data?: News[];
  Items?: News[];
  CurrentPage?: number;
  PageSize?: number;
  TotalItems?: number;
  TotalPages?: number;
};

// ==========================================
// COMPONENT
// ==========================================

export default function NewsPage() {
  const router = useRouter();

  // ==========================================
  // STATE
  // ==========================================

  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // ==========================================
  // API URL
  // ==========================================

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  // ==========================================
  // FETCH NEWS
  // ==========================================

  useEffect(() => {
    const getNews = async () => {
      try {
        setLoading(true);
        setError("");

        if (!API_URL) {
          throw new Error(
            "NEXT_PUBLIC_API_URL is not configured."
          );
        }

        const response = await axios.get<PagedNewsResponse>(
          `${API_URL}/news`,
          {
            params: {
              page: currentPage,
              pageSize: 10,
            },
          }
        );

        console.log("================================");
        console.log("NEWS API RESPONSE:");
        console.log(response.data);
        console.log("================================");

        const result = response.data;

        // ==========================================
        // GET NEWS ARRAY SAFELY
        // ==========================================

        const newsData: News[] =
          Array.isArray(result.data)
            ? result.data
            : Array.isArray(result.items)
            ? result.items
            : Array.isArray(result.Data)
            ? result.Data
            : Array.isArray(result.Items)
            ? result.Items
            : [];

        // ==========================================
        // GET TOTAL PAGES SAFELY
        // ==========================================

        const pages = Number(
          result.totalPages ??
            result.TotalPages ??
            1
        );

        // ==========================================
        // SET STATE
        // ==========================================

        setNews(newsData);

        setTotalPages(
          Number.isFinite(pages) && pages > 0
            ? pages
            : 1
        );

        console.log("NEWS ARRAY:", newsData);
        console.log("TOTAL PAGES:", pages);
      } catch (error) {
        console.error(
          "Failed to fetch news:",
          error
        );

        setNews([]);
        setTotalPages(1);

        if (axios.isAxiosError(error)) {
          if (error.response) {
            setError(
              `समाचार लोड गर्न सकिएन। Server error: ${error.response.status}`
            );
          } else if (error.request) {
            setError(
              "Server सँग सम्पर्क हुन सकेन।"
            );
          } else {
            setError(
              "समाचार लोड गर्दा समस्या भयो।"
            );
          }
        } else if (error instanceof Error) {
          setError(error.message);
        } else {
          setError(
            "समाचार लोड गर्दा समस्या भयो।"
          );
        }
      } finally {
        setLoading(false);
      }
    };

    getNews();
  }, [currentPage, API_URL]);

  // ==========================================
  // OPEN NEWS
  // ==========================================

  const openNews = (id: number) => {
    router.push(`/News/${id}`);
  };

  // ==========================================
  // FORMAT DATE
  // ==========================================

  const formatTime = (date: string) => {
    if (!date) {
      return "मिति उपलब्ध छैन";
    }

    const newsDate = new Date(date);

    if (Number.isNaN(newsDate.getTime())) {
      return "मिति उपलब्ध छैन";
    }

    return newsDate.toLocaleDateString("ne-NP", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // ==========================================
  // PREVIOUS PAGE
  // ==========================================

  const previousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  // ==========================================
  // NEXT PAGE
  // ==========================================

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <main className="min-h-screen bg-[#faf8f6] px-5 py-10">
        <div className="mx-auto max-w-[1280px]">
          <div className="flex min-h-[300px] items-center justify-center">
            <p
              className="
                font-[family-name:var(--font-devanagari)]
                text-lg
                text-gray-600
              "
            >
              समाचार लोड हुँदैछ...
            </p>
          </div>
        </div>
      </main>
    );
  }

  // ==========================================
  // ERROR
  // ==========================================

  if (error) {
    return (
      <main className="min-h-screen bg-[#faf8f6] px-5 py-10">
        <div className="mx-auto max-w-[1280px]">
          <div className="flex min-h-[300px] flex-col items-center justify-center">
            <p
              className="
                font-[family-name:var(--font-devanagari)]
                text-lg
                font-semibold
                text-red-700
              "
            >
              {error}
            </p>

            <button
              onClick={() => window.location.reload()}
              className="
                mt-5
                bg-[#6d001b]
                px-5
                py-2.5
                font-[family-name:var(--font-devanagari)]
                text-sm
                font-bold
                text-white
                transition
                hover:opacity-90
              "
            >
              पुनः प्रयास गर्नुहोस्
            </button>
          </div>
        </div>
      </main>
    );
  }

  // ==========================================
  // NO NEWS
  // ==========================================

  if (!Array.isArray(news) || news.length === 0) {
    return (
      <main className="min-h-screen bg-[#faf8f6] px-5 py-10">
        <div className="mx-auto max-w-[1280px]">
          <div className="flex min-h-[300px] items-center justify-center">
            <p
              className="
                font-[family-name:var(--font-devanagari)]
                text-lg
                text-gray-600
              "
            >
              कुनै समाचार भेटिएन।
            </p>
          </div>

          {/* PAGINATION */}
          <div className="mt-8 flex items-center justify-center gap-2">
            <button
              onClick={previousPage}
              disabled={currentPage === 1}
              className="
                flex
                h-9
                w-9
                items-center
                justify-center
                border
                border-[#ead9d9]
                bg-white
                text-gray-600
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >
              <ChevronLeft size={16} />
            </button>

            <div
              className="
                flex
                h-9
                min-w-9
                items-center
                justify-center
                border
                border-[#6d001b]
                bg-[#6d001b]
                px-3
                text-sm
                text-white
              "
            >
              {currentPage}
            </div>

            <span className="text-sm text-gray-600">
              of {totalPages}
            </span>

            <button
              onClick={nextPage}
              disabled={currentPage >= totalPages}
              className="
                flex
                h-9
                w-9
                items-center
                justify-center
                border
                border-[#ead9d9]
                bg-white
                text-gray-600
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </main>
    );
  }

  // ==========================================
  // FEATURED NEWS
  // ==========================================

  const featuredNews = news[0];

  // ==========================================
  // GRID NEWS
  // ==========================================

  const gridNews = news.slice(1);

  // ==========================================
  // RETURN
  // ==========================================

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
        {/* ==========================================
            CATEGORY TITLE
        ========================================== */}

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
            {featuredNews.categoryname || "राजनीति"}
          </h1>
        </div>

        {/* ==========================================
            MAIN LAYOUT
        ========================================== */}

        <div
          className="
            grid
            grid-cols-1
            gap-6
            lg:grid-cols-[minmax(0,2fr)_270px]
          "
        >
          {/* ========================================
              LEFT CONTENT
          ======================================== */}

          <div>
            {/* ======================================
                FEATURED NEWS
            ====================================== */}

            <article
              onClick={() =>
                openNews(featuredNews.id)
              }
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
                  src={
                    featuredNews.image ||
                    "/images/default-news.jpg"
                  }
                  alt={
                    featuredNews.title ||
                    "समाचार"
                  }
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
                {/* LABEL */}

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

                {/* TITLE */}

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
                  {featuredNews.title ||
                    "शीर्षक उपलब्ध छैन"}
                </h2>

                {/* DESCRIPTION */}

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
                  {featuredNews.content ||
                    "समाचार विवरण उपलब्ध छैन।"}
                </p>

                {/* DATE */}

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

                  <span>
                    {formatTime(
                      featuredNews.created
                    )}
                  </span>
                </div>
              </div>
            </article>

            {/* ======================================
                NEWS GRID
            ====================================== */}

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
                  <article
                    key={item.id}
                    onClick={() =>
                      openNews(item.id)
                    }
                    className="
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
                        src={
                          item.image ||
                          "/images/default-news.jpg"
                        }
                        alt={
                          item.title ||
                          "समाचार"
                        }
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
                      <h3
                        className="
                          line-clamp-2
                          font-[family-name:var(--font-devanagari)]
                          text-lg
                          font-bold
                          leading-snug
                          text-[#171313]
                        "
                      >
                        {item.title ||
                          "शीर्षक उपलब्ध छैन"}
                      </h3>

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

                        <span>
                          {formatTime(
                            item.created
                          )}
                        </span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}

            {/* ======================================
                PAGINATION
            ====================================== */}

            <div
              className="
                mt-12
                flex
                items-center
                justify-center
                gap-2
                border-t
                border-[#ead9d9]
                pt-5
              "
            >
              {/* PREVIOUS */}

              <button
                onClick={previousPage}
                disabled={currentPage === 1}
                aria-label="Previous page"
                className="
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
                  hover:bg-gray-100
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                "
              >
                <ChevronLeft size={16} />
              </button>

              {/* CURRENT PAGE */}

              <div
                className="
                  flex
                  h-9
                  min-w-9
                  items-center
                  justify-center
                  border
                  border-[#6d001b]
                  bg-[#6d001b]
                  px-3
                  text-sm
                  text-white
                "
              >
                {currentPage}
              </div>

              {/* TOTAL */}

              <span className="text-sm text-gray-600">
                of {totalPages}
              </span>

              {/* NEXT */}

              <button
                onClick={nextPage}
                disabled={
                  currentPage >= totalPages
                }
                aria-label="Next page"
                className="
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
                  hover:bg-gray-100
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                "
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          {/* ========================================
              RIGHT SIDEBAR
          ======================================== */}

          <aside className="space-y-6">
            {/* ======================================
                POPULAR NEWS
            ====================================== */}

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
                    <div
                      key={item.id}
                      onClick={() =>
                        openNews(item.id)
                      }
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
                        {item.title ||
                          "शीर्षक उपलब्ध छैन"}
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
                  ))}
              </div>
            </section>

            {/* ======================================
                NEWSLETTER
            ====================================== */}

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
                राजनीतिका हर अहम खबर सीधै
                अपने इनबक्समा पाउनुहोस्।
              </p>

              <input
                type="email"
                placeholder="आपका ईमेल पता"
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
                className="
                  mt-2
                  w-full
                  bg-[#6d001b]
                  py-2.5
                  font-[family-name:var(--font-devanagari)]
                  text-xs
                  font-bold
                  text-white
                  transition
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