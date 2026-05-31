export interface DoctorInfo {
  name: string;
  title: string;
  specialties: string[];
  slogan: string;
  concept: string;
  phone: string;
  phoneDisplay: string;
  email: string;
  address: string;
  addressMapLink: string;
  whatsappLink: string;
  socials: {
    linkedin?: string;
    youtube?: string;
    twitter?: string;
  };
  stats: {
    label: string;
    value: string;
    description: string;
  }[];
  education: {
    degree: string;
    institution: string;
    year: string;
    details?: string;
  }[];
  memberships: string[];
}

export const doctorData: DoctorInfo = {
  name: "Dr. Manuel Espinoza",
  title: "Cardiólogo Intervencionista y de Cardiopatía Estructural",
  specialties: [
    "Cardiología Intervencionista Avanzada",
    "Enfermedad Coronaria Compleja",
    "TAVI (Implante Valvular Aórtico Transcatéter)",
    "Intervencionismo Mitral y Congénito",
    "Imagen Intracoronaria (IVUS / OCT)"
  ],
  slogan: "Cardiología Intervencionista de Precisión. Decisiones que salvan vidas.",
  concept: "Tecnología que late, humanidad que sana.",
  phone: "+504 9999-9999",
  phoneDisplay: "+504 9999-9999",
  email: "contacto@dr-manuelespinoza.com",
  address: "Centro Médico de Especialidades Cardiovasculares, Nivel 5, Tegucigalpa, Honduras",
  addressMapLink: "https://maps.google.com/?q=Tegucigalpa,Honduras",
  whatsappLink: "https://wa.me/50499999999?text=Hola%20Dr.%20Espinoza,%20deseo%20agendar%20una%20consulta%20m%C3%A9dica",
  socials: {
    linkedin: "https://www.linkedin.com/in/dr-manuel-espinoza-cardiologo",
    youtube: "https://www.youtube.com/c/dr-manuel-espinoza-cardiologia",
  },
  stats: [
    {
      label: "+15 Años",
      value: "15",
      description: "De experiencia en cardiología clínica e intervencionista avanzada."
    },
    {
      label: "+2,000",
      value: "2000",
      description: "Procedimientos de angioplastia coronaria e intervenciones complejas exitosas."
    },
    {
      label: "+500",
      value: "500",
      description: "Casos de implante valvular aórtico transcatéter (TAVI) liderados."
    }
  ],
  education: [
    {
      degree: "Médico y Cirujano General",
      institution: "Universidad Nacional Autónoma de Honduras (UNAH)",
      year: "2002 - 2008",
      details: "Graduado con honores."
    },
    {
      degree: "Especialidad en Cardiología Clínica",
      institution: "Instituto Nacional de Cardiología Ignacio Chávez (Ciudad de México)",
      year: "2009 - 2013",
      details: "Acreditado de forma sobresaliente. Residencia enfocada en patologías complejas."
    },
    {
      degree: "Subespecialidad en Cardiología Intervencionista",
      institution: "Hospital Clínic de Barcelona (Barcelona, España)",
      year: "2013 - 2015",
      details: "Formación especializada en abordajes percutáneos avanzados y tratamiento coronario multivaso."
    },
    {
      degree: "Fellowship de Alta Especialización en Cardiología Estructural y TAVI",
      institution: "Cleveland Clinic (Ohio, EE. UU.)",
      year: "2015 - 2016",
      details: "Entrenamiento intensivista en terapia valvular percutánea (TAVI), MitraClip e intervenciones congénitas del adulto."
    }
  ],
  memberships: [
    "Miembro Activo de la Sociedad Hondureña de Cardiología (SHC)",
    "Miembro Pleno de la Sociedad Latinoamericana de Cardiología Intervencionista (SOLACI)",
    "Fellow de la Society for Cardiovascular Angiography and Interventions (SCAI)",
    "Miembro Afiliado de la European Society of Cardiology (ESC)"
  ]
};
