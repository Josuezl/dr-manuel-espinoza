export const dynamic = "force-static";

import type { MetadataRoute } from "next";
import { routes } from "@/data/routes";
import { sitio } from "@/data/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return routes.map((route) => ({
    url: `${sitio.url}${route.path === "/" ? "" : route.path}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: route.priority,
  }));
}
