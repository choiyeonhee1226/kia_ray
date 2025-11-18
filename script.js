$(function () {
  var $header = $('.header');
  var $hero = $('#hero');
  var $sentinel = $('.header-sentinel');

  var $drawer = $('#globalDrawer');
  var $right = $('.right-utils');
  var $burger = $('.button-burger');
  var $drawerClose = $drawer.find('.drawer-close');

  // 🔍 검색 관련
  var $searchBtn = $('.button-search');
  var $searchPanel = $('#globalSearch');
  var $searchInput = $searchPanel.find('.search-input');

  /* ========= 드로어 열고 닫기 ========= */
  function openDrawer() {
    if (!$drawer.length) return;
    $drawer.addClass('open').attr('aria-hidden', 'false');
    $burger.attr('aria-expanded', 'true');
    $('html').addClass('no-scroll');
  }

  function closeDrawer() {
    if (!$drawer.length) return;
    $drawer.removeClass('open').attr('aria-hidden', 'true');
    $burger.attr('aria-expanded', 'false');
    $('html').removeClass('no-scroll');
  }

  // ========= 검색 열고 닫기 =========
  function openSearch() {
    if (!$searchPanel.length) return;
    $searchPanel.addClass('is-open').attr('aria-hidden', 'false');
    $searchBtn.attr('aria-expanded', 'true');

    // 드로어 열려 있으면 닫기 (겹침 방지)
    if ($drawer.hasClass('open')) {
      closeDrawer();
    }

    if ($searchInput.length) {
      setTimeout(function () {
        $searchInput.focus();
      }, 120);
    }
  }

  function closeSearch() {
    if (!$searchPanel.length) return;
    $searchPanel.removeClass('is-open').attr('aria-hidden', 'true');
    $searchBtn.attr('aria-expanded', 'false');
  }

  /* ========= 이벤트 바인딩 ========= */

  // 햄버거 버튼 직접 클릭
  $burger.on('click', function (e) {
    e.preventDefault();
    e.stopPropagation(); // 문서 클릭 닫기와 충돌 방지
    openDrawer();
  });

  // 우측 영역 델리게이션(이미지 눌러도 작동)
  $right.on('click', function (e) {
    var $t = $(e.target);
    if ($t.closest('.button-burger').length) {
      e.preventDefault();
      e.stopPropagation();
      openDrawer();
    }
  });

  // 드로어 닫기 버튼
  $drawerClose.on('click', function (e) {
    e.preventDefault();
    closeDrawer();
  });

  // 🔍 검색 버튼 클릭 토글
  $searchBtn.on('click', function (e) {
    e.preventDefault();
    e.stopPropagation();
    if ($searchPanel.hasClass('is-open')) {
      closeSearch();
    } else {
      openSearch();
    }
  });

  // 검색 패널 안쪽 클릭은 전파 막기 (바깥 클릭 닫기와 충돌 방지)
  $searchPanel.on('click', function (e) {
    e.stopPropagation();
  });

  // 검색 닫기 버튼
  $searchPanel.find('.search-close').on('click', function (e) {
    e.preventDefault();
    e.stopPropagation();
    closeSearch();
  });

  // 드로어 / 검색 바깥 클릭 시 닫기
  $(document).on('click', function (e) {
    var $t = $(e.target);

    // 드로어
    if ($drawer.hasClass('open')) {
      var insideDrawer = $t.closest('#globalDrawer').length > 0;
      var isBurger = $t.closest('.button-burger').length > 0;
      if (!insideDrawer && !isBurger) {
        closeDrawer();
      }
    }

    // 검색
    if ($searchPanel.hasClass('is-open')) {
      var insideSearch = $t.closest('#globalSearch').length > 0;
      var isSearchBtn = $t.closest('.button-search').length > 0;
      if (!insideSearch && !isSearchBtn) {
        closeSearch();
      }
    }
  });

  // ESC 키로 둘 다 닫기
  $(document).on('keydown', function (e) {
    if (e.key === 'Escape') {
      closeDrawer();
      closeSearch();
    }
  });

  /* ========= 헤더 전환 (스크롤) ========= */

  if ('IntersectionObserver' in window && $sentinel.length) {
    var io = new IntersectionObserver(function (entries) {
      var ent = entries[0];
      if (ent.isIntersecting) {
        $header.removeClass('scrolled');
      } else {
        $header.addClass('scrolled');
      }
    }, { threshold: 0 });

    io.observe($sentinel[0]);
  } else {
    // 폴백: 스크롤 위치 기반
    function onScroll() {
      var y = window.scrollY || window.pageYOffset;
      var cutoff = ($hero.length ? $hero[0].offsetHeight : 600) - 1;
      if (y >= cutoff) {
        $header.addClass('scrolled');
      } else {
        $header.removeClass('scrolled');
      }
    }
    $(window).on('scroll', onScroll);
    onScroll();
  }
});

