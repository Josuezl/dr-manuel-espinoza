# Nginx: rutas planas, redirecciones y content-type de la imagen OG

Este documento es para quien tenga **acceso root al VPS**. Todo lo de aquí
modifica `/etc/nginx/`, y según `docs/deployment-vps.md` la cuenta `deploy`
(la que usa el pipeline de GitHub Actions) no tiene sudo y no puede tocar
Nginx. Nada de este documento se ejecuta como parte del plan de SEO — se
documenta para que lo aplique quien tenga los permisos.

## Antes de tocar nada: confirmar en qué estado está el despliegue

`docs/deployment-vps.md` marca el DNS, Certbot, la redirección a HTTPS y el
apagado de Vercel como un *cutover* **pendiente**, sujeto a aprobación
explícita y separado del despliegue HTTP ya validado. Mientras ese cutover
no esté confirmado, no se puede saber desde este documento si
`drmanuelespinoza.com` resuelve hoy al VPS o todavía a otro hosting.

**Comprobar esto antes de aplicar cualquier otra cosa de este documento:**

```bash
dig +short drmanuelespinoza.com
```

- Si el resultado es `45.55.90.164` (la IP del VPS, ver `docs/deployment-vps.md`):
  el cutover ya ocurrió y el resto de este documento aplica tal cual.
- Si el resultado es cualquier otra IP: el dominio todavía se sirve desde
  otro hosting (probablemente Vercel, que `docs/deployment-vps.md` lista
  como pendiente de apagar). En ese caso, **los bloques `listen 443 ssl` de
  la sección 2 no aplican todavía** — hay que completar primero el cutover
  documentado en `docs/deployment-vps.md`. La sección 1 (`try_files`) y la
  sección 3 (`opengraph-image`) sí se pueden preparar y probar contra el VPS
  de antemano, apuntando `curl` directo a su IP con `--resolve` en vez de
  depender de que el DNS público ya apunte ahí.

Los tres cambios de abajo tienen prioridad distinta:

| # | Cambio | Prioridad |
|---|---|---|
| 1 | `try_files` para rutas planas | Verificar primero — si falta, es **CRÍTICA** |
| 2 | Redirecciones `www` → apex e `/index.html` → `/` | Mejora (SEO: consolida señales de ranking) |
| 3 | `default_type` de `/opengraph-image` | Mejora (vista previa al compartir) |

---

## 1. `try_files`: comprobar que las 7 páginas nuevas no den 404

### Por qué hace falta revisar esto

Next 16 con `output: "export"` y **sin** `trailingSlash` emite archivos
**planos**. Verificado contra el build real (`out/`):

```text
out/hemodinamia.html   ← el HTML real de la página
out/hemodinamia/       ← existe, pero solo tiene payloads .txt de RSC
                          (navegación client-side), NINGÚN index.html
```

Si el `location /` de Nginx no tiene una regla que busque `$uri.html`, la
resolución por defecto para `/hemodinamia` sería:

1. un archivo llamado `hemodinamia` — no existe
2. `hemodinamia/index.html` — no existe (esa carpeta solo tiene los `.txt`)

Y respondería **404**. Esto afectaría a las 7 páginas de contenido nuevas
(`/hemodinamia`, `/infarto`, `/angioplastia-coronaria`,
`/tavi-valvula-aortica`, `/reparacion-mitral-myclip`, `/marcapasos`,
`/contacto`) aunque el build esté perfecto — sería un problema de Nginx, no
del código. De ahí que haya que revisar esto antes que cualquier otra cosa.

### 1.1 Qué dice la configuración documentada

El bloque original de Nginx de la migración del VPS
(`docs/superpowers/plans/2026-07-19-dr-manuel-espinoza-vps-migration.md:228-231`)
**ya incluye** esta regla dentro de `location /`:

```nginx
location / {
    try_files $uri $uri.html $uri/ =404;
}
```

Si el servidor coincide con esa configuración documentada, esto ya está
resuelto y no hay nada que aplicar — solo confirmar con 1.2 y 1.5. Esta
sección solo importa si la configuración viva del servidor **no** coincide
con lo documentado (edición manual posterior, config distinta a la
planeada, etc.).

### 1.2 Comprobar qué hay hoy en el servidor

```bash
grep -n -A2 "location / {" /etc/nginx/sites-available/drmanuelespinoza.com
```

- Si aparece exactamente `try_files $uri $uri.html $uri/ =404;`: coincide
  con lo documentado en 1.1. Pasar directo a la verificación 1.5.
- Si `try_files` no aparece, o aparece sin `$uri.html` (por ejemplo
  `try_files $uri $uri/ =404;`): falta la pieza que resuelve las rutas
  planas. Aplicar 1.3.

### 1.3 Si falta: aplicar esto

Dentro del bloque `server` que sirve el sitio (`root
/srv/www/dr-manuel-espinoza/current;`), dejar el `location /` así:

