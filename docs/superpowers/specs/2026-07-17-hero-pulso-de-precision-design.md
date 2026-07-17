# Hero "Pulso de precisión" — Diseño

**Estado:** aprobado para especificación; pendiente de revisión final antes de planificar e implementar.

## Objetivo

Transformar el hero de la página principal del Dr. Manuel Espinoza en una apertura memorable, clínica y confiable. El resultado debe comunicar cardiología intervencionista de alta precisión y destacar de inmediato el primer procedimiento MyClip de Honduras, sin recurrir a una estética tecnológica genérica ni ocultar el lado humano del médico.

## Alcance

- Rediseñar `components/Hero.tsx`.
- Integrar el estado visual de `components/Header.tsx` con el hero: transparente sobre la apertura y claro al desplazarse o abrir el menú móvil.
- Añadir únicamente estilos de animación compartidos y acotados en `app/globals.css` si Tailwind y Framer Motion no bastan.
- Conservar los anclajes `#inicio`, `#citas` y `#noticias`, el contenido de `data/site.ts`, la exportación estática y las modificaciones locales ajenas a este trabajo.

No se añadirán fotografías clínicas nuevas: el hero solo utilizará el retrato local ya optimizado para esta página.

## Tesis visual

**Pulso de precisión.** El hero será una sala de diagnóstico convertida en escena editorial: fondo azul noche, una apertura ovalada que enfoca el retrato del doctor y un trazo de ECG que funciona como única firma cinética. El gesto humano del retrato permanece nítido; la autoridad se concreta con un hecho verificable, no con decoraciones genéricas.

### Paleta específica del hero

| Token | Valor | Uso |
| --- | --- | --- |
| Azul profundo | `#061B2B` | Base y transición hacia la página clara |
| Azul clínico | `#0C3F61` | Profundidad radial y superficies translúcidas |
| Cyan de imagen | `#8FE3F0` | Trazo ECG, halos y foco visual |
| Rojo pulso | `#E8433A` | Hito MyClip y detalles de énfasis |
| Blanco de sala | `#F7FCFE` | Titular, acciones y contraste |

La tipografía existente se conserva: Bricolage Grotesque para el titular, Figtree para texto de apoyo e IBM Plex Mono para credenciales y datos clínicos. No se cargarán fuentes nuevas.

## Composición

### Escritorio

```text
┌──────────────────────────────────────────────────────────────────┐
│ navegación transparente · marca · capítulos · agendar            │
│                                                                    │
│  [card de hito MyClip]                   ╭───────────────╮        │
│  Intervenciones que                         retrato        │        │
│  hacen posible lo complejo.              / apertura de      \     │
│  ciencia + vocación                       \ angiografía     /     │
│                                              ╰───────────────╯     │
│  especialidad · ciudad · CTA principal / enlace secundario        │
│                                                                    │
│ ─────────────── trazo ECG / escaneo ──────────────────────────── │
└──────────────────────────────────────────────────────────────────┘
```

- El titular se muestra completo desde el primer render: **“Intervenciones de alta complejidad guiadas por la ciencia, impulsadas por la vocación.”** Sustituye el ciclo de escritura y borrado por una revelación de entrada de una sola vez; no habrá contenido que desaparezca después.
- Un eyebrow factual de bajo contraste sitúa la especialidad y una tarjeta/badge compacto en rojo presenta: **“Primer MyClip de Honduras”**.
- En escritorio, el retrato se muestra nítido dentro de una apertura ovalada (`border-radius: 50%`) a la derecha, con un único anillo orbital desplazado, luz clínica y capas de degradado para integrarlo sin teñir excesivamente su piel o bata. En móvil, esa apertura se convierte en un marco redondeado de proporción 4:3.
- La llamada principal sigue llevando a `#citas`; la secundaria conserva `#noticias`. Se diferencian en peso visual para no competir con el titular.
- Un trazo ECG horizontal conecta el hero con el recorrido editorial de la página. Se dibuja una sola vez durante la entrada y queda como detalle de composición, no como una animación perpetua.