// section2 : ray-lineup
document.addEventListener("DOMContentLoaded", function () {
  const sliderContainer = document.querySelector(".ray-slider-container");
  const slideRight = document.querySelector(".ray-right-slide");
  const slideLeft = document.querySelector(".ray-left-slide");
  const upButton = document.querySelector(".ray-btn-up");
  const downButton = document.querySelector(".ray-btn-down");
  const slidesLength = slideRight.querySelectorAll(".ray-img-slide").length;

  let activeSlideIndex = 0;

  // 왼쪽 텍스트를 아래에서 시작
  slideLeft.style.top = `-${(slidesLength - 1) * 100}%`;

  function changeSlide(direction) {
    const sliderHeight = sliderContainer.clientHeight;

    if (direction === "up") {
      activeSlideIndex++;
      if (activeSlideIndex > slidesLength - 1) activeSlideIndex = 0;
    } else {
      activeSlideIndex--;
      if (activeSlideIndex < 0) activeSlideIndex = slidesLength - 1;
    }

    // 오른쪽 이미지는 위로
    slideRight.style.transform =
      `translateY(-${activeSlideIndex * sliderHeight}px)`;
    // 왼쪽 텍스트는 아래로
    slideLeft.style.transform =
      `translateY(${activeSlideIndex * sliderHeight}px)`;
  }

  upButton.addEventListener("click", () => changeSlide("up"));
  downButton.addEventListener("click", () => changeSlide("down"));
});

// section3 : ray-message
document.addEventListener("DOMContentLoaded", function () {
  gsap.registerPlugin(ScrollTrigger);

  // 1) SplitType (글자 쪼개기)
  const splitFirstPart = new SplitType(".ray-hero3 .part1", { types: "chars" });
  const splitSecondPart = new SplitType(".ray-hero3 .part2", { types: "chars" });
  const splitSecondLine = new SplitType(".ray-hero3 .line2 span", { types: "chars" });

  // 2) 초기 상태 세팅
  gsap.set(".ray-hero3 .part2", { opacity: 0 });
  gsap.set(".ray-hero3 .line2", { opacity: 0 });

  // 3) ScrollTrigger가 달린 타임라인 생성
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".ray-hero3",   // 섹션3 전체가 트리거
      start: "top 70%",        // 섹션의 top이 화면 70% 지점에 올 때 시작
      once: true,              // 한 번만 재생
      // markers: true,        // 디버그용 가이드 (필요하면 주석 해제해서 확인)
    }
    // delay: 0.5  // 원하면 시작 후 약간 딜레이 줄 수 있음
  });

  // 4) 타임라인 구성 그대로
  // 1) "다양한 하루엔," 글자 하나씩 등장
  tl.from(splitFirstPart.chars, {
    opacity: 0,
    y: 20,
    stagger: 0.04,
    duration: 0.6,
    ease: "power2.out"
  });

  // 2) 첫 문장 전체 살짝 이동
  tl.to(".ray-hero3 .line1", {
    x: "-5vw",
    duration: 0.8,
    ease: "power2.inOut"
  }, "+=0.3");

  // 3) "다른 이동이 필요하니까." 등장
  tl.to(".ray-hero3 .part2", { opacity: 1, duration: 0.01 }, "<");
  tl.from(splitSecondPart.chars, {
    opacity: 0,
    y: 20,
    stagger: 0.035,
    duration: 0.6,
    ease: "power2.out"
  }, "<0.1");

  // 4) 잠깐 유지
  tl.to({}, { duration: 1 });

  // 5) 첫 문장 사라지기 (자리 그대로, y는 안 건드리기!)
  tl.to(".ray-hero3 .line1", {
    opacity: 0,
    duration: 0.7,
    ease: "power2.inOut"
  });

  // 6) 두 번째 문장 등장
  tl.set(".ray-hero3 .line2", { opacity: 1 });

  tl.from(splitSecondLine.chars, {
    opacity: 0,
    y: 20,
    stagger: 0.03,
    duration: 0.7,
    ease: "power2.out"
  }, "-=0.2");
});

