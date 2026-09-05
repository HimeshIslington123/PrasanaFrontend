import ArticlePage from "@/app/components/ArticlePage";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

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

  caption?: string | null;

  pullQuote?: string | null;

  shareCount: number;

  viewCount: number;

  heroImageSrc?: string | null;

  comments:
    | {
        newsId: number;
        content: string;
      }[]
    | null;
};

// ============================================================
// API
// ============================================================

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL;

// ============================================================
// GET NEWS BY SLUG
// ============================================================

async function getNews(
  slug: string
): Promise<News> {
  if (!API_BASE) {
    throw new Error(
      "NEXT_PUBLIC_API_URL environment variable is not configured"
    );
  }

  const response =
    await fetch(
      `${API_BASE}/News/slug/${encodeURIComponent(
        slug
      )}`,
      {
        cache: "no-store",
      }
    );

  // ==========================================================
  // NOT FOUND
  // ==========================================================

  if (
    response.status === 404
  ) {
    notFound();
  }

  // ==========================================================
  // OTHER API ERROR
  // ==========================================================

  if (!response.ok) {
    throw new Error(
      "Failed to fetch news"
    );
  }

  // ==========================================================
  // RETURN NEWS
  // ==========================================================

  return response.json();
}

// ============================================================
// SEO METADATA
// ============================================================

export async function generateMetadata({
  params,
}: {
  params: Promise<{
    slug: string;
  }>;
}): Promise<Metadata> {
  const { slug } =
    await params;

  const news =
    await getNews(slug);

  // ==========================================================
  // DESCRIPTION
  // ==========================================================

  const description =
    news.content
      ?.replace(/\s+/g, " ")
      .trim()
      .substring(0, 160) ||
    "प्रश्ना न्यूजबाट पछिल्लो समाचार पढ्नुहोस्।";

  // ==========================================================
  // CANONICAL URL
  // ==========================================================

  const canonicalUrl =
    `https://www.prashnaa.com/news/${news.slug}`;

  // ==========================================================
  // METADATA
  // ==========================================================

  return {
    title: news.title,

    description,

    alternates: {
      canonical:
        canonicalUrl,
    },

    // ========================================================
    // OPEN GRAPH
    // ========================================================

    openGraph: {
      title: news.title,

      description,

      url: canonicalUrl,

      siteName: "प्रश्ना न्यूज",

      locale: "ne_NP",

      type: "article",

      publishedTime:
        news.created,

      images: news.image
        ? [
            {
              url: news.image,

              width: 1200,

              height: 630,

              /*
               * IMPORTANT:
               * Use heroImageSrc as image ALT.
               */
              alt:
                news.heroImageSrc ||
                news.title,
            },
          ]
        : [],
    },

    // ========================================================
    // TWITTER
    // ========================================================

    twitter: {
      card:
        "summary_large_image",

      title: news.title,

      description,

      images: news.image
        ? [news.image]
        : [],
    },

    // ========================================================
    // ROBOTS
    // ========================================================

    robots: {
      index: true,

      follow: true,

      googleBot: {
        index: true,

        follow: true,

        "max-image-preview":
          "large",

        "max-snippet":
          -1,

        "max-video-preview":
          -1,
      },
    },
  };
}

// ============================================================
// ARTICLE PAGE
// ============================================================

export default async function NewsDetailPage({
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
  // GET NEWS
  // ==========================================================

  const news =
    await getNews(slug);

  // ==========================================================
  // DESCRIPTION
  // ==========================================================

  const description =
    news.content
      ?.replace(/\s+/g, " ")
      .trim()
      .substring(0, 160) ||
    "प्रश्ना न्यूजबाट पछिल्लो समाचार पढ्नुहोस्।";

  // ==========================================================
  // CANONICAL URL
  // ==========================================================

  const canonicalUrl =
    `https://www.prashnaa.com/news/${news.slug}`;

  // ==========================================================
  // STRUCTURED DATA
  // ==========================================================

  const structuredData = {
    "@context":
      "https://schema.org",

    "@type":
      "NewsArticle",

    headline:
      news.title,

    description,

    image: news.image
      ? [news.image]
      : [],

    datePublished:
      news.created,

    dateModified:
      news.created,

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

    articleSection:
      news.categoryname,

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
          ARTICLE
      ======================================================= */}

      <ArticlePage
        id={news.id}

        title={
          news.title
        }

        // ======================================================
        // ARTICLE BODY
        // ======================================================

        paragraphs={
          news.content
            ?.split("\n")
            .map(
              (
                paragraph
              ) =>
                paragraph.trim()
            )
            .filter(Boolean) ||
          []
        }

        // ======================================================
        // CATEGORY
        // ======================================================

        category={
          news.categoryname
        }

        // ======================================================
        // DATE
        // ======================================================

        publishedAt={
          news.created
        }

        // ======================================================
        // HERO IMAGE URL
        // ======================================================

        heroImageSrc={
          news.image
        }

        // ======================================================
        // HERO IMAGE ALT
        // ======================================================

        /*
         * Your API gives:
         *
         * image:
         * "https://res.cloudinary....jpg"
         *
         * heroImageSrc:
         * "Lionel Messi playing for Argentina"
         *
         * So:
         *
         * heroImageSrc = actual image
         * heroImageAlt = description
         */

        heroImageAlt={
          news.heroImageSrc ||
          news.title
        }

        // ======================================================
        // CAPTION
        // ======================================================

        caption={
          news.caption
        }

        // ======================================================
        // PULL QUOTE
        // ======================================================

        pullQuote={
          news.pullQuote
        }

        // ======================================================
        // COMMENTS
        // ======================================================

        comments={
          news.comments ?? []
        }

        // ======================================================
        // VIEW COUNT
        // ======================================================

        initialViewCount={
          news.viewCount ?? 0
        }

        // ======================================================
        // SHARE COUNT
        // ======================================================

        initialShareCount={
          news.shareCount ?? 0
        }
      />
    </>
  );
}