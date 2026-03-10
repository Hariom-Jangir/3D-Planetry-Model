export function scene6() {

  const container = document.createElement("div");
  container.id = "scene6";

  container.innerHTML = `

  <div class="scene6-wrapper">

      <h1 class="scene6-title">
        Manda and Sighra Corrections
      </h1>

      <p class="scene6-theory">
        In the traditional Indian planetary model, the mean longitude of a planet
        is corrected using two important corrections: <b>Manda</b> and
        <b>Sighra</b>. The Manda correction accounts for the non-uniform motion
        of planets due to the eccentricity of their orbit. The Sighra correction
        accounts for the motion relative to the Sun.
      </p>

      <div class="scene6-images">

          <div class="diagram">
              <h3>Manda Correction</h3>
              <img src="/manda.png"/>
          </div>

          <div class="diagram">
              <h3>Sighra Correction</h3>
              <img src="/sighra.png"/>
          </div>

      </div>

      <p class="scene6-theory">
        The first diagram shows the geometric construction used to obtain the
        manda-sphuṭa from the mean longitude using the epicycle approach.
        The second diagram shows the sighra correction for exterior planets
        where the position of the Sun influences the apparent planetary motion.
      </p>

  </div>

  `;

  document.body.appendChild(container);
}