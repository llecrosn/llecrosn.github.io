const logo = document.getElementById('logo');
const menu = document.getElementById('menu');

logo.addEventListener('click', (e) => {
    e.stopPropagation(); // éviter que le clic remonte
    if (menu.classList.contains('menu-visible')) {
        menu.classList.remove('menu-visible');
        menu.classList.add('menu-hidden');
    } else {
        menu.classList.remove('menu-hidden');
        menu.classList.add('menu-visible');
    }
});

// Cacher le menu si on clique ailleurs
document.addEventListener('click', () => {
    if (menu.classList.contains('menu-visible')) {
        menu.classList.remove('menu-visible');
        menu.classList.add('menu-hidden');
    }
});

// Empêche le clic dans le menu de le fermer
menu.addEventListener('click', (e) => {
    e.stopPropagation();
});
