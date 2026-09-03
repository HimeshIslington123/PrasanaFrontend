import type { Metadata } from "next";
import HomeNews from "../components/HomeNews";

// ============================================================
// TYPES
// ============================================================

export type News = {
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

export type NewsResponse = {
  data: News[];
  currentPage: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
};

// ============================================================
// METADATA
// ============================================================

export const metadata: Metadata = {
  title: "प्रश्ना न्यूज | ताजा तथा विश्वसनीय समाचार",

  description:
    "नेपालका ताजा तथा विश्वसनीय समाचार पढ्नुहोस्। राजनीति, समाज, अर्थतन्त्र, खेलकुद, मनोरञ्जन, प्रविधि तथा विश्वका नवीनतम समाचार।",

  keywords: [
    "प्रश्ना न्यूज",
    "Prashnaa News",
    "नेपाली समाचार",
    "नेपाल समाचार",
    "ताजा समाचार",
    "आजको समाचार",
    "राजनीति समाचार",
    "समाज समाचार",
    "अर्थतन्त्र समाचार",
    "खेलकुद समाचार",
    "मनोरञ्जन समाचार",
    "प्रविधि समाचार",
  ],

  alternates: {
    canonical: "https://www.prashnaa.com/",
  },

  openGraph: {
    title:
      "प्रश्ना न्यूज | ताजा तथा विश्वसनीय समाचार",

    description:
      "नेपालका ताजा तथा विश्वसनीय समाचार पढ्नुहोस्। राजनीति, समाज, अर्थतन्त्र, खेलकुद, मनोरञ्जन, प्रविधि तथा विश्व समाचार।",

    url: "https://www.prashnaa.com/",

    siteName: "प्रश्ना न्यूज",

    locale: "ne_NP",

    type: "website",
  },

  twitter: {
    card: "summary_large_image",

    title:
      "प्रश्ना न्यूज | ताजा तथा विश्वसनीय समाचार",

    description:
      "नेपालका ताजा तथा विश्वसनीय समाचार पढ्नुहोस्।",
  },

  robots: {
    index: true,
    follow: true,
  },
};

// ============================================================
// SERVER-SIDE NEWS FETCH
// ============================================================

async function getNews(): Promise<NewsResponse> {
  // IMPORTANT:
  // Server Component => use API_URL
  // NOT NEXT_PUBLIC_API_URL

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  if (!API_URL) {
    throw new Error(
      "API_URL environment variable is not configured"
    );
  }

  const response = await fetch(
    `${API_URL}/news?page=1&pageSize=10`,
    {
      next: {
        revalidate: 60,
      },
    }
  );

  if (!response.ok) {
    throw new Error(
      `Failed to fetch news: ${response.status}`
    );
  }

  const data = await response.json();

  // ==========================================================
  // PAGINATED RESPONSE
  // ==========================================================

  if (Array.isArray(data?.data)) {
    return {
      data: data.data,

      currentPage:
        typeof data.currentPage === "number"
          ? data.currentPage
          : 1,

      pageSize:
        typeof data.pageSize === "number"
          ? data.pageSize
          : 10,

      totalItems:
        typeof data.totalItems === "number"
          ? data.totalItems
          : data.data.length,

      totalPages:
        typeof data.totalPages === "number"
          ? data.totalPages
          : 1,
    };
  }

  // ==========================================================
  // OLD ARRAY RESPONSE
  // ==========================================================

  if (Array.isArray(data)) {
    return {
      data,

      currentPage: 1,

      pageSize: data.length,

      totalItems: data.length,

      totalPages: 1,
    };
  }

  // ==========================================================
  // INVALID RESPONSE
  // ==========================================================

  return {
    data: [],

    currentPage: 1,

    pageSize: 10,

    totalItems: 0,

    totalPages: 1,
  };
}

// ============================================================
// HOME PAGE
// ============================================================

export default async function HomePage() {
  let newsResponse: NewsResponse = {
    data: [],

    currentPage: 1,

    pageSize: 10,

    totalItems: 0,

    totalPages: 1,
  };

  try {
    newsResponse = await getNews();
  } catch (error) {
    console.error(
      "Homepage news fetch failed:",
      error
    );
  }

  return (
    <HomeNews
      initialNews={newsResponse.data}
      initialTotalPages={
        newsResponse.totalPages
      }
    />
  );
}