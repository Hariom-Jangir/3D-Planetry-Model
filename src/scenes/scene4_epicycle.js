import * as THREE from "three";

export function sceneEpicycle(scene) {

  const group = new THREE.Group();
  scene.add(group);

  /* ======================
     CONSTANTS (scaled)
  ====================== */
  const R = 6;     // deferent radius (trijya)
  const r = 1.8;   // epicycle radius
  const thetaM = Math.PI / 4; // mandocca direction

  let theta0 = 0;
  let useEpicycle = true; // toggle state

  /* ======================
     DEFERENT CIRCLE
  ====================== */
  const deferent = new THREE.Mesh(
    new THREE.RingGeometry(R - 0.02, R + 0.02, 128),
    new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide })
  );
  deferent.rotation.x = Math.PI / 2;
  group.add(deferent);

  /* ======================
     MAND-OCCA DIRECTION (OU)
  ====================== */
  const mandoccaLine = new THREE.Line(
    new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(
        R * Math.cos(thetaM),
        0,
        R * Math.sin(thetaM)
      )
    ]),
    new THREE.LineBasicMaterial({ color: 0xffff00 })
  );
  group.add(mandoccaLine);

  /* ======================
     MEAN PLANET P₀
  ====================== */
  const meanPlanet = new THREE.Mesh(
    new THREE.SphereGeometry(0.18, 16, 16),
    new THREE.MeshStandardMaterial({ color: 0x00ccff })
  );
  group.add(meanPlanet);

  /* ======================
     EPICYCLE (centered at P₀)
  ====================== */
  const epicycle = new THREE.Mesh(
    new THREE.RingGeometry(r - 0.02, r + 0.02, 64),
    new THREE.MeshBasicMaterial({ color: 0xffaa00, side: THREE.DoubleSide })
  );
  epicycle.rotation.x = Math.PI / 2;
  group.add(epicycle);

  /* ======================
     TRUE PLANET P
  ====================== */
  const truePlanet = new THREE.Mesh(
    new THREE.SphereGeometry(0.2, 16, 16),
    new THREE.MeshStandardMaterial({ color: 0xff3333 })
  );
  group.add(truePlanet);

  /* ======================
     ECCENTRIC CENTER O′
  ====================== */
  const eccentricCenter = new THREE.Mesh(
    new THREE.SphereGeometry(0.1, 12, 12),
    new THREE.MeshStandardMaterial({ color: 0xff00ff })
  );
  eccentricCenter.visible = false;
  group.add(eccentricCenter);

  /* ======================
     UPDATE FUNCTION
  ====================== */
  function update() {
    theta0 += 0.004;

    /* Mean planet on deferent */
    const x0 = R * Math.cos(theta0);
    const z0 = R * Math.sin(theta0);
    meanPlanet.position.set(x0, 0, z0);

    /* Move epicycle with P₀ */
    epicycle.position.copy(meanPlanet.position);

    if (useEpicycle) {
      /* ---------- EPICYCLE MODEL ---------- */

      // P₀P parallel to OU
      truePlanet.position.set(
        x0 + r * Math.cos(thetaM),
        0,
        z0 + r * Math.sin(thetaM)
      );

      eccentricCenter.visible = false;
      epicycle.visible = true;

    } else {
      /* ---------- ECCENTRIC MODEL ---------- */

      // O′ displaced along mandocca
      eccentricCenter.position.set(
        r * Math.cos(thetaM),
        0,
        r * Math.sin(thetaM)
      );
      eccentricCenter.visible = true;

      // True planet on eccentric circle
      truePlanet.position.set(
        eccentricCenter.position.x + R * Math.cos(theta0),
        0,
        eccentricCenter.position.z + R * Math.sin(theta0)
      );

      epicycle.visible = false;
    }
  }

  /* ======================
     TOGGLE FUNCTION
  ====================== */
  function toggleModel() {
    useEpicycle = !useEpicycle;
  }

  return {
    group,
    update,
    toggleModel
  };
}
