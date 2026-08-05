import type { Metadata } from "next";
import ContentPage from "@/components/content/ContentPage";
import { hemodinamia } from "@/data/content/hemodinamia";
import { getRoute } from "@/data/routes";
import { pageMetadata } from "@/lib/metadata";

const route = getRoute("/hemodinamia");

export const metadata: Metadata = pageMetadata("/hemodinamia");

export default function Page() {
  return (
    <ContentPage
      content={hemodinamia}
      title={route.title}
      description={route.description}
    />
  );
}
