import { readFileSync } from "node:fs";

const file = process.argv[2];
if (!file) {
  console.error("uso: node scripts/audit-html.mjs <archivo.html>");
  process.exit(2);
}

const html = readFileSync(file, "utf8");

for (const t of ["h1", "h2", "h3"]) {
  const m = html.match(new RegExp(`<${t}[\\s>]`, "g")) || [];
  console.log(`${t}: ${m.length}`);
}

const checks = {
  canonical: /rel="canonical"/,
  "og:image": /property="og:image"/,
  description: /name="description"/,
  keywords: /name="keywords"/,
};
for (const [name, re] of Object.entries(checks)) {
  console.log(`${name}: ${re.test(html) ? "SI" : "NO"}`);
}

const blocks = [
  ...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs),
];
if (blocks.length === 0) {
  console.log("json-ld: NO");
}
for (const [, raw] of blocks) {
  try {
    const o = JSON.parse(raw);
    console.log(`json-ld: ${o["@type"]}`);
  } catch {
    console.log("json-ld: INVALIDO");
  }
}
