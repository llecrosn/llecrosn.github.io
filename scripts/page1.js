document.addEventListener('DOMContentLoaded', () => {
            const observer = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        observer.unobserve(entry.target); // Pour ne jouer l'animation qu'une fois
                    }
                });
            }, {
                threshold: 0.1 // L'animation se déclenche quand 10% de l'élément est visible
            });

            // On observe chaque élément de la frise
            const timelineItems = document.querySelectorAll('.timeline-item');
            timelineItems.forEach(item => {
                observer.observe(item);
            });
        });
        timelineItems.forEach((item, index) => {
    observer.observe(item);
    item.style.animationDelay = `${index * 0.2}s`; // décalage entre les blocs
        });