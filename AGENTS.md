# soycontador.ai

Sitio de marca personal de Israel Castro: contador público + desarrollador de software.
Objetivo: posicionar la entidad "Israel Castro" para búsquedas (Google y LLMs) de "contador" + "IA / inteligencia artificial" en México, y servir de tarjeta de presentación (talleres, herramientas, Jueves de ContadorIA, Club de Automatización Fiscal).

Stack: Astro 7 estático + adapter Vercel (solo `/api/newsletter` es serverless) + Tailwind v4 + MDX. Gestor: pnpm.

## Reglas de copy (QA obligatorio antes de commit)

- Español de México, tuteo, primera persona (habla Israel).
- SIN raya «—» en ningún texto publicable (se lee como señal de IA). Usar punto o paréntesis.
- Nombre: "Israel Castro" (formal) o "Isca" (informal). NUNCA "Isca Castro".
- Contexto siempre MX: SAT, CFDI, ISR, pesos MXN. Nunca IRS/AEAT/euros.
- ALIANZA CON FISCALISTAS.AI: **la regla de "cero menciones públicas" quedó
  DEROGADA el 2026-09-08, por decisión de Israel.** Se puede nombrar a José de
  Jesús Pérez Lara y a Fiscalistas.AI donde haga falta. El motivo: Israel
  imparte módulos en un curso alojado ahí, y una página que manda a pagar a
  otro sitio sin decir de quién es se lee como poco transparente. Lo que SÍ
  sigue en pie es el criterio: se nombra cuando aporta claridad al lector, no
  como respaldo de marca.
- PRECIOS: el ebook publica precio ($297 MXN). **El taller ya NO** (decisión
  Israel 2026-09-08, revierte la del 2026-08-30): en la misma página vive la
  colaboración con Fiscalistas.AI a $3,500, y dos números juntos convierten la
  decisión en una comparación de precio en vez de una de formato. El taller
  pasa a cotización por correo. Al retirarlo hay que sacarlo de CUATRO lugares,
  no solo de la tarjeta: la página, el nodo Offer del JSON-LD, `llms.txt` y
  `llms-full.txt`. Ahí se escapa. El curso de Fiscalistas.AI publica
  el suyo ($3,500 MXN) porque es precio público de ELLOS, no de Israel: por eso
  vive en `COLABORACION` y no en `TALLER`, y no se emite JSON-LD de oferta. NO publicar: el ancla de organizaciones
  ($3,500-4,000/hora, referencia interna de cotización), la capacitación empresarial
  (solo cotización por llamada tras formulario) ni el Club (cierre por aplicación).
- POSICIONAMIENTO, en tres niveles (corrección de Israel 2026-08-30):
  - SÍ, es identidad y diferenciador: "contador público y desarrollador de software".
    Israel ES developer (estudió programación y trabajó como desarrollador en una startup).
    Además es lo que la gente busca ("contador programador") y lo que los LLM ya asocian
    a su nombre, así que se dice sin rodeos.
  - NUNCA el comparativo: "yo sí programo (para que tú no tengas que hacerlo)". Señala al
    colega que apenas empieza; esa es la parte cruel y era la queja original.
  - NUNCA el presente factualmente falso: "escribo código todos los días". Hoy Israel
    dirige el código con IA: lo lee, lo revisa y lo pide en los términos correctos.
  El matiz honesto ("hoy dirijo más de lo que tecleo") se cuenta como evolución del oficio,
  jamás como confesión de carencia: un desarrollador que dirige con IA sigue siendo
  desarrollador, y ese es justo el modelo que el sitio le propone al lector. La habilidad
  que se vende: saber nombrar el problema en términos técnicos para que la IA lo resuelva
  a la primera.
- HONESTIDAD TÉCNICA (correcciones de Israel 2026-08-30):
  - TodoConta nació en 2012 como proyecto/blog; como SOFTWARE es de 2026. No afirmar
    "construyo software desde 2012". El arco real: 2012 blog WordPress, 2019 estudia
    programación, 2021-2023 desarrollador en startup mexicana, hoy automatiza su despacho.
  - El MCP trabaja vía la cuenta de TodoConta (app online + servidor): NO prometer "ningún
    dato sale de tu computadora" para el MCP. Eso solo aplica a la app de ESCRITORIO.
    El contraste honesto: canal controlado vs pegar datos de clientes en chats públicos.
