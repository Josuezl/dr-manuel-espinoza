#!/usr/bin/env bash
set -euo pipefail

assert_contains() {
  local file="$1"
  local value="$2"

  if ! rg --fixed-strings --quiet -- "$value" "$file"; then
    printf 'Expected %s to contain: %s\n' "$file" "$value" >&2
    exit 1
  fi
}

assert_matches() {
  local file="$1"
  local pattern="$2"

  if ! rg --multiline --pcre2 --quiet -- "$pattern" "$file"; then
    printf 'Expected %s to match: %s\n' "$file" "$pattern" >&2
    exit 1
  fi
}

assert_not_matches() {
  local file="$1"
  local pattern="$2"
  local status=0

  rg --multiline --pcre2 --quiet -- "$pattern" "$file" || status=$?

  if (( status == 0 )); then
    printf 'Expected %s not to match: %s\n' "$file" "$pattern" >&2
    exit 1
  fi

  if (( status > 1 )); then
    printf 'Unable to inspect %s with pattern: %s\n' "$file" "$pattern" >&2
    exit "$status"
  fi
}

assert_absent() {
  local path="$1"
  local value="$2"
  local status=0

  rg --fixed-strings --quiet -- "$value" "$path" || status=$?

  if (( status == 0 )); then
    printf 'Expected %s not to contain: %s\n' "$path" "$value" >&2
    exit 1
  fi

  if (( status > 1 )); then
    printf 'Unable to inspect %s for: %s\n' "$path" "$value" >&2
    exit "$status"
  fi
}

assert_absent_case_insensitive() {
  local path="$1"
  local value="$2"
  local status=0

  rg --ignore-case --fixed-strings --quiet -- "$value" "$path" || status=$?

  if (( status == 0 )); then
    printf 'Expected %s not to contain, case-insensitively: %s\n' "$path" "$value" >&2
    exit 1
  fi

  if (( status > 1 )); then
    printf 'Unable to inspect %s for: %s\n' "$path" "$value" >&2
    exit "$status"
  fi
}

assert_file() {
  local path="$1"

  if [[ ! -f "$path" ]]; then
    printf 'Expected file to exist: %s\n' "$path" >&2
    exit 1
  fi
}

assert_count() {
  local file="$1"
  local value="$2"
  local expected="$3"
  local count

  count="$({ rg --fixed-strings --only-matching -- "$value" "$file" || true; } | wc -l | tr -d ' ')"

  if [[ "$count" != "$expected" ]]; then
    printf 'Expected %s to contain %s exactly %s times, found %s\n' "$file" "$value" "$expected" "$count" >&2
    exit 1
  fi
}

read_image_metadata() {
  local path="$1"

  node --input-type=module - "$path" <<'NODE'
import sharp from "sharp";

const metadata = await sharp(process.argv[2]).metadata();
printfMetadata(metadata);

function printfMetadata({ width, height, hasAlpha }) {
  process.stdout.write(`${width ?? 0} ${height ?? 0} ${hasAlpha ? "yes" : "no"}\n`);
}
NODE
}

assert_raster_image() {
  local path="$1"
  local width
  local height
  local alpha

  assert_file "$path"
  read -r width height alpha < <(read_image_metadata "$path")

  if [[ -z "$width" || -z "$height" || "$width" -le 0 || "$height" -le 0 ]]; then
    printf 'Expected readable raster image: %s\n' "$path" >&2
    exit 1
  fi
}

assert_image_dimensions() {
  local path="$1"
  local expected_width="$2"
  local expected_height="$3"
  local width
  local height
  local alpha

  assert_raster_image "$path"
  read -r width height alpha < <(read_image_metadata "$path")

  if [[ "$width" != "$expected_width" || "$height" != "$expected_height" ]]; then
    printf 'Expected %s to be %sx%s, found %sx%s\n' \
      "$path" "$expected_width" "$expected_height" "$width" "$height" >&2
    exit 1
  fi
}

