import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Contact from "@/components/Contact";
import JsonLd from "@/components/JsonLd";
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
          <nav aria-label="Ruta de navegación" className="text-xs text-cloud">
            <ol className="flex list-none items-center gap-1.5">
              <li>
                <Link href="/" className="hover:text-cobalt">
                  Inicio
                </Link>
              </li>
              <li aria-hidden="true">·</li>
              <li aria-current="page">{h1}</li>
            </ol>
          </nav>
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
