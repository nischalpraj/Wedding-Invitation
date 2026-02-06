const canvas = document.getElementById("scratchCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 100;
canvas.height = 100;

// Fill scratch layer
ctx.fillStyle = "gray";
ctx.fillRect(0, 0, canvas.width, canvas.height);

let isDrawing = false;

function getPosition(e) {
  const rect = canvas.getBoundingClientRect();
  const clientX = e.clientX || e.touches[0].clientX;
  const clientY = e.clientY || e.touches[0].clientY;

  return {
    x: clientX - rect.left,
    y: clientY - rect.top,
  };
}

function scratch(e) {
  if (!isDrawing) return;
  e.preventDefault();

  const pos = getPosition(e);
  ctx.globalCompositeOperation = "destination-out";
  ctx.beginPath();
  ctx.arc(pos.x, pos.y, 10, 0, Math.PI * 2);
  ctx.fill();
}

// Mouse events
canvas.addEventListener("mousedown", () => {
  isDrawing = true;
  checkScratchPercent();
});
canvas.addEventListener("mouseup", () => (isDrawing = false));
canvas.addEventListener("mouseleave", () => (isDrawing = false));
canvas.addEventListener("mousemove", scratch);

// Touch events
canvas.addEventListener("touchstart", () => (isDrawing = true));
canvas.addEventListener("touchend", () => {
  isDrawing = false;
  checkScratchPercent();
});
canvas.addEventListener("touchmove", scratch);

function checkScratchPercent() {
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const pixels = imageData.data;

  let transparentPixels = 0;

  for (let i = 3; i < pixels.length; i += 4) {
    if (pixels[i] === 0) transparentPixels++;
  }

  const totalPixels = canvas.width * canvas.height;
  const scratchedPercent = (transparentPixels / totalPixels) * 100;

  if (scratchedPercent >= 30) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
}