assert_unique_files() {
  local expected="$1"
  shift
  local unique

  unique="$(shasum "$@" | awk '{ print $1 }' | sort -u | wc -l | tr -d ' ')"

  if [[ "$unique" != "$expected" ]]; then
    printf 'Expected %s unique files, found %s\n' "$expected" "$unique" >&2
    exit 1
  fi
}

assert_alpha_image() {
  local path="$1"
  local width
  local height
  local alpha

  assert_file "$path"
  read -r width height alpha < <(read_image_metadata "$path")

  if [[ "$alpha" != "yes" ]]; then
    printf 'Expected image with alpha channel: %s\n' "$path" >&2
    exit 1
  fi
}

assert_precedes() {
  local file="$1"
  local first="$2"
  local second="$3"
  local first_line
  local second_line

  first_line="$(rg -n --fixed-strings -- "$first" "$file" | sed -n '1s/:.*//p')"
  second_line="$(rg -n --fixed-strings -- "$second" "$file" | sed -n '1s/:.*//p')"

  if [[ -z "$first_line" || -z "$second_line" || "$first_line" -ge "$second_line" ]]; then
    printf 'Expected "%s" to precede "%s" in %s\n' "$first" "$second" "$file" >&2
    exit 1
  fi
}

# Global visual system.
assert_contains "app/globals.css" "--color-cobalt: #4b62d9;"
assert_contains "app/globals.css" "--color-navy: #09243c;"
assert_contains "app/globals.css" "--font-sans: var(--font-source-sans-3)"
assert_contains "app/globals.css" "--font-display: var(--font-libre-franklin)"
assert_contains "app/globals.css" "--font-mono: var(--font-source-sans-3)"
assert_contains "app/layout.tsx" "Libre_Franklin"
assert_contains "app/layout.tsx" "Source_Sans_3"
assert_contains "app/layout.tsx" 'metadataBase: new URL("https://drmanuelespinoza.com")'
assert_absent "app/layout.tsx" "Sora"
assert_absent "app/layout.tsx" "Unbounded"

# Hero thesis and primary conversion path.
assert_contains "components/Hero.tsx" "useReducedMotion"
assert_contains "components/Hero.tsx" "#4d66d6_62%"
assert_contains "components/Hero.tsx" "href=\"#citas\""
assert_contains "components/Hero.tsx" "/img/dr-manuel-espinoza-cutout.webp"
assert_contains "components/Hero.tsx" "hero-portrait-cutout"
assert_contains "components/Hero.tsx" "object-contain object-bottom"
assert_contains "components/Hero.tsx" "bottom-16"
assert_matches "components/Hero.tsx" 'src="/img/dr-manuel-espinoza-cutout\.webp"\s+alt=.*\n\s+fill\s+preload\s+className='
assert_contains "components/Hero.tsx" "style={reduce ? undefined : { y: portraitY }}"
assert_contains "app/globals.css" ".hero-portrait-cutout {"
assert_contains "app/globals.css" "@media (prefers-reduced-motion: reduce)"
assert_alpha_image "public/img/dr-manuel-espinoza-cutout.webp"
assert_precedes "components/Hero.tsx" "href=\"#citas\"" "hero-portrait-cutout"
assert_absent "components/Hero.tsx" "rounded-[15rem_15rem_2.25rem_2.25rem]"
assert_not_matches "components/Hero.tsx" '(?i)>\s*espinoza\s*<'
assert_absent "app/globals.css" "hero-wordmark"
assert_absent "components/Hero.tsx" "hero-wordmark"
assert_absent_case_insensitive "components/Hero.tsx" "video"
assert_absent "components/Hero.tsx" "focusAreas"
assert_absent "components/Hero.tsx" "videoY"
assert_contains "components/Hero.tsx" "<svg"
assert_contains "components/Hero.tsx" "motion.path"
assert_contains "components/Hero.tsx" "hero-blueprint"
assert_contains "components/Hero.tsx" "hero-circuit"
assert_contains "components/Hero.tsx" "bottom-[-5rem]"
assert_contains "components/Hero.tsx" "md:block"
assert_contains "components/Hero.tsx" "/img/hero-heart-blueprint.png"
assert_contains "components/Hero.tsx" "hero-heart-blueprint"
assert_contains "components/Hero.tsx" "right-[10%] top-[12%]"
assert_contains "components/Hero.tsx" "opacity-[0.24]"
assert_contains "components/Hero.tsx" "lg:block"
assert_contains "components/Hero.tsx" "(min-width: 1024px) 464px, 0px"
assert_contains "components/Hero.tsx" "Cardiólogo intervencionista y especialista en hemodinamia en San Pedro Sula"
assert_absent "components/Hero.tsx" "explicada con claridad"
assert_contains "components/Hero.tsx" "xl:pb-28"
assert_raster_image "public/img/hero-heart-blueprint.png"
assert_alpha_image "public/img/hero-heart-blueprint.png"
assert_absent "components/Hero.tsx" "h-px w-10"
assert_contains "app/globals.css" ".hero-blueprint"
assert_absent "app/globals.css" "body::after"
assert_absent "components/Hero.tsx" "autoPlay"
assert_absent "components/Hero.tsx" "loop"
assert_absent "components/Hero.tsx" "priority"

