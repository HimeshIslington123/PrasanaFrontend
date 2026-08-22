"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import { Clock, ChevronLeft, ChevronRight, Mail } from "lucide-react";

type News = {
  id: number;
  title: string;
  content: string;
  categoryname: string;
  created: string;
  image: string;
  comments:
    | {
        newsId: number;
        content: string;
      }[]
    | null;
};

export default function NewsPage() {
  const router = useRouter();

  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getNews = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/news`,
        );

        setNews(response.data);
      } catch (error) {
        console.error("Failed to fetch news:", error);
      } finally {
        setLoading(false);
      }
    };

    getNews();
  }, []);

  // THIS OPENS THE INDIVIDUAL NEWS PAGE
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

  if (loading) {
    return (
      <main className="min-h-screen bg-[#faf8f6] px-5 py-10">
        <div className="mx-auto max-w-[1280px]">
          <p className="text-center">समाचार लोड हुँदैछ...</p>
        </div>
      </main>
    );
  }

  if (news.length === 0) {
    return (
      <main className="min-h-screen bg-[#faf8f6] px-5 py-10">
        <div className="mx-auto max-w-[1280px]">
          <p className="text-center">कुनै समाचार भेटिएन।</p>
        </div>
      </main>
    );
  }

  const featuredNews = news[0];
  const gridNews = news.slice(1);

  return (
    <main className="min-h-screen bg-[#faf8f6]">
      <div className="mx-auto max-w-[1280px] px-4 py-8 sm:px-6 lg:px-8">
        {/* CATEGORY */}

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

        {/* MAIN GRID */}

        <div
          className="
            grid
            grid-cols-1
            gap-6
            lg:grid-cols-[minmax(0,2fr)_270px]
          "
        >
          {/* LEFT */}

          <div>
            {/* FEATURED NEWS */}

            <article
              onClick={() => openNews(featuredNews.id)}
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

              <div className="p-5 sm:p-6">
                <span
                  className="
                    inline-block
                    border
                    border-[#8a1d36]
                    px-2
                    py-1
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

                  <span>{formatTime(featuredNews.created)}</span>
                </div>
              </div>
            </article>

            {/* OTHER NEWS */}

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

                  <div className="p-4">
                    <h3
                      className="
                        line-clamp-2
                        text-lg
                        font-bold
                        leading-snug
                        text-[#171313]
                      "
                    >
                      {item.title}
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

                      <span>{formatTime(item.created)}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* PAGINATION */}

            <div
              className="
                mt-12
                flex
                items-center
                justify-center
                gap-1
                border-t
                border-[#ead9d9]
                pt-5
              "
            >
              <button className="flex h-9 w-9 items-center justify-center border">
                <ChevronLeft size={16} />
              </button>

              <button
                className="
                  h-9
                  w-9
                  border
                  border-[#6d001b]
                  bg-[#6d001b]
                  text-white
                "
              >
                1
              </button>

              <button className="h-9 w-9 border">2</button>

              <button className="h-9 w-9 border">3</button>

              <span className="px-2">...</span>

              <button className="flex h-9 w-9 items-center justify-center border">
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          {/* RIGHT SIDEBAR */}

          <aside className="space-y-6">
            {/* POPULAR */}

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
                  text-xl
                  font-bold
                "
              >
                लोकप्रिय खबरें
              </h2>

              <div>
                {news.slice(0, 5).map((item, index) => (
                  <div
                    key={item.id}
                    onClick={() => openNews(item.id)}
                    className="
                      cursor-pointer
                      border-b
                      border-[#ead9d9]
                      py-4
                    "
                  >
                    <h3
                      className="
                        line-clamp-2
                        text-sm
                        font-medium
                        leading-6
                        hover:text-[#6d001b]
                      "
                    >
                      {item.title}
                    </h3>

                    <p className="mt-1 text-[10px] text-gray-500">
                      {index + 1} दिन अघि
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* NEWSLETTER */}

            <section
              className="
                border
                border-[#ead9d9]
                bg-[#f3eeee]
                p-5
                text-center
              "
            >
              <Mail className="mx-auto text-[#6d001b]" size={25} />

              <h2 className="mt-3 text-xl font-bold">न्यूजलेटर</h2>

              <p className="mt-2 text-xs leading-5 text-gray-600">
                राजनीतिका हर अहम खबर सीधै अपने इनबक्स में पाएं।
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
                "
              />

              <button
                className="
                  mt-2
                  w-full
                  bg-[#6d001b]
                  py-2.5
                  text-xs
                  font-bold
                  text-white
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
