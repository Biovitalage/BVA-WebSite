











function myFunction(x) {
    x.classList.toggle("change");

    const backdrop = document.querySelector('.MobileNavBar-backdrop');
    const navBarMobile = document.getElementById('navBarMobile');

    backdrop.classList.toggle('active');
    navBarMobile.classList.toggle('active');
    document.body.style.overflow = document.body.style.overflow === 'hidden' ? '' : 'hidden';
}




document.querySelectorAll('.accordion-btn').forEach(button => {
    button.addEventListener('click', function() {
        const isActive = this.classList.contains('active');

        // Remove 'active' class from all buttons
        document.querySelectorAll('.accordion-btn').forEach(btn => {
            btn.classList.remove('active');
        });

        // If the button was not active before, add 'active', otherwise leave it closed
        if (!isActive) {
            this.classList.add('active');
        }
    });
});


const allImgToTranslate = document.querySelectorAll('.translate-img');

const translator = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'translate 2s forwards';
            translator.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1 
});

allImgToTranslate.forEach(img => {
    translator.observe(img); 
});


const ImgToScale = document.querySelectorAll('.scale-img');

const scalator = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('scale-animate');
            scalator.unobserve(entry.target); 
        }  
    });
}, {
    threshold: 0.1 
});

ImgToScale.forEach(img => {
    scalator.observe(img); 
});


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