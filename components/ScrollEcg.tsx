"use client";

import { motion, useScroll, useSpring, useReducedMotion } from "framer-motion";

/**
 * ECG de progreso: el trazo se dibuja conforme avanza el scroll.
 * El latido recorre la página junto al visitante — la firma del sitio.
 */
export default function ScrollEcg() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  });
  const reduce = useReducedMotion();

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-[70] h-9">
      <svg
        className="h-full w-full text-pulse"
        viewBox="0 0 1200 40"
        fill="none"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        {/* Guía tenue del recorrido completo */}
        <path
          d={ECG_PATH}
          stroke="currentColor"
          strokeOpacity="0.12"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
        <motion.path
          d={ECG_PATH}
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
          initial={{ pathLength: 0 }}
          style={{ pathLength: reduce ? 1 : progress }}
        />
      </svg>
    </div>
  );
}

const ECG_PATH = `M0 26 H90
  c5 0 7 -7 12 -7 s7 7 12 7
  h28 l5 3 6 -20 7 28 5 -14 3 3
  h20 c6 0 8 -9 13 -9 s8 9 13 9
  H320
  c5 0 7 -7 12 -7 s7 7 12 7
  h28 l5 3 6 -20 7 28 5 -14 3 3
  h20 c6 0 8 -9 13 -9 s8 9 13 9
  H560
  c5 0 7 -7 12 -7 s7 7 12 7
  h28 l5 3 6 -20 7 28 5 -14 3 3
  h20 c6 0 8 -9 13 -9 s8 9 13 9
  H800
  c5 0 7 -7 12 -7 s7 7 12 7
  h28 l5 3 6 -20 7 28 5 -14 3 3
  h20 c6 0 8 -9 13 -9 s8 9 13 9
  H1040
  c5 0 7 -7 12 -7 s7 7 12 7
  h28 l5 3 6 -20 7 28 5 -14 3 3
  h20 c6 0 8 -9 13 -9 s8 9 13 9
  H1200`;
