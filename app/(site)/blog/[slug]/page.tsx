import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  Clock,
  Eye,
  MessageCircle,
  Mail,
} from "lucide-react";

import BlogCounter from "@/app/components/BlogCounter";

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

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL;

// ============================================================
// GET BLOG BY SLUG
// ============================================================

async function getBlog(
  slug: string
): Promise<Blog> {
  if (!API_BASE) {
    throw new Error(
      "NEXT_PUBLIC_API_URL is not configured"
    );
  }

  const response = await fetch(
    `${API_BASE}/Blog/slug/${encodeURIComponent(
      slug
    )}`,
    {
      cache: "no-store",
    }
  );

  if (response.status === 404) {
    notFound();
  }

  if (!response.ok) {
    throw new Error(
      "Failed to fetch blog"
    );
  }

  return response.json();
}

// ============================================================
// METADATA
// ============================================================

export async function generateMetadata({
  params,
}: {
  params: Promise<{
    slug: string;
  }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const blog =
    await getBlog(slug);

  // ==========================================================
  // DESCRIPTION
  // ==========================================================

  const description =
    blog.content
      ?.replace(/\s+/g, " ")
      .trim()
      .substring(0, 160) ||
    "प्रश्ना न्यूजबाट पछिल्लो ब्लग पढ्नुहोस्।";

  // ==========================================================
  // IMAGE
  // ==========================================================

  const image =
    blog.heroImageSrc ||
    blog.image ||
    "";

  // ==========================================================
  // CANONICAL URL
  // ==========================================================

  const canonicalUrl =
    `https://www.prashnaa.com/blog/${blog.slug}`;

  // ==========================================================
  // METADATA
  // ==========================================================

  return {
    title: blog.title,

    description,

    alternates: {
      canonical: canonicalUrl,
    },

    openGraph: {
      title: blog.title,

      description,

      url: canonicalUrl,

      siteName: "प्रश्ना न्यूज",

      locale: "ne_NP",

      type: "article",

      publishedTime: blog.date,

      images: image
        ? [
            {
              url: image,
              width: 1200,
              height: 630,
              alt: blog.title,
            },
          ]
        : [],
    },

    twitter: {
      card: "summary_large_image",

      title: blog.title,

      description,

      images: image
        ? [image]
        : [],
    },

    robots: {
      index: true,
      follow: true,

      googleBot: {
        index: true,
        follow: true,

        "max-image-preview":
          "large",

        "max-snippet": -1,

        "max-video-preview":
          -1,
      },
    },
  };
}

// ============================================================
// FORMAT DATE
// ============================================================

function formatDate(
  date: string
) {
  const blogDate =
    new Date(date);

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

  return `${blogDate.getUTCFullYear()} ${
    monthNames[
      blogDate.getUTCMonth()
    ]
  } ${blogDate.getUTCDate()}`;
}

// ============================================================
// PAGE
// ============================================================

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{
    slug: string;
  }>;
}) {
  // ==========================================================
  // GET SLUG
  // ==========================================================

  const { slug } =
    await params;

  // ==========================================================
  // GET BLOG
  // ==========================================================

  const blog =
    await getBlog(slug);

  // ==========================================================
  // IMAGE
  // ==========================================================

  const image =
    blog.heroImageSrc ||
    blog.image;

  // ==========================================================
  // PARAGRAPHS
  // ==========================================================

  const paragraphs =
    blog.content
      ?.split(/\r?\n/)
      .filter(
        (paragraph) =>
          paragraph.trim()
      ) || [];

  // ==========================================================
  // CANONICAL URL
  // ==========================================================

  const canonicalUrl =
    `https://www.prashnaa.com/blog/${blog.slug}`;

  // ==========================================================
  // DESCRIPTION
  // ==========================================================

  const description =
    blog.content
      ?.replace(/\s+/g, " ")
      .trim()
      .substring(0, 160) ||
    "प्रश्ना न्यूजबाट पछिल्लो ब्लग पढ्नुहोस्।";

  // ==========================================================
  // STRUCTURED DATA
  // ==========================================================

  const structuredData = {
    "@context":
      "https://schema.org",

    "@type":
      "BlogPosting",

    headline:
      blog.title,

    description,

    image: image
      ? [image]
      : [],

    datePublished:
      blog.date,

    dateModified:
      blog.date,

    mainEntityOfPage: {
      "@type":
        "WebPage",

      "@id":
        canonicalUrl,
    },

    author: {
      "@type":
        "Organization",

      name:
        "प्रश्ना न्यूज",

      url:
        "https://www.prashnaa.com/",
    },

    publisher: {
      "@type":
        "Organization",

      name:
        "प्रश्ना न्यूज",

      url:
        "https://www.prashnaa.com/",
    },

    inLanguage:
      "ne-NP",
  };

  // ==========================================================
  // PAGE
  // ==========================================================

  return (
    <>
      {/* ======================================================
          JSON-LD
      ======================================================= */}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html:
            JSON.stringify(
              structuredData
            ),
        }}
      />

      {/* ======================================================
          BLOG PAGE
      ======================================================= */}

      <main
        className="
          min-h-screen
          bg-[#faf8f6]
        "
      >
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
              MAIN GRID
          ================================================== */}

          <div
            className="
              grid
              grid-cols-1
              gap-6
              lg:grid-cols-[minmax(0,1fr)_270px]
            "
          >
            {/* =================================================
                ARTICLE
            ================================================== */}

            <article
              className="
                overflow-hidden
                border
                border-[#ead9d9]
                bg-[#fffdfc]
              "
            >
              {/* ===============================================
                  ARTICLE HEADER
              ================================================ */}

              <div
                className="
                  p-5
                  sm:p-8
                "
              >
                {/* =================================================
                    BLOG LABEL
                ================================================== */}

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
                  ब्लग
                </span>

                {/* =================================================
                    TITLE
                ================================================== */}

                <h1
                  className="
                    mt-4
                    font-[family-name:var(--font-devanagari)]
                    text-3xl
                    font-bold
                    leading-tight
                    text-[#171313]
                    sm:text-4xl
                    lg:text-5xl
                  "
                >
                  {blog.title}
                </h1>

                {/* =================================================
                    DATE + COUNTERS + SHARE
                ================================================== */}

                <div
                  className="
                    mt-5
                    flex
                    flex-wrap
                    items-center
                    gap-x-5
                    gap-y-3
                  "
                >
                  {/* =================================================
                      DATE
                  ================================================== */}

                  <div
                    className="
                      flex
                      items-center
                      gap-2
                      text-xs
                      text-gray-500
                    "
                  >
                    <Clock
                      size={14}
                    />

                    <time
                      dateTime={
                        blog.date
                      }
                    >
                      {formatDate(
                        blog.date
                      )}
                    </time>
                  </div>

                  {/* =================================================
                      COMMENTS
                  ================================================== */}

                  <div
                    className="
                      flex
                      items-center
                      gap-2
                      text-xs
                      text-gray-500
                    "
                  >
                    <MessageCircle
                      size={14}
                    />

                    <span>
                      {
                        blog.commentCount
                      }{" "}
                      comments
                    </span>
                  </div>

                  {/* =================================================
                      VIEW + SHARE
                  ================================================== */}

                  <BlogCounter
                    blogId={
                      blog.id
                    }
                    title={
                      blog.title
                    }
                    url={
                      canonicalUrl
                    }
                    initialViewCount={
                      blog.viewCount
                    }
                    initialShareCount={
                      blog.shareCount
                    }
                  />
                </div>
              </div>

              {/* =================================================
                  HERO IMAGE
              ================================================== */}

              {image && (
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
                    src={image}
                    alt={
                      blog.title
                    }
                    className="
                      h-full
                      w-full
                      object-cover
                    "
                  />
                </div>
              )}

              {/* =================================================
                  IMAGE CAPTION
              ================================================== */}

              {image && (
                <p
                  className="
                    px-5
                    pt-2
                    text-[11px]
                    text-gray-500
                    sm:px-8
                  "
                >
                  {blog.title}
                </p>
              )}

              {/* =================================================
                  ARTICLE CONTENT
              ================================================== */}

              <div
                className="
                  px-5
                  py-7
                  sm:px-8
                  sm:py-9
                "
              >
                {/* =================================================
                    PARAGRAPHS
                ================================================== */}

                {paragraphs.map(
                  (
                    paragraph,
                    index
                  ) => {
                    const isPullQuote =
                      blog.pullQuote &&
                      paragraph.includes(
                        blog.pullQuote
                      );

                    if (
                      isPullQuote
                    ) {
                      return null;
                    }

                    return (
                      <p
                        key={
                          index
                        }
                        className="
                          mb-5
                          font-[family-name:var(--font-devanagari)]
                          text-[17px]
                          leading-8
                          text-[#292323]
                          sm:text-lg
                          sm:leading-9
                        "
                      >
                        {
                          paragraph
                        }
                      </p>
                    );
                  }
                )}

                {/* =================================================
                    PULL QUOTE
                ================================================== */}

                {blog.pullQuote && (
                  <blockquote
                    className="
                      my-8
                      border-l-4
                      border-[#6d001b]
                      bg-[#f3eeee]
                      px-5
                      py-5
                      font-[family-name:var(--font-devanagari)]
                      text-xl
                      font-semibold
                      leading-8
                      text-[#6d001b]
                      sm:px-7
                      sm:text-2xl
                    "
                  >
                    “
                    {
                      blog.pullQuote
                    }
                    ”
                  </blockquote>
                )}

                {/* =================================================
                    BOTTOM SHARE
                ================================================== */}

                <div
                  className="
                    mt-10
                    flex
                    items-center
                    justify-between
                    border-t
                    border-[#ead9d9]
                    pt-5
                  "
                >
                  <div>
                    <span
                      className="
                        font-[family-name:var(--font-devanagari)]
                        text-sm
                        text-gray-500
                      "
                    >
                      यो ब्लग शेयर
                      गर्नुहोस्
                    </span>
                  </div>

                  {/* =================================================
                      BOTTOM SHARE BUTTON
                  ================================================== */}

                  <BlogCounter
                    blogId={
                      blog.id
                    }
                    title={
                      blog.title
                    }
                    url={
                      canonicalUrl
                    }
                    initialViewCount={
                      blog.viewCount
                    }
                    initialShareCount={
                      blog.shareCount
                    }
                  />
                </div>
              </div>
            </article>

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
                  FIRST AD
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
                  SECOND AD
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
    </>
  );
}