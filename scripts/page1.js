
document.addEventListener('DOMContentLoaded', () => {
    // Observer pour animer les blocs quand ils apparaissent
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // ne joue l’anim qu’une fois
            }
        });
    }, {
        threshold: 0.1
    });

    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        observer.observe(item);
        item.style.animationDelay = `${index * 0.2}s`; // effet cascade
    });
});

// Effet 3D + reflet dynamique sur les cartes
document.querySelectorAll('.timeline-content').forEach(card => {
    const glare = document.createElement("div");
    glare.classList.add("glare");
    card.appendChild(glare);

    card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const cx = rect.width / 2;
        const cy = rect.height / 2;

        // rotation 3D
        const rotateX = ((y - cy) / cy) * 15;
        const rotateY = ((x - cx) / cx) * 15;
        card.style.transform = `rotateX(${-rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;

        // reflet dynamique
        const glareX = (x / rect.width) * 100;
        const glareY = (y / rect.height) * 100;
        glare.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.2), transparent 80%)`;
        glare.style.opacity = 1;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = "rotateX(0) rotateY(0) scale(1)";
        glare.style.opacity = 0;
    });
});


// cube 3d

const cube = document.getElementById("cube");
let isDragging = false;
let startX, startY;
let rotationX = -20;
let rotationY = 20;

function updateCube() {
  cube.style.transform = `translateZ(-110px) rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;
}

cube.addEventListener("mousedown", (e) => {
  isDragging = true;
  startX = e.clientX;
  startY = e.clientY;
  cube.style.cursor = "grabbing";
});

window.addEventListener("mousemove", (e) => {
  if (!isDragging) return;
  const dx = e.clientX - startX;
  const dy = e.clientY - startY;
  rotationY += dx * 0.5;
  rotationX -= dy * 0.5;
  startX = e.clientX;
  startY = e.clientY;
  updateCube();
});

window.addEventListener("mouseup", () => {
  isDragging = false;
  cube.style.cursor = "grab";
});
