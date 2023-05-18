const slides = document.querySelectorAll('.slide');
let currentSlide = 0;

function showSlide(n) {
  slides[currentSlide].classList.remove('active');
  currentSlide = (n + slides.length) % slides.length;
  slides[currentSlide].classList.add('active');
}

setInterval(() => {
  showSlide(currentSlide + 1);
}, 6000);










function checkWindowSize() {
    if ( jQuery(window).width() >= 480 ) {
        $('.truncate').succinct({
            size: 100
        }); 
    }
    else if ( jQuery(window).width() >= 320 ) {
        $('.truncate').succinct({
            size: 55
        }); 
    } 
    else {
        $('.truncate').succinct({
            size: 20
        }); 
    }   
}

jQuery(document).ready(function(){
    jQuery(window).resize(checkWindowSize);
    checkWindowSize();
});