# Within the header, only the booking CTA remains fixed; navigation scrolls away.
assert_contains "components/Header.tsx" "header-frame"
assert_contains "components/Header.tsx" "header-booking-float"
assert_contains "components/Header.tsx" 'import { doctor, nav } from "@/data/site";'
assert_contains "components/Header.tsx" "{doctor.name}"
assert_contains "components/Header.tsx" "whitespace-nowrap"
assert_contains "components/Header.tsx" "font-display"
assert_absent "components/Header.tsx" "Dr. Espinoza"
assert_contains "components/Header.tsx" "absolute inset-x-0 top-0"
assert_contains "components/Header.tsx" "fixed right-5 top-1/2"
assert_contains "components/Header.tsx" "-translate-y-1/2"
assert_absent "components/Header.tsx" "booking-tab-label"
assert_contains "components/Header.tsx" "hidden"
assert_contains "components/Header.tsx" "xl:inline-flex"
assert_contains "components/Header.tsx" "xl:pr-[12rem]"
assert_absent "components/Header.tsx" "sm:pr-[12rem]"
assert_absent "app/globals.css" "writing-mode: vertical-rl"
assert_count "components/Header.tsx" " fixed " "1"
assert_not_matches "components/Header.tsx" 'className="[^"]*header-booking-float[^"]*button-sweep'
assert_contains "components/Header.tsx" "tracking-[0.08em] text-white transition-colors"
assert_contains "components/Header.tsx" "absolute right-0 hidden"
assert_contains "components/Header.tsx" "fixed right-5 top-1/2"
assert_absent "components/Header.tsx" "booking-tab-label"
assert_absent "components/Header.tsx" "tracking-[0.08em] text-white/90"
assert_absent "components/Header.tsx" "pointer-events-none translate-y-2 opacity-0"
assert_absent "components/Header.tsx" "useEffect"
assert_absent "components/Header.tsx" "scrolled"
assert_absent "components/Header.tsx" "elevated"

# Minimal headings use plain labels, not capsules or decorative dots.
assert_contains "components/SectionHeading.tsx" "section-kicker"
assert_contains "components/SectionHeading.tsx" "text-[clamp(2.25rem,3vw,3rem)]"
assert_contains "components/SectionHeading.tsx" "text-lg leading-8 sm:text-[1.1875rem]"
assert_absent "components/SectionHeading.tsx" "accent"
assert_absent "components/WordsReveal.tsx" "accent"
assert_absent "components" "accent={"
assert_absent "app/globals.css" ".section-kicker::before"
assert_not_matches "app/globals.css" '\.section-kicker\s*\{[^}]*border:'
assert_not_matches "app/globals.css" '\.section-kicker\s*\{[^}]*border-radius:'

