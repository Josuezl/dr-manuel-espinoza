export interface FaqItem {
  pregunta: string;
  respuesta: string;
  /**
   * Enlace opcional a la pagina de contenido que profundiza la respuesta.
   * Se renderiza aparte del parrafo para no tocar el texto aprobado por
   * el medico.
   */
  enlace?: { label: string; href: string };
}

export const faq: FaqItem[] = [
  {
    pregunta: "¿Qué es un cardiólogo intervencionista?",
    respuesta:
      "Es el cardiólogo que trata las enfermedades del corazón mediante catéteres, sin abrir el pecho. Accede al corazón por una arteria del brazo o de la pierna y repara la lesión desde adentro, guiado por rayos X y ultrasonido. Permite tratar arterias obstruidas, válvulas dañadas y defectos estructurales con una recuperación mucho más corta que la cirugía abierta.",
  },
  {
    pregunta: "¿Qué es la hemodinamia y para qué sirve?",
    respuesta:
      "La hemodinamia es el estudio de cómo circula la sangre dentro del corazón y sus arterias. En la sala de hemodinamia se miden presiones, se inyecta contraste para ver las arterias coronarias y, en el mismo procedimiento, se pueden tratar las lesiones encontradas. Sirve tanto para diagnosticar como para tratar.",
    enlace: { label: "Leer más sobre la hemodinamia", href: "/hemodinamia" },
  },
  {
    pregunta: "¿Cuáles son los síntomas de un infarto?",
    respuesta:
      "El síntoma más frecuente es un dolor u opresión en el centro del pecho que dura más de veinte minutos y que puede extenderse al brazo izquierdo, el cuello, la mandíbula o la espalda. Suele acompañarse de sudoración fría, náusea, falta de aire o sensación de angustia intensa. En mujeres, personas con diabetes y adultos mayores el cuadro puede ser menos típico: cansancio súbito, malestar en el estómago o dificultad para respirar sin dolor evidente.",
    enlace: { label: "Leer más sobre los síntomas de infarto", href: "/infarto" },
  },
  {
    pregunta: "¿Qué hago si sospecho un infarto en San Pedro Sula?",
    respuesta:
      "Buscá atención de emergencia de inmediato: no esperés a que el dolor pase ni manejés vos mismo hasta el hospital. El tiempo es lo que determina cuánto músculo cardíaco se salva. Dirigite a la emergencia del hospital más cercano que cuente con sala de hemodinamia. Esta información es orientativa y no sustituye la atención médica de urgencia.",
  },
  {
    pregunta: "¿Qué es un cateterismo cardíaco?",
    respuesta:
      "Es el procedimiento en el que se introduce un catéter delgado por la muñeca o la ingle hasta el corazón para ver las arterias coronarias con contraste. Se realiza con anestesia local y el paciente permanece despierto. Si se encuentra una obstrucción importante, con frecuencia se trata en el mismo momento.",
    enlace: {
      label: "Leer más sobre el cateterismo cardíaco",
      href: "/hemodinamia",
    },
  },
  {
    pregunta: "¿Qué es una angioplastia con stent?",
    respuesta:
      "Es la técnica que abre una arteria coronaria obstruida. Se infla un balón dentro de la lesión y se deja colocado un stent, una malla metálica que mantiene la arteria abierta. En lesiones muy calcificadas puede requerir litotricia intravascular, y la imagen intracoronaria (IVUS u OCT) permite medir la lesión y verificar que el stent quedó bien expandido.",
    enlace: {
      label: "Leer más sobre la angioplastia coronaria",
      href: "/angioplastia-coronaria",
    },
  },
  {
    pregunta: "¿Qué es el TAVI?",
    respuesta:
      "El TAVI es el reemplazo de la válvula aórtica por catéter, sin cirugía abierta. Se indica en estenosis aórtica severa, sobre todo en pacientes de riesgo quirúrgico elevado. La válvula nueva se lleva plegada dentro de un catéter y se despliega en la posición de la válvula enferma. Requiere planificación previa con tomografía.",
    enlace: { label: "Leer más sobre el TAVI", href: "/tavi-valvula-aortica" },
  },
  {
    pregunta: "¿Qué es el MyClip y para qué sirve?",
    respuesta:
      "El MyClip corrige la insuficiencia de la válvula mitral con un clip implantado por catéter, que une los bordes de la válvula para que cierre mejor. Es la técnica de reparación borde a borde (TEER). El Dr. Manuel Espinoza lideró el primer procedimiento MyClip realizado en Honduras, en el Hospital del Valle de San Pedro Sula.",
    enlace: {
      label: "Leer más sobre el MyClip",
      href: "/reparacion-mitral-myclip",
    },
  },
  {
    pregunta: "¿Cuándo debo consultar a un cardiólogo?",
    respuesta:
      "Conviene consultar si tenés dolor u opresión en el pecho al esfuerzo, falta de aire que antes no tenías, palpitaciones, desmayos, hinchazón en las piernas o un soplo detectado en una consulta previa. También si tenés presión alta, diabetes, colesterol elevado o antecedentes familiares de enfermedad coronaria, aunque no sientas nada.",
  },
  {
    pregunta: "¿Dónde atiende el Dr. Manuel Espinoza?",
    respuesta:
      "Atiende en dos consultorios de San Pedro Sula: el Centro de Neumología y Alergias (CNA), en Residencial Altavista, Calle 24, y el consultorio del Hospital del Valle, Condominios 1, Consultorio 402, cuarto piso. En ambos se puede agendar cita en línea.",
  },
];
