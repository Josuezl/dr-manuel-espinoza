"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { doctor } from "@/data/site";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const portraitY = useTransform(scrollYProgress, [0, 1], [0, 110]);

  return (
    <section
      ref={sectionRef}
      id="inicio"
      className="relative isolate overflow-hidden rounded-b-[3rem] bg-[linear-gradient(108deg,#4b62d9_0%,#4d66d6_62%,#263181_100%)] text-white xl:min-h-[58rem]"
    >
      <div
        className="hero-blueprint pointer-events-none absolute inset-0 opacity-60"
        aria-hidden="true"
      />
      <div
        className="hero-heart-blueprint pointer-events-none absolute right-[10%] top-[12%] z-[1] hidden h-[36rem] w-[29rem] opacity-[0.24] mix-blend-screen lg:block"
        aria-hidden="true"
      >
        <Image
          src="/img/hero-heart-blueprint.png"
          alt=""
          fill
          sizes="(min-width: 1024px) 464px, 0px"
          className="object-contain"
        />
      </div>
      <div
        className="pointer-events-none absolute -left-48 -top-40 h-[34rem] w-[34rem] rounded-full border border-white/10"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-40 bottom-[-13rem] h-[40rem] w-[40rem] rounded-full border border-white/10"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute left-[8%] top-[20%] h-24 w-24 rotate-12 rounded-[1.5rem] border border-white/15"
        aria-hidden="true"
      />

      <svg
        className="hero-circuit pointer-events-none absolute inset-x-0 bottom-[-5rem] z-[1] hidden h-[20rem] w-full md:block"
        viewBox="0 0 1600 320"
        preserveAspectRatio="none"
        fill="none"
        aria-hidden="true"
      >
        <motion.path
          d="M0 286H552C586 286 604 268 604 234V160C604 126 622 108 656 108H944C978 108 996 126 996 160V234C996 268 1014 286 1048 286H1600"
          stroke="white"
          strokeOpacity="0.42"
          strokeWidth="1.5"
          initial={reduce ? false : { pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.35, delay: 0.5, ease: "easeOut" }}
        />
      </svg>

      <div className="relative z-10 mx-auto grid max-w-[99rem] items-end gap-8 px-5 pb-24 pt-[9rem] sm:px-10 sm:pt-[10rem] md:pt-[11rem] xl:min-h-[58rem] xl:grid-cols-[minmax(0,34rem)_1fr] xl:px-14 xl:pb-28 xl:pt-[18rem]">
        <motion.div
          initial={reduce ? false : { opacity: 0, x: -34 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.82, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-30 max-w-xl md:max-w-[31rem] md:pb-10 xl:col-start-1 xl:pb-28"
        >
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white sm:text-xs">
            San Pedro Sula · Honduras
          </p>
          <h1 className="mt-6 max-w-xl font-display text-[2.5rem] font-semibold leading-[1.03] tracking-[-0.035em] sm:text-[3.25rem] xl:text-[3.75rem]">
            Cardiología de alta complejidad.
          </h1>
          <p className="mt-7 max-w-md text-lg leading-8 text-white sm:text-[1.125rem]">
            Intervenciones mínimamente invasivas para enfermedad coronaria y
            cardiopatía estructural, guiadas por imagen y evidencia.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#citas"
              className="group inline-flex min-h-12 items-center rounded-full bg-white pl-5 text-sm font-semibold text-cobalt"
            >
              Agendar cita
              <span className="ml-3 grid h-12 w-12 place-items-center rounded-full border-[3px] border-white bg-navy text-white transition-transform duration-500 group-hover:-rotate-45">
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </span>
            </a>
            <a
              href="#procedimientos"
              className="inline-flex min-h-12 items-center rounded-full border border-white/35 px-5 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-cobalt"
            >
              Ver procedimientos
            </a>
          </div>
        </motion.div>

        <motion.figure
          style={reduce ? undefined : { y: portraitY }}
          initial={reduce ? false : { opacity: 0, scale: 0.9, y: 45 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.05, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-20 -mb-24 h-[31rem] w-[min(116vw,38rem)] max-w-none justify-self-center self-end sm:-mb-28 sm:h-[39rem] sm:w-[min(110vw,44rem)] md:mb-0 md:h-[44rem] xl:pointer-events-none xl:absolute xl:inset-x-0 xl:bottom-0 xl:mx-auto xl:h-[calc(100%-4rem)] xl:w-[min(68vw,68rem)]"
        >
          <Image
            src="/img/dr-manuel-espinoza-cutout.webp"
            alt={`Retrato del ${doctor.name}`}
            fill
            preload
            className="hero-portrait-cutout z-10 origin-bottom scale-[1.06] object-contain object-bottom sm:scale-[1.03] xl:scale-[1.12]"
          />
        </motion.figure>
      </div>

      <motion.a
        href="#procedimientos"
        initial={reduce ? false : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.3, duration: 0.6 }}
        className="absolute bottom-16 left-1/2 z-30 grid h-16 w-16 -translate-x-1/2 place-items-center rounded-full border-4 border-frost bg-white text-cobalt shadow-lg"
        aria-label="Continuar a procedimientos"
      >
        <ArrowDown className="float-slow h-5 w-5" aria-hidden="true" />
      </motion.a>
    </section>
  );
}
