# Nginx: rutas planas, redirecciones y content-type de la imagen OG

Este documento es para quien tenga **acceso root al VPS**. Todo lo de aquí
modifica `/etc/nginx/`, y según `docs/deployment-vps.md` la cuenta `deploy`
(la que usa el pipeline de GitHub Actions) no tiene sudo y no puede tocar
Nginx. Nada de este documento se ejecuta como parte del plan de SEO — se
documenta para que lo aplique quien tenga los permisos.

**Contexto de secuencia.** `docs/deployment-vps.md` marca el DNS, Certbot,
la redirección HTTPS y el apagado de Vercel como un *cutover* pendiente,
sujeto a aprobación explícita y separado del despliegue HTTP ya validado. Los
bloques con `listen 443 ssl` de este documento (sección 2) **asumen que ese
cutover ya ocurrió** y que Certbot ya emitió certificado para el VPS. Si
todavía no pasó, aplicar primero esa migración — estos cambios son sobre el
Nginx del VPS, no sobre el hosting que sirve el dominio hoy.

Los tres cambios de abajo tienen prioridad distinta:

| # | Cambio | Prioridad |
|---|---|---|
| 1 | `try_files` para rutas planas | **CRÍTICA** — sin esto el sitio nuevo está roto |
| 2 | Redirecciones `www` → apex e `/index.html` → `/` | Mejora (SEO: consolida señales de ranking) |
| 3 | `default_type` de `/opengraph-image` | Mejora (vista previa al compartir) |

---

## 1. `try_files`: sin esto, las 7 páginas nuevas dan 404 (CRÍTICA)

### El problema

Next 16 con `output: "export"` y **sin** `trailingSlash` emite archivos
**planos**. Verificado contra el build real (`out/`):

```text
out/hemodinamia.html   ← el HTML real de la página
out/hemodinamia/       ← existe, pero solo tiene payloads .txt de RSC
                          (navegación client-side), NINGÚN index.html
```

Nginx sirviendo `out/` como raíz estática, con la regla por defecto
(`try_files $uri $uri/ =404;` o ninguna regla), busca en este orden para
`/hemodinamia`:

1. un archivo llamado `hemodinamia` — no existe
2. `hemodinamia/index.html` — no existe (esa carpeta solo tiene los `.txt`)

Ninguno de los dos existe, así que responde **404**. Esto afecta a las 7
páginas de contenido nuevas (`/hemodinamia`, `/infarto`,
`/angioplastia-coronaria`, `/tavi-valvula-aortica`,
`/reparacion-mitral-myclip`, `/marcapasos`, `/contacto`) aunque el build esté
perfecto — el problema es de Nginx, no del código.

> Nota: el bloque original de Nginx de la migración del VPS
> (`docs/superpowers/plans/2026-07-19-dr-manuel-espinoza-vps-migration.md`,
> Task 4) ya proponía esta misma regla dentro de `location /`. Puede que ya
> esté aplicada. No lo asumas — confirmalo con la verificación de la sección
> 1.3 antes de decidir si hace falta editar algo.

### 1.1 La regla

Dentro del bloque `server` que sirve el sitio (`root
/srv/www/dr-manuel-espinoza/current;`), el `location /` tiene que ser
exactamente:

```nginx
location / {
    try_files $uri $uri.html $uri/ =404;
}
```

La pieza que importa es **`$uri.html`**: es la que hace que `/hemodinamia`
resuelva contra el archivo real, `hemodinamia.html`. Sin ella, Nginx nunca
llega a mirar ese archivo. `$uri/` queda como respaldo por si algún día
existiera una carpeta con `index.html` real (hoy no la hay), y `=404` cierra
la cadena para que una ruta inexistente no caiga en un comportamiento
indefinido.

### 1.2 Por qué NO se resuelve con `trailingSlash: true`

La alternativa que evitaría tocar Nginx sería poner `trailingSlash: true` en
`next.config.ts`: Next generaría `hemodinamia/index.html` en vez de
`hemodinamia.html`, y el `$uri/` por defecto ya lo encontraría.

**No hacer esto.** `trailingSlash: true` cambia las URLs del sitio a
`/hemodinamia/` (con barra final). Pero el `canonical` de cada página
(`lib/metadata.ts`, `alternates: { canonical: route.path }`) y el
`sitemap.xml` (`app/sitemap.ts`, generado desde `data/routes.ts`) ya
declaran la versión **sin** barra final para las 8 rutas. Cambiar
`trailingSlash` significaría reescribir todas las URLs canónicas del sitio,
el sitemap y el `BreadcrumbList` de cada página — para evitar tres líneas de
configuración de Nginx. Es la solución equivocada aunque sea la más fácil de
escribir.

### 1.3 Verificación: las 8 rutas tienen que dar 200

Esta es **la verificación que hay que correr antes de dar por bueno el
despliegue** — con o sin cambios, es la prueba de que el sitio nuevo
funciona en producción:

