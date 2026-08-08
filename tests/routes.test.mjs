import { test } from "node:test";
import assert from "node:assert/strict";
import { readdirSync, existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { routes, getRoute } from "../data/routes.ts";
import { pageMetadata } from "../lib/metadata.ts";

const here = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.join(here, "..");
const contentDir = path.join(here, "..", "data", "content");
const appDir = path.join(here, "..", "app");

test("getRoute devuelve la misma ruta que routes.find para un path registrado", () => {
  const expected = routes.find((r) => r.path === "/hemodinamia");
  assert.ok(expected, "la ruta de prueba debe existir en data/routes.ts");
  assert.equal(getRoute("/hemodinamia"), expected);
});

test("getRoute lanza para un path no registrado, y el mensaje nombra el path buscado", () => {
  const pathInexistente = "/esta-ruta-no-existe";
  assert.throws(
    () => getRoute(pathInexistente),
    (err) => {
      assert.ok(err instanceof Error, "debe lanzar un Error");
      assert.ok(
        err.message.includes(pathInexistente),
        `el mensaje del error debe nombrar el path buscado; recibido: "${err.message}"`,
      );
      return true;
    },
  );
});

test("pageMetadata arma title, description y canonical distintos y correctos para dos rutas reales", () => {
  const home = getRoute("/");
  const hemodinamia = getRoute("/hemodinamia");

  const homeMeta = pageMetadata(home);
  const hemodinamiaMeta = pageMetadata(hemodinamia);

  assert.equal(homeMeta.title, home.title);
  assert.equal(homeMeta.description, home.description);
  assert.equal(homeMeta.alternates.canonical, "/");

  assert.equal(hemodinamiaMeta.title, hemodinamia.title);
  assert.equal(hemodinamiaMeta.description, hemodinamia.description);
  assert.equal(hemodinamiaMeta.alternates.canonical, "/hemodinamia");

  // Este es el par de aserciones que atrapa un getRoute() saboteado (p. ej.
  // "return routes[0]" ignorando el path): si ambas rutas resuelven al mismo
  // objeto, home y hemodinamia salen identicos.
  assert.notEqual(homeMeta.title, hemodinamiaMeta.title);
  assert.notEqual(
    homeMeta.alternates.canonical,
    hemodinamiaMeta.alternates.canonical,
  );
});

test("pageMetadata declara una imagen social real (openGraph.images no vacio)", () => {
  const route = getRoute("/hemodinamia");
  const meta = pageMetadata(route);

  assert.ok(
    Array.isArray(meta.openGraph.images) && meta.openGraph.images.length > 0,
    "openGraph.images debe ser un arreglo no vacio",
  );
  const [image] = meta.openGraph.images;
  assert.ok(image.url, "la imagen debe declarar una url");
  assert.equal(image.width, 1200);
  assert.equal(image.height, 630);
});

test("cada relacionadas[].href en data/content/ corresponde a un path registrado en data/routes.ts", async () => {
  const files = readdirSync(contentDir).filter((f) => f.endsWith(".ts"));
  assert.ok(
    files.length > 0,
    "no se encontro ningun archivo en data/content/: la prueba no puede pasar en vacio",
  );

  const registered = new Set(routes.map((r) => r.path));

  for (const file of files) {
    const mod = await import(pathToFileURL(path.join(contentDir, file)).href);
    const [pageContent] = Object.values(mod).filter(
      (v) => v && typeof v === "object" && Array.isArray(v.relacionadas),
    );
    assert.ok(
      pageContent,
      `${file} debe exportar un PageContent con "relacionadas"`,
    );
    for (const rel of pageContent.relacionadas) {
      assert.ok(
        registered.has(rel.href),
        `${file}: relacionadas href "${rel.href}" (label "${rel.label}") no corresponde a ningun path en data/routes.ts`,
      );
    }
  }
});

test("cada ruta registrada en data/routes.ts tiene su app/<path>/page.tsx", () => {
  // app/sitemap.ts genera el XML mapeando "routes" directamente: agregar una
  // ruta al registro la mete en el sitemap sin que exista ninguna pagina, y
  // con output: "export" el build no falla por una URL del sitemap sin HTML
  // detras. Este test cierra ese hueco para todas las rutas presentes y
  // futuras, en vez de depender de assert_file agregados a mano por pagina
  // en tests/site-contract.sh.
  for (const route of routes) {
    const pageFile =
      route.path === "/"
        ? path.join(appDir, "page.tsx")
        : path.join(appDir, route.path, "page.tsx");

    assert.ok(
      existsSync(pageFile),
      `data/routes.ts registra "${route.path}" pero no existe ${path.relative(
        path.join(here, ".."),
        pageFile,
      )}`,
    );
  }
});

// --- C1: ninguna ruta puede quedar sin enlaces entrantes -------------------
//
// No probamos contra out/ (el HTML ya construido): .github/workflows/
// deploy-production.yml corre "npm test" ANTES que "npm run build" (ver
// el paso "Run test suite" seguido de "Build static export"), asi que en
// CI out/ todavia no existe cuando este archivo se ejecuta. Localmente
// out/ puede existir pero quedar desactualizado de un build anterior, lo
// que daria una falsa confianza (el test pasaria contra HTML viejo aunque
// el codigo fuente ya no genere esos enlaces). En su lugar, este bloque
// reconstruye el mismo grafo de enlaces leyendo las fuentes de datos que
// efectivamente generan el HTML -- data/site.ts (procedures y nav),
// data/faq.ts (enlace) y data/content/*.ts (relacionadas) -- y pinnea los
// enlaces concretos, no solo su cantidad.

function extractHrefs(text) {
  return [...text.matchAll(/href:\s*"([^"]+)"/g)].map((m) => m[1]);
}

function section(text, startMarker, endMarker) {
  const start = text.indexOf(startMarker);
  assert.ok(start !== -1, `no se encontro "${startMarker}" en el archivo`);
  const end = endMarker ? text.indexOf(endMarker, start) : text.length;
  assert.ok(
    !endMarker || end !== -1,
    `no se encontro "${endMarker}" despues de "${startMarker}"`,
  );
  return text.slice(start, end === -1 ? undefined : end);
}

const siteTs = readFileSync(path.join(repoRoot, "data", "site.ts"), "utf8");
const faqTs = readFileSync(path.join(repoRoot, "data", "faq.ts"), "utf8");
const contentPageTsx = readFileSync(
  path.join(repoRoot, "components", "content", "ContentPage.tsx"),
  "utf8",
);

const registeredPaths = new Set(routes.map((r) => r.path));

test("cada procedures[].href (cuando existe) corresponde a un path registrado en data/routes.ts", () => {
  const proceduresSection = section(
    siteTs,
    "export const procedures",
    "export interface Publication",
  );
  const hrefs = extractHrefs(proceduresSection);
  assert.ok(hrefs.length > 0, "procedures deberia declarar al menos un href");
  for (const href of hrefs) {
    assert.ok(
      registeredPaths.has(href),
      `procedures declara href "${href}", que no es un path registrado en data/routes.ts`,
    );
  }
});

test("nav incluye /contacto como ruta completa registrada", () => {
  const navSection = section(siteTs, "export const nav");
  const hrefs = extractHrefs(navSection);
  const routeHrefs = hrefs.filter((h) => !h.includes("#"));
  assert.ok(
    routeHrefs.includes("/contacto"),
    'nav debe incluir "/contacto" para que la pagina sea alcanzable desde la navegacion',
  );
  for (const href of routeHrefs) {
    assert.ok(
      registeredPaths.has(href),
      `nav declara href "${href}", que no es un path registrado en data/routes.ts`,
    );
  }
});

test("cada faq[].enlace.href (cuando existe) corresponde a un path registrado en data/routes.ts", () => {
  const hrefs = extractHrefs(faqTs);
  assert.ok(hrefs.length > 0, "faq deberia declarar al menos un enlace.href");
  for (const href of hrefs) {
    assert.ok(
      registeredPaths.has(href),
      `faq declara enlace.href "${href}", que no es un path registrado en data/routes.ts`,
    );
  }
});

test('ContentPage.tsx enlaza el CTA de contacto a "/contacto", no al ancla "/#contacto" del home', () => {
  assert.ok(
    contentPageTsx.includes('href="/contacto"'),
    'components/content/ContentPage.tsx debe contener href="/contacto"',
  );
  assert.ok(
    !contentPageTsx.includes('href="/#contacto"'),
    'components/content/ContentPage.tsx no debe seguir enlazando al ancla "/#contacto" del home',
  );
});

test("ninguna de las 8 rutas registradas queda sin al menos un enlace entrante conocido", async () => {
  const proceduresSection = section(
    siteTs,
    "export const procedures",
    "export interface Publication",
  );
  const navSection = section(siteTs, "export const nav");
  const procedureHrefs = extractHrefs(proceduresSection);
  const navHrefs = extractHrefs(navSection);
  const faqHrefs = extractHrefs(faqTs);

  const inbound = new Map(routes.map((r) => [r.path, new Set()]));
  const addEdge = (from, to) => {
    if (from !== to && inbound.has(to)) inbound.get(to).add(from);
  };

  // "/" renderiza Procedures y Faq: sus enlaces salen desde el home.
  for (const href of procedureHrefs) addEdge("/", href);
  for (const href of faqHrefs) addEdge("/", href);

  // nav vive en Header y Footer, presentes en TODAS las paginas. Los
  // anclas "/#seccion" tambien son enlaces reales a "/" desde cualquier
  // otra ruta (el navegador carga "/" antes de saltar al ancla), por eso
  // se usa el path completo sin filtrar y solo se recorta el "#".
  for (const route of routes) {
    for (const href of navHrefs) {
      const target = href.split("#")[0] || "/";
      addEdge(route.path, target);
    }
  }

  // Las paginas de contenido basadas en ContentPage.tsx enlazan a
  // "/contacto" desde el CTA "Ver consultorios" y a sus "relacionadas".
  const contentFiles = readdirSync(contentDir).filter((f) => f.endsWith(".ts"));
  assert.ok(contentFiles.length > 0, "data/content/ no puede estar vacio");
  for (const file of contentFiles) {
    const mod = await import(pathToFileURL(path.join(contentDir, file)).href);
    const [pageContent] = Object.values(mod).filter(
      (v) => v && typeof v === "object" && Array.isArray(v.relacionadas),
    );
    const source = `/${pageContent.slug.replace(/^\/+|\/+$/g, "")}`;
    addEdge(source, "/contacto");
    for (const rel of pageContent.relacionadas) addEdge(source, rel.href);
  }

  for (const route of routes) {
    const sources = inbound.get(route.path);
    assert.ok(
      sources.size > 0,
      `"${route.path}" no recibe ningun enlace entrante conocido (ni de Procedures, ni de Faq, ni de nav, ni de "relacionadas")`,
    );
  }

  // Enlaces concretos pinneados: la regresion que motivo este test (C1 del
  // review final) fue que las 7 paginas de contenido no recibian NI UN
  // enlace desde el home. Estas aserciones fallan si esa regresion vuelve,
  // en vez de solo comprobar un conteo generico.
  const contentRoutePaths = routes
    .map((r) => r.path)
    .filter((p) => p !== "/" && p !== "/contacto");
  for (const path_ of contentRoutePaths) {
    assert.ok(
      inbound.get(path_).has("/"),
      `"${path_}" debe recibir un enlace desde "/" (el review final exige que las 7 paginas de contenido reciban al menos un enlace del home)`,
    );
  }
  assert.ok(
    inbound.get("/contacto").has("/"),
    '"/contacto" debe recibir un enlace desde "/" (nav)',
  );
});
