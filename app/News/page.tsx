import axios from "axios";
import ArticlePage from "../components/ArticlePage";
import type { Metadata } from "next";

const API_BASE = process.env.NEXT_PUBLIC_API_URL;

async function getNews() {
  const response = await axios.get(`${API_BASE}/news/7`);
  return response.data;
}


export async function generateMetadata(): Promise<Metadata> {
  const news = await getNews();

  return {
    title: news.title,

    description:
      news.content?.substring(0, 160) ||
      "प्रश्न समाचारबाट पछिल्लो समाचार पढ्नुहोस्।",

    openGraph: {
      title: news.title,
      description:
        news.content?.substring(0, 160) ||
        "प्रश्न समाचारबाट पछिल्लो समाचार पढ्नुहोस्।",

      images: news.image
        ? [
            {
              url: news.image,
              width: 1200,
              height: 630,
              alt: news.title,
            },
          ]
        : [],

      type: "article",
    },

    twitter: {
      card: "summary_large_image",
      title: news.title,
      description:
        news.content?.substring(0, 160) ||
        "प्रश्न समाचारबाट पछिल्लो समाचार पढ्नुहोस्।",

      images: news.image ? [news.image] : [],
    },
  };
}

// ============================================================
// PAGE
// ============================================================

export default async function NewsDetailPage() {
  const news = await getNews();

  return (
    <ArticlePage
      id={news.id}
      title={news.title}
      authorName={news.user?.name || "प्रश्न समाचार ब्युरो"}
      publishedAt={news.date}
      heroImageSrc={news.image}
      heroImageAlt={news.title}
      paragraphs={news.content?.split("\n").filter(Boolean)}
      comments={news.comments}
    />
  );
}