"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";

const PHRASES = [
  "TAVI (Implante Valvular Aórtico Transcatéter)",
  "Enfermedad Coronaria Compleja",
  "Intervencionismo Mitral y Estructural",
  "Imagen Intracoronaria (IVUS / OCT)",
];

const TYPING_SPEED = 55;
const ERASING_SPEED = 28;
const PAUSE_AFTER_TYPE = 2200;
const PAUSE_AFTER_ERASE = 450;

function TypewriterPhrases() {
  const [displayed, setDisplayed] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isErasing, setIsErasing] = useState(false);

  useEffect(() => {
    const current = PHRASES[phraseIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isErasing) {
      if (displayed.length < current.length) {
        timeout = setTimeout(
          () => setDisplayed(current.slice(0, displayed.length + 1)),
          TYPING_SPEED
        );
      } else {
        timeout = setTimeout(() => setIsErasing(true), PAUSE_AFTER_TYPE);
      }
    } else {
      if (displayed.length > 0) {
        timeout = setTimeout(
          () => setDisplayed(current.slice(0, displayed.length - 1)),
          ERASING_SPEED
        );
      } else {
        timeout = setTimeout(() => {
          setIsErasing(false);
          setPhraseIndex((i) => (i + 1) % PHRASES.length);
        }, PAUSE_AFTER_ERASE);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayed, isErasing, phraseIndex]);

  return (
    <div className="flex items-center min-h-[4rem]">
      <span className="text-2xl sm:text-3xl lg:text-4xl font-bold font-serif leading-tight text-secondary">
        {displayed}
      </span>
      <span className="inline-block w-[3px] h-7 sm:h-8 lg:h-9 bg-secondary animate-[blink_1s_step-end_infinite] ml-1" />
    </div>
  );
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-primary pt-20">
      
      {/* Background Interactive Mesh / Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(0,151,178,0.15),transparent_60%)] z-0" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(201,169,98,0.1),transparent_60%)] z-0" />
      
      {/* Animated SVG ECG Wave Background */}
      <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none z-0">
        <svg
          className="w-full h-48 text-secondary"
          viewBox="0 0 1000 100"
          preserveAspectRatio="none"
        >
          <path
            d="M0,50 L200,50 L220,20 L240,80 L260,50 L350,50 L360,35 L370,65 L380,50 L480,50 L490,10 L505,90 L520,50 L650,50 L660,35 L670,65 L680,50 L800,50 L810,15 L825,85 L840,50 L1000,50"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeDasharray="1000"
            strokeDashoffset="1000"
            className="animate-[dash_10s_linear_infinite]"
          />
        </svg>
      </div>

      {/* Grid Pattern Overlay */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1.5px,transparent_1.5px),linear-gradient(90deg,rgba(255,255,255,0.01)_1.5px,transparent_1.5px)] bg-[size:30px_30px] z-0 pointer-events-none opacity-40" 
      />

      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full text-center md:text-left py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Text Content */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Upper Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center space-x-2 bg-secondary/10 border border-secondary/35 text-secondary px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider"
            >
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
              <span>Cardiología Estructural Avanzada</span>
            </motion.div>

            {/* Main Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-1"
            >
              <p className="text-4xl sm:text-5xl lg:text-6xl font-bold font-serif leading-tight text-white">
                Dr. Manuel Espinoza
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-serif leading-tight text-white">
                Cardiología Intervencionista
              </h1>
            </motion.div>

            {/* Typewriter Phrases */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <TypewriterPhrases />
            </motion.div>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-lg sm:text-xl text-white/80 max-w-2xl font-sans font-light leading-relaxed"
            >
              Especialista líder en implante de válvula aórtica (TAVI), angioplastia coronaria de alta complejidad e imagen intracoronaria avanzada.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 pt-4"
            >
              <Link
                href="/sobre-el-doctor"
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-1.5 border border-white/30 hover:border-accent text-white hover:text-accent font-semibold px-8 py-4 rounded-full transition-all duration-300"
              >
                <span>Conoce al Doctor</span>
                <ChevronRight className="h-4 w-4" />
              </Link>
            </motion.div>

          </div>

          {/* Visual Side Component (Cardiovascular Technology Mockup) */}
          <div className="lg:col-span-4 flex justify-center lg:justify-end relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="relative w-72 h-72 sm:w-96 sm:h-96 rounded-full flex items-center justify-center border-2 border-white/5 bg-[radial-gradient(circle_at_center,rgba(0,151,178,0.1),transparent_70%)]"
            >
              {/* Inner Circular Lines */}
              <div className="absolute inset-4 rounded-full border border-white/10 animate-[spin_40s_linear_infinite]" />
              <div className="absolute inset-12 rounded-full border border-dashed border-accent/20 animate-[spin_20s_linear_infinite_reverse]" />
              <div className="absolute inset-20 rounded-full border border-secondary/20" />
              
              {/* Heartbeat Pulse Rings — lub (0s) + dub (0.35s) */}
              <div className="absolute w-48 h-48 sm:w-64 sm:h-64 rounded-full border-2 border-secondary/70 animate-[cardiac-pulse_2s_ease-out_0s_infinite]" />
              <div className="absolute w-48 h-48 sm:w-64 sm:h-64 rounded-full border border-secondary/40 animate-[cardiac-pulse_2s_ease-out_0.15s_infinite]" />
              <div className="absolute w-48 h-48 sm:w-64 sm:h-64 rounded-full border-2 border-secondary/70 animate-[cardiac-pulse_2s_ease-out_0.35s_infinite]" />
              <div className="absolute w-48 h-48 sm:w-64 sm:h-64 rounded-full border border-secondary/40 animate-[cardiac-pulse_2s_ease-out_0.5s_infinite]" />

              {/* Central Doctor Portrait */}
              <div className="relative w-48 h-48 sm:w-64 sm:h-64 rounded-full overflow-hidden border-4 border-secondary shadow-2xl flex items-center justify-center group bg-primary animate-[glow-pulse_2s_ease-in-out_infinite]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/Imagenes /Dr Manuel .jpg"
                  alt="Dr. Manuel Espinoza"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-primary/10 mix-blend-color pointer-events-none" />
              </div>

            </motion.div>


          </div>

        </div>
      </div>

      {/* Wave bottom separator */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-cold-white to-transparent" />
    </section>
  );
}
