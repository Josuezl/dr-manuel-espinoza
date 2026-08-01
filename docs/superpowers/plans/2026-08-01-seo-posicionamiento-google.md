# SEO: posicionamiento en Google — Plan de implementación

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Que drmanuelespinoza.com compita en Google por *cardiólogo en Honduras*, *cardiólogo en San Pedro Sula*, *cardiólogo intervencionista*, *hemodinamia* e *infarto*.

**Architecture:** Se pasa de una sola ruta a ocho, una por intención de búsqueda, sobre el mismo export estático de Next 16. Los datos del negocio (NAP de las dos sedes) viven en una sola fuente, `data/seo.ts`, que alimenta tanto el JSON-LD como la interfaz. El contenido de cada página nueva es un objeto de datos que renderiza un componente compartido, así que agregar una página es agregar un archivo.

**Tech Stack:** Next.js 16.2.6 (App Router, `output: "export"`), React 19.2.4, TypeScript 5, Tailwind 4, framer-motion 12, sharp (optimización de imágenes), `node:test` (tests de funciones puras), bash + ripgrep (`tests/site-contract.sh`).

**Spec:** `docs/superpowers/specs/2026-08-01-seo-posicionamiento-google-design.md`

## Global Constraints

- **Preparar el entorno en CADA shell nuevo.** Ni `node` ni `rg` están en el PATH por defecto, y el contrato necesita los dos. Ejecutar esto antes de cualquier comando de test o build:

  ```bash
  export NVM_DIR="$HOME/.nvm"; . "$NVM_DIR/nvm.sh"; nvm use 24.15.0
  export PATH="$HOME/.local/bin:$PATH"
  ```

  **Los separadores son `;`, no `&&`.** Al cargarse, `nvm.sh` devuelve estado 3 aunque haya funcionado; encadenar con `&&` salta silenciosamente el `nvm use` y `node` queda inaccesible.

  Comprobación: `node -v` → `v24.15.0`, y `bash -c 'rg --version'` → ripgrep con `+pcre2`. Si alguno falla, el contrato reporta un **falso negativo** (`command not found` se lee como aserción fallida), no un problema del código.
- **Leer los docs de Next antes de escribir código.** `AGENTS.md` lo exige: esta versión difiere del entrenamiento. Los docs están en `node_modules/next/dist/docs/01-app/`.
- **`output: "export"`.** No hay servidor. Prohibido: Route Handlers, Server Actions, `redirects`/`headers` en `next.config.ts`, ISR, optimización de imágenes con el loader por defecto.
- **`tests/site-contract.sh` es el contrato del sitio.** Toda modificación de un componente que el contrato asegura debe actualizar el contrato en el **mismo commit**. Se corre con `bash tests/site-contract.sh` y debe terminar en `Site redesign contract passed.`
- **`npm run lint` es parte de la verificación de toda tarea que toque componentes.** CI lo corre antes del build (`.github/workflows/deploy-production.yml:55`), así que un error de lint impide el despliegue. Ni el contrato ni `tsc --noEmit` lo detectan.
- **`rg` (ripgrep) debe estar en el PATH de bash.** El contrato lo usa en cada aserción, incluida `--pcre2`. En CI se instala con `apt-get install ripgrep`. En macOS con Claude Code, `rg` es una función de zsh y **bash no la ve**, así que el contrato falla con `rg: command not found` y reporta un falso negativo. Si eso pasa, crear el shim una vez:

  ```bash
  mkdir -p "$HOME/.local/bin"
  cat > "$HOME/.local/bin/rg" <<'SH'
  #!/usr/bin/env bash
  _cc_bin="${CLAUDE_CODE_EXECPATH:-}"
  [[ -x $_cc_bin ]] || _cc_bin="$(command -v claude)"
  exec -a rg "$_cc_bin" "$@"
  SH
  chmod +x "$HOME/.local/bin/rg"
  export PATH="$HOME/.local/bin:$PATH"
  ```

  `$HOME/.local/bin` **no** está en el PATH por defecto en esta máquina, así que el `export` es obligatorio en cada shell que corra el contrato (o agregarlo al `~/.zshrc` para que persista). Verificar con `bash -c 'rg --version'`: debe reportar ripgrep con `+pcre2`, que las aserciones `assert_matches` necesitan. Si `rg` ya es un binario real, nada de esto hace falta.
- **Datos reales, nunca inventados.** El NAP, los teléfonos y los horarios son los del spec. Si falta un dato (horarios de CNA, coordenadas sin verificar), se **omite el campo**; no se rellena con un valor plausible.
- **Dominio canónico:** `https://drmanuelespinoza.com` (sin `www`).
- **Idioma:** todo el contenido en español de Honduras. Los commits siguen Conventional Commits, en español, sin tildes en el asunto.

### NAP — valores exactos

```
Sede 1 — Centro de Neumología y Alergias (CNA)
  Dirección : Residencial Altavista, Calle 24, San Pedro Sula, Cortés, Honduras
  Teléfono  : +504 2566-3004   → tel:+50425663004
  Celular   : +504 9774-5013   → tel:+50497745013
  Email     : ccardiologicosps@gmail.com
  Horarios  : DESCONOCIDOS — omitir openingHoursSpecification

Sede 2 — Hospital del Valle
  Dirección : Hospital del Valle, Condominios 1, Consultorio 402, 4to piso,
              San Pedro Sula, Cortés, Honduras
  WhatsApp  : +504 9453-2216   → https://wa.me/50494532216
  Horarios  : Lunes a viernes 11:00–17:00; sábado y domingo cerrado

Especialidades: Medicina Interna, Cardiología Clínica, Cardiología Intervencionista
Coordenadas  : SIN VERIFICAR — omitir `geo` hasta confirmarlas en Google Maps
```

---

## Estructura de archivos

| Archivo | Responsabilidad |
|---|---|
| `data/seo.ts` | Fuente única del NAP: sedes, teléfonos, horarios, especialidades, perfiles externos |
| `data/routes.ts` | Registro de rutas: path, title, description, prioridad. Alimenta el sitemap y los breadcrumbs |
| `data/faq.ts` | Preguntas y respuestas del home |
| `data/content/<slug>.ts` | Contenido de cada página nueva (una por archivo) |
| `lib/schema.ts` | Constructores puros de JSON-LD. Sin JSX, sin efectos |
| `components/JsonLd.tsx` | Serializa un objeto a `<script type="application/ld+json">` |
| `components/Contact.tsx` | Bloque de NAP visible con las dos sedes |
| `components/Faq.tsx` | Sección de preguntas frecuentes del home |
| `components/content/ContentPage.tsx` | Renderiza una página de contenido desde su objeto de datos |
| `app/<slug>/page.tsx` | Ruta: importa contenido, exporta metadata, renderiza `ContentPage` |
| `scripts/optimize-images.mjs` | Recomprime las imágenes pesadas a WebP |
| `tests/schema.test.mjs` | Tests unitarios de `lib/schema.ts` con `node:test` |
| `docs/seo-nginx.md` | Configuración de nginx para las 301 (requiere root) |
| `docs/seo-tareas-cliente.md` | Ficha de Google, Search Console, reseñas, directorios |

---

# FASE 1 — Fundamentos

Sin cambio visual. Cero riesgo, beneficio inmediato.

### Task 0: Script de auditoría de HTML

**Files:**
- Create: `scripts/audit-html.mjs`

**Interfaces:**
- Consumes: nada
- Produces: `node scripts/audit-html.mjs <archivo.html>` imprime conteo de encabezados y presencia de metadatos. Lo usan las tareas 1, 3, 12-15 y 19.

Sin esto, cada verificación posterior sería un one-liner distinto. Un solo script reutilizable evita que cada tarea invente su propia comprobación.

- [ ] **Step 1: Crear `scripts/audit-html.mjs`**

```js
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
```

Los demás chequeos siempre imprimen `SI` o `NO`; este debe hacer lo mismo. Un bloque ausente que no imprime nada deja pasar el defecto sin señal, y seis tareas posteriores dependen de esta herramienta para verificar el structured data.

- [ ] **Step 2: Comprobar que corre sobre la build actual**

```bash
export NVM_DIR="$HOME/.nvm"; . "$NVM_DIR/nvm.sh"; nvm use 24.15.0
node scripts/audit-html.mjs out/index.html
```

Esperado: `h1: 1`, `h2: 6`, `h3: 16`, `canonical: NO`, `keywords: SI`, `json-ld: Physician`. Ese es el punto de partida contra el que se comparan las tareas siguientes.

- [ ] **Step 3: Commit**

```bash
git add scripts/audit-html.mjs
git commit -m "chore(seo): agregar script de auditoria de HTML generado"
```

---

### Task 1: Canonical y limpieza de metadata

**Files:**
- Modify: `app/layout.tsx:20-46`
- Test: `tests/site-contract.sh`

**Interfaces:**
- Consumes: `scripts/audit-html.mjs` de la Task 0
- Produces: `alternates.canonical` disponible como patrón para las páginas de la Fase 3

- [ ] **Step 1: Leer el doc de metadata de esta versión de Next**

```bash
sed -n '1,120p' node_modules/next/dist/docs/01-app/03-api-reference/04-functions/generate-metadata.md
```

Buscar específicamente el campo `alternates` y confirmar la forma exacta que espera.

- [ ] **Step 2: Escribir las aserciones que fallan**

Agregar al final de `tests/site-contract.sh`, justo antes de la línea `printf 'Site redesign contract passed.\n'`:

```bash
# SEO: canonical declarado y señales muertas eliminadas.
assert_contains "app/layout.tsx" 'canonical: "/"'
assert_absent "app/layout.tsx" "keywords:"
```

- [ ] **Step 3: Correr el contrato y verificar que falla**

```bash
bash tests/site-contract.sh
```

Esperado: `Expected app/layout.tsx to contain: canonical: "/"` y salida distinta de cero.

- [ ] **Step 4: Aplicar el cambio**

En `app/layout.tsx`, borrar el bloque `keywords: [...]` completo (líneas 25-34) y agregar `alternates` dentro del objeto `metadata`, después de `description`:

```ts
  alternates: {
    canonical: "/",
  },
```

- [ ] **Step 5: Correr el contrato y verificar que pasa**

```bash
bash tests/site-contract.sh
```

Esperado: `Site redesign contract passed.`

- [ ] **Step 6: Verificar en el HTML generado**

```bash
export NVM_DIR="$HOME/.nvm"; . "$NVM_DIR/nvm.sh"; nvm use 24.15.0
npm run build
grep -o 'rel="canonical" href="[^"]*"' out/index.html
grep -c 'name="keywords"' out/index.html || echo "keywords eliminado (correcto)"
```

Esperado: `rel="canonical" href="https://drmanuelespinoza.com"` y ningún `keywords`. **Sin barra final**: con `metadataBase` más `canonical: "/"`, Next 16 emite la URL sin barra, tal como su propio ejemplo documentado. Coincide con lo que emite `app/sitemap.ts`, así que las dos señales concuerdan.

- [ ] **Step 7: Commit**

```bash
git add app/layout.tsx tests/site-contract.sh
git commit -m "seo: agregar canonical y eliminar meta keywords

El meta keywords no es una señal de ranking desde 2009. El canonical
resuelve la duplicacion entre / y /index.html."
```

---

### Task 2: Anclas de navegación válidas desde subpáginas

**Files:**
- Modify: `data/site.ts:176-182`
- Modify: `components/Header.tsx:15,96,107`
- Test: `tests/site-contract.sh`

**Interfaces:**
- Consumes: nada
- Produces: `nav` con hrefs absolutos (`/#seccion`), consumido por `Header` y `Footer`

Las anclas actuales (`#procedimientos`) apuntan a un id dentro de la página actual. Desde `/hemodinamia` no llevan al home, sino que no hacen nada. Hay que anteponer `/`.

- [ ] **Step 1: Escribir las aserciones que fallan**

Agregar a `tests/site-contract.sh` antes del `printf` final:

```bash
# La navegacion funciona desde subpaginas, no solo desde el home.
assert_contains "data/site.ts" 'href: "/#procedimientos"'
assert_contains "data/site.ts" 'href: "/#sobre-mi"'
assert_contains "data/site.ts" 'href: "/#noticias"'
assert_contains "data/site.ts" 'href: "/#videos"'
assert_contains "data/site.ts" 'href: "/#publicaciones"'
assert_contains "components/Header.tsx" 'href="/"'
assert_absent "components/Header.tsx" 'href="#inicio"'
assert_contains "components/Header.tsx" 'href="/#citas"'
assert_absent "components/Header.tsx" 'href="#citas"'
```

El par del logo importa: `Header.tsx` cambia tres hrefs y sin él, revertir el del logo a `href="#inicio"` pasaría el contrato en silencio. No es vacuo: `href="/"` no puede coincidir dentro de `href="/#citas"` — las cadenas divergen un carácter antes de que termine la aguja.

- [ ] **Step 2: Correr el contrato y verificar que falla**

