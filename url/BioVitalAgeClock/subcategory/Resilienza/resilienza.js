// Intersection Observer per animazioni
const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;

    entry.target.classList.add('visible');

    // Progress bars
    if (entry.target.classList.contains('progress-fill')) {
      const width = entry.target.dataset.width;
      setTimeout(() => { entry.target.style.width = width + '%'; }, 200);
    }

    // Stat counters
    if (entry.target.classList.contains('stat-number')) {
      animateCounter(entry.target);
    }
  });
}, observerOptions);

// Osserva elementi animabili
document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .progress-fill, .stat-number')
  .forEach((el) => observer.observe(el));

// Contatori animati (supporta anche decimali + suffissi)
function animateCounter(el) {
  const targetStr = el.dataset.target || '0';
  const suffix = el.dataset.suffix || '';
  const target = parseFloat(targetStr);
  const duration = 2000;
  const steps = Math.ceil(duration / 16);
  const inc = target / steps;
  let cur = 0;

  const timer = setInterval(() => {
    cur += inc;
    if (cur >= target) { cur = target; clearInterval(timer); }
    const isDecimal = targetStr.includes('.');
    el.textContent = (isDecimal ? cur.toFixed(1) : Math.floor(cur).toLocaleString()) + suffix;
  }, 16);
}

// Smooth scroll per anchor interni
document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener('click', (e) => {
    e.preventDefault();
    const t = document.querySelector(a.getAttribute('href'));
    if (t) t.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// Gestione form contatti (simulazione invio)
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const btn = this.querySelector('button[type="submit"]');
    const original = btn.textContent;
    btn.textContent = 'Invio in corso...';
    btn.disabled = true;

    setTimeout(() => {
      btn.textContent = '✓ Richiesta Inviata!';
      btn.style.background = 'var(--color-success)';

      setTimeout(() => {
        btn.textContent = original;
        btn.disabled = false;
        btn.style.background = '';
        this.reset();
      }, 3000);
    }, 1500);
  });
}

// Effetto parallax leggero per l'hero
window.addEventListener('scroll', () => {
  const hero = document.querySelector('.hero');
  if (!hero) return;
  const rate = window.pageYOffset * -0.5;
  hero.style.transform = `translateY(${rate}px)`;
});

// Inizializza stato su load
document.addEventListener('DOMContentLoaded', () => {
  // reset width progress
  document.querySelectorAll('.progress-fill').forEach((bar) => (bar.style.width = '0%'));
  // mostra l'hero al primo paint
  setTimeout(() => {
    const el = document.querySelector('.hero .fade-in');
    if (el) el.classList.add('visible');
  }, 300);
});
