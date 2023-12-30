document.onreadystatechange = () => {
  if (document.readyState === "complete") {
    // variables for some effects.
    let particles = [];
    let mousePosition = { x: 0, y: 0 };
    let dotPosition = { x: 0, y: 0 };

    // on-click actions
    var primaryMouseButtonDown = false;    
    function setPrimaryButtonState(e) {
      var flags = e.buttons !== undefined ? e.buttons : e.which;
      primaryMouseButtonDown = (flags & 1) === 1;
    }

    document.addEventListener("mousedown", setPrimaryButtonState);
    document.addEventListener("mousemove", setPrimaryButtonState);
    document.addEventListener("mouseup", setPrimaryButtonState);

    // TOUSE
    Array.prototype.random = function () {
      return this[Math.floor(Math.random() * this.length)];
    };

    // Basic math: Pythagorean theorem
    const calcDistance = (a, b) => {
      const disX = b.x - a.x;
      const disY = b.y - a.y;

      return Math.sqrt(Math.pow(disX, 2) + Math.pow(disY, 2));
    };

    // The big green circle. that eats others.
    const Maindot = document.getElementById("container");

    document.body.appendChild(Maindot);
    Maindot.classList.add("maindot");

    document.addEventListener("mousemove", (mouse) => {
      if (primaryMouseButtonDown) {
        Maindot.style.top = mouse.clientY + "px";
        Maindot.style.left = mouse.clientX + "px";

        mousePosition = { x: mouse.clientX, y: mouse.clientY };

        for (let i = 0; i < particles.length; i++) {
          let dot = particles[i];

          const posX = mousePosition.x - dotPosition.x,
            posY = mousePosition.y - dotPosition.y;

          dot.style.left = `${
            parseInt(dot.style.left.replace("px", "")) + posX
          }px`;
          dot.style.top = `${
            parseInt(dot.style.top.replace("px", "")) + posY
          }px`;
        }

        if (calcDistance(dotPosition, mousePosition) > 2) {
          dotPosition = mousePosition;
          const dot = document.createElement("span");
          particles.push(dot);

          dot.classList.add("dot");
          dot.classList.add("dot-anim");
          dot.style.top = mouse.clientY + "px";
          dot.style.left = mouse.clientX + "px";
          setTimeout(() => {
            dot.remove();
          }, 3500);
          document.body.appendChild(dot);
        }
      }
    });
    // TOUSE
    const angle = (cx, cy, ex, ey) => {
      const dy = ey - cy;
      const dx = ex - cx;
      const rad = (Math.atan2(dy, dx) * 180) / Math.PI;
      return rad;
    };
  }
};
