import { test } from "node:test";
import assert from "node:assert/strict";
import { readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { routes, getRoute } from "../data/routes.ts";
import { pageMetadata } from "../lib/metadata.ts";

const here = path.dirname(fileURLToPath(import.meta.url));
const contentDir = path.join(here, "..", "data", "content");

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
