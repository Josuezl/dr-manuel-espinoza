import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { milestone, doctor } from "@/data/site";
import Parallax from "./Parallax";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

/** Noticia destacada: el primer MyClip del país, reseñado en prensa. */
export default function Milestone() {
  return (
    <section id="noticias" className="relative bg-frost py-6 sm:py-10 lg:py-16">
      <div className="mx-auto max-w-[94rem] px-3 sm:px-5">
        <div className="relative isolate overflow-hidden rounded-[2rem] bg-[linear-gradient(108deg,#4b62d9_0%,#4d66d6_62%,#263181_100%)] px-5 py-16 text-white shadow-[0_38px_90px_-55px_rgba(9,36,60,0.9)] sm:rounded-[3rem] sm:px-10 sm:py-20 lg:px-16 lg:py-24 xl:px-24">
          <div
            className="hero-blueprint pointer-events-none absolute inset-0 z-0 opacity-60"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute bottom-0 left-0 z-0 h-64 w-64 bg-[radial-gradient(circle_at_bottom_left,rgba(75,98,217,0.34),transparent_68%)]"
            aria-hidden="true"
          />

          <div className="relative z-10 grid items-end gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(22rem,0.75fr)] lg:gap-16">
            <SectionHeading
              eyebrow={milestone.eyebrow}
              title={milestone.title}
              inverse
              className="max-w-4xl"
            />
            <Reveal delay={0.12}>
              <p className="text-lg leading-8 text-white/90 sm:text-[1.1875rem]">
                {milestone.summary}
              </p>
            </Reveal>
          </div>

          <div className="relative z-10 mt-14 grid items-start gap-12 sm:mt-16 lg:grid-cols-[minmax(0,1.08fr)_minmax(22rem,0.72fr)] lg:gap-16 xl:gap-20">
            <Parallax range={32}>
              <figure className="media-zoom overflow-hidden rounded-[1.5rem] border border-white/15 bg-white/5 sm:rounded-[2rem]">
                <div className="overflow-hidden">
                  <Image
                    src={milestone.newsImage}
                    alt="El equipo médico durante el primer procedimiento MyClip de Honduras, en el Hospital del Valle"
                    width={917}
                    height={684}
                    sizes="(max-width: 1023px) 100vw, 58vw"
                    className="aspect-[4/3] h-auto w-full object-cover"
                  />
                </div>
                <figcaption className="flex flex-col gap-2 border-t border-white/15 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/70">
                    Hospital del Valle · Mayo 2026
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white">
                    Primer MyClip del país
                  </span>
                </figcaption>
              </figure>
            </Parallax>

            <div>
              <Reveal>
                <blockquote className="relative">
                  <p className="relative max-w-xl font-display text-xl font-medium leading-[1.45] tracking-[-0.02em] text-white sm:text-2xl">
                    “{milestone.quote}”
                  </p>
                  <footer className="mt-6">
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/70">
                      {doctor.shortName} · para {milestone.pressName}
                    </span>
                  </footer>
                </blockquote>
              </Reveal>

              <Reveal delay={0.12}>
                <dl className="mt-10 grid grid-cols-2 gap-x-5 gap-y-7">
                  {milestone.facts.map((fact) => (
                    <div
                      key={fact.label}
                      className="border-t border-white/15 pt-4"
                    >
                      <dt className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/70">
                        {fact.label}
                      </dt>
                      <dd className="mt-2 text-sm font-medium leading-6 text-white/90">
                        {fact.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </Reveal>

              <Reveal delay={0.2}>
                <a
                  href={milestone.pressUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="button-sweep mt-10 inline-flex min-h-12 items-center gap-3 rounded-full bg-white px-6 py-3 text-sm font-semibold text-navy transition-colors hover:text-white"
                >
                  Leer la noticia en {milestone.pressName}
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
