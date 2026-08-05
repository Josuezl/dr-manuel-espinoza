import { test } from "node:test";
import assert from "node:assert/strict";
import {
  physicianSchema,
  clinicSchema,
  faqSchema,
  breadcrumbSchema,
} from "../lib/schema.ts";
import { sedes } from "../data/seo.ts";
import { escapeJsonLd } from "../lib/jsonld.ts";

test("physicianSchema declara las tres especialidades", () => {
  const s = physicianSchema();
  assert.equal(s["@type"], "Physician");
  assert.ok(s.medicalSpecialty.includes("Medicina Interna"));
  assert.ok(s.medicalSpecialty.includes("Cardiología Intervencionista"));
});

test("physicianSchema enlaza las dos sedes", () => {
  const s = physicianSchema();
  assert.equal(s.worksFor.length, 2);
});

test("clinicSchema omite horarios cuando no se conocen", () => {
  const cna = sedes.find((s) => s.id === "cna");
  const s = clinicSchema(cna);
  assert.equal(s.openingHoursSpecification, undefined);
  assert.equal(
    Object.hasOwn(s, "openingHoursSpecification"),
    false,
    "openingHoursSpecification no debe existir como propiedad propia cuando la sede no tiene horario",
  );
});

test("clinicSchema incluye horarios cuando existen", () => {
  const hdv = sedes.find((s) => s.id === "hospital-del-valle");
  const s = clinicSchema(hdv);
  assert.equal(s.openingHoursSpecification[0].opens, "11:00");
  assert.equal(s.openingHoursSpecification[0].closes, "17:00");
  assert.equal(
    Object.hasOwn(s, "openingHoursSpecification"),
    true,
    "openingHoursSpecification debe existir como propiedad propia cuando la sede tiene horario",
  );
});

test("ningun schema emite coordenadas sin verificar", () => {
  assert.ok(
    sedes.length > 0,
    "la prueba requiere al menos una sede real para no pasar en vacio",
  );
  for (const sede of sedes) {
    const s = clinicSchema(sede);
    assert.equal(s.geo, undefined);
    assert.equal(
      Object.hasOwn(s, "geo"),
      false,
      `geo no debe existir como propiedad propia para la sede ${sede.id}`,
    );
  }
});

test("clinicSchema omite telephone cuando la sede no tiene telefonos", () => {
  const sedeSinTelefonos = {
    id: "sin-telefonos",
    name: "Sede de prueba sin telefonos",
    street: "Calle de prueba",
    locality: "San Pedro Sula",
    region: "Cortés",
    country: "HN",
    phones: [],
    bookingUrl: "https://example.test/agendar",
  };
  const s = clinicSchema(sedeSinTelefonos);
  assert.equal(s.telephone, undefined);
  assert.equal(
    Object.hasOwn(s, "telephone"),
    false,
    "telephone no debe existir como propiedad propia cuando phones esta vacio",
  );
});

test("faqSchema produce un FAQPage con sus preguntas", () => {
  const s = faqSchema([{ pregunta: "¿Qué es?", respuesta: "Esto." }]);
  assert.equal(s["@type"], "FAQPage");
  assert.equal(s.mainEntity[0]["@type"], "Question");
  assert.equal(s.mainEntity[0].acceptedAnswer.text, "Esto.");
});

test("breadcrumbSchema numera las posiciones desde 1", () => {
  const s = breadcrumbSchema([
    { name: "Inicio", url: "https://drmanuelespinoza.com" },
    { name: "Hemodinamia", url: "https://drmanuelespinoza.com/hemodinamia" },
  ]);
  assert.equal(s.itemListElement[0].position, 1);
  assert.equal(s.itemListElement[1].position, 2);
});

test("escapeJsonLd impide que un </script> en la respuesta rompa la pagina", () => {
  const item = {
    pregunta: "¿Cómo se cierra una etiqueta script?",
    respuesta: "Con </script> se cerraria la etiqueta antes de tiempo.",
  };
  const s = faqSchema([item]);
  const serialized = escapeJsonLd(s);

  assert.ok(
    !serialized.includes("</script>"),
    "el string serializado y escapado no debe contener '</script>' literal",
  );

  const parsed = JSON.parse(serialized);
  assert.equal(
    parsed.mainEntity[0].acceptedAnswer.text,
    item.respuesta,
    "JSON.parse del resultado debe devolver el texto original intacto",
  );
});
