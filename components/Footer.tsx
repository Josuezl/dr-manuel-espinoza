import { doctor, nav, clinics, milestone } from "@/data/site";
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

        <div className="relative z-10 mx-auto max-w-7xl px-5 pb-8 pt-14 sm:px-10 sm:pt-20">
          <div className="grid auto-rows-fr gap-5 lg:grid-cols-2 xl:grid-cols-3">
            <Reveal className="h-full">
              <div className="flex h-full flex-col rounded-[2rem] border border-white/10 bg-white/[0.045] p-7 sm:p-9">
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-cobalt-soft/70">
                  Cardiología intervencionista
                </p>
                <h2 className="mt-6 max-w-md font-display text-3xl font-semibold leading-tight tracking-[-0.05em] text-white sm:text-4xl">
                  Decisiones precisas para cuidar cada latido.
                </h2>
                <p className="mt-5 max-w-md text-sm leading-6 text-white/60">
                  {doctor.title} · {doctor.city}
                </p>
                <a
                  href="#citas"
                  className="button-sweep mt-9 inline-flex min-h-12 w-fit items-center justify-center rounded-full bg-cobalt px-6 text-xs font-semibold uppercase tracking-[0.14em] text-white"
                >
                  Agendar una cita
                  <span className="ml-3 text-base" aria-hidden="true">
                    ↗
                  </span>
                </a>
              </div>
            </Reveal>

            <Reveal delay={0.08} className="h-full">
              <nav
                aria-label="Mapa del sitio"
                className="h-full rounded-[2rem] border border-white/10 p-7 sm:p-9"
              >
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/70">
                  Navegación
                </p>
                <ul className="mt-7 space-y-4">
                  {nav.map((item) => (
                    <li key={item.href}>
                      <a
                        href={item.href}
                        className="group inline-flex items-center gap-3 text-sm font-medium text-white/70 transition-colors hover:text-white"
                      >
                        <span
                          className="size-1.5 rounded-full bg-cobalt transition-transform group-hover:scale-150"
                          aria-hidden="true"
                        />
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </Reveal>

            <Reveal
              delay={0.16}
              className="h-full lg:col-span-2 lg:w-[calc(50%-0.625rem)] lg:justify-self-center xl:col-span-1 xl:w-auto xl:justify-self-stretch"
            >
              <div className="h-full rounded-[2rem] border border-white/10 p-7 sm:p-9">
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/70">
                  Consultorios
                </p>
                <ul className="mt-7 space-y-5">
                  {clinics.map((clinic) => (
                    <li key={clinic.name}>
                      <a
                        href={clinic.bookingUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group block border-b border-white/10 pb-5"
                      >
                        <span className="flex items-start justify-between gap-4 text-sm font-semibold text-white transition-colors group-hover:text-cobalt-soft">
                          {clinic.name}
                          <span
                            className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                            aria-hidden="true"
                          >
                            ↗
                          </span>
                        </span>
                        <span className="mt-2 block text-xs text-white/65">
                          {clinic.city}
                        </span>
                      </a>
                    </li>
                  ))}
                  <li>
                    <a
                      href={milestone.pressUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-start justify-between gap-4 text-sm leading-6 text-white/65 transition-colors hover:text-white"
                    >
                      <span>
                        Primer MyClip de Honduras
                        <span className="block text-xs text-white/65">
                          Publicado por {milestone.pressName}
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
