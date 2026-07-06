import { doctor, nav, clinics, milestone } from "@/data/site";

export default function Footer() {
  return (
    <footer className="border-t border-line bg-abyss">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-10">
        <div className="grid gap-12 sm:grid-cols-3">
          <div>
            <p className="font-display text-xl font-semibold tracking-tight text-paper">
              {doctor.name}
            </p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted">
              {doctor.title} · {doctor.city}
            </p>
          </div>

          <nav aria-label="Mapa del sitio">
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted">
              Recorrido
            </p>
            <ul className="mt-5 space-y-3">
              {nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-sm text-cloud transition-colors hover:text-teal"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted">
              Agendar cita
            </p>
            <ul className="mt-5 space-y-3">
              {clinics.map((clinic) => (
                <li key={clinic.name}>
                  <a
                    href={clinic.bookingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-cloud transition-colors hover:text-teal"
                  >
                    {clinic.name} ↗
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={milestone.pressUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-cloud transition-colors hover:text-teal"
                >
                  Primer MyClip de Honduras — {milestone.pressName} ↗
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-7">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
            © {new Date().getFullYear()} {doctor.shortName}
          </p>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
            Este sitio no sustituye una consulta médica
          </p>
        </div>
      </div>
    </footer>
  );
}
