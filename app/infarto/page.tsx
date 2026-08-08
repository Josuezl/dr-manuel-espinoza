import type { Metadata } from "next";
import ContentPage from "@/components/content/ContentPage";
import { infarto } from "@/data/content/infarto";
import { getRoute } from "@/data/routes";
import { pageMetadata } from "@/lib/metadata";

const route = getRoute("/infarto");

export const metadata: Metadata = pageMetadata(route);

export default function Page() {
  return (
    <ContentPage
      content={infarto}
      title={route.title}
      description={route.description}
    />
  );
}
