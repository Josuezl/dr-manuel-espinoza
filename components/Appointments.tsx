import { clinics } from "@/data/site";
import WordsReveal from "./WordsReveal";
import Reveal from "./Reveal";

/** Capítulo final: el destino del recorrido es la cita. */
export default function Appointments() {
  return (
    <section id="citas" className="relative overflow-hidden pb-20 pt-16 sm:pb-24 sm:pt-20">
      {/* Resplandor final */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-teal/10 blur-[160px]"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-10">
        <WordsReveal
          text="Agenda tu cita en minutos."
          className="max-w-4xl font-display text-[clamp(2.25rem,3vw,3rem)] font-semibold leading-[1.1] tracking-[-0.032em] text-ink"
        />

        <Reveal delay={0.12}>
          <p className="mt-8 max-w-xl text-lg leading-8 text-cloud sm:text-[1.1875rem]">
            Elige tu sede y reserva en línea: seleccionas fecha y hora, y
            recibes tu confirmación al instante.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:max-w-4xl">
          {clinics.map((clinic, index) => (
            <Reveal key={clinic.name} delay={0.1 + index * 0.08} className="h-full">
              <a
                href={clinic.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative isolate flex h-full min-h-[16rem] flex-col justify-between overflow-hidden rounded-[1.75rem] border border-white/15 bg-[linear-gradient(108deg,#4b62d9_0%,#4d66d6_62%,#263181_100%)] p-8 text-white shadow-[0_24px_60px_-32px_rgba(2,12,39,0.72)] motion-safe:transition-[transform,box-shadow,border-color] motion-safe:duration-300 hover:-translate-y-1 hover:border-white/30 hover:shadow-[0_30px_70px_-32px_rgba(2,12,39,0.82)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-frost sm:p-9"
              >
                <span className="hero-blueprint pointer-events-none absolute inset-0 z-0 opacity-45" aria-hidden="true" />
                <div className="relative z-10">
                  <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/70">
                    {clinic.city}
                  </p>
                  <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                    {clinic.name}
                  </h3>
                </div>
                <p className="relative z-10 mt-10 inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-white/90 transition-colors group-hover:text-white">
                  Agendar en línea
                  <span
                    className="inline-block transition-transform duration-300 group-hover:translate-x-1.5"
                    aria-hidden="true"
                  >
                    →
                  </span>
                </p>
              </a>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <p className="mt-10 font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
            Agenda en línea segura · confirmación inmediata
          </p>
        </Reveal>
      </div>
    </section>
  );
}
