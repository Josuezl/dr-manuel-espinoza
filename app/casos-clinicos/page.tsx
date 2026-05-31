"use client";

import { motion } from "framer-motion";
import { blogPostsData } from "@/data/blogPosts";
import { FileText, Eye, ShieldCheck, HeartPulse, Clock, Calendar } from "lucide-react";
import Link from "next/link";

export default function CasosClinicos() {
  // Filter only items of type 'caso-clinico'
  const clinicalCases = blogPostsData.filter(post => post.type === "caso-clinico");

  // Additional mock structural cases to enrich the page for a premium vibe
  const structuralCases = [
    {
      id: "caso-tavi-valvula-bicuspide",
      title: "Implante de TAVI en Válvula Aórtica Bicúspide Calificada",
      excerpt: "Reemplazo valvular transcatéter exitoso en una paciente femenina de 76 años con anatomía bicúspide congénita y estenosis aórtica crítica.",
      patient: "Femenina, 76 años. Antecedente de hipertensión arterial y estenosis aórtica severa sintomática. Disnea de mínimos esfuerzos (CF III-IV).",
      procedure: "Se realizó una tomografía multicorte 3D preprocedimiento para planificación de diámetros. Bajo sedación consciente y anestesia local, se obtuvo acceso percutáneo femoral derecho. Se realizó cruce valvular guiado por fluoroscopia y colocación de guía de alto soporte en ventrículo izquierdo. Se realizó dilatación valvular con balón y posterior despliegue controlado de una prótesis autoexpandible de 26 mm. Todo el proceso fue guiado por ecocardiografía transtorácica y fluoroscopia de precisión.",
      result: "Gradiente aórtico medio residual de 4 mmHg (óptimo), sin fuga paravalvular detectable. Traslado directo a cuidados intermedios. Alta médica a las 48 horas sin requerimiento de marcapasos definitivo.",
      imageUrl: "/Imagenes /Tavi.jpeg",
      date: "2026-04-10"
    },
    {
      id: "caso-mitraclip-insuficiencia",
      title: "Reparación Valvular Mitral Percutánea (MitraClip) en Insuficiencia Funcional",
      excerpt: "Tratamiento percutáneo en un paciente de 64 años con insuficiencia mitral severa de origen funcional y miocardiopatía dilatada.",
      patient: "Masculino, 64 años. Diagnóstico de insuficiencia cardíaca congestiva con fracción de eyección reducida (FEVI 28%) e insuficiencia mitral severa funcional (grado IV) refractaria al tratamiento médico óptimo.",
      procedure: "Bajo anestesia general y guía estrecha de ecocardiografía transesofágica (ETE) tridimensional, se realizó punción transeptal para acceder a la aurícula izquierda. Se introdujo el sistema de entrega y se procedió a alinear el clip valvular sobre los velos de la válvula mitral en el segmento A2-P2. Se realizó la captura y clipado de los bordes libres de los velos anterior y posterior, reduciendo sustancialmente el orificio regurgitante.",
      result: "Reducción inmediata de la insuficiencia mitral de grado IV (severo) a grado I (leve). Descenso de las presiones pulmonares de inmediato. El paciente reporta mejoría sintomática marcada a las 24 horas y es dado de alta al tercer día con optimización médica.",
      imageUrl: "/Imagenes /Angioplastia guiada por IVUS y litotricia intravascular .webp",
      date: "2026-03-22"
    }
  ];

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
              Evidencia Clínica & Resultados
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold font-serif">
              Casos Clínicos Anonimizados
            </h1>
            <p className="text-white/80 max-w-2xl text-sm sm:text-base font-sans font-light leading-relaxed">
              Reportes técnicos e información didáctica sobre casos complejos resueltos exitosamente mediante abordajes endovasculares avanzados.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Intro for referring doctors */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="bg-white p-6 rounded-2xl border border-pearl-grey flex items-center space-x-4 shadow-sm">
          <div className="bg-accent/15 text-accent p-3 rounded-full shrink-0">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-primary font-serif">Nota de Ética y Anonimato</h4>
            <p className="text-xs text-primary/70 mt-0.5 font-sans leading-relaxed">
              Todos los casos expuestos en este sitio web han sido estrictamente anonimizados de acuerdo a la Ley de Privacidad y Normas de Ética Médica. Los datos de identidad, fechas y nombres han sido alterados o suprimidos para proteger el secreto profesional médico y los derechos del paciente.
            </p>
          </div>
        </div>
      </section>

      {/* Cases List */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-12">
        {/* Dynamic post cases */}
        {clinicalCases.map((post, idx) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-3xl overflow-hidden border border-pearl-grey shadow-xl shadow-primary/5 grid grid-cols-1 lg:grid-cols-12"
          >
            <div className="lg:col-span-4 relative bg-primary aspect-video lg:aspect-auto">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={post.imageUrl}
                alt={post.title}
                className="w-full h-full object-cover grayscale-[30%] brightness-[90%]"
              />
              <div className="absolute inset-0 bg-primary/10 mix-blend-color" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent lg:hidden" />
              <div className="absolute bottom-6 left-6 text-white lg:hidden">
                <span className="bg-accent text-primary text-[10px] font-bold uppercase px-2.5 py-1 rounded-full">
                  Caso Clínico Coronario
                </span>
              </div>
            </div>

            <div className="lg:col-span-8 p-8 sm:p-10 space-y-6">
              <div>
                <span className="text-[10px] font-bold text-secondary tracking-widest uppercase block mb-1">
                  Reporte Científico
                </span>
                <h2 className="text-2xl font-bold font-serif text-primary">
                  {post.title}
                </h2>
              </div>

              <div className="space-y-4 font-sans text-xs sm:text-sm text-primary/85">
                <div className="bg-cold-white p-4 rounded-xl border border-pearl-grey space-y-1.5">
                  <strong className="text-primary font-bold text-xs uppercase tracking-wider block">Contexto del Paciente</strong>
                  <p>Masculino de 68 años con diabetes mellitus 2, insuficiencia renal estadio III y obstrucción severamente calcificada del 95% en arteria descendente anterior (DA). Riesgo quirúrgico elevado.</p>
                </div>
                <div className="space-y-1.5">
                  <strong className="text-primary font-bold text-xs uppercase tracking-wider block">Procedimiento Intervencionista</strong>
                  <p>{post.content.split('\n\n')[2] || post.content}</p>
                </div>
                <div className="bg-accent/5 p-4 rounded-xl border border-accent/20 space-y-1.5">
                  <strong className="text-accent font-bold text-xs uppercase tracking-wider block">Resultado Clínico Final</strong>
                  <p>Implantación perfecta de stent liberador de fármaco guiado por ultrasonido intracoronario (IVUS) tras litotricia intravascular. Flujo coronario TIMI III restablecido. Alta hospitalaria sin angina.</p>
                </div>
              </div>

              <div className="pt-4 border-t border-pearl-grey flex items-center justify-between">
                <div className="flex items-center space-x-3 text-xs text-primary/55">
                  <Calendar className="h-4 w-4" />
                  <span>{post.date}</span>
                </div>
                <Link
                  href="/contacto"
                  className="text-xs font-bold text-secondary hover:text-accent flex items-center space-x-1.5"
                >
                  <span>Referir un caso similar</span>
                  <FileText className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        ))}

        {/* Structural cases */}
        {structuralCases.map((scase, idx) => (
          <motion.div
            key={scase.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-3xl overflow-hidden border border-pearl-grey shadow-xl shadow-primary/5 grid grid-cols-1 lg:grid-cols-12"
          >
            <div className="lg:col-span-4 relative bg-primary aspect-video lg:aspect-auto">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={scase.imageUrl}
                alt={scase.title}
                className="w-full h-full object-cover grayscale-[30%] brightness-[90%]"
              />
              <div className="absolute inset-0 bg-primary/10 mix-blend-color" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent lg:hidden" />
              <div className="absolute bottom-6 left-6 text-white lg:hidden">
                <span className="bg-accent text-primary text-[10px] font-bold uppercase px-2.5 py-1 rounded-full">
                  Caso Estructural
                </span>
              </div>
            </div>

            <div className="lg:col-span-8 p-8 sm:p-10 space-y-6">
              <div>
                <span className="text-[10px] font-bold text-secondary tracking-widest uppercase block mb-1">
                  Reporte de Cardiopatía Estructural
                </span>
                <h2 className="text-2xl font-bold font-serif text-primary">
                  {scase.title}
                </h2>
              </div>

              <div className="space-y-4 font-sans text-xs sm:text-sm text-primary/85">
                <div className="bg-cold-white p-4 rounded-xl border border-pearl-grey space-y-1.5">
                  <strong className="text-primary font-bold text-xs uppercase tracking-wider block">Contexto del Paciente</strong>
                  <p>{scase.patient}</p>
                </div>
                <div className="space-y-1.5">
                  <strong className="text-primary font-bold text-xs uppercase tracking-wider block">Procedimiento Intervencionista</strong>
                  <p>{scase.procedure}</p>
                </div>
                <div className="bg-accent/5 p-4 rounded-xl border border-accent/20 space-y-1.5">
                  <strong className="text-accent font-bold text-xs uppercase tracking-wider block">Resultado Clínico Final</strong>
                  <p>{scase.result}</p>
                </div>
              </div>

              <div className="pt-4 border-t border-pearl-grey flex items-center justify-between">
                <div className="flex items-center space-x-3 text-xs text-primary/55">
                  <Calendar className="h-4 w-4" />
                  <span>{scase.date}</span>
                </div>
                <Link
                  href="/contacto"
                  className="text-xs font-bold text-secondary hover:text-accent flex items-center space-x-1.5"
                >
                  <span>Referir un caso similar</span>
                  <FileText className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </section>

    </div>
  );
}
