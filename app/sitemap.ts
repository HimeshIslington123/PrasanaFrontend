import type { MetadataRoute } from "next";

const baseUrl = "https://www.prashnaa.com";
const apiUrl = "https://api.prashnaa.com";

type News = {
  id: number;
  slug: string;
  created: string;
};

type Blog = {
  id: number;
  slug: string;
  date: string;
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/aboutus`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/Advertise`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
  ];

  let newsPages: MetadataRoute.Sitemap = [];
  let blogPages: MetadataRoute.Sitemap = [];

  // =========================
  // NEWS
  // =========================

  try {
    const response = await fetch(`${apiUrl}/news`, {
      next: {
        revalidate: 3600,
      },
    });

    if (response.ok) {
      const result = await response.json();

      const news: News[] = result.data ?? [];

      newsPages = news
        .filter((item) => item.slug)
        .map((item) => ({
          url: `${baseUrl}/news/${item.slug}`,
          lastModified: new Date(item.created),
          changeFrequency: "daily" as const,
          priority: 0.8,
        }));
    } else {
      console.error("News sitemap API failed:", response.status);
    }
  } catch (error) {
    console.error("Failed to fetch news for sitemap:", error);
  }

  // =========================
  // BLOG
  // =========================

  try {
    const response = await fetch(`${apiUrl}/blog`, {
      next: {
        revalidate: 3600,
      },
    });

    if (response.ok) {
      const result = await response.json();

      // Your /blog API appears to return an array.
      // This also supports { data: [...] } just in case.
      const blogs: Blog[] = Array.isArray(result)
        ? result
        : result.data ?? [];

      blogPages = blogs
        .filter((item) => item.slug)
        .map((item) => ({
          url: `${baseUrl}/blog/${item.slug}`,
          lastModified: new Date(item.date),
          changeFrequency: "weekly" as const,
          priority: 0.7,
        }));
    } else {
      console.error("Blog sitemap API failed:", response.status);
    }
  } catch (error) {
    console.error("Failed to fetch blogs for sitemap:", error);
  }

  return [
    ...staticPages,
    ...newsPages,
    ...blogPages,
  ];
}