```nginx
location / {
    try_files $uri $uri.html $uri/ =404;
}
```

### 1.4 Por qué `$uri.html`, y por qué no `trailingSlash: true`

La pieza que importa es **`$uri.html`**: es la que hace que `/hemodinamia`
resuelva contra el archivo real, `hemodinamia.html`. Sin ella, Nginx nunca
llega a mirar ese archivo. `$uri/` queda como respaldo por si algún día
existiera una carpeta con `index.html` real (hoy no la hay), y `=404` cierra
la cadena para que una ruta inexistente no caiga en un comportamiento
indefinido.

La alternativa que evitaría tocar Nginx sería poner `trailingSlash: true` en
`next.config.ts`: Next generaría `hemodinamia/index.html` en vez de
`hemodinamia.html`, y el `$uri/` por defecto ya lo encontraría. **No hacer
esto.** `trailingSlash: true` cambia las URLs del sitio a `/hemodinamia/`
(con barra final). Pero el `canonical` de cada página (`lib/metadata.ts`,
`alternates: { canonical: route.path }`) y el `sitemap.xml`
(`app/sitemap.ts`, generado desde `data/routes.ts`) ya declaran la versión
**sin** barra final para las 8 rutas. Cambiar `trailingSlash` significaría
reescribir todas las URLs canónicas del sitio, el sitemap y el
`BreadcrumbList` de cada página — para evitar tres líneas de configuración
de Nginx. Es la solución equivocada aunque sea la más fácil de escribir.

### 1.5 La prueba definitiva: las 8 rutas por curl

Esto zanja el asunto independientemente de lo que diga cualquier
documento — incluido este. Es **la verificación que hay que correr antes de
dar por bueno el despliegue**, se haya tocado la configuración o no:

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

Si alguna ruta distinta de `/` da `404`, falta la regla de la sección 1.3
(y el `grep` de 1.2 debería haberlo mostrado).

---

## 2. Redirecciones de `www` e `/index.html` (mejora)

### El problema a comprobar

```bash
curl -s -o /dev/null -w "%{http_code}\n" https://www.drmanuelespinoza.com
curl -s -o /dev/null -w "%{http_code}\n" https://drmanuelespinoza.com/index.html
```

Lo esperado, si ya existe la redirección, es `301` en las dos. Si cualquiera
de las dos devuelve `200`, esa URL está sirviendo una copia completa del
sitio en vez de redirigir, y Google reparte las señales de ranking entre
tres URLs distintas (`drmanuelespinoza.com`, `www.drmanuelespinoza.com`,
`drmanuelespinoza.com/index.html`) en vez de concentrarlas en el dominio
canónico sin `www`. Los bloques de abajo corrigen eso.

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

## Procedimiento seguro para aplicar cambios

Si 1.2 mostró que falta `try_files`, aplicar ese cambio junto con los de las
secciones 2 y 3 en la misma ventana de mantenimiento, en este orden exacto:

```bash
# 1. Respaldar con fecha
sudo cp -a /etc/nginx/sites-available/drmanuelespinoza.com \
           /etc/nginx/sites-available/drmanuelespinoza.com.bak.$(date +%Y%m%d-%H%M%S)

# 2. Aplicar los cambios que hagan falta de las secciones 1.3, 2.2, 2.3 y 3

# 3. Validar la sintaxis. Si esto falla, NO recargar.
sudo nginx -t

# 4. Recargar solo si el paso 3 pasó
sudo systemctl reload nginx

# 5. Verificar — las 8 rutas de la sección 1.5, más:
curl -s -o /dev/null -w "www:        %{http_code} -> %{redirect_url}\n" https://www.drmanuelespinoza.com
curl -s -o /dev/null -w "index.html: %{http_code} -> %{redirect_url}\n" https://drmanuelespinoza.com/index.html
curl -s -o /dev/null -w "apex:       %{http_code}\n" https://drmanuelespinoza.com
curl -sI https://drmanuelespinoza.com/opengraph-image | grep -i content-type
```

Esperado en el paso 5: las 8 rutas de la sección 1.5 en `200`, `www: 301`,
`index.html: 301`, `apex: 200`, y `Content-Type: image/png`.

## Rollback

Si algo se rompe:

```bash
sudo cp -a /etc/nginx/sites-available/drmanuelespinoza.com.bak.<TIMESTAMP> \
           /etc/nginx/sites-available/drmanuelespinoza.com
sudo nginx -t && sudo systemctl reload nginx
```

Después del rollback, repetir la verificación del paso 5. Si las 8 rutas de
la sección 1.5 dejan de dar `200` incluso con la configuración anterior
restaurada, el problema no es de Nginx — revisar el release activo con
`readlink /srv/www/dr-manuel-espinoza/current` (ver
`docs/deployment-vps.md`).
