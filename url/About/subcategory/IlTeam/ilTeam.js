function initAnimations() {
  gsap.registerPlugin(ScrollTrigger);

  // stato iniziale
  gsap.set(".element", { y: -100, opacity: 0 });

  ScrollTrigger.batch(".element", {
    start: "top center",
    end: "bottom center",
    onEnter: (batch) =>
      gsap.to(batch, {
        y: 0,
        opacity: 1,
        stagger: 0.15,
        duration: 1,
        ease: "power2.out",
      }),
    onLeaveBack: (batch) =>
      gsap.to(batch, {
        y: -100,
        opacity: 0,
        stagger: 0.15,
        duration: 1,
        ease: "power2.in",
      }),
  });
}

fetch("data/employees.json")
  .then((r) => {
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
    return r.json();
  })
  .then((data) => {
    const ul = document.getElementById("team-list");
    Object.values(data).forEach((emp) => {
      const li = document.createElement("li");
      li.className = "team-member element"; // <── aggiungi .element per GSAP
      li.innerHTML = `
        <a class="team-member-link" href="profilo.html?id=${emp.id}">
          <div class="img-profile-container">
            <img src="${emp.avatarThumb}" alt="Immagine profilo">
          </div>
          <div class="info-profile-container">
            <h4>${emp.name} ${emp.cognome}</h4>
            <p class="breve-bio">${emp.breveBio}</p>
          </div>
        </a>`;
      ul.appendChild(li);
    });

    // assicurati che tutte le immagini siano pronte
    return Promise.all(
      [...ul.querySelectorAll("img")].map((img) =>
        img.complete
          ? Promise.resolve()
          : new Promise((res) => (img.onload = img.onerror = res))
      )
    );
  })
  .then(initAnimations)
  .catch(console.error);
