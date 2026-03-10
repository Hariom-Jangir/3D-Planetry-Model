import * as THREE from "three";

export function addLights(scene) {
  const ambient = new THREE.AmbientLight(0xffffff, 0.3);
  scene.add(ambient);

  const point = new THREE.PointLight(0xffaa00, 2);
  scene.add(point);
}
