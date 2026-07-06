import { clinics } from "@/data/site";
import Chapter from "./Chapter";
import WordsReveal from "./WordsReveal";
import Reveal from "./Reveal";

/** Capítulo final: el destino del recorrido es la cita. */
export default function Appointments() {
  return (
    <section id="citas" className="relative overflow-hidden py-28 sm:py-44">
      {/* Resplandor final */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-teal/10 blur-[160px]"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-10">
        <Chapter index="06" title="Tu cita" />

        <WordsReveal
          text="Agenda tu cita en minutos."
          accent={["Agenda"]}
          className="mt-10 max-w-4xl font-display text-5xl font-semibold leading-[1.02] tracking-tight sm:text-7xl"
        />

        <Reveal delay={0.12}>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-cloud">
            Elige tu sede y reserva en línea: seleccionas fecha y hora, y
            recibes tu confirmación al instante.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:max-w-4xl">
          {clinics.map((clinic, i) => (
            <Reveal key={clinic.name} delay={0.1 + i * 0.08} className="h-full">
              <a
                href={clinic.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full flex-col justify-between rounded-3xl border border-line bg-surface/60 p-8 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-teal sm:p-10"
              >
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted">
                    {clinic.city}
                  </p>
                  <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight text-paper sm:text-3xl">
                    {clinic.name}
                  </h3>
                </div>
                <p className="mt-10 inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-teal transition-colors group-hover:text-paper">
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
