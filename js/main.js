let sun = new Image();
let moon = new Image();
let earth = new Image();

const ctx = document.getElementById("canvasSolarSystem").getContext("2d");

function init() {
  sun.src = "media/canvas_sun.png";
  moon.src = "media/canvas_moon.png";
  earth.src = "media/canvas_earth.png";
  window.requestAnimationFrame(drawSolarSystem);
}

function drawSolarSystem() {
  ctx.globalCompositeOperation = "destination-over"; //Sirve para la animación encima
  ctx.clearRect(0, 0, 300, 300); // limpiar canvas con origen y medidas del lienzo

  ctx.fillStyle = "rgba(0,0,0,0.4)";
  ctx.strokeStyle = "rgba(0,153,255,0.4)";
  ctx.save(); //Guarda el estado actual del canvas
  ctx.translate(150, 150); //Hace un upset del lienzo

  // La tierra
  let time = new Date();
  ctx.rotate(
    ((2 * Math.PI) / 60) * time.getSeconds() +
    ((2 * Math.PI) / 60000) * time.getMilliseconds(),
  );
  ctx.translate(105, 0);
  ctx.fillRect(0, -12, 50, 24); // Sombra
  ctx.drawImage(earth, -12, -12);

  // La luna
  ctx.save();
  ctx.rotate(
    ((2 * Math.PI) / 6) * time.getSeconds() +
      ((2 * Math.PI) / 6000) * time.getMilliseconds(),
  );
  ctx.translate(0, 28.5);
  ctx.drawImage(moon, -3.5, -3.5);
  ctx.restore();

  ctx.restore();

  ctx.beginPath();
  ctx.arc(150, 150, 105, 0, Math.PI * 2, false); // Órbita terrestre
  ctx.stroke();

  ctx.drawImage(sun, 0, 0, 300, 300);

  window.requestAnimationFrame(drawSolarSystem);
}

init();

// CURRENT TIME
function clock() {
  const now = new Date();
  const canvasCurrentTime = document.getElementById("canvasCurrentTime");
  const ctxReloj = canvasCurrentTime.getContext("2d");
  const size = 300; // Tamaño del lienzo
  const center = size / 2;
  const scale = 0.6; // Escala aumentada del reloj

  ctxReloj.save();
  ctxReloj.clearRect(0, 0, size, size); // Limpiar el lienzo completo
  ctxReloj.translate(center, center); // Centrar el origen en el medio del lienzo
  ctxReloj.scale(scale, scale); // Escalar el reloj
  ctxReloj.rotate(-Math.PI / 2);
  ctxReloj.strokeStyle = "black";
  ctxReloj.fillStyle = "white";
  ctxReloj.lineWidth = 8;
  ctxReloj.lineCap = "round";

  // Marcas de las horas
  ctxReloj.save();
  for (let i = 0; i < 12; i++) {
    ctxReloj.beginPath();
    ctxReloj.rotate(Math.PI / 6);
    ctxReloj.moveTo(100, 0);
    ctxReloj.lineTo(120, 0);
    ctxReloj.stroke();
  }
  ctxReloj.restore();

  // Marcas de los minutos
  ctxReloj.save();
  ctxReloj.lineWidth = 5;
  for (let i = 0; i < 60; i++) {
    if (i % 5 !== 0) {
      ctxReloj.beginPath();
      ctxReloj.moveTo(117, 0);
      ctxReloj.lineTo(120, 0);
      ctxReloj.stroke();
    }
    ctxReloj.rotate(Math.PI / 30);
  }
  ctxReloj.restore();

  const sec = now.getSeconds();
  const min = now.getMinutes();
  const hr = now.getHours() % 12;

  ctxReloj.fillStyle = "black";

  // Escribir las horas
  ctxReloj.save();
  ctxReloj.rotate(
    (Math.PI / 6) * hr + (Math.PI / 360) * min + (Math.PI / 21600) * sec,
  );
  ctxReloj.lineWidth = 14;
  ctxReloj.beginPath();
  ctxReloj.moveTo(-20, 0);
  ctxReloj.lineTo(80, 0);
  ctxReloj.stroke();
  ctxReloj.restore();

  // Escribir los minutos
  ctxReloj.save();
  ctxReloj.rotate((Math.PI / 30) * min + (Math.PI / 1800) * sec);
  ctxReloj.lineWidth = 10;
  ctxReloj.beginPath();
  ctxReloj.moveTo(-28, 0);
  ctxReloj.lineTo(112, 0);
  ctxReloj.stroke();
  ctxReloj.restore();

  // Escribir los segundos
  ctxReloj.save();
  ctxReloj.rotate((sec * Math.PI) / 30);
  ctxReloj.strokeStyle = "#D40000";
  ctxReloj.fillStyle = "#D40000";
  ctxReloj.lineWidth = 6;
  ctxReloj.beginPath();
  ctxReloj.moveTo(-30, 0);
  ctxReloj.lineTo(83, 0);
  ctxReloj.stroke();
  ctxReloj.beginPath();
  ctxReloj.arc(0, 0, 10, 0, Math.PI * 2, true);
  ctxReloj.fill();
  ctxReloj.beginPath();
  ctxReloj.arc(95, 0, 10, 0, Math.PI * 2, true);
  ctxReloj.stroke();
  ctxReloj.fillStyle = "rgb(0 0 0 / 0%)";
  ctxReloj.arc(0, 0, 3, 0, Math.PI * 2, true);
  ctxReloj.fill();
  ctxReloj.restore();

  ctxReloj.beginPath();
  ctxReloj.lineWidth = 14;
  ctxReloj.strokeStyle = "#89b4f5";
  ctxReloj.arc(0, 0, 142, 0, Math.PI * 2, true);
  ctxReloj.stroke();

  ctxReloj.restore();

  window.requestAnimationFrame(clock);
}

