import sharp from "sharp";
import { statSync } from "node:fs";

// Con output: "export" Next no optimiza imagenes (images.unoptimized: true):
// el navegador descarga el archivo fuente tal cual. Este script comprime de
// una vez las cuatro imagenes mas pesadas de public/img a WebP.
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
