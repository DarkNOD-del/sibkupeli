// Swiper JS
var swiper = new Swiper(".swiper-container", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    centeredSlides: true,
    initialSlide: 4,
    coverflowEffect: {
      rotate: 0,
      stretch: 0,
      depth: 100,
      modifier: 10,
      initialSlide: 4,
      slideShadows: true
    },
    pagination: {
      el: ".swiper-pagination",
       clickable: true
    }
  });

// Бургер меню
// function burgerClick(x) {
//     x.classList.toggle("change");

//     if (document.getElementById("burger-overlay").style.height == "100%")
//     {
//         document.getElementById("burger-overlay").style.height = "0%";
//         document.querySelector("body").style.overflow = "auto"
//     }
//     else {
//         document.getElementById("burger-overlay").style.height = "100%";
//         document.querySelector("body").style.overflow = "hidden"
//     }
// }

// const burger_btns = document.querySelectorAll('.burger-menu-btn');

// for (let burger_btn of burger_btns){
//     burger_btn.addEventListener("click", function(event) {
//         document.querySelector(".burger-menu").classList.toggle("change");
//         document.getElementById("burger-overlay").style.height = "0%";
//     });
// }



// Анимация при скроле
// wow = new WOW({
//     boxClass: 'wow',
//     animateClass: 'animated',
//     offset: 0,
//     mobile: true,
//     live: true
// })
// wow.init();