```bash
bash tests/site-contract.sh
```

Esperado: `Expected data/site.ts to contain: href: "/#procedimientos"`.

- [ ] **Step 3: Actualizar `data/site.ts`**

Reemplazar el bloque `nav` (líneas 176-182):

```ts
export const nav = [
  { label: "Procedimientos", href: "/#procedimientos" },
  { label: "Perfil", href: "/#sobre-mi" },
  { label: "Hito clínico", href: "/#noticias" },
  { label: "Educación", href: "/#videos" },
  { label: "Evidencia", href: "/#publicaciones" },
];
```

- [ ] **Step 4: Actualizar `components/Header.tsx`**

Cambiar `href="#inicio"` → `href="/"` (línea 15) y las dos ocurrencias de `href="#citas"` → `href="/#citas"` (líneas 96 y 107).

**Los tres enlaces deben pasar de `<a>` a `<Link>` de `next/link`.** Al apuntar a `/`, un `<a>` activa la regla `@next/next/no-html-link-for-pages` y `npm run lint` falla con error. CI corre lint antes del build (`.github/workflows/deploy-production.yml:55`), así que dejarlos como `<a>` impide el despliegue. El `<a>` del Hero no se toca: su ancla es relativa y no dispara la regla.

Correr `npm run lint` como parte de la verificación, no solo el contrato y `tsc`: ninguno de los dos detecta esto.

- [ ] **Step 5: Ajustar el contrato existente**

La línea 208 del contrato asegura `assert_contains "components/Hero.tsx" "href=\"#citas\""`. El Hero vive solo en el home, así que su ancla relativa es correcta y **no se toca**. Verificar que la aserción nueva sobre `Header.tsx` no entre en conflicto: `assert_absent "components/Header.tsx" 'href="#citas"'` usa coincidencia literal, y `href="/#citas"` no contiene `href="#citas"`. Correcto.

- [ ] **Step 6: Correr el contrato y verificar que pasa**

```bash
bash tests/site-contract.sh
```

Esperado: `Site redesign contract passed.`

- [ ] **Step 7: Commit**

```bash
git add data/site.ts components/Header.tsx tests/site-contract.sh
git commit -m "fix(nav): usar anclas absolutas para que funcionen en subpaginas"
```

---

### Task 3: Texto alternativo en las imágenes de procedimientos

**Files:**
- Modify: `components/Procedures.tsx:60-70`
- Test: `tests/site-contract.sh`

**Interfaces:**
- Consumes: `procedures[]` de `data/site.ts` (campo `name`)
- Produces: nada

Las imágenes de las tarjetas tienen `alt=""`, que le dice al lector de pantalla y a Google que son decorativas. No lo son: ilustran cada procedimiento.

**El alt describe la imagen, no repite el título.** Cada tarjeta ya muestra `procedure.name` en su `<h3>` y `procedure.description` debajo. Un alt que repita el nombre no aporta nada y se lee dos veces seguidas. El alt debe decir qué se ve en la foto.

**Hay que quitar `aria-hidden="true"` del `<Image>`.** Ese atributo saca al elemento del árbol de accesibilidad, así que el lector de pantalla ignora la imagen y su alt: dejarlo convierte el alt en texto muerto para accesibilidad y contradice el propósito del cambio.

**Regla no negociable sobre el contenido:** las descripciones se escriben mirando cada archivo, y solo dicen lo que se ve. Nada de detalle clínico inventado — ni nombres de dispositivos, ni anatomía, ni hallazgos que no sean visualmente evidentes. Si una imagen no se puede identificar con confianza, se describe en términos genéricos y se marca para que el Dr. Espinoza la revise.

- [ ] **Step 1: Escribir la aserción que falla**

```bash
# Las imagenes de procedimientos son de contenido, no decorativas.
assert_contains "data/site.ts" "alt:"
assert_count "data/site.ts" "alt:" "7"
assert_contains "components/Procedures.tsx" "alt={procedure.alt}"
assert_not_matches "components/Procedures.tsx" '<Image[^>]*aria-hidden'
```

El patrón se limita a `[^>]*` a propósito. Con `[\s\S]*?` la búsqueda cruza el cierre del `<Image>` y coincide con el `aria-hidden` del `<div>` del degradado que viene después, que sí debe conservarlo: la aserción fallaría siempre, hiciera lo que hiciera el código.

- [ ] **Step 2: Correr el contrato y verificar que falla**

```bash
bash tests/site-contract.sh
```

Esperado: `Expected components/Procedures.tsx to contain: alt={`${procedure.name}`

- [ ] **Step 3: Escribir las descripciones y conectarlas**

Abrir los siete archivos de `public/img/procedure-*` y describir lo que se ve en cada uno. Agregar un campo `alt` a cada entrada de `procedures` en `data/site.ts`, junto a `image` e `imagePosition`, y extender la interfaz si existe.

En `components/Procedures.tsx`, reemplazar `alt=""` por `alt={procedure.alt}` y **borrar la línea `aria-hidden="true"` del `<Image>`**. El `aria-hidden` del `<div>` del degradado que está debajo sí se queda: ese sí es decorativo.

Las descripciones van en `data/site.ts` y no en el componente porque son contenido, igual que `name` y `description`, y así el Dr. Espinoza puede revisarlas en el mismo archivo donde vive el resto del texto clínico.

- [ ] **Step 4: Correr el contrato y verificar que pasa**

```bash
bash tests/site-contract.sh
```

Esperado: `Site redesign contract passed.`

- [ ] **Step 5: Verificar en el HTML generado**

```bash
npm run build
grep -o 'alt="[^"]*procedimiento realizado[^"]*"' out/index.html | head -3
```

Esperado: 7 alts, uno por procedimiento.

- [ ] **Step 6: Commit**

```bash
git add components/Procedures.tsx tests/site-contract.sh
git commit -m "a11y(seo): describir las imagenes de procedimientos"
```

---

### Task 4: Imagen OpenGraph dedicada

**Files:**
- Create: `app/opengraph-image.tsx`
- Modify: `app/layout.tsx` (quitar `images` del bloque `openGraph`)
- Test: `tests/site-contract.sh`

**Interfaces:**
- Consumes: `doctor` de `data/site.ts`
- Produces: `/opengraph-image.png` generada en build

Hoy el OG usa `doctor.photo` (un retrato 4:5). Las redes recortan a 1.91:1 y queda mal. Una imagen 1200×630 dedicada se ve correcta en WhatsApp, Facebook y LinkedIn — y en Honduras el sitio se comparte sobre todo por WhatsApp.

- [ ] **Step 1: Leer el doc de opengraph-image**

```bash
sed -n '1,80p' node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/01-metadata/opengraph-image.md
```

Confirmar los exports requeridos (`size`, `contentType`, `alt`) y que `ImageResponse` se importa de `next/og`.

- [ ] **Step 2: Escribir la aserción que falla**

```bash
# OG image dedicada con proporcion 1.91:1.
assert_file "app/opengraph-image.tsx"
assert_contains "app/opengraph-image.tsx" "width: 1200"
assert_contains "app/opengraph-image.tsx" "height: 630"
```

- [ ] **Step 3: Correr el contrato y verificar que falla**

```bash
bash tests/site-contract.sh
```

Esperado: `Expected file to exist: app/opengraph-image.tsx`.

- [ ] **Step 4: Crear `app/opengraph-image.tsx`**

`ImageResponse` solo soporta flexbox y un subconjunto de CSS. Nada de `display: grid`.

La primera línea es obligatoria: `opengraph-image` es un Route Handler especializado, y con `output: "export"` la build falla sin ella. Es el mismo idiom que ya usan `app/sitemap.ts` y `app/robots.ts` en este repo.

```tsx
import { ImageResponse } from "next/og";

export const dynamic = "force-static";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt =
  "Dr. Manuel Espinoza Rueda, cardiólogo intervencionista en San Pedro Sula";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(108deg,#4b62d9 0%,#4d66d6 62%,#263181 100%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 30, letterSpacing: 4, opacity: 0.85 }}>
          SAN PEDRO SULA · HONDURAS
        </div>
        <div
          style={{
            fontSize: 78,
            fontWeight: 600,
            lineHeight: 1.08,
            marginTop: 28,
            display: "flex",
          }}
        >
          Dr. Manuel Espinoza Rueda
        </div>
        <div style={{ fontSize: 40, marginTop: 26, opacity: 0.92, display: "flex" }}>
          Cardiología intervencionista y hemodinamia
        </div>
      </div>
    ),
    size,
  );
}
```

- [ ] **Step 5: Quitar el `images` manual del layout**

En `app/layout.tsx`, borrar la línea `images: [{ url: doctor.photo }],` del bloque `openGraph`. Next usa la imagen del archivo automáticamente. Si `doctor` deja de usarse en el archivo, quitar también el import.

- [ ] **Step 6: Verificar que la build genera la imagen**

```bash
npm run build
ls -la out/opengraph-image*
```

Esperado: un PNG. **Si la build falla** con `output: "export"`, la alternativa es generar el PNG una sola vez y guardarlo como `app/opengraph-image.png` (archivo estático, misma convención, sin `ImageResponse`). Documentar cuál de las dos rutas se tomó en el commit.

- [ ] **Step 7: Correr el contrato**

```bash
bash tests/site-contract.sh
```

Esperado: `Site redesign contract passed.`

- [ ] **Step 8: Commit**

```bash
git add app/opengraph-image.tsx app/layout.tsx tests/site-contract.sh
git commit -m "seo: agregar imagen OpenGraph dedicada de 1200x630"
```

---

# FASE 2 — NAP y datos estructurados

Habilita las fichas de Google y hace visible el contacto.

### Task 5: Fuente única del NAP

**Files:**
- Create: `data/seo.ts`
- Test: `tests/site-contract.sh`

**Interfaces:**
- Consumes: nada
- Produces:
  - `type Sede = { id: string; name: string; street: string; locality: string; region: string; country: string; phones: { label: string; display: string; tel: string }[]; whatsapp?: string; email?: string; hours?: { days: string[]; opens: string; closes: string }[]; bookingUrl: string }`
  - `export const sedes: Sede[]` — dos elementos, ids `"cna"` y `"hospital-del-valle"`
  - `export const especialidades: string[]`
  - `export const perfiles: string[]` (para `sameAs`)
  - `export const sitio: { url: string; nombre: string }`

- [ ] **Step 1: Escribir las aserciones que fallan**

```bash
# NAP: fuente unica, con los datos reales de las dos sedes.
assert_file "data/seo.ts"
assert_contains "data/seo.ts" "Residencial Altavista, Calle 24"
assert_contains "data/seo.ts" "Hospital del Valle, Condominios 1, Consultorio 402, 4to piso"
assert_contains "data/seo.ts" "+50425663004"
assert_contains "data/seo.ts" "+50497745013"
assert_contains "data/seo.ts" "50494532216"
assert_contains "data/seo.ts" "Medicina Interna"
assert_contains "data/seo.ts" "Cardiología Intervencionista"
```

- [ ] **Step 2: Correr el contrato y verificar que falla**

```bash
bash tests/site-contract.sh
```

Esperado: `Expected file to exist: data/seo.ts`.

- [ ] **Step 3: Crear `data/seo.ts`**

CNA no lleva `hours` porque no se conocen los horarios. Ninguna sede lleva `geo` porque las coordenadas no están verificadas. Omitir es correcto; inventar no.

```ts
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
```

- [ ] **Step 4: Correr el contrato y verificar que pasa**

```bash
bash tests/site-contract.sh
```

Esperado: `Site redesign contract passed.`

- [ ] **Step 5: Verificar que TypeScript compila**

```bash
npx tsc --noEmit
```

Esperado: sin errores.

- [ ] **Step 6: Commit**

```bash
git add data/seo.ts tests/site-contract.sh
git commit -m "feat(seo): agregar fuente unica del NAP con las dos sedes"
```

---

### Task 6: Constructores de JSON-LD

**Files:**
- Create: `lib/schema.ts`
- Create: `tests/schema.test.mjs`
- Modify: `package.json` (script `test:schema`)
- Modify: `tsconfig.json` (`allowImportingTsExtensions`)

**Resolución de imports — decidida y verificada antes de empezar, no re-litigar:**

`lib/schema.ts` **no** usa el alias `@/`, a diferencia del resto del código. Motivo: `@/` viene de `paths` en `tsconfig.json`, que Node no lee, y `node:test` falla con `ERR_MODULE_NOT_FOUND`. Pero Node exige la extensión explícita, y `tsc` la rechaza con `TS5097` salvo que se active un flag.

La combinación que funciona en las tres capas:

1. Agregar `"allowImportingTsExtensions": true` a `compilerOptions` en `tsconfig.json` (`noEmit: true` ya está, que es su prerrequisito).
2. En `lib/schema.ts` y en el test, importar con ruta relativa **y extensión**: `../data/seo.ts`.

Verificado empíricamente en este repo: `npx tsc --noEmit` sin errores, `node --test` en verde, y `npm run build` compila con ese patrón en código bundleado. Los componentes que consumen `lib/schema.ts` siguen usando `@/lib/schema` con normalidad.

**Interfaces:**
- Consumes: `sedes`, `especialidades`, `perfiles`, `sitio` de `data/seo.ts`
- Produces:
  - `physicianSchema(): object` — nodo `Physician` con `worksFor` apuntando a las dos clínicas
  - `clinicSchema(sede: Sede): object` — nodo `MedicalClinic`
  - `faqSchema(items: { pregunta: string; respuesta: string }[]): object` — `FAQPage`
  - `breadcrumbSchema(trail: { name: string; url: string }[]): object` — `BreadcrumbList`
  - `medicalWebPageSchema(p: { title: string; description: string; path: string }): object`

Son funciones puras: reciben datos, devuelven objetos. Se testean sin renderizar React.

- [ ] **Step 1: Escribir los tests que fallan**

Crear `tests/schema.test.mjs`. Usa `node:test`, incluido en Node 24 — sin dependencias nuevas.

```js
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
```

- [ ] **Step 2: Activar el flag y agregar el script de test**

En `tsconfig.json`, dentro de `compilerOptions`:

```json
"allowImportingTsExtensions": true,
```

En `package.json`, dentro de `scripts`. Node 24 hace type-stripping por defecto: **no** lleva `--experimental-strip-types`.

```json
"test:schema": "node --test tests/schema.test.mjs"
```

- [ ] **Step 3: Correr los tests y verificar que fallan**

```bash
export NVM_DIR="$HOME/.nvm"; . "$NVM_DIR/nvm.sh"; nvm use 24.15.0
npm run test:schema
```

Esperado: falla por no existir `lib/schema.ts`.

- [ ] **Step 4: Crear `lib/schema.ts`**

```ts
import { sedes, especialidades, perfiles, sitio, type Sede } from "../data/seo.ts";

