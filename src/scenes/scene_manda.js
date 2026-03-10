import * as THREE from "three";

export function sceneManda(scene) {

  const group = new THREE.Group();
  scene.add(group);

  // Constants (scaled)
  const R = 6;   // deferent radius
  const r = 2;   // epicycle radius

  /* Deferent circle */
  const deferent = new THREE.Mesh(
    new THREE.RingGeometry(R - 0.02, R + 0.02, 128),
    new THREE.MeshBasicMaterial({
      color: 0xffffff,
      side: THREE.DoubleSide
    })
  );
  deferent.rotation.x = Math.PI / 2;
  group.add(deferent);

  /* Mean planet P0 (madhyama) */
  const meanPlanet = new THREE.Mesh(
    new THREE.SphereGeometry(0.15, 16, 16),
    new THREE.MeshStandardMaterial({ color: 0x00ffcc })
  );
  group.add(meanPlanet);

  /* True planet P (manda-sphuṭa) */
  const truePlanet = new THREE.Mesh(
    new THREE.SphereGeometry(0.18, 16, 16),
    new THREE.MeshStandardMaterial({ color: 0xff4444 })
  );
  group.add(truePlanet);

  let theta0 = 0;             // mean longitude θ₀
  const thetaM = Math.PI / 3; // mandocca θₘ

  function update() {
    theta0 += 0.003;

    // Mean planet position (P₀)
    meanPlanet.position.set(
      R * Math.cos(theta0),
      0,
      R * Math.sin(theta0)
    );

    // Manda-kendra (θ₀ − θₘ)
    const delta = theta0 - thetaM;

    // Manda correction Δθ (visual form)
    const deltaTheta = (r / R) * Math.sin(delta);

    // True longitude θ_ms
    const thetaMS = theta0 - deltaTheta;

    // True planet position (P)
    truePlanet.position.set(
      R * Math.cos(thetaMS),
      0,
      R * Math.sin(thetaMS)
    );
  }

  return { group, update };
}
