# Invitación para Gaby

Sitio estático mobile-first para invitar a Gaby a ser madrina de ramo para lanzar. Está hecho con HTML, CSS y JavaScript nativos y puede publicarse en GitHub Pages mediante `.github/workflows/pages.yml`.

## Vista local

Sirve esta carpeta por HTTP para que funcionen los módulos ES y Firebase. Por ejemplo, con Node instalado:

```powershell
npx --yes serve . -l 4177
```

Después abre `http://localhost:4177`. La comprobación estática del proyecto se ejecuta con `npm run check`.

## Imagen principal

Los recortes transparentes del hero están en `assets/templo-transparente.png` y `assets/ramo-transparente.png`. El SVG está en línea en `index.html` para que el navegador cargue ambos PNG; no dibuja elementos adicionales. El ramo recorre una trayectoria SVG invisible ligada al desplazamiento de la página. Con “reducir movimiento” activado, la composición permanece estática.

## Respuesta y Firebase

La invitación autentica de forma anónima al enviar el sí y crea `responses/gaby-ramo` con una sola escritura `setDoc`. No consulta documentos. Firestore limita la ruta a una respuesta de creación y el navegador usa `localStorage` solo para mostrar el estado después de una respuesta exitosa.

`firebase-config.js` contiene configuración cliente pública para el proyecto existente `padrinos-de-anillo-2027`; no se deben colocar credenciales administrativas ni secretos en este sitio.

Para aceptar respuestas en producción, la autenticación anónima debe estar habilitada en Firebase Authentication y las reglas locales deben publicarse en el mismo proyecto. No se incluyen credenciales administrativas.

`firestore.rules` conserva las reglas desplegadas de Mary/Everardo y Felipe, añade Gaby y Caro con creación única por ruta, y mantiene la denegación predeterminada. La página no puede leer respuestas; Firestore deniega una segunda creación. Estas reglas son el archivo común de ambos sitios.

## GitHub Pages

El sitio se publica desde `JesusINF/gaby-madrina-de-ramo` con **GitHub Actions** al subir cambios a `main`. El workflow publica la raíz del repositorio.
