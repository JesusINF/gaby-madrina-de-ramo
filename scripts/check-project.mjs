import { readFile } from "node:fs/promises";

const read = (path) => readFile(new URL(path, import.meta.url), "utf8");
const [html, app, css, rules, workflow, firebaseConfig] = await Promise.all([
  read("../index.html"),
  read("../app.js"),
  read("../styles.css"),
  read("../firestore.rules"),
  read("../.github/workflows/pages.yml"),
  read("../firebase-config.js")
]);
const svg = html.match(/<svg\b[\s\S]*?<\/svg>/)?.[0] ?? "";

const failures = [];
const expect = (condition, message) => {
  if (!condition) failures.push(message);
};

expect(html.includes('<html lang="es-MX">'), "HTML should declare Spanish language.");
expect(html.includes('id="hero-title"') && html.includes('id="open-confirm"'), "Invitation heading and response action should exist.");
expect(svg.includes('href="assets/templo-transparente.png"') && svg.includes('href="assets/ramo-transparente.png"'), "Inline SVG should reference the generated transparent cutouts.");
expect(html.includes('<time datetime="2027-01-23">23-01-2027</time>') && html.includes("La Piedad,") && html.includes("Michoacán"), "Invitation should include the date and place.");
expect(app.includes('doc(db, "responses", INVITATION_ID)'), "Response should target the invitation document.");
expect(app.includes('const INVITATION_ID = "gaby-ramo"'), "Invitation id should be fixed to gaby-ramo.");
expect(app.includes('recipients: ["Gaby"]') && app.includes("serverTimestamp()"), "Response payload should include recipient and server timestamp.");
expect(app.includes("signInAnonymously(auth)") && app.includes("setDoc("), "Submission should use anonymous auth and setDoc.");
expect(!/\b(getDoc|getDocs|onSnapshot|updateDoc|deleteDoc)\s*\(/.test(app), "Client should not read response documents or modify/delete them.");
expect(["mary-everardo", "felipe-banda", "gaby-ramo", "caro-cuchillo-pala"].every((id) => rules.includes(`match /responses/${id}`)), "Rules should retain deployed Mary/Felipe invitations and include both new paths.");
expect(rules.includes("match /{document=**}") && rules.includes("allow read, write: if false;"), "Rules should keep default deny.");
expect(svg.includes("<animateMotion") && svg.includes('begin="indefinite"'), "Bouquet motion should be native SVG and controlled by JavaScript scroll progress.");
expect(!/<(?:path|circle|rect|text|polygon|line|polyline)\b/i.test(svg), "Hero SVG should not add drawn artwork or text.");
expect(app.includes("setCurrentTime(svgMotionStart + progress * 1.4)") && app.includes('addEventListener("scroll", scrubBouquetToScroll'), "SVG bouquet motion should be linked to scroll.");
expect(css.includes("prefers-reduced-motion") && app.includes("reducedMotion.matches"), "Motion should honor the reduced-motion preference.");
expect(css.includes("@media (min-width: 760px)"), "Styles should support wider layouts.");
expect(workflow.includes("actions/deploy-pages@v4") && workflow.includes("actions/upload-pages-artifact@v3"), "GitHub Pages workflow should deploy the static site.");
expect(firebaseConfig.includes('projectId: "padrinos-de-anillo-2027"'), "Public client config should target the existing Firebase project.");

if (failures.length) {
  for (const failure of failures) process.stderr.write(`FAIL: ${failure}\n`);
  process.exitCode = 1;
} else {
  process.stdout.write("Project checks passed: static invitation, create-only submission contract, local rules, motion/accessibility, and Pages workflow.\n");
}
