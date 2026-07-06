"use client";

import { useEffect, useState } from "react";
import { nav } from "@/data/site";

/** Barra mínima: monograma, capítulos y la única acción que importa. */
export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[60] transition-colors duration-300 ${
        scrolled || open
          ? "border-b border-line bg-night/85 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="flex h-16 w-full items-center justify-between px-5 sm:px-14">
        <a href="#inicio" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-pulse" aria-hidden="true" />
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-cloud">
            Cardiología intervencionista
          </span>
        </a>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Principal">
          {nav.map((item, i) => (
            <a
              key={item.href}
              href={item.href}
              className="group flex items-baseline gap-2 text-sm text-cloud transition-colors hover:text-paper"
            >
              <span className="font-mono text-[9px] tracking-widest text-muted group-hover:text-pulse">
                {String(i + 1).padStart(2, "0")}
              </span>
              {item.label}
            </a>
          ))}
          <a
            href="#citas"
            className="rounded-full border border-teal px-5 py-2 text-sm font-semibold text-teal transition-colors hover:bg-teal hover:text-night"
          >
            Agendar cita
          </a>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
        >
          <span
            className={`h-px w-6 bg-paper transition-transform duration-300 ${
              open ? "translate-y-[3.5px] rotate-45" : ""
            }`}
          />
          <span
            className={`h-px w-6 bg-paper transition-transform duration-300 ${
              open ? "-translate-y-[3.5px] -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      {open && (
        <nav
          className="border-t border-line bg-night px-5 pb-8 pt-4 lg:hidden"
          aria-label="Principal móvil"
        >
          {nav.map((item, i) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="flex items-baseline gap-4 border-b border-line py-4 text-lg text-paper"
            >
              <span className="font-mono text-[10px] tracking-widest text-pulse">
                {String(i + 1).padStart(2, "0")}
              </span>
              {item.label}
            </a>
          ))}
          <a
            href="#citas"
            onClick={() => setOpen(false)}
            className="mt-6 flex items-center justify-center rounded-full bg-teal px-5 py-3.5 text-sm font-semibold text-night"
          >
            Agendar cita
          </a>
        </nav>
      )}
    </header>
  );
}
