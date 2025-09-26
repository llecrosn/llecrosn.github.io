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

        // resets when leavin
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
        });
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

            const bgX = (x / rect.width) * 100;
            const bgY = (y / rect.height) * 100;

            card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
            card.style.backgroundPosition = `${bgX}% ${bgY}%`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
            card.style.backgroundPosition = '50% 50%';
        });
    });

    document.addEventListener('mousemove', function(e) {
        const about = document.querySelector('.about');
        const blobs = document.querySelectorAll('.parallax-blobs .blob');
        if (!about || blobs.length === 0) return;

        const rect = about.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const x = ((mouseX / rect.width) - 0.5) * 2;
        const y = ((mouseY / rect.height) - 0.5) * 2;

        blobs.forEach((blob, i) => {
            const speed = (i + 1) * 20 + 10;
            const dir = i % 2 === 0 ? 1 : -1;
            blob.style.transform = `translate(${x * speed * dir}px, ${y * speed}px)`;
        });
    });
    
});