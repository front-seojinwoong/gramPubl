/**
 * Gram Interaction Script
 * 스크롤 애니메이션 및 인터랙션 효과
 */

(function() {
  'use strict';

  // 스크롤 애니메이션 관찰자
  const scrollObserver = {
    observers: [],

    init: function() {
      // Intersection Observer 설정
      const observerOptions = {
        root: null,
        rootMargin: '0px 0px -100px 0px', // 뷰포트 하단 100px 전에 트리거
        threshold: 0.1 // 10% 보이면 트리거
      };

      const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
            // 한 번만 실행하고 관찰 중지
            observer.unobserve(entry.target);
          }
        });
      }, observerOptions);

      // .scroll-fade-in 클래스를 가진 모든 요소 관찰
      const fadeElements = document.querySelectorAll('.scroll-fade-in');
      fadeElements.forEach(function(element) {
        observer.observe(element);
      });

      this.observers.push(observer);
    },

    // 동적으로 추가된 요소에 대한 관찰 재시작
    refresh: function() {
      this.observers.forEach(function(observer) {
        observer.disconnect();
      });
      this.observers = [];
      this.init();
    }
  };

  // 부드러운 스크롤 효과
  const smoothScroll = {
    init: function() {
      const links = document.querySelectorAll('a[href^="#"]');

      links.forEach(function(link) {
        link.addEventListener('click', function(e) {
          const href = this.getAttribute('href');

          // #none이나 빈 해시는 무시
          if (href === '#none' || href === '#' || !href) {
            return;
          }

          const target = document.querySelector(href);

          if (target) {
            e.preventDefault();

            const offsetTop = target.getBoundingClientRect().top + window.pageYOffset - 100;

            window.scrollTo({
              top: offsetTop,
              behavior: 'smooth'
            });
          }
        });
      });
    }
  };

  // 페이지 로드 시 배너 애니메이션
  const bannerAnimation = {
    init: function() {
      const banner = document.querySelector('.sub_banner');

      if (banner) {
        // 페이지 로드 시 즉시 애니메이션 시작
        setTimeout(function() {
          banner.classList.add('loaded');
        }, 100);
      }
    }
  };

  // 메인페이지 전용 스크롤 애니메이션
  const mainPageAnimations = {
    init: function() {
      // main_middle_content 좌우 페이드 효과
      const topLeftCon = document.querySelector('.main_middle_content .topContent .leftCon');
      const topRightCon = document.querySelector('.main_middle_content .topContent .rightCon');
      const btmLeftCon = document.querySelector('.main_middle_content .btmContent .leftCon');
      const btmRightCon = document.querySelector('.main_middle_content .btmContent .rightCon');

      if (topLeftCon) topLeftCon.classList.add('scroll-fade-left');
      if (topRightCon) topRightCon.classList.add('scroll-fade-right');
      if (btmLeftCon) btmLeftCon.classList.add('scroll-fade-left');
      if (btmRightCon) btmRightCon.classList.add('scroll-fade-right');

      // before_and_after 섹션
      const beforeAfter = document.querySelector('.before_and_after');
      if (beforeAfter) {
        const mentBox = beforeAfter.querySelector('.mentBox');
        const swiperWrap = beforeAfter.querySelector('.beforeafterSwiperWrap');

        if (mentBox) mentBox.classList.add('main-scroll-fade');
        if (swiperWrap) swiperWrap.classList.add('main-scroll-fade');
      }

      // main_event_swiperbox 섹션
      const eventBox = document.querySelector('.main_event_swiperbox');
      if (eventBox) {
        const logo = eventBox.querySelector('img');
        const intro = eventBox.querySelector('.intro');
        const swiper = eventBox.querySelector('.eventSwiper');

        if (logo) logo.classList.add('main-scroll-fade');
        if (intro) intro.classList.add('main-scroll-fade');
        if (swiper) swiper.classList.add('main-scroll-fade');
      }

      // 메인페이지 전용 관찰자 설정
      this.setupMainObserver();
    },

    setupMainObserver: function() {
      const observerOptions = {
        root: null,
        rootMargin: '0px 0px -80px 0px',
        threshold: 0.15
      };

      const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
          }
        });
      }, observerOptions);

      // 모든 메인 페이드 요소 관찰
      const mainFadeElements = document.querySelectorAll('.main-scroll-fade, .scroll-fade-left, .scroll-fade-right');
      mainFadeElements.forEach(function(element) {
        observer.observe(element);
      });
    }
  };

  // 페이지별 특수 애니메이션
  const pageSpecificAnimations = {
    // index - 메인페이지
    index: function() {
      mainPageAnimations.init();
    },

    // subpage1 - 졸업 패키지
    subpage1: function() {
      const graduationSections = [
        '.sub_graduation01',
        '.sub_graduation02',
        '.sub_graduation03',
        '.sub_graduation04',
        '.sub_graduation05'
      ];

      graduationSections.forEach(function(selector) {
        const section = document.querySelector(selector);
        if (section) {
          section.classList.add('scroll-fade-in');
        }
      });

      // 각 스텝 아이템에 딜레이 추가
      const stepLists = document.querySelectorAll('.graduation_step_lists li');
      stepLists.forEach(function(item, index) {
        item.classList.add('scroll-fade-in', 'delay-' + ((index % 3) + 1));
      });
    },

    // subpage2 - 그램 한약의 특별함
    subpage2: function() {
      const spiritSections = document.querySelectorAll('.spirit_content');
      spiritSections.forEach(function(section) {
        section.classList.add('scroll-fade-in');
      });

      const specialContents = document.querySelectorAll('.special_content');
      specialContents.forEach(function(content) {
        content.classList.add('scroll-fade-in');
      });

      // 아이콘 리스트에 순차 애니메이션
      const iconLists = document.querySelectorAll('.special_content_icolists li');
      iconLists.forEach(function(item, index) {
        item.classList.add('scroll-fade-in', 'delay-' + ((index % 3) + 1));
      });
    },

    // subpage3 - 다이어트 하나만
    subpage3: function() {
      const introSections = ['.subitro01', '.subitro02', '.subitro03'];

      introSections.forEach(function(selector) {
        const section = document.querySelector(selector);
        if (section) {
          section.classList.add('scroll-fade-in');
        }
      });

      // 진료철학 리스트
      const philosophyItems = document.querySelectorAll('.subitro02 ul li');
      philosophyItems.forEach(function(item, index) {
        item.classList.add('scroll-fade-in', 'delay-' + ((index % 3) + 1));
      });
    },

    // subpage4 - 의료진 소개
    subpage4: function() {
      const doctorSection = document.querySelector('.doctorIntroduce');
      if (doctorSection) {
        const top = doctorSection.querySelector('.top');
        const btm = doctorSection.querySelector('.btm');

        if (top) top.classList.add('scroll-fade-in');
        if (btm) btm.classList.add('scroll-fade-in', 'delay-2');
      }
    },

    // subpage9 - 그램환
    subpage9: function() {
      const medicineSections = document.querySelectorAll('.gramSubCon .subContainer');
      medicineSections.forEach(function(section) {
        section.classList.add('scroll-fade-in');
      });

      // 효과 박스들
      const effectBoxes = document.querySelectorAll('.effectDiv');
      effectBoxes.forEach(function(box, index) {
        box.classList.add('scroll-fade-in', 'delay-' + ((index % 3) + 1));
      });
    },

    init: function() {
      // 현재 페이지 감지 및 해당 애니메이션 실행
      const bodyClass = document.body.className;
      let currentPage = window.location.pathname.split('/').pop().replace('.html', '');

      // 빈 문자열이거나 '/'인 경우 index로 처리
      if (!currentPage || currentPage === '' || currentPage === '/') {
        currentPage = 'index';
      }

      if (this[currentPage]) {
        this[currentPage]();
      }
    }
  };

  // DOM이 로드되면 초기화
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init() {
    // 모든 모듈 초기화
    bannerAnimation.init();
    pageSpecificAnimations.init();
    scrollObserver.init();
    smoothScroll.init();

    // 페이지 전환 시 애니메이션 리셋
    window.addEventListener('pageshow', function(event) {
      if (event.persisted) {
        scrollObserver.refresh();
      }
    });
  }

  // 전역 객체에 노출 (필요시 외부에서 접근 가능)
  window.GramInteraction = {
    refreshObserver: function() {
      scrollObserver.refresh();
    },
    init: init
  };

})();
