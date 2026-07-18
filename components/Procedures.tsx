import Image from "next/image";
import {
  Activity,
  Crosshair,
  HeartPulse,
  Microscope,
  Route,
  ScanHeart,
  type LucideIcon,
} from "lucide-react";
import { procedures } from "@/data/site";
import AutoScrollRail from "./AutoScrollRail";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

const procedureIcons: Record<string, LucideIcon> = {
  Activity,
  Crosshair,
  HeartPulse,
  Microscope,
  Route,
  ScanHeart,
};

export default function Procedures() {
  return (
    <section
      id="procedimientos"
      aria-labelledby="procedures-title"
      className="relative isolate overflow-hidden bg-frost py-24 sm:py-32 lg:py-36"
    >
      <div
        aria-hidden="true"
        className="absolute inset-y-0 left-0 -z-10 w-[28%] bg-cobalt-soft/45"
      />
      <div className="mx-auto max-w-7xl px-5 sm:px-10">
        <div id="procedures-title">
          <SectionHeading
            eyebrow="Procedimientos"
            title="Tecnología precisa. Decisiones individualizadas."
            description="Opciones por catéter e imagen avanzada que se valoran según la anatomía, el diagnóstico y las necesidades de cada paciente."
            className="max-w-3xl"
          />
        </div>

        <Reveal delay={0.16} className="mt-14 sm:mt-16">
          <AutoScrollRail
            ariaLabel="Procedimientos disponibles"
            className="-mx-5 overflow-x-auto px-5 pb-8 sm:-mx-10 sm:px-10 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            <ol className="auto-scroll-procedures flex gap-5">
              {procedures.map((procedure, index) => {
                const Icon = procedureIcons[procedure.icon] ?? HeartPulse;

                return (
                  <li
                    id={`procedimiento-${index + 1}`}
                    key={procedure.name}
                    className="w-[86%] flex-none snap-start scroll-ml-5 sm:w-[58%] sm:scroll-ml-10 lg:w-[31.8%]"
                  >
                    <article className="card-lift group relative flex h-full min-h-[34rem] flex-col overflow-hidden rounded-[1.75rem] border border-line bg-white shadow-[0_20px_65px_rgba(9,36,60,0.08)] hover:border-cobalt/35 hover:shadow-[0_28px_75px_rgba(51,104,198,0.16)]">
                      <div className="relative h-52 shrink-0 overflow-hidden bg-ink">
                        <Image
                          src={procedure.image}
                          alt=""
                          aria-hidden="true"
                          fill
                          loading="lazy"
                          style={{ objectPosition: procedure.imagePosition }}
                          className={`procedure-card-image ${
                            procedure.imageFit === "contain"
                              ? "object-contain p-3 sm:p-4"
                              : "object-cover"
                          }`}
                        />
                        <div
                          aria-hidden="true"
                          className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(2,12,39,0.68)_0%,rgba(51,104,198,0.12)_54%,rgba(9,36,60,0.62)_100%)]"
                        />
                      </div>

                      <div className="relative -mt-7 flex flex-1 flex-col rounded-t-[1.75rem] bg-white px-6 pb-6 pt-12 sm:px-8 sm:pb-8">
                        <div className="absolute -top-7 left-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/80 bg-white text-cobalt-bright shadow-[0_14px_35px_-18px_rgba(9,36,60,0.48)] motion-safe:transition-[transform,background-color,color] motion-safe:duration-500 group-hover:-translate-y-1 group-hover:bg-cobalt group-hover:text-white sm:left-8">
                          <Icon
                            aria-hidden="true"
                            className="h-7 w-7"
                            strokeWidth={1.7}
                          />
                        </div>

                        <h3 className="font-display text-[1.55rem] font-semibold leading-[1.14] tracking-[-0.045em] text-ink sm:text-[1.7rem]">
                          {procedure.name}
                        </h3>
                        <p className="mt-5 text-lg leading-7 text-cloud">
                          {procedure.description}
                        </p>

                        <div className="mt-auto border-t border-line pt-6">
                          <span className="max-w-[9rem] text-xs font-semibold uppercase leading-5 tracking-[0.12em] text-navy">
                            Cardiología intervencionista
                          </span>
                        </div>
                      </div>
                    </article>
                  </li>
                );
              })}
            </ol>
          </AutoScrollRail>
        </Reveal>

      </div>
    </section>
  );
}
