import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { faq } from "@/data/faq";
import { faqSchema } from "@/lib/schema";
import JsonLd from "./JsonLd";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

export default function Faq() {
  return (
    <section id="preguntas" className="bg-frost px-5 pb-20 pt-16 sm:px-10 sm:pb-24 sm:pt-20">
      <JsonLd data={faqSchema(faq)} />
      <div className="mx-auto max-w-4xl">
        <SectionHeading
          eyebrow="Preguntas frecuentes"
          title="Lo que más preguntan los pacientes"
          description="Respuestas breves sobre los procedimientos y las señales de alarma que no conviene ignorar."
        />
        <div className="mt-14 space-y-3">
          {faq.map((item) => (
            <Reveal key={item.pregunta}>
              <details className="group rounded-[1.5rem] border border-line bg-white p-6">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-4 font-display text-lg font-semibold leading-snug tracking-[-0.03em] text-ink marker:content-none">
                  <span>{item.pregunta}</span>
                  <ChevronDown
                    aria-hidden="true"
                    className="mt-1 h-5 w-5 shrink-0 text-cobalt motion-safe:transition-transform motion-safe:duration-300 group-open:rotate-180"
                  />
                </summary>
                <p className="mt-4 text-base leading-7 text-cloud">{item.respuesta}</p>
                {item.enlace ? (
                  <Link
                    href={item.enlace.href}
                    className="mt-3 inline-block text-sm font-semibold text-cobalt hover:underline"
                  >
                    {item.enlace.label}
                  </Link>
                ) : null}
              </details>
            </Reveal>
          ))}
        </div>
        <p className="mt-10 text-xs leading-6 text-cloud">
          Esta información es orientativa y no sustituye una consulta médica. Ante
          síntomas de urgencia, buscá atención inmediata.
        </p>
      </div>
    </section>
  );
}
