(function () {
  "use strict";

  /**
   * Easy selector helper function
   */

  let previousScrollValue = 0;

  const select = (el, all = false) => {
    el = el.trim();
    if (all) {
      return [...document.querySelectorAll(el)];
    } else {
      return document.querySelector(el);
    }
  };

  const buttonHide = () => {
    const width = window.screen.availWidth;
    const button = select("#sponsorBtn");
    if (width < 500) {
      if (!button) {
        return;
      }
    }
    const offset = window.pageYOffset;
    if (offset >= 500) {
      button.style = "display:none";
    }
    if (previousScrollValue > offset) {
      button.style = "display:block";
    }
    previousScrollValue = offset;
  };

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all);
    if (selectEl) {
      if (all) {
        selectEl.forEach((e) => e.addEventListener(type, listener));
      } else {
        selectEl.addEventListener(type, listener);
      }
    }
  };

  /**
   * Easy on scroll event listener
   */
  const onscroll = (el, listener) => {
    el.addEventListener("scroll", listener);
  };

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select("#navbar .scrollto", true);
  const navbarlinksActive = () => {
    let position = window.scrollY + 200;
    navbarlinks.forEach((navbarlink) => {
      if (!navbarlink.hash) return;
      let section = select(navbarlink.hash);
      if (!section) return;
      if (
        position >= section.offsetTop &&
        position <= section.offsetTop + section.offsetHeight
      ) {
        navbarlink.classList.add("active");
      } else {
        navbarlink.classList.remove("active");
      }
    });
  };
  window.addEventListener("load", navbarlinksActive);
  onscroll(document, navbarlinksActive);

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let elementPos = select(el).offsetTop;
    window.scrollTo({
      top: elementPos,
      behavior: "smooth",
    });
  };

  /**
   * Back to top button
   */
  let backtotop = select(".back-to-top");
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add("active");
      } else {
        backtotop.classList.remove("active");
      }
    };
    window.addEventListener("load", toggleBacktotop);
    onscroll(document, toggleBacktotop);
  }

  /**
   * Mobile nav toggle
   */
  on("click", ".mobile-nav-toggle", function (e) {
    select("body").classList.toggle("mobile-nav-active");
    this.classList.toggle("bi-list");
    this.classList.toggle("bi-x");
  });

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on(
    "click",
    ".scrollto",
    function (e) {
      if (select(this.hash)) {
        e.preventDefault();

        let body = select("body");
        if (body.classList.contains("mobile-nav-active")) {
          body.classList.remove("mobile-nav-active");
          let navbarToggle = select(".mobile-nav-toggle");
          navbarToggle.classList.toggle("bi-list");
          navbarToggle.classList.toggle("bi-x");
        }
        scrollto(this.hash);
      }
    },
    true
  );

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener("load", () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash);
      }
    }
  });

  /**
   * Preloader
   */
  let preloader = select("#preloader");
  if (preloader) {
    window.addEventListener("load", () => {
      preloader.remove();
    });
  }

  /**
   * Hero type effect
   */
  const typed = select(".typed");
  if (typed) {
    let typed_strings = typed.getAttribute("data-typed-items");
    typed_strings = typed_strings.split(",");
    new Typed(".typed", {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000,
    });
  }

  /**
   * Skills animation
   */
  let skilsContent = select(".skills-content");
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: "80%",
      handler: function (direction) {
        let progress = select(".progress .progress-bar", true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute("aria-valuenow") + "%";
        });
      },
    });
  }

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener("load", () => {
    let portfolioContainer = select(".portfolio-container");
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: ".portfolio-item",
      });

      let portfolioFilters = select("#portfolio-flters li", true);

      on(
        "click",
        "#portfolio-flters li",
        function (e) {
          e.preventDefault();
          portfolioFilters.forEach(function (el) {
            el.classList.remove("filter-active");
          });
          this.classList.add("filter-active");
          portfolioIsotope.arrange({
            filter: this.getAttribute("data-filter"),
          });
          portfolioIsotope.on("arrangeComplete", function () {
            AOS.refresh();
          });
        },
        true
      );
    }
  });

  /**
   * Initiate portfolio lightbox
   */
  const portfolioLightbox = GLightbox({
    selector: ".portfolio-lightbox",
  });

  /**
   * Initiate portfolio details lightbox
   */
  const portfolioDetailsLightbox = GLightbox({
    selector: ".portfolio-details-lightbox",
    width: "90%",
    height: "90vh",
  });

  /**
   * Portfolio details slider
   */
  new Swiper(".portfolio-details-slider", {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      type: "bullets",
      clickable: true,
    },
  });

  /**
   * Testimonials slider
   */
  new Swiper(".testimonials-slider", {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    slidesPerView: "auto",
    pagination: {
      el: ".swiper-pagination",
      type: "bullets",
      clickable: true,
    },
  });

  /**
   * Animation on scroll
   */
  window.addEventListener("load", () => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    });
  });

  document.addEventListener("DOMContentLoaded", buttonHide);
  document.addEventListener("scroll", buttonHide);

  function filterQuery() {
    const queryString = window.location.search;
    if (queryString) {
      const newString = queryString.split("=");
      let portfolioContainer = select(".portfolio-container");
      if (portfolioContainer) {
        let portfolioIsotope = new Isotope(portfolioContainer, {
          itemSelector: ".portfolio-item",
        });

        let portfolioFilters = select("#portfolio-flters li", true);
        // portfolioFilters.forEach(function (el){
        //   if (el.getAttribute("data-filter") == `.filter-${newString[1]}`) {
        //         // el.classList.add("filter-active");
        //         el.click();
        //         on(
        //           "click",
        //           "#portfolio-flters li",
        //           function (e) {
        //             console.log(e)
        //             e.preventDefault();
        //             portfolioFilters.forEach(function (el) {
        //               el.classList.remove("filter-active");
        //             });
        //             this.classList.add("filter-active");
        //             portfolioIsotope.arrange({
        //               filter: this.getAttribute(`.filter-${newString[1]}`),
        //             });
        //             portfolioIsotope.on("arrangeComplete", function () {
        //               AOS.refresh();
        //             });
        //           },
        //           true
        //         );
        //       }
        //   if(el.getAttribute("data-filter") != `.filter-${newString[1]}`){
        //     el.classList.remove("filter-active");
        //   }
        // })
        portfolioFilters.forEach(function (el) {
          if (el.getAttribute("data-filter") === `.filter-${newString[1]}`) {
            el.classList.add("filter-active");
            el.style = "margin:50px 50px; width:100%";
          } else {
            el.style = "display:none";
            el.classList.remove("filter-active");
          }
        });

        portfolioIsotope.arrange({
          filter: `.filter-${newString[1]}`,
        });
        portfolioIsotope.on("arrangeComplete", function () {
          AOS.refresh();
        });
      }
    }
  }

  const quizTab = document.querySelector("#quiz-tab");
  const crosswordsTab = document.querySelector("#cross-tab");
  const treasureTab = document.querySelector("#treasure-tab");
  const quizSection = document.querySelector("#quiz");
  const crossSection = document.querySelector("#crosswords");
  const treasureSection = document.querySelector("#treasure-hunt");

  quizTab &&
    quizTab.addEventListener("click", () => {
      quizSection.style = "display:block";
      crossSection.style = "display:none";
      treasureSection.style = "display:none";
      quizTab.querySelector("a").classList.add("active");
      crosswordsTab.querySelector("a").classList.remove("active");
      treasureTab.querySelector("a").classList.remove("active");
    });

  crosswordsTab &&
    crosswordsTab.addEventListener("click", () => {
      crossSection.style = "display:block";
      quizSection.style = "display:none";
      treasureSection.style = "display:none";
      crosswordsTab.querySelector("a").classList.add("active");
      quizTab.querySelector("a").classList.remove("active");
      treasureTab.querySelector("a").classList.remove("active");
    });

  treasureTab &&
    treasureTab.addEventListener("click", () => {
      treasureSection.style = "display:block";
      crossSection.style = "display:none";
      quizSection.style = "display:none";
      treasureTab.querySelector("a").classList.add("active");
      quizTab.querySelector("a").classList.remove("active");
      crosswordsTab.querySelector("a").classList.remove("active");
    });

  const quizLink = select("#quiz-link");
  const treasureLink = select("#treasure-link");
  const crossLink = select("#cross-link");
  const time = Date.now();
  const quizTimeStart = +new Date("03/10/2022 19:55:00");
  const quizTimeEnd = +new Date("03/10/2022 20:30:00");
  const treasureTimeStart = +new Date("03/20/2022 12:00:00");
  const treasureTimeEnd = +new Date("03/20/2022 14:00:00");
  const crossTimeStart = +new Date("03/19/2022 18:25:00");
  const crossTimeEnd = +new Date("03/19/2022 19:00:00");
  if (time >= quizTimeStart && time <= quizTimeEnd) {
    quizLink.setAttribute("href", "https://forms.gle/PoMDAZGsLboyT9VR9");
    quizLink.setAttribute("target", "_blank");
    quizLink.textContent = "Link for the quiz";
  }
  if (time >= quizTimeEnd) {
    quizLink.setAttribute("href", "");
    quizLink.textContent = "Sorry!The quiz is now over";
  }

  if (time >= treasureTimeStart && time <= treasureTimeEnd) {
    treasureLink.setAttribute(
      "href",
      "https://drive.google.com/file/d/1Jfw-VRZwq1iQRfpv2m2XqV_-bXv3X4pK/view?usp=drivesdk"
    );
    treasureLink.setAttribute("target", "_blank");
    treasureLink.textContent = "TASK1";
  }

  if (time >= treasureTimeEnd) {
    treasureLink.setAttribute("href", "");
    treasureLink.textContent = "The treasure has been found! The hunt is closed.";
  }

  if (time >= crossTimeStart && time <= crossTimeEnd) {
    crossLink.setAttribute("href", "https://forms.gle/Wcv2U398HegtNF2k9");
    crossLink.setAttribute("target", "_blank");
    crossLink.textContent = "The crosswords start here";
  }

  if (time >= crossTimeEnd) {
    crossLink.setAttribute("href", "");
    crossLink.textContent = "The crosswords is now over.";
  }

  document.addEventListener("readystatechange", filterQuery);
  document.addEventListener("onLoad", filterQuery);
})();
