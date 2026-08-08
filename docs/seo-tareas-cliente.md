# Tareas del Dr. Espinoza para el posicionamiento en Google

Este documento no requiere conocimientos técnicos. Son las decisiones y
acciones que dependen de vos, Dr. Espinoza, para que el sitio nuevo pueda
publicarse y para que aparezca mejor en las búsquedas de Google.

---

## Antes de publicar: 6 decisiones que necesitamos que tomés

El sitio tiene texto médico nuevo y algunas afirmaciones que hoy hace en tu
nombre. Nada de esto se publica hasta que lo veas.

### 1. Aprobación clínica de todo el texto médico nuevo (bloquea la publicación)

El sitio incorpora contenido médico nuevo: 7 páginas explicando
procedimientos y 10 preguntas frecuentes. Todo necesita tu revisión antes de
salir en línea. Para dimensionar lo que hay que leer:

| Página | Secciones de texto |
|---|---|
| Hemodinamia y cateterismo cardíaco | 5 |
| Síntomas de infarto | 5 |
| Angioplastia coronaria y stent | 4 |
| TAVI (válvula aórtica) | 4 |
| MyClip (reparación mitral) | 5 |
| Marcapasos | 4 |
| Preguntas frecuentes (home) | 10 preguntas |

Para quien coordine la revisión con vos: el texto vive en
`data/faq.ts` (las 10 preguntas) y en los 6 archivos de `data/content/`
(uno por página, listados arriba). No hace falta que abras el código —
podemos pasarte el texto en un documento aparte para leer.

### 2. Dos afirmaciones sobre tu revisión que el sitio ya hace

Sin que se lo pidamos, el sitio ya declara dos veces que vos revisaste este
contenido:

- Al pie de cada una de las 7 páginas: *"Revisado por el Dr. Manuel Espinoza
  Rueda, cardiólogo intervencionista."*
- En los datos que el sitio le entrega a Google sobre cada página (invisible
  para el paciente, visible para el buscador), que también te nombra como
  revisor.

**Las dos afirmaciones solo son ciertas el día que vos efectivamente
revisaste el texto.** No se publica antes de eso — publicar una afirmación
de revisión clínica que todavía no ocurrió es un problema de credibilidad
médica, no un detalle técnico.

### 3. El teléfono de emergencia en la página de infarto

La página de síntomas de infarto le dice al lector que busque atención de
emergencia, pero **no da ningún número** para llamar. Sabemos que en
Honduras se usa el 911, pero no lo confirmamos con una fuente oficial y por
eso no lo pusimos: en la página que alguien puede estar leyendo en medio de
una emergencia, un número equivocado es peor que no mostrar ninguno.

Necesitamos que nos digas qué número querés que aparezca ahí, o si preferís
que la página no muestre ninguno.

### 4. El botón de contacto en la página de infarto

Todas las páginas de contenido terminan con el mismo bloque: *"¿Necesitás
una valoración? / Escribir por WhatsApp / Ver consultorios"*. En la página
de infarto, ese mismo bloque aparece después de la sección "Cómo reducir el
riesgo" — como si fuera para agendar una cita de rutina.

Quien llega a esa página puede estar viviendo una urgencia en ese momento.
¿Querés un mensaje distinto ahí, o dejamos el mismo de las demás páginas?

### 5. Cómo le hablamos al paciente: ¿vos o tú?

El sitio mezcla dos formas de tratamiento al lector. La sección de contacto
y las preguntas frecuentes usan "vos" ("escribí", "agendá", "tenés"),
mientras que la sección de citas, el título general del sitio y los
resúmenes que ve Google usan "tú" ("Agenda tu cita"). Esto ya existía antes
de este trabajo — no lo introdujimos ahora, pero es un buen momento para
decidirlo.

No es un error técnico: es una decisión de cómo querés que suene tu marca.
¿Preferís "vos" (más cercano, como se habla en Honduras) o "tú" (más
neutro)? Lo unificamos en todo el sitio según lo que elijas.

### 6. Horarios del CNA y coordenadas de los dos consultorios

Google necesita horarios exactos y ubicación exacta para mostrar tu perfil
correctamente:

