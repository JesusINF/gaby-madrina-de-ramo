# Invitación para Gaby

Invitación estática, mobile-first y en español para Gaby como madrina de ramo para lanzar. Usa HTML, CSS y JavaScript nativos y se publica desde GitHub Actions Pages; no requiere build ni dependencias instaladas.

## Probar en local

Sirve la carpeta por HTTP para que los módulos ES y Firebase funcionen:

```powershell
npx --yes serve . -l 4177
```

Abre `http://localhost:4177`. Para las comprobaciones de estructura y contratos:

```powershell
npm run check
```

## Dirección visual

La composición continúa la invitación de Mary y Everardo: cielo azul bruma, pliegues blush y salvia, una hoja de papel marfil, serif Cormorant Garamond en borgoña y acento oro discreto. Los recortes transparentes del Santuario y el ramo viven como imágenes dentro del SVG en línea; el ramo usa `assets/ramo-invitacion-v2.webp` y se desplaza con una animación nativa ligada al scroll, con alternativa de `IntersectionObserver` para navegadores sin scroll timelines. No se agrega un listener de scroll por cuadro y el movimiento se desactiva con `prefers-reduced-motion`.

Las fuentes Cormorant Garamond y Manrope se sirven localmente desde `assets/fonts/`. El contenido, los datos del evento y los controles permanecen en HTML accesible.

## Procedencia del arte

El recorte del ramo fue generado con OpenAI ImageGen a partir de una dirección breve: rosas rosa y marfil, follaje salvia y listón blush; sin fondo, texto ni manos. El PNG transparente se optimizó a WebP conservando el canal alfa en `assets/ramo-invitacion-v2.webp` (1063 × 1479 px). El wrapper SVG en línea contiene únicamente `<image>` del ramo y del recorte transparente del Santuario; la traslación del ramo es una animación CSS nativa ligada al scroll, no un redibujo vectorial.

## Respuesta y Firebase

La invitación inicia Firebase Anonymous Auth al confirmar y hace una sola creación de `responses/gaby-ramo` mediante `setDoc`, con `accepted`, `createdAt: serverTimestamp()`, `inviteId`, `recipients` y `responderUid`. El cliente no lee respuestas; `localStorage` solo conserva el estado visual de esta invitación. Las reglas locales mantienen la creación única por documento y la denegación predeterminada.

`firebase-config.js` contiene configuración cliente pública del proyecto `padrinos-de-anillo-2027`, no credenciales administrativas. Para guardar respuestas, Anonymous Auth debe estar habilitado y las reglas correspondientes deben estar publicadas en Firebase. Este proyecto no despliega reglas ni incluye credenciales administrativas.

## GitHub Pages

El workflow `.github/workflows/pages.yml` publica la raíz del sitio desde GitHub Actions cuando se actualiza la rama `main` o se ejecuta manualmente. Esta implementación no crea, modifica ni publica repositorios remotos.
