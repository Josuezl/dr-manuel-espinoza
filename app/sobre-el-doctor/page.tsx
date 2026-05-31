"use client";

import { motion } from "framer-motion";
import { GraduationCap, Award, HeartPulse, AwardIcon, ShieldCheck } from "lucide-react";
import { doctorData } from "@/data/doctor";

export default function SobreElDoctor() {
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
              Trayectoria Profesional
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold font-serif">
              Sobre el Dr. Manuel Espinoza
            </h1>
            <p className="text-white/80 max-w-2xl text-sm sm:text-base font-sans font-light leading-relaxed">
              Líder en terapias percutáneas, comprometido con la excelencia académica internacional y el bienestar humano de cada paciente.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Profile and Biography */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Portrait & Stats Card */}
          <div className="lg:col-span-4 space-y-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="relative aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-primary group"
            >
              {/* Doctor portrait placeholder */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/Imagenes /Dr Manuel .jpg"
                alt="Dr. Manuel Espinoza"
                className="w-full h-full object-cover grayscale-[20%] contrast-[105%]"
              />
              <div className="absolute inset-0 bg-primary/10 mix-blend-color pointer-events-none" />
              
              <div className="absolute bottom-6 left-6 right-6 bg-primary/90 backdrop-blur-md p-4 rounded-xl border border-white/10 text-center">
                <span className="text-accent font-serif text-base font-bold block">{doctorData.name}</span>
                <span className="text-[10px] text-white/70 block tracking-wider uppercase font-medium mt-0.5">
                  FMC Honduras Reg. Nº 2008-0421
                </span>
              </div>
            </motion.div>

            {/* Quote Box */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-2xl p-6 border border-pearl-grey text-center italic text-primary/80 font-sans text-sm shadow-sm relative"
            >
              <div className="absolute -top-3 left-6 bg-accent text-primary px-3 py-0.5 rounded-full text-[10px] uppercase font-bold tracking-wider not-italic">
                Filosofía
              </div>
              &quot;La cardiología de alta complejidad no solo requiere de precisión tecnológica en la sala de hemodinámica, sino de un oído atento e integrador al lado de la cama del paciente.&quot;
            </motion.div>
          </div>

          {/* Right Column: Bio Details, Education Timeline */}
          <div className="lg:col-span-8 space-y-12">
            
            {/* Detailed Bio */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6 text-primary bg-white p-8 sm:p-10 rounded-3xl border border-pearl-grey shadow-sm"
            >
              <h2 className="text-2xl font-bold font-serif text-primary border-b border-pearl-grey pb-4">
                Biografía y Liderazgo Clínico
              </h2>
              <div className="space-y-4 font-sans text-sm leading-relaxed text-primary/80">
                <p>
                  El <strong>Dr. Manuel Espinoza</strong> es un cardiólogo intervencionista hondureño con una reconocida trayectoria en el tratamiento por catéter de enfermedades valvulares cardíacas y arterias coronarias de extrema complejidad.
                </p>
                <p>
                  Comenzó su formación académica en la Universidad Nacional Autónoma de Honduras, graduándose con honores de la carrera de medicina. Posteriormente, guiado por su pasión por la cardiología clínica, se trasladó al prestigioso <strong>Instituto Nacional de Cardiología Ignacio Chávez</strong> en la Ciudad de México, donde completó su especialización médica.
                </p>
                <p>
                  Consciente de la vertiginosa innovación en la medicina endovascular, realizó su subespecialidad en Cardiología Intervencionista en el <strong>Hospital Clínic de Barcelona</strong> en España, uno de los centros líderes en Europa. Concluyó su desarrollo profesional mediante un fellowship avanzado de cardiología estructural en el afamado departamento de la <strong>Cleveland Clinic</strong> en Estados Unidos, perfeccionando técnicas percutáneas modernas como el reemplazo valvular aórtico por catéter (TAVI) y la reparación percutánea de la válvula mitral (MitraClip).
                </p>
                <p>
                  Actualmente, combina su práctica profesional con la participación constante en congresos nacionales e internacionales y la formación de nuevas generaciones médicas, siendo un referente de consulta para cardiólogos clínicos en toda la región.
                </p>
              </div>
            </motion.div>

            {/* Academic Journey (Timeline) */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold font-serif text-primary flex items-center space-x-2">
                <GraduationCap className="h-6 w-6 text-accent" />
                <span>Formación Académica e Hitos</span>
              </h2>
              <div className="border-l-2 border-accent/40 pl-6 ml-3 space-y-8 relative">
                {doctorData.education.map((edu, idx) => (
                  <motion.div
                    key={edu.degree}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="relative"
                  >
                    {/* Timeline bullet */}
                    <span className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-accent border-2 border-white shadow-md" />
                    
                    <span className="text-xs text-secondary font-bold font-sans tracking-wide block mb-1">
                      {edu.year}
                    </span>
                    <h3 className="text-base font-bold text-primary font-serif">
                      {edu.degree}
                    </h3>
                    <p className="text-xs text-primary/75 font-sans mt-0.5">
                      {edu.institution}
                    </p>
                    {edu.details && (
                      <p className="text-xs text-primary/60 font-sans italic mt-1">
                        {edu.details}
                      </p>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Memberships & Accreditations */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold font-serif text-primary flex items-center space-x-2">
                <Award className="h-6 w-6 text-accent" />
                <span>Membresías y Acreditaciones Científicas</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {doctorData.memberships.map((membership, idx) => (
                  <motion.div
                    key={membership}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.08 }}
                    className="flex items-start space-x-3 bg-white p-4 rounded-xl border border-pearl-grey shadow-sm hover:border-accent/30 transition-colors"
                  >
                    <ShieldCheck className="h-5 w-5 text-secondary shrink-0 mt-0.5 animate-pulse" />
                    <span className="text-xs font-bold text-primary/80 font-sans leading-relaxed">
                      {membership}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
}
