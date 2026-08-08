import type { PageContent } from "@/components/content/ContentPage";

export const marcapasos: PageContent = {
  slug: "marcapasos",
  h1: "Implante de marcapasos en San Pedro Sula",
  intro:
    "El marcapasos es un dispositivo que estimula el corazón cuando late demasiado lento o cuando el impulso eléctrico no se transmite bien. Se implanta con anestesia local y devuelve al paciente una frecuencia cardíaca adecuada.",
  secciones: [
    {
      h2: "Cuándo se necesita",
      parrafos: [
        "Se indica en bradicardias sintomáticas, es decir, cuando el corazón late tan lento que provoca mareos, desmayos, cansancio extremo o falta de aire. También en bloqueos de la conducción auriculoventricular que interrumpen el paso del impulso eléctrico entre las aurículas y los ventrículos.",
        "Los desmayos sin explicación en personas mayores merecen estudio del ritmo cardíaco: en algunos casos la causa es una pausa eléctrica que solo se detecta con monitoreo prolongado.",
      ],
    },
    {
      h2: "Cómo es el implante",
      parrafos: [
        "Se realiza con anestesia local y sedación. Se accede por una vena bajo la clavícula y se avanzan los electrodos hasta el corazón, guiados por fluoroscopia. El generador queda alojado en un bolsillo bajo la piel, en la región del pecho.",
        "Una vez colocados los electrodos, se miden los umbrales de estimulación y detección para confirmar que el dispositivo funciona correctamente antes de cerrar.",
      ],
    },
    {
      h2: "Programación y seguimiento",
      parrafos: [
        "El marcapasos se programa según las necesidades de cada paciente: frecuencia mínima, respuesta al esfuerzo y modo de estimulación. Esa programación se ajusta en los controles posteriores.",
        "El seguimiento periódico verifica el estado de la batería, la integridad de los electrodos y el porcentaje de estimulación. La batería dura varios años y su reemplazo es un procedimiento sencillo comparado con el implante inicial.",
      ],
    },
    {
      h2: "Vida cotidiana con marcapasos",
      parrafos: [
        "La mayoría de los pacientes retoma su vida normal. Se recomienda evitar movimientos bruscos del brazo del lado del implante durante las primeras semanas y llevar siempre la tarjeta identificatoria del dispositivo.",
        "Los electrodomésticos y los teléfonos celulares de uso habitual no representan un problema. Sí conviene informar sobre el dispositivo antes de estudios de resonancia magnética o de procedimientos con electrobisturí.",
      ],
    },
  ],
  relacionadas: [
    { label: "Hemodinamia y cateterismo cardíaco", href: "/hemodinamia" },
    { label: "Contacto y consultorios", href: "/contacto" },
  ],
};
