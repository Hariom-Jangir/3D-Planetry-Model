import * as THREE from "three";

export function scene1(scene) {

  /* 🌌 Stars (always visible) */
  const starGeometry = new THREE.BufferGeometry();
  const starCount = 1200;
  const positions = [];

  for (let i = 0; i < starCount; i++) {
    positions.push(
      (Math.random() - 0.5) * 300,
      (Math.random() - 0.5) * 300,
      (Math.random() - 0.5) * 300
    );
  }

  starGeometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(positions, 3)
  );

  const stars = new THREE.Points(
    starGeometry,
    new THREE.PointsMaterial({ color: 0xffffff })
  );
  scene.add(stars);

  /* ☀️ Solar system group (toggle on scroll) */
  const solarSystem = new THREE.Group();
  scene.add(solarSystem);

  // Sun
  const sun = new THREE.Mesh(
    new THREE.SphereGeometry(1.2, 32, 32),
    new THREE.MeshStandardMaterial({
      color: 0xffcc66,
      emissive: 0xffaa00,
      emissiveIntensity: 1
    })
  );
  solarSystem.add(sun);

  // Orbit group
  const orbitGroup = new THREE.Group();
  solarSystem.add(orbitGroup);

  // Planet
  const planet = new THREE.Mesh(
    new THREE.SphereGeometry(0.35, 32, 32),
    new THREE.MeshStandardMaterial({ color: 0x3399ff })
  );
  planet.position.x = 4;
  orbitGroup.add(planet);

  // Orbit ring
  const orbitRing = new THREE.Mesh(
    new THREE.RingGeometry(3.9, 4.1, 64),
    new THREE.MeshBasicMaterial({
      color: 0xffffff,
      side: THREE.DoubleSide
    })
  );
  orbitRing.rotation.x = Math.PI / 2;
  solarSystem.add(orbitRing);

  return { sun, planet, orbitGroup, solarSystem };
}
