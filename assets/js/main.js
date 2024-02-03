// loader js
$(window).on("load", function () {
  $(".loader").delay(300).fadeOut(1000);
});

// Aos
aos_init();

function aos_init() {
  AOS.init({
    duration: 700,
    easing: "ease-in-out",
    once: true,
    mirror: false,
  });
}

// Check local Storage Lang
const localLang = localStorage.getItem('lang');
if(localLang){
  $('html').attr('lang', localLang);
}

// toggle Lang
$('.toggleLang').on('click', function(e){
  e.preventDefault();
  let lang = $(this).data('lang');
  location.reload();
  localStorage.setItem("lang", lang);
});


// Header Fixed
let scrollToTop = document.querySelector(".scrollToTop");
// header.classList.toggle('scroll', window.scrollY > 48);

window.addEventListener("scroll", function () {
  scrollToTop.classList.toggle("active", window.scrollY > 100);
});

scrollToTop.addEventListener("click", () => {
  scrollTo(0, 0);
});

// Active Link
$(".page-navbar .links .link").each(function () {
  $(this).removeClass("active");
  if (window.location.href.includes($(this).attr("href"))) {
    $(this).addClass("active");
  }
});

// Show And Hide Search Navbar
$(".search-ic").on("click", function () {
  $(".main-search").toggleClass("active");
  $(".overlay-m").fadeIn(600);
});

// SideBar
$(".side-open").on("click", function () {
  $(".links").addClass("active");
  $(".overlay-m").fadeIn(600);
});

$(".side-user-open").on("click", function () {
  $(".sidebar").addClass("active");
  $(".overlay-m").fadeIn(600);
});

$(".close").on("click", function () {
  $(".links").removeClass("active");
  $(".overlay-m").fadeOut(500);
});

$(".overlay-m").on("click", function () {
  $(".links").removeClass("active");
  $(".sidebar").removeClass("active");
  $(".main-search").removeClass("active");
  $(this).fadeOut(500);
});

// dropDown stopPropagation
$(".dropdown-menu").click(function (e) {
  e.stopPropagation();
});

// PassWord Show In Setting Page
const iconsPassSet = document.querySelectorAll(".pass-icon");

if (iconsPassSet) {
  iconsPassSet.forEach((ic) => {
    ic.addEventListener("click", function () {
      let input = ic.parentElement.querySelector("input");
      showPassword(input, ic);
    });
  });
}

// Function To Show And Hide Password
function showPassword(input, icon) {
  if (input.type == "password") {
    input.setAttribute("type", "text");
    // icon.innerHTML = `<i class="fa-regular fa-eye"></i>`;
  } else {
    input.setAttribute("type", "password");
    // icon.innerHTML = `<i class="fa-regular fa-eye-slash"></i>`;
  }

  icon.classList.toggle("show");
}


/******************* All Sliders *******************/

$(document).ready(function () {
  let isRtl = $('html[lang="ar"]').length > 0;
  // Home Slider
  $(document).ready(function () {
    $(".home-slider").owlCarousel({
      items: 1,
      loop: true,
      rtl: isRtl ? true : false,
      dots: true,
      nav: false,
      autoplay: true,
      autoplayTimeout: 5000,
      autoplaySpeed: 1500,
      smartSpeed: 1500,
      animateOut: "slideOutDown",
      animateIn: "slideInDown",
      nav: false,
      navText: [
        `<i class="fa-solid fa-arrow-up-long"></i>`,
        `<i class="fa-solid fa-arrow-down-long"></i>`,
      ],
    });
  });


  /************ Clients Carousel ***********/
  const owlclients = $(".clients-slider");

  owlclients.on("changed.owl.carousel", function (event) {
    setTimeout(() => {
      owlclients.find(".owl-stage-outer").addClass("py-3");
    }, 0.1);
  });
  owlclients.owlCarousel({
    items: 2,
    loop: true,
    rtl: isRtl,
    margin: 35,
    dots: false,
    autoplay: true,
    slideTransition: "linear",
    autoplayTimeout: 2800,
    autoplaySpeed: 2800,
    autoplayHoverPause: true,
    responsive: {
      1000: {
        items: 6,
      },
      800: {
        items: 4,
      },
      400: {
        items: 3,
        margin: 20,
      },
    },
  });

  /************ deatiles Carousel ***********/
  $(".deatiles-slider").owlCarousel({
    items: 1,
    rtl: isRtl,
    autoplaySpeed: 3000,
    autoplayTimeout: 5000,
    smartSpeed: 2000,
    autoplayHoverPause: false,
    margin: 10,
    loop: true,
    dots: false,
    nav: true,
    autoplay: true,
    navText: [
      `<i class="fa-solid fa-arrow-right-long"></i>`,
      `<i class="fa-solid fa-arrow-left-long"></i>`,
    ],
  });

  /************ Services Carousel ***********/
  $(".services-slider").owlCarousel({
    items: 1,
    rtl: isRtl,
    autoplaySpeed: 3000,
    autoplayTimeout: 5000,
    smartSpeed: 2000,
    autoplayHoverPause: false,
    margin: 25,
    loop: true,
    dots: false,
    autoplay: true,
    nav: false,
    responsive: {
      991: {
        items: 3,
      },
      560: {
        items: 2,
      },
    },
  });
})

$(".num").countUp();
