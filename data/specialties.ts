export interface Specialty {
  id: string;
  title: string;
  shortDescription: string;
  description: string;
  iconName: string;
  benefits: string[];
  indications: string[];
}

export const specialtiesData: Specialty[] = [
  {
    id: "tavi",
    title: "TAVI (Implante Valvular Aórtico Transcatéter)",
    shortDescription: "Reemplazo de la válvula aórtica enferma de forma mínimamente invasiva, a través de un catéter sin necesidad de cirugía a corazón abierto.",
    description: "El implante valvular aórtico transcatéter (TAVI) es una técnica revolucionaria indicada principalmente para pacientes con estenosis aórtica severa que presentan un riesgo quirúrgico moderado o elevado para cirugía abierta. Mediante un acceso percutáneo (usualmente a través de la arteria femoral en la ingle), se introduce una prótesis plegada que se expande sobre la válvula dañada, restaurando de inmediato el flujo sanguíneo normal sin necesidad de detener el corazón.",
    iconName: "HeartPulse",
    benefits: [
      "Procedimiento mínimamente invasivo sin esternotomía.",
      "Recuperación acelerada y menor estancia hospitalaria (habitualmente 48-72 horas).",
      "Mejoría inmediata de síntomas como la disnea (falta de aire), dolor de pecho y fatiga.",
      "Excelente tasa de éxito clínico y reducción de complicaciones postoperatorias."
    ],
    indications: [
      "Estenosis aórtica severa sintomática.",
      "Pacientes de edad avanzada o con múltiples comorbilidades.",
      "Riesgo quirúrgico elevado o contraindicación para cirugía cardiovascular tradicional."
    ]
  },
  {
    id: "enfermedad-coronaria-compleja",
    title: "Enfermedad Coronaria Compleja",
    shortDescription: "Tratamiento de obstrucciones arteriales severas, incluyendo oclusiones totales crónicas y lesiones con alto contenido de calcio.",
    description: "La enfermedad coronaria compleja abarca aquellas situaciones clínicas donde las arterias coronarias presentan obstrucciones difíciles, como calcificaciones severas, oclusiones totales de larga evolución (OTC), bifurcaciones de arterias principales o lesiones en el tronco coronario izquierdo. El Dr. Manuel Espinoza está especializado en angioplastia coronaria compleja utilizando técnicas avanzadas de aterectomía rotacional (Rotablator) y angioplastia con balón de choque (litotricia intravascular) para desintegrar el calcio y permitir un implante de stent seguro y óptimo.",
    iconName: "Activity",
    benefits: [
      "Alternativa viable para pacientes rechazados para cirugía de bypass coronario.",
      "Restauración del flujo de sangre a áreas del miocardio en peligro.",
      "Alivio duradero del dolor de pecho (angina) resistente a medicamentos.",
      "Disminución significativa del riesgo de infarto de miocardio."
    ],
    indications: [
      "Oclusión Total Crónica (OTC) de arterias coronarias.",
      "Arterias coronarias gravemente calcificadas y estenosadas.",
      "Enfermedad de múltiples vasos o lesiones en el tronco principal izquierdo en pacientes seleccionados."
    ]
  },
  {
    id: "intervencionismo-mitral-y-estructural",
    title: "Intervencionismo Mitral y Estructural",
    shortDescription: "Reparación de la válvula mitral y de otras cardiopatías estructurales mediante dispositivos percutáneos avanzados.",
    description: "El intervencionismo estructural engloba un conjunto de procedimientos no quirúrgicos para corregir defectos en el interior del corazón. Esto incluye la reparación percutánea de la válvula mitral mediante clipado de bordes (p. ej., MitraClip) para tratar la insuficiencia mitral severa, el cierre de la orejuela izquierda en pacientes con fibrilación auricular para prevenir embolias sin necesidad de anticoagulantes, y el cierre percutáneo de defectos del tabique (como la comunicación interauricular - CIA y el foramen oval patente - FOP).",
    iconName: "ShieldCheck",
    benefits: [
      "Reduce drásticamente la insuficiencia mitral y mejora la calidad de vida.",
      "Alternativa altamente eficaz al tratamiento quirúrgico tradicional a corazón abierto.",
      "Previene accidentes cerebrovasculares (Ictus) sin la necesidad de tomar anticoagulantes orales de por vida.",
      "Mínima agresión quirúrgica y rápida reincorporación a la vida cotidiana."
    ],
    indications: [
      "Insuficiencia mitral severa sintomática con alto riesgo quirúrgico.",
      "Foramen Oval Patente (FOP) asociado a ictus criptogénico.",
      "Fibrilación auricular con contraindicación para anticoagulación oral de larga duración."
    ]
  },
  {
    id: "imaging-intracoronario",
    title: "Imagen Intracoronaria (IVUS / OCT)",
    shortDescription: "Uso de ultrasonido y tomografía óptica de alta resolución dentro del vaso sanguíneo para guiar y optimizar el implante de stents.",
    description: "Para garantizar resultados excelentes a largo plazo en las angioplastias, el Dr. Manuel Espinoza utiliza tecnologías de imagen intracoronaria dentro de la sala de hemodinámica. El ultrasonido intravascular (IVUS) y la tomografía de coherencia óptica (OCT) permiten introducir una microsonda dentro de las arterias coronarias para ver su interior en 3D. Esto nos permite evaluar la composición exacta de la placa de colesterol, medir el diámetro real de la arteria, seleccionar la medida perfecta del stent y comprobar que ha quedado perfectamente expandido y sellado contra la pared arterial.",
    iconName: "Eye",
    benefits: [
      "Precisión nanométrica en la colocación de prótesis y stents.",
      "Reduce sustancialmente el riesgo de trombosis o reestenosis (nueva obstrucción) del stent.",
      "Permite decidir de forma objetiva la necesidad o no de preparar la arteria con terapia para el calcio.",
      "Máxima seguridad y predictibilidad clínica durante el procedimiento intervencionista."
    ],
    indications: [
      "Guía y optimización de angioplastias complejas (tronco común, bifurcaciones).",
      "Evaluación de fallos previos de stents (trombosis o reestenosis recurrente).",
      "Caracterización detallada de lesiones de diagnóstico dudoso mediante angiografía convencional."
    ]
  }
];
