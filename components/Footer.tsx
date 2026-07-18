import { doctor, nav, clinics } from "@/data/site";
import Reveal from "./Reveal";

export default function Footer() {
  return (
    <footer className="relative bg-frost px-5 pb-8 pt-12 sm:px-10 sm:pt-16">
      <div className="mx-auto max-w-7xl border-t border-line">
        <div className="mx-auto max-w-4xl py-12 sm:py-16">
          <div className="grid gap-10 border-b border-line pb-12 sm:gap-12 lg:grid-cols-2 lg:gap-20 lg:pb-14">
            <Reveal>
              <nav aria-label="Mapa del sitio">
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-cobalt">
                  Navegación
                </p>
                <ul className="mt-5 grid grid-cols-2 gap-x-5 gap-y-3 lg:grid-cols-1">
                  {nav.map((item) => (
                    <li key={item.href}>
                      <a
                        href={item.href}
                        className="text-sm font-medium text-cloud transition-colors hover:text-cobalt"
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </Reveal>

            <Reveal delay={0.08}>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-cobalt">
                  Consultorios
                </p>
                <ul className="mt-5 space-y-3">
                  {clinics.map((clinic) => (
                    <li key={clinic.name}>
                      <a
                        href={clinic.bookingUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-start justify-between gap-4 border-b border-line pb-3 text-sm font-semibold text-ink transition-colors hover:text-cobalt"
                      >
                        <span>
                          {clinic.name}
                          <span className="mt-1 block text-xs font-normal text-cloud">
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

          <div className="mt-12 border-t border-line pt-7 text-center font-mono text-[9px] uppercase tracking-[0.16em] text-cloud sm:text-[10px]">
            <p>
              © {new Date().getFullYear()} · {doctor.name} · Todos los derechos reservados · Desarrollado por Ing. Josue Zuniga (33900742)
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
