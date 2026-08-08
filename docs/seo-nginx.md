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
  la sección 3 no aplican todavía** — hay que completar primero el cutover
  documentado en `docs/deployment-vps.md`. La sección 1 (`try_files`), la
  sección 2 (barra final) y la sección 4 (`opengraph-image`) sí se pueden
  preparar y probar contra el VPS de antemano, apuntando `curl` directo a su
  IP con `--resolve` en vez de depender de que el DNS público ya apunte ahí.

Los cambios de abajo tienen prioridad distinta:

| # | Cambio | Prioridad |
|---|---|---|
| 1 | `try_files` para rutas planas | Verificar primero — si falta, es **CRÍTICA** |
| 2 | Redirección 301 de rutas con `/` final | **IMPORTANTE** — hoy dan 403, Google lo trata como bloqueo |
| 3 | Redirecciones `www` → apex e `/index.html` → `/` | La regla de `/index.html` documentada aquí es la corregida: la versión con `location =` produce un **bucle infinito que tumba la portada** (ver 3.3). Aplicada como está, es mejora (SEO: consolida señales de ranking) |
| 4 | `default_type` de `/opengraph-image` | Mejora (vista previa al compartir) |

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

### 1.5 La prueba definitiva: las 8 rutas por curl, planas y con barra final

Esto zanja el asunto independientemente de lo que diga cualquier
documento — incluido este. Es **la verificación que hay que correr antes de
dar por bueno el despliegue**, se haya tocado la configuración o no. Incluye
también la variante con `/` final de cada ruta (salvo la home, que ya es
`/`): esa variante es la que cubre la sección 2 de este documento, así que
esta misma batería sirve para verificar ambos cambios a la vez.

```bash
for path in / /hemodinamia /infarto /angioplastia-coronaria \
            /tavi-valvula-aortica /reparacion-mitral-myclip \
            /marcapasos /contacto; do
  printf '%-28s %s\n' "$path" \
    "$(curl -s -o /dev/null -w '%{http_code}' "https://drmanuelespinoza.com$path")"
done

for path in /hemodinamia/ /infarto/ /angioplastia-coronaria/ \
            /tavi-valvula-aortica/ /reparacion-mitral-myclip/ \
            /marcapasos/ /contacto/; do
  printf '%-28s %s -> %s\n' "$path" \
    "$(curl -s -o /dev/null -w '%{http_code}' "https://drmanuelespinoza.com$path")" \
    "$(curl -s -o /dev/null -w '%{redirect_url}' "https://drmanuelespinoza.com$path")"
done
```

Esperado — las 8 rutas planas en `200`:

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

Esperado — las 7 rutas con barra final en `301`, redirigiendo a la versión
sin barra:

```text
/hemodinamia/                301 -> https://drmanuelespinoza.com/hemodinamia
/infarto/                    301 -> https://drmanuelespinoza.com/infarto
/angioplastia-coronaria/     301 -> https://drmanuelespinoza.com/angioplastia-coronaria
/tavi-valvula-aortica/       301 -> https://drmanuelespinoza.com/tavi-valvula-aortica
/reparacion-mitral-myclip/   301 -> https://drmanuelespinoza.com/reparacion-mitral-myclip
/marcapasos/                 301 -> https://drmanuelespinoza.com/marcapasos
/contacto/                   301 -> https://drmanuelespinoza.com/contacto
```

Si alguna da `403`, falta la regla de la sección 2.2.

---

## 2. Barra final: las rutas con `/` al final dan 403 (importante)

### El problema a comprobar

```bash
curl -s -o /dev/null -w "%{http_code}\n" https://drmanuelespinoza.com/hemodinamia/
```

Verificado contra el build real y la configuración documentada en la
sección 1: da **403**, no 404. Google trata un 403 como bloqueo activo del
rastreador, distinto de un 404 (página que simplemente no existe) — es peor
para el SEO del sitio que un 404 sobre la misma URL.

### 2.1 Por qué da 403 y no 404