// section4 - Design Details
document.addEventListener("DOMContentLoaded", function () {
  gsap.registerPlugin(ScrollTrigger);

  const sec4Arrow = document.querySelector(".ray-sec4-arrow");

  // 1) 텍스트 페이드업 타임라인
  const tl4 = gsap.timeline({
    scrollTrigger: {
      trigger: ".ray-sec4",
      start: "top 70%",   // 섹션4 top이 화면 70%쯤에 들어오면 시작
      once: true
    }
  });

  // 처음엔 둘 다 살짝 아래 + 투명 상태로 세팅
  gsap.set(".ray-sec4-heading", { y: 30, opacity: 0 });
  gsap.set(".ray-sec4-copy", { y: 30, opacity: 0 });

  tl4
    // 1) 우측 상단 타이틀 먼저
    .to(".ray-sec4-heading", {
      y: 0,
      opacity: 1,
      duration: 1.2,
      ease: "power3.out"
    })
    // 2) 그 다음 좌측 하단 본문
    .to(".ray-sec4-copy", {
      y: 0,
      opacity: 1,
      duration: 0.9,
      ease: "power3.out"
    }, "+=0.2");

  // 2) 화살표 활성/비활성 (스크롤 영역 안에 있을 때만)
  ScrollTrigger.create({
    trigger: ".ray-sec4",
    start: "top 70%",
    end: "bottom top",
    onEnter() {
      sec4Arrow && sec4Arrow.classList.add("is-active");
    },
    onEnterBack() {
      sec4Arrow && sec4Arrow.classList.add("is-active");
    },
    onLeave() {
      sec4Arrow && sec4Arrow.classList.remove("is-active");
    },
    onLeaveBack() {
      sec4Arrow && sec4Arrow.classList.remove("is-active");
    }
  });

  // (선택) 화살표 클릭 시 다음 섹션으로 스크롤
  if (sec4Arrow) {
    sec4Arrow.addEventListener("click", function () {
      const nextSection = document.querySelector(".ray-sec5");
      if (!nextSection) return;
      nextSection.scrollIntoView({ behavior: "smooth" });
    });
  }
});

