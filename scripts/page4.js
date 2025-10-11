const cube = document.querySelector('.cube');
let isDragging = false;
let startX, startY, currentX = 0, currentY = 0;


const onMouseDown = (e) => {
    isDragging = true;
    startX = e.clientX - currentX;
    startY = e.clientY - currentY;
    cube.style.cursor = 'grabbing';
};
const onMouseMove = (e) => {
    if (!isDragging) return;
    currentX = e.clientX - startX;
    currentY = e.clientY - startY;
    cube.style.transform = `rotateY(${currentX / 5}deg)`;
};
const onMouseUp = () => {
    isDragging = false;
    cube.style.cursor = 'grab';
};
cube.addEventListener('mousedown', onMouseDown);
window.addEventListener('mousemove', onMouseMove);
window.addEventListener('mouseup', onMouseUp);



let currentIndex = 0;
const slider = document.querySelector('.slider');
const slides = document.querySelectorAll('.slide');
const points = document.querySelectorAll('.point');
const totalSlides = slides.length;

// 1. Cloner la première slide
const firstClone = slides[0].cloneNode(true);
slider.appendChild(firstClone);

function show(index) {
    slider.style.transition = 'transform 1s ease-in-out';
    currentIndex = index;
    slider.style.transform = `translateX(-${currentIndex * 100}%)`;

    // Mettre à jour les points
    points.forEach((p, i) => {
        p.classList.toggle('active-point', i === (currentIndex % totalSlides));
    });
}

// 2. Quand la transition se termine, vérifier si on est sur le clone
slider.addEventListener('transitionend', () => {
    if (currentIndex === totalSlides) {
        // retirer la transition
        slider.style.transition = 'none';
        // remettre à la première slide instantanément
        currentIndex = 0;
        slider.style.transform = `translateX(0)`;
    }
});

function nextSlide() {
    show(currentIndex + 1);
}

function previousSlide() {
    if (currentIndex === 0) {
        slider.style.transition = 'none';
        currentIndex = totalSlides;
        slider.style.transform = `translateX(-${currentIndex * 100}%)`;
        requestAnimationFrame(() => {  // pour forcer le recalcul
            requestAnimationFrame(() => show(currentIndex - 1));
        });
    } else {
        show(currentIndex - 1);
    }
}

function currentSlide(index) {
    show(index);
}

setInterval(nextSlide, 5000);
show(0);