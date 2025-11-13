const btn = document.querySelector(".scroll-up-btn");
const navLinks = document.querySelectorAll(".nav-menu .nav-link");
const menuOpenButton = document.querySelector("#menu-open-button");
const menuCloseButton = document.querySelector("#menu-close-button");

menuOpenButton.addEventListener("click", () => {
  //Chạm vào menu hiện ra thanh công cụ
  document.body.classList.toggle("show-mobile-menu");
});

//Đóng thanh công cụ khi chạm vào nút Close
menuCloseButton.addEventListener("click", () => menuOpenButton.click());

//Đóng thanh công cụ khi chạm vào mục trong thanh Nav
navLinks.forEach(link => {
  link.addEventListener("click", () => menuOpenButton.click());
})

//Nút để di chuyển lên đầu
btn.addEventListener("click", () => {
  document.documentElement.scrollTo({
    top: 0,
    behavior:"smooth",
  });
});

// Initialize Swiper

const swiper = new Swiper(".slider-wrapper", {
  loop: true,
  grabCursor: true,
  spaceBetween: 25,

  // If we need pagination
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    dynamicBullets: true,
  },

  // Navigation arrows
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  // Responsive breakpoints
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
  },
});
