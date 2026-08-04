import { sedes, especialidades, perfiles, sitio, type Sede } from "../data/seo.ts";

const CLINIC_ID = (sede: Sede) => `${sitio.url}/#${sede.id}`;
const PHYSICIAN_ID = `${sitio.url}/#physician`;

export function clinicSchema(sede: Sede) {
  const telephone = sede.phones[0]?.tel;

  return {
    "@type": "MedicalClinic",
    "@id": CLINIC_ID(sede),
    name: sede.name,
    address: {
      "@type": "PostalAddress",
      streetAddress: sede.street,
      addressLocality: sede.locality,
      addressRegion: sede.region,
      addressCountry: sede.country,
    },
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