# Keep the handoff from education to evidence compact without reducing the
# breathing room within each section.
assert_contains "components/Videos.tsx" "pb-16 pt-24 sm:pb-20 sm:pt-32 lg:pb-16 lg:pt-36"
assert_contains "components/Publications.tsx" "pb-16 pt-16 sm:pb-20 sm:pt-20 lg:pb-20 lg:pt-20"

# The duplicated post-hero navigation is gone; the remaining clinical ticker
# moves gently and pauses whenever the visitor interacts with it.
assert_absent "components/ClinicalTicker.tsx" "ArrowDownRight"
assert_absent "components/ClinicalTicker.tsx" "const navigation"
assert_absent "components/ClinicalTicker.tsx" "<nav"
assert_absent "components/ClinicalTicker.tsx" "Accesos destacados"
assert_contains "components/ClinicalTicker.tsx" "clinical-ticker-mask"
assert_contains "components/ClinicalTicker.tsx" "clinical-ticker-track"
assert_contains "components/ClinicalTicker.tsx" 'aria-hidden="true"'
assert_contains "components/ClinicalTicker.tsx" "overflow-hidden py-4"
assert_absent "components/ClinicalTicker.tsx" "Pause"
assert_absent "components/ClinicalTicker.tsx" "Play"
assert_absent "components/ClinicalTicker.tsx" "aria-pressed"
assert_absent "components/ClinicalTicker.tsx" "useState"
assert_contains "app/globals.css" "@keyframes clinical-ticker"
assert_contains "app/globals.css" ".clinical-ticker-mask:hover .clinical-ticker-track"
assert_contains "app/globals.css" "animation-play-state: paused"
assert_contains "app/globals.css" "animation: clinical-ticker 52s linear infinite;"

