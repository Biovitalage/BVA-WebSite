

document.getElementById("playButton").addEventListener("click", function () {
  // Mostra la modale
  const modal = document.getElementById("videoModal");
  modal.style.display = "flex";

  // Aggiungi l'URL del video YouTube
  const video = document.getElementById("youtubeVideo");
  video.src = "https://www.youtube.com/embed/YOUR_VIDEO_ID?autoplay=1";
});

document.getElementById("closeModal").addEventListener("click", function () {
  const modal = document.getElementById("videoModal");
  modal.style.display = "none";

  // Ferma il video rimuovendo l'URL
  const video = document.getElementById("youtubeVideo");
  video.src = "";
});

window.addEventListener("click", function (event) {
  const modal = document.getElementById("videoModal");
  if (event.target === modal) {
    modal.style.display = "none";

    // Ferma il video
    const video = document.getElementById("youtubeVideo");
    video.src = "";
  }
});

// Funzione per configurare i caroselli
function setupCarousel(
  containerSelector,
  prevButtonSelector,
  nextButtonSelector
) {
  const carouselContainer = document.querySelector(containerSelector);
  const scrollContainer = carouselContainer.querySelector(
    ".card-carousel-container"
  );

  const cardWidth =
    scrollContainer.querySelector(".card-carousel").offsetWidth + 15; // Larghezza card + gap

  // Evento per il pulsante "Indietro"
  document.querySelector(prevButtonSelector).addEventListener("click", () => {
    scrollContainer.scrollBy({
      left: -cardWidth,
      behavior: "smooth",
    });
  });

  // Evento per il pulsante "Avanti"
  document.querySelector(nextButtonSelector).addEventListener("click", () => {
    scrollContainer.scrollBy({
      left: cardWidth,
      behavior: "smooth",
    });
  });
}

// Configura il primo carosello
setupCarousel(
  "#carousel-Funzionalità", // ID del primo carosello
  ".Funzionalità-title button:nth-child(1)", // Pulsante "Indietro" del primo carosello
  ".Funzionalità-title button:nth-child(2)" // Pulsante "Avanti" del primo carosello
);

// Configura il secondo carosello
setupCarousel(
  "#carousel-Funzionalità-2", // ID del secondo carosello (aggiungilo al tuo HTML)
  ".btn-container-carousel-2 button:nth-child(1)", // Pulsante "Indietro" del secondo carosello
  ".btn-container-carousel-2 button:nth-child(2)" // Pulsante "Avanti" del secondo carosello
);

document.addEventListener("DOMContentLoaded", function () {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          // Se vuoi che l'effetto avvenga solo la prima volta:
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.2, // parte quando il 20% dell'elemento entra in viewport
    }
  );

  // Seleziona tutti gli h3 con questa classe
  document.querySelectorAll("h3").forEach((el) => {
    observer.observe(el);
  });
});
