"use client";

import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import { testimonialsData } from "../data/testimonials";

export default function Testimonials() {
  return (
    <section className="py-24 bg-cold-white relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-secondary font-semibold text-xs uppercase tracking-widest block">
            Testimonios Humanos
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-serif text-primary">
            La Voz de Nuestros Pacientes
          </h2>
          <div className="w-16 h-1 bg-accent mx-auto rounded-full" />
          <p className="text-primary/70 font-sans leading-relaxed">
            Historias reales de recuperación, alivio y confianza renovada gracias a procedimientos de mínima invasión.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonialsData.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="bg-white rounded-2xl p-8 border border-pearl-grey shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 flex flex-col justify-between relative group hover:-translate-y-1"
            >
              {/* Quote icon background */}
              <div className="absolute top-6 right-6 text-pearl-grey group-hover:text-accent/25 transition-colors duration-300">
                <Quote className="h-10 w-10 rotate-180" />
              </div>

              <div>
                {/* Rating stars */}
                <div className="flex space-x-1 mb-5">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                  ))}
                </div>

                {/* Quote Content */}
                <p className="text-primary/80 text-sm leading-relaxed mb-6 font-sans italic relative z-10">
                  &quot;{testimonial.text}&quot;
                </p>
              </div>

              {/* Patient Info */}
              <div className="flex items-center space-x-4 border-t border-pearl-grey pt-5 mt-auto">
                {/* User Avatar */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={testimonial.avatarUrl}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-accent"
                />
                <div>
                  <h4 className="text-sm font-bold text-primary font-sans">
                    {testimonial.name}
                  </h4>
                  <span className="text-[11px] text-primary/50 block">
                    {testimonial.age} años • {testimonial.city}
                  </span>
                  <span className="text-[11px] text-secondary font-semibold block uppercase tracking-wider mt-0.5">
                    {testimonial.condition}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
