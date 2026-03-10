import * as THREE from "three";

export function sceneSighra(scene) {

  const group = new THREE.Group();

  // SHIFT WHOLE SYSTEM TO RIGHT
  group.position.x = 3;

  scene.add(group);

  /* ======================
     CONSTANTS (scaled)
  ====================== */

  const R = 8;      // Earth–Sun distance (bigger orbit)
  const rs = 4;     // Planet–Sun distance

  let thetaMS = 0;
  let thetaS  = 0;

  /* ======================
     LABEL FUNCTION
  ====================== */

  function createLabel(text) {

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = 256;
    canvas.height = 128;

    ctx.fillStyle = "white";
    ctx.font = "28px Arial";
    ctx.textAlign = "center";

    ctx.fillText(text, 128, 64);

    const texture = new THREE.CanvasTexture(canvas);

    const material = new THREE.SpriteMaterial({
      map: texture,
      transparent: true
    });

    const sprite = new THREE.Sprite(material);

    sprite.scale.set(2, 1, 1);

    return sprite;
  }

  /* ======================
     EARTH
  ====================== */

  const earth = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 32, 32),
    new THREE.MeshStandardMaterial({ color: 0x00aaff })
  );

  group.add(earth);

  const earthLabel = createLabel("Earth");
  earthLabel.position.set(0, 1, 0);
  earth.add(earthLabel);

  /* ======================
     SUN
  ====================== */

  const sun = new THREE.Mesh(
    new THREE.SphereGeometry(0.7, 32, 32),
    new THREE.MeshStandardMaterial({ color: 0xffff00 })
  );

  group.add(sun);

  const sunLabel = createLabel("Sun");
  sunLabel.position.set(0, 1.2, 0);
  sun.add(sunLabel);

  /* ======================
     PLANET BEFORE CORRECTION
  ====================== */

  const mandaPlanet = new THREE.Mesh(
    new THREE.SphereGeometry(0.45, 32, 32),
    new THREE.MeshStandardMaterial({ color: 0xff6666 })
  );

  group.add(mandaPlanet);

  const mandaLabel = createLabel("Manda Planet");
  mandaLabel.position.set(0, 1, 0);
  mandaPlanet.add(mandaLabel);

  /* ======================
     TRUE PLANET
  ====================== */

  const truePlanet = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 32, 32),
    new THREE.MeshStandardMaterial({ color: 0x00ff88 })
  );

  group.add(truePlanet);

  const trueLabel = createLabel("True Planet");
  trueLabel.position.set(0, 1, 0);
  truePlanet.add(trueLabel);

  /* ======================
     UPDATE FUNCTION
  ====================== */

  function update() {

    thetaMS += 0.003;
    thetaS  += 0.004;

    /* Sun position */

    sun.position.set(
      R * Math.cos(thetaS),
      0,
      R * Math.sin(thetaS)
    );

    /* Manda planet */

    mandaPlanet.position.set(
      rs * Math.cos(thetaMS),
      0,
      rs * Math.sin(thetaMS)
    );

    /* Śīghra-kendra */

    const sigma = thetaS - thetaMS;

    /* Correction */

    const delta = Math.atan2(
      rs * Math.sin(sigma),
      R + rs * Math.cos(sigma)
    );

    const thetaTrue = thetaMS + delta;

    /* True planet */

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