const CLINIC_ID = (sede: Sede) => `${sitio.url}/#${sede.id}`;
const PHYSICIAN_ID = `${sitio.url}/#physician`;

export function clinicSchema(sede: Sede) {
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
    telephone: sede.phones[0]?.tel,
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
```

- [ ] **Step 5: Correr los tests y verificar que pasan**

```bash
npm run test:schema
```

Esperado: 7 tests en verde.

- [ ] **Step 6: Confirmar que tsc y la build siguen sanos**

El flag nuevo y la extensión explícita tocan la resolución de módulos, así que hay que comprobar las tres capas, no solo los tests.

```bash
npx tsc --noEmit
npm run build
```

Esperado: ambos sin errores.

- [ ] **Step 7: Commit**

```bash
git add lib/schema.ts tests/schema.test.mjs package.json tsconfig.json
git commit -m "feat(seo): agregar constructores de JSON-LD con tests"
```

---

### Task 7: Conectar el schema al layout

**Files:**
- Create: `components/JsonLd.tsx`
- Modify: `app/layout.tsx:59-88`
- Test: `tests/site-contract.sh`

**Interfaces:**
- Consumes: `physicianSchema()` de `lib/schema.ts`
- Produces: `<JsonLd data={...} />`, reutilizado por las páginas de la Fase 3

- [ ] **Step 1: Escribir las aserciones que fallan**

```bash
# El JSON-LD sale de constructores testeados, no de un objeto inline.
assert_file "components/JsonLd.tsx"
assert_contains "app/layout.tsx" "physicianSchema"
assert_absent "app/layout.tsx" '"@type": ["Physician", "MedicalBusiness"]'
```

- [ ] **Step 2: Correr el contrato y verificar que falla**

```bash
bash tests/site-contract.sh
```

Esperado: `Expected file to exist: components/JsonLd.tsx`.

- [ ] **Step 3: Crear `components/JsonLd.tsx`**

```tsx
export default function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
```

- [ ] **Step 4: Reemplazar el bloque inline del layout**

En `app/layout.tsx`, borrar la constante `jsonLd` completa (líneas 59-80) y el `<script>` inline (85-88). Importar `JsonLd` y `physicianSchema`, y renderizar dentro de `<body>`:

```tsx
<JsonLd data={physicianSchema()} />
```

- [ ] **Step 5: Correr el contrato y verificar que pasa**

```bash
bash tests/site-contract.sh
```

- [ ] **Step 6: Verificar que el JSON-LD generado es válido**

```bash
npm run build
node --input-type=module -e '
import { readFileSync } from "node:fs";
const html = readFileSync("out/index.html", "utf8");
const blocks = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)];
console.log("bloques:", blocks.length);
for (const [, raw] of blocks) {
  const o = JSON.parse(raw);
  console.log(o["@type"], "| worksFor:", o.worksFor?.length ?? 0);
}
'
```

Esperado: `Physician | worksFor: 2` y ningún error de parseo.

- [ ] **Step 7: Commit**

```bash
git add components/JsonLd.tsx app/layout.tsx tests/site-contract.sh
git commit -m "refactor(seo): generar el JSON-LD desde constructores testeados"
```

---

### Task 8: Sección de contacto con NAP visible

**Files:**
- Create: `components/Contact.tsx`
- Modify: `app/page.tsx`
- Test: `tests/site-contract.sh`

**Interfaces:**
- Consumes: `sedes` de `data/seo.ts`, `SectionHeading` de `components/SectionHeading.tsx`
- Produces: sección con `id="contacto"`

El NAP tiene que ser **texto visible**, no solo JSON-LD. Google contrasta ambos, y los pacientes necesitan poder llamar.

**Antes de nada, reconciliar los nombres de las sedes.** `data/site.ts` tiene un arreglo `clinics` que describe las mismas dos sedes que `sedes` en `data/seo.ts`, y **ya divergieron**: `site.ts` dice `"Consultorio CNA"` y `seo.ts` dice `"Centro de Neumología y Alergias (CNA)"`. `Appointments` renderiza el primero y `Contact` renderizará el segundo, así que el sitio mostraría dos nombres para el mismo lugar — justo la inconsistencia de NAP que este trabajo busca eliminar.

Corrección: `data/site.ts` deja de tener sus propios datos de sede y deriva de `sedes`:

```ts
import { sedes } from "./seo";

export const clinics = sedes.map((sede) => ({
  name: sede.name,
  city: sede.locality,
  bookingUrl: sede.bookingUrl,
}));
```

El nombre correcto es el de `seo.ts`: coincide con el rótulo real del consultorio y es el que debe ir en la ficha de Google. Hay que ajustar las aserciones del contrato que fijan las URLs de CloudMed (líneas ~464-465) si el cambio las mueve, y verificar que `Appointments` sigue renderizando igual.

- [ ] **Step 1: Escribir las aserciones que fallan**

```bash
# El NAP es texto visible, no solo structured data.
assert_file "components/Contact.tsx"
assert_contains "components/Contact.tsx" 'id="contacto"'
assert_contains "components/Contact.tsx" "sedes.map"
assert_contains "components/Contact.tsx" 'href={`tel:${'
assert_contains "components/Contact.tsx" "https://wa.me/"
assert_contains "app/page.tsx" "<Contact />"
```

- [ ] **Step 2: Correr el contrato y verificar que falla**

```bash
bash tests/site-contract.sh
```

- [ ] **Step 3: Crear `components/Contact.tsx`**

Reutiliza `SectionHeading` y `Reveal` para no romper el sistema visual que asegura el contrato.

```tsx
import { sedes } from "@/data/seo";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

const DIAS_ES: Record<string, string> = {
  Monday: "lunes",
  Tuesday: "martes",
  Wednesday: "miércoles",
  Thursday: "jueves",
  Friday: "viernes",
  Saturday: "sábado",
  Sunday: "domingo",
};

