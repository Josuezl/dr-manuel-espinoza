/**
 * Serializa datos para incrustarlos en un <script type="application/ld+json">
 * escapando cada "<" como la secuencia unicode \\u003c (JSON valido, Google
 * la parsea igual). Sin este escape, un "</script>" dentro del texto
 * cerraria la etiqueta antes de tiempo y rompería la pagina. Patron
 * recomendado por Next.js para JSON-LD
 * (node_modules/next/dist/docs/01-app/02-guides/json-ld.md).
 */
export function escapeJsonLd(data: object): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
