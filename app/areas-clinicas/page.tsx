"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { HeartPulse, Activity, ShieldCheck, Eye, CheckCircle2, AlertCircle, PhoneCall } from "lucide-react";
import { specialtiesData } from "@/data/specialties";

const iconMap: Record<string, React.ReactNode> = {
  HeartPulse: <HeartPulse className="h-10 w-10 text-accent" />,
  Activity: <Activity className="h-10 w-10 text-accent" />,
  ShieldCheck: <ShieldCheck className="h-10 w-10 text-accent" />,
  Eye: <Eye className="h-10 w-10 text-accent" />
};

export default function AreasClinicas() {
  return (
    <div className="pb-20 bg-cold-white">
      
      {/* Header Banner */}
      <section className="bg-primary text-white pt-36 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(0,151,178,0.1),transparent_60%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <span className="text-accent font-semibold text-xs uppercase tracking-widest block">
              Tratamientos Avanzados
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold font-serif">
              Áreas Clínicas & Procedimientos
            </h1>
            <p className="text-white/80 max-w-2xl text-sm sm:text-base font-sans font-light leading-relaxed">
              Tratamientos percutáneos mínimamente invasivos orientados a la rápida recuperación y restablecimiento de la función cardíaca óptima.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Specialties Deep Dive */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 space-y-16">
        {specialtiesData.map((specialty, idx) => {
          const isEven = idx % 2 === 0;
          return (
            <motion.div
              key={specialty.id}
              id={specialty.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
              className="bg-white rounded-3xl p-8 sm:p-12 border border-pearl-grey shadow-xl shadow-primary/5 scroll-mt-28"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                
                {/* Visual Anchor / Left Side Details */}
                <div className={`lg:col-span-4 space-y-6 ${!isEven && "lg:order-last"}`}>
                  <div className="bg-primary/5 p-6 rounded-3xl inline-block">
                    {iconMap[specialty.iconName]}
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-bold font-serif text-primary">
                    {specialty.title}
                  </h2>

                  <div className="bg-cold-white rounded-2xl p-6 border border-pearl-grey space-y-4">
                    <span className="text-xs font-bold text-secondary uppercase tracking-wider block border-b border-pearl-grey pb-2 flex items-center space-x-1.5">
                      <AlertCircle className="h-4 w-4" /> <span>Indicaciones Principales</span>
                    </span>
                    <ul className="space-y-3">
                      {specialty.indications.map((ind) => (
                        <li key={ind} className="flex items-start text-xs text-primary/70 leading-relaxed font-sans">
                          <span className="text-accent mr-2 font-bold">•</span>
                          <span>{ind}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Main Scientific / Clinical Description */}
                <div className="lg:col-span-8 space-y-6">
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-bold font-serif text-primary">Descripción del Procedimiento</h3>
                    <p className="text-primary/80 font-sans text-sm sm:text-base leading-relaxed">
                      {specialty.description}
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-bold font-serif text-primary">Beneficios y Ventajas Clínicas</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {specialty.benefits.map((benefit) => (
                        <div key={benefit} className="flex items-start space-x-2 text-xs sm:text-sm text-primary/75 leading-normal">
                          <CheckCircle2 className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                          <span className="font-sans">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Specialty Consultation CTA */}
                  <div className="pt-6 border-t border-pearl-grey">
                    <Link
                      href={`https://wa.me/50499999999?text=Hola%20Dr.%20Espinoza,%20deseo%20agendar%20una%20consulta%20para%20evaluaci%C3%B3n%20de%20${encodeURIComponent(specialty.title)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 bg-secondary hover:bg-secondary-hover text-white font-bold px-6 py-3 rounded-full text-xs sm:text-sm transition-all duration-300 hover:scale-105"
                    >
                      <PhoneCall className="h-4 w-4" />
                      <span>Consultar por esta Especialidad</span>
                    </Link>
                  </div>

                </div>

              </div>
            </motion.div>
          );
        })}
      </section>

    </div>
  );
}
