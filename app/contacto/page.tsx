import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Contact from "@/components/Contact";
import JsonLd from "@/components/JsonLd";
import Breadcrumb from "@/components/content/Breadcrumb";
import { breadcrumbSchema, medicalWebPageSchema } from "@/lib/schema";
import { getRoute } from "@/data/routes";
import { pageMetadata } from "@/lib/metadata";
import { sitio } from "@/data/seo";

const route = getRoute("/contacto");
const h1 = "Consultorios y contacto";

export const metadata: Metadata = pageMetadata(route);

export default function Page() {
  return (
    <>
      <Header />
      <JsonLd
        data={medicalWebPageSchema({
          title: route.title,
          description: route.description,
          path: route.path,
        })}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Inicio", url: sitio.url },
          { name: h1, url: `${sitio.url}${route.path}` },
        ])}
      />
      <main className="bg-frost pt-[7.5rem] sm:pt-[11rem]">
        <div className="mx-auto max-w-3xl px-5 sm:px-10">
          <Breadcrumb current={h1} />
          <h1 className="mt-6 font-display text-[clamp(2rem,4vw,2.9rem)] font-semibold leading-[1.12] tracking-[-0.03em] text-ink">
            {h1}
          </h1>
        </div>
        <Contact />
      </main>
      <Footer />
    </>
  );
}