```bash
for path in / /hemodinamia /infarto /angioplastia-coronaria \
            /tavi-valvula-aortica /reparacion-mitral-myclip \
            /marcapasos /contacto; do
  printf '%-28s %s\n' "$path" \
    "$(curl -s -o /dev/null -w '%{http_code}' "https://drmanuelespinoza.com$path")"
done
```

Esperado — las 8 líneas en `200`:

```text
/                            200
/hemodinamia                 200
/infarto                     200
/angioplastia-coronaria      200
/tavi-valvula-aortica        200
/reparacion-mitral-myclip    200
/marcapasos                  200
/contacto                    200
```

Si alguna ruta distinta de `/` da `404`, falta la regla de la sección 1.1.

---

## 2. Redirecciones de `www` e `/index.html` (mejora)

### El problema, reproducible

```bash
curl -s -o /dev/null -w "%{http_code}\n" https://www.drmanuelespinoza.com          # hoy: 200
curl -s -o /dev/null -w "%{http_code}\n" https://drmanuelespinoza.com/index.html   # hoy: 200
```

Ambas deberían devolver 301. Hoy sirven una copia completa del sitio, y
Google reparte las señales de ranking entre tres URLs distintas
(`drmanuelespinoza.com`, `www.drmanuelespinoza.com`,
`drmanuelespinoza.com/index.html`) en vez de concentrarlas en una sola, el
dominio canónico sin `www`.

### 2.1 Requisito previo: el certificado debe cubrir `www`

Si el certificado TLS solo cubre el apex, el navegador rechaza la conexión a
`www` por error de certificado **antes** de llegar al redirect. Comprobar
primero:

```bash
echo | openssl s_client -connect drmanuelespinoza.com:443 -servername www.drmanuelespinoza.com 2>/dev/null \
  | openssl x509 -noout -text | grep -A1 "Subject Alternative Name"
```

Si falta `www` en el resultado, ampliar el certificado antes de continuar:

```bash
sudo certbot --expand -d drmanuelespinoza.com -d www.drmanuelespinoza.com
```

### 2.2 Bloque de redirección de `www`

Servidor propio, separado del que sirve el sitio:

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

### 2.3 Regla para `/index.html`

Dentro del bloque que sirve el sitio:

```nginx
location = /index.html {
    return 301 https://drmanuelespinoza.com/;
}
```

---

## 3. `Content-Type` de la imagen OpenGraph (mejora)

`app/opengraph-image.tsx` emite `out/opengraph-image` **sin extensión** (es
un PNG de 1200×630, verificado con `file out/opengraph-image`). Nginx
resuelve el tipo MIME por extensión de archivo; sin extensión, cae en
`default_type`, que normalmente es `application/octet-stream`. Los
crawlers de WhatsApp y Facebook descartan una `og:image` que no llega como
`image/*` — justo el caso que motivó tener una imagen OG dedicada.

```nginx
location = /opengraph-image {
    default_type image/png;
}
```

Verificación:

```bash
curl -sI https://drmanuelespinoza.com/opengraph-image | grep -i content-type
```

Esperado: `Content-Type: image/png`. Si devuelve `application/octet-stream`,
la vista previa al compartir por WhatsApp no muestra imagen.

---

## Procedimiento seguro para aplicar los tres cambios

Aplicar los tres juntos en la misma ventana de mantenimiento, en este orden
exacto:

```bash
# 1. Respaldar con fecha
sudo cp -a /etc/nginx/sites-available/drmanuelespinoza.com \
           /etc/nginx/sites-available/drmanuelespinoza.com.bak.$(date +%Y%m%d-%H%M%S)

# 2. Aplicar los cambios de las secciones 1.1, 2.2, 2.3 y 3 de arriba

# 3. Validar la sintaxis. Si esto falla, NO recargar.
sudo nginx -t

# 4. Recargar solo si el paso 3 pasó
sudo systemctl reload nginx

# 5. Verificar — las 8 rutas de la sección 1.3, más:
curl -s -o /dev/null -w "www:        %{http_code} -> %{redirect_url}\n" https://www.drmanuelespinoza.com
curl -s -o /dev/null -w "index.html: %{http_code} -> %{redirect_url}\n" https://drmanuelespinoza.com/index.html
curl -s -o /dev/null -w "apex:       %{http_code}\n" https://drmanuelespinoza.com
curl -sI https://drmanuelespinoza.com/opengraph-image | grep -i content-type
```

Esperado en el paso 5: las 8 rutas de la sección 1.3 en `200`, `www: 301`,
`index.html: 301`, `apex: 200`, y `Content-Type: image/png`.

## Rollback

Si algo se rompe:

```bash
sudo cp -a /etc/nginx/sites-available/drmanuelespinoza.com.bak.<TIMESTAMP> \
           /etc/nginx/sites-available/drmanuelespinoza.com
sudo nginx -t && sudo systemctl reload nginx
```

Después del rollback, repetir la verificación del paso 5. Si las 8 rutas de
la sección 1.3 dejan de dar `200` incluso con la configuración anterior
restaurada, el problema no es de Nginx — revisar el release activo con
`readlink /srv/www/dr-manuel-espinoza/current` (ver
`docs/deployment-vps.md`).
