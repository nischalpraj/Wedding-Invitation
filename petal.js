const petalCount = 50;

function createPetal() {
  const petal = document.createElement("div");
  petal.classList.add("petal");

  const size = Math.random() * 12 + 10;
  petal.style.width = size + "px";
  petal.style.height = size + "px";

  petal.style.left = Math.random() * window.innerWidth + "px";

  const fallDuration = Math.random() * 5 + 7;
  const swayDuration = Math.random() * 3 + 4;

  petal.style.animationDuration = `${fallDuration}s, ${swayDuration}s`;
  petal.style.animationDelay = `${Math.random() * 5}s`;

  petal.style.opacity = Math.random() * 0.5 + 0.5;

  document.body.appendChild(petal);

  setTimeout(
    () => {
      petal.remove();
    },
    (fallDuration + 5) * 1000,
  );
}

setInterval(createPetal, 400);
