import { doctor, nav, clinics } from "@/data/site";
import Reveal from "./Reveal";

export default function Footer() {
  return (
    <footer className="relative bg-frost px-3 pt-12 sm:px-5 sm:pt-16">
      <div className="relative isolate overflow-hidden rounded-t-[2.5rem] bg-[linear-gradient(108deg,#4b62d9_0%,#4d66d6_62%,#263181_100%)] text-white sm:rounded-t-[4rem]">
        <div className="hero-blueprint pointer-events-none absolute inset-0 z-0 opacity-60" aria-hidden="true" />
        <div
          className="absolute -left-28 bottom-36 z-0 size-72 rounded-full bg-cobalt/5 blur-3xl"
          aria-hidden="true"
        />

        <div className="relative z-10 mx-auto max-w-7xl px-5 pb-8 pt-12 sm:px-10 sm:pt-16">
          <div className="grid gap-10 border-b border-white/15 pb-12 sm:gap-12 lg:grid-cols-[minmax(0,1.35fr)_minmax(12rem,0.7fr)_minmax(15rem,0.9fr)] lg:gap-16 lg:pb-14">
            <Reveal>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-cobalt-soft/75">
                  Cardiología intervencionista
                </p>
                <h2 className="mt-5 max-w-xl font-display text-[2rem] font-semibold leading-[1.1] tracking-[-0.04em] text-white sm:text-[2.5rem]">
                  Decisiones precisas para cuidar cada latido.
                </h2>
                <p className="mt-4 max-w-lg text-sm leading-6 text-white/70">
                  {doctor.title} · {doctor.city}
                </p>
                <a
                  href="#citas"
                  className="button-sweep mt-7 inline-flex min-h-11 w-fit items-center justify-center rounded-full bg-cobalt px-5 text-xs font-semibold uppercase tracking-[0.14em] text-white"
                >
                  Agendar una cita
                  <span className="ml-3 text-base" aria-hidden="true">
                    ↗
                  </span>
                </a>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <nav aria-label="Mapa del sitio">
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/70">
                  Navegación
                </p>
                <ul className="mt-5 grid grid-cols-2 gap-x-5 gap-y-3 lg:grid-cols-1">
                  {nav.map((item) => (
                    <li key={item.href}>
                      <a
                        href={item.href}
                        className="text-sm font-medium text-white/75 transition-colors hover:text-white"
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </Reveal>

            <Reveal delay={0.16}>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/70">
                  Consultorios
                </p>
                <ul className="mt-5 space-y-3">
                  {clinics.map((clinic) => (
                    <li key={clinic.name}>
                      <a
                        href={clinic.bookingUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-start justify-between gap-4 border-b border-white/15 pb-3 text-sm font-semibold text-white transition-colors hover:text-cobalt-soft"
                      >
                        <span>
                          {clinic.name}
                          <span className="mt-1 block text-xs font-normal text-white/65">
                            {clinic.city}
                          </span>
                        </span>
                        <span
                          className="shrink-0 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                          aria-hidden="true"
                        >
                          ↗
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>

          <div className="mt-16 border-t border-white/10 pt-7 text-center font-mono text-[9px] uppercase tracking-[0.16em] text-white/65 sm:text-[10px]">
            <p>
              © {new Date().getFullYear()} · {doctor.name} · Todos los derechos reservados · Desarrollado por Ing. Josue Zuniga (33900742)
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
