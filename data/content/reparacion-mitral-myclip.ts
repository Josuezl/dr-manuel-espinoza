import type { PageContent } from "@/components/content/ContentPage";

export const reparacionMitralMyclip: PageContent = {
  slug: "reparacion-mitral-myclip",
  h1: "MyClip: reparación de la válvula mitral sin cirugía abierta",
  intro:
    "La reparación mitral percutánea corrige la insuficiencia de la válvula mitral con un clip implantado por catéter. El Dr. Manuel Espinoza lideró el primer procedimiento MyClip realizado en Honduras, en el Hospital del Valle de San Pedro Sula.",
  secciones: [
    {
      h2: "Qué es la insuficiencia mitral",
      parrafos: [
        "La válvula mitral separa la aurícula izquierda del ventrículo izquierdo y debe cerrar por completo en cada latido. Cuando no cierra bien, parte de la sangre regresa hacia atrás en lugar de salir hacia el cuerpo: eso es la insuficiencia mitral.",
        "El corazón compensa esa sobrecarga durante años, hasta que aparecen falta de aire, cansancio y retención de líquido. Si no se corrige, el ventrículo se dilata y la función cardíaca se deteriora de forma progresiva.",
      ],
    },
    {
      h2: "Cómo funciona el MyClip",
      parrafos: [
        "Es una técnica de reparación borde a borde, conocida como TEER. Se llega al corazón por la vena femoral, se cruza al lado izquierdo y se coloca un clip que une los bordes de las dos valvas de la válvula mitral en el punto donde escapa la sangre.",
        "Al unir esos bordes, la válvula cierra mejor y la regurgitación disminuye. No se reemplaza la válvula: se repara la que el paciente ya tiene.",
        "El procedimiento se guía con ecocardiografía transesofágica tridimensional y fluoroscopia en tiempo real, que permiten ver la válvula y el clip con precisión durante todo el implante.",
      ],
    },
    {
      h2: "A quién se indica",
      parrafos: [
        "Sobre todo a pacientes con insuficiencia mitral severa sintomática en quienes la cirugía a corazón abierto representa un riesgo elevado, ya sea por la edad, por la función del corazón o por otras enfermedades asociadas.",
        "La decisión se toma en equipo, evaluando la anatomía de la válvula con ecocardiografía: no todas las válvulas son adecuadas para esta técnica.",
      ],
    },
    {
      h2: "El primer MyClip de Honduras",
      parrafos: [
        "En mayo de 2026, el Dr. Manuel Espinoza lideró en el Hospital del Valle de San Pedro Sula el primer procedimiento MyClip realizado en el país.",
        "Antes de eso, los pacientes con insuficiencia mitral severa y riesgo quirúrgico alto tenían que optar por la cirugía a corazón abierto o viajar fuera de Honduras. La disponibilidad local de esta técnica cambia esa situación.",
      ],
    },
    {
      h2: "Recuperación",
      parrafos: [
        "Al no haber esternotomía ni circulación extracorpórea, la estancia hospitalaria es corta y la recuperación mucho más rápida que la de la cirugía convencional. El seguimiento incluye control ecocardiográfico para verificar el resultado sobre la válvula.",
      ],
    },
  ],
  relacionadas: [
    { label: "TAVI: válvula aórtica por catéter", href: "/tavi-valvula-aortica" },
    { label: "Hemodinamia y cateterismo cardíaco", href: "/hemodinamia" },
  ],
};
