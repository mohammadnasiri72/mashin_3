import { MetadataRoute } from "next";
import { getMenu } from "@/services/Menu/Menu";
import { mainDomainOld } from "@/utils/mainDomain";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = mainDomainOld.replace(/\/$/, "");

  // صفحات استاتیک اصلی
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/cars`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/motorcycles`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/autoservices`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/price.html`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/motorcycle-prices.html`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/compare`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/best-choices.html`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/whichcars.html`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/fa/news`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/fa/educationtips`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/fa/reviews`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/videos.html`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/podcast.html`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/technical-words.html`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/contact-us`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];

  // اضافه کردن لینک‌های منو به sitemap
  try {
    const menu = await getMenu({ langCode: "fa", menuKey: "" });
    const menuUrls: MetadataRoute.Sitemap = [];

    const extractUrls = (items: { href?: string; url?: string }[]) => {
      items?.forEach((item) => {
        const url = item.href || item.url;
        if (url && !url.startsWith("#") && !url.startsWith("http")) {
          const fullUrl = url.startsWith("/") ? `${baseUrl}${url}` : `${baseUrl}/${url}`;
          if (!menuUrls.some((u) => u.url === fullUrl)) {
            menuUrls.push({
              url: fullUrl,
              lastModified: new Date(),
              changeFrequency: "weekly" as const,
              priority: 0.7,
            });
          }
        }
      });
    };

    menu?.forEach((group) => {
      extractUrls(group.menuItems || []);
    });

    return [...staticPages, ...menuUrls];
  } catch {
    return staticPages;
  }
}

