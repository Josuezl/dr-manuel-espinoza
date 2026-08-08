import type { PageContent } from "@/components/content/ContentPage";

export const taviValvulaAortica: PageContent = {
  slug: "tavi-valvula-aortica",
  h1: "TAVI: reemplazo de la válvula aórtica por catéter",
  intro:
    "El TAVI reemplaza la válvula aórtica enferma sin abrir el pecho ni detener el corazón. La válvula nueva viaja plegada dentro de un catéter y se despliega en la posición de la válvula original.",
  secciones: [
    {
      h2: "Qué es la estenosis aórtica",
      parrafos: [
        "La válvula aórtica se abre para dejar salir la sangre del corazón hacia el resto del cuerpo. Con los años puede calcificarse y dejar de abrir bien: eso es la estenosis aórtica.",
        "Cuando se vuelve severa, aparecen falta de aire al esfuerzo, dolor en el pecho o desmayos. A partir de ese momento el pronóstico sin tratamiento empeora rápido, y la aparición de síntomas es lo que marca la necesidad de intervenir.",
      ],
    },
    {
      h2: "Cómo se realiza el TAVI",
      parrafos: [
        "Se accede habitualmente por la arteria femoral. El catéter lleva la válvula protésica comprimida hasta la posición aórtica, donde se despliega y desplaza a la válvula calcificada contra la pared.",
        "Todo el procedimiento se guía por fluoroscopia y ecocardiografía. No requiere circulación extracorpórea ni detener el corazón, y la recuperación es considerablemente más corta que la de la cirugía convencional.",
      ],
    },
    {
      h2: "Planificación con tomografía",
      parrafos: [
        "Antes del TAVI se realiza una tomografía que mide el anillo aórtico, evalúa la distribución del calcio, define la altura de las arterias coronarias y estudia el calibre de los accesos vasculares.",
        "De esa medición dependen el tamaño de la válvula y la vía de acceso. Es el paso que más influye en el resultado.",
      ],
    },
    {
      h2: "Anatomías complejas",
      parrafos: [
        "Algunas anatomías dificultan la implantación, como la aorta horizontal, donde el catéter no se alinea de forma natural con el anillo aórtico. Existen técnicas descritas para resolverlo, entre ellas el uso de catéter lazo paso a paso, publicada por el Dr. Espinoza en JACC: Case Reports.",
      ],
    },
  ],
  relacionadas: [
    { label: "Reparación mitral con MyClip", href: "/reparacion-mitral-myclip" },
    { label: "Hemodinamia y cateterismo cardíaco", href: "/hemodinamia" },
  ],
};
