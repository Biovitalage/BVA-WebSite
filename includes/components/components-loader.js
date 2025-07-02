$(function () {
    // Carica la navbar
    $("#navbar-placeholder").load("/BVA-WebSite/includes/components/NavBar/navbar.html", function () {
        const navbar = document.getElementById('navbar');
        const navbarMobile = document.getElementById('navBarMobile');

        // ✅ Aggiungi qui la gestione della freccia dropdown
        const liContainer = document.querySelector('.has-dropdown-clock');
        const liContainerMobile = document.querySelector('.has-dropdown-clock-mobile');
        const menuContainerMobile = document.querySelector('.dropdown-menu-clock-mobile');
        const menuContainer = document.querySelector('.dropdown-menu-clock');

        if (liContainer && menuContainer) {
            liContainer.addEventListener('mouseenter', () => {
                menuContainer.classList.add('active');
            });
            liContainer.addEventListener('mouseleave', () => {
                menuContainer.classList.remove('active');
            });
        }

        if (liContainerMobile && menuContainerMobile) {
            liContainerMobile.addEventListener('click', () => {
                menuContainerMobile.classList.toggle('active-clock-mobile');
            });
        }

        // Gestione scroll trasparenza navbar
        window.onscroll = function () {
            let HomeContainer;

            if (document.getElementById('Home_Section')) {
                HomeContainer = document.getElementById('Home_Section');
            } else {
                HomeContainer = document.getElementById('Home_Section_secondary');
            }

            if (HomeContainer) {
                let check = HomeContainer.getAttribute('id');
                let halfPageHeight = 0;

                const pageHeight = HomeContainer.offsetHeight;
                const scrollPosition = window.scrollY || document.documentElement.scrollTop;
                if (String(check) == 'Home_Section') {
                    halfPageHeight = parseInt((pageHeight * 25) / 100);
                } else {
                    halfPageHeight = parseInt((pageHeight * 1) / 100);
                }

                if (scrollPosition > halfPageHeight) {
                    navbar.classList.add('scrolled');
                    navbarMobile.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                    navbarMobile.classList.remove('scrolled');
                }
            }
        };
    });

    // Carica il footer
    $("#footer-placeholder").load("/BVA-WebSite/includes/components/Footer/footer.html", function () {
        const yearSpan = document.getElementById("current-year");
        if (yearSpan) {
            yearSpan.textContent = new Date().getFullYear();
        }

        const footerH3 = document.querySelectorAll('#footer-placeholder h3');
        const footerObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'fade-in 2s forwards';
                }
            });
        }, { threshold: 0.1 });

        footerH3.forEach(h3 => footerObserver.observe(h3));
    });
});