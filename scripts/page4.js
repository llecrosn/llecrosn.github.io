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
    cube.style.transform = `rotateY(${ currentX / 5 }deg)`;
};
const onMouseUp = () => {
    isDragging = false;
    cube.style.cursor = 'grab';
};
cube.addEventListener('mousedown', onMouseDown);
window.addEventListener('mousemove', onMouseMove);
window.addEventListener('mouseup', onMouseUp);
