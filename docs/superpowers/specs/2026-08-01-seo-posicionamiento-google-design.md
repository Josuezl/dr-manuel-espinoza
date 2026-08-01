# SEO: posicionamiento en Google — Dr. Manuel Espinoza

**Fecha:** 2026-08-01
**Estado:** Diseño aprobado, pendiente de plan de implementación

## Objetivo

Que el sitio aparezca en los primeros resultados de Google para las búsquedas que
importan al cliente: *cardiólogo en Honduras*, *cardiólogo en San Pedro Sula*,
*cardiólogo intervencionista*, *hemodinamia* e *infarto*.

### Expectativa realista

Nadie puede garantizar el primer lugar. Dos límites que conviene fijar por escrito:

1. Para búsquedas locales (*cardiólogo en San Pedro Sula*) el primer resultado es
   el paquete de mapas de Google, que se gana con un **Perfil de Empresa en
   Google**, no con código. Hoy no existe uno.
2. *infarto* a secas compite contra Mayo Clinic y MedlinePlus. La meta alcanzable
   es la variante local: *infarto San Pedro Sula*, *cardiólogo de urgencia
   Honduras*, *qué hacer ante un infarto*.

El trabajo de este spec cubre todo lo que sí depende del sitio, y deja preparada
la ficha de Google para que el cliente la cree.

## Estado actual

Sitio Next.js 16 con `output: "export"`, servido por nginx en un VPS
(ver `docs/deployment-vps.md`). Una sola ruta: `/`.

Ya existe: `metadataBase`, title, description, OpenGraph, `sitemap.ts`,
`robots.ts` y JSON-LD `Physician`/`MedicalBusiness`.

### Problemas detectados

| # | Problema | Evidencia |
|---|---|---|
| 1 | Una sola página compite por cinco intenciones de búsqueda distintas | `app/page.tsx` |
| 2 | `www.drmanuelespinoza.com` responde 200 en vez de redirigir | `curl` a producción |
| 3 | `/index.html` responde 200 — tercera copia del home | `curl` a producción |
| 4 | Sin `<link rel="canonical">` en ninguna ruta | `app/layout.tsx` |
| 5 | Cero `<h2>` en todo el sitio; salta de `h1` a `h3` | `components/*.tsx` |
| 6 | Sin teléfono ni dirección visibles (NAP ausente) | `components/Footer.tsx` |
| 7 | JSON-LD sin `telephone`, `geo`, `openingHours`, `sameAs`, `availableService` | `app/layout.tsx:59-80` |
| 8 | Imágenes de procedimientos con `alt=""` | `components/Procedures.tsx:65` |
| 9 | Build de 88 MB: PNG de 2.8 MB y 2.1 MB, dos videos de 19 MB | `du -sh out` |
| 10 | `keywords` en metadata — señal muerta desde 2009 | `app/layout.tsx:25-34` |
| 11 | Navegación con anclas simples (`#procedimientos`) que se rompen en subpáginas | `data/site.ts:177-181` |
| 12 | Posible inconsistencia de sedes: "Consultorio CNA" y "Consultorio Hospital del Valle" podrían ser la misma dirección | `data/site.ts:146-157` |

## Datos del negocio (NAP)

Provistos por el cliente el 2026-08-01, desde el perfil de WhatsApp Business
"Centro Neurológico y Cardiovascular":

- **Dirección:** Hospital del Valle, Condominios 1, Consultorio 402, 4to piso,
  San Pedro Sula, Cortés, Honduras
- **Teléfono / WhatsApp:** +504 9453-2216
- **Horarios:** lunes a viernes, 11:00–17:00. Sábado y domingo cerrado.

El NAP debe ser idéntico en el sitio, en el schema y en la ficha de Google. Una
sola fuente de verdad en el código: `data/seo.ts`.

## Arquitectura de contenido

Una página por intención de búsqueda.

| Ruta | Intención | Keywords objetivo |
|---|---|---|
| `/` | Quién es (local) | cardiólogo San Pedro Sula, cardiólogo Honduras, cardiólogo intervencionista |
| `/hemodinamia` | Informativa | hemodinamia, cateterismo cardíaco, sala de hemodinamia Honduras |
| `/infarto` | Urgencia / síntomas | síntomas de infarto, qué hacer ante un infarto, infarto San Pedro Sula |
| `/angioplastia-coronaria` | Procedimiento | angioplastia, stent coronario, litotricia intravascular |
| `/tavi-valvula-aortica` | Procedimiento | TAVI Honduras, estenosis aórtica severa |
| `/reparacion-mitral-myclip` | Procedimiento | MyClip Honduras, insuficiencia mitral |
| `/marcapasos` | Procedimiento | implante de marcapasos Honduras |
| `/contacto` | Conversión local | consultorio cardiólogo San Pedro Sula |

