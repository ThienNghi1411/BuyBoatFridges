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
  var cartQuickView = document.querySelector(".cartQuickView");
  myCart.addEventListener("click", () => {
    if (cartQuickView.style.display === "none") {
      cartQuickView.style.display = "block";
    } else {
      cartQuickView.style.display = "none";
    }
  });
})();
