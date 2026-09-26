import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import { getAuth, signInAnonymously } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";
import { doc, getFirestore, serverTimestamp, setDoc } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";
import { firebaseConfig } from "./firebase-config.js";

const INVITATION_ID = "gaby-ramo";
const RESPONSE_KEY = `wedding-response:${INVITATION_ID}`;

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);
const openButton = document.querySelector("#open-confirm");
const confirmButton = document.querySelector("#confirm-accept");
const cancelButton = document.querySelector("#cancel-accept");
const dialog = document.querySelector("#confirm-dialog");
const responseStatus = document.querySelector("#response-status");
const confirmStatus = document.querySelector("#confirm-status");
const heroArt = document.querySelector(".hero__art");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

let authRequest;
let isSubmitting = false;

function hasLocalResponse() {
  try {
    return window.localStorage.getItem(RESPONSE_KEY) === "accepted";
  } catch {
    return false;
  }
}

function rememberLocalResponse() {
  try {
    window.localStorage.setItem(RESPONSE_KEY, "accepted");
  } catch {
    // The Firestore create-only rule remains the duplicate-response guard.
  }
}

function showAcceptedState() {
  openButton.disabled = true;
  openButton.textContent = "Respuesta recibida";
  responseStatus.textContent = "¡Qué alegría, Gaby! Tu respuesta quedó confirmada.";
}

function setSubmitting(isLoading) {
  isSubmitting = isLoading;
  confirmButton.disabled = isLoading;
  cancelButton.disabled = isLoading;
  confirmButton.textContent = isLoading ? "Guardando respuesta…" : "Sí, acepto";
}

async function getAnonymousUser() {
  if (auth.currentUser) return auth.currentUser;
  if (!authRequest) {
    authRequest = signInAnonymously(auth)
      .then(({ user }) => user)
      .catch((error) => {
        authRequest = undefined;
        throw error;
      });
  }
  return authRequest;
}

openButton.addEventListener("click", () => {
  if (hasLocalResponse() || isSubmitting) return;
  confirmStatus.textContent = "";
  dialog.showModal();
});

cancelButton.addEventListener("click", () => {
  if (!isSubmitting) dialog.close();
});

confirmButton.addEventListener("click", async () => {
  if (hasLocalResponse() || isSubmitting) return;

  setSubmitting(true);
  confirmStatus.textContent = "Conectando y guardando tu respuesta…";
  try {
    const user = await getAnonymousUser();
    await setDoc(doc(db, "responses", INVITATION_ID), {
      accepted: true,
      createdAt: serverTimestamp(),
      inviteId: INVITATION_ID,
      recipients: ["Gaby"],
      responderUid: user.uid
    });

    rememberLocalResponse();
    dialog.close();
    showAcceptedState();
  } catch (error) {
    confirmStatus.textContent = error?.code === "permission-denied"
      ? "No pudimos confirmar el registro. Si ya respondiste desde otro dispositivo, tu respuesta no se duplicará."
      : "No pudimos guardar tu respuesta. Revisa tu conexión e inténtalo de nuevo.";
  } finally {
    setSubmitting(false);
  }
});

dialog.addEventListener("click", (event) => {
  if (event.target === dialog && !isSubmitting) dialog.close();
});

if (hasLocalResponse()) showAcceptedState();

if (
  heroArt &&
  !CSS.supports("animation-timeline: scroll(root block)") &&
  !reducedMotion.matches &&
  "IntersectionObserver" in window
) {
  const scrollMotionObserver = new IntersectionObserver((entries, observer) => {
    if (entries.some((entry) => entry.isIntersecting)) {
      heroArt.classList.add("is-scroll-active");
      observer.disconnect();
    }
  }, { threshold: 0, rootMargin: "0px 0px -45% 0px" });

  const scrollMotionTrigger = document.querySelector(".letter");
  if (scrollMotionTrigger) scrollMotionObserver.observe(scrollMotionTrigger);
}

if ("IntersectionObserver" in window && !reducedMotion.matches) {
  document.documentElement.classList.add("motion-ready");
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.16, rootMargin: "0px 0px -8%" });

  document.querySelectorAll("[data-reveal]").forEach((element) => revealObserver.observe(element));
}