### Móvil y tablet

- La jerarquía queda: hito → titular → credenciales → CTA → retrato.
- El retrato se convierte en el marco redondeado 4:3 situado después del mensaje, para impedir que robe espacio legible al CTA.
- La tarjeta de hito conserva contraste y ocupa solo el ancho del contenido.
- El trazo ECG se simplifica a un segmento inferior, sin forzar desbordamiento ni depender de `mask-image`.

### Contenido visible

- Eyebrow: **“Cardiología intervencionista · San Pedro Sula, Honduras”**.
- Hito: **“Primer MyClip de Honduras”**.
- Credenciales: nombre completo del doctor y su ciudad, desde `doctor`.
- Acciones: **“Agendar cita”** hacia `#citas` y **“Conocer el hito”** hacia `#noticias`.

El contenido conserva los hechos que ya existen en el sitio. No se añaden promesas clínicas, porcentajes ni acreditaciones nuevas.

## Componentes y datos

| Elemento | Responsabilidad | Fuente |
| --- | --- | --- |
| `Hero` | Jerarquía, retrato, CTA, hito y movimiento de una entrada | `doctor` de `data/site.ts` |
| `Header` | Mostrar estado integrado/transparente al inicio; pasar a estado claro desde 24 px de scroll o al abrir el menú | `scrollY` y estado móvil local |
| `globals.css` | Solo keyframes reutilizables para la línea ECG, con fallback de movimiento reducido | CSS global existente |

`Typewriter` dejará de ser una dependencia del hero. El componente no se eliminará en esta tarea porque puede tener otro uso futuro y eliminarlo sería una refactorización no relacionada.

## Movimiento, accesibilidad y fallbacks

- Usar `useReducedMotion` para omitir desplazamiento del retrato, revelaciones y trazo animado; el contenido queda visible y estable de inmediato.
- Los controles siguen siendo enlaces semánticos, con foco visible sobre fondos oscuros y contraste AA como mínimo.
- Si el navegador no admite máscaras CSS, el retrato se verá dentro de un contenedor redondeado con degradado, sin perder contenido ni legibilidad.
- El `next/image` del retrato seguirá usando `priority`, `sizes` explícito y texto alternativo vacío al ser decorativo; la identidad del médico ya está expresada en texto visible.

## Rendimiento y riesgos

- No usar vídeo en el hero: los vídeos locales son demasiado pesados para la primera vista.
- No introducir la fotografía del procedimiento ni las ilustraciones médicas secundarias sin confirmar derechos y consentimiento clínico.
- No cargar más tipografías ni dependencias.
- Mantener el hero como Client Component porque ya requiere Framer Motion y hooks de scroll; página y layout permanecen Server Components.

## Validación

El repositorio no dispone de un runner de pruebas visuales ni de un navegador ejecutable en el entorno actual. Para esta modificación puramente visual, la aceptación se comprobará mediante:

1. `npm run lint` y `npm run build` en un entorno con Node.js disponible.
2. Revisión manual de `section#inicio` a 390×844, 640×900 y 1024×900, tanto con movimiento normal como con `prefers-reduced-motion: reduce`.
3. Confirmar el funcionamiento de los anclajes de cita y noticias, la apertura/cierre del menú móvil y la transición del header al desplazarse.

Si se incorpora posteriormente Playwright, estas tres vistas serán la base de snapshots de regresión.

## Criterios de aceptación

- El titular completo es visible y no entra en un ciclo de borrado.
- El hero tiene una firma inequívoca de cardiología intervencionista: apertura de angiografía + trazo ECG + hito MyClip.
- El retrato, hito, CTA y titular mantienen una jerarquía clara en móvil, tablet y escritorio.
- El header no corta visualmente la apertura y conserva navegación usable en los dos estados.
- No se cargan activos pesados ni material clínico de derechos inciertos.
- El diseño respeta movimiento reducido, foco visible y contraste legible.
