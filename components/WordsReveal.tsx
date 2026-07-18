"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { JSX } from "react";

interface WordsRevealProps {
  text: string;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  delay?: number;
}

/** Titular que se revela palabra por palabra al entrar en pantalla. */
export default function WordsReveal({
  text,
  as: Tag = "h2",
  className,
  delay = 0,
}: WordsRevealProps) {
  const reduce = useReducedMotion();
  const words = text.split(" ");

  return (
    <Tag className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((word, i) => {
          return (
            <span
              key={`${word}-${i}`}
              className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-bottom"
            >
              <motion.span
                className="inline-block"
                initial={reduce ? false : { y: "110%" }}
                whileInView={{ y: 0 }}
                viewport={{ once: true, margin: "0px 0px -60px 0px" }}
                transition={{
                  duration: 0.7,
                  delay: delay + i * 0.055,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {word}
              </motion.span>
              {i < words.length - 1 ? " " : null}
            </span>
          );
        })}
      </span>
    </Tag>
  );
}
