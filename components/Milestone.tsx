import Image from "next/image";
import { milestone, doctor } from "@/data/site";
import Chapter from "./Chapter";
import WordsReveal from "./WordsReveal";
import Parallax from "./Parallax";
import Reveal from "./Reveal";

/** Noticia destacada: el primer MyClip del país, reseñado en prensa. */
export default function Milestone() {
  return (
    <section id="noticias" className="relative py-28 sm:py-40">
      <div className="mx-auto max-w-7xl px-5 sm:px-10">
        <Chapter index="02" title="Publicaciones recientes" />

        <WordsReveal
          text="El primer MyClip de Honduras."
          accent={["MyClip"]}
          className="mt-10 max-w-4xl font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl"
        />

        <div className="mt-16 grid gap-14 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <div className="order-2 lg:order-1">
            <Parallax range={40}>
              <figure className="overflow-hidden rounded-3xl border border-line">
                <Image
                  src={milestone.newsImage}
                  alt="El equipo médico durante el primer procedimiento MyClip de Honduras, en el Hospital del Valle"
                  width={917}
                  height={684}
                  className="h-auto w-full"
                />
                <figcaption className="flex flex-wrap items-center justify-between gap-2 border-t border-line px-5 py-3.5">
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-cloud">
                    Hospital del Valle · Mayo 2026
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-pulse">
                    Primer MyClip del país
                  </span>
                </figcaption>
              </figure>
            </Parallax>

            <Reveal delay={0.15}>
              <dl className="mt-10 grid grid-cols-2 gap-x-8 gap-y-7">
                {milestone.facts.map((fact) => (
                  <div key={fact.label} className="border-t border-line pt-4">
                    <dt className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted">
                      {fact.label}
                    </dt>
                    <dd className="mt-2 text-sm font-medium leading-snug text-paper">
                      {fact.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          <div className="order-1 lg:order-2">
            <Reveal>
              <p className="text-lg leading-relaxed text-cloud sm:text-xl">
                {milestone.summary}
              </p>
            </Reveal>

            <Reveal delay={0.12}>
              <blockquote className="mt-12">
                <p className="font-display text-2xl font-medium leading-snug text-paper sm:text-3xl">
                  “{milestone.quote}”
                </p>
                <footer className="mt-6 flex items-center gap-4">
                  <span className="h-px w-10 bg-pulse" aria-hidden="true" />
                  <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-cloud">
                    {doctor.shortName} · para {milestone.pressName}
                  </span>
                </footer>
              </blockquote>
            </Reveal>

            <Reveal delay={0.2}>
              <a
                href={milestone.pressUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-12 inline-flex items-center gap-3 border-b border-line pb-2 font-mono text-xs uppercase tracking-[0.25em] text-paper transition-colors hover:border-pulse hover:text-pulse"
              >
                Leer la noticia completa en {milestone.pressName} ↗
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
