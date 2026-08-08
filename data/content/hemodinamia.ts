import type { PageContent } from "@/components/content/ContentPage";

export const hemodinamia: PageContent = {
  slug: "hemodinamia",
  h1: "Hemodinamia y cateterismo cardíaco en San Pedro Sula",
  intro:
    "La hemodinamia estudia cómo circula la sangre dentro del corazón y de sus arterias. En la sala de hemodinamia no solo se diagnostica: muchas veces la lesión encontrada se trata en el mismo procedimiento, sin cirugía abierta.",
  secciones: [
    {
      h2: "¿Qué es la hemodinamia?",
      parrafos: [
        "Es la rama de la cardiología que mide las presiones y los flujos dentro del corazón y evalúa las arterias coronarias con medios de contraste y rayos X. El estudio se hace en una sala equipada con un arco de fluoroscopia que permite ver el corazón latiendo en tiempo real.",
        "A diferencia de los estudios que solo miran desde afuera, la hemodinamia entra al corazón con catéteres delgados y obtiene información directa: qué arteria está obstruida, cuánto, y si esa obstrucción justifica un tratamiento.",
      ],
    },
    {
      h2: "¿Cómo es un cateterismo cardíaco?",
      parrafos: [
        "Se introduce un catéter por la arteria de la muñeca o de la ingle y se avanza hasta el corazón. Se aplica anestesia local en el sitio de punción; el paciente permanece despierto durante todo el procedimiento y no siente el catéter moverse por dentro de las arterias.",
        "Al inyectar contraste, las arterias coronarias se hacen visibles y se identifican las obstrucciones. El estudio dura entre veinte y cuarenta minutos cuando es solo diagnóstico. Si se decide tratar en el mismo acto, se prolonga.",
        "El acceso por la muñeca (radial) permite que el paciente se siente y camine poco después, y reduce las complicaciones en el sitio de punción frente al acceso femoral.",
      ],
    },
    {
      h2: "¿Cuándo se indica?",
      parrafos: [
        "Ante un infarto agudo, para abrir la arteria responsable lo antes posible. También cuando hay angina que limita la vida diaria, pruebas de esfuerzo o estudios de imagen que sugieren isquemia, o antes de una cirugía cardíaca para conocer el estado de las coronarias.",
        "En enfermedad valvular, el cateterismo mide gradientes y presiones que ayudan a definir la severidad y a planificar procedimientos como el TAVI o la reparación mitral.",
      ],
    },
    {
      h2: "Qué se puede tratar en la misma sala",
      parrafos: [
        "Angioplastia coronaria con stent, incluida la litotricia intravascular para lesiones calcificadas. Imagen intracoronaria (IVUS y OCT) para medir cada lesión y verificar que el stent quedó bien expandido. Implante valvular aórtico (TAVI), reparación mitral percutánea, cierre de fugas paravalvulares e implante de marcapasos.",
        "En tromboembolia pulmonar de riesgo intermedio y alto, la trombólisis dirigida por catéter asistida por ultrasonido permite usar dosis bajas de fibrinolítico con mejor perfil de seguridad.",
      ],
    },
    {
      h2: "Preparación y recuperación",
      parrafos: [
        "Se indica ayuno de algunas horas y se revisan los medicamentos habituales, sobre todo anticoagulantes y antidiabéticos. Es importante avisar si hay alergia al medio de contraste o enfermedad renal, porque cambia la preparación.",
        "Después del procedimiento se vigila el sitio de punción durante algunas horas. En estudios diagnósticos por vía radial, el alta suele ser el mismo día. Cuando se coloca un stent, la estancia y el tratamiento antiagregante posterior dependen del caso.",
      ],
    },
  ],
  relacionadas: [
    { label: "Angioplastia coronaria y stent", href: "/angioplastia-coronaria" },
    { label: "Síntomas de infarto y qué hacer", href: "/infarto" },
    { label: "TAVI: válvula aórtica por catéter", href: "/tavi-valvula-aortica" },
  ],
};
