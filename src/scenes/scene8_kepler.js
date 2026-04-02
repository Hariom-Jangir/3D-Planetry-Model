import * as THREE from "three";

export function scene8(scene) {

  const group = new THREE.Group();
  scene.add(group);

  /* =========================
     SUN (FOCUS)
  ========================= */
  const sun = new THREE.Mesh(
    new THREE.SphereGeometry(0.4, 32, 32),
    new THREE.MeshStandardMaterial({ color: "yellow" })
  );
  group.add(sun);

  /* =========================
     ELLIPSE ORBIT
  ========================= */
  const a = 6;   // semi-major
  const b = 4;   // semi-minor

  const curve = new THREE.EllipseCurve(
    0, 0,
    a, b,
    0, 2 * Math.PI,
    false,
    0
  );

  const points = curve.getPoints(100);
  const geometry = new THREE.BufferGeometry().setFromPoints(
    points.map(p => new THREE.Vector3(p.x, 0, p.y))
  );

  const orbit = new THREE.Line(
    geometry,
    new THREE.LineBasicMaterial({ color: 0x00ffff })
  );

  group.add(orbit);

  /* =========================
     PLANET
  ========================= */
  const planet = new THREE.Mesh(
    new THREE.SphereGeometry(0.25, 32, 32),
    new THREE.MeshStandardMaterial({ color: "blue" })
  );

  group.add(planet);

  /* =========================
     FOCUS SHIFT (IMPORTANT)
  ========================= */
  const e = Math.sqrt(1 - (b * b) / (a * a)); // eccentricity
  const focusOffset = a * e;

  sun.position.set(-focusOffset, 0, 0);

  /* =========================
     ANIMATION (AREA LAW)
  ========================= */
  let t = 0;

  function update() {

    t += 0.01;

    const x = a * Math.cos(t);
    const z = b * Math.sin(t);

    planet.position.set(x, 0, z);
  }

  return { group, update };
}