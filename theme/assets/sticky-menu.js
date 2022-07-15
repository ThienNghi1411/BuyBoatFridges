(() => {
  // app/scripts/sticky-menu.js
  var header = document.querySelector(".header");
  var sliderBanner = document.querySelector(".pageBanner");
  var init = () => {
    window.onload = () => {
      window.onscroll = () => {
        stickyMenu();
      };
    };
  };
  var stickyMenu = () => {
    let checkPointSticky = 1;
    if (sliderBanner === null) {
      checkPointSticky = 200;
    } else {
      checkPointSticky = sliderBanner.offsetTop;
    }
    if (window.pageYOffset > checkPointSticky) {
      header.classList.add("sticky");
    } else {
      header.classList.remove("sticky");
    }
  };
  init();
})();