Cada página de contenido: 600–900 palabras, un solo `<h1>` con la keyword
principal, `<h2>` por subtema, enlaces internos a `/` y a procedimientos
relacionados, y CTA doble (WhatsApp + agenda CloudMed).

En el home se agregan dos bloques nuevos: **FAQ** (8–10 preguntas) y **contacto
con NAP visible**.

### Preguntas del FAQ

Cubren las intenciones informativas que el home no puede atacar solo:

1. ¿Qué es un cardiólogo intervencionista?
2. ¿Qué es la hemodinamia y para qué sirve?
3. ¿Cuáles son los síntomas de un infarto?
4. ¿Qué hago si sospecho un infarto en San Pedro Sula?
5. ¿Qué es un cateterismo cardíaco?
6. ¿Qué es una angioplastia con stent?
7. ¿Qué es el TAVI?
8. ¿Qué es el MyClip y para qué sirve?
9. ¿Cuándo debo consultar a un cardiólogo?
10. ¿Dónde atiende el Dr. Espinoza?

El borrador lo redacto yo; el Dr. Espinoza revisa y aprueba antes de publicar.
Ningún dato clínico se inventa: todo se apoya en el contenido ya validado de
`data/site.ts` y en las publicaciones de PubMed ya listadas.

## Arquitectura técnica

Unidades pequeñas, con una responsabilidad cada una y una interfaz clara.

### Capa de datos

- **`data/seo.ts`** — fuente única del NAP: razón social, teléfono, WhatsApp,
  dirección, coordenadas, horarios, perfiles externos (`sameAs`). Lo consumen el
  schema, el footer, la página de contacto y los CTA. Cambiar un teléfono es
  cambiar una línea.
- **`data/routes.ts`** — registro de rutas: path, title, description, prioridad y
  frecuencia de cambio. Lo consumen `sitemap.ts`, los breadcrumbs y los enlaces
  internos. Garantiza que ninguna página quede fuera del sitemap.
- **`data/faq.ts`** — preguntas y respuestas del home.
- **`data/content/<slug>.ts`** — un archivo por página de contenido, con la
  estructura `{ h1, intro, sections: [{ h2, body[] }], faq[], related[] }`.
  Separar contenido de presentación mantiene los componentes chicos y hace que
  agregar una página sea agregar un archivo de datos.

`data/site.ts` se mantiene como está (doctor, clinics, procedures, publications,
videos, nav), salvo la corrección de las anclas y de las sedes.

### Capa de schema

- **`lib/schema.ts`** — constructores puros, sin JSX ni efectos, uno por tipo:
  `physicianSchema()`, `faqSchema(items)`, `medicalWebPageSchema(page)`,
  `medicalProcedureSchema(proc)`, `breadcrumbSchema(trail)`, `websiteSchema()`.
  Al ser funciones puras se testean sin renderizar nada.
- **`components/JsonLd.tsx`** — componente mínimo que serializa un objeto a
  `<script type="application/ld+json">`. Reemplaza el bloque inline de
  `app/layout.tsx`.

### Capa de presentación

- **`components/content/ContentPage.tsx`** — renderiza una estructura de
  contenido con la jerarquía correcta de encabezados, breadcrumb, CTA y enlaces
  relacionados. Cada `page.tsx` queda en ~15 líneas: importa su contenido,
  exporta `metadata` y renderiza este componente.
- **`components/Faq.tsx`** — sección de preguntas frecuentes del home, usando el
  `SectionHeading` existente para no romper el sistema visual.
- **`components/Contact.tsx`** — bloque de NAP visible con click-to-call,
  enlace `wa.me` y horarios.

### Correcciones en componentes existentes

- Jerarquía de encabezados: un `<h1>` por página; cada sección del home pasa a
  `<h2>`; las tarjetas quedan en `<h3>`. Afecta `Procedures`, `About`,
  `Milestone`, `Videos`, `Publications`, `Appointments`.
- `alt` descriptivos en las imágenes de procedimientos.
- Anclas de navegación: `#procedimientos` → `/#procedimientos` en `data/site.ts`
  y en `Header.tsx`, para que funcionen desde subpáginas.
- Metadata: agregar `alternates.canonical` por ruta, `twitter`, y
  `app/opengraph-image.tsx` (1200×630, generada en build con `ImageResponse`).
  Eliminar `keywords`.

### Aviso médico (E-E-A-T)

Google evalúa contenido médico bajo criterios YMYL más estrictos. Las páginas de
contenido nuevas llevan un aviso breve de que la información es orientativa y no
sustituye una consulta médica, más la firma y credenciales del Dr. Espinoza.

No va en el footer: `tests/site-contract.sh:443` prohíbe explícitamente ese texto
ahí, y esa decisión de diseño se respeta.

## Rendimiento (Core Web Vitals)

La velocidad es factor de ranking y hoy el build pesa 88 MB.