//  section5 : Highlights
$(function () {

  // 카테고리별 이미지 세트
  const imageSets = {
    exterior: [
      "images/section4/exterior (1).jpg",
      "images/section4/exterior (2).jpg",
      "images/section4/exterior (3).jpg",
      "images/section4/exterior (4).jpg",
      "images/section4/exterior (5).jpg",
      "images/section4/exterior (6).jpg"
    ],
    interior: [
      "images/section4/interior (1).jpg",
      "images/section4/interior (2).jpg",
      "images/section4/interior (3).jpg",
      "images/section4/interior (4).jpg"
    ],
    detail: [
      "images/section4/detail (1).jpg",
      "images/section4/detail (2).jpg",
      "images/section4/detail (3).jpg",
      "images/section4/detail (4).jpg",
      "images/section4/detail (5).jpg"
    ]
  };

  let currentInterval = null;
  let currentIndex = 0;

  const $items = $(".ray-sec5-item");
  const $mainImg = $(".ray-sec5-main img");
  const $bgImg = $(".ray-sec5-bg img");

  // 공통 이미지 변경 함수
  function changeImage(src) {
    $mainImg.stop(true, true).fadeOut(200, function () {
      $mainImg.attr("src", src).fadeIn(250);
    });

    $bgImg.stop(true, true).fadeOut(250, function () {
      $bgImg.attr("src", src).fadeIn(300);
    });
  }

  // 자동 슬라이드 시작
  function startSlide(category) {
    const imgs = imageSets[category];
    if (!imgs || !imgs.length) return;

    currentIndex = 0;
    changeImage(imgs[currentIndex]);

    if (currentInterval) clearInterval(currentInterval);

    currentInterval = setInterval(function () {
      currentIndex = (currentIndex + 1) % imgs.length;
      changeImage(imgs[currentIndex]);
    }, 2000); // 2초 간격
  }

  // 자동 슬라이드 정지 + 첫 이미지로 복귀
  function stopSlide(category) {
    const imgs = imageSets[category];
    if (currentInterval) clearInterval(currentInterval);
    currentInterval = null;

    if (!imgs || !imgs.length) return;
    changeImage(imgs[0]);   // 첫 이미지로 복귀
  }

  // 초기 상태: exterior 첫 이미지 세팅
  changeImage(imageSets.exterior[0]);

  // Hover / 포커스 이벤트
  $items.each(function () {
    const $t = $(this);
    const category = $t.data("category");

    // 마우스 올릴 때
    $t.on("mouseenter focusin", function () {
      $items.removeClass("is-active");
      $t.addClass("is-active");

      startSlide(category);
    });

    // 마우스 빠질 때
    $t.on("mouseleave focusout", function () {
      stopSlide(category);
    });
  });
});

// Section 6 : Smart Drive & Safety
$(function () {
  var $tags = $('.ray-sec6-tag');
  var $img = $('.ray-sec6-img');

  $tags.on('click', function () {
    var $t = $(this);
    var src = $t.data('img');
    if (!src) return;

    // 버튼 활성 상태 변경
    $tags.removeClass('is-active');
    $t.addClass('is-active');

    // 이미지 페이드 전환
    $img.stop(true, true).fadeOut(200, function () {
      $img.attr('src', src).fadeIn(250);
    });
  });
});

// Section 7 : Moment dual-hover
$(function () {
  var $container = $('.ray-sec7-panels');
  var $left = $('.ray-sec7-panel--left');
  var $right = $('.ray-sec7-panel--right');

  // 데스크톱/태블릿에서만 hover 적용
  function bindHover() {
    // 모바일에서는 hover 제거
    if (window.matchMedia("(max-width: 640px)").matches) {
      $container.removeClass('hover-left hover-right');
      $left.off('mouseenter mouseleave');
      $right.off('mouseenter mouseleave');
      return;
    }

    // 먼저 기존 이벤트 제거
    $left.off('mouseenter mouseleave');
    $right.off('mouseenter mouseleave');

    // 다시 적용
    $left.on('mouseenter', function () {
      $container.addClass('hover-left').removeClass('hover-right');
    }).on('mouseleave', function () {
      $container.removeClass('hover-left');
    });

    $right.on('mouseenter', function () {
      $container.addClass('hover-right').removeClass('hover-left');
    }).on('mouseleave', function () {
      $container.removeClass('hover-right');
    });
  }

  // ⭐ 초기 실행(필수!)
  bindHover();

  // 창 크기 변경 시 반응형 적용
  $(window).on('resize', function () {
    bindHover();
  });
});