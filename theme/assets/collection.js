(() => {
    var FilterIcon = document.querySelector(".collections__Filter");
    var menuMobileCloseIcon = document.querySelector(".closebutton");
    var menuMobileOverLay = document.querySelector(".collection__overlay-wrapper");
    var menuMobile = document.querySelector(".collection__filter");

    var init = () => {
      FilterIcon.addEventListener("click", showMenuMobile);
      menuMobileCloseIcon.addEventListener("click", hideMenuMobile);
      menuMobileOverLay.addEventListener("click", hideMenuMobile);
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
    init();
  })();
  