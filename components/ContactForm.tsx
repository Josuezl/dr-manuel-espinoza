"use client";

import { useState } from "react";
import { Mail, Phone, User, MessageSquare, AlertCircle, CheckCircle, ChevronDown } from "lucide-react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    reason: "consulta-general",
    message: ""
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "El nombre es obligatorio.";
    if (!formData.email.trim()) {
      newErrors.email = "El correo es obligatorio.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Ingrese un correo electrónico válido.";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "El teléfono es obligatorio.";
    } else if (!/^[0-9+\s-]{8,15}$/.test(formData.phone)) {
      newErrors.phone = "Ingrese un número telefónico válido.";
    }
    if (!formData.message.trim()) newErrors.message = "El mensaje es obligatorio.";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    
    // Simulate server request
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        reason: "consulta-general",
        message: ""
      });
    }, 1500);
  };

  return (
    <div className="bg-white rounded-3xl p-8 sm:p-10 border border-pearl-grey shadow-xl shadow-primary/5">
      {isSuccess ? (
        <div className="text-center py-12 space-y-6">
          <div className="inline-flex items-center justify-center bg-accent/10 p-5 rounded-full text-accent animate-bounce">
            <CheckCircle className="h-16 w-16" />
          </div>
          <h3 className="text-2xl font-bold font-serif text-primary">
            ¡Mensaje Enviado con Éxito!
          </h3>
          <p className="text-primary/70 text-sm leading-relaxed max-w-sm mx-auto font-sans">
            Agradecemos su contacto. Nuestro equipo médico revisará su solicitud y se comunicará con usted a la brevedad para coordinar su cita o responder sus dudas.
          </p>
          <button
            onClick={() => setIsSuccess(false)}
            className="bg-primary hover:bg-primary-hover text-white font-bold px-8 py-3 rounded-full shadow-md transition-colors"
          >
            Enviar otro mensaje
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          
          <div className="space-y-2">
            <h3 className="text-xl font-bold font-serif text-primary">
              Formulario de Contacto Inteligente
            </h3>
            <p className="text-xs text-primary/60 font-sans">
              Por favor complete los datos para coordinar una cita o solicitar información médica.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Name */}
            <div className="space-y-2 relative">
              <label htmlFor="name" className="text-xs font-bold text-primary/70 uppercase tracking-wider block">
                Nombre Completo *
              </label>
              <div className="relative">
                <User className="absolute left-4 top-3.5 h-5 w-5 text-primary/45" />
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Ej. Juan Pérez"
                  className={`w-full bg-cold-white border rounded-xl py-3.5 pl-12 pr-4 text-sm font-sans focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all ${
                    errors.name ? "border-red-500 ring-2 ring-red-100" : "border-pearl-grey"
                  }`}
                />
              </div>
              {errors.name && (
                <span className="text-red-500 text-[11px] font-sans flex items-center space-x-1 mt-1">
                  <AlertCircle className="h-3 w-3" /> <span>{errors.name}</span>
                </span>
              )}
            </div>

            {/* Phone */}
            <div className="space-y-2 relative">
              <label htmlFor="phone" className="text-xs font-bold text-primary/70 uppercase tracking-wider block">
                Teléfono de Contacto *
              </label>
              <div className="relative">
                <Phone className="absolute left-4 top-3.5 h-5 w-5 text-primary/45" />
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Ej. +504 9999-9999"
                  className={`w-full bg-cold-white border rounded-xl py-3.5 pl-12 pr-4 text-sm font-sans focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all ${
                    errors.phone ? "border-red-500 ring-2 ring-red-100" : "border-pearl-grey"
                  }`}
                />
              </div>
              {errors.phone && (
                <span className="text-red-500 text-[11px] font-sans flex items-center space-x-1 mt-1">
                  <AlertCircle className="h-3 w-3" /> <span>{errors.phone}</span>
                </span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Email */}
            <div className="space-y-2 relative">
              <label htmlFor="email" className="text-xs font-bold text-primary/70 uppercase tracking-wider block">
                Correo Electrónico *
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-3.5 h-5 w-5 text-primary/45" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="ejemplo@correo.com"
                  className={`w-full bg-cold-white border rounded-xl py-3.5 pl-12 pr-4 text-sm font-sans focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all ${
                    errors.email ? "border-red-500 ring-2 ring-red-100" : "border-pearl-grey"
                  }`}
                />
              </div>
              {errors.email && (
                <span className="text-red-500 text-[11px] font-sans flex items-center space-x-1 mt-1">
                  <AlertCircle className="h-3 w-3" /> <span>{errors.email}</span>
                </span>
              )}
            </div>

            {/* Reason */}
            <div className="space-y-2 relative">
              <label htmlFor="reason" className="text-xs font-bold text-primary/70 uppercase tracking-wider block">
                Motivo de Consulta *
              </label>
              <div className="relative">
                <select
                  id="reason"
                  name="reason"
                  value={formData.reason}
                  onChange={handleChange}
                  className="w-full bg-cold-white border border-pearl-grey rounded-xl py-3.5 px-4 text-sm font-sans focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all appearance-none cursor-pointer text-primary"
                >
                  <option value="consulta-general">Consulta Médica General</option>
                  <option value="referir-paciente">Referir Paciente (Para Médicos)</option>
                  <option value="segunda-opinion">Segunda Opinión Médica</option>
                </select>
                <ChevronDown className="absolute right-4 top-4 h-5 w-5 text-primary/45 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Message */}
          <div className="space-y-2">
            <label htmlFor="message" className="text-xs font-bold text-primary/70 uppercase tracking-wider block">
              Mensaje o Detalles del Caso *
            </label>
            <div className="relative">
              <MessageSquare className="absolute left-4 top-4 h-5 w-5 text-primary/45" />
              <textarea
                id="message"
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                placeholder="Por favor, descríbanos brevemente su síntoma o el motivo de su consulta para poder atenderle mejor..."
                className={`w-full bg-cold-white border rounded-xl py-3.5 pl-12 pr-4 text-sm font-sans focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all resize-none ${
                  errors.message ? "border-red-500 ring-2 ring-red-100" : "border-pearl-grey"
                }`}
              />
            </div>
            {errors.message && (
              <span className="text-red-500 text-[11px] font-sans flex items-center space-x-1 mt-1">
                <AlertCircle className="h-3 w-3" /> <span>{errors.message}</span>
              </span>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-accent hover:bg-accent-hover disabled:bg-accent/50 text-primary font-bold py-4 rounded-xl shadow-lg transition-colors flex items-center justify-center space-x-2.5 hover:scale-[1.01] duration-200 cursor-pointer"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin h-5 w-5 text-primary" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span>Procesando solicitud...</span>
              </>
            ) : (
              <span>Enviar Formulario</span>
            )}
          </button>
          
        </form>
      )}
    </div>
  );
}
