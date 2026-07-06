import Image from "next/image";
import { doctor } from "@/data/site";
import Chapter from "./Chapter";
import WordsReveal from "./WordsReveal";
import Parallax from "./Parallax";
import Reveal from "./Reveal";

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
    text: "Atiendo en dos sedes de San Pedro Sula — Consultorio CNA y Hospital del Valle — con agenda en línea.",
  },
];

export default function About() {
  return (
    <section id="sobre-mi" className="relative overflow-hidden py-28 sm:py-40">
      <div className="mx-auto max-w-7xl px-5 sm:px-10">
        <Chapter index="04" title="Sobre mí" />

        <div className="mt-10 grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-24">
          <div>
            <Parallax range={30}>
              <figure className="relative max-w-sm overflow-hidden rounded-3xl border border-line">
                <Image
                  src={doctor.photo}
                  alt={`Retrato del ${doctor.name}, cardiólogo intervencionista`}
                  width={958}
                  height={958}
                  className="h-auto w-full"
                />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-night via-night/70 to-transparent px-6 pb-5 pt-16">
                  <span className="block font-display text-lg font-semibold text-paper">
                    {doctor.name}
                  </span>
                  <span className="mt-1 block font-mono text-[10px] uppercase tracking-[0.2em] text-cloud">
                    {doctor.title}
                  </span>
                </figcaption>
              </figure>
            </Parallax>
          </div>

          <div>
            <WordsReveal
              text="La opción menos invasiva que la evidencia permita."
              accent={["menos", "invasiva"]}
              className="font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl"
            />

            <Reveal delay={0.12}>
              <p className="mt-8 max-w-xl text-lg leading-relaxed text-cloud">
                Soy cardiólogo intervencionista, dedicado al diagnóstico y
                tratamiento de la enfermedad coronaria y de las valvulopatías
                por vía percutánea. Mi práctica combina la precisión de la
                imagen avanzada con una convicción simple: cada paciente merece
                volver a su vida lo antes posible.
              </p>
            </Reveal>

            <div className="mt-14 grid gap-x-10 gap-y-10 sm:grid-cols-2">
              {credentials.map((item, i) => (
                <Reveal key={item.label} delay={0.08 * i}>
                  <div className="border-t border-line pt-5">
                    <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-pulse">
                      {item.label}
                    </p>
                    <p className="mt-3 text-[15px] leading-relaxed text-cloud">
                      {item.text}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
