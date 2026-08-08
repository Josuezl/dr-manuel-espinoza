import { sedes, especialidades, perfiles, sitio, type Sede } from "../data/seo.ts";

const CLINIC_ID = (sede: Sede) => `${sitio.url}/#${sede.id}`;
const PHYSICIAN_ID = `${sitio.url}/#physician`;

/** Direccion postal en formato schema.org, sin geo: las coordenadas no estan verificadas. */
function postalAddressSchema(sede: Sede) {
  return {
    "@type": "PostalAddress",
    streetAddress: sede.street,
    addressLocality: sede.locality,
    addressRegion: sede.region,
    addressCountry: sede.country,
  };
}

export function clinicSchema(sede: Sede) {
  const telephone = sede.phones[0]?.tel;

  return {
    "@type": "MedicalClinic",
    "@id": CLINIC_ID(sede),
    name: sede.name,
    address: postalAddressSchema(sede),
    ...(telephone ? { telephone } : {}),
    ...(sede.email ? { email: sede.email } : {}),
    ...(sede.hours
      ? {
          openingHoursSpecification: sede.hours.map((h) => ({
            "@type": "OpeningHoursSpecification",
            dayOfWeek: h.days,
            opens: h.opens,
            closes: h.closes,
          })),
        }
      : {}),
  };
}

export function physicianSchema() {
  // Physician es subtipo de LocalBusiness: la guia de Google para resultados
  // enriquecidos de negocio local espera address/telephone en el propio
  // nodo, no solo en los MedicalClinic anidados bajo worksFor. Se toma la
  // primera sede de data/seo.ts (Centro de Neumologia y Alergias, Altavista)
  // como sede principal: es la que aparece primero en `sedes`, tiene dos
  // telefonos y correo (la sede con mas datos de contacto verificados), y es
  // la primera que se lista en la descripcion de /contacto en data/routes.ts.
  const principal = sedes[0];
  const telephone = principal.phones[0]?.tel;

  return {
    "@context": "https://schema.org",
    "@type": "Physician",
    "@id": PHYSICIAN_ID,
    name: "Dr. Manuel Espinoza Rueda",
    alternateName: "Dr. Manuel Espinoza",
    url: sitio.url,
    image: `${sitio.url}/img/dr-manuel-espinoza.jpg`,
    medicalSpecialty: especialidades,
    sameAs: perfiles,
    areaServed: {
      "@type": "AdministrativeArea",
      name: "San Pedro Sula, Honduras",
    },
    address: postalAddressSchema(principal),
    ...(telephone ? { telephone } : {}),
    worksFor: sedes.map(clinicSchema),
  };
}

export function faqSchema(items: { pregunta: string; respuesta: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((i) => ({
      "@type": "Question",
      name: i.pregunta,
      acceptedAnswer: { "@type": "Answer", text: i.respuesta },
    })),
  };
}

export function breadcrumbSchema(trail: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: t.name,
      item: t.url,
    })),
  };
}

export function medicalWebPageSchema(p: {
  title: string;
  description: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    name: p.title,
    description: p.description,
    url: `${sitio.url}${p.path}`,
    inLanguage: "es",
    author: { "@id": PHYSICIAN_ID },
    reviewedBy: { "@id": PHYSICIAN_ID },
  };
}
