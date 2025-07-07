const ImgToScaleInnovation = document.querySelectorAll('.card-image img');

const scalatorImage = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('scale-animate');
            scalatorImage.unobserve(entry.target); 
        }  
    });
}, {
    threshold: 0.1 
});

ImgToScaleInnovation.forEach(img => {
    scalatorImage.observe(img); 
});


