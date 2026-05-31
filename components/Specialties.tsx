"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { HeartPulse, Activity, ShieldCheck, Eye, ArrowRight } from "lucide-react";
import { specialtiesData } from "../data/specialties";

const iconMap: Record<string, React.ReactNode> = {
  HeartPulse: <HeartPulse className="h-7 w-7 text-accent" />,
  Activity: <Activity className="h-7 w-7 text-accent" />,
  ShieldCheck: <ShieldCheck className="h-7 w-7 text-accent" />,
  Eye: <Eye className="h-7 w-7 text-accent" />
};

export default function Specialties() {
  return (
    <section className="py-24 bg-cold-white relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-secondary font-semibold text-xs uppercase tracking-widest block">
            Especialización Clínica
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-serif text-primary">
            Áreas Clínicas de Alta Complejidad
          </h2>
          <div className="w-16 h-1 bg-accent mx-auto rounded-full" />
          <p className="text-primary/70 font-sans leading-relaxed">
            Procedimientos cardiovasculares avanzados y estructurales realizados bajo estándares internacionales de seguridad y efectividad clínica.
          </p>
        </div>

        {/* Specialties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {specialtiesData.map((specialty, index) => (
            <motion.div
              key={specialty.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-2xl p-8 border border-pearl-grey shadow-sm hover:shadow-xl hover:shadow-primary/5 hover:border-accent/30 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Header card with icon */}
                <div className="flex items-center space-x-4 mb-6">
                  <div className="bg-primary/5 p-3.5 rounded-2xl group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                    <div className="group-hover:scale-110 transition-transform duration-300">
                      {iconMap[specialty.iconName]}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold font-serif text-primary group-hover:text-secondary transition-colors">
                    {specialty.title}
                  </h3>
                </div>

                {/* Short Description */}
                <p className="text-primary/75 text-sm leading-relaxed mb-6 font-sans">
                  {specialty.shortDescription}
                </p>

                {/* Key Benefits Bullet points (first 2) */}
                <ul className="space-y-2 mb-8">
                  {specialty.benefits.slice(0, 2).map((benefit) => (
                    <li key={benefit} className="flex items-start text-xs text-primary/60 font-sans">
                      <span className="text-accent mr-2 mt-0.5">•</span>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Button */}
              <div>
                <Link
                  href={`/areas-clinicas#${specialty.id}`}
                  className="inline-flex items-center space-x-2 text-sm font-semibold text-secondary hover:text-accent group-hover:translate-x-1.5 transition-all duration-300"
                >
                  <span>Conocer más sobre esta área</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All CTAs */}
        <div className="text-center mt-14">
          <Link
            href="/areas-clinicas"
            className="inline-flex items-center justify-center space-x-2 bg-primary hover:bg-primary-hover text-white px-8 py-3.5 rounded-full font-bold shadow-md transition-all duration-300 hover:scale-105"
          >
            <span>Ver Todas las Áreas Clínicas</span>
          </Link>
        </div>

      </div>
    </section>
  );
}
