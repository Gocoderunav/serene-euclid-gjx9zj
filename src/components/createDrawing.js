export default function createDrawing(canvas, savedDrawing, saveDrawing) {
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  // how lines look like
  ctx.lineJoin = "round";
  ctx.lineCap = "round";
  ctx.lineWidth = 5;
  ctx.strokeStyle = "#000";

  let drawing = false;

  if (savedDrawing) {
    const img = new Image();
    img.src = savedDrawing;
    img.onload = () => ctx.drawImage(img, 0, 0);
  }

  const start = (e) => {
    drawing = true;
    ctx.beginPath();
    ctx.moveTo(e.offsetX, e.offsetY);
  };

  const draw = (e) => {
    if (!drawing) return;
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
  };

  const end = () => {
    drawing = false;
    saveDrawing(canvas.toDataURL());
  };

  canvas.addEventListener("mousedown", start);
  canvas.addEventListener("mousemove", draw);
  canvas.addEventListener("mouseup", end);
  canvas.addEventListener("mouseout", end);
}
