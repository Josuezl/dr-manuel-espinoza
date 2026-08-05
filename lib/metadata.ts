import type { Metadata } from "next";
import { getRoute } from "@/data/routes";

export function pageMetadata(path: string): Metadata {
  const route = getRoute(path);
  return {
    title: route.title,
    description: route.description,
    alternates: { canonical: path },
    openGraph: {
      title: route.title,
      description: route.description,
      type: "article",
      locale: "es_HN",
      url: path,
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          type: "image/png",
          alt: "Dr. Manuel Espinoza Rueda, cardiólogo intervencionista en San Pedro Sula",
        },
      ],
    },
  };
}
