"use client";

import { useRef, type ReactNode } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";

interface ParallaxProps {
  children: ReactNode;
  className?: string;
  /** Desplazamiento total en px mientras el elemento cruza el viewport */
  range?: number;
}

/** Desplaza suavemente el contenido a distinta velocidad que el scroll. */
export default function Parallax({
  children,
  className,
  range = 60,
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [range, -range]);

  return (
    <div ref={ref} className={className}>
      <motion.div style={reduce ? undefined : { y }}>{children}</motion.div>
    </div>
  );
}
