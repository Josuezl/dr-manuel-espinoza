import { videos } from "@/data/site";
import Chapter from "./Chapter";
import WordsReveal from "./WordsReveal";
import Reveal from "./Reveal";

export default function Videos() {
  return (
    <section id="videos" className="relative bg-abyss py-28 sm:py-40">
      <div className="mx-auto max-w-7xl px-5 sm:px-10">
        <Chapter index="01" title="Educación al paciente" />

        <div className="mt-10 flex flex-wrap items-end justify-between gap-8">
          <WordsReveal
            text="Tu corazón, explicado con claridad."
            accent={["claridad"]}
            className="max-w-3xl font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl"
          />
          <Reveal delay={0.15}>
            <p className="max-w-sm text-[15px] leading-relaxed text-muted">
              El Dr. Espinoza explica, en palabras simples, las condiciones
              que trata y cómo se resuelven hoy sin cirugía abierta.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-14 lg:grid-cols-2 lg:gap-10">
          {videos.map((video, i) => (
            <Reveal key={video.src} delay={i * 0.1}>
              <article className="flex flex-col items-start gap-8 sm:flex-row">
                {/* Video vertical, formato teléfono */}
                <figure className="w-full max-w-[280px] shrink-0 overflow-hidden rounded-3xl border border-line bg-surface/40 sm:w-[260px]">
                  <video
                    src={video.src}
                    controls
                    playsInline
                    preload="metadata"
                    className="aspect-[9/16] h-auto w-full"
                  />
                </figure>

                <div className="max-w-sm sm:pt-2">
                  <h3 className="font-display text-2xl font-semibold leading-snug tracking-tight text-paper">
                    {video.title}
                  </h3>
                  <p className="mt-4 text-[15px] leading-relaxed text-cloud">
                    {video.description}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