- Ángulo Avatar A: la experiencia es la VENTAJA ("con todo lo que sé + IA supero a cualquier
  recién egresado"); nunca tratar la edad como carencia. El rango del avatar es
  **45 a 65 años** (decisión Israel 2026-09-15; antes 30-50): es la franja que más
  se siente en desventaja frente a la IA, y esta regla es justo lo que permite
  hablarle sin insultarla. El modelo es la vuelta de la home: se nombra la
  objeción y se voltea a favor.
- HERRAMIENTA POR PIEZA (decisión Israel 2026-09-15). Tres niveles que no se
  mezclan:
  - **La marca y la promesa del sitio: agnósticas, y así se quedan.** Se vende
    el método y a Israel, no a un proveedor; eventualmente puede haber curso de
    ChatGPT o de Gemini si lo piden, y el copy de marca no debe estorbarlo.
  - **Cada pieza de contenido: UNA sola herramienta, a fondo.** Hoy el default
    es Claude. Si otra herramienta saca algo que valga la pena, se anuncia en
    su propia pieza. Nunca una pieza que hable de "la IA" en abstracto ni que
    compare tres herramientas a la vez: eso no le enseña a nadie a hacer nada.
  - **Las páginas de producto sí pueden ser específicas** (/audita con Claude
    en el H1 está bien): lo específico vive en la página, no en la promesa.
  - Guardarraíl: lo que no se haya probado en una plataforma, no se promete en
    ella, y los datos que dependen del proveedor van con fecha de verificación.
    Modelos de otros proveedores se verifican antes de nombrarse en copy
    publicable; no van de memoria.
- PÚBLICO DE PAGA (decisión Israel 2026-09-15): el contenido asume que el
  lector ya paga una suscripción de IA. No se optimiza para el plan gratuito ni
  se usa "funciona gratis" como argumento de venta. La lógica: quien ya paga la
  herramienta es quien compra capacitación para aprovecharla; el usuario free
  busca que todo sea gratis. OJO con no sobrecorregir: los imanes gratuitos
  (las guías, la muestra del ebook) no contradicen esta regla; alguien con
  suscripción descarga una guía gratis igual.

## El ebook

El libro "IA para Contadores" vive en `ebook/` (contenido, diseño y generadores
de PDF); se genera con `pnpm ebook`. Está **fuera de `src/` y de `public/` a
propósito**: es el entregable de pago y en `public/` quedaría descargable.
Ver `ebook/CLAUDE.md`. La página que lo vende es `/ebook`, y su copy sale de
`src/lib/ebook.ts`.

## Estrategia: a quién le habla el sitio

`docs/` guarda la estrategia de esta propiedad y **no se publica** (Astro solo
sirve `src/pages/` y `public/`). Contiene precios internos, así que no se copia
nada de ahí a una página sin revisar la tabla de precios de este archivo.

- `docs/avatar.md`: los dos avatares, completos y sin mandar a leer otro repo.
  **A** (contador individual) vive en la home y compra por **miedo** a quedar
  obsoleto; **B** (dueño de despacho de 5 a 50) vive en `/despachos` y compra
  por **margen**: capacidad sin contratar. Un avatar por página; si una página
  le habla a los dos, está mal.
- `docs/arquitectura-de-marca.md`: **TodoConta vende software, soycontador.ai
  vende a Israel.** Instagram sirve a A y no se mide con leads de despacho; a B
  se le cierra en LinkedIn y en el sitio.

La metodología es la de Eloisa Wolf. La oferta de despachos ya está
productizada en `todoconta-apps/docs/taller-ia-despachos.md`: no se redefine
aquí.

## Accesibilidad

Las 11 páginas están en **100 de accesibilidad, buenas prácticas y SEO** en
Lighthouse (medido el 2026-09-07). Al tocar la UI, volver a medir. Dos trampas
que ya costaron:

- **No usar `opacity` para "apagar" texto.** Lighthouse compone la opacidad y
  el contraste se hunde: los renglones en espera de la escena daban 1.44:1, y
  para pasar AA la opacidad tendría que subir a 0.92, con lo que ya no se
  distinguirían del estado encendido. El apagado va por **color y fondo**.
- **El nombre accesible tiene que contener el texto visible** (WCAG 2.5.3). Un
  `aria-label` que no incluye la cinta del botón deja sin efecto el comando de
  voz. Ver `VideoFacade.astro`.

## Formularios, consentimiento y listas

Dos flujos que NO se mezclan:

- **Lead** (`/api/lead`, desde LeadForm y FormCapacitacion): manda SIEMPRE un
  correo de acuse por SES al visitante, con copia oculta a Israel. Ese correo
  ES el registro del lead; no hay base de datos y a este volumen no hace falta.
  Solo entra a Sendy si marcó la casilla del boletín, que nunca va premarcada.
- **Newsletter** (`/api/newsletter`, desde NewsletterForm): la suscripción es
  la transacción (das tu correo, recibes la guía), así que no lleva casilla.
  No manda acuse: el correo de doble opt-in de Sendy hace de acuse.

**Una lista de Sendy por promesa**, porque los autoresponders se cuelgan de la
lista y no del origen. Dos promesas en una lista obligan a una bienvenida que
le queda a medias a las dos:

| Lista | Promesa | Origen |
|---|---|---|
| `general` (39) | La guía de 5 prompts | home, y leads que marcan la casilla |
| `live` (41) | El aviso del Jueves de ContadorIA | `/jueves` |
| `ebook` (40) | La muestra del libro | `/ebook` |
| `flujos` (42) | La guía de los 3 flujos híbridos | `/flujos` |
| `recibos` (43) | El enlace a la entrega XML→PDF (video + prompt) | el DM de IG, y el formulario de `/recibos` |

`recibos` es distinta en dos cosas (simplificación de Israel, 2026-09-15).
Uno: su alta principal NO viene de un formulario del sitio sino del DM de
Instagram (comenta RECIBOS → el DM pide el correo); el formulario de
`/recibos` es el respaldo para quien llega directo. Dos: su `confirm_url` NO
aterriza en `/dentro` sino en `/recibos`, que ES la entrega (video + prompt +
CTA al curso), abierta y sin muro: la exclusividad no es el contenido, es que
te llegue al correo. Su autoresponder entrega el ENLACE, no un adjunto.

Las cinco son **doble opt-in** y todas tienen su correo de bienvenida
colgado como autoresponder. En tres de ellas ese correo entrega un archivo
adjunto; en `live` no entrega nada, porque esa lista no promete descarga: su
llamado a la acción es suscribirse al canal y activar la campanita, que es lo
que de verdad avisa cuando el live ya empezó. El correo del aviso llega, pero
llega el mismo día.

`live` estuvo un tiempo sin autoresponder: quien confirmaba aterrizaba en
`/dentro` y no volvía a saber de nosotros hasta el jueves siguiente, que es
tiempo de sobra para olvidar que uno se suscribió.

El endpoint valida contra una lista blanca de nombres: el navegador nunca manda
un ID de Sendy.

**El redirect de la confirmación es `confirm_url`, no `subscribed_url`.** Son
dos campos distintos de la lista y se parecen lo suficiente para confundirse:
`confirm.php` redirige con el primero, y el segundo aplica al alta directa. Las
cuatro listas de la marca tenían `confirm_url` vacío, así que quien confirmaba
su correo aterrizaba en la página por defecto de Sendy, con el dominio de la
marca vieja a la vista. Se detectó hasta que se probó el flujo completo, no
leyendo la configuración: en el panel las dos casillas se ven igual de llenas.

**Cómo se prueba el consentimiento** (hacerlo cada vez que se toque este flujo,
porque es lo que separa "creo que respeta el consentimiento" de saberlo):
mandar DOS leads, uno con la casilla y otro sin ella, y que alguien con acceso
a Sendy confirme que **solo llegó uno**. Un solo lado no lo demuestra: de este
lado sabes qué mandaste pero no qué recibió Sendy, y del otro sabes qué hay en
Sendy pero no cuántos salieron. La prueba vive en el cruce.

## Trampa de Astro: el espacio antes de un `<span>` inline

Astro recorta el salto de línea + sangría que preceden a una etiqueta inline,
así que esto renderiza pegado:

```astro
<!-- MAL: sale "cambiofue una decisión" -->
<p>
  Lo que cambió fue
  <span class="hl">una decisión</span>.
</p>
```

La etiqueta inline va en el MISMO renglón que la palabra anterior:

```astro
<!-- BIEN -->
<p>
  Lo que cambió fue <span class="hl">una decisión</span>.
</p>
```

Ha mordido dos veces con marcadores `.hl` (2026-09-01 y 2026-09-02). Al tocar
cualquier `.hl`, `<b>` o `<strong>` inline, revisar el render, no el código:
en el editor se ve bien.

## Regla anti-duplicación (SEO)

Este sitio NUNCA re-publica contenido que exista en todoconta.com (lección documentada en
todoconta-apps/docs/infra/redirecciones-substack.md: duplicar contenido entre dominios hace
que el dominio nuevo compita contra su propia copia). `/herramientas` describe y ENLAZA con
copy propio; jamás copiar párrafos del blog o landing de TodoConta.

## Sistema de diseño

- `src/styles/tokens.css` es el ÚNICO punto de inyección de la identidad visual (vocabulario
  semántico: `--color-bg/surface/ink/accent...`, `--font-display/body/mono`). Los componentes
  jamás usan valores crudos ni nombres de color literales.
- La identidad vigente es **"Editorial cinético"** (dirección F, elegida el 2026-09-07),
  documentada en `design/DESIGN.md`. Sustituye a "Libro mayor × terminal". Los 6 mockups
  (3 de identidad, 3 de movimiento) viven en `design/mockups/`, y el porqué de la ronda 2
  en `design/MOVIMIENTO.md`.
- **La display es serif (Instrument Serif) y va SIEMPRE en peso 400**: esa fuente no tiene
  bold y pedir 700 lo hace fingir. La regla vieja de "serif solo en citas" quedó DEROGADA
  el 2026-09-07.
- Al tocar un `.hl` (el plumón verde), revisar el render: se calibra con `--hl-alto` y
  `--hl-abajo`, y sobre la serif necesita `--hl-abajo: 0.22em` o se lee como tachado.
  La tabla de valores está en `design/DESIGN.md`.
- Es una marca hermana de TodoConta pero NO comparte su identidad (nada de Inter + azul
  #0B5FFF + cian #06B6D4), ni la de sicastro-v2 (Geist + Fraunces).

## Entidad (SEO/AEO)

- `src/lib/site.ts` es la fuente única de la entidad (nombre, claim, sameAs, URLs, handles).
  JSON-LD, llms.txt dinámico y footer se generan de ahí; no duplicar esos datos a mano.
- FAQs en `src/lib/faqs.ts`: el mismo dato renderiza la UI (FaqBlock) y el schema FAQPage.
- Respuestas answer-first: la respuesta directa va en las 2 primeras frases.

## Development

Dev server en background:

```
astro dev --background
```

Manage con `astro dev stop`, `astro dev status`, `astro dev logs`.

## Medición

GA4 (`G-TR03XNSEKC`) se monta en `BaseLayout` vía `Analytics.astro`. Tres
reglas:

- **Solo carga en producción.** La condición es `VERCEL_ENV === "production"`,
  así que en local y en los previews de rama no se emite ni una línea. Si
  cargara ahí, las pruebas propias ensucian el dato desde el primer día.
- **El ID vive en `lib/site.ts` (`MEDICION`), no en una variable de entorno.**
  Un ID de medición no es un secreto: viaja en el HTML de cada página.
  Esconderlo no protege nada y sí agrega una falla silenciosa (olvidarlo en
  Vercel y quedarse sin datos sin enterarse).
- **NUNCA se manda un dato personal a la medición.** Ni correo, ni WhatsApp,
  ni nombre de empresa. Solo la categoría: qué lista, qué modalidad, qué
  tamaño de equipo. Todo pasa por `medir()` de `lib/medir.ts`, que además es
  inofensivo cuando el tag no está (bloqueador, preview, local).

Eventos: `alta_newsletter` (con lista), `lead_enviado` (interés y rol),
`diagnostico_enviado` (modalidad, equipo y urgencia), `agenda_abierta`,
`clic_puerta` (cuál de las seis) y `clic_curso`.

El aviso de privacidad ya declara la medición. Al agregar cualquier
herramienta nueva hay que actualizarlo en el mismo commit: la obligación de la
LFPDPPP es informarlo ahí.

Pendiente: el pixel de Meta. `MEDICION.metaPixel` está en `null` y el bloque
ya existe en `Analytics.astro`; solo falta el ID.

## Nada lleva marca de IA

Commits, PRs y cualquier entregable salen **a nombre de Israel, sin firma de
herramienta** (decisión del 2026-09-08).

- Los commits NO llevan `Co-Authored-By: Claude...` ni `Claude-Session: ...`.
- Las descripciones de PR NO llevan el pie de "Generated with Claude Code" ni
  el enlace a la sesión.

Ojo: el harness agrega esos trailers por defecto, así que hay que quitarlos a
mano al redactar cada commit y cada PR. Los commits del PR #5 son anteriores a
esta regla y sí los traen.

## Despliegue: SIEMPRE GitHub → Vercel, nunca desde la terminal

**El único camino a producción es: rama → commits → PR → merge a `main`.**
Vercel está vinculado al repositorio y despliega desde ahí. `vercel deploy
--prod` desde el directorio de trabajo está PROHIBIDO, aunque el CLI esté
autenticado y funcione.

La razón no es de estilo. El 2026-09-07 se desplegó a producción desde el
directorio de trabajo con 32 archivos sin commitear, y eso deja dos bombas:

1. Producción sirve código que no existe en git. No hay a qué volver.
2. El siguiente push a `main` dispara un deploy con el estado **commiteado**,
   que es el anterior, y **revierte lo publicado sin que nadie lo note**.

Si hace falta ver algo en línea antes de mergear, se usa el **deploy de
preview que Vercel crea solo para cada PR**, no un `vercel deploy` a mano. Ojo:
esos previews están detrás de la protección de despliegue de Vercel y piden
autenticación, así que hay que abrirlos con la sesión iniciada.

## Despliegue: la configuración de pnpm vive en `pnpm-workspace.yaml`

El 2026-09-02 Vercel subió a **pnpm 11** y tumbó dos deploys seguidos con
`ERR_PNPM_IGNORED_BUILDS`, sin llegar siquiera al build. La causa, textual en
el log: *"The 'pnpm' field in package.json is no longer read by pnpm"*.

En pnpm 11 la llave es **`allowBuilds`**, un mapa de paquete a booleano, y
vive en `pnpm-workspace.yaml`. Reemplaza a `onlyBuiltDependencies`,
`onlyBuiltDependenciesFile`, `neverBuiltDependencies` e
`ignoredBuiltDependencies`, que en esa versión ya no se leen. Ese fue el error
de los dos primeros intentos de arreglo: mudar el archivo estuvo bien, pero
con nombres de llave que pnpm 11 ya no reconoce. La respuesta salió de la
documentación de pnpm vía Context7, no de adivinar.

Estado actual:

- `pnpm-workspace.yaml` declara `allowBuilds: { esbuild: true, puppeteer: false }`.
  esbuild sí construye (Vite lo usa en el build); puppeteer no, porque su
  postinstall descarga Chromium (~150 MB) y solo lo usan los generadores de
  PDF del ebook, que corren en local.
- Lleva `packages: ["."]` porque el pnpm **local** todavía es 9.x y aborta con
  "packages field missing" sin esa llave. No vuelve monorepo al proyecto.
- La llave `pnpm` de `package.json` se queda: pnpm 9 la lee y no lee este
  archivo. Cuando local suba a 10+, se puede borrar.

**Antes de tocar esto**, correr `pnpm install --frozen-lockfile` y `pnpm build`
en local, y después verificar el deploy de verdad (`vercel ls`), no solo el
push. Los dos primeros intentos se veían bien en local y fallaban en Vercel.
