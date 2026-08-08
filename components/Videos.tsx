import { videos } from "@/data/site";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function Videos() {
  return (
    <section
      id="videos"
      className="relative overflow-hidden bg-frost pb-16 pt-24 sm:pb-20 sm:pt-32 lg:pb-16 lg:pt-36"
    >
      <div className="relative mx-auto max-w-7xl px-5 sm:px-10">
        <div className="grid items-end gap-8 lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-16">
          <SectionHeading
            eyebrow="Educación al paciente"
            title="Tu corazón, explicado con claridad."
            className="max-w-4xl"
          />
          <Reveal delay={0.15}>
            <p className="text-lg leading-8 text-cloud sm:text-[1.1875rem]">
              El Dr. Espinoza explica, en palabras simples, las condiciones
              que trata y cómo se resuelven hoy sin cirugía abierta.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid auto-rows-fr items-stretch gap-10 sm:mt-20 lg:grid-cols-2 lg:gap-12">
          {videos.map((video, i) => (
            <Reveal
              key={video.src}
              delay={i * 0.12}
              className="h-full"
            >
              <article className="group mx-auto flex h-full w-full max-w-[25rem] flex-col rounded-[2rem] border border-line bg-white p-3 shadow-[0_26px_60px_-38px_rgba(9,36,60,0.52)] sm:p-4">
                <figure className="relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-navy shadow-[0_18px_38px_-28px_rgba(9,36,60,0.9)] sm:rounded-[1.65rem]">
                  <video
                    controls
                    playsInline
                    preload="none"
                    poster={video.poster}
                    aria-label={`Video educativo: ${video.title}`}
                    className="aspect-[9/16] h-auto w-full bg-navy object-contain"
                  >
                    <source src={video.src} type="video/mp4" />
                    Tu navegador no puede reproducir este video.
                  </video>
                  <div
                    aria-hidden="true"
                    className="video-poster-overlay pointer-events-none absolute inset-x-0 top-0 h-2/5 bg-gradient-to-b from-navy/55 via-navy/12 to-transparent"
                  />
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 top-0 flex items-center justify-end p-5"
                  >
                    <span className="grid h-10 w-10 place-items-center rounded-full border border-white/35 bg-white/15 text-sm text-white backdrop-blur-sm">
                      ▶
                    </span>
                  </div>
                </figure>

                <div className="mt-7 flex flex-1 flex-col px-2 pb-2 text-left sm:px-3 sm:pb-3">
                  <h3 className="max-w-xl font-display text-2xl font-semibold leading-[1.12] tracking-[-0.035em] text-ink sm:text-3xl">
                    {video.title}
                  </h3>
                  <p className="mt-4 max-w-xl text-lg leading-7 text-cloud">
                    {video.description}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <p className="mt-14 text-center font-mono text-[10px] uppercase tracking-[0.22em] text-muted sm:mt-16">
            Información médica para decisiones más claras
          </p>
        </Reveal>
      </div>
    </section>
  );
}
