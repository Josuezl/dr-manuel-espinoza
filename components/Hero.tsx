"use client";

import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { doctor } from "@/data/site";
import Typewriter from "./Typewriter";

/**
 * Apertura cinematográfica: el titular se escribe letra a letra
 * sobre la noche clínica, con el retrato del doctor fundido al fondo.
 */
export default function Hero() {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const photoY = useTransform(scrollY, [0, 900], [0, 120]);
  const fadeOut = useTransform(scrollY, [0, 700], [1, 0]);

  return (
    <section id="inicio" className="relative flex min-h-svh flex-col overflow-hidden">
      {/* Retrato fundido en la atmósfera */}
      <motion.div
        style={reduce ? undefined : { y: photoY }}
        className="pointer-events-none absolute inset-y-0 right-0 w-[88%] max-w-[720px] sm:w-[60%]"
        aria-hidden="true"
      >
        <div
          className="relative h-full w-full opacity-50 saturate-[0.55] sm:opacity-70"
          style={{
            maskImage:
              "radial-gradient(85% 80% at 62% 45%, black 35%, transparent 78%)",
            WebkitMaskImage:
              "radial-gradient(85% 80% at 62% 45%, black 35%, transparent 78%)",
          }}
        >
          <Image
            src={doctor.photo}
            alt=""
            fill
            priority
            sizes="(min-width: 640px) 60vw, 88vw"
            className="object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-night via-night/35 to-night/60" />
        </div>
      </motion.div>

      {/* Resplandor teal de sala de hemodinamia */}
      <div
        className="pointer-events-none absolute -left-40 top-1/3 h-[480px] w-[480px] rounded-full bg-teal/10 blur-[140px]"
        aria-hidden="true"
      />

      <div className="relative z-10 flex w-full flex-1 flex-col justify-center px-5 pb-10 pt-28 sm:px-14">
        <Typewriter
          segments={[
            { text: "Intervenciones de alta complejidad guiadas por la " },
            { text: "ciencia", accent: true },
            { text: ", impulsadas por la " },
            { text: "vocación", accent: true },
            { text: "." },
          ]}
          className="min-h-[4.4em] max-w-3xl font-display text-[1.85rem] font-semibold leading-[1.18] tracking-tight sm:min-h-[3.6em] sm:text-4xl lg:text-5xl"
        />

        <motion.p
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-8 max-w-xl font-mono text-[11px] uppercase leading-loose tracking-[0.22em] text-cloud sm:mt-10 sm:text-xs"
        >
          {doctor.name} · Cardiología intervencionista · {doctor.city}
        </motion.p>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-8 flex flex-wrap items-center gap-4"
        >
          <a
            href="#citas"
            className="rounded-full bg-teal px-7 py-3.5 text-[15px] font-semibold text-night transition-colors hover:bg-paper"
          >
            Agendar cita
          </a>
          <a
            href="#noticias"
            className="rounded-full border border-line px-7 py-3.5 text-[15px] font-semibold text-paper transition-colors hover:border-teal hover:text-teal"
          >
            Noticias
          </a>
        </motion.div>
      </div>

      {/* Invitación a descender */}
      <motion.div
        style={reduce ? undefined : { opacity: fadeOut }}
        className="relative z-10 flex items-center justify-center gap-3 pb-14"
      >
        <span className="scroll-hint inline-block h-8 w-px bg-pulse" aria-hidden="true" />
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted">
          Desliza — el recorrido late contigo
        </p>
      </motion.div>
    </section>
  );
}
