$(document).ready(function () {
  // GNB 2depth Tt fadeIn/fadeOut
  $(".depth1 > li.has-sub").hover(
    function () {
      $(this).find(".depth2").stop().fadeIn(400);
    },
    function () {
      $(this).find(".depth2").stop().fadeOut(400);
    }
  );

  // Mobile GNB submenu toggle
  $(".moGnb__title").on("click", function () {
    $(".moGnb__item").removeClass("active");
    $(this).closest(".moGnb__item").addClass("active");
  });

  $(".allMenuBox.mo_ver").on("click", function () {
    $(".moGnbMenu").addClass("active");
  });
  $(".closeMoGnb").on("click", function () {
    $(".moGnbMenu").removeClass("active");
  });

  $(".main_gramAbility .tabBox li").on("click", function () {
    var idx = $(this).index();
    console.log(idx);
    $(this).addClass("active").siblings("li").removeClass("active");
    $(".fadeinoutImg > div").removeClass("active");
    $(".fadeinoutImgBox" + idx).addClass("active");
  });

  $(document).on("keyup", "input.moneyOnly", function () {
    $(this).val(
      comma(
        uncomma(
          $(this)
            .val()
            .replace(/[^0-9:\,]/gi, "")
        )
      )
    );
  }); // �� �쇳몴李띻린 泥섎━, �レ옄留� �낅젰
  $(document).on("keyup", "input.numberOnly", function () {
    $(this).val(
      $(this)
        .val()
        .replace(/[^0-9]/gi, "")
    );
  }); // �レ옄留� �낅젰
  $(document).on("keyup", "input.datetimeOnly", function () {
    $(this).val(
      $(this)
        .val()
        .replace(/[^0-9:\-]/gi, "")
    );
  }); // �꾪솕踰덊샇 �レ옄留� �낅젰

  // Main Banner Swiper
  new Swiper(".main_banner_slider", {
    effect: "fade",
    fadeEffect: {
      crossFade: true,
    },
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    speed: 1000,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });

  // Before After Swiper
  new Swiper(".beforeafterSwiper", {
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    speed: 1000,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

  // Event Swiper
  new Swiper(".eventSwiper", {
    slidesPerView: 3,
    spaceBetween: 77,
    loop: true,
    navigation: {
      nextEl: ".eventSwiper .swiper-button-next",
      prevEl: ".eventSwiper .swiper-button-prev",
    },
  });
});
