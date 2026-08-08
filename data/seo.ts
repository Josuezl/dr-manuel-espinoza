export interface Telefono {
  label: string;
  display: string;
  tel: string;
}

export interface Horario {
  days: string[];
  opens: string;
  closes: string;
}

export interface Sede {
  id: string;
  name: string;
  street: string;
  locality: string;
  region: string;
  country: string;
  phones: Telefono[];
  whatsapp?: string;
  email?: string;
  hours?: Horario[];
  bookingUrl: string;
}

export const sitio = {
  url: "https://drmanuelespinoza.com",
  nombre: "Dr. Manuel Espinoza",
};

export const especialidades = [
  "Medicina Interna",
  "Cardiología Clínica",
  "Cardiología Intervencionista",
];

export const perfiles = [
  "https://pubmed.ncbi.nlm.nih.gov/?term=Espinoza+Rueda",
];

export const sedes: Sede[] = [
  {
    id: "cna",
    name: "Centro de Neumología y Alergias (CNA)",
    street: "Residencial Altavista, Calle 24",
    locality: "San Pedro Sula",
    region: "Cortés",
    country: "HN",
    phones: [
      { label: "Teléfono", display: "+504 2566-3004", tel: "+50425663004" },
      { label: "Celular", display: "+504 9774-5013", tel: "+50497745013" },
    ],
    email: "ccardiologicosps@gmail.com",
    bookingUrl: "https://app.cloudmedhn.com/agendar/VI1zxrktkCY51u8qw2Vsk-KK",
  },
  {
    id: "hospital-del-valle",
    name: "Consultorio Hospital del Valle",
    street: "Hospital del Valle, Condominios 1, Consultorio 402, 4to piso",
    locality: "San Pedro Sula",
    region: "Cortés",
    country: "HN",
    phones: [
      { label: "WhatsApp", display: "+504 9453-2216", tel: "+50494532216" },
    ],
    whatsapp: "50494532216",
    hours: [
      {
        days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "11:00",
        closes: "17:00",
      },
    ],
    bookingUrl: "https://app.cloudmedhn.com/agendar/IDyZjY4Py5oOzxmRbRTA8guF",
  },
];
