import type { Metadata } from "next";
import ContentPage from "@/components/content/ContentPage";
import { angioplastiaCoronaria } from "@/data/content/angioplastia-coronaria";
import { getRoute } from "@/data/routes";
import { pageMetadata } from "@/lib/metadata";

const route = getRoute("/angioplastia-coronaria");

export const metadata: Metadata = pageMetadata(route);

export default function Page() {
  return (
    <ContentPage
      content={angioplastiaCoronaria}
      title={route.title}
      description={route.description}
    />
  );
}