export default function Contact() {
  return (
    <section id="contacto" className="bg-frost px-5 pb-20 pt-16 sm:px-10 sm:pb-24 sm:pt-20">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Contacto"
          title="Dónde atiende el Dr. Espinoza"
          description="Dos consultorios en San Pedro Sula. Llamá, escribí por WhatsApp o agendá en línea."
        />
        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {sedes.map((sede) => (
            <Reveal key={sede.id}>
              <address className="not-italic rounded-[2rem] border border-line bg-white p-7">
                <h3 className="font-display text-xl font-semibold tracking-[-0.03em] text-ink sm:text-2xl">
                  {sede.name}
                </h3>
                <p className="mt-3 text-base leading-7 text-cloud">
                  {sede.street}
                  <br />
                  {sede.locality}, {sede.region}, Honduras
                </p>

                <ul className="mt-5 space-y-2">
                  {sede.phones.map((phone) => (
                    <li key={phone.tel}>
                      <a
                        href={`tel:${phone.tel}`}
                        className="text-sm font-semibold text-cobalt hover:underline"
                      >
                        {phone.label}: {phone.display}
                      </a>
                    </li>
                  ))}
                  {sede.email ? (
                    <li>
                      <a
                        href={`mailto:${sede.email}`}
                        className="text-sm font-semibold text-cobalt hover:underline"
                      >
                        {sede.email}
                      </a>
                    </li>
                  ) : null}
                </ul>

                {sede.hours ? (
                  <p className="mt-5 text-sm text-cloud">
                    {sede.hours.map((h) => (
                      <span key={h.opens}>
                        {DIAS_ES[h.days[0]]} a {DIAS_ES[h.days[h.days.length - 1]]}:{" "}
                        {h.opens} – {h.closes}
                      </span>
                    ))}
                  </p>
                ) : null}

                <div className="mt-6 flex flex-wrap gap-3">
                  {sede.whatsapp ? (
                    <a
                      href={`https://wa.me/${sede.whatsapp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-11 items-center rounded-full bg-cobalt px-5 text-sm font-semibold text-white"
                    >
                      Escribir por WhatsApp
                    </a>
                  ) : null}
                  <a
                    href={sede.bookingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center rounded-full border border-line px-5 text-sm font-semibold text-ink"
                  >
                    Agendar en línea
                  </a>
                </div>
              </address>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Montarla en el home**

En `app/page.tsx`, importar `Contact` y renderizarlo dentro de `<main>` después de `<Appointments />`.

- [ ] **Step 5: Correr el contrato y verificar que pasa**

```bash
bash tests/site-contract.sh
npx tsc --noEmit
```

- [ ] **Step 6: Verificar visualmente**

```bash
npm run dev
```

Abrir `http://localhost:3000/#contacto`. Revisar en ancho de 500px (mínimo del proyecto) que las dos tarjetas no desborden y que los botones sean tocables.

- [ ] **Step 7: Commit**

```bash
git add components/Contact.tsx app/page.tsx tests/site-contract.sh
git commit -m "feat(seo): agregar seccion de contacto con NAP visible"
```

---

# FASE 3 — Contenido

La fase más larga. **Todo el texto médico requiere aprobación del Dr. Espinoza antes de publicar.**

### Task 9: Registro de rutas y sitemap generado

**Files:**
- Create: `data/routes.ts`
- Modify: `app/sitemap.ts`
- Test: `tests/site-contract.sh`

**Interfaces:**
- Consumes: nada
- Produces: `export const routes: { path: string; title: string; description: string; priority: number }[]`

Un solo registro alimenta el sitemap, los breadcrumbs y los enlaces internos. Así ninguna página queda fuera del sitemap por olvido.

- [ ] **Step 1: Escribir las aserciones que fallan**

```bash
# El sitemap se genera del registro de rutas, no a mano.
assert_file "data/routes.ts"
assert_contains "app/sitemap.ts" "routes.map"
assert_absent "app/sitemap.ts" 'url: "https://drmanuelespinoza.com",'
```

- [ ] **Step 2: Correr el contrato y verificar que falla**

```bash
bash tests/site-contract.sh
```

- [ ] **Step 3: Crear `data/routes.ts`**

```ts
export interface Route {
  path: string;
  title: string;
  description: string;
  priority: number;
}

export const routes: Route[] = [
  {
    path: "/",
    title: "Cardiólogo Intervencionista en San Pedro Sula | Dr. Manuel Espinoza",
    description:
      "Dr. Manuel Espinoza, cardiólogo intervencionista y especialista en hemodinamia en San Pedro Sula, Honduras. Cateterismo, angioplastia, TAVI y cardiopatía estructural. Agenda tu cita.",
    priority: 1,
  },
  {
    path: "/hemodinamia",
    title: "Hemodinamia y cateterismo cardíaco en San Pedro Sula | Dr. Manuel Espinoza",
    description:
      "Qué es la hemodinamia, cómo se realiza un cateterismo cardíaco y cuándo se indica. Explicado por el Dr. Manuel Espinoza, cardiólogo intervencionista en San Pedro Sula.",
    priority: 0.9,
  },
  {
    path: "/infarto",
    title: "Síntomas de infarto y qué hacer | Cardiólogo en San Pedro Sula",
    description:
      "Cómo reconocer un infarto, qué hacer en los primeros minutos y dónde buscar atención en San Pedro Sula. Guía del Dr. Manuel Espinoza, cardiólogo intervencionista.",
    priority: 0.9,
  },
  {
    path: "/angioplastia-coronaria",
    title: "Angioplastia coronaria y stent en Honduras | Dr. Manuel Espinoza",
    description:
      "Angioplastia coronaria con stent, litotricia intravascular e imagen intracoronaria para lesiones complejas en San Pedro Sula.",
    priority: 0.8,
  },
  {
    path: "/tavi-valvula-aortica",
    title: "TAVI: reemplazo de válvula aórtica por catéter en Honduras",
    description:
      "Implante valvular aórtico transcatéter (TAVI) para estenosis aórtica severa, con planificación por tomografía. Dr. Manuel Espinoza, San Pedro Sula.",
    priority: 0.8,
  },
  {
    path: "/reparacion-mitral-myclip",
    title: "MyClip: reparación de la válvula mitral sin cirugía | Honduras",
    description:
      "Reparación mitral percutánea (MyClip, técnica TEER) para la insuficiencia mitral. El Dr. Manuel Espinoza lideró el primer procedimiento de este tipo en Honduras.",
    priority: 0.8,
  },
  {
    path: "/marcapasos",
    title: "Implante de marcapasos en San Pedro Sula | Dr. Manuel Espinoza",
    description:
      "Implante de marcapasos para trastornos del ritmo lento y de la conducción, con seguimiento y programación personalizada en San Pedro Sula.",
    priority: 0.7,
  },
  {
    path: "/contacto",
    title: "Consultorios y contacto | Dr. Manuel Espinoza, cardiólogo en San Pedro Sula",
    description:
      "Consultorios del Dr. Manuel Espinoza en San Pedro Sula: Centro de Neumología y Alergias (Altavista) y Hospital del Valle. Teléfonos, horarios y agenda en línea.",
    priority: 0.9,
  },
];
```

- [ ] **Step 4: Reescribir `app/sitemap.ts`**

```ts
export const dynamic = "force-static";

import type { MetadataRoute } from "next";
import { routes } from "@/data/routes";
import { sitio } from "@/data/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return routes.map((route) => ({
    url: `${sitio.url}${route.path === "/" ? "" : route.path}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: route.priority,
  }));
}
```

- [ ] **Step 5: Correr el contrato y verificar que pasa**

```bash
bash tests/site-contract.sh
npm run build
cat out/sitemap.xml
```

Esperado: 8 entradas `<url>`. Las 7 rutas nuevas aún dan 404 — se crean en las tareas siguientes. **No desplegar a producción hasta terminar la Task 15**: un sitemap que declara URLs inexistentes le enseña a Google a desconfiar del archivo.

- [ ] **Step 6: Commit**

```bash
git add data/routes.ts app/sitemap.ts tests/site-contract.sh
git commit -m "feat(seo): generar el sitemap desde un registro de rutas"
```

---

### Task 10: FAQ en el home con schema FAQPage

**Files:**
- Create: `data/faq.ts`
- Create: `components/Faq.tsx`
- Modify: `app/page.tsx`
- Test: `tests/site-contract.sh`

**Interfaces:**
- Consumes: `faqSchema()` de `lib/schema.ts`, `JsonLd`, `SectionHeading`
- Produces: `export const faq: { pregunta: string; respuesta: string }[]`, sección `id="preguntas"`

**Todo este texto necesita la aprobación del Dr. Espinoza antes de desplegarse.** El borrador se apoya en `data/site.ts` y en criterios clínicos estándar; no introduce afirmaciones sobre resultados ni estadísticas propias.

- [ ] **Step 1: Escribir las aserciones que fallan**

```bash
# FAQ con structured data para cubrir busquedas informativas.
assert_file "data/faq.ts"
assert_file "components/Faq.tsx"
assert_contains "components/Faq.tsx" "faqSchema"
assert_contains "components/Faq.tsx" 'id="preguntas"'
assert_contains "components/Faq.tsx" "<details"
assert_contains "app/page.tsx" "<Faq />"
assert_contains "data/faq.ts" "hemodinamia"
assert_contains "data/faq.ts" "infarto"
```

- [ ] **Step 2: Correr el contrato y verificar que falla**

```bash
bash tests/site-contract.sh
```

- [ ] **Step 3: Crear `data/faq.ts`**

```ts
export interface FaqItem {
  pregunta: string;
  respuesta: string;
}

export const faq: FaqItem[] = [
  {
    pregunta: "¿Qué es un cardiólogo intervencionista?",
    respuesta:
      "Es el cardiólogo que trata las enfermedades del corazón mediante catéteres, sin abrir el pecho. Accede al corazón por una arteria del brazo o de la pierna y repara la lesión desde adentro, guiado por rayos X y ultrasonido. Permite tratar arterias obstruidas, válvulas dañadas y defectos estructurales con una recuperación mucho más corta que la cirugía abierta.",
  },
  {
    pregunta: "¿Qué es la hemodinamia y para qué sirve?",
    respuesta:
      "La hemodinamia es el estudio de cómo circula la sangre dentro del corazón y sus arterias. En la sala de hemodinamia se miden presiones, se inyecta contraste para ver las arterias coronarias y, en el mismo procedimiento, se pueden tratar las lesiones encontradas. Sirve tanto para diagnosticar como para tratar.",
  },
  {
    pregunta: "¿Cuáles son los síntomas de un infarto?",
    respuesta:
      "El síntoma más frecuente es un dolor u opresión en el centro del pecho que dura más de veinte minutos y que puede extenderse al brazo izquierdo, el cuello, la mandíbula o la espalda. Suele acompañarse de sudoración fría, náusea, falta de aire o sensación de angustia intensa. En mujeres, personas con diabetes y adultos mayores el cuadro puede ser menos típico: cansancio súbito, malestar en el estómago o dificultad para respirar sin dolor evidente.",
  },
  {
    pregunta: "¿Qué hago si sospecho un infarto en San Pedro Sula?",
    respuesta:
      "Buscá atención de emergencia de inmediato: no esperés a que el dolor pase ni manejés vos mismo hasta el hospital. El tiempo es lo que determina cuánto músculo cardíaco se salva. Dirigite a la emergencia del hospital más cercano que cuente con sala de hemodinamia. Esta información es orientativa y no sustituye la atención médica de urgencia.",
  },
  {
    pregunta: "¿Qué es un cateterismo cardíaco?",
    respuesta:
      "Es el procedimiento en el que se introduce un catéter delgado por la muñeca o la ingle hasta el corazón para ver las arterias coronarias con contraste. Se realiza con anestesia local y el paciente permanece despierto. Si se encuentra una obstrucción importante, con frecuencia se trata en el mismo momento.",
  },
  {
    pregunta: "¿Qué es una angioplastia con stent?",
    respuesta:
      "Es la técnica que abre una arteria coronaria obstruida. Se infla un balón dentro de la lesión y se deja colocado un stent, una malla metálica que mantiene la arteria abierta. En lesiones muy calcificadas puede requerir litotricia intravascular, y la imagen intracoronaria (IVUS u OCT) permite medir la lesión y verificar que el stent quedó bien expandido.",
  },
  {
    pregunta: "¿Qué es el TAVI?",
    respuesta:
      "El TAVI es el reemplazo de la válvula aórtica por catéter, sin cirugía abierta. Se indica en estenosis aórtica severa, sobre todo en pacientes de riesgo quirúrgico elevado. La válvula nueva se lleva plegada dentro de un catéter y se despliega en la posición de la válvula enferma. Requiere planificación previa con tomografía.",
  },
  {
    pregunta: "¿Qué es el MyClip y para qué sirve?",
    respuesta:
      "El MyClip corrige la insuficiencia de la válvula mitral con un clip implantado por catéter, que une los bordes de la válvula para que cierre mejor. Es la técnica de reparación borde a borde (TEER). El Dr. Manuel Espinoza lideró el primer procedimiento MyClip realizado en Honduras, en el Hospital del Valle de San Pedro Sula.",
  },
  {
    pregunta: "¿Cuándo debo consultar a un cardiólogo?",
    respuesta:
      "Conviene consultar si tenés dolor u opresión en el pecho al esfuerzo, falta de aire que antes no tenías, palpitaciones, desmayos, hinchazón en las piernas o un soplo detectado en una consulta previa. También si tenés presión alta, diabetes, colesterol elevado o antecedentes familiares de enfermedad coronaria, aunque no sientas nada.",
  },
  {
    pregunta: "¿Dónde atiende el Dr. Manuel Espinoza?",
    respuesta:
      "Atiende en dos consultorios de San Pedro Sula: el Centro de Neumología y Alergias (CNA), en Residencial Altavista, Calle 24, y el consultorio del Hospital del Valle, Condominios 1, Consultorio 402, cuarto piso. En ambos se puede agendar cita en línea.",
  },
];
```

- [ ] **Step 4: Crear `components/Faq.tsx`**

`<details>`/`<summary>` es nativo: funciona sin JavaScript, es accesible por defecto y Google indexa el contenido aunque esté colapsado.

```tsx
import { faq } from "@/data/faq";
import { faqSchema } from "@/lib/schema";
import JsonLd from "./JsonLd";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

export default function Faq() {
  return (
    <section id="preguntas" className="bg-frost px-5 pb-20 pt-16 sm:px-10 sm:pb-24 sm:pt-20">
      <JsonLd data={faqSchema(faq)} />
      <div className="mx-auto max-w-4xl">
        <SectionHeading
          eyebrow="Preguntas frecuentes"
          title="Lo que más preguntan los pacientes"
          description="Respuestas breves sobre los procedimientos y las señales de alarma que no conviene ignorar."
        />
        <div className="mt-14 space-y-3">
          {faq.map((item) => (
            <Reveal key={item.pregunta}>
              <details className="group rounded-[1.5rem] border border-line bg-white p-6">
                <summary className="cursor-pointer list-none font-display text-lg font-semibold leading-snug tracking-[-0.03em] text-ink marker:content-none">
                  {item.pregunta}
                </summary>
                <p className="mt-4 text-base leading-7 text-cloud">{item.respuesta}</p>
              </details>
            </Reveal>
          ))}
        </div>
        <p className="mt-10 text-xs leading-6 text-cloud">
          Esta información es orientativa y no sustituye una consulta médica. Ante
          síntomas de urgencia, buscá atención inmediata.
        </p>
      </div>
    </section>
  );
}
```

- [ ] **Step 5: Montarla en el home**

En `app/page.tsx`, importar `Faq` y renderizarlo dentro de `<main>` entre `<Publications />` y `<Appointments />`.

- [ ] **Step 6: Correr el contrato y los tipos**

```bash
bash tests/site-contract.sh
npx tsc --noEmit
```

- [ ] **Step 7: Verificar el FAQPage generado**

```bash
npm run build
node --input-type=module -e '
import { readFileSync } from "node:fs";
const html = readFileSync("out/index.html", "utf8");
const blocks = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)];
const faq = blocks.map(([, r]) => JSON.parse(r)).find((o) => o["@type"] === "FAQPage");
console.log("preguntas en el schema:", faq.mainEntity.length);
'
```

Esperado: `preguntas en el schema: 10`.

- [ ] **Step 8: Commit**

```bash
git add data/faq.ts components/Faq.tsx app/page.tsx tests/site-contract.sh
git commit -m "feat(seo): agregar FAQ con schema FAQPage

Cubre las busquedas informativas (hemodinamia, infarto, cateterismo)
que el home no podia atacar. Texto pendiente de aprobacion clinica."
```

---

### Task 11: Componente compartido de páginas de contenido

**Files:**
- Create: `components/content/ContentPage.tsx`
- Test: `tests/site-contract.sh`

**Interfaces:**
- Consumes: `breadcrumbSchema`, `medicalWebPageSchema` de `lib/schema.ts`; `JsonLd`; `sedes` de `data/seo.ts`
- Produces:
  - `export interface PageContent { slug: string; h1: string; intro: string; secciones: { h2: string; parrafos: string[] }[]; relacionadas: { label: string; href: string }[] }`
  - `export default function ContentPage({ content, title, description }: { content: PageContent; title: string; description: string })`

Cada `page.tsx` queda mínima. Toda la estructura, el breadcrumb, el CTA y el aviso médico viven acá, en un solo lugar.

- [ ] **Step 1: Escribir las aserciones que fallan**

```bash
# Las paginas de contenido comparten estructura, breadcrumb y aviso medico.
assert_file "components/content/ContentPage.tsx"
assert_contains "components/content/ContentPage.tsx" "breadcrumbSchema"
assert_contains "components/content/ContentPage.tsx" "medicalWebPageSchema"
assert_contains "components/content/ContentPage.tsx" "<h1"
assert_contains "components/content/ContentPage.tsx" "<h2"
assert_contains "components/content/ContentPage.tsx" "no sustituye una consulta médica"
```

- [ ] **Step 2: Correr el contrato y verificar que falla**

```bash
bash tests/site-contract.sh
```

- [ ] **Step 3: Crear `components/content/ContentPage.tsx`**

```tsx
import Link from "next/link";
import { breadcrumbSchema, medicalWebPageSchema } from "@/lib/schema";
import { sitio, sedes } from "@/data/seo";
import JsonLd from "@/components/JsonLd";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export interface PageContent {
  slug: string;
  h1: string;
  intro: string;
  secciones: { h2: string; parrafos: string[] }[];
  relacionadas: { label: string; href: string }[];
}

export default function ContentPage({
  content,
  title,
  description,
}: {
  content: PageContent;
  title: string;
  description: string;
}) {
  const path = `/${content.slug}`;
  const whatsapp = sedes.find((s) => s.whatsapp)?.whatsapp;

  return (
    <>
      <Header />
      <JsonLd data={medicalWebPageSchema({ title, description, path })} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Inicio", url: sitio.url },
          { name: content.h1, url: `${sitio.url}${path}` },
        ])}
      />
      <main className="bg-frost px-5 pb-20 pt-[7.5rem] sm:px-10 sm:pt-[11rem]">
        <article className="mx-auto max-w-3xl">
          <nav aria-label="Ruta de navegación" className="text-xs text-cloud">
            <Link href="/" className="hover:text-cobalt">
              Inicio
            </Link>
            <span aria-hidden="true"> · </span>
            <span>{content.h1}</span>
          </nav>

          <h1 className="mt-6 font-display text-[clamp(2rem,4vw,2.9rem)] font-semibold leading-[1.12] tracking-[-0.03em] text-ink">
            {content.h1}
          </h1>
          <p className="mt-6 text-lg leading-8 text-cloud">{content.intro}</p>

          {content.secciones.map((seccion) => (
            <section key={seccion.h2} className="mt-12">
              <h2 className="font-display text-2xl font-semibold leading-tight tracking-[-0.03em] text-ink sm:text-3xl">
                {seccion.h2}
              </h2>
              {seccion.parrafos.map((parrafo, i) => (
                <p key={i} className="mt-4 text-base leading-7 text-cloud">
                  {parrafo}
                </p>
              ))}
            </section>
          ))}

          <aside className="mt-14 rounded-[2rem] bg-[linear-gradient(108deg,#4b62d9_0%,#4d66d6_62%,#263181_100%)] p-8 text-white">
            <h2 className="font-display text-2xl font-semibold tracking-[-0.03em]">
              ¿Necesitás una valoración?
            </h2>
            <p className="mt-3 text-base leading-7 text-white/90">
              El Dr. Manuel Espinoza atiende en dos consultorios de San Pedro Sula.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              {whatsapp ? (
                <a
                  href={`https://wa.me/${whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center rounded-full bg-white px-5 text-sm font-semibold text-cobalt"
                >
                  Escribir por WhatsApp
                </a>
              ) : null}
              <Link
                href="/#contacto"
                className="inline-flex min-h-11 items-center rounded-full border border-white/40 px-5 text-sm font-semibold text-white"
              >
                Ver consultorios
              </Link>
            </div>
          </aside>

          {content.relacionadas.length > 0 ? (
            <nav aria-label="Contenido relacionado" className="mt-14">
              <h2 className="font-display text-xl font-semibold tracking-[-0.03em] text-ink">
                Seguí leyendo
              </h2>
              <ul className="mt-5 space-y-2">
                {content.relacionadas.map((rel) => (
                  <li key={rel.href}>
                    <Link
                      href={rel.href}
                      className="text-sm font-semibold text-cobalt hover:underline"
                    >
                      {rel.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ) : null}

          <p className="mt-12 border-t border-line pt-6 text-xs leading-6 text-cloud">
            Revisado por el Dr. Manuel Espinoza Rueda, cardiólogo intervencionista.
            Esta información es orientativa y no sustituye una consulta médica.
          </p>
        </article>
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 4: Correr el contrato y los tipos**

```bash
bash tests/site-contract.sh
npx tsc --noEmit
```

- [ ] **Step 5: Commit**

```bash
git add components/content/ContentPage.tsx tests/site-contract.sh
git commit -m "feat(seo): agregar componente compartido de paginas de contenido"
```

---

### Task 12: Página `/hemodinamia`

**Files:**
- Create: `data/content/hemodinamia.ts`
- Create: `app/hemodinamia/page.tsx`
- Test: `tests/site-contract.sh`

**Interfaces:**
- Consumes: `PageContent` de `components/content/ContentPage.tsx`, `routes` de `data/routes.ts`
- Produces: patrón exacto que replican las Tasks 13-15

- [ ] **Step 1: Escribir las aserciones que fallan**

```bash
# Pagina dedicada a hemodinamia.
assert_file "app/hemodinamia/page.tsx"
assert_file "data/content/hemodinamia.ts"
assert_contains "app/hemodinamia/page.tsx" 'canonical: "/hemodinamia"'
```

- [ ] **Step 2: Correr el contrato y verificar que falla**

```bash
bash tests/site-contract.sh
```

- [ ] **Step 3: Crear `data/content/hemodinamia.ts`**

```ts
import type { PageContent } from "@/components/content/ContentPage";

export const hemodinamia: PageContent = {
  slug: "hemodinamia",
  h1: "Hemodinamia y cateterismo cardíaco en San Pedro Sula",
  intro:
    "La hemodinamia estudia cómo circula la sangre dentro del corazón y de sus arterias. En la sala de hemodinamia no solo se diagnostica: muchas veces la lesión encontrada se trata en el mismo procedimiento, sin cirugía abierta.",
  secciones: [
    {
      h2: "¿Qué es la hemodinamia?",
      parrafos: [
        "Es la rama de la cardiología que mide las presiones y los flujos dentro del corazón y evalúa las arterias coronarias con medios de contraste y rayos X. El estudio se hace en una sala equipada con un arco de fluoroscopia que permite ver el corazón latiendo en tiempo real.",
        "A diferencia de los estudios que solo miran desde afuera, la hemodinamia entra al corazón con catéteres delgados y obtiene información directa: qué arteria está obstruida, cuánto, y si esa obstrucción justifica un tratamiento.",
      ],
    },
    {
      h2: "¿Cómo es un cateterismo cardíaco?",
      parrafos: [
        "Se introduce un catéter por la arteria de la muñeca o de la ingle y se avanza hasta el corazón. Se aplica anestesia local en el sitio de punción; el paciente permanece despierto durante todo el procedimiento y no siente el catéter moverse por dentro de las arterias.",
        "Al inyectar contraste, las arterias coronarias se hacen visibles y se identifican las obstrucciones. El estudio dura entre veinte y cuarenta minutos cuando es solo diagnóstico. Si se decide tratar en el mismo acto, se prolonga.",
        "El acceso por la muñeca (radial) permite que el paciente se siente y camine poco después, y reduce las complicaciones en el sitio de punción frente al acceso femoral.",
      ],
    },
    {
      h2: "¿Cuándo se indica?",
      parrafos: [
        "Ante un infarto agudo, para abrir la arteria responsable lo antes posible. También cuando hay angina que limita la vida diaria, pruebas de esfuerzo o estudios de imagen que sugieren isquemia, o antes de una cirugía cardíaca para conocer el estado de las coronarias.",
        "En enfermedad valvular, el cateterismo mide gradientes y presiones que ayudan a definir la severidad y a planificar procedimientos como el TAVI o la reparación mitral.",
      ],
    },
    {
      h2: "Qué se puede tratar en la misma sala",
      parrafos: [
        "Angioplastia coronaria con stent, incluida la litotricia intravascular para lesiones calcificadas. Imagen intracoronaria (IVUS y OCT) para medir cada lesión y verificar que el stent quedó bien expandido. Implante valvular aórtico (TAVI), reparación mitral percutánea, cierre de fugas paravalvulares e implante de marcapasos.",
        "En tromboembolia pulmonar de riesgo intermedio y alto, la trombólisis dirigida por catéter asistida por ultrasonido permite usar dosis bajas de fibrinolítico con mejor perfil de seguridad.",
      ],
    },
    {
      h2: "Preparación y recuperación",
      parrafos: [
        "Se indica ayuno de algunas horas y se revisan los medicamentos habituales, sobre todo anticoagulantes y antidiabéticos. Es importante avisar si hay alergia al medio de contraste o enfermedad renal, porque cambia la preparación.",
        "Después del procedimiento se vigila el sitio de punción durante algunas horas. En estudios diagnósticos por vía radial, el alta suele ser el mismo día. Cuando se coloca un stent, la estancia y el tratamiento antiagregante posterior dependen del caso.",
      ],
    },
  ],
  relacionadas: [
    { label: "Angioplastia coronaria y stent", href: "/angioplastia-coronaria" },
    { label: "Síntomas de infarto y qué hacer", href: "/infarto" },
    { label: "TAVI: válvula aórtica por catéter", href: "/tavi-valvula-aortica" },
  ],
};
```

- [ ] **Step 4: Crear `app/hemodinamia/page.tsx`**

```tsx
import type { Metadata } from "next";
import ContentPage from "@/components/content/ContentPage";
import { hemodinamia } from "@/data/content/hemodinamia";
import { routes } from "@/data/routes";

const route = routes.find((r) => r.path === "/hemodinamia")!;

export const metadata: Metadata = {
  title: route.title,
  description: route.description,
  alternates: { canonical: "/hemodinamia" },
  openGraph: {
    title: route.title,
    description: route.description,
    type: "article",
    locale: "es_HN",
  },
};

export default function Page() {
  return (
    <ContentPage
      content={hemodinamia}
      title={route.title}
      description={route.description}
    />
  );
}
```

- [ ] **Step 5: Correr el contrato, los tipos y la build**

```bash
bash tests/site-contract.sh
npx tsc --noEmit
npm run build
ls out/hemodinamia/
```

Esperado: `index.html` presente.

- [ ] **Step 6: Verificar la estructura de la página generada**

```bash
node scripts/audit-html.mjs out/hemodinamia/index.html
```

Esperado: `h1: 1`, `h2: 7` o más, `canonical: SI`.

- [ ] **Step 7: Commit**

```bash
git add app/hemodinamia data/content/hemodinamia.ts tests/site-contract.sh
git commit -m "feat(seo): agregar pagina de hemodinamia

Texto pendiente de aprobacion clinica."
```

---

### Task 13: Página `/infarto`

**Files:**
- Create: `data/content/infarto.ts`
- Create: `app/infarto/page.tsx`
- Test: `tests/site-contract.sh`

**Interfaces:**
- Consumes: `PageContent`, `routes`
- Produces: nada

Es la página con más responsabilidad del sitio: alguien con dolor en el pecho puede llegar acá. El contenido prioriza la urgencia por encima de la explicación.

- [ ] **Step 1: Escribir las aserciones que fallan**

```bash
# Pagina dedicada al infarto, con la urgencia por delante.
assert_file "app/infarto/page.tsx"
assert_file "data/content/infarto.ts"
assert_contains "app/infarto/page.tsx" 'canonical: "/infarto"'
assert_contains "data/content/infarto.ts" "buscá atención de emergencia"
```

- [ ] **Step 2: Correr el contrato y verificar que falla**

```bash
bash tests/site-contract.sh
```

- [ ] **Step 3: Crear `data/content/infarto.ts`**

```ts
import type { PageContent } from "@/components/content/ContentPage";

export const infarto: PageContent = {
  slug: "infarto",
  h1: "Síntomas de infarto: cómo reconocerlo y qué hacer",
  intro:
    "Si estás leyendo esto con dolor en el pecho en este momento, buscá atención de emergencia ahora. No esperés a que pase y no manejés vos mismo hasta el hospital. En el infarto, cada minuto cuenta: cuanto antes se abre la arteria, más músculo cardíaco se salva.",
  secciones: [
    {
      h2: "Señales de alarma",
      parrafos: [
        "El síntoma más frecuente es dolor u opresión en el centro del pecho que dura más de veinte minutos, que no cede con el reposo y que puede extenderse al brazo izquierdo, al cuello, a la mandíbula o a la espalda.",
        "Suele acompañarse de sudoración fría, náusea, falta de aire, mareo o una sensación intensa de angustia. Muchos pacientes lo describen como un peso sobre el pecho más que como un dolor punzante.",
        "En mujeres, personas con diabetes y adultos mayores el cuadro puede ser atípico: cansancio súbito y desproporcionado, malestar en la boca del estómago, o dificultad para respirar sin dolor evidente. Estos casos se diagnostican más tarde, y esa demora empeora el pronóstico.",
      ],
    },
    {
      h2: "Qué hacer en los primeros minutos",
      parrafos: [
        "Buscá atención de emergencia de inmediato. Si es posible, que otra persona te lleve o llamá a un servicio de emergencia: manejar con un infarto en curso es peligroso para vos y para los demás.",
        "Dirigite a un hospital que cuente con sala de hemodinamia. El tratamiento que más vidas salva en el infarto con elevación del segmento ST es la angioplastia primaria, y solo puede hacerse en un centro con esa capacidad.",
        "No tomés medicamentos por cuenta propia sin indicación médica. Si ya tenés una indicación previa de tu cardiólogo para este escenario, seguí esa indicación.",
      ],
    },
    {
      h2: "Qué es un infarto",
      parrafos: [
        "Un infarto ocurre cuando una arteria coronaria se obstruye y deja sin sangre a una parte del músculo cardíaco. Sin oxígeno, ese tejido empieza a morir en cuestión de minutos, y el daño es irreversible.",
        "La causa habitual es la ruptura de una placa de colesterol dentro de la arteria, que forma un coágulo y la tapa de golpe. Por eso un infarto puede ocurrir en personas que nunca sintieron nada antes.",
      ],
    },
    {
      h2: "Cómo se trata",
      parrafos: [
        "El objetivo es abrir la arteria obstruida lo antes posible. La angioplastia primaria hace eso mediante un catéter: se cruza la obstrucción, se infla un balón y se coloca un stent que mantiene la arteria abierta.",
        "En lesiones muy calcificadas puede necesitarse litotricia intravascular, y la imagen intracoronaria (IVUS u OCT) permite confirmar que el stent quedó bien expandido, algo que reduce el riesgo de complicaciones posteriores.",
        "Después del infarto, el tratamiento continúa con medicamentos antiagregantes, control de la presión, del colesterol y de la diabetes, y rehabilitación cardíaca.",
      ],
    },
    {
      h2: "Cómo reducir el riesgo",
      parrafos: [
        "Los factores que más pesan son el tabaquismo, la presión alta, la diabetes, el colesterol elevado, el sobrepeso y el sedentarismo. Todos son modificables.",
        "Si tenés antecedentes familiares de enfermedad coronaria o alguno de esos factores, conviene una valoración cardiológica aunque no sientas nada. Muchas veces la primera manifestación de la enfermedad coronaria es el infarto mismo.",
      ],
    },
  ],
  relacionadas: [
    { label: "Angioplastia coronaria y stent", href: "/angioplastia-coronaria" },
    { label: "Hemodinamia y cateterismo cardíaco", href: "/hemodinamia" },
  ],
};
```

- [ ] **Step 4: Crear `app/infarto/page.tsx`**

```tsx
import type { Metadata } from "next";
import ContentPage from "@/components/content/ContentPage";
import { infarto } from "@/data/content/infarto";
import { routes } from "@/data/routes";

const route = routes.find((r) => r.path === "/infarto")!;

export const metadata: Metadata = {
  title: route.title,
  description: route.description,
  alternates: { canonical: "/infarto" },
  openGraph: {
    title: route.title,
    description: route.description,
    type: "article",
    locale: "es_HN",
  },
};

export default function Page() {
  return (
    <ContentPage
      content={infarto}
      title={route.title}
      description={route.description}
    />
  );
}
```

- [ ] **Step 5: Correr el contrato, los tipos y la build**

```bash
bash tests/site-contract.sh
npx tsc --noEmit
npm run build
node scripts/audit-html.mjs out/infarto/index.html
```

Esperado: `h1: 1`, `canonical: SI`.

- [ ] **Step 6: Commit**

```bash
git add app/infarto data/content/infarto.ts tests/site-contract.sh
git commit -m "feat(seo): agregar pagina de infarto

Prioriza la accion de urgencia sobre la explicacion. Texto pendiente
de aprobacion clinica."
```

---

### Task 14: Páginas de angioplastia y TAVI

**Files:**
- Create: `data/content/angioplastia-coronaria.ts`
- Create: `app/angioplastia-coronaria/page.tsx`
- Create: `data/content/tavi-valvula-aortica.ts`
- Create: `app/tavi-valvula-aortica/page.tsx`
- Test: `tests/site-contract.sh`

**Interfaces:**
- Consumes: `PageContent`, `routes`
- Produces: nada

- [ ] **Step 1: Escribir las aserciones que fallan**

```bash
# Paginas de procedimientos coronarios y valvulares.
assert_file "app/angioplastia-coronaria/page.tsx"
assert_file "app/tavi-valvula-aortica/page.tsx"
assert_contains "app/angioplastia-coronaria/page.tsx" 'canonical: "/angioplastia-coronaria"'
assert_contains "app/tavi-valvula-aortica/page.tsx" 'canonical: "/tavi-valvula-aortica"'
```

- [ ] **Step 2: Correr el contrato y verificar que falla**

```bash
bash tests/site-contract.sh
```

- [ ] **Step 3: Crear `data/content/angioplastia-coronaria.ts`**

```ts
import type { PageContent } from "@/components/content/ContentPage";

export const angioplastiaCoronaria: PageContent = {
  slug: "angioplastia-coronaria",
  h1: "Angioplastia coronaria y stent en San Pedro Sula",
  intro:
    "La angioplastia coronaria abre una arteria del corazón obstruida sin cirugía abierta. Se llega hasta la lesión con un catéter, se infla un balón y se deja un stent que mantiene la arteria abierta.",
  secciones: [
    {
      h2: "En qué consiste",
      parrafos: [
        "Se accede por la arteria de la muñeca o de la ingle y se avanza un catéter hasta la arteria coronaria enferma. Una guía muy delgada cruza la obstrucción, se infla un balón para abrirla y se despliega el stent, una malla metálica que sostiene la pared del vaso.",
        "El procedimiento se hace con anestesia local y el paciente está despierto. La duración depende de la complejidad de la lesión y de cuántos vasos haya que tratar.",
      ],
    },
    {
      h2: "Lesiones complejas y calcificadas",
      parrafos: [
        "Cuando la placa está muy calcificada, el balón no logra expandirla y el stent queda mal apoyado, lo que aumenta el riesgo de complicaciones. La litotricia intravascular resuelve ese problema: emite ondas de presión que fracturan el calcio dentro de la pared arterial sin dañar el tejido blando.",
        "La enfermedad multivaso y las lesiones en bifurcaciones requieren planificación y técnicas específicas para proteger las ramas laterales.",
      ],
    },
    {
      h2: "Imagen intracoronaria: IVUS y OCT",
      parrafos: [
        "El ultrasonido intravascular (IVUS) y la tomografía de coherencia óptica (OCT) miran la arteria desde adentro. Permiten medir el diámetro real del vaso, conocer la composición de la placa y elegir el stent del tamaño correcto.",
        "Después del implante, confirman que el stent quedó bien expandido y apoyado. La mala expansión es una de las causas principales de reestenosis y trombosis del stent, y solo se detecta con imagen intracoronaria.",
      ],
    },
    {
      h2: "Después del procedimiento",
      parrafos: [
        "Se vigila el sitio de punción y se inicia o ajusta el tratamiento antiagregante. La duración de ese tratamiento depende del tipo de stent y del motivo del procedimiento; suspenderlo por cuenta propia es peligroso.",
        "El control de la presión arterial, del colesterol, de la diabetes y el abandono del tabaco determinan el resultado a largo plazo tanto como el stent mismo.",
      ],
    },
  ],
  relacionadas: [
    { label: "Síntomas de infarto y qué hacer", href: "/infarto" },
    { label: "Hemodinamia y cateterismo cardíaco", href: "/hemodinamia" },
  ],
};
```

- [ ] **Step 4: Crear `app/angioplastia-coronaria/page.tsx`**

```tsx
import type { Metadata } from "next";
import ContentPage from "@/components/content/ContentPage";
import { angioplastiaCoronaria } from "@/data/content/angioplastia-coronaria";
import { routes } from "@/data/routes";

const route = routes.find((r) => r.path === "/angioplastia-coronaria")!;

export const metadata: Metadata = {
  title: route.title,
  description: route.description,
  alternates: { canonical: "/angioplastia-coronaria" },
  openGraph: {
    title: route.title,
    description: route.description,
    type: "article",
    locale: "es_HN",
  },
};

export default function Page() {
  return (
    <ContentPage
      content={angioplastiaCoronaria}
      title={route.title}
      description={route.description}
    />
  );
}
```

- [ ] **Step 5: Crear `data/content/tavi-valvula-aortica.ts`**

```ts
import type { PageContent } from "@/components/content/ContentPage";

export const taviValvulaAortica: PageContent = {
  slug: "tavi-valvula-aortica",
  h1: "TAVI: reemplazo de la válvula aórtica por catéter",
  intro:
    "El TAVI reemplaza la válvula aórtica enferma sin abrir el pecho ni detener el corazón. La válvula nueva viaja plegada dentro de un catéter y se despliega en la posición de la válvula original.",
  secciones: [
    {
      h2: "Qué es la estenosis aórtica",
      parrafos: [
        "La válvula aórtica se abre para dejar salir la sangre del corazón hacia el resto del cuerpo. Con los años puede calcificarse y dejar de abrir bien: eso es la estenosis aórtica.",
        "Cuando se vuelve severa, aparecen falta de aire al esfuerzo, dolor en el pecho o desmayos. A partir de ese momento el pronóstico sin tratamiento empeora rápido, y la aparición de síntomas es lo que marca la necesidad de intervenir.",
      ],
    },
    {
      h2: "Cómo se realiza el TAVI",
      parrafos: [
        "Se accede habitualmente por la arteria femoral. El catéter lleva la válvula protésica comprimida hasta la posición aórtica, donde se despliega y desplaza a la válvula calcificada contra la pared.",
        "Todo el procedimiento se guía por fluoroscopia y ecocardiografía. No requiere circulación extracorpórea ni detener el corazón, y la recuperación es considerablemente más corta que la de la cirugía convencional.",
      ],
    },
    {
      h2: "Planificación con tomografía",
      parrafos: [
        "Antes del TAVI se realiza una tomografía que mide el anillo aórtico, evalúa la distribución del calcio, define la altura de las arterias coronarias y estudia el calibre de los accesos vasculares.",
        "De esa medición dependen el tamaño de la válvula y la vía de acceso. Es el paso que más influye en el resultado.",
      ],
    },
    {
      h2: "Anatomías complejas",
      parrafos: [
        "Algunas anatomías dificultan la implantación, como la aorta horizontal, donde el catéter no se alinea de forma natural con el anillo aórtico. Existen técnicas descritas para resolverlo, entre ellas el uso de catéter lazo paso a paso, publicada por el Dr. Espinoza en JACC: Case Reports.",
      ],
    },
  ],
  relacionadas: [
    { label: "Reparación mitral con MyClip", href: "/reparacion-mitral-myclip" },
    { label: "Hemodinamia y cateterismo cardíaco", href: "/hemodinamia" },
  ],
};
```

- [ ] **Step 6: Crear `app/tavi-valvula-aortica/page.tsx`**

```tsx
import type { Metadata } from "next";
import ContentPage from "@/components/content/ContentPage";
import { taviValvulaAortica } from "@/data/content/tavi-valvula-aortica";
import { routes } from "@/data/routes";

const route = routes.find((r) => r.path === "/tavi-valvula-aortica")!;

export const metadata: Metadata = {
  title: route.title,
  description: route.description,
  alternates: { canonical: "/tavi-valvula-aortica" },
  openGraph: {
    title: route.title,
    description: route.description,
    type: "article",
    locale: "es_HN",
  },
};

export default function Page() {
  return (
    <ContentPage
      content={taviValvulaAortica}
      title={route.title}
      description={route.description}
    />
  );
}
```

- [ ] **Step 7: Correr el contrato, los tipos y la build**

```bash
bash tests/site-contract.sh
npx tsc --noEmit
npm run build
node scripts/audit-html.mjs out/angioplastia-coronaria/index.html
node scripts/audit-html.mjs out/tavi-valvula-aortica/index.html
```

- [ ] **Step 8: Commit**

```bash
git add app/angioplastia-coronaria app/tavi-valvula-aortica data/content tests/site-contract.sh
git commit -m "feat(seo): agregar paginas de angioplastia y TAVI

Texto pendiente de aprobacion clinica."
```

---

### Task 15: Páginas de MyClip, marcapasos y contacto, y cierre de la fase

**Files:**
- Create: `data/content/reparacion-mitral-myclip.ts`
- Create: `app/reparacion-mitral-myclip/page.tsx`
- Create: `data/content/marcapasos.ts`
- Create: `app/marcapasos/page.tsx`
- Create: `app/contacto/page.tsx`
- Modify: `tests/site-contract.sh`

**Interfaces:**
- Consumes: `PageContent`, `routes`, `Contact` de `components/Contact.tsx`, `milestone` de `data/site.ts`
- Produces: las 8 rutas del registro existen

- [ ] **Step 1: Escribir las aserciones que fallan**

```bash
# Todas las rutas del registro tienen pagina.
assert_file "app/reparacion-mitral-myclip/page.tsx"
assert_file "app/marcapasos/page.tsx"
assert_file "app/contacto/page.tsx"
assert_contains "app/reparacion-mitral-myclip/page.tsx" 'canonical: "/reparacion-mitral-myclip"'
assert_contains "app/marcapasos/page.tsx" 'canonical: "/marcapasos"'
assert_contains "app/contacto/page.tsx" 'canonical: "/contacto"'
```

- [ ] **Step 2: Correr el contrato y verificar que falla**

```bash
bash tests/site-contract.sh
```

- [ ] **Step 3: Crear `data/content/reparacion-mitral-myclip.ts`**

El dato del primer MyClip de Honduras ya está verificado y publicado en La Prensa; ver `milestone` en `data/site.ts`.

```ts
import type { PageContent } from "@/components/content/ContentPage";

export const reparacionMitralMyclip: PageContent = {
  slug: "reparacion-mitral-myclip",
  h1: "MyClip: reparación de la válvula mitral sin cirugía abierta",
  intro:
    "La reparación mitral percutánea corrige la insuficiencia de la válvula mitral con un clip implantado por catéter. El Dr. Manuel Espinoza lideró el primer procedimiento MyClip realizado en Honduras, en el Hospital del Valle de San Pedro Sula.",
  secciones: [
    {
      h2: "Qué es la insuficiencia mitral",
      parrafos: [
        "La válvula mitral separa la aurícula izquierda del ventrículo izquierdo y debe cerrar por completo en cada latido. Cuando no cierra bien, parte de la sangre regresa hacia atrás en lugar de salir hacia el cuerpo: eso es la insuficiencia mitral.",
        "El corazón compensa esa sobrecarga durante años, hasta que aparecen falta de aire, cansancio y retención de líquido. Si no se corrige, el ventrículo se dilata y la función cardíaca se deteriora de forma progresiva.",
      ],
    },
    {
      h2: "Cómo funciona el MyClip",
      parrafos: [
        "Es una técnica de reparación borde a borde, conocida como TEER. Se llega al corazón por la vena femoral, se cruza al lado izquierdo y se coloca un clip que une los bordes de las dos valvas de la válvula mitral en el punto donde escapa la sangre.",
        "Al unir esos bordes, la válvula cierra mejor y la regurgitación disminuye. No se reemplaza la válvula: se repara la que el paciente ya tiene.",
        "El procedimiento se guía con ecocardiografía transesofágica tridimensional y fluoroscopia en tiempo real, que permiten ver la válvula y el clip con precisión durante todo el implante.",
      ],
    },
    {
      h2: "A quién se indica",
      parrafos: [
        "Sobre todo a pacientes con insuficiencia mitral severa sintomática en quienes la cirugía a corazón abierto representa un riesgo elevado, ya sea por la edad, por la función del corazón o por otras enfermedades asociadas.",
        "La decisión se toma en equipo, evaluando la anatomía de la válvula con ecocardiografía: no todas las válvulas son adecuadas para esta técnica.",
      ],
    },
    {
      h2: "El primer MyClip de Honduras",
      parrafos: [
        "En mayo de 2026, el Dr. Manuel Espinoza lideró en el Hospital del Valle de San Pedro Sula el primer procedimiento MyClip realizado en el país.",
        "Antes de eso, los pacientes con insuficiencia mitral severa y riesgo quirúrgico alto tenían que optar por la cirugía a corazón abierto o viajar fuera de Honduras. La disponibilidad local de esta técnica cambia esa situación.",
      ],
    },
    {
      h2: "Recuperación",
      parrafos: [
        "Al no haber esternotomía ni circulación extracorpórea, la estancia hospitalaria es corta y la recuperación mucho más rápida que la de la cirugía convencional. El seguimiento incluye control ecocardiográfico para verificar el resultado sobre la válvula.",
      ],
    },
  ],
  relacionadas: [
    { label: "TAVI: válvula aórtica por catéter", href: "/tavi-valvula-aortica" },
    { label: "Hemodinamia y cateterismo cardíaco", href: "/hemodinamia" },
  ],
};
```

- [ ] **Step 4: Crear `app/reparacion-mitral-myclip/page.tsx`**

```tsx
import type { Metadata } from "next";
import ContentPage from "@/components/content/ContentPage";
import { reparacionMitralMyclip } from "@/data/content/reparacion-mitral-myclip";
import { routes } from "@/data/routes";

const route = routes.find((r) => r.path === "/reparacion-mitral-myclip")!;

export const metadata: Metadata = {
  title: route.title,
  description: route.description,
  alternates: { canonical: "/reparacion-mitral-myclip" },
  openGraph: {
    title: route.title,
    description: route.description,
    type: "article",
    locale: "es_HN",
  },
};

export default function Page() {
  return (
    <ContentPage
      content={reparacionMitralMyclip}
      title={route.title}
      description={route.description}
    />
  );
}
```

- [ ] **Step 5: Crear `data/content/marcapasos.ts`**

```ts
import type { PageContent } from "@/components/content/ContentPage";

export const marcapasos: PageContent = {
  slug: "marcapasos",
  h1: "Implante de marcapasos en San Pedro Sula",
  intro:
    "El marcapasos es un dispositivo que estimula el corazón cuando late demasiado lento o cuando el impulso eléctrico no se transmite bien. Se implanta con anestesia local y devuelve al paciente una frecuencia cardíaca adecuada.",
  secciones: [
    {
      h2: "Cuándo se necesita",
      parrafos: [
        "Se indica en bradicardias sintomáticas, es decir, cuando el corazón late tan lento que provoca mareos, desmayos, cansancio extremo o falta de aire. También en bloqueos de la conducción auriculoventricular que interrumpen el paso del impulso eléctrico entre las aurículas y los ventrículos.",
        "Los desmayos sin explicación en personas mayores merecen estudio del ritmo cardíaco: en algunos casos la causa es una pausa eléctrica que solo se detecta con monitoreo prolongado.",
      ],
    },
    {
      h2: "Cómo es el implante",
      parrafos: [
        "Se realiza con anestesia local y sedación. Se accede por una vena bajo la clavícula y se avanzan los electrodos hasta el corazón, guiados por fluoroscopia. El generador queda alojado en un bolsillo bajo la piel, en la región del pecho.",
        "Una vez colocados los electrodos, se miden los umbrales de estimulación y detección para confirmar que el dispositivo funciona correctamente antes de cerrar.",
      ],
    },
    {
      h2: "Programación y seguimiento",
      parrafos: [
        "El marcapasos se programa según las necesidades de cada paciente: frecuencia mínima, respuesta al esfuerzo y modo de estimulación. Esa programación se ajusta en los controles posteriores.",
        "El seguimiento periódico verifica el estado de la batería, la integridad de los electrodos y el porcentaje de estimulación. La batería dura varios años y su reemplazo es un procedimiento sencillo comparado con el implante inicial.",
      ],
    },
    {
      h2: "Vida cotidiana con marcapasos",
      parrafos: [
        "La mayoría de los pacientes retoma su vida normal. Se recomienda evitar movimientos bruscos del brazo del lado del implante durante las primeras semanas y llevar siempre la tarjeta identificatoria del dispositivo.",
        "Los electrodomésticos y los teléfonos celulares de uso habitual no representan un problema. Sí conviene informar sobre el dispositivo antes de estudios de resonancia magnética o de procedimientos con electrobisturí.",
      ],
    },
  ],
  relacionadas: [
    { label: "Hemodinamia y cateterismo cardíaco", href: "/hemodinamia" },
    { label: "Contacto y consultorios", href: "/#contacto" },
  ],
};
```

- [ ] **Step 6: Crear `app/marcapasos/page.tsx`**

```tsx
import type { Metadata } from "next";
import ContentPage from "@/components/content/ContentPage";
import { marcapasos } from "@/data/content/marcapasos";
import { routes } from "@/data/routes";

const route = routes.find((r) => r.path === "/marcapasos")!;

export const metadata: Metadata = {
  title: route.title,
  description: route.description,
  alternates: { canonical: "/marcapasos" },
  openGraph: {
    title: route.title,
    description: route.description,
    type: "article",
    locale: "es_HN",
  },
};

export default function Page() {
  return (
    <ContentPage
      content={marcapasos}
      title={route.title}
      description={route.description}
    />
  );
}
```

- [ ] **Step 7: Crear `app/contacto/page.tsx`**

Reutiliza `components/Contact.tsx` de la Task 8, así que el NAP existe en un solo lugar. La página agrega el `MedicalWebPage` y el breadcrumb que la sección del home no lleva.

```tsx
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Contact from "@/components/Contact";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema, medicalWebPageSchema } from "@/lib/schema";
import { routes } from "@/data/routes";
import { sitio } from "@/data/seo";

const route = routes.find((r) => r.path === "/contacto")!;

export const metadata: Metadata = {
  title: route.title,
  description: route.description,
  alternates: { canonical: "/contacto" },
  openGraph: {
    title: route.title,
    description: route.description,
    type: "website",
    locale: "es_HN",
  },
};

export default function Page() {
  return (
    <>
      <Header />
      <JsonLd
        data={medicalWebPageSchema({
          title: route.title,
          description: route.description,
          path: "/contacto",
        })}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Inicio", url: sitio.url },
          { name: "Consultorios y contacto", url: `${sitio.url}/contacto` },
        ])}
      />
      <main className="bg-frost pt-[6rem] sm:pt-[9rem]">
        <Contact />
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 8: Verificar que toda ruta del sitemap existe**

```bash
npm run build
node --input-type=module -e '
import { readFileSync, existsSync } from "node:fs";
const xml = readFileSync("out/sitemap.xml", "utf8");
const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
let fallos = 0;
for (const url of urls) {
  const path = url.replace("https://drmanuelespinoza.com", "");
  const file = path === "" || path === "/" ? "out/index.html" : `out${path}/index.html`;
  const ok = existsSync(file);
  if (!ok) fallos++;
  console.log((ok ? "OK  " : "FALTA ") + url);
}
process.exit(fallos === 0 ? 0 : 1);
'
```

Esperado: las 8 en `OK` y salida cero.

- [ ] **Step 9: Correr el contrato y los tipos**

```bash
bash tests/site-contract.sh
npx tsc --noEmit
```

- [ ] **Step 10: Commit**

```bash
git add app/reparacion-mitral-myclip app/marcapasos app/contacto data/content tests/site-contract.sh
git commit -m "feat(seo): agregar paginas de MyClip, marcapasos y contacto

Completa las 8 rutas del registro. Texto pendiente de aprobacion
clinica."
```

---

# FASE 4 — Rendimiento e infraestructura

### Task 16: Comprimir las imágenes pesadas

**Files:**
- Create: `scripts/optimize-images.mjs`
- Modify: `package.json` (devDependency `sharp`, script `optimize:images`)
- Modify: `data/site.ts` (rutas de las imágenes convertidas)
- Modify: `public/img/*`
- Test: `tests/site-contract.sh`

**Interfaces:**
- Consumes: nada
- Produces: `public/img/noticia-myclip.webp`, `procedure-pacemaker.webp`, `video-1-poster.webp`, `video-2-poster.webp`

El build pesa 88 MB. `noticia-myclip.png` son 2.8 MB y `procedure-pacemaker.png` 2.1 MB. Con `output: "export"` Next no optimiza nada, así que hay que comprimir el archivo fuente.

- [ ] **Step 1: Instalar sharp como devDependency explícita**

`tests/site-contract.sh` ya importa `sharp` pero no está declarada en `package.json`. Depender de una transitiva es frágil.

```bash
export NVM_DIR="$HOME/.nvm"; . "$NVM_DIR/nvm.sh"; nvm use 24.15.0
npm install --save-dev sharp
```

- [ ] **Step 2: Escribir las aserciones que fallan**

```bash
# Las imagenes pesadas se sirven en WebP.
assert_file "public/img/noticia-myclip.webp"
assert_file "public/img/procedure-pacemaker.webp"
assert_file "public/img/video-1-poster.webp"
assert_file "public/img/video-2-poster.webp"
assert_file "scripts/optimize-images.mjs"
assert_contains "data/site.ts" "/img/noticia-myclip.webp"
assert_contains "data/site.ts" "/img/procedure-pacemaker.webp"
```

- [ ] **Step 3: Correr el contrato y verificar que falla**

```bash
bash tests/site-contract.sh
```

Esperado: `Expected file to exist: public/img/noticia-myclip.webp`.

- [ ] **Step 4: Crear `scripts/optimize-images.mjs`**

```js
import sharp from "sharp";
import { statSync } from "node:fs";

const TARGETS = [
  { from: "public/img/noticia-myclip.png", to: "public/img/noticia-myclip.webp", width: 1600 },
  { from: "public/img/procedure-pacemaker.png", to: "public/img/procedure-pacemaker.webp", width: 1200 },
  { from: "public/img/video-1-poster.png", to: "public/img/video-1-poster.webp", width: 1080 },
  { from: "public/img/video-2-poster.png", to: "public/img/video-2-poster.webp", width: 1080 },
];

const kb = (p) => Math.round(statSync(p).size / 1024);

for (const t of TARGETS) {
  const antes = kb(t.from);
  await sharp(t.from)
    .resize({ width: t.width, withoutEnlargement: true })
    .webp({ quality: 82 })
    .toFile(t.to);
  console.log(`${t.to}: ${antes} KB -> ${kb(t.to)} KB`);
}
```

- [ ] **Step 5: Agregar el script a `package.json`**

```json
"optimize:images": "node scripts/optimize-images.mjs"
```

- [ ] **Step 6: Ejecutarlo y comprobar la reducción**

```bash
npm run optimize:images
```

Esperado: cada archivo por debajo de 300 KB. Si alguno queda por encima, bajar `quality` a 75 y volver a correr.

- [ ] **Step 7: Actualizar las referencias**

En `data/site.ts`: `newsImage: "/img/noticia-myclip.webp"`, `image: "/img/procedure-pacemaker.webp"`, `poster: "/img/video-1-poster.webp"` y `poster: "/img/video-2-poster.webp"`.

El contrato asegura los PNG originales en varias líneas (320-331, 374-382, 411-413). Actualizar cada una a `.webp`. `assert_count "data/site.ts" 'image: "/img/procedure-' "7"` sigue valiendo. `assert_raster_image` y `assert_unique_files` funcionan igual con WebP.

- [ ] **Step 8: Borrar los PNG reemplazados**

```bash
git rm public/img/noticia-myclip.png public/img/procedure-pacemaker.png \
       public/img/video-1-poster.png public/img/video-2-poster.png
```

- [ ] **Step 9: Correr el contrato y la build**

```bash
bash tests/site-contract.sh
npx tsc --noEmit
npm run build
du -sh out
```

Esperado: contrato en verde y `out` claramente por debajo de 88 MB.

- [ ] **Step 10: Verificar visualmente**

```bash
npm run dev
```

Revisar el home: la noticia del MyClip, la tarjeta de marcapasos y los dos pósters de video deben verse sin pérdida perceptible.

- [ ] **Step 11: Commit**

```bash
git add scripts/optimize-images.mjs package.json package-lock.json data/site.ts public/img tests/site-contract.sh
git commit -m "perf(seo): convertir a WebP las imagenes mas pesadas

output: export desactiva la optimizacion de Next, asi que la
compresion se hace sobre los archivos fuente."
```

---

### Task 17: Carga diferida de los videos

**Files:**
- Modify: `components/Videos.tsx`
- Test: `tests/site-contract.sh`

**Interfaces:**
- Consumes: `videos` de `data/site.ts`
- Produces: nada

Son 38 MB en dos archivos. Si el navegador empieza a descargarlos al cargar la página, compite con todo lo demás y arruina el LCP en conexiones móviles.

- [ ] **Step 1: Comprobar el comportamiento actual**

```bash
grep -n "preload\|autoPlay\|controls" components/Videos.tsx
```

Anotar qué atributos tiene hoy el `<video>`.

- [ ] **Step 2: Escribir la aserción que falla**

```bash
# Los videos no se descargan hasta que el visitante los pide.
assert_contains "components/Videos.tsx" 'preload="none"'
```

- [ ] **Step 3: Correr el contrato y verificar que falla**

```bash
bash tests/site-contract.sh
```

- [ ] **Step 4: Agregar `preload="none"` al elemento `<video>`**

El `poster` ya está definido, así que la tarjeta se ve igual: se muestra la imagen y el video solo se descarga al presionar play.

- [ ] **Step 5: Correr el contrato**

```bash
bash tests/site-contract.sh
npx tsc --noEmit
```

- [ ] **Step 6: Verificar que no se descargan al cargar**

```bash
npm run dev
```

Abrir el home con la pestaña Network del navegador. Los `.mp4` no deben aparecer hasta presionar play. Confirmar que al presionar play el video reproduce correctamente.

- [ ] **Step 7: Commit**

```bash
git add components/Videos.tsx tests/site-contract.sh
git commit -m "perf(seo): diferir la descarga de los videos hasta el play"
```

---

### Task 18: Documentar nginx y las tareas del cliente

**Files:**
- Create: `docs/seo-nginx.md`
- Create: `docs/seo-tareas-cliente.md`

**Interfaces:**
- Consumes: NAP de `data/seo.ts`
- Produces: nada

Los cambios de nginx **requieren root**. Según `docs/deployment-vps.md`, la cuenta `deploy` no tiene sudo y no puede tocar la configuración de nginx. Se documenta para que lo aplique quien tenga acceso; **no se ejecuta como parte de este plan**.

- [ ] **Step 1: Crear `docs/seo-nginx.md`**

El documento debe contener exactamente lo siguiente.

**El problema, reproducible:**

```bash
curl -s -o /dev/null -w "%{http_code}\n" https://www.drmanuelespinoza.com          # hoy: 200
curl -s -o /dev/null -w "%{http_code}\n" https://drmanuelespinoza.com/index.html   # hoy: 200
```

Ambas deberían devolver 301. Hoy sirven una copia del sitio, y Google reparte las señales de ranking entre las tres URLs.

**Bloque de redirección de `www`** — servidor propio, separado del que sirve el sitio:

```nginx
server {
    listen 443 ssl;
    listen [::]:443 ssl;
    server_name www.drmanuelespinoza.com;

    ssl_certificate     /etc/letsencrypt/live/drmanuelespinoza.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/drmanuelespinoza.com/privkey.pem;

    return 301 https://drmanuelespinoza.com$request_uri;
}
```

**Regla para `/index.html`** — dentro del bloque que sirve el sitio:

```nginx
location = /index.html {
    return 301 https://drmanuelespinoza.com/;
}
```

**Procedimiento seguro**, en este orden exacto:

```bash
# 1. Respaldar con fecha
sudo cp -a /etc/nginx/sites-available/drmanuelespinoza.com \
           /etc/nginx/sites-available/drmanuelespinoza.com.bak.$(date +%Y%m%d-%H%M%S)

# 2. Aplicar los cambios de arriba

# 3. Validar la sintaxis. Si esto falla, NO recargar.
sudo nginx -t

# 4. Recargar solo si el paso 3 pasó
sudo systemctl reload nginx

# 5. Verificar
curl -s -o /dev/null -w "www:        %{http_code} -> %{redirect_url}\n" https://www.drmanuelespinoza.com
curl -s -o /dev/null -w "index.html: %{http_code} -> %{redirect_url}\n" https://drmanuelespinoza.com/index.html
curl -s -o /dev/null -w "apex:       %{http_code}\n" https://drmanuelespinoza.com
```

Esperado: `www: 301`, `index.html: 301`, `apex: 200`.

**Rollback**, si algo se rompe:

```bash
sudo cp -a /etc/nginx/sites-available/drmanuelespinoza.com.bak.<TIMESTAMP> \
           /etc/nginx/sites-available/drmanuelespinoza.com
sudo nginx -t && sudo systemctl reload nginx
```

**Content-Type de la imagen OpenGraph.** La Task 4 emite `out/opengraph-image` **sin extensión**. nginx resuelve el tipo MIME por extensión, así que un archivo sin ella cae en `default_type` — normalmente `application/octet-stream`. Los crawlers de WhatsApp y Facebook descartan una `og:image` que no llega como `image/*`, que es justo el caso de uso que motivó esa tarea. Hace falta una regla explícita:

```nginx
location = /opengraph-image {
    default_type image/png;
}
```

Verificar después de aplicarla:

```bash
curl -sI https://drmanuelespinoza.com/opengraph-image | grep -i content-type
```

Esperado: `Content-Type: image/png`. Si devuelve `application/octet-stream`, la vista previa al compartir por WhatsApp no muestra imagen.

**Requisito previo:** el certificado TLS debe cubrir tanto `drmanuelespinoza.com` como `www.drmanuelespinoza.com`. Si solo cubre el apex, el navegador rechaza la conexión a `www` por error de certificado **antes** de llegar al redirect. Comprobarlo con:

```bash
echo | openssl s_client -connect drmanuelespinoza.com:443 -servername www.drmanuelespinoza.com 2>/dev/null \
  | openssl x509 -noout -text | grep -A1 "Subject Alternative Name"
```

Si falta `www`, ampliarlo primero: `sudo certbot --expand -d drmanuelespinoza.com -d www.drmanuelespinoza.com`.

- [ ] **Step 2: Crear `docs/seo-tareas-cliente.md`**

Debe contener, en orden de impacto:

1. **Perfil de Empresa en Google.** Qué es, por qué es la acción de mayor impacto para "cardiólogo en San Pedro Sula", y los datos exactos a usar en cada sede, copiados literalmente de la sección NAP de este plan. Advertir que el nombre, la dirección y el teléfono deben coincidir carácter por carácter con el sitio.
2. **Google Search Console.** Verificar el dominio, enviar `https://drmanuelespinoza.com/sitemap.xml`, y revisar el informe de cobertura a las dos semanas.
3. **Reseñas de pacientes.** El factor de mayor peso en el ranking local. Cómo pedirlas sin incentivos, que están prohibidos por las políticas de Google.
4. **Directorios médicos hondureños.** Con NAP idéntico.
5. **Datos pendientes que bloquean parte del trabajo:** horarios de atención de CNA, y verificación de las coordenadas de ambas sedes en Google Maps.

- [ ] **Step 3: Verificar que los datos del documento coinciden con el código**

```bash
grep -o "+504 [0-9-]*" docs/seo-tareas-cliente.md | sort -u
grep -o "+504 [0-9-]*" data/seo.ts | sort -u
```

Esperado: las dos listas idénticas. Un NAP inconsistente entre el sitio y la ficha es peor que no tener ficha.

- [ ] **Step 4: Commit**

```bash
git add docs/seo-nginx.md docs/seo-tareas-cliente.md
git commit -m "docs(seo): documentar redirecciones nginx y tareas del cliente"
```

---

### Task 19: Verificación final

**Files:**
- Modify: `tests/site-contract.sh`

**Interfaces:**
- Consumes: todo lo anterior
- Produces: nada

- [ ] **Step 1: Correr la suite completa**

```bash
export NVM_DIR="$HOME/.nvm"; . "$NVM_DIR/nvm.sh"; nvm use 24.15.0
bash tests/site-contract.sh
npm run test:schema
npx tsc --noEmit
npm run lint
npm run build
```

Todo debe pasar. Si algo falla, arreglarlo antes de continuar.

- [ ] **Step 2: Auditar las 8 páginas generadas**

```bash
for p in index hemodinamia infarto angioplastia-coronaria tavi-valvula-aortica reparacion-mitral-myclip marcapasos contacto; do
  f=$([ "$p" = "index" ] && echo "out/index.html" || echo "out/$p/index.html")
  echo "=== $p ==="
  node scripts/audit-html.mjs "$f"
done
```

Esperado en cada página: `h1: 1`, `canonical: SI`, `keywords: NO`.

- [ ] **Step 3: Validar todo el JSON-LD generado**

```bash
node --input-type=module -e '
import { readFileSync } from "node:fs";
import { globSync } from "node:fs";
const files = globSync("out/**/index.html");
let total = 0;
for (const f of files) {
  const html = readFileSync(f, "utf8");
  const blocks = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)];
  for (const [, raw] of blocks) {
    JSON.parse(raw);
    total++;
  }
}
console.log("bloques JSON-LD validos:", total);
'
```

Esperado: sin excepciones de parseo.

- [ ] **Step 4: Comprobar el peso final**

```bash
du -sh out
```

Anotar el resultado y compararlo con los 88 MB iniciales.

- [ ] **Step 5: Verificación manual tras el despliegue**

Estas no se pueden automatizar. Anotar el resultado de cada una:

- Rich Results Test de Google (`https://search.google.com/test/rich-results`) sobre `/` y `/hemodinamia`: el `Physician` y el `FAQPage` deben detectarse sin errores.
- Lighthouse móvil sobre la build de producción: comparar LCP contra la medición previa.
- Compartir `https://drmanuelespinoza.com` por WhatsApp y confirmar que la vista previa usa la imagen OG nueva.

- [ ] **Step 6: Commit final si hubo ajustes**

```bash
git add -A
git commit -m "test(seo): verificacion final de las 8 rutas"
```

---

## Notas de ejecución

**Aprobación clínica.** Las Tasks 10 y 12-15 generan texto médico. El código puede quedar listo, pero **no se despliega a producción** hasta que el Dr. Espinoza revise y apruebe. Si pide cambios, se editan los archivos de `data/content/` y `data/faq.ts`; ningún componente necesita tocarse.

**Datos que faltan.** Horarios de CNA y coordenadas verificadas de ambas sedes. Mientras no lleguen, `data/seo.ts` omite esos campos. Cuando lleguen, se agregan al arreglo `sedes` y el schema los recoge solo; no hay más código que cambiar.

**Orden.** Las fases 1 y 2 son independientes del contenido y no requieren aprobación de nadie: conviene desplegarlas primero. La fase 3 espera al Dr. La fase 4 puede ir en paralelo con la 3.
