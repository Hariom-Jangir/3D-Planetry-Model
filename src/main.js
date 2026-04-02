import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

import { createCamera } from "./utils/camera.js";
import { addLights } from "./utils/lights.js";

import { scene1 } from "./scenes/scene1_mean.js";
import { scene2 } from "./scenes/scene2_space.js";
import { sceneManda } from "./scenes/scene_manda.js";
import { sceneEpicycle } from "./scenes/scene4_epicycle.js";
import { sceneSighra } from "./scenes/scene5_sighra.js";
import { scene6 } from "./scenes/scene6.js";
import { createSliders } from "./ui/sliders.js";
import { scene7 } from "./scenes/scene7.js";
import { scene8 } from "./scenes/scene8_kepler.js";
/* =========================
   BASIC SETUP
========================= */

const canvas = document.getElementById("webgl");
const scene = new THREE.Scene();

/* Camera */
const camera = createCamera();
camera.position.set(5, 5, 5);
camera.lookAt(0, 0, 0);

/* Renderer */
const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/* Lights */
addLights(scene);

/* =========================
   ORBIT CONTROLS
========================= */

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.enabled = false;

/* =========================
   SCENES
========================= */

/* Scene 1 */
const { sun, planet, orbitGroup, solarSystem } = scene1(scene);

/* Scene 2 */
const { spaceGroup, cube } = scene2(scene);
spaceGroup.visible = false;
createSliders(cube);
const sliderUI = document.getElementById("slider-ui");
sliderUI.style.display = "none";

/* Scene 3 */
const mandaScene = sceneManda(scene);
mandaScene.group.visible = false;

/* Scene 4 */
const scene4 = sceneEpicycle(scene);
scene4.group.visible = false;

/* Scene 5 */
const sighraScene = sceneSighra(scene);
sighraScene.group.visible = false;

/* Scene 6 */
const scene6UI = scene6();


/* Scene 7 */
const container7 = document.getElementById("scene7-canvas");

if(container7){
  scene7(container7);
}

/* Scene 8 */
const keplerScene = scene8(scene);
keplerScene.group.visible = false;
/* =========================
   UI
========================= */

const toggleBtn = document.getElementById("toggleModel");
toggleBtn.style.display = "none";
toggleBtn.style.pointerEvents = "auto";

toggleBtn.addEventListener("click", () => {
  scene4.toggleModel();
});

/* =========================
   ANIMATION LOOP
========================= */

function animate() {
  requestAnimationFrame(animate);

  if (solarSystem.visible) {
    sun.rotation.y += 0.002;
    planet.rotation.y += 0.02;
    orbitGroup.rotation.y += 0.005;
  }

  if (spaceGroup.visible) controls.update();
  if (mandaScene.group.visible) mandaScene.update();
  if (scene4.group.visible) scene4.update();
  if (sighraScene.group.visible) sighraScene.update();
if (keplerScene.group.visible) keplerScene.update();
  renderer.render(scene, camera);
}
animate();

/* =========================
   SCROLL LOGIC (FINAL & STABLE)
========================= */

const pageHeight = window.innerHeight;
const scene2Panel = document.querySelector(".scene2 .theory-panel");
const scene5Panel = document.querySelector(".scene5 .theory-panel");
const scene4Panel = document.querySelector(".scene4 .theory-panel");
function hideAllScenes() {
  solarSystem.visible = false;
  spaceGroup.visible = false;
  mandaScene.group.visible = false;
  scene4.group.visible = false;
  sighraScene.group.visible = false;
  scene4Panel.style.display = "none";
  toggleBtn.style.display = "none";
  scene2Panel.style.display = "none";
  scene5Panel.style.display = "none";
  sliderUI.style.display = "none";

  controls.enabled = false;

  const s6 = document.querySelector(".scene6-page");
  if (s6) s6.style.display = "none";

  const s7 = document.querySelector(".scene7-page");
  if (s7) s7.style.display = "none";

  keplerScene.group.visible = false;

const s8 = document.querySelector(".scene8-page");
if (s8) s8.style.display = "none";
}

function handleScroll() {
  const y = window.scrollY;
  hideAllScenes();

  /* PAGE 1 — INTRO */
  if (y < pageHeight * 0.6) {
    solarSystem.visible = true;

    camera.position.set(5, 5, 5);
    camera.lookAt(0, 0, 0);
  }


  /* PAGE 2 — 3D SPACE */
  else if (y < pageHeight * 1.6) {
    spaceGroup.visible = true;
    controls.enabled = true;
    scene2Panel.style.display = "block";
    sliderUI.style.display = "flex";

    camera.position.set(6, 6, 6);
    camera.lookAt(0, 0, 0);
  }

  /* PAGE 3 — MANDA */
  else if (y < pageHeight * 2.6) {
    mandaScene.group.visible = true;

    camera.position.set(0, 6, 10);
    camera.lookAt(0, 0, 0);
  }

  /* PAGE 4 — EPICYCLE */
  /* PAGE 4 — EPICYCLE */
else if (y < pageHeight * 3.6) {
  scene4.group.visible = true;
  toggleBtn.style.display = "block";
  scene4Panel.style.display = "block";

  camera.position.set(0, 8, 12);
  camera.lookAt(0, 0, 0);
}
  /* PAGE 5 — ŚĪGHRA */
 /* PAGE 5 — ŚĪGHRA */
else if (y < pageHeight * 4.6) {

  sighraScene.group.visible = true;
  scene5Panel.style.display = "block";

  camera.position.set(0, 8, 12);
  camera.lookAt(0, 0, 0);

}

/* PAGE 6 — THEORY DIAGRAMS */
else if (y < pageHeight * 5.6) {

  const s6 = document.querySelector(".scene6-page");
  if (s6) s6.style.display = "flex";

}

/* PAGE 7 — NILAKANTHA MODEL */
else if (y < pageHeight * 6.6) {

  const s7 = document.querySelector(".scene7-page");
  if (s7) s7.style.display = "flex";

}
/* PAGE 8 — KEPLER MODEL */
else if (y < pageHeight * 9) {
  keplerScene.group.visible = true;

  const s8 = document.querySelector(".scene8-page");
  if (s8) s8.style.display = "flex";

  camera.position.set(0, 10, 15);
  camera.lookAt(0, 0, 0);
}
}

window.addEventListener("scroll", handleScroll);
handleScroll(); // 🔑 important for page load

/* =========================
   RESIZE
========================= */

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
