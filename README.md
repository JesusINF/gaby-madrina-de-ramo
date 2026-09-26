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

La composición continúa la invitación de Mary y Everardo: cielo azul bruma, pliegues blush y salvia, una hoja de papel marfil, serif Cormorant Garamond en borgoña y acento oro discreto. El Santuario y el ramo usan arte de relieve papercraft generado por IA y recortado con transparencia; ambos viven como imágenes dentro del SVG en línea. El ramo (`assets/ramo-papercraft-v1.webp`) se desplaza con una animación nativa ligada al scroll, con alternativa de `IntersectionObserver` para navegadores sin scroll timelines. No se agrega un listener de scroll por cuadro y el movimiento se desactiva con `prefers-reduced-motion`.

Las fuentes Cormorant Garamond y Manrope se sirven localmente desde `assets/fonts/`. El contenido, los datos del evento y los controles permanecen en HTML accesible.

## Procedencia del arte

`assets/ramo-papercraft-v1.webp` y `assets/santuario-papercraft-v1.webp` son ilustraciones de IA en relieve de cartulina, con canal alfa, optimizadas como WebP. El templo conserva la cúpula azul con paneles dorados y la torre frontal del Santuario. El wrapper SVG en línea contiene únicamente elementos `<image>`; la traslación del ramo es una animación CSS nativa ligada al scroll, no un redibujo vectorial.

## Respuesta y Firebase

La invitación inicia Firebase Anonymous Auth al confirmar y hace una sola creación de `responses/gaby-ramo` mediante `setDoc`, con `accepted`, `createdAt: serverTimestamp()`, `inviteId`, `recipients` y `responderUid`. El cliente no lee respuestas; `localStorage` solo conserva el estado visual de esta invitación. Las reglas locales mantienen la creación única por documento y la denegación predeterminada.

`firebase-config.js` contiene configuración cliente pública del proyecto `padrinos-de-anillo-2027`, no credenciales administrativas. Para guardar respuestas, Anonymous Auth debe estar habilitado y las reglas correspondientes deben estar publicadas en Firebase. Este proyecto no despliega reglas ni incluye credenciales administrativas.

## GitHub Pages

El workflow `.github/workflows/pages.yml` publica la raíz del sitio desde GitHub Actions cuando se actualiza la rama `main` o se ejecuta manualmente. Esta implementación no crea, modifica ni publica repositorios remotos.
