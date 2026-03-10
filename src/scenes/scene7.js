import * as THREE from "three";

export function scene7(container){

/* =========================
   SCENE
========================= */

const scene = new THREE.Scene();

/* =========================
   CAMERA
========================= */

const camera = new THREE.PerspectiveCamera(
60,
container.clientWidth/container.clientHeight,
0.1,
1000
);

camera.position.set(0,3,18);
camera.lookAt(0,0,0);

/* =========================
   RENDERER
========================= */

const renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setSize(container.clientWidth,container.clientHeight);
container.appendChild(renderer.domElement);

/* =========================
   LIGHTS
========================= */

const light = new THREE.PointLight(0xffffff,1.5);
light.position.set(10,10,10);
scene.add(light);

scene.add(new THREE.AmbientLight(0x404040));

/* =========================
   EARTH
========================= */

const earth = new THREE.Mesh(
new THREE.SphereGeometry(0.7,32,32),
new THREE.MeshStandardMaterial({color:0x00aaff})
);

scene.add(earth);

/* =========================
   SUN
========================= */

const sun = new THREE.Mesh(
new THREE.SphereGeometry(0.8,32,32),
new THREE.MeshStandardMaterial({color:0xffff00})
);

scene.add(sun);

/* =========================
   PLANET FUNCTION
========================= */

function createPlanet(color,size){
return new THREE.Mesh(
new THREE.SphereGeometry(size,32,32),
new THREE.MeshStandardMaterial({color})
);
}

/* =========================
   PLANETS
========================= */

const mercury = createPlanet(0x0c940c,0.25);
const venus   = createPlanet(0xffffff,0.30);
const mars    = createPlanet(0xd30d0d,0.35);
const jupiter = createPlanet(0xb69900,0.50);
const saturn  = createPlanet(0xd19686,0.45);

scene.add(mercury,venus,mars,jupiter,saturn);

/* =========================
   LABEL FUNCTION
========================= */

function createLabel(text){

const label = document.createElement("div");

label.style.position = "absolute";
label.style.color = "white";
label.style.fontSize = "14px";
label.style.fontWeight = "bold";
label.style.pointerEvents = "none";
label.style.transform = "translate(-50%, -50%)";
label.style.zIndex = "100";

label.innerHTML = text;

document.body.appendChild(label);   // 🔥 IMPORTANT CHANGE
label.style.background = "rgba(0,0,0,0.6)";
label.style.padding = "2px 6px";
label.style.borderRadius = "4px";
return label;

}

const mercuryLabel=createLabel("Mercury");
const venusLabel=createLabel("Venus");
const marsLabel=createLabel("Mars");
const jupiterLabel=createLabel("Jupiter");
const saturnLabel=createLabel("Saturn");

/* =========================
   LABEL UPDATE
========================= */
function updateLabel(label, mesh) {

  const vector = mesh.position.clone();
  vector.project(camera);

  const rect = container.getBoundingClientRect();

  const x = (vector.x * 0.5 + 0.3) * rect.width + rect.left;
  const y = (-vector.y * 0.5 + 0.5) * rect.height + rect.top;

  label.style.left = x + "px";
  label.style.top = (y - 15) + "px";

}

/* =========================
   ANIMATION
========================= */

let t = 0;

function animate(){

requestAnimationFrame(animate);

t += 0.01;

/* Sun orbiting Earth */

sun.position.set(
6*Math.cos(t),
0,
6*Math.sin(t)
);

/* Planets orbit Sun (larger radius) */

mercury.position.set(
sun.position.x + 2.5*Math.cos(t*2),
0,
sun.position.z + 2.5*Math.sin(t*2)
);

venus.position.set(
sun.position.x + 4*Math.cos(t*1.6),
0,
sun.position.z + 4*Math.sin(t*1.6)
);

mars.position.set(
sun.position.x + 6*Math.cos(t*0.8),
0,
sun.position.z + 6*Math.sin(t*0.8)
);

jupiter.position.set(
sun.position.x + 9*Math.cos(t*0.5),
0,
sun.position.z + 9*Math.sin(t*0.5)
);

saturn.position.set(
sun.position.x + 12*Math.cos(t*0.3),
0,
sun.position.z + 12*Math.sin(t*0.3)
);

/* Update labels */

updateLabel(mercuryLabel,mercury);
updateLabel(venusLabel,venus);
updateLabel(marsLabel,mars);
updateLabel(jupiterLabel,jupiter);
updateLabel(saturnLabel,saturn);

/* Render */

renderer.render(scene,camera);

}

animate();

/* =========================
   RESIZE
========================= */

window.addEventListener("resize",()=>{

camera.aspect=container.clientWidth/container.clientHeight;
camera.updateProjectionMatrix();

renderer.setSize(container.clientWidth,container.clientHeight);

});

}