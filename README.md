# Invitación para Gaby

Sitio estático mobile-first para invitar a Gaby a ser madrina de ramo para lanzar. Está hecho con HTML, CSS y JavaScript nativos y puede publicarse en GitHub Pages mediante `.github/workflows/pages.yml`.

## Vista local

Sirve esta carpeta por HTTP para que funcionen los módulos ES y Firebase. Por ejemplo, con Node instalado:

```powershell
npx --yes serve . -l 4177
```

Después abre `http://localhost:4177`. La comprobación estática del proyecto se ejecuta con `npm run check`.

## Imagen principal

Los recortes del hero son PNG RGBA transparentes generados con IA y están en `assets/templo-transparente.png` y `assets/ramo-transparente.png`. El SVG está en línea en `index.html` y compone ambos PNG mediante `<image>`, sin trazos vectoriales que redibujen el arte.

La integración disponible de `@app-6a3293e129088191abf0875820e839da` solo ofrece el flujo `website-builder-flow` y sus modelos de generación declaran salida `image`, no `svg`. Por eso las imágenes se conservaron como raster transparente y se animan dentro del SVG, en lugar de etiquetarlas como vectores generados. El ramo usa un scroll timeline CSS nativo (`0–22vh`), con transición activada por `IntersectionObserver` como respaldo; con “reducir movimiento” activado, permanece estático.

## Respuesta y Firebase

La invitación autentica de forma anónima al enviar el sí y crea `responses/gaby-ramo` con una sola escritura `setDoc`. No consulta documentos. Firestore limita la ruta a una respuesta de creación y el navegador usa `localStorage` solo para mostrar el estado después de una respuesta exitosa.

`firebase-config.js` contiene configuración cliente pública para el proyecto existente `padrinos-de-anillo-2027`; no se deben colocar credenciales administrativas ni secretos en este sitio.

Para aceptar respuestas en producción, la autenticación anónima debe estar habilitada en Firebase Authentication y las reglas locales deben publicarse en el mismo proyecto. No se incluyen credenciales administrativas.

`firestore.rules` conserva las reglas desplegadas de Mary/Everardo y Felipe, añade Gaby y Caro con creación única por ruta, y mantiene la denegación predeterminada. Las reglas locales aún deben publicarse en Firebase para activar las respuestas de Gaby y Caro; hasta entonces, el sitio no puede guardar su aceptación. La página no lee respuestas y las reglas deniegan lecturas, cambios y creaciones repetidas. Este archivo es común a ambos sitios.

## GitHub Pages

El sitio se publica desde `JesusINF/gaby-madrina-de-ramo` con **GitHub Actions** al subir cambios a `main`. El workflow publica la raíz del repositorio.
