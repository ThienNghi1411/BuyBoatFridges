(() => {
  // app/scripts/header.js
  var menuMobileIcon = document.querySelector(".headerMobile__iconMenu");
  var menuMobileCloseIcon = document.querySelector(".menuMobile__header-icon");
  var menuMobileOverLay = document.querySelector(".menuMobile");
  var menuMobile = document.querySelector(".menuMobile__container");
  var megaMenuIcon = document.querySelector(".header__productMenu");
  var megaMenu = document.querySelector(".header__megaMenu");
  var init = () => {
    menuMobileIcon.addEventListener("click", showMenuMobile);
    menuMobileCloseIcon.addEventListener("click", hideMenuMobile);
    menuMobileOverLay.addEventListener("click", hideMenuMobile);
    megaMenuIcon.addEventListener("click", toggleMegaMenu);
  };
  var toggleEnabelScroll = () => {
    const body = document.querySelector("body");
    if (body.style.overflow === "hidden") {
      body.style.overflow = "visible";
    } else {
      body.style.overflow = "hidden";
    }
  };
  var showMenuMobile = () => {
    window.scroll(0, 0);
    menuMobileOverLay.style.display = "block";
    menuMobile.style.display = "block";
    toggleEnabelScroll();
  };
  var hideMenuMobile = () => {
    menuMobile.style.display = "none";
    menuMobileOverLay.style.display = "none";
    toggleEnabelScroll();
  };
  var toggleMegaMenu = () => {
    if (megaMenu.style.display === "block") {
      megaMenu.style.display = "none";
    } else {
      megaMenu.style.display = "block";
    }
  };
  init();
  var myCart = document.querySelector(".header__myCart");
  var cartQuickViewMobile = document.querySelector(".miniCartMobile");
  var cartQuickView = document.querySelector(".miniCartDestop__wrap");
  myCart.addEventListener("click", (e) => {
    e.stopPropagation();
    if (cartQuickView.style.display === "none") {
      cartQuickView.style.display = "block";
      document.addEventListener("click", (e2) => {
        if (!cartQuickView.contains(e2.target)) {
          cartQuickView.style.display = "none";
        }
      });
    } else {
      cartQuickView.style.display = "none";
    }
    cartQuickViewMobile.style.display === "none" ? cartQuickViewMobile.style.display = "block" : cartQuickViewMobile.style.display = "none";
    if (window.innerWidth < 1e3) {
      toggleEnabelScroll();
    }
  });
  var miniCartMobileOverlay = cartQuickViewMobile.querySelector(".miniCartMobile__overlay");
  var miniCartMobileContent = cartQuickViewMobile.querySelector(".miniCartMobile__content");
  var miniCartMobileBtnClose = cartQuickViewMobile.querySelector(".miniCartMobile__title-icon");
  miniCartMobileOverlay.addEventListener("click", () => {
    cartQuickViewMobile.style.display = "none";
    toggleEnabelScroll();
  });
  miniCartMobileContent.addEventListener("click", (e) => {
    e.stopPropagation();
  });
  miniCartMobileBtnClose.addEventListener("click", () => {
    cartQuickViewMobile.style.display = "none";
    toggleEnabelScroll();
  });
})();
