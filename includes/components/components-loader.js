$(function () {
  // Carica la navbar
  $("#navbar-placeholder").load(
    "/BVA-WebSite/includes/components/NavBar/navbar.html",
    function () {
      const navbar = document.getElementById("navbar");
      const navbarMobile = document.getElementById("navBarMobile");

      /* ========== DESKTOP DROPDOWN ========== */
      document.querySelectorAll(".has-dropdown-clock").forEach((li) => {
        const menu = li.querySelector(".dropdown-menu-clock");
        if (menu) {
          li.addEventListener("mouseenter", () => menu.classList.add("active"));
          li.addEventListener("mouseleave", () =>
            menu.classList.remove("active")
          );
        }
      });

      /* ========== MOBILE DROPDOWN ========== */
      document
        .querySelectorAll(".has-dropdown-clock-mobile")
        .forEach((arrow) => {
          const menu = arrow
            .closest("li")
            .querySelector(".dropdown-menu-clock-mobile");
          if (!menu) return; // safety

          arrow.addEventListener("click", (e) => {
            e.stopPropagation(); // evita bubbling indesiderato

            // Chiudi eventuali altri dropdown aperti
            document
              .querySelectorAll(
                ".dropdown-menu-clock-mobile.active-clock-mobile"
              )
              .forEach((opened) => {
                if (opened !== menu)
                  opened.classList.remove("active-clock-mobile");
              });

            // Toggle menu corrente + rotazione freccia
            menu.classList.toggle("active-clock-mobile");
            arrow.classList.toggle("open");
          });
        });

      /* ========== NAVBAR TRASPARENTE SU SCROLL ========== */
      window.addEventListener("scroll", () => {
        const home =
          document.getElementById("Home_Section") ??
          document.getElementById("Home_Section_secondary");
        if (!home) return;

        const limite =
          home.id === "Home_Section"
            ? 0.25 * home.offsetHeight
            : 0.01 * home.offsetHeight;

        if (window.scrollY > limite) {
          navbar.classList.add("scrolled");
          navbarMobile.classList.add("scrolled");
        } else {
          navbar.classList.remove("scrolled");
          navbarMobile.classList.remove("scrolled");
        }
      });
    }
  );

  /* ========== FOOTER ========== */
  $("#footer-placeholder").load(
    "/BVA-WebSite/includes/components/Footer/footer.html",
    function () {
      const yearSpan = document.getElementById("current-year");
      if (yearSpan) yearSpan.textContent = new Date().getFullYear();

      const footerObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting)
              entry.target.style.animation = "fade-in 2s forwards";
          });
        },
        { threshold: 0.1 }
      );

      document
        .querySelectorAll("#footer-placeholder h3")
        .forEach((h3) => footerObserver.observe(h3));
    }
  );
});
