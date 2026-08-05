import type { Metadata } from "next";
import ContentPage from "@/components/content/ContentPage";
import { hemodinamia } from "@/data/content/hemodinamia";
import { getRoute } from "@/data/routes";

const route = getRoute("/hemodinamia");

export const metadata: Metadata = {
  title: route.title,
  description: route.description,
  alternates: { canonical: "/hemodinamia" },
  openGraph: {
    title: route.title,
    description: route.description,
    type: "article",
    locale: "es_HN",
  },
};

export default function Page() {
  return (
    <ContentPage
      content={hemodinamia}
      title={route.title}
      description={route.description}
    />
  );
}
