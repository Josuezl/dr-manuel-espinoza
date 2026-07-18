"use client";

import { useEffect, useMemo, useState } from "react";
import { useReducedMotion } from "framer-motion";

interface Segment {
  text: string;
  accent?: boolean;
}

interface TypewriterProps {
  segments: Segment[];
  className?: string;
  /** clase de color para los segmentos de acento */
  accentClassName?: string;
  /** ms por carácter al escribir */
  typeSpeed?: number;
  /** ms por carácter al borrar */
  eraseSpeed?: number;
  /** pausa con la frase completa antes de borrar */
  holdMs?: number;
  /** pausa en vacío antes de reescribir */
  restMs?: number;
}

/**
 * Titular que se escribe letra a letra, se sostiene y se borra en bucle.
 * Con reduced-motion muestra el texto completo sin animación.
 */
export default function Typewriter({
  segments,
  className,
  accentClassName = "text-teal",
  typeSpeed = 55,
  eraseSpeed = 22,
  holdMs = 3200,
  restMs = 700,
}: TypewriterProps) {
  const reduce = useReducedMotion();
  const total = useMemo(
    () => segments.reduce((n, s) => n + s.text.length, 0),
    [segments],
  );
  const [count, setCount] = useState(0);
  const [phase, setPhase] = useState<"typing" | "holding" | "erasing" | "resting">(
    "typing",
  );

  useEffect(() => {
    if (reduce) return;
    let t: ReturnType<typeof setTimeout>;
    if (phase === "typing") {
      t =
        count < total
          ? setTimeout(() => setCount((c) => c + 1), typeSpeed)
          : setTimeout(() => setPhase("holding"), 0);
    } else if (phase === "holding") {
      t = setTimeout(() => setPhase("erasing"), holdMs);
    } else if (phase === "erasing") {
      t =
        count > 0
          ? setTimeout(() => setCount((c) => c - 1), eraseSpeed)
          : setTimeout(() => setPhase("resting"), 0);
    } else {
      t = setTimeout(() => setPhase("typing"), restMs);
    }
    return () => clearTimeout(t);
  }, [reduce, phase, count, total, typeSpeed, eraseSpeed, holdMs, restMs]);

  const fullText = segments.map((s) => s.text).join("");
  const shown = reduce ? total : count;
  const starts = useMemo(() => {
    const offsets: number[] = [];
    let acc = 0;
    for (const seg of segments) {
      offsets.push(acc);
      acc += seg.text.length;
    }
    return offsets;
  }, [segments]);

  return (
    <h1 className={className} aria-label={fullText}>
      <span aria-hidden="true">
        {segments.map((seg, i) => {
          const visible = Math.max(
            0,
            Math.min(seg.text.length, shown - starts[i]),
          );
          if (visible === 0) return null;
          return (
            <span key={i} className={seg.accent ? accentClassName : undefined}>
              {seg.text.slice(0, visible)}
            </span>
          );
        })}
        {!reduce && (
          <span
            className="pulse-dot -mb-[0.08em] ml-[0.06em] inline-block h-[0.95em] w-[3px] bg-pulse align-baseline"
            aria-hidden="true"
          />
        )}
      </span>
    </h1>
  );
}
