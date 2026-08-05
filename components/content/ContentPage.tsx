import Link from "next/link";
import { breadcrumbSchema, medicalWebPageSchema } from "@/lib/schema";
import { sitio, sedes } from "@/data/seo";
import JsonLd from "@/components/JsonLd";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export interface PageContent {
  slug: string;
  h1: string;
  intro: string;
  secciones: { h2: string; parrafos: string[] }[];
  relacionadas: { label: string; href: string }[];
}

export default function ContentPage({
  content,
  title,
  description,
}: {
  content: PageContent;
  title: string;
  description: string;
}) {
  const path = `/${content.slug}`;
  const whatsapp = sedes.find((s) => s.whatsapp)?.whatsapp;

  return (
    <>
      <Header />
      <JsonLd data={medicalWebPageSchema({ title, description, path })} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Inicio", url: sitio.url },
          { name: content.h1, url: `${sitio.url}${path}` },
        ])}
      />
      <main className="bg-frost px-5 pb-20 pt-[7.5rem] sm:px-10 sm:pt-[11rem]">
        <article className="mx-auto max-w-3xl">
          <nav aria-label="Ruta de navegación" className="text-xs text-cloud">
            <Link href="/" className="hover:text-cobalt">
              Inicio
            </Link>
            <span aria-hidden="true"> · </span>
            <span>{content.h1}</span>
          </nav>

          <h1 className="mt-6 font-display text-[clamp(2rem,4vw,2.9rem)] font-semibold leading-[1.12] tracking-[-0.03em] text-ink">
            {content.h1}
          </h1>
          <p className="mt-6 text-lg leading-8 text-cloud">{content.intro}</p>

          {content.secciones.map((seccion) => (
            <section key={seccion.h2} className="mt-12">
              <h2 className="font-display text-2xl font-semibold leading-tight tracking-[-0.03em] text-ink sm:text-3xl">
                {seccion.h2}
              </h2>
              {seccion.parrafos.map((parrafo, i) => (
                <p key={i} className="mt-4 text-base leading-7 text-cloud">
                  {parrafo}
                </p>
              ))}
            </section>
          ))}

          <aside className="mt-14 rounded-[2rem] bg-[linear-gradient(108deg,#4b62d9_0%,#4d66d6_62%,#263181_100%)] p-8 text-white">
            <h2 className="font-display text-2xl font-semibold tracking-[-0.03em]">
              ¿Necesitás una valoración?
            </h2>
            <p className="mt-3 text-base leading-7 text-white/90">
              El Dr. Manuel Espinoza atiende en dos consultorios de San Pedro Sula.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              {whatsapp ? (
                <a
                  href={`https://wa.me/${whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center rounded-full bg-white px-5 text-sm font-semibold text-cobalt"
                >
                  Escribir por WhatsApp
                </a>
              ) : null}
              <Link
                href="/#contacto"
                className="inline-flex min-h-11 items-center rounded-full border border-white/40 px-5 text-sm font-semibold text-white"
              >
                Ver consultorios
              </Link>
            </div>
          </aside>

          {content.relacionadas.length > 0 ? (
            <nav aria-label="Contenido relacionado" className="mt-14">
              <h2 className="font-display text-xl font-semibold tracking-[-0.03em] text-ink">
                Seguí leyendo
              </h2>
              <ul className="mt-5 space-y-2">
                {content.relacionadas.map((rel) => (
                  <li key={rel.href}>
                    <Link
                      href={rel.href}
                      className="text-sm font-semibold text-cobalt hover:underline"
                    >
                      {rel.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ) : null}

          <p className="mt-12 border-t border-line pt-6 text-xs leading-6 text-cloud">
            Revisado por el Dr. Manuel Espinoza Rueda, cardiólogo intervencionista.
            Esta información es orientativa y no sustituye una consulta médica.
          </p>
        </article>
      </main>
      <Footer />
    </>
  );
}
