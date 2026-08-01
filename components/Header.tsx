"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { doctor, nav } from "@/data/site";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="absolute inset-x-0 top-0 z-[70] px-3 pt-3 sm:px-6 sm:pt-5">
      <div className="header-frame relative mx-auto flex h-[4.5rem] max-w-[99rem] items-center text-white xl:pr-[12rem]">
        <a
          href="/"
          onClick={() => setOpen(false)}
          className="group flex min-h-11 items-center gap-3 rounded-full pr-3"
          aria-label={`${doctor.name}, ir al inicio`}
        >
          <span
            className="relative grid h-11 w-11 place-items-center overflow-hidden rounded-full bg-white shadow-[0_12px_35px_-18px_rgba(2,12,39,0.65)]"
            aria-hidden="true"
          >
            <Image
              src="/img/hero-heart-blueprint.png"
              alt=""
              fill
              sizes="44px"
              className="scale-[1.55] object-contain"
            />
          </span>
          <span className="leading-none">
            <span className="block whitespace-nowrap font-display text-[10px] font-semibold uppercase tracking-[-0.025em] sm:text-[11px] xl:text-xs">
              {doctor.name}
            </span>
            <span className="mt-1 hidden text-[9px] font-semibold uppercase tracking-[0.17em] text-white sm:block">
              Cardiología intervencionista
            </span>
          </span>
        </a>

        <nav
          className="absolute right-0 hidden items-center xl:flex"
          aria-label="Principal"
        >
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="relative px-2.5 py-3 text-[11px] font-semibold uppercase tracking-[0.08em] text-white transition-colors after:absolute after:inset-x-2.5 after:bottom-1 after:h-px after:origin-left after:scale-x-0 after:bg-white after:transition-transform hover:after:scale-x-100"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          className="ml-auto grid h-12 w-12 place-items-center rounded-full border border-white/30 bg-white text-ink shadow-[0_14px_38px_-20px_rgba(2,12,39,0.7)] xl:hidden"
        >
          {open ? (
            <X className="h-5 w-5" aria-hidden="true" />
          ) : (
            <Menu className="h-5 w-5" aria-hidden="true" />
          )}
        </button>
      </div>

      <div
        id="mobile-navigation"
        aria-hidden={!open}
        inert={!open}
        className={`mx-auto mt-3 max-w-[99rem] overflow-hidden rounded-[1.75rem] border border-line bg-white shadow-[0_24px_80px_-32px_rgba(2,12,39,0.55)] transition-[max-height,opacity,transform] duration-500 xl:hidden ${
          open
            ? "max-h-[34rem] translate-y-0 opacity-100"
            : "pointer-events-none max-h-0 -translate-y-2 opacity-0"
        }`}
      >
        <nav className="p-3" aria-label="Principal móvil">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="flex min-h-12 items-center justify-between rounded-2xl px-4 text-sm font-semibold text-ink transition-colors hover:bg-frost"
            >
              {item.label}
              <ArrowUpRight className="h-4 w-4 text-cobalt" aria-hidden="true" />
            </a>
          ))}
          <a
            href="/#citas"
            onClick={() => setOpen(false)}
            className="mt-2 flex min-h-12 items-center justify-between rounded-2xl bg-cobalt px-4 text-sm font-semibold text-white"
          >
            Agendar cita
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </nav>
      </div>

      <a
        href="/#citas"
        onClick={() => setOpen(false)}
        aria-label="Agendar cita"
        className="header-booking-float group fixed right-5 top-1/2 z-[80] hidden h-12 -translate-y-1/2 items-center rounded-full border border-white/15 bg-navy/95 py-1 pl-4 pr-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-white shadow-[0_18px_46px_-20px_rgba(2,12,39,0.76)] backdrop-blur-md transition-[background-color,transform,box-shadow] duration-300 hover:-translate-y-[calc(50%+3px)] hover:bg-cobalt-bright hover:shadow-[0_22px_52px_-18px_rgba(2,12,39,0.86)] xl:inline-flex"
      >
        <span className="whitespace-nowrap">Agendar cita</span>
        <span className="ml-3 grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white text-ink transition-transform duration-500 group-hover:-rotate-45">
          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </span>
      </a>
    </header>
  );
}