`out/hemodinamia/` existe como carpeta (ver sección 1), pero solo contiene
los payloads `.txt` de navegación RSC — **ningún `index.html`**. Al pedir
`/hemodinamia/`, `try_files $uri $uri.html $uri/ =404;` evalúa `$uri/`:
la carpeta existe, así que Nginx la toma como un directorio servible e
intenta aplicarle el `index` directive (buscar un `index.html` dentro).
No lo encuentra, y con `autoindex off` (el valor por defecto, y lo correcto
en producción: listar el contenido de una carpeta es una fuga de
información), Nginx no tiene nada que devolver más que un **403 Forbidden**
— la página cruda de error de Nginx, no una página del sitio. `=404` en
`try_files` no ayuda acá: esa cláusula solo se dispara si **ninguna** de
las opciones anteriores existe ni como archivo ni como directorio, y
`$uri/` sí existe como directorio.

### 2.2 La regla: redirigir la barra final a la versión canónica

Dentro del bloque `server`, **antes** del `location /` de la sección 1
(las regex-location de Nginx se evalúan en el orden en que aparecen en el
archivo, y antes que el `location /` de prefijo por defecto):

```nginx
location ~ ^(/.+)/$ {
    return 301 https://drmanuelespinoza.com$1;
}
```

`^(/.+)/$` exige al menos un carácter entre las dos barras, así que **no
matchea `/` sola** (verificado por el revisor: `GET /` sigue devolviendo
`200` con esta regla activa). El grupo capturado `$1` es la ruta sin la
barra final, que es exactamente la que ya usan el `canonical` de cada
página y el `sitemap.xml` — por eso el redirect no crea una segunda URL
canónica, consolida en la única que ya existe.

### 2.3 Por qué esto no reintroduce el bucle de la sección 3

Esta regla es un `location` con match por **regex** (`~`), distinto de un
`location = /index.html` con match **exacto**. El bucle de la sección 3.3
ocurre porque una reescritura interna del directive `index` genera una URI
que coincide con un match exacto agregado a mano. Acá no hay ningún
directive interno de Nginx que agregue una barra final a una URI que no la
tenía: la única forma de que `$request_uri` termine en `/` es que el
cliente la haya pedido así. No hay reescritura interna que dispare esta
regla por accidente.

---

## 3. Redirecciones de `www` e `/index.html`

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

### 3.1 Requisito previo: el certificado debe cubrir `www`

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

### 3.2 Bloque de redirección de `www`

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

### 3.3 Regla para `/index.html` — CUIDADO: la forma obvia entra en bucle infinito

**No usar `location = /index.html { return 301 ...; }`.** Es la forma más
directa de escribir esta regla, y es la que traía este documento antes de
esta revisión. Se verificó levantando Nginx 1.31.3 en un contenedor con
esta config real y el `out/` real: rompe la portada.

```text
GET /            -> 301  Location: https://drmanuelespinoza.com/
GET /index.html  -> 301  Location: https://drmanuelespinoza.com/
```

**Por qué pasa esto.** El bloque `server` sirve el sitio con
`index index.html;` (explícito o por default de Nginx). Cuando llega una
petición para `/`, Nginx la resuelve dentro de `location /`
(`try_files $uri $uri.html $uri/ =404;`): `$uri/` matchea porque el
directorio raíz existe, y ahí es donde entra el directive `index`, que
busca `index.html` dentro de ese directorio. Para *encontrarlo*, Nginx hace
una **reescritura interna** de la petición a `/index.html` — invisible
para el cliente, pero que **vuelve a evaluar los `location` desde cero**,
como si fuera una petición nueva. Con `location = /index.html` agregado a
mano, esa reescritura interna cae justo en ese bloque de match exacto, que
no sabe que la petición es interna: ve `/index.html` y devuelve un 301 a
`/`. El cliente originalmente pidió `/`, nunca `/index.html` — pero recibe
igual ese 301. El navegador sigue la redirección a `/`, Nginx repite
exactamente el mismo camino interno, y el resultado es un bucle infinito
(`ERR_TOO_MANY_REDIRECTS`). Una petición directa a `/index.html` cae en el
mismo bloque por el motivo obvio (coincide literal), así que también
redirige — pero el problema real es que `/` **también** entra en el bucle,
y `/` es la URL canónica del sitio entero.

**Agravante:** `curl -fsS` (usado en el health check del pipeline, ver
`.github/workflows/deploy-production.yml`) no falla ante un 301 — `-f` solo
distingue 2xx de 4xx/5xx. Un despliegue con esta regla pasaría el health
check en verde con la home atrapada en un bucle de redirección.

**La regla correcta**, verificada funcionando contra el mismo contenedor:

```nginx
location / {
    # Comparar contra $request_uri, NUNCA contra el location. A diferencia
    # de $uri, $request_uri guarda la URI ORIGINAL tal como la mandó el
    # cliente y no cambia con la reescritura interna que hace el directive
    # "index" al servir "/". Por eso este "if" solo dispara para una
    # petición real a /index.html -- nunca para la reescritura interna que
    # ocurre al servir "/". Tiene que ir ANTES de try_files: si no, cuando
    # el cliente pida /index.html directo, try_files ya lo habría servido
    # con 200 antes de llegar acá, y la redirección nunca se aplicaría.
    if ($request_uri ~ ^/index\.html) {
        return 301 https://drmanuelespinoza.com/;
    }

    try_files $uri $uri.html $uri/ =404;
}
```

El mecanismo es el mismo motivo por el que la sección 2 (barra final) no
tiene este problema: un `if` sobre `$request_uri` sólo mira lo que pidió el
cliente, nunca lo que Nginx reescribe internamente. Un `location = ...` en
cambio no distingue entre una petición real y una reescritura interna que
casualmente termina con la misma URI — y esa es exactamente la trampa.

**Verificación obligatoria antes de dar esto por bueno** (repetir después
de cualquier cambio en esta sección, no asumir que "compila" alcanza):

```bash
curl -s -o /dev/null -w "GET /:            %{http_code} -> %{redirect_url}\n" https://drmanuelespinoza.com/
curl -s -o /dev/null -w "GET /index.html:  %{http_code} -> %{redirect_url}\n" https://drmanuelespinoza.com/index.html
```

Esperado: `GET /` en `200` (sin `redirect_url`), `GET /index.html` en `301`
apuntando a `https://drmanuelespinoza.com/`. Si `GET /` devuelve `301`,
esta sección se rompió de nuevo — no recargar esa config en producción.

---

## 4. `Content-Type` de la imagen OpenGraph (mejora)

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
secciones 2, 3 y 4 en la misma ventana de mantenimiento, en este orden
exacto. La regla de la sección 2 (barra final) y la de la sección 3.3
(`/index.html`, la versión con `$request_uri`, NUNCA la de `location =`)
van dentro del mismo `location /` que la sección 1 — ver 3.3 para el orden
interno (el `if` de `/index.html` antes de `try_files`; el `location ~`
de la barra final es un bloque aparte que Nginx evalúa antes que
`location /` por ser regex):

```bash
# 1. Respaldar con fecha
sudo cp -a /etc/nginx/sites-available/drmanuelespinoza.com \
           /etc/nginx/sites-available/drmanuelespinoza.com.bak.$(date +%Y%m%d-%H%M%S)

# 2. Aplicar los cambios que hagan falta de las secciones 1.3, 2.2, 3.2, 3.3 y 4

# 3. Validar la sintaxis. Si esto falla, NO recargar.
sudo nginx -t

# 4. Recargar solo si el paso 3 pasó
sudo systemctl reload nginx

# 5. Verificar — las 8 rutas planas y las 7 con barra final de la sección
#    1.5, más:
curl -s -o /dev/null -w "www:        %{http_code} -> %{redirect_url}\n" https://www.drmanuelespinoza.com
curl -s -o /dev/null -w "index.html: %{http_code} -> %{redirect_url}\n" https://drmanuelespinoza.com/index.html
curl -s -o /dev/null -w "apex:       %{http_code}\n" https://drmanuelespinoza.com
curl -sI https://drmanuelespinoza.com/opengraph-image | grep -i content-type
```

Esperado en el paso 5: las 8 rutas planas de la sección 1.5 en `200`, las 7
rutas con barra final en `301` hacia su versión sin barra, `www: 301`,
`index.html: 301`, `apex: 200` (si `apex` da `301`, el bucle de la sección
3.3 volvió — no seguir), y `Content-Type: image/png`.

## Rollback

Si algo se rompe:

```bash
sudo cp -a /etc/nginx/sites-available/drmanuelespinoza.com.bak.<TIMESTAMP> \
           /etc/nginx/sites-available/drmanuelespinoza.com
sudo nginx -t && sudo systemctl reload nginx
```

Después del rollback, repetir la verificación del paso 5. Si las rutas de
la sección 1.5 dejan de dar los códigos esperados incluso con la
configuración anterior restaurada, el problema no es de Nginx — revisar el
release activo con `readlink /srv/www/dr-manuel-espinoza/current` (ver
`docs/deployment-vps.md`).
