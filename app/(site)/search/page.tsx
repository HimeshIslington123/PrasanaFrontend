"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import { Search, Clock } from "lucide-react";

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
};

// ============================================================
// MAIN PAGE
// ============================================================

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-[#faf8f6]">
          <div className="flex min-h-[500px] items-center justify-center">
            <p className="font-[family-name:var(--font-devanagari)] text-gray-600">
              लोड हुँदैछ...
            </p>
          </div>
        </main>
      }
    >
      <SearchContent />
    </Suspense>
  );
}

// ============================================================
// SEARCH CONTENT
// ============================================================

function SearchContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get ?q=नेपाल from URL
  const query = searchParams.get("q") || "";

  const [searchText, setSearchText] = useState(query);
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);

  // ============================================================
  // KEEP INPUT SYNCHRONIZED WITH URL
  // ============================================================

  useEffect(() => {
    setSearchText(query);
  }, [query]);

  // ============================================================
  // FETCH SEARCH RESULTS
  // ============================================================

  useEffect(() => {
    const searchNews = async () => {
      // If there is no search query
      if (!query.trim()) {
        setNews([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);

        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/news/search`,
          {
            params: {
              q: query,
            },
          }
        );

        setNews(response.data);
      } catch (error) {
        console.error("Failed to search news:", error);
        setNews([]);
      } finally {
        setLoading(false);
      }
    };

    searchNews();
  }, [query]);

  // ============================================================
  // NEW SEARCH
  // ============================================================

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimmedSearch = searchText.trim();

    if (!trimmedSearch) return;

    router.push(
      `/search?q=${encodeURIComponent(trimmedSearch)}`
    );
  };

  // ============================================================
  // OPEN INDIVIDUAL NEWS
  // ============================================================

  const openNews = (id: number) => {
    router.push(`/News/${id}`);
  };

  // ============================================================
  // FORMAT DATE
  // ============================================================

  const formatTime = (date: string) => {
    if (!date) return "";

    const newsDate = new Date(date);

    return newsDate.toLocaleDateString("ne-NP", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // ============================================================
  // UI
  // ============================================================

  return (
    <main className="min-h-screen bg-[#faf8f6]">

      <div className="mx-auto max-w-[1280px] px-4 py-10 sm:px-6 lg:px-8">

        {/* ====================================================
            PAGE TITLE
        ==================================================== */}

        <div className="mb-8">

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
            समाचार खोज्नुहोस्
          </h1>

        </div>

        {/* ====================================================
            SEARCH FORM
        ==================================================== */}

        <form
          onSubmit={handleSearch}
          className="mb-10 flex gap-3"
        >

          <input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="समाचार खोज्नुहोस्..."
            className="
              w-full
              border
              border-[#ead9d9]
              bg-white
              px-4
              py-3
              font-[family-name:var(--font-devanagari)]
              text-base
              text-[#171313]
              outline-none
              focus:border-[#6d001b]
            "
          />

          <button
            type="submit"
            className="
              flex
              shrink-0
              items-center
              gap-2
              bg-[#6d001b]
              px-5
              py-3
              font-[family-name:var(--font-devanagari)]
              font-bold
              text-white
              transition
              hover:opacity-90
            "
          >
            <Search size={18} />

            <span className="hidden sm:inline">
              खोज्नुहोस्
            </span>

          </button>

        </form>

        {/* ====================================================
            INITIAL STATE - NO SEARCH YET
        ==================================================== */}

        {!query && !loading && (
          <div className="py-16 text-center">

            <p
              className="
                font-[family-name:var(--font-devanagari)]
                text-lg
                text-gray-500
              "
            >
              खोज्नको लागि माथि कुनै शब्द लेख्नुहोस्।
            </p>

          </div>
        )}

        {/* ====================================================
            SEARCH RESULT TEXT
        ==================================================== */}

        {query && (
          <p
            className="
              mb-7
              font-[family-name:var(--font-devanagari)]
              text-lg
              text-gray-600
            "
          >
            <span className="font-bold">
              "{query}"
            </span>{" "}
            का लागि खोज परिणाम
          </p>
        )}

        {/* ====================================================
            LOADING
        ==================================================== */}

        {loading && query && (
          <div className="py-16 text-center">

            <p
              className="
                font-[family-name:var(--font-devanagari)]
                text-gray-600
              "
            >
              समाचार खोजिँदैछ...
            </p>

          </div>
        )}

        {/* ====================================================
            NO RESULTS
        ==================================================== */}

        {!loading && query && news.length === 0 && (
          <div className="py-16 text-center">

            <p
              className="
                font-[family-name:var(--font-devanagari)]
                text-xl
                font-bold
                text-[#171313]
              "
            >
              कुनै समाचार भेटिएन।
            </p>

            <p
              className="
                mt-2
                font-[family-name:var(--font-devanagari)]
                text-sm
                text-gray-500
              "
            >
              अर्को शब्द प्रयोग गरेर खोज्नुहोस्।
            </p>

          </div>
        )}

        {/* ====================================================
            NEWS RESULTS
        ==================================================== */}

        {!loading && news.length > 0 && (

          <div
            className="
              grid
              grid-cols-1
              gap-5
              sm:grid-cols-2
              lg:grid-cols-3
            "
          >

            {news.map((item) => (

              <article
                key={item.id}
                onClick={() => openNews(item.id)}
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

                  {item.image ? (
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
                  ) : (
                    <div
                      className="
                        flex
                        h-full
                        items-center
                        justify-center
                        font-[family-name:var(--font-devanagari)]
                        text-sm
                        text-gray-400
                      "
                    >
                      कुनै तस्बिर छैन
                    </div>
                  )}

                </div>

                {/* CONTENT */}

                <div className="p-4">

                  {/* CATEGORY */}

                  {item.categoryname && (
                    <span
                      className="
                        font-[family-name:var(--font-devanagari)]
                        text-xs
                        font-bold
                        text-[#6d001b]
                      "
                    >
                      {item.categoryname}
                    </span>
                  )}

                  {/* TITLE */}

                  <h2
                    className="
                      mt-2
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

                  {/* CONTENT */}

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
                    {item.content}
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
                      {formatTime(item.created)}
                    </span>

                  </div>

                </div>

              </article>

            ))}

          </div>

        )}

      </div>

    </main>
  );
}