import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://www.prashnaa.com";

  return {
    rules: {
      userAgent: "*",

      allow: "/",

      disallow: [
        "/admin/",
        "/staff/",
      ],
    },

    sitemap: `${baseUrl}/sitemap.xml`,
  };
}