- `noticia-myclip.png` (2.8 MB) y `procedure-pacemaker.png` (2.1 MB) → WebP
- `video-1-poster.png` (685 KB) y `video-2-poster.png` (534 KB) → WebP
- Videos de 19 MB → `preload="none"` y carga al hacer clic
- `output: "export"` desactiva la optimización de imágenes de Next, así que la
  compresión se hace **sobre los archivos fuente** con `scripts/optimize-images.mjs`
  (sharp, ya usado por el contrato de tests). El script es reproducible y el
  contrato verifica los pesos máximos resultantes.

## Infraestructura (nginx)

Dos redirecciones 301 que eliminan el contenido duplicado:

- `www.drmanuelespinoza.com` → `drmanuelespinoza.com`
- `/index.html` → `/`

**Restricción conocida:** según `docs/deployment-vps.md`, la cuenta `deploy` no
tiene sudo y no puede modificar la configuración de nginx. Estos cambios requieren
acceso root al VPS y quedan como tarea de operaciones, documentada en
`docs/seo-nginx.md`.

Si no se pueden aplicar, el `<link rel="canonical">` cubre la mayor parte del
problema por sí solo. No es equivalente, pero es una mitigación aceptable.

## Tareas del cliente (fuera del código)

Documento aparte: `docs/seo-tareas-cliente.md`.

1. **Crear el Perfil de Empresa en Google** para el Dr. Manuel Espinoza en la
   dirección del Consultorio 402. Es la acción de mayor impacto para las
   búsquedas locales. Incluye los datos exactos que deben coincidir con el sitio.
2. **Google Search Console** — verificar el dominio y enviar el sitemap. Sin esto
   no hay forma de medir nada.
3. **Reseñas de pacientes** en la ficha — el factor de mayor peso en el ranking
   local.
4. **Directorios médicos hondureños** con NAP idéntico.

## Orden de implementación

Cuatro fases. Cada una es desplegable por sí sola y deja el sitio mejor que
antes; no hay un "big bang" al final.

**Fase 1 — Fundamentos (sin cambio visual).** Canonical por ruta, jerarquía de
encabezados, `alt` descriptivos, anclas `/#seccion`, eliminación de `keywords`,
Twitter Card y OG image. Cero riesgo visual, beneficio inmediato.

**Fase 2 — NAP y datos estructurados.** `data/seo.ts`, `lib/schema.ts`,
`components/JsonLd.tsx`, schema `Physician` completo, `components/Contact.tsx`
con teléfono, dirección, horarios y WhatsApp. Habilita la ficha de Google.

**Fase 3 — Contenido.** FAQ en el home con `FAQPage` schema, luego las siete
páginas nuevas con `data/routes.ts`, `ContentPage`, breadcrumbs y sitemap
generado. Es la fase más larga y la que necesita aprobación clínica.

**Fase 4 — Rendimiento e infraestructura.** Compresión de imágenes, carga
diferida de video, redirecciones nginx y documentos para el cliente.

Si hay que priorizar, las fases 1 y 2 son las de mejor relación esfuerzo/impacto
y no dependen de que el Dr. apruebe texto nuevo.

## Verificación

- `tests/site-contract.sh` se extiende con aserciones para: un solo `h1` por
  página, presencia de `h2`, canonical en cada ruta, todas las rutas de
  `data/routes.ts` presentes en el sitemap, y pesos máximos de imágenes.
- Script de validación de JSON-LD que parsea el HTML generado en `out/` y
  verifica que cada bloque sea JSON válido con los campos obligatorios.
- Verificación manual del schema en el Rich Results Test de Google tras el deploy.
- Lighthouse sobre la build de producción para confirmar la mejora de LCP.

## Puntos abiertos

Requieren confirmación del cliente antes o durante la implementación. Ninguno
bloquea el inicio del trabajo.

1. **Sedes.** ¿"Consultorio CNA" y "Consultorio Hospital del Valle" son la misma
   dirección (Consultorio 402) o son dos lugares distintos? Si son el mismo, hay
   que unificarlos en `data/site.ts`. Una dirección inconsistente daña el SEO local.
2. **Coordenadas.** 15.53738, -88.01605 son del Hospital del Valle según fuentes
   públicas. Deben verificarse en Google Maps antes de publicarse en el `geo` del
   schema. Si no se confirman, se omite `geo` — un dato incorrecto es peor que
   ninguno.
3. **Teléfono directo.** El +504 9453-2216 es el WhatsApp compartido de la clínica.
   Si existe un número directo del consultorio, conviene usarlo como `telephone`
   principal del schema.
4. **Aprobación clínica.** El Dr. Espinoza debe revisar y aprobar todo el texto
   médico nuevo (FAQ y páginas de contenido) antes de publicar.

## Fuentes

- [Hospital del Valle — Mapcarta](https://mapcarta.com/W125359428)
- [Hospital del Valle — sitio oficial](https://hospitaldelvalle.com/)
