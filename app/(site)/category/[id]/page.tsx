import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

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
};

const API_BASE = process.env.NEXT_PUBLIC_API_URL;

// ============================================================
// GET CATEGORY NEWS
// ============================================================

async function getCategoryNews(
  id: string
): Promise<News[]> {
  if (!API_BASE) {
    throw new Error(
      "API_URL environment variable is not configured"
    );
  }

  const response = await fetch(
    `${API_BASE}/news/${id}/byCategory`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error(
      "Failed to fetch category news"
    );
  }

  return response.json();
}

// ============================================================
// SEO METADATA
// ============================================================

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;

  const news = await getCategoryNews(id);

  const categoryName =
    news.length > 0
      ? news[0].categoryname
      : "समाचार";

  const description =
    `${categoryName} सम्बन्धी ताजा तथा विश्वसनीय समाचारहरू प्रश्ना न्यूजमा पढ्नुहोस्।`;

  return {
    title: `${categoryName} | प्रश्ना न्यूज`,

    description,

    alternates: {
      canonical:
        `https://www.prashnaa.com/category/${id}`,
    },

    openGraph: {
      title: `${categoryName} | प्रश्ना न्यूज`,

      description,

      url:
        `https://www.prashnaa.com/category/${id}`,

      siteName: "प्रश्ना न्यूज",

      locale: "ne_NP",

      type: "website",
    },

    twitter: {
      card: "summary_large_image",

      title: `${categoryName} | प्रश्ना न्यूज`,

      description,
    },

    robots: {
      index: true,
      follow: true,
    },
  };
}

// ============================================================
// CATEGORY PAGE
// ============================================================

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const news = await getCategoryNews(id);

  if (!news || news.length === 0) {
    return (
      <main className="mx-auto max-w-[1728px] px-6 py-20">
        <h1
          className="
            font-[family-name:var(--font-devanagari)]
            text-3xl
            font-bold
          "
        >
          कुनै समाचार भेटिएन
        </h1>
      </main>
    );
  }

  const categoryName = news[0].categoryname;

  return (
    <main className="mx-auto max-w-[1728px] px-6 py-10">

      {/* ======================================================
          CATEGORY TITLE
      ======================================================= */}

      <div className="mb-10">
        <h1
          className="
            font-[family-name:var(--font-devanagari)]
            text-3xl
            font-bold
          "
        >
          {categoryName}
        </h1>

        <div
          className="
            mt-3
            h-[3px]
            w-16
            bg-[var(--primary)]
          "
        />
      </div>

      {/* ======================================================
          NEWS GRID
      ======================================================= */}

      <div
        className="
          grid
          grid-cols-1
          gap-8
          md:grid-cols-2
          lg:grid-cols-3
        "
      >
        {news.map((item) => (
          <Link
            key={item.id}
            href={`/news/${item.slug}`}
            className="group"
          >
            {/* ==================================================
                IMAGE
            =================================================== */}

            <div
              className="
                relative
                aspect-[16/10]
                overflow-hidden
                rounded-lg
              "
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="
                  (max-width: 768px) 100vw,
                  (max-width: 1024px) 50vw,
                  33vw
                "
                className="
                  object-cover
                  transition
                  duration-300
                  group-hover:scale-105
                "
              />
            </div>

            {/* ==================================================
                CATEGORY
            =================================================== */}

            <p
              className="
                mt-4
                font-[family-name:var(--font-devanagari)]
                text-sm
                font-bold
                text-[var(--primary)]
              "
            >
              {item.categoryname}
            </p>

            {/* ==================================================
                TITLE
            =================================================== */}

            <h2
              className="
                mt-2
                font-[family-name:var(--font-devanagari)]
                text-xl
                font-bold
                leading-snug
                transition
                group-hover:text-[var(--primary)]
              "
            >
              {item.title}
            </h2>

            {/* ==================================================
                DATE
            =================================================== */}

            <p
              className="
                mt-2
                font-[family-name:var(--font-devanagari)]
                text-sm
                text-[var(--on-surface-variant)]
              "
            >
              {new Date(
                item.created
              ).toLocaleDateString("ne-NP")}
            </p>
          </Link>
        ))}
      </div>
    </main>
  );
}