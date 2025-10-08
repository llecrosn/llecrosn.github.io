/* ======================
   INTERACTION 3D AU MOUVEMENT DE SOURIS
====================== */

// Quand la souris bouge sur la page, on crée un léger effet 3D
document.addEventListener('mousemove', (e) => {
    // Sélection du contenu principal (titre + sous-titre)
    const hero = document.querySelector('.home-page .hero-content');
    if (!hero) return; // sécurité : si le sélecteur n'existe pas, on ne fait rien

    // Calcul de la position de la souris par rapport au centre de la fenêtre
    const x = (window.innerWidth / 2 - e.pageX) / 60;
    const y = (window.innerHeight / 2 - e.pageY) / 60;

    // Application d'une rotation légère selon la position
    hero.style.transform = `rotateY(${x}deg) rotateX(${y}deg) translateZ(60px)`;
});

