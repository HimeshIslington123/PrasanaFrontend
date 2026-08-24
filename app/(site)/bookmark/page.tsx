"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import { Bookmark, Clock } from "lucide-react";

type BookmarkItem = {
  id: number;
  title: string;
  content: string;
  categoryname: string;
  created: string;
  image: string;
  comments: {
    newsId: number;
    content: string;
  }[] | null;
  pullQuote: string;
  heroImageSrc: string | null;
};

export default function BookmarkPage() {
  const router = useRouter();

  const [bookmarks, setBookmarks] = useState<BookmarkItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getBookmarks = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/Bookmark/getall`,
          {
            withCredentials: true,
          }
        );

        setBookmarks(response.data);
      } catch (error) {
        console.error("Failed to fetch bookmarks:", error);
      } finally {
        setLoading(false);
      }
    };

    getBookmarks();
  }, []);

  const openNews = (id: number) => {
    router.push(`/News/${id}`);
  };

  const formatTime = (date: string) => {
    const newsDate = new Date(date);

    return newsDate.toLocaleDateString("ne-NP", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Loading
  if (loading) {
    return (
      <main className="min-h-screen bg-[#faf8f6] px-5 py-10">
        <div className="mx-auto max-w-[1280px]">
          <p
            className="
              text-center
              font-[family-name:var(--font-devanagari)]
            "
          >
            बुकमार्क लोड हुँदैछ...
          </p>
        </div>
      </main>
    );
  }

  // No bookmarks
  if (bookmarks.length === 0) {
    return (
      <main className="min-h-screen bg-[#faf8f6] px-5 py-10">
        <div className="mx-auto max-w-[1280px]">
          <div
            className="
              border
              border-[#ead9d9]
              bg-[#fffdfc]
              p-10
              text-center
            "
          >
            <Bookmark
              className="mx-auto text-[#6d001b]"
              size={40}
            />

            <h1
              className="
                mt-4
                font-[family-name:var(--font-devanagari)]
                text-2xl
                font-bold
                text-[#171313]
              "
            >
              कुनै बुकमार्क भेटिएन।
            </h1>

            <p
              className="
                mt-2
                font-[family-name:var(--font-devanagari)]
                text-sm
                text-gray-500
              "
            >
              तपाईंले सेभ गरेका समाचारहरू यहाँ देखिनेछन्।
            </p>
          </div>
        </div>
      </main>
    );
  }

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
        {/* PAGE TITLE */}

        <div className="mb-7">
          <h1
            className="
              inline-flex
              items-center
              gap-2
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
            <Bookmark size={30} />

            मेरा बुकमार्क
          </h1>
        </div>

        {/* BOOKMARK GRID */}

        <div
          className="
            grid
            grid-cols-1
            gap-5
            sm:grid-cols-2
            lg:grid-cols-3
          "
        >
          {bookmarks.map((item) => (
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

                {/* BOOKMARK ICON */}

                <div
                  className="
                    absolute
                    right-3
                    top-3
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    bg-[#6d001b]
                    text-white
                  "
                >
                  <Bookmark
                    size={18}
                    fill="currentColor"
                  />
                </div>
              </div>

              {/* CONTENT */}

              <div className="p-4">
                {/* CATEGORY */}

                <span
                  className="
                    inline-block
                    border
                    border-[#8a1d36]
                    px-2
                    py-1
                    font-[family-name:var(--font-devanagari)]
                    text-[10px]
                    font-bold
                    text-[#6d001b]
                  "
                >
                  {item.categoryname || "समाचार"}
                </span>

                {/* TITLE */}

                <h2
                  className="
                    mt-3
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
      </div>
    </main>
  );
}