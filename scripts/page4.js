const piramid = document.querySelector('.piramid');
let isDragging = false;
let startX, startY, currentX = 0, currentY = 0;


const onMouseDown = (e) => {
    isDragging = true;
    startX = e.clientX - currentX;
    startY = e.clientY - currentY;
    piramid.style.cursor = 'grabbing';
};
const onMouseMove = (e) => {
    if (!isDragging) return;
    currentX = e.clientX - startX;
    currentY = e.clientY - startY;
    piramid.style.transform = `rotateX(${ -currentY / 5 }deg) rotateY(${ currentX / 5 }deg)`;
};
const onMouseUp = () => {
    isDragging = false;
    piramid.style.cursor = 'grab';
};
piramid.addEventListener('mousedown', onMouseDown);
window.addEventListener('mousemove', onMouseMove);
window.addEventListener('mouseup', onMouseUp);