# Every procedure receives its own optimized clinical background.
assert_contains "components/Procedures.tsx" "import Image from \"next/image\""
assert_contains "components/Procedures.tsx" "procedure.image"
assert_contains "components/Procedures.tsx" "procedure.imagePosition"
assert_contains "components/Procedures.tsx" 'procedure.imageFit === "contain"'
assert_contains "components/Procedures.tsx" "procedure-card-image"
# Las imagenes de procedimientos son de contenido, no decorativas: el alt vive
# junto al resto del contenido clinico en data/site.ts, y la imagen ya no se
# oculta de la accesibilidad con aria-hidden.
assert_contains "data/site.ts" "alt:"
assert_count "data/site.ts" "alt:" "7"
assert_contains "components/Procedures.tsx" "alt={procedure.alt}"
assert_not_matches "components/Procedures.tsx" '<Image[^>]*aria-hidden'
assert_count "data/site.ts" 'image: "/img/procedure-' "7"
assert_count "data/site.ts" 'imagePosition:' "7"
assert_count "data/site.ts" "imageFit:" "7"
assert_matches "data/site.ts" 'image: "/img/procedure-tavi\.webp",\s+imagePosition: "[^"]+",\s+imageFit: "contain"'
assert_matches "data/site.ts" 'image: "/img/procedure-ivus\.webp",\s+imagePosition: "[^"]+",\s+imageFit: "contain"'
assert_count "data/site.ts" 'image: "/img/procedure-myclip.webp"' "1"
assert_count "data/site.ts" 'image: "/img/procedure-tavi.webp"' "1"
assert_count "data/site.ts" 'image: "/img/procedure-angioplasty.webp"' "1"
assert_count "data/site.ts" 'image: "/img/procedure-ivus.webp"' "1"
assert_count "data/site.ts" 'image: "/img/procedure-paravalvular.webp"' "1"
assert_count "data/site.ts" 'image: "/img/procedure-pulmonary-embolism.webp"' "1"
assert_count "data/site.ts" 'image: "/img/procedure-pacemaker.png"' "1"
assert_contains "components/Procedures.tsx" "overflow-x-auto"
assert_contains "components/Procedures.tsx" "AutoScrollRail"
assert_contains "components/Procedures.tsx" "auto-scroll-procedures"
assert_absent "components/Procedures.tsx" "snap-x snap-mandatory"
assert_absent "components/Procedures.tsx" "Área {number}"
assert_absent "components/Procedures.tsx" "{number} /"
assert_absent "components/Procedures.tsx" "font-display text-[6.5rem]"
assert_file "components/AutoScrollRail.tsx"
assert_contains "components/AutoScrollRail.tsx" "requestAnimationFrame"
assert_contains "components/AutoScrollRail.tsx" "prefers-reduced-motion: reduce"
assert_contains "components/AutoScrollRail.tsx" "delta * 0.03"
assert_contains "components/AutoScrollRail.tsx" "onFocusCapture"
assert_contains "components/AutoScrollRail.tsx" "const [focused"
assert_contains "components/AutoScrollRail.tsx" "const [dragging"
assert_contains "components/AutoScrollRail.tsx" "const [settling"
assert_absent "components/AutoScrollRail.tsx" "const [interacting"
assert_absent "components/AutoScrollRail.tsx" "const [hovered"
assert_absent "components/AutoScrollRail.tsx" "const [paused"
assert_absent "components/AutoScrollRail.tsx" "onPointerEnter"
assert_contains "components/AutoScrollRail.tsx" "setPointerCapture"
assert_contains "components/AutoScrollRail.tsx" "onLostPointerCapture"
assert_contains "components/AutoScrollRail.tsx" "delta * 0.03"
assert_absent "components/AutoScrollRail.tsx" "aria-pressed"
assert_absent "components/AutoScrollRail.tsx" "<button"
assert_absent "components/AutoScrollRail.tsx" "mt-2 flex justify-end"
assert_contains "components/AutoScrollRail.tsx" "snap-x snap-proximity"
assert_contains "components/AutoScrollRail.tsx" "snap-none"
assert_absent "components/Procedures.tsx" "ArrowRight"
assert_absent "components/Procedures.tsx" "nextIndex"
assert_contains "components/Procedures.tsx" "sm:w-[58%]"
assert_contains "components/Procedures.tsx" "lg:w-[31.8%]"
assert_absent "components/Procedures.tsx" "Explore las seis áreas"
assert_absent "components/Procedures.tsx" "usando el índice"
assert_absent "components/Procedures.tsx" 'aria-label="Índice de procedimientos"'
assert_absent "components/Procedures.tsx" "Deslice horizontalmente para explorar"
assert_raster_image "public/img/procedure-myclip.webp"
assert_raster_image "public/img/procedure-tavi.webp"
assert_image_dimensions "public/img/procedure-tavi.webp" "1200" "720"
assert_raster_image "public/img/procedure-angioplasty.webp"
assert_raster_image "public/img/procedure-ivus.webp"
assert_raster_image "public/img/procedure-paravalvular.webp"
assert_raster_image "public/img/procedure-pulmonary-embolism.webp"
assert_raster_image "public/img/procedure-pacemaker.png"
assert_unique_files "7" \
  "public/img/procedure-myclip.webp" \
  "public/img/procedure-tavi.webp" \
  "public/img/procedure-angioplasty.webp" \
  "public/img/procedure-ivus.webp" \
  "public/img/procedure-paravalvular.webp" \
  "public/img/procedure-pulmonary-embolism.webp" \
  "public/img/procedure-pacemaker.png"

