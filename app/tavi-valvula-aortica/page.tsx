import type { Metadata } from "next";
import ContentPage from "@/components/content/ContentPage";
import { taviValvulaAortica } from "@/data/content/tavi-valvula-aortica";
import { getRoute } from "@/data/routes";
import { pageMetadata } from "@/lib/metadata";

const route = getRoute("/tavi-valvula-aortica");

export const metadata: Metadata = pageMetadata(route);

export default function Page() {
  return (
    <ContentPage
      content={taviValvulaAortica}
      title={route.title}
      description={route.description}
    />
  );
}
