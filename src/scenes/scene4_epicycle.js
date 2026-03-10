import * as THREE from "three";

export function sceneEpicycle(scene) {

  const group = new THREE.Group();
  scene.add(group);

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
     CONSTANTS
  ====================== */

  const R = 6;     
  const r = 1.8;   
  const thetaM = Math.PI / 4;

  let theta0 = 0;
  let useEpicycle = true;

  /* ======================
     DEFERENT
  ====================== */

  const deferent = new THREE.Mesh(
    new THREE.RingGeometry(R - 0.02, R + 0.02, 128),
    new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide })
  );

  deferent.rotation.x = Math.PI / 2;
  group.add(deferent);

  const deferentLabel = createLabel("Deferent");
  deferentLabel.position.set(R + 1, 0.5, 0);
  group.add(deferentLabel);

  /* ======================
     MAND-OCCA LINE
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

  const mandoccaLabel = createLabel("Mandocca");
  mandoccaLabel.position.set(
    R * Math.cos(thetaM) + 0.7,
    0.1,
    R * Math.sin(thetaM)
  );
  group.add(mandoccaLabel);

  /* ======================
     MEAN PLANET
  ====================== */

  const meanPlanet = new THREE.Mesh(
    new THREE.SphereGeometry(0.2, 16, 16),
    new THREE.MeshStandardMaterial({ color: 0x00ccff })
  );

  group.add(meanPlanet);

  const meanLabel = createLabel("Mean Planet P₀");
  meanLabel.position.set(0, 0.7, 0);
  meanPlanet.add(meanLabel);

  /* ======================
     EPICYCLE
  ====================== */

  const epicycle = new THREE.Mesh(
    new THREE.RingGeometry(r - 0.02, r + 0.02, 64),
    new THREE.MeshBasicMaterial({ color: 0xffaa00, side: THREE.DoubleSide })
  );

  epicycle.rotation.x = Math.PI / 2;
  group.add(epicycle);

  const epicycleLabel = createLabel("Epicycle");
  epicycleLabel.position.set(r + 0.5, 0.6, 0);
  epicycle.add(epicycleLabel);

  /* ======================
     TRUE PLANET
  ====================== */

  const truePlanet = new THREE.Mesh(
    new THREE.SphereGeometry(0.22, 16, 16),
    new THREE.MeshStandardMaterial({ color: 0xff3333 })
  );

  group.add(truePlanet);

  const trueLabel = createLabel("True Planet P");
  trueLabel.position.set(0, 0.7, 0);
  truePlanet.add(trueLabel);

  /* ======================
     ECCENTRIC CENTER
  ====================== */

  const eccentricCenter = new THREE.Mesh(
    new THREE.SphereGeometry(0.12, 12, 12),
    new THREE.MeshStandardMaterial({ color: 0xff00ff })
  );

  eccentricCenter.visible = false;
  group.add(eccentricCenter);

  const eccLabel = createLabel("Eccentric Center O'");
  eccLabel.position.set(0, 0.7, 0);
  eccentricCenter.add(eccLabel);

  /* ======================
     UPDATE
  ====================== */

  function update() {

    theta0 += 0.004;

    const x0 = R * Math.cos(theta0);
    const z0 = R * Math.sin(theta0);

    meanPlanet.position.set(x0, 0, z0);

    epicycle.position.copy(meanPlanet.position);

    if (useEpicycle) {

      truePlanet.position.set(
        x0 + r * Math.cos(thetaM),
        0,
        z0 + r * Math.sin(thetaM)
      );

      eccentricCenter.visible = false;
      epicycle.visible = true;

    } else {

      eccentricCenter.position.set(
        r * Math.cos(thetaM),
        0,
        r * Math.sin(thetaM)
      );

      eccentricCenter.visible = true;

      truePlanet.position.set(
        eccentricCenter.position.x + R * Math.cos(theta0),
        0,
        eccentricCenter.position.z + R * Math.sin(theta0)
      );

      epicycle.visible = false;
    }
  }

  /* ======================
     TOGGLE
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