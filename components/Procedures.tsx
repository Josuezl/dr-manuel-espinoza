"use client";

import { useState } from "react";
import { procedures } from "@/data/site";
import Chapter from "./Chapter";
import WordsReveal from "./WordsReveal";
import Reveal from "./Reveal";

/**
 * Índice editorial de procedimientos: filas monumentales numeradas,
 * la descripción se despliega en la fila activa.
 */
export default function Procedures() {
  const [active, setActive] = useState(0);

  return (
    <section id="procedimientos" className="relative bg-abyss py-28 sm:py-40">
      <div className="mx-auto max-w-7xl px-5 sm:px-10">
        <Chapter index="03" title="Procedimientos" />

        <WordsReveal
          text="Precisión por catéter, guiada por imagen."
          accent={["Precisión"]}
          className="mt-10 max-w-4xl font-display text-5xl font-semibold leading-[1.02] tracking-tight sm:text-7xl"
        />

        <Reveal delay={0.1}>
          <ol className="mt-20 border-t border-line">
            {procedures.map((proc, i) => {
              const isActive = active === i;
              return (
                <li key={proc.name} className="border-b border-line">
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    onMouseEnter={() => setActive(i)}
                    aria-expanded={isActive}
                    className="group grid w-full grid-cols-[3rem_1fr] items-baseline gap-4 py-7 text-left sm:grid-cols-[6rem_1fr] sm:py-9"
                  >
                    <span
                      className={`font-mono text-xs tracking-[0.25em] transition-colors sm:text-sm ${
                        isActive ? "text-pulse" : "text-muted"
                      }`}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span>
                      <span
                        className={`block font-display text-2xl font-semibold leading-tight tracking-tight transition-colors duration-300 sm:text-4xl ${
                          isActive
                            ? "text-paper"
                            : "text-muted group-hover:text-cloud"
                        }`}
                      >
                        {proc.name}
                      </span>
                      <span
                        className={`grid transition-[grid-template-rows,opacity] duration-500 ease-out ${
                          isActive
                            ? "grid-rows-[1fr] opacity-100"
                            : "grid-rows-[0fr] opacity-0"
                        }`}
                      >
                        <span className="overflow-hidden">
                          <span className="block max-w-2xl pt-4 text-[15px] leading-relaxed text-cloud sm:text-base">
                            {proc.description}
                          </span>
                        </span>
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
        </Reveal>

        <Reveal delay={0.15}>
          <p className="mt-10 max-w-md font-mono text-[11px] uppercase leading-relaxed tracking-[0.2em] text-muted">
            Sin cirugía abierta · recuperación más rápida · planificación con
            imagen avanzada
          </p>
        </Reveal>
      </div>
    </section>
  );
}
