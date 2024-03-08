/*-------------------------------------------------------------------------------*/
/* Oliver Fabián Stetcu | 2º DAW */
/*-------------------------------------------------------------------------------*/
// Obtengo las referencias a los botones
let empezarAnimacionRosa = document.getElementById("empezarAnimacion");
let pararAnimacionRosa = document.getElementById("pararAnimacion");

// Función para comenzar las animaciones
function empezarAnimacion() {
  const petalos = document.querySelectorAll(".petalos > div");
  petalos.forEach((petalo) => {
    petalo.style.animationPlayState = "running";
  });
}

// Función para detener las animaciones
function pararAnimacion() {
  const petalos = document.querySelectorAll(".petalos > div");
  petalos.forEach((petalo) => {
    petalo.style.animationPlayState = "paused";
  });
}

// Agrego eventos listeners a los botones
empezarAnimacionRosa.addEventListener("click", empezarAnimacion);
pararAnimacionRosa.addEventListener("click", pararAnimacion);
/*-------------------------------------------------------------------------------*/
/* Dibujo en CANVA */
/* FIGURA 1 */
let canvasFigura1 = document.getElementById("lienzoFigura1");
let figura = canvasFigura1.getContext("2d");

let centroX = canvasFigura1.width / 2;
let centroY = canvasFigura1.height / 2;
let alturaPetalo = 30;
let espacioPetalo = 20;
let mumPetalos = 8;

figura.fillStyle = "pink";

for (let i = 0; i < mumPetalos; i++) {
  let angulo = (i / mumPetalos) * (Math.PI * 2);
  let x = centroX + Math.cos(angulo) * espacioPetalo;
  let y = centroY + Math.sin(angulo) * espacioPetalo;

  figura.beginPath();
  figura.arc(x, y, alturaPetalo, 0, Math.PI * 2);
  figura.fill();
}

/* FIGURA 2 */
let canvasFigura2 = document.getElementById("lienzoFigura2");
let figura2 = canvasFigura2.getContext("2d");

let x2 = canvasFigura2.width / 2;
let y2 = canvasFigura2.height / 2;
let numCirculos = 12;

for (let i = 0; i < numCirculos; i++) {
  let radio = i * 20;
  let numPuntos = 30;

  for (let j = 0; j < numPuntos; j++) {
    let angulo2 = (j / numPuntos) * (Math.PI * 2);
    let x = x2 + Math.cos(angulo2) * radio;
    let y = y2 + Math.sin(angulo2) * radio;

    figura2.beginPath();
    figura2.arc(x, y, 2, 0, Math.PI * 2);

    // Matiz: ${360 * j / numPuntos}, Saturación: 70%, Luminosidad: 50%
    figura2.fillStyle = `hsl(${(360 * j) / numPuntos}, 70%, 50%)`;
    figura2.fill();
  }
}
/*-------------------------------------------------------------------------------*/
/* Animación en CANVA */
let canvasAnimacion = document.getElementById("lienzoAnimacionCanva");
let figuraAnimacionCanva = canvasAnimacion.getContext("2d");

let x = 100;
let y = 100;
let dx = 2;
let dy = 2;

let colorTexto = "#ffffff";

function dibujar() {
  // Crea un degradado lineal para el fondo
  let color = figuraAnimacionCanva.createLinearGradient(0, 0, 0, canvasAnimacion.height);
  color.addColorStop(0, "#AF4840"); // Color inicial
  color.addColorStop(1, "#0F0E0E"); // Color final
  
  figuraAnimacionCanva.fillStyle = color;
  figuraAnimacionCanva.fillRect(0, 0, canvasAnimacion.width, canvasAnimacion.height);

  // Dibujo el círculo
  figuraAnimacionCanva.beginPath();
  figuraAnimacionCanva.arc(x, y, 20, 0, Math.PI * 2);
  figuraAnimacionCanva.fillStyle = "rgba(255, 255, 255, 0.5)";
  figuraAnimacionCanva.fill();
  figuraAnimacionCanva.closePath();

  // Dibujo el texto
  figuraAnimacionCanva.font = "30px Arial";
  figuraAnimacionCanva.fillStyle = colorTexto;
  figuraAnimacionCanva.fillText("¡Animación en Canvas!", 250, 250);

  // Cambio el color del texto intermitentemente
  if (colorTexto === "#ffffff") {
    colorTexto = "#ff0000"; // Cambio a rojo
  } else {
    colorTexto = "#ffffff"; // Cambio a blanco
  } //end else

  // Muevo el círculo
  x += dx;
  y += dy;

  // Verifico los límites para rebotar
  if (x + dx > canvasAnimacion.width - 20 || x + dx < 20) {
    dx = -dx;
  } //end else

  if (y + dy > canvasAnimacion.height - 20 || y + dy < 20) {
    dy = -dy;
  } //end if

  requestAnimationFrame(dibujar);
} //end function dibujar()
dibujar();
/*-------------------------------------------------------------------------------*/
/* Animación en SVG */
let miSVG = document.getElementById("animacionSVG");
let texto = document.getElementById("moverTexto");
let estaCompletadaAnimacion = false;

// Función para animar el texto
function animarTexto() {
  texto.setAttribute("x", 100);
  texto.setAttribute("y", 100);
  
  let animation = texto.animate(
    [{ transform: "translate(0,0)" }, { transform: "translate(500px, 0)" }], 
    {duration: 3000, fill: "forwards", }
  );

  animation.onfinish = function () {
    estaCompletadaAnimacion = true;
    miSVG.addEventListener("mouseenter", iniciarAnimacionCirculos);
    miSVG.addEventListener("mouseleave", pararAnimacionCirculos);
  };
}//end function animarTexto()

// Función para iniciar la animación de círculos
function iniciarAnimacionCirculos() {
  miSVG.addEventListener("mousemove", createParticle);
}//end function iniciarAnimacionCirculos()

// Función para detener la animación de círculos
function pararAnimacionCirculos() {
  miSVG.removeEventListener("mousemove", createParticle);
}//end function pararAnimacionCirculos()

// Función para crear un círculo
function createParticle(evento) {
  let x = evento.clientX - miSVG.getBoundingClientRect().left;
  let y = evento.clientY - miSVG.getBoundingClientRect().top;

  let particle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  particle.setAttribute("cx", x);
  particle.setAttribute("cy", y);
  particle.setAttribute("r", Math.random() * 10);
  particle.setAttribute("fill","rgb(" + Math.random() * 255 + "," + Math.random() * 255 + "," + Math.random() * 255 + ")");
  miSVG.appendChild(particle);
}//end function createParticle(event)

// Inicio la animación del texto al cargar la página
animarTexto();
/*-------------------------------------------------------------------------------*/
