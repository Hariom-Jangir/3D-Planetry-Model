import * as THREE from "three";

export function scene2(scene) {

  // Group for Scene 2
  const spaceGroup = new THREE.Group();
  scene.add(spaceGroup);

  // Axes Helper (X=red, Y=green, Z=blue)
  const axes = new THREE.AxesHelper(5);
  spaceGroup.add(axes);

  // Grid Helper
  const grid = new THREE.GridHelper(10, 10);
  spaceGroup.add(grid);

  // Cube at origin initially
  const cube = new THREE.Mesh(
    new THREE.BoxGeometry(0.5, 0.5, 0.5),
    new THREE.MeshStandardMaterial({ color: 0x00ffff })
  );
  cube.position.set(1, 1, 1); // initial (x, y, z)
  spaceGroup.add(cube);

  return { spaceGroup, cube };
}
