// Tutto in uno: carica sia team che advisor in un'unica funzione
function initAnimations() {
  gsap.registerPlugin(ScrollTrigger);

  gsap.set(".element", { y: -100, opacity: 0 });

  ScrollTrigger.batch(".element", {
    start: "top center",
    once: true,
    onEnter: (batch) =>
      gsap.to(batch, {
        y: 0,
        opacity: 1,
        stagger: 0.15,
        duration: 1,
        ease: "power2.out",
      }),
  });

  ScrollTrigger.refresh();
}

function waitForImages(container) {
  return Promise.all(
    [...container.querySelectorAll("img")].map((img) =>
      img.complete
        ? Promise.resolve()
        : new Promise((res) => (img.onload = img.onerror = res))
    )
  );
}

function loadTeamAndAdvisor() {
  // Carica entrambi i dataset in parallelo
  return Promise.all([
    fetch("data/employees.json").then(r => {
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      return r.json();
    }),
    fetch("data/advisorlist.json").then(r => {
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      return r.json();
    })
  ]).then(([employees, advisors]) => {
    // Popola team
    const teamUl = document.getElementById("team-list");
    Object.values(employees).forEach(emp => {
      const li = document.createElement("li");
      li.className = "team-member element";
      li.innerHTML = `
        <a class="team-member-link" href="profilo.html?id=${emp.id}&type=employee">
          <div class="img-profile-container">
            <img src="${emp.avatarThumb}" alt="Immagine profilo">
          </div>
          <div class="info-profile-container">
            <h4>${emp.name} ${emp.cognome}</h4>
            <p class="breve-bio">${emp.breveBio}</p>
          </div>
        </a>`;
      teamUl.appendChild(li);
    });

    // Popola advisor
    const advisorUl = document.getElementById("advisor-list");
    Object.values(advisors).forEach(adv => {
      const li = document.createElement("li");
      li.className = "team-member element";
      li.innerHTML = `
        <a class="team-member-link" href="profilo.html?id=${adv.id}&type=advisor">
          <div class="img-profile-container">
            <img src="${adv.avatarThumb}" alt="Immagine profilo">
          </div>
          <div class="info-profile-container">
            <h4>${adv.name} ${adv.cognome}</h4>
            <p class="breve-bio">${adv.breveBio}</p>
          </div>
        </a>`;
      advisorUl.appendChild(li);
    });

    // Attendi che tutte le immagini siano caricate
    return Promise.all([waitForImages(teamUl), waitForImages(advisorUl)]);
  });
}

loadTeamAndAdvisor()
  .then(() => {
    initAnimations();
  })
  .catch(console.error);