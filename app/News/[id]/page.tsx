import ArticlePage from "@/app/components/ArticlePage";
import type { Metadata } from "next";


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

const API_BASE = process.env.NEXT_PUBLIC_API_URL;

async function getNews(id: string): Promise<News> {
  const response = await fetch(`${API_BASE}/news/${id}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch news");
  }

  return response.json();
}

export async function generateMetadata(
  { params }: { params: Promise<{ id: string }> }
): Promise<Metadata> {

  const { id } = await params;

  const news = await getNews(id);

  const description =
    news.content?.substring(0, 160) ||
    "प्रश्न समाचारबाट पछिल्लो समाचार पढ्नुहोस्।";

  return {
    title: news.title,

    description,

    openGraph: {
      title: news.title,
      description,

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
      description,
      images: news.image
        ? [news.image]
        : [],
    },
  };
}

export default async function NewsDetailPage(
  { params }: { params: Promise<{ id: string }> }
) {

  const { id } = await params;

  const news = await getNews(id);

  return (
    <ArticlePage
      id={news.id}
      title={news.title}
         paragraphs={news.content?.split("\n").filter(Boolean)}

      category={news.categoryname}
      publishedAt={news.created}
      heroImageSrc={news.image}
      comments={news.comments ?? []}
    />
  );
}