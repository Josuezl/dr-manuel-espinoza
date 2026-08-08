import type { Metadata } from "next";
import ContentPage from "@/components/content/ContentPage";
import { reparacionMitralMyclip } from "@/data/content/reparacion-mitral-myclip";
import { getRoute } from "@/data/routes";
import { pageMetadata } from "@/lib/metadata";

const route = getRoute("/reparacion-mitral-myclip");

export const metadata: Metadata = pageMetadata(route);

export default function Page() {
  return (
    <ContentPage
      content={reparacionMitralMyclip}
      title={route.title}
      description={route.description}
    />
  );
}
