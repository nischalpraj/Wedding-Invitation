const canvas = document.getElementById("scratchCanvas");
const ctx = canvas.getContext("2d");
canvas.width = 100;
canvas.height = 100;
canvas.borderRadius = "100%";
ctx.fillStyle = "gray";
ctx.fillRect(0, 0, canvas.width, canvas.height);
let isDrawing = false;
function getPosition(e) {
    const rect = canvas.getBoundingClientRect();
    return {
        x: (e.clientX || e.touches[0].clientX) - rect.left,
        y: (e.clientY || e.touches[0].clientY) - rect.top
    };
    }
function sctarch(e) {
    if (!isDrawing) return;
    const pos = getPosition(e);
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, 10, 0, Math.PI * 2);
    ctx.fill();
}
canvas.addEventListener("mousedown", () => (isDrawing = true));
canvas.addEventListener("mouseup", () => (isDrawing = false));
canvas.addEventListener("mousemove", sctarch);
canvas.addEventListener("touchstart", () => (isDrawing = true));
canvas.addEventListener("touchend", () => (isDrawing = false));
canvas.addEventListener("touchmove", sctarch);