(() => {
  // app/scripts/collection.js
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
    init();
  })();
  function Control() {
    var content = document.querySelectorAll(".filter__tittle");
    content.forEach((e) => {
      let item = e.nextElementSibling;
      let icon_Open = e.children[2];
      let icon_Close = e.children[1];
      e.addEventListener("click", () => {
        if (e.classList.contains("filter_active")) {
          let clear_All = e.nextElementSibling.nextElementSibling;
          if (clear_All != null) {
            clear_All.style.display = "none";
          }
          e.classList.remove("filter_active");
          item.style.display = "none";
          icon_Open.style.display = "unset";
          icon_Close.style.display = "none";
          e.parentElement.style.marginBottom = "20px";
          e.parentElement.style.paddingBottom = "0px";
        } else {
          let clear_All = e.nextElementSibling.nextElementSibling;
          if (clear_All != null) {
            clear_All.style.display = "flex";
            clear_All.style.padding = "10px 0px";
          }
          e.classList.add("filter_active");
          item.style.display = "flex";
          icon_Open.style.display = "none";
          icon_Close.style.display = "unset";
          e.parentElement.style.marginBottom = "0px";
          e.parentElement.style.paddingBottom = "30px";
        }
      });
    });
  }
  window.addEventListener("DOMContentLoaded", () => {
    Control();
  });
  document.addEventListener("shopify:section:load", () => {
    Control();
  });
})();
