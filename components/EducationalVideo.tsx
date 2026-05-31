"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Heart, CheckCircle2, X } from "lucide-react";

export default function EducationalVideo() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className="py-24 bg-white relative z-20 overflow-hidden">
      
      {/* Background shapes */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-pearl-grey rounded-full filter blur-3xl opacity-60 translate-x-1/3 -translate-y-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 rounded-full filter blur-3xl opacity-50 -translate-x-1/3 translate-y-1/3 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Educational Text */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-secondary font-semibold text-xs uppercase tracking-widest block">
              Educación al Paciente
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-serif text-primary leading-tight">
              Tecnología 3D: Entienda su procedimiento paso a paso
            </h2>
            <div className="w-16 h-1 bg-accent rounded-full" />
            
            <p className="text-primary/75 leading-relaxed font-sans">
              Para el Dr. Manuel Espinoza, un paciente informado toma mejores decisiones de salud. Por ello, utilizamos animaciones 3D e ilustraciones interactivas durante la consulta para explicar cómo realizamos las terapias transcatéter en el corazón.
            </p>

            {/* Bullets */}
            <div className="space-y-3 pt-2">
              {[
                "Simuladores anatómicos tridimensionales",
                "Visualización del implante de prótesis valvulares",
                "Explicación didáctica de angioplastias",
                "Comprensión clara de los riesgos y beneficios"
              ].map((item) => (
                <div key={item} className="flex items-center space-x-3 text-sm text-primary/80">
                  <CheckCircle2 className="h-5 w-5 text-accent shrink-0" />
                  <span className="font-sans font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Interactive Video Player Mockup */}
          <div className="lg:col-span-7 flex justify-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative w-full aspect-video rounded-3xl overflow-hidden shadow-2xl bg-primary border-4 border-white/50 group cursor-pointer"
              onClick={() => setIsPlaying(true)}
            >
              {/* Fake Video Thumbnail (gradient, heart wireframe overlay, clinical vibe) */}
              <div className="absolute inset-0 bg-gradient-to-tr from-primary via-primary/80 to-secondary/40 z-10 flex flex-col items-center justify-center p-6 text-center">
                
                {/* SVG Cardiac Structure Mockup */}
                <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
                  <svg className="w-64 h-64 text-white" viewBox="0 0 200 200" fill="none">
                    <circle cx="100" cy="100" r="80" stroke="currentColor" strokeWidth="1" strokeDasharray="5,5" />
                    <circle cx="100" cy="100" r="50" stroke="currentColor" strokeWidth="1" />
                    <path d="M100 20 L100 180 M20 100 L180 100" stroke="currentColor" strokeWidth="0.5" />
                  </svg>
                </div>

                {/* Animated Pulsing Heart Icon */}
                <div className="bg-white/10 p-5 rounded-full backdrop-blur-md mb-6 border border-white/20 group-hover:scale-110 transition-transform duration-300 relative">
                  <Play className="h-10 w-10 text-accent fill-accent ml-1" />
                  <span className="absolute inset-0 rounded-full border border-accent animate-ping opacity-60"></span>
                </div>

                <h3 className="text-white text-lg sm:text-xl font-bold font-serif max-w-md">
                  Visualización Educativa del Implante Valvular Aórtico (TAVI)
                </h3>
                <p className="text-accent/90 text-xs sm:text-sm font-sans tracking-wide mt-2">
                  Reproducir simulación didáctica (3:15 min)
                </p>

                {/* Length tag */}
                <span className="absolute bottom-4 right-4 bg-primary/80 backdrop-blur-sm text-white text-xs px-2.5 py-1 rounded-md font-sans border border-white/10">
                  3:15
                </span>
              </div>

              {/* Background ECG loop visual placeholder */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,151,178,0.2),transparent_70%)]" />
            </motion.div>
          </div>

        </div>
      </div>

      {/* Video Modal (Popup Player) */}
      <AnimatePresence>
        {isPlaying && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-primary/95 backdrop-blur-md"
          >
            <div className="relative w-full max-w-4xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/10">
              
              {/* Close Button */}
              <button
                onClick={() => setIsPlaying(false)}
                className="absolute top-4 right-4 z-50 bg-white/10 hover:bg-white/20 text-white p-2.5 rounded-full backdrop-blur-md transition-colors"
                aria-label="Cerrar reproductor"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Simulated video playback (using beautiful HTML canvas or loop video) */}
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-primary text-center p-8">
                
                {/* Heart simulation */}
                <div className="w-24 h-24 rounded-full bg-secondary/10 flex items-center justify-center text-white mb-6 border border-secondary/30 relative">
                  <Heart className="h-12 w-12 text-accent animate-heartbeat" />
                  <span className="absolute inset-0 rounded-full border border-secondary animate-ping"></span>
                </div>

                <h3 className="text-white text-2xl font-bold font-serif mb-2">
                  Simulación de Anatomía Cardiovascular y Flujo Hemodinámico
                </h3>
                <p className="text-white/70 max-w-lg text-sm font-sans mb-8">
                  Para ver este video interactivo educativo en alta resolución durante su consulta clínica presencial, agende una cita con el Dr. Manuel Espinoza.
                </p>

                <button
                  onClick={() => setIsPlaying(false)}
                  className="bg-accent hover:bg-accent-hover text-primary font-bold px-8 py-3 rounded-full shadow-md transition-transform hover:scale-105"
                >
                  Regresar a la Web
                </button>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
