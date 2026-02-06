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
canvas.addEventListener("mousedown", () => (isDrawing = true));
canvas.addEventListener("mouseup", () => (isDrawing = false));
canvas.addEventListener("mouseleave", () => (isDrawing = false));
canvas.addEventListener("mousemove", scratch);

// Touch events
canvas.addEventListener("touchstart", () => (isDrawing = true));
canvas.addEventListener("touchend", () => (isDrawing = false));
canvas.addEventListener("touchmove", scratch);
