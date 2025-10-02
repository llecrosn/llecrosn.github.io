document.addEventListener("DOMContentLoaded", function() {
    const cards = document.querySelectorAll('.member');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting){
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    cards.forEach(card => observer.observe(card));

    
    let lastScrollY = window.scrollY;
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > lastScrollY && window.scrollY > 50) {
            navbar.classList.add('hide-navbar');
        } else {
            navbar.classList.remove('hide-navbar');
        }
        lastScrollY = window.scrollY;
    });

    document.querySelectorAll('.engagement').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; 
            const y = e.clientY - rect.top; 
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = -((y - centerY) / centerY) * 8; 
            const rotateY = -((x - centerX) / centerX) * -8;

            card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
        });

        // ca reset
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
        });
    });

    document.querySelectorAll('.engagement').forEach(card => {
        let rotateX = 0, rotateY = 0;
        let targetX = 0, targetY = 0;
        let isHovering = false;
        
        card.addEventListener('mousemove', (e) => {
            isHovering = true;
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;  
            const y = e.clientY - rect.top;  
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            targetX = ((y - centerY) / centerY) * 15;
            targetY = ((x - centerX) / centerX) * 15;
            
            const bgX = (x / rect.width) * 100;
            const bgY = (y / rect.height) * 100;
            card.style.backgroundPosition = `${bgX}% ${bgY}%`;
        });
        
        card.addEventListener('mouseleave', () => {
            isHovering = false;
            targetX = 0;
            targetY = 0;
            card.style.backgroundPosition = '50% 50%';
        });
    
        function animate() {
            const easing = isHovering ? 0.25 : 0.08;
            
            rotateX += (targetX - rotateX) * easing;
            rotateY += (targetY - rotateY) * easing;
            
            const scale = isHovering ? 1.03 : 1;
            card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`;
            
            requestAnimationFrame(animate);
        }
        animate();
    });

    let mouseActive = false;
    let lastMouseTime = Date.now();

    document.addEventListener('mousemove', function(e) {
        const about = document.querySelector('.about');
        const blobs = document.querySelectorAll('.parallax-blobs .blob');
        if (!about || blobs.length === 0) return;

        const rect = about.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const x = ((mouseX / rect.width) - 0.5) * 2;
        const y = ((mouseY / rect.height) - 0.5) * 2;

        idleX = x;
        idleY = y;
        mouseActive = true;
        lastMouseTime = Date.now();

        blobs.forEach((blob, i) => {
            const speed = (i + 1) + 50;
            const dir = i % 2 === 0 ? 1 : -1;
            blob.style.transform = `translate(${x * speed * dir}px, ${y * speed}px)`;
        });
    });

    function animateBlobsIdle() {
        const about = document.querySelector('.about');
        const blobs = document.querySelectorAll('.parallax-blobs .blob');
        if (!about || blobs.length === 0) return;

        if (!mouseActive || Date.now() - lastMouseTime > 1000) {
            mouseActive = false;
            const t = Date.now() * 0.001;
            blobs.forEach((blob, i) => {
                const speed = (i + 1) * 30 + 20;
                const dir = i % 2 === 0 ? 1 : -1;
                const idleOffsetX = Math.sin(t + i) * 0.5;
                const idleOffsetY = Math.cos(t + i * 1.5) * 0.5;
                blob.style.transform = `translate(${idleOffsetX * speed * dir}px, ${idleOffsetY * speed}px)`;
            });
        }
        requestAnimationFrame(animateBlobsIdle);
    }
    animateBlobsIdle();
    
});