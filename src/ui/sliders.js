export function createSliders(cube) {

  const container = document.createElement("div");
  container.id = "slider-ui";
  document.body.appendChild(container);

  const axes = ["X", "Y", "Z"];

  axes.forEach((axis) => {
    const wrapper = document.createElement("div");

    const label = document.createElement("label");
    label.innerText = `${axis}: `;

    const input = document.createElement("input");
    input.type = "range";
    input.min = -5;
    input.max = 5;
    input.step = 0.1;
    input.value = cube.position[axis.toLowerCase()];

    input.addEventListener("input", () => {
      cube.position[axis.toLowerCase()] = input.value;
    });

    wrapper.appendChild(label);
    wrapper.appendChild(input);
    container.appendChild(wrapper);
  });
}
