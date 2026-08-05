export interface Route {
  path: string;
  title: string;
  description: string;
  priority: number;
}

export const routes: Route[] = [
  {
    path: "/",
    title: "Cardiólogo Intervencionista en San Pedro Sula | Dr. Manuel Espinoza",
    description:
      "Dr. Manuel Espinoza, cardiólogo intervencionista y especialista en hemodinamia en San Pedro Sula, Honduras. Cateterismo, angioplastia, TAVI y cardiopatía estructural. Agenda tu cita.",
    priority: 1,
  },
  {
    path: "/hemodinamia",
    title: "Hemodinamia y cateterismo cardíaco en San Pedro Sula | Dr. Manuel Espinoza",
    description:
      "Qué es la hemodinamia, cómo se realiza un cateterismo cardíaco y cuándo se indica. Explicado por el Dr. Manuel Espinoza, cardiólogo intervencionista en San Pedro Sula.",
    priority: 0.9,
  },
  {
    path: "/infarto",
    title: "Síntomas de infarto y qué hacer | Cardiólogo en San Pedro Sula",
    description:
      "Cómo reconocer un infarto, qué hacer en los primeros minutos y dónde buscar atención en San Pedro Sula. Guía del Dr. Manuel Espinoza, cardiólogo intervencionista.",
    priority: 0.9,
  },
  {
    path: "/angioplastia-coronaria",
    title: "Angioplastia coronaria y stent en Honduras | Dr. Manuel Espinoza",
    description:
      "Angioplastia coronaria con stent, litotricia intravascular e imagen intracoronaria para lesiones complejas en San Pedro Sula.",
    priority: 0.8,
  },
  {
    path: "/tavi-valvula-aortica",
    title: "TAVI: reemplazo de válvula aórtica por catéter en Honduras",
    description:
      "Implante valvular aórtico transcatéter (TAVI) para estenosis aórtica severa, con planificación por tomografía. Dr. Manuel Espinoza, San Pedro Sula.",
    priority: 0.8,
  },
  {
    path: "/reparacion-mitral-myclip",
    title: "MyClip: reparación de la válvula mitral sin cirugía | Honduras",
    description:
      "Reparación mitral percutánea (MyClip, técnica TEER) para la insuficiencia mitral. El Dr. Manuel Espinoza lideró el primer procedimiento de este tipo en Honduras.",
    priority: 0.8,
  },
  {
    path: "/marcapasos",
    title: "Implante de marcapasos en San Pedro Sula | Dr. Manuel Espinoza",
    description:
      "Implante de marcapasos para trastornos del ritmo lento y de la conducción, con seguimiento y programación personalizada en San Pedro Sula.",
    priority: 0.7,
  },
  {
    path: "/contacto",
    title: "Consultorios y contacto | Dr. Manuel Espinoza, cardiólogo en San Pedro Sula",
    description:
      "Consultorios del Dr. Manuel Espinoza en San Pedro Sula: Centro de Neumología y Alergias (Altavista) y Hospital del Valle. Teléfonos, horarios y agenda en línea.",
    priority: 0.9,
  },
];
