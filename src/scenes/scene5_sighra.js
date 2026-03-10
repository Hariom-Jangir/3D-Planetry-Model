import * as THREE from "three";

export function sceneSighra(scene) {

  const group = new THREE.Group();
  scene.add(group);

  /* ======================
     CONSTANTS (scaled)
  ====================== */
  const R = 6;     // Earth–Sun distance
  const rs = 3;    // Planet–Sun distance (scaled)

  let thetaMS = 0;   // manda-sphuṭa
  let thetaS  = 0;   // mean Sun

  /* ======================
     EARTH (E)
  ====================== */
  const earth = new THREE.Mesh(
    new THREE.SphereGeometry(0.25, 16, 16),
    new THREE.MeshStandardMaterial({ color: 0x00aaff })
  );
  group.add(earth);

  /* ======================
     SUN (S)
  ====================== */
  const sun = new THREE.Mesh(
    new THREE.SphereGeometry(0.3, 16, 16),
    new THREE.MeshStandardMaterial({ color: 0xffff00 })
  );
  group.add(sun);

  /* ======================
     PLANET (P) – before correction
  ====================== */
  const mandaPlanet = new THREE.Mesh(
    new THREE.SphereGeometry(0.2, 16, 16),
    new THREE.MeshStandardMaterial({ color: 0xff6666 })
  );
  group.add(mandaPlanet);

  /* ======================
     TRUE PLANET – after śīghra
  ====================== */
  const truePlanet = new THREE.Mesh(
    new THREE.SphereGeometry(0.22, 16, 16),
    new THREE.MeshStandardMaterial({ color: 0x00ff88 })
  );
  group.add(truePlanet);

  /* ======================
     UPDATE FUNCTION
  ====================== */
  function update() {
    thetaMS += 0.003;   // manda motion
    thetaS  += 0.004;   // Sun motion

    /* Sun position */
    sun.position.set(
      R * Math.cos(thetaS),
      0,
      R * Math.sin(thetaS)
    );

    /* Planet (manda-sphuṭa) */
    mandaPlanet.position.set(
      rs * Math.cos(thetaMS),
      0,
      rs * Math.sin(thetaMS)
    );

    /* Śīghra-kendra σ */
    const sigma = thetaS - thetaMS;

    /* Śīghra correction (simplified visual form) */
    const delta =
      Math.atan2(
        rs * Math.sin(sigma),
        R + rs * Math.cos(sigma)
      );

    const thetaTrue = thetaMS + delta;

    /* True geocentric planet */
    truePlanet.position.set(
      rs * Math.cos(thetaTrue),
      0,
      rs * Math.sin(thetaTrue)
    );
  }

  return {
    group,
    update
  };
}
