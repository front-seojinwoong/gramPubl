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
    $(this).addClass("active").siblings("li").removeClass("active");
    $(".fadeinoutImg > div").removeClass("active");
    $(".fadeinoutImgBox" + idx).addClass("active");
    $('.main_gramAbility .mentBox > div').removeClass('active');
    $('.main_gramAbility .mentBox > div').eq(idx).addClass('active');
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
  }); 
  $(document).on("keyup", "input.numberOnly", function () {
    $(this).val(
      $(this)
        .val()
        .replace(/[^0-9]/gi, "")
    );
  }); 
  $(document).on("keyup", "input.datetimeOnly", function () {
    $(this).val(
      $(this)
        .val()
        .replace(/[^0-9:\-]/gi, "")
    );
  }); 

  // Main Banner Swiper
  // new Swiper(".main_banner_slider", {
  //   effect: "fade",
  //   fadeEffect: {
  //     crossFade: true,
  //   },
  //   loop: true,
  //   autoplay: {
  //     delay: 5000,
  //     disableOnInteraction: false,
  //   },
  //   speed: 1000,
  //   pagination: {
  //     el: ".main_banner_slider .swiper-pagination",
  //     clickable: true,
  //   },
  // });

  // Before After Swiper
  new Swiper(".beforeafterSwiper", {
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    speed: 1000,
    navigation: {
      nextEl: ".beforeafterSwiperWrap .swiper-button-next",
      prevEl: ".beforeafterSwiperWrap .swiper-button-prev",
    },
  });

  // Event Swiper
  new Swiper(".eventSwiper", {
    loop: true,
    navigation: {
      nextEl: ".eventSwiper .swiper-button-next",
      prevEl: ".eventSwiper .swiper-button-prev",
    },
    breakpoints: {
      0: {
        spaceBetween: 40,
        slidesPerView: 1,
      },
      1025: {
        spaceBetween: 77,
        slidesPerView: 3,
      },
    },
  });


   let isMapInitialized = false;

      function initMap() {
        const mapContainer = document.querySelector('.kakaoMapBox');
        if (!mapContainer) return;

        const mapWidth = mapContainer.offsetWidth;
        let mapHeight;

        if (window.innerWidth <= 1024) {
          // 1024px 이하: 8:5 비율
          mapHeight = Math.round(mapWidth * 1 / 2);
        } else {
          // 1024px 초과: 고정 550px
          mapHeight = 550;
        }

        // 기존 지도가 있으면 제거
        const existingMap = document.getElementById('daumRoughmapContainer1761663390002');
        if (existingMap) {
          existingMap.innerHTML = '';
        }

        new daum.roughmap.Lander({
          timestamp: "1761663390002",
          key: "2d2qazyvrneh",
          mapHeight: mapHeight.toString(),
        }).render();
      }

      function updateMapHeight() {
        if (!isMapInitialized) return;

        const mapContainer = document.querySelector('.kakaoMapBox');
        if (!mapContainer) return;

        const mapWidth = mapContainer.offsetWidth;
        let mapHeight;

        if (window.innerWidth <= 1024) {
          mapHeight = Math.round(mapWidth * 5 / 8);
        } else {
          mapHeight = 550;
        }

        const mapIframe = document.querySelector('#daumRoughmapContainer1761663390002 iframe');
        if (mapIframe) {
          mapIframe.style.height = mapHeight + 'px';
        }
      }

      // DOM 로드 후 초기 실행
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
          initMap();
          isMapInitialized = true;
        });
      } else {
        initMap();
        isMapInitialized = true;
      }

      // resize 이벤트 처리 (디바운싱)
      let resizeTimer;
      window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
          updateMapHeight();
        }, 250);
      });


       // 썸네일 스와이퍼 초기화
        var galleryThumbs = new Swiper('.galleryThumbs', {
          spaceBetween: 13,
          slidesPerView: 5,
          freeMode: true,
          watchSlidesProgress: true,
          navigation: {
            nextEl: '.gallery_section .swiper-button-next',
            prevEl: '.gallery_section .swiper-button-prev',
          },
          breakpoints: {
            // 1024px 이하에서 3개로 표시
            330: {
              slidesPerView: 2,
              spaceBetween: 8
            },
            400: {
              slidesPerView: 3,
              spaceBetween: 8
            },
            1025: {
              slidesPerView: 5,
              spaceBetween: 13
            }
          }
        });

        var galleryMain = new Swiper('.galleryMain', {
          spaceBetween: 10,
          thumbs: {
            swiper: galleryThumbs,
          },
        });
});

