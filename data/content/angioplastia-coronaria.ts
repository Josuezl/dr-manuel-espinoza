import type { PageContent } from "@/components/content/ContentPage";

export const angioplastiaCoronaria: PageContent = {
  slug: "angioplastia-coronaria",
  h1: "Angioplastia coronaria y stent en San Pedro Sula",
  intro:
    "La angioplastia coronaria abre una arteria del corazón obstruida sin cirugía abierta. Se llega hasta la lesión con un catéter, se infla un balón y se deja un stent que mantiene la arteria abierta.",
  secciones: [
    {
      h2: "En qué consiste",
      parrafos: [
        "Se accede por la arteria de la muñeca o de la ingle y se avanza un catéter hasta la arteria coronaria enferma. Una guía muy delgada cruza la obstrucción, se infla un balón para abrirla y se despliega el stent, una malla metálica que sostiene la pared del vaso.",
        "El procedimiento se hace con anestesia local y el paciente está despierto. La duración depende de la complejidad de la lesión y de cuántos vasos haya que tratar.",
      ],
    },
    {
      h2: "Lesiones complejas y calcificadas",
      parrafos: [
        "Cuando la placa está muy calcificada, el balón no logra expandirla y el stent queda mal apoyado, lo que aumenta el riesgo de complicaciones. La litotricia intravascular resuelve ese problema: emite ondas de presión que fracturan el calcio dentro de la pared arterial sin dañar el tejido blando.",
        "La enfermedad multivaso y las lesiones en bifurcaciones requieren planificación y técnicas específicas para proteger las ramas laterales.",
      ],
    },
    {
      h2: "Imagen intracoronaria: IVUS y OCT",
      parrafos: [
        "El ultrasonido intravascular (IVUS) y la tomografía de coherencia óptica (OCT) miran la arteria desde adentro. Permiten medir el diámetro real del vaso, conocer la composición de la placa y elegir el stent del tamaño correcto.",
        "Después del implante, confirman que el stent quedó bien expandido y apoyado. La mala expansión es una de las causas principales de reestenosis y trombosis del stent, y solo se detecta con imagen intracoronaria.",
      ],
    },
    {
      h2: "Después del procedimiento",
      parrafos: [
        "Se vigila el sitio de punción y se inicia o ajusta el tratamiento antiagregante. La duración de ese tratamiento depende del tipo de stent y del motivo del procedimiento; suspenderlo por cuenta propia es peligroso.",
        "El control de la presión arterial, del colesterol, de la diabetes y el abandono del tabaco determinan el resultado a largo plazo tanto como el stent mismo.",
      ],
    },
  ],
  relacionadas: [
    { label: "Síntomas de infarto y qué hacer", href: "/infarto" },
    { label: "Hemodinamia y cateterismo cardíaco", href: "/hemodinamia" },
  ],
};
