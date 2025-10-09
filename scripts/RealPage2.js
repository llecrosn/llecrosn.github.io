const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray = [];
const numberOfParticles = 150; 

class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 2 + 1; //Rendu 3d taille aléatoire
        this.speedX = Math.random() * 2 - 1; //vitesse X
        this.speedY = Math.random() * 2 - 1; //vitesse Y
    }
   
    update() {
        if (this.x > canvas.width || this.x < 0) {
            this.speedX = -this.speedX;
        }
        if (this.y > canvas.height || this.y < 0) {
            this.speedY = -this.speedY;
        }
        this.x += this.speedX;
        this.y += this.speedY;
    }
    // particle draw -> ne pas toucher sauf rgb
    draw() {
        ctx.fillStyle = 'rgba(210, 95, 255, 0.8)'; 
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function init() {
    particlesArray = [];
    for (let i = 0; i < numberOfParticles; i++) {
        let x = Math.random() * canvas.width;
        let y = Math.random() * canvas.height;
        particlesArray.push(new Particle(x, y));
    }
}

function connectParticles() {
    let opacityValue = 1;
    for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
            let distance = Math.sqrt(
                (particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x)
                + (particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y)
            );

            if (distance < 100) {
                opacityValue = 1 - (distance / 100);
                ctx.strokeStyle = 'rgba(255, 192, 56,' + opacityValue + ')';
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                ctx.stroke();
            }
        }
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
    }
    connectParticles();
    requestAnimationFrame(animate);
}

init();
animate();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
});

document.querySelectorAll('img').forEach(img => {
  img.addEventListener('click', () => {
    img.classList.toggle('zoomed');
    
  });
});


