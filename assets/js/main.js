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
    mirror: false
  });
}

// Header Fixed
let scrollToTop = document.querySelector('.scrollToTop');
// header.classList.toggle('scroll', window.scrollY > 48);

window.addEventListener('scroll', function(){
  scrollToTop.classList.toggle('active', window.scrollY > 100);
});

scrollToTop.addEventListener('click', ()=>{
  scrollTo(0, 0);
})

// Active Link
$(".page-navbar .links .link").each(function () {
  $(this).removeClass('active')
  if (window.location.href.includes($(this).attr("href"))) {
    $(this).addClass("active");
  }
});

// Show And Hide Search Navbar
$('.search-ic').on('click', function(){
$('.main-search').toggleClass('active');
$('.overlay-m').fadeIn(600);
});


// SideBar
$('.side-open').on('click', function(){
$('.links').addClass('active');
$('.overlay-m').fadeIn(600);
});

$('.side-user-open').on('click', function(){
$('.sidebar').addClass('active');
$('.overlay-m').fadeIn(600);
});

$('.close').on('click', function(){
$('.links').removeClass('active');
$('.overlay-m').fadeOut(500);
});

$('.overlay-m').on('click', function(){
$('.links').removeClass('active');
$('.sidebar').removeClass('active');
$('.main-search').removeClass('active');
$(this).fadeOut(500);
});


// dropDown stopPropagation
$(".dropdown-menu").click(function(e){
  e.stopPropagation();
});


// PassWord Show In Setting Page
const iconsPassSet = document.querySelectorAll('.pass-icon');

if(iconsPassSet){
iconsPassSet.forEach((ic) =>{
  ic.addEventListener('click', function(){
    let input = ic.parentElement.querySelector('input');
    showPassword(input, ic);
  });
});
}

// Function To Show And Hide Password
function showPassword(input, icon){

if(input.type == 'password'){
  input.setAttribute('type', 'text');
  // icon.innerHTML = `<i class="fa-regular fa-eye"></i>`;
} else{
  input.setAttribute('type', 'password');
  // icon.innerHTML = `<i class="fa-regular fa-eye-slash"></i>`;
}

icon.classList.toggle('show')
}

let isRtl = $('html[lang="ar"]').length > 0;

// Normal Select To
$(".select").select2({
dir: isRtl ? "rtl" : "ltr",
minimumResultsForSearch: Infinity,
});



// Heart
$(document).on('click', '.heart' ,function(){
if($(this).find('i').hasClass('fa-regular')){
  $(this).find('i').addClass('fa-solid c-yellow')
  $(this).find('i').removeClass('fa-regular')
} else{
  $(this).find('i').removeClass('fa-solid c-yellow')
  $(this).find('i').addClass('fa-regular')

}
})


// $('[data-pass]').on('click', function(){
// let item = $(this).attr('data-pass')
// sessionStorage.setItem("activeTab", JSON.stringify(item));
// })

let allCopy = document.querySelectorAll('.circle')

if(allCopy){
  allCopy.forEach(el => {
    el.addEventListener('click', function(){
        let code = el.closest('.copy-item').querySelector('.copy-num');
        CopyToClipboard(code);
    });
  })
}


function CopyToClipboard(id) {
  var r = document.createRange();
  r.selectNode(id);
  window.getSelection().removeAllRanges();
  window.getSelection().addRange(r);
  document.execCommand('copy');
  window.getSelection().removeAllRanges();
}


// Input Number
$(document).ready(function() {
  $('.minus').click(function () {
    var $input = $(this).parent().find('input');
    var count = parseInt($input.val()) - 1;
    count = count < 1 ? 1 : count;
    $input.val(count);
    $input.change();
    return false;
  });
  $('.plus').click(function () {
    var $input = $(this).parent().find('input');
    $input.val(parseInt($input.val()) + 1);
    $input.change();
    return false;
  });
});

// Show And Hide NavBar collapse
$(document).ready(function(){
  $('.coll-open').click(function(e){
    e.preventDefault()
    if($(this).parent('.nav-collapse').hasClass('active')){
      $(this).next(".collapse-content").slideUp();
      $(this).parent('.nav-collapse').removeClass('active');
    } else{
      $('.nav-collapse').removeClass('active');
      $('.collapse-content').slideUp();
      $(this).parent('.nav-collapse').addClass('active');
      $(this).next('.collapse-content').slideDown();
    }
  })
});


