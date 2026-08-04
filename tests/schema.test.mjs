import { test } from "node:test";
import assert from "node:assert/strict";
import {
  physicianSchema,
  clinicSchema,
  faqSchema,
  breadcrumbSchema,
} from "../lib/schema.ts";
import { sedes } from "../data/seo.ts";

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
});

test("clinicSchema incluye horarios cuando existen", () => {
  const hdv = sedes.find((s) => s.id === "hospital-del-valle");
  const s = clinicSchema(hdv);
  assert.equal(s.openingHoursSpecification[0].opens, "11:00");
  assert.equal(s.openingHoursSpecification[0].closes, "17:00");
});

test("ningun schema emite coordenadas sin verificar", () => {
  for (const sede of sedes) {
    assert.equal(clinicSchema(sede).geo, undefined);
  }
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