# Secondary portrait, videos, and editorial cards stay clean and uniform.
assert_contains "components/About.tsx" 'src="/img/dr-manuel-espinoza-cutout.webp"'
assert_absent "components/About.tsx" "doctor.photo"
assert_absent "components/About.tsx" "rounded-[999px"
assert_absent "components/About.tsx" "Hito nacional"
assert_contains "components/About.tsx" "auto-rows-fr"
assert_contains "components/About.tsx" "grid items-start"
assert_absent "components/About.tsx" "grid items-center"
assert_contains "components/About.tsx" "lg:grid-cols"
assert_contains "components/About.tsx" "Atiendo en dos sedes de San Pedro Sula: Centro de Neumología y Alergias (CNA) y Hospital del Valle, con agenda en línea."
assert_absent "components/About.tsx" "Hospital del Valle —"
assert_absent "components/About.tsx" "Parallax"
assert_contains "components/About.tsx" "translate-x-[5%]"
assert_contains "components/Videos.tsx" "lg:grid-cols-2"
assert_contains "components/Videos.tsx" "auto-rows-fr"
assert_contains "components/Videos.tsx" "object-contain"
assert_contains "components/Videos.tsx" "aspect-[9/16]"
assert_contains "components/Videos.tsx" "max-w-[25rem]"
assert_contains "components/Videos.tsx" "poster={video.poster}"
assert_contains "components/Videos.tsx" "video-poster-overlay"
assert_contains "components/Videos.tsx" "rounded-[2rem] border border-line bg-white p-3"
assert_contains "components/Videos.tsx" "rounded-[1.5rem] border border-white/10"
assert_contains "components/Videos.tsx" "text-lg leading-7 text-cloud"
assert_contains "components/Videos.tsx" "flex items-center justify-end p-5"
assert_contains "components/Videos.tsx" "flex flex-1 flex-col px-2 pb-2 text-left"
assert_absent "components/Videos.tsx" "video.label"
assert_absent "data/site.ts" "label: \"Video 0"
assert_count "data/site.ts" 'poster: "/img/video-' "2"
assert_raster_image "public/img/video-1-poster.png"
assert_raster_image "public/img/video-2-poster.png"
assert_absent "components/Videos.tsx" "lg:mt-24"
assert_absent "components/Videos.tsx" "1.15fr"
assert_absent "components/Reveal.tsx" "if (reduce)"
assert_contains "components/Reveal.tsx" "initial={reduce ? false"
assert_absent "components/Procedures.tsx" "max-w-xs border-l"
assert_absent "components/Milestone.tsx" "border-l border-white/25 pl-6"
assert_absent "components/Milestone.tsx" "h-px w-10 bg-cobalt"
assert_absent "components/Procedures.tsx" "-right-36 top-28"
assert_absent "components/Milestone.tsx" "-right-40 -top-52"
assert_absent "components/Publications.tsx" "caseLayouts"
assert_absent "components/Publications.tsx" "featured"
assert_contains "components/Publications.tsx" 'className="mt-14 space-y-4"'
assert_contains "components/Publications.tsx" "publication-row"
assert_contains "components/Publications.tsx" "border border-line bg-white"
assert_absent "components/Publications.tsx" "bg-ink"
assert_absent "components/Publications.tsx" "hover:bg-navy"
assert_contains "components/Publications.tsx" "min-[900px]:grid-cols-[9rem_minmax(0,1fr)_8.5rem]"
assert_contains "components/Publications.tsx" "hover:translate-x-1"
assert_contains "components/Publications.tsx" "group-hover:scale-y-100"
assert_absent "components/Publications.tsx" "min-h-[25rem]"
assert_absent "components/Publications.tsx" "md:grid-cols-2"
assert_absent "components/Publications.tsx" "auto-rows-fr"
assert_absent "components/Publications.tsx" "md:col-span-2"
assert_contains "components/Publications.tsx" "publications.map"
assert_contains "components/Publications.tsx" 'href={`https://pubmed.ncbi.nlm.nih.gov/${pub.pmid}/`}'
assert_contains "components/Publications.tsx" 'target="_blank"'
assert_contains "components/Publications.tsx" 'rel="noopener noreferrer"'
assert_contains "components/Publications.tsx" 'aria-label={`${pub.title}. Abrir publicación en PubMed`}'
assert_contains "components/Footer.tsx" "lg:grid-cols-2"
assert_absent "components/Footer.tsx" "Este sitio no sustituye una consulta médica"

