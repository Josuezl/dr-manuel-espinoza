import type { Metadata } from "next";
import type { Route } from "../data/routes.ts";

/**
 * Arma la metadata (title, description, canonical, openGraph con imagen)
 * para una pagina de contenido a partir de la Route ya resuelta -- recibe
 * el objeto en vez de un path para que la pagina llame a getRoute() una
 * sola vez y lo reutilice aca y en su propio render.
 */
export function pageMetadata(route: Route): Metadata {
  return {
    title: route.title,
    description: route.description,
    alternates: { canonical: route.path },
    openGraph: {
      title: route.title,
      description: route.description,
      type: "article",
      locale: "es_HN",
      url: route.path,
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
