document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('.header');
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navLinks = navbar ? navbar.querySelectorAll('a[href^="#"]') : [];
    const animatedSections = document.querySelectorAll('[data-animate]');
    const animatedCards = document.querySelectorAll('[data-animate-card]');

    // Toggle mobile navigation
    if (navToggle && navbar) {
        navToggle.addEventListener('click', () => {
            const isOpen = navbar.classList.toggle('open');
            navToggle.classList.toggle('is-active', isOpen);
            navToggle.setAttribute('aria-expanded', String(isOpen));
        });
    }

    // Smooth scroll for navigation links
    navLinks.forEach((link) => {
        link.addEventListener('click', (event) => {
            const targetId = link.getAttribute('href');
            if (!targetId || !targetId.startsWith('#')) return;

            const targetElement = document.querySelector(targetId);
            if (!targetElement) return;

            event.preventDefault();
            const headerHeight = header ? header.offsetHeight : 0;
            const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight + 10;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth',
            });

            if (navbar && navbar.classList.contains('open')) {
                navbar.classList.remove('open');
                navToggle?.setAttribute('aria-expanded', 'false');
                navToggle?.classList.remove('is-active');
            }
        });
    });

    // Intersection Observer for section entry animations
    if ('IntersectionObserver' in window) {
        const sectionObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15,
        });

        animatedSections.forEach((section) => sectionObserver.observe(section));

        const cardsObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show-card');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.2,
            rootMargin: '0px 0px -60px 0px',
        });

        animatedCards.forEach((card) => cardsObserver.observe(card));
    } else {
        animatedSections.forEach((section) => section.classList.add('show'));
        animatedCards.forEach((card) => card.classList.add('show-card'));
    }
});
