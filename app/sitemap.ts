import type { MetadataRoute } from "next";

const baseUrl = "https://prasananews.vercel.app";

type News = {
  id: number;
  slug: string;
  created: string;
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
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

  try {
    const response = await fetch(
      "https://learningcl-cd-4.onrender.com/news",
      {
        next: {
          revalidate: 3600,
        },
      }
    );

    if (!response.ok) {
      console.error(
        "Sitemap API failed:",
        response.status
      );

      return staticPages;
    }

    const result = await response.json();

    // Your API returns { data: [...] }
    const news: News[] = result.data ?? [];

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