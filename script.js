// Initialize all scratch canvases (there are 3 in the HTML)
const canvases = document.querySelectorAll('.scratch-content canvas');


const scratchedCanvases = new Set();

function allScratchCompleted() {
  console.log("✅ All scratch pads completed!");
  confetti({
    particleCount: 200,
    spread: 200,
    startVelocity: 15,
    scalar: 0.9,
    ticks: 90,
  });
  // example: revealFinalReward();
}


canvases.forEach((canvas) => {
  const ctx = canvas.getContext('2d');

  canvas.width = 100;
  canvas.height = 100;

  // Fill scratch layer
  ctx.fillStyle = "#f7d9d9";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  let isDrawing = false;

  function getPosition(e) {
    const rect = canvas.getBoundingClientRect();
    const clientX = (e.clientX !== undefined) ? e.clientX : (e.touches && e.touches[0] && e.touches[0].clientX);
    const clientY = (e.clientY !== undefined) ? e.clientY : (e.touches && e.touches[0] && e.touches[0].clientY);

    return {
      x: clientX - rect.left,
      y: clientY - rect.top,
    };
  }

  function scratch(e) {
    if (!isDrawing) return;
    e.preventDefault();

    const pos = getPosition(e);
    if (!pos.x || !pos.y) return;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, 10, 0, Math.PI * 2);
    ctx.fill();
  }

  // Mouse events
  canvas.addEventListener('mousedown', () => {
    isDrawing = true;
  });
  canvas.addEventListener('mouseup', () => {
    isDrawing = false;
    checkScratchPercent(canvas, ctx);
  });
  canvas.addEventListener('mouseleave', () => {
    isDrawing = false;
    checkScratchPercent(canvas, ctx);
  });
  canvas.addEventListener('mousemove', scratch);

  // Touch events
  canvas.addEventListener('touchstart', (e) => {
    e.preventDefault();
    isDrawing = true;
  }, { passive: false });
  canvas.addEventListener('touchend', () => {
    isDrawing = false;
    checkScratchPercent(canvas, ctx);
  });
  canvas.addEventListener('touchmove', scratch, { passive: false });
});

function checkScratchPercent(canvas, ctx) {
  // Prevent re-checking already completed canvas
  if (scratchedCanvases.has(canvas)) return;

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

    // ✅ mark this canvas as completed
    scratchedCanvases.add(canvas);

    // ✅ check if all 3 are completed
    if (scratchedCanvases.size === canvases.length) {
      allScratchCompleted();
    }
  }
}


