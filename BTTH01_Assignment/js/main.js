/* ========================================
   Main JavaScript - Portfolio Site
   ======================================== */

document.addEventListener('DOMContentLoaded', function () {

    // ============================
    // 1. Skills Progress Bar Animation (Intersection Observer)
    // ============================
    const skillProgressBars = document.querySelectorAll('.skill-progress');

    const skillObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const targetWidth = bar.getAttribute('data-width');
                // Small delay for visual effect
                setTimeout(function () {
                    bar.style.width = targetWidth;
                    bar.classList.add('animate');
                }, 200);
                skillObserver.unobserve(bar);
            }
        });
    }, {
        threshold: 0.5
    });

    skillProgressBars.forEach(function (bar) {
        skillObserver.observe(bar);
    });

    // ============================
    // 2. Smooth Scroll for Navigation Links
    // ============================
    var navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(function (link) {
        link.addEventListener('click', function (e) {
            var targetId = this.getAttribute('href');
            if (targetId === '#') return;

            var target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                // Close mobile menu if open
                var menuToggle = document.getElementById('menu-toggle');
                if (menuToggle) {
                    menuToggle.checked = false;
                }
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ============================
    // 3. Header Background Change on Scroll
    // ============================
    var header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // ============================
    // 4. Scroll Reveal Animation
    // ============================
    var revealElements = document.querySelectorAll('.reveal');

    var revealObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15
    });

    revealElements.forEach(function (el) {
        revealObserver.observe(el);
    });

});