- **Horarios del Centro de Neumología y Alergias (CNA):** hoy no los
  tenemos. Mientras no nos los confirmes, el sitio **omite** ese dato a
  propósito en vez de inventarlo — un horario incorrecto hace que un
  paciente llegue y te encuentre cerrado.
- **Coordenadas de mapa de ambas sedes:** hoy no están verificadas contra
  Google Maps. Mientras tanto, el sitio tampoco muestra un pin de mapa
  propio — una coordenada equivocada manda al paciente a un lugar
  incorrecto.

Necesitamos: horario de atención del CNA (días y horas), y confirmación de
que la ubicación de ambos consultorios en Google Maps es la correcta.

---

## Cómo posicionar el sitio en Google (una vez publicado)

En orden de impacto — lo primero es lo que más resultado da por el esfuerzo
que toma.

### 1. Perfil de Empresa en Google (antes "Google My Business")

Es la ficha gratuita que aparece en Google Maps y a la derecha de los
resultados de búsqueda cuando alguien busca "cardiólogo en San Pedro Sula".
Es la acción de **mayor impacto** de esta lista: la mayoría de las búsquedas
de un médico cerca de casa se resuelven mirando esa ficha, no el sitio web.

Se crea una ficha por cada consultorio, con estos datos exactos — tienen que
coincidir **carácter por carácter** con el sitio, incluyendo mayúsculas,
tildes y el formato del teléfono:

```
Sede 1 - Centro de Neumología y Alergias (CNA)
  Residencial Altavista, Calle 24, San Pedro Sula, Cortés, Honduras
  Teléfono +504 2566-3004
  Celular  +504 9774-5013
  Email    ccardiologicosps@gmail.com
  Horarios: PENDIENTES (ver punto 6 de la sección anterior)

Sede 2 - Consultorio Hospital del Valle
  Hospital del Valle, Condominios 1, Consultorio 402, 4to piso, San Pedro Sula, Cortés, Honduras
  WhatsApp +504 9453-2216
  Lunes a viernes 11:00-17:00; sábado y domingo cerrado
```

Un nombre, dirección o teléfono que no coincida entre la ficha de Google y
el sitio confunde a Google sobre si son el mismo lugar, y eso baja el
posicionamiento de ambos en vez de ayudarlos.

### 2. Google Search Console

Es la herramienta gratuita de Google para decirle "este es mi sitio, revisá
mi contenido". Tres pasos:

1. Verificar que el dominio `drmanuelespinoza.com` es tuyo.
2. Enviar el mapa del sitio: `https://drmanuelespinoza.com/sitemap.xml`.
3. Revisar el informe de cobertura a las dos semanas, para confirmar que
   Google indexó las 8 páginas sin errores.

### 3. Reseñas de pacientes

Es el factor de **mayor peso** en qué tan arriba aparecés cuando alguien
busca un cardiólogo cerca. Más que el sitio web, más que la ficha de Google.

Cómo pedirlas correctamente: pedile a los pacientes que dejen una reseña
después de una buena consulta, con un enlace directo a tu ficha de Google
para que sea fácil. Lo que **no** se puede hacer, porque las políticas de
Google lo prohíben y penalizan la ficha si lo detectan: ofrecer descuentos,
regalos o cualquier otro incentivo a cambio de una reseña.

### 4. Directorios médicos hondureños

Registrar los dos consultorios en directorios médicos y de salud de
Honduras (colegios profesionales, guías de clínicas, directorios de
hospitales donde atendés), siempre con el mismo nombre, dirección y
teléfono exactos que en el sitio y en la ficha de Google. Cada mención
consistente refuerza ante Google que la información es real y confiable.

---

## Resumen de lo que necesitamos de vos

- [ ] Revisar y aprobar el texto médico de las 7 páginas y las 10 preguntas frecuentes
- [ ] Confirmar que podemos publicar los dos avisos de "revisado por el Dr. Espinoza"
- [ ] Decidir qué número de emergencia (o ninguno) aparece en la página de infarto
- [ ] Decidir si la página de infarto necesita un botón de contacto distinto
- [ ] Elegir "vos" o "tú" para todo el sitio
- [ ] Confirmar horario del CNA
- [ ] Confirmar que las ubicaciones de ambos consultorios en Google Maps son correctas