window.requestAnimationFrame(clock);



// PANORAMA
const img = new Image();

img.src = "media/capitan_meadows_yosemite_national_park.jpg";
const canvasXSize = 800;
const canvasYSize = 200;
const speed = 30; // lower is faster
const scale = 1.05;
const y = -4.5; // vertical offset

// Main program
const dx = 0.75;
let imgW;
let imgH;
let x = 0;
let clearX;
let clearY;
let ctxPanorama;

img.onload = () => {
  imgW = img.width * scale;
  imgH = img.height * scale;

  if (imgW > canvasXSize) {
    // Image larger than canvas
    x = canvasXSize - imgW;
  }

  // Check if image dimension is larger than canvas
  clearX = Math.max(imgW, canvasXSize);
  clearY = Math.max(imgH, canvasYSize);

  // Get canvas context
  ctxPanorama = document.getElementById("canvasPanorama").getContext("2d");

  // Set refresh rate
  return setInterval(drawPanorama, speed);
};

function drawPanorama() {
  ctxPanorama.clearRect(0, 0, clearX, clearY); // clear the canvas

  // If image is <= canvas size
  if (imgW <= canvasXSize) {
    // Reset, start from beginning
    if (x > canvasXSize) {
      x = -imgW + x;
    }

    // Draw additional image1
    if (x > 0) {
      ctxPanorama.drawImage(img, -imgW + x, y, imgW, imgH);
    }

    // Draw additional image2
    if (x - imgW > 0) {
      ctxPanorama.drawImage(img, -imgW * 2 + x, y, imgW, imgH);
    }
  } else {
    // Image is > canvas size
    // Reset, start from beginning
    if (x > canvasXSize) {
      x = canvasXSize - imgW;
    }

    // Draw additional image
    if (x > canvasXSize - imgW) {
      ctxPanorama.drawImage(img, x - imgW + 1, y, imgW, imgH);
    }
  }

  // Draw image
  ctxPanorama.drawImage(img, x, y, imgW, imgH);

  // Amount to move
  x += dx;
}
