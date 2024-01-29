// loader js
$(window).on("load", function () {
  $(".loader-container").delay(300).fadeOut(1000);
});

$(document).ready(function () {
  function checkScroll() {
    if ($(window).scrollTop() > 50) {
      $(".normal-nav").addClass("change-bg");
    } else {
      //remove the background property so it comes transparent again
      $(".normal-nav").removeClass("change-bg");
    }
  }
  checkScroll();

  $(window).on("scroll", function () {
    checkScroll();
  });

  // Active link
  const current = window.location.href;
  document.querySelectorAll(".menu-links a").forEach(function (elem) {
    elem.closest("li").classList.remove("active");
    if (elem.href.includes(current))
      elem.closest(" li").classList.add("active");
  });

  // toggle menu
  $("nav .toggle").click(function () {
    $(".overlay").css({
      transform: "scaleX(1)",
    });

    $(".menu-links").addClass("ul-dir");
  });

  $("nav .overlay").click(function () {
    $(this).removeAttr("style");
    $(".menu-links").removeClass("ul-dir");
  });

  //scroll top
  var scrollButton = $("#scroll-top");
  $(window).scroll(function () {
    if ($(this).scrollTop() >= 700) {
      scrollButton.fadeIn(1000);
    } else {
      scrollButton.fadeOut(1000);
    }
  });

  //click to scroll top
  scrollButton.click(function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  let isRtl = $('html[lang="ar"]').length > 0;

  // Normal Select 2
  if ($(".select").length > 0) {
    $(".select").select2({
      placeholder: function () {
        $(this).data("placeholder");
      },
      allowClear: true,
      minimumResultsForSearch: -1,
    });
  }

  // Login Modal
  $(".choose_btn").on("click", function () {
    $(".choose_btn").removeClass("active");
    $(this).addClass("active");
    let modal = $(this).attr("data-btn");
    console.log(modal);
    $("#loginBtn").attr("href", `${modal}`);
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
      icon.innerHTML = `<i class="fa-regular fa-eye-slash"></i>`;
    } else {
      input.setAttribute("type", "password");
      icon.innerHTML = `<i class="fa-regular fa-eye"></i>`;
    }

    icon.classList.toggle("show");
  }

  // intlTelInput
  var inputs = document.querySelectorAll(".telephone");

  inputs.forEach(function (input) {
    window.intlTelInput(input, {
      autoPlaceholder: "ادخل",
      customPlaceholder: "kggg",
      initialCountry: "sa",
      // nationalMode:false,
      separateDialCode: true,
    });
  });

  //=========================== OTP =============================//
  let codes = document.querySelectorAll(".code");

  if ($(".modal")) {
    $(".modal").on("shown.bs.modal", function () {
      $(".code-container .code").first().focus();
    });
  }
  $(".code-container .code").first().focus();

  codes.forEach((code, idx) => {
    code.addEventListener("keydown", (e) => {
      if (e.key >= 0 && e.key <= 9) {
        codes[idx].value = "";
        if ([idx + 1] < codes.length) {
          setTimeout(() => codes[idx + 1].focus(), 10);
        }
      } else if (e.key === "Backspace") {
        setTimeout(() => codes[idx - 1].focus(), 10);
      }
    });
  });

  //================================ Counter ===========================//
  let counter;
  function codeCounter() {
    $(".counter").text("");
    let num = $(".counter").data("count");

    counter = setInterval(function () {
      num--;
      $(".counter").text(num);
      if (num < 60) {
        $(".counter").text(`${num} : 00`);
      }

      if (num > 60) {
        $(".counter").text(`00 : ${num}`);
      }

      if (num < 10) {
        $(".counter").text(`0${num} : 00`);
      }

      if (num == 0) {
        clearInterval(counter);
      }
    }, 1000);
  }

  $(".new-code").on("click", function () {
    clearInterval(counter);
    codeCounter();
  });

  codeCounter();

  if ($("#UserCodePassword") || $("#usercodePhone")) {
    $(".modal").on("shown.bs.modal", function () {
      clearInterval(counter);
      codeCounter();
    });
  }

  //================================ Code Form ============================//
  let arr = [];
  $("form .btn").each(function () {
    $(this).on("click", function (e) {
      // e.preventDefault();
      $(this)
        .closest("form")
        .find(".code")
        .each(function () {
          arr.push($(this).val());
        });
      let code = arr.join("");
      $(this).closest("form").find(".all_code").val(code);
      arr = [];
    });
  });

  /************* flatpickr *************/
  flatpickr(".date", {
    enableTime: false,
    disableMobile: "true",
  });

  /************* Upload Files Or Img *************/
  let loginInputs = document.querySelectorAll(".img-upload-input");

  loginInputs.forEach((input) => {
    if (input.classList.contains("profile")) {
      let img = input.parentElement.querySelector(".profile-img");
      let imageSrc = img.getAttribute("src");
      input.onchange = function () {
        let reader = new FileReader();
        if (input.files[0]) {
          reader.readAsDataURL(input.files[0]);
        } else {
          img.setAttribute("src", imageSrc);
          img.classList.remove("wid");
        }

        reader.onload = () => {
          img.setAttribute("src", reader.result);
          img.classList.add("wid");
        };
      };
    } else {
      input.addEventListener("change", function () {
        imgPreview(input);
      });
    }
  });

  // ImgPreview Function
  function imgPreview(input) {
    var file = input.files[0];
    var mixedfile = file["type"].split("/");
    var filetype = mixedfile[0];
    let photoContainer = $(input).closest(".upload-con").find(".photo-con");

    const multiple = $(input).attr("multiple");

    if (multiple) {
      if (filetype == "image") {
        uploadMultiImgs(input, photoContainer);
      } else if (filetype == "application") {
        uploadFile(input, photoContainer);
      }
    } else {
      if (filetype == "image") {
        uploadImg(input, photoContainer);
      } else if (filetype == "application") {
        photoContainer.empty();
        uploadFile(input, photoContainer);
      } else {
        alert("Invalid file type");
      }
    }
  }

  // uploadMultiImgs
  function uploadMultiImgs(input, photoContainer) {
    for (file of input.files) {
      let reader = new FileReader();
      reader.onload = () => {
        let img = `
          <div class="hidden-img">
              <input type='hidden' value='${reader.result}' />
              <a class="fancybox" data-fancybox="gallery" href="${reader.result}">
                  <img class="img" src="${reader.result}" />
              </a>

              <button type='button' class='remove-img'>
                  <i class="fa-solid fa-xmark"></i>
              </button>

          </div>
      `;

        photoContainer.append(img);
        removeIcon();
      };
      reader.readAsDataURL(file);
    }
  }

  // Upload Image
  function uploadImg(input, photoContainer) {
    var reader = new FileReader();
    reader.onload = function (e) {
      photoContainer.empty();
      let img = `
        <div class="hidden-img">

            <a class="fancybox" data-fancybox="gallery" href="${e.target.result}">
                <img class="img" src="${e.target.result}" />
            </a>

            <button type='button' class='remove-img'>
                <i class="fa-solid fa-xmark"></i>
            </button>

        </div>
    `;

      photoContainer.append(img);
      removeIcon();
    };
    reader.readAsDataURL(input.files[0]);
  }

  // uploadFiles
  function uploadFile(input, photoContainer) {
    Object.values(input.files).forEach(function (file) {
      var name = file.name;

      let myFile = `
          <div class="upload-label">
              <input type='hidden' value='${name}' />
              <span class='text-center'>${name}</span>
              <button type='button' class='remove-img'>
                <i class="fa-solid fa-xmark"></i>
              </button>
          </div>
        `;

      photoContainer.append(myFile);
      removeIcon();
    });
  }

  // Remove Icon
  function removeIcon() {
    $(".remove-img").on("click", function (e) {
      if (e.target.closest(".hidden-img")) {
        e.target.closest(".hidden-img").remove();
      } else if (e.target.closest(".upload-label")) {
        e.target.closest(".upload-label").remove();
      }
    });
  }

  removeIcon();


  // ========================= tab ======================//
  $('[data-pass]').on('click', function(){
    let item = $(this).attr('data-pass')
    sessionStorage.setItem("activeTab", JSON.stringify(item));
  })
});