# Full-page narrative.
assert_absent "app/page.tsx" "CarePath"
assert_absent "app/page.tsx" "ScrollEcg"
assert_contains "components/Procedures.tsx" "id=\"procedimientos\""
assert_contains "components/Videos.tsx" "id=\"videos\""
assert_contains "components/Milestone.tsx" "id=\"noticias\""
assert_contains "components/About.tsx" "id=\"sobre-mi\""
assert_contains "components/Publications.tsx" "id=\"publicaciones\""
assert_contains "components/Appointments.tsx" "id=\"citas\""
assert_contains "components/Footer.tsx" "{doctor.name}"
assert_absent "components/Footer.tsx" "doctor.shortName"
assert_count "components/Footer.tsx" "doctor." "1"
assert_absent "components/Footer.tsx" "milestone."
assert_absent "components/Footer.tsx" "doctor.title"
assert_absent "components/Footer.tsx" "doctor.city"
assert_absent "app/globals.css" ".footer-wordmark"

# Existing factual and booking contracts remain intact.
assert_contains "data/site.ts" "El primer MyClip de Honduras"
# NAP: site.ts ya no tiene nombre/URL de sede propios -- los deriva de
# seo.ts, para que Appointments y Footer nunca puedan mostrar un nombre
# distinto al de Contact y al JSON-LD (la inconsistencia que este cambio
# corrige: site.ts decia "Consultorio CNA", seo.ts decia el nombre real).
assert_contains "data/site.ts" 'import { sedes } from "./seo";'
assert_contains "data/site.ts" "sedes.map"
assert_absent "data/site.ts" "Consultorio CNA"
assert_contains "data/seo.ts" "https://app.cloudmedhn.com/agendar/VI1zxrktkCY51u8qw2Vsk-KK"
assert_contains "data/seo.ts" "https://app.cloudmedhn.com/agendar/IDyZjY4Py5oOzxmRbRTA8guF"
assert_contains "components/Appointments.tsx" "clinics.map"
assert_contains "components/Appointments.tsx" "href={clinic.bookingUrl}"
assert_contains "components/Appointments.tsx" "target=\"_blank\""
assert_contains "components/Appointments.tsx" "rel=\"noopener noreferrer\""
assert_absent "components/Appointments.tsx" "Chapter"
assert_contains "components/Appointments.tsx" 'text="Agenda tu cita en minutos."'
assert_contains "components/Appointments.tsx" "text-[clamp(2.25rem,3vw,3rem)]"
assert_contains "components/Appointments.tsx" "Elige tu sede y reserva en línea: seleccionas fecha y hora, y"
assert_contains "components/Appointments.tsx" "recibes tu confirmación al instante."
assert_contains "components/Appointments.tsx" "linear-gradient(108deg,#4b62d9_0%,#4d66d6_62%,#263181_100%)"
assert_absent "components/Appointments.tsx" "linear-gradient(135deg,#09243c_0%,#020c27_100%)"
assert_contains "components/Appointments.tsx" "hero-blueprint"
assert_contains "components/Appointments.tsx" "text-white"
assert_contains "components/Appointments.tsx" "Agenda en línea segura · confirmación inmediata"
assert_contains "components/Milestone.tsx" "bg-[linear-gradient(108deg,#4b62d9_0%,#4d66d6_62%,#263181_100%)]"
assert_absent "components/Footer.tsx" "bg-[linear-gradient(108deg,#4b62d9_0%,#4d66d6_62%,#263181_100%)]"
assert_contains "components/Footer.tsx" "border-t border-line"
assert_contains "components/Publications.tsx" "Producción científica"
assert_contains "components/Publications.tsx" "Publicaciones científicas"
assert_contains "components/Footer.tsx" "Todos los derechos reservados"
assert_contains "components/Footer.tsx" "Desarrollado por Ing. Josue Zuniga (33900742)"
assert_contains "app/layout.tsx" "lang=\"es\""

# The reference is inspiration, never copied branding.
assert_absent "app" "MediNexa"
assert_absent "components" "MediNexa"

# SEO: canonical declarado y señales muertas eliminadas.
assert_contains "app/layout.tsx" 'canonical: "/"'
assert_absent "app/layout.tsx" "keywords:"

# SEO: imagen OpenGraph dedicada con proporcion 1.91:1 (1200x630), en vez del
# retrato 4:5 de doctor.photo que las redes recortaban mal.
assert_file "app/opengraph-image.tsx"
assert_contains "app/opengraph-image.tsx" "width: 1200"
assert_contains "app/opengraph-image.tsx" "height: 630"
assert_absent "app/layout.tsx" "doctor.photo"

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

