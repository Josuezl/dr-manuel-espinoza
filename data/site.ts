export const doctor = {
  name: "Dr. Manuel Espinoza Rueda",
  shortName: "Dr. Manuel Espinoza",
  title: "Cardiología Intervencionista y Cardiopatía Estructural",
  city: "San Pedro Sula, Honduras",
  photo: "/img/dr-manuel-espinoza.jpg",
  pubmedProfile: "https://pubmed.ncbi.nlm.nih.gov/?term=Espinoza+Rueda",
};

export const milestone = {
  eyebrow: "Hito médico · Mayo 2026",
  title: "El primer MyClip de Honduras",
  summary:
    "El Dr. Manuel Espinoza lideró en el Hospital del Valle, San Pedro Sula, el primer procedimiento MyClip del país: una reparación de la válvula mitral por catéter (TEER) que corrige la insuficiencia mitral sin abrir el pecho, guiada por ecocardiografía transesofágica 3D y fluoroscopia en tiempo real.",
  quote:
    "Este procedimiento marca un antes y un después en el tratamiento de la insuficiencia mitral en Honduras: ofrece una alternativa segura y mínimamente invasiva a pacientes que antes requerían cirugía a corazón abierto o viajar fuera del país.",
  facts: [
    { label: "Sede", value: "Hospital del Valle, San Pedro Sula" },
    { label: "Técnica", value: "Reparación borde a borde (TEER)" },
    { label: "Guía", value: "Eco 3D + fluoroscopia en tiempo real" },
    { label: "Recuperación", value: "Estancia corta, sin cirugía abierta" },
  ],
  pressUrl:
    "https://www.laprensa.hn/teinteresa/hospital-valle-realiza-honduras-primer-procedimiento-cardiaco-myclip-GA30564345",
  pressName: "La Prensa",
  newsImage: "/img/noticia-myclip.png",
};

export const procedures = [
  {
    icon: "HeartPulse",
    image: "/img/procedure-myclip.webp",
    imagePosition: "50% 38%",
    imageFit: "cover",
    name: "Reparación mitral percutánea (MyClip · TEER)",
    description:
      "Corrección de la insuficiencia mitral con un clip implantado por catéter, sin cirugía abierta. Primer procedimiento de este tipo realizado en Honduras.",
  },
  {
    icon: "HeartPulse",
    image: "/img/procedure-pacemaker.png",
    imagePosition: "50% 46%",
    imageFit: "cover",
    name: "Implante de marcapasos",
    description:
      "Colocación de un dispositivo de estimulación cardíaca para tratar alteraciones del ritmo lento y de la conducción, con seguimiento y programación personalizada.",
  },
  {
    icon: "ScanHeart",
    image: "/img/procedure-tavi.webp",
    imagePosition: "50% 50%",
    imageFit: "contain",
    name: "TAVI · Implante valvular aórtico",
    description:
      "Reemplazo de la válvula aórtica por vía transcatéter para estenosis aórtica severa, incluida la planificación con tomografía y técnicas para anatomías complejas.",
  },
  {
    icon: "Route",
    image: "/img/procedure-angioplasty.webp",
    imagePosition: "50% 52%",
    imageFit: "cover",
    name: "Angioplastia coronaria compleja",
    description:
      "Tratamiento de la enfermedad coronaria con stents, litotricia intravascular y técnicas avanzadas para lesiones calcificadas y multivaso.",
  },
  {
    icon: "Microscope",
    image: "/img/procedure-ivus.webp",
    imagePosition: "50% 50%",
    imageFit: "contain",
    name: "Imagen intracoronaria (IVUS · OCT)",
    description:
      "Ultrasonido intravascular y tomografía de coherencia óptica para dimensionar cada lesión y optimizar el resultado de cada stent con precisión milimétrica.",
  },
  {
    icon: "Crosshair",
    image: "/img/procedure-paravalvular.webp",
    imagePosition: "50% 50%",
    imageFit: "cover",
    name: "Cierre de fugas paravalvulares",
    description:
      "Oclusión percutánea de fugas alrededor de prótesis valvulares, con planificación por tomografía, fusión de imagen e impresión 3D.",
  },
  {
    icon: "Activity",
    image: "/img/procedure-pulmonary-embolism.webp",
    imagePosition: "55% 50%",
    imageFit: "cover",
    name: "Tromboembolia pulmonar aguda",
    description:
      "Trombólisis dirigida por catéter asistida por ultrasonido: una alternativa de dosis baja y alta seguridad para la embolia pulmonar de riesgo intermedio y alto.",
  },
];

export interface Publication {
  title: string;
  journal: string;
  year: string;
  pmid: string;
  note?: string;
}

export const publications: Publication[] = [
  {
    title:
      "Successful Closure of Paravalvular Leak Using Computed Tomography Image Fusion and Planning With 3-Dimensional Printing",
    journal: "JACC: Case Reports",
    year: "2021",
    pmid: "35036941",
    note: "Planificación con fusión de imagen e impresión 3D",
  },
  {
    title:
      "Description of the Step-by-Step Technique With Snare Catheter for TAVR in Horizontal Aorta",
    journal: "JACC: Case Reports",
    year: "2021",
    pmid: "34917960",
    note: "Técnica para TAVI en anatomías complejas",
  },
  {
    title:
      "Preoperative Use of Intra-Aortic Balloon Pump Support Reduced 30-Day Mortality in High-Risk Patients",
    journal: "Cardiology",
    year: "2020",
    pmid: "32222708",
    note: "Soporte circulatorio en pacientes de alto riesgo",
  },
  {
    title:
      "Ultrasound-assisted catheter-directed low-dose thrombolysis for acute pulmonary embolism",
    journal: "Archivos de Cardiología de México",
    year: "2019",
    pmid: "31588126",
    note: "Trombólisis dirigida por catéter",
  },
  {
    title:
      "Percutaneous closure of aortic and mitral paravalvular leak with the Occlutech™ PL Device — first cases in Mexico",
    journal: "Archivos de Cardiología de México",
    year: "2019",
    pmid: "30932092",
    note: "Primeros casos reportados en México",
  },
];

export const clinics = [
  {
    name: "Consultorio CNA",
    city: "San Pedro Sula",
    bookingUrl: "https://app.cloudmedhn.com/agendar/VI1zxrktkCY51u8qw2Vsk-KK",
  },
  {
    name: "Consultorio Hospital del Valle",
    city: "San Pedro Sula",
    bookingUrl: "https://app.cloudmedhn.com/agendar/IDyZjY4Py5oOzxmRbRTA8guF",
  },
];

export const videos = [
  {
    src: "/video/video-1.mp4",
    poster: "/img/video-1-poster.png",
    title: "Tratamiento percutáneo de la insuficiencia de la válvula mitral",
    description:
      "Cómo se corrige la insuficiencia de la válvula mitral por catéter, sin cirugía abierta: la técnica detrás del primer MyClip de Honduras.",
  },
  {
    src: "/video/video-2.mp4",
    poster: "/img/video-2-poster.png",
    title: "Cardiopatías isquémicas",
    description:
      "Lo que el paciente con cardiopatía isquémica debe saber: cómo se estudia y se trata la enfermedad de las arterias coronarias.",
  },
];

export const nav = [
  { label: "Procedimientos", href: "/#procedimientos" },
  { label: "Perfil", href: "/#sobre-mi" },
  { label: "Hito clínico", href: "/#noticias" },
  { label: "Educación", href: "/#videos" },
  { label: "Evidencia", href: "/#publicaciones" },
];
