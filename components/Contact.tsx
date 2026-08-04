import { sedes } from "@/data/seo";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

const DIAS_ES: Record<string, string> = {
  Monday: "lunes",
  Tuesday: "martes",
  Wednesday: "miércoles",
  Thursday: "jueves",
  Friday: "viernes",
  Saturday: "sábado",
  Sunday: "domingo",
};

export default function Contact() {
  return (
    <section id="contacto" className="bg-frost px-5 pb-20 pt-16 sm:px-10 sm:pb-24 sm:pt-20">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Contacto"
          title="Dónde atiende el Dr. Espinoza"
          description="Dos consultorios en San Pedro Sula. Llamá, escribí por WhatsApp o agendá en línea."
        />
        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {sedes.map((sede) => (
            <Reveal key={sede.id}>
              <address className="not-italic rounded-[2rem] border border-line bg-white p-7">
                <h3 className="font-display text-xl font-semibold tracking-[-0.03em] text-ink sm:text-2xl">
                  {sede.name}
                </h3>
                <p className="mt-3 text-base leading-7 text-cloud">
                  {sede.street}
                  <br />
                  {sede.locality}, {sede.region}, Honduras
                </p>

                <ul className="mt-5 space-y-2">
                  {sede.phones.map((phone) => (
                    <li key={phone.tel}>
                      <a
                        href={`tel:${phone.tel}`}
                        className="text-sm font-semibold text-cobalt hover:underline"
                      >
                        {phone.label}: {phone.display}
                      </a>
                    </li>
                  ))}
                  {sede.email ? (
                    <li>
                      <a
                        href={`mailto:${sede.email}`}
                        className="text-sm font-semibold text-cobalt hover:underline"
                      >
                        {sede.email}
                      </a>
                    </li>
                  ) : null}
                </ul>

                {sede.hours ? (
                  <p className="mt-5 text-sm text-cloud">
                    {sede.hours.map((h) => (
                      <span key={h.opens}>
                        {DIAS_ES[h.days[0]]} a {DIAS_ES[h.days[h.days.length - 1]]}:{" "}
                        {h.opens} – {h.closes}
                      </span>
                    ))}
                  </p>
                ) : null}

                <div className="mt-6 flex flex-wrap gap-3">
                  {sede.whatsapp ? (
                    <a
                      href={`https://wa.me/${sede.whatsapp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-11 items-center rounded-full bg-cobalt px-5 text-sm font-semibold text-white"
                    >
                      Escribir por WhatsApp
                    </a>
                  ) : null}
                  <a
                    href={sede.bookingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center rounded-full border border-line px-5 text-sm font-semibold text-ink"
                  >
                    Agendar en línea
                  </a>
                </div>
              </address>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