# NAP: fuente unica, con los datos reales de las dos sedes.
assert_file "data/seo.ts"
assert_contains "data/seo.ts" "Residencial Altavista, Calle 24"
assert_contains "data/seo.ts" "Hospital del Valle, Condominios 1, Consultorio 402, 4to piso"
assert_contains "data/seo.ts" "+50425663004"
assert_contains "data/seo.ts" "+50497745013"
assert_contains "data/seo.ts" "Medicina Interna"
assert_contains "data/seo.ts" "Cardiología Intervencionista"

# NAP: el 50494532216 aparece dos veces (tel del telefono de WhatsApp y el
# campo whatsapp); fijar el conteo evita que cualquiera de las dos ocurrencias
# desaparezca sin que el contrato lo note.
assert_count "data/seo.ts" "50494532216" "2"

# NAP: strings "display" legibles por el paciente (lo que lee y marca), no
# solo las formas compactas "tel:" que solo respaldan el href.
assert_contains "data/seo.ts" "+504 2566-3004"
assert_contains "data/seo.ts" "+504 9774-5013"
assert_contains "data/seo.ts" "+504 9453-2216"

# NAP: horario y correo de contacto tambien son datos reales que un cambio
# accidental podria alterar sin que el contrato lo note.
assert_contains "data/seo.ts" "11:00"
assert_contains "data/seo.ts" "17:00"
assert_contains "data/seo.ts" 'days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]'
assert_contains "data/seo.ts" "ccardiologicosps@gmail.com"

# NAP: CNA no tiene horario publicado (el cliente no lo ha confirmado), asi
# que el campo "hours" debe estar deliberadamente ausente en su objeto. Un
# assert_absent "hours" a secas seria incorrecto porque hospital-del-valle si
# tiene "hours" legitimamente. En vez de acotar la busqueda usando el id de
# la OTRA sede (que se rompe si el orden de las sedes cambia algun dia), se
# acota con el propio bookingUrl de CNA -- un valor que vive dentro del mismo
# objeto sin importar en que posicion del arreglo quede.
assert_not_matches "data/seo.ts" 'id: "cna"[\s\S]*?hours:[\s\S]*?https://app\.cloudmedhn\.com/agendar/VI1zxrktkCY51u8qw2Vsk-KK'

# NAP: ninguna sede tiene coordenadas "geo" (no estan verificadas contra
# Google Maps; una coordenada equivocada manda a un paciente al lugar
# incorrecto). Se busca el literal "geo:" -- con dos puntos, como se escriben
# el resto de los campos reales (hours:, email:, whatsapp:) -- en vez del
# string suelto "geo", para no depender de que ninguna otra palabra futura en
# el archivo contenga esas cuatro letras por coincidencia.
assert_absent "data/seo.ts" "geo:"

# El JSON-LD sale de constructores testeados, no de un objeto inline.
assert_file "components/JsonLd.tsx"
assert_contains "app/layout.tsx" "physicianSchema"
assert_absent "app/layout.tsx" '"@type": ["Physician", "MedicalBusiness"]'

# NAP: el dato tiene que ser texto visible en la pagina, no solo JSON-LD --
# Google contrasta ambos, y el paciente necesita algo que pueda tocar para
# llamar. Contact no tiene datos propios: los consume de la misma fuente
# (sedes) que ya usa el JSON-LD, para que nunca puedan divergir.
assert_file "components/Contact.tsx"
assert_contains "components/Contact.tsx" 'id="contacto"'
assert_contains "components/Contact.tsx" "sedes.map"
assert_contains "components/Contact.tsx" 'href={`tel:${'
assert_contains "components/Contact.tsx" "https://wa.me/"
assert_contains "app/page.tsx" "<Contact />"
assert_precedes "app/page.tsx" "<Appointments />" "<Contact />"

printf 'Site redesign contract passed.\n'
