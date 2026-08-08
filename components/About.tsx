import Image from "next/image";
import { doctor } from "@/data/site";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

const credentials = [
  {
    label: "Pionero",
    text: "Lideré el primer procedimiento MyClip (reparación mitral percutánea) realizado en Honduras.",
  },
  {
    label: "Autor",
    text: "He publicado en revistas indexadas: JACC: Case Reports, Cardiology y Archivos de Cardiología de México.",
  },
  {
    label: "Especialista",
    text: "Alta especialidad en cardiología intervencionista y cardiopatía estructural, formada en centros de referencia internacionales.",
  },
  {
    label: "Cercano",
    text: "Atiendo en dos sedes de San Pedro Sula: Centro de Neumología y Alergias (CNA) y Hospital del Valle, con agenda en línea.",
  },
];

export default function About() {
  return (
    <section
      id="sobre-mi"
      className="relative isolate overflow-hidden bg-white py-24 sm:py-32 lg:py-36"
    >
      <div
        className="absolute right-0 top-0 -z-10 h-full w-1/3 bg-[linear-gradient(90deg,transparent,rgba(231,235,255,0.38))]"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-7xl px-5 sm:px-10">
        <div className="grid items-start gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12 xl:gap-20">
          <div className="mx-auto w-full max-w-[34rem] lg:mx-0">
            <figure>
              <div className="relative aspect-square w-full">
                <Image
                  src="/img/dr-manuel-espinoza-cutout.webp"
                  alt={`Retrato del ${doctor.name}, cardiólogo intervencionista`}
                  fill
                  sizes="(min-width: 1024px) 540px, (min-width: 640px) 70vw, 94vw"
                  className="hero-portrait-cutout translate-x-[5%] object-contain object-bottom"
                />
              </div>

              <figcaption className="mt-3 text-center lg:text-left">
                <span className="block font-display text-lg font-semibold tracking-tight text-ink">
                  {doctor.name}
                </span>
                <span className="mt-1 block text-xs leading-relaxed text-cloud">
                  {doctor.title} · {doctor.city}
                </span>
              </figcaption>
            </figure>
          </div>

          <div>
            <SectionHeading
              eyebrow="Sobre el especialista"
              title="Menos invasivo. Más precisión para volver a tu vida."
              description="Soy cardiólogo intervencionista, dedicado al diagnóstico y tratamiento de la enfermedad coronaria y de las valvulopatías por vía percutánea. Mi práctica combina la precisión de la imagen avanzada con una convicción simple: cada paciente merece volver a su vida lo antes posible."
            />

            <Reveal delay={0.16}>
              <p className="mt-8 max-w-xl font-display text-xl font-semibold leading-snug tracking-[-0.03em] text-navy sm:text-2xl">
                La opción menos invasiva que la evidencia permita.
              </p>
            </Reveal>

            <div className="mt-10 grid auto-rows-fr gap-4 sm:grid-cols-2">
              {credentials.map((item, index) => (
                <Reveal key={item.label} delay={0.08 * index} className="h-full">
                  <article className="card-lift group flex h-full min-h-[12rem] flex-col rounded-2xl border border-line bg-frost p-6 hover:border-cobalt/30 hover:shadow-[0_22px_55px_-35px_rgba(9,36,60,0.42)]">
                    <div className="flex items-center justify-between gap-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cobalt">
                        {item.label}
                      </p>
                      <span
                        className="font-mono text-[10px] tracking-[0.18em] text-muted"
                        aria-hidden="true"
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <p className="mt-5 text-lg leading-7 text-cloud">
                      {item.text}
                    </p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
