import type { MetadataRoute } from "next";

const baseUrl = "https://www.prashnaa.com";

const API_URL = process.env.API_URL;

type News = {
  id: number;
  slug: string;
  created: string;
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // ============================================================
  // STATIC PAGES
  // ============================================================

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },

    {
      url: `${baseUrl}/aboutus`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];

  // ============================================================
  // GET ALL NEWS
  // ============================================================

  if (!API_URL) {
    return staticPages;
  }

  try {
    const response = await fetch(`${API_URL}/News`, {
      next: {
        revalidate: 3600,
      },
    });

    if (!response.ok) {
      return staticPages;
    }

    const news: News[] = await response.json();

    // ============================================================
    // DYNAMIC NEWS URLs
    // ============================================================

    const newsPages: MetadataRoute.Sitemap = news
      .filter((item) => item.slug)
      .map((item) => ({
        url: `${baseUrl}/news/${item.slug}`,
        lastModified: new Date(item.created),
        changeFrequency: "daily" as const,
        priority: 0.8,
      }));

    return [
      ...staticPages,
      ...newsPages,
    ];
  } catch (error) {
    console.error(
      "Failed to generate sitemap:",
      error
    );

    return staticPages;
  }
}