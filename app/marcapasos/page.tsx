import type { Metadata } from "next";
import ContentPage from "@/components/content/ContentPage";
import { marcapasos } from "@/data/content/marcapasos";
import { getRoute } from "@/data/routes";
import { pageMetadata } from "@/lib/metadata";

const route = getRoute("/marcapasos");

export const metadata: Metadata = pageMetadata(route);

export default function Page() {
  return (
    <ContentPage
      content={marcapasos}
      title={route.title}
      description={route.description}
    />
  );
}
