"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock, Calendar, ExternalLink } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import Map from "@/components/Map";
import { doctorData } from "@/data/doctor";

export default function Contacto() {
  return (
    <div className="pb-20 bg-cold-white">
      
      {/* Header Banner */}
      <section className="bg-primary text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(0,151,178,0.1),transparent_60%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <span className="text-accent font-semibold text-xs uppercase tracking-widest block">
              Atención Médica Directa
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold font-serif">
              Contacto & Citas
            </h1>
            <p className="text-white/80 max-w-2xl text-sm sm:text-base font-sans font-light leading-relaxed">
              Agende su consulta médica en Tegucigalpa o remita un paciente complejo a nuestro servicio de cardiología intervencionista.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Body Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Form */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold font-serif text-primary">
                Envíenos un mensaje
              </h2>
              <p className="text-primary/70 text-sm font-sans leading-relaxed">
                Utilice el formulario de contacto para hacernos llegar sus preguntas, coordinar segundas opiniones o solicitar información sobre procedimientos específicos.
              </p>
            </div>
            
            <ContactForm />
          </div>

          {/* Right Column: Physical Details & Map */}
          <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-24">
            
            <div className="space-y-4">
              <h2 className="text-2xl font-bold font-serif text-primary">
                Canales de Atención
              </h2>
              <p className="text-primary/70 text-sm font-sans leading-relaxed">
                Puede comunicarse telefónicamente, vía correo electrónico o visitarnos directamente en nuestras instalaciones clínicas.
              </p>
            </div>

            {/* Direct Cards */}
            <div className="bg-white rounded-2xl p-6 border border-pearl-grey shadow-sm space-y-6">
              
              {/* Address */}
              <div className="flex items-start space-x-3.5">
                <div className="bg-primary/5 p-3 rounded-xl text-accent shrink-0">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-primary font-serif">Dirección Física</h4>
                  <p className="text-xs text-primary/70 mt-1 leading-relaxed font-sans">
                    {doctorData.address}
                  </p>
                </div>
              </div>

              {/* Phones */}
              <div className="flex items-start space-x-3.5 border-t border-pearl-grey pt-5">
                <div className="bg-primary/5 p-3 rounded-xl text-accent shrink-0">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-primary font-serif">Teléfonos</h4>
                  <p className="text-xs text-primary/70 mt-1 font-sans">
                    Consultorio: <a href={`tel:${doctorData.phone}`} className="hover:text-secondary font-semibold transition-colors">{doctorData.phoneDisplay}</a>
                  </p>
                  <p className="text-xs text-primary/70 mt-0.5 font-sans">
                    WhatsApp Citas: <a href={doctorData.whatsappLink} target="_blank" rel="noopener noreferrer" className="hover:text-secondary font-semibold transition-colors">Enviar chat directo</a>
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start space-x-3.5 border-t border-pearl-grey pt-5">
                <div className="bg-primary/5 p-3 rounded-xl text-accent shrink-0">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-primary font-serif">Correo Electrónico</h4>
                  <p className="text-xs text-primary/70 mt-1 font-sans">
                    <a href={`mailto:${doctorData.email}`} className="hover:text-secondary font-semibold transition-colors">
                      {doctorData.email}
                    </a>
                  </p>
                </div>
              </div>

              {/* Scheduling info */}
              <div className="flex items-start space-x-3.5 border-t border-pearl-grey pt-5">
                <div className="bg-primary/5 p-3 rounded-xl text-accent shrink-0">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-primary font-serif">Horario Clínico</h4>
                  <p className="text-xs text-primary/70 mt-1 font-sans leading-relaxed">
                    Lunes a Viernes: 9:00 AM - 5:00 PM
                    <br />
                    Sábados: 9:00 AM - 12:00 PM (Previa cita)
                  </p>
                </div>
              </div>

            </div>

            {/* Embed Map */}
            <Map />

          </div>

        </div>
      </section>

    </div>
  );
}
