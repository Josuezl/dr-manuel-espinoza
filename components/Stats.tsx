"use client";

import { motion } from "framer-motion";
import { Award, ShieldCheck, Heart } from "lucide-react";
import { doctorData } from "../data/doctor";

export default function Stats() {
  // Icon mapper
  const icons = [
    <Award key="award" className="h-8 w-8 text-accent" />,
    <ShieldCheck key="shield" className="h-8 w-8 text-accent" />,
    <Heart key="heart" className="h-8 w-8 text-accent" />
  ];

  return (
    <section className="relative z-20 py-16 bg-white border-y border-pearl-grey">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {doctorData.stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="flex flex-col items-center text-center p-6 bg-cold-white rounded-2xl border border-pearl-grey hover:border-accent/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 group"
            >
              {/* Stat Icon */}
              <div className="bg-primary/5 p-4 rounded-full mb-4 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                <div className="group-hover:scale-110 transition-transform duration-300">
                  {icons[index]}
                </div>
              </div>

              {/* Stat Value */}
              <span className="text-4xl sm:text-5xl font-extrabold font-serif text-primary block mb-2 tracking-tight">
                {stat.label}
              </span>

              {/* Stat Description */}
              <p className="text-primary/70 text-sm font-sans leading-relaxed max-w-xs">
                {stat.description}
              </p>
            </motion.div>
          ))}

        </div>
      </div>
    </section>
  );
}
