/* ======
   cube
=======*/
const cube = document.querySelector('.cube');

let isDragging = false;
let startX = 0;
let currentX = 0;

function handleMouseDown(e) {
  isDragging = true;
  startX = e.clientX - currentX;
  cube.style.cursor = 'grabbing';
}

function handleMouseMove(e) {
  if (!isDragging) return;
  currentX = e.clientX - startX;
  cube.style.transform = `rotateY(${currentX / 5}deg)`;
}

function handleMouseUp() {
  isDragging = false;
  cube.style.cursor = 'grab';
}

cube.addEventListener('mousedown', handleMouseDown);
window.addEventListener('mousemove', handleMouseMove);
window.addEventListener('mouseup', handleMouseUp);

/* ===========
   Slider
=========== */
const slider = document.querySelector('.slider');
const slides = document.querySelectorAll('.slide');
const points = document.querySelectorAll('.point');
const totalSlides = slides.length;

let currentIndex = 0;

// Affiche le slide correspondant à l'index
function show(index) {
  slider.style.transition = 'transform 1s ease-in-out';
  currentIndex = index;
  slider.style.transform = `translateX(-${currentIndex * 100}%)`;

  points.forEach((p, i) => {
    p.classList.toggle('active-point', i === (currentIndex % totalSlides));
  });
}

// Effet "boucle" (clonage du premier slide)
const firstClone = slides[0].cloneNode(true);
slider.appendChild(firstClone);

// Gérer la fin de transition pour la boucle
slider.addEventListener('transitionend', () => {
  if (currentIndex === totalSlides) {
    slider.style.transition = 'none';
    currentIndex = 0;
    slider.style.transform = `translateX(0)`;
  }
});

// Slide suivante automatiquement
function nextSlide() {
  show(currentIndex + 1);
}

// Défilement automatique
setInterval(nextSlide, 7000);

//utilisation des points pour choisir l'image
points.forEach((point, index) => {
  point.addEventListener('click', () => show(index));
});

